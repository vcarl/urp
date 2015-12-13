import { SQS } from 'aws-sdk'

let { AWS_KEY_ID, AWS_ACCESS_KEY } = process.env;
console.log(`have key ID? ${!!AWS_KEY_ID}`)
console.log(`have key? ${!!AWS_ACCESS_KEY}`)

if (AWS_ACCESS_KEY === null) console.error('no AWS_ACCESS_KEY');
if (AWS_KEY_ID === null) console.error('no AWS_KEY_ID');

let sqs = new SQS({
  region: 'us-east-1'
  ,accessKeyId: AWS_KEY_ID
  ,secretAccessKey: AWS_ACCESS_KEY
});

let queueUrl;
sqs.createQueue(
  {QueueName: 'inventory'},
  (err, data) => {
    if (err) {
      console.log(err.code, err.message);
      queueUrl = 'error'
    }
    console.log('Connected to queue at: ', data.QueueUrl)
    queueUrl = data.QueueUrl
  }
);

export { queueUrl }
export default sqs
