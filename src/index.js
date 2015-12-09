import Restify from 'restify'
import { SQS } from 'aws-sdk'
let { AWS_KEY_ID, AWS_ACCESS_KEY } = process.env;
let queueUrl;
console.log(`have key ID? ${!!AWS_KEY_ID}`)
console.log(`have key? ${!!AWS_ACCESS_KEY}`)

if (AWS_ACCESS_KEY === null) console.error('no AWS_ACCESS_KEY');
if (AWS_KEY_ID === null) console.error('no AWS_KEY_ID');

let sqs = new SQS({
  region: 'us-east-1'
, accessKeyId: AWS_KEY_ID
, secretAccessKey: AWS_ACCESS_KEY
});

sqs.createQueue(
  {QueueName: 'inventory'},
  (err, data) => {
    if (err) {
      console.log(err.code, err.message);
      queueUrl = 'error'
    }
    console.log(data)
    queueUrl = data.QueueUrl
  }
);

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

function queue(req, res, next) {
  sqs.sendMessage({
    MessageBody: 'helloo Bess', /* required */
    QueueUrl: queueUrl,
  }, (err, data) => {
    if (err) {
      console.log(err.code, err.message);
    }
    console.log(data)
  });
  res.send('success');
  next();
}

var server = Restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);
server.get('/queue', queue);
server.head('/queue', queue);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
