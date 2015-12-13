import sqs, { queueUrl } from './queue';

export function handleMessage(res) {
  return (err, data) => {
    if (err) {
      res.send(new Restify.errors.ServiceUnavailableError('Error from SQS'));
      next();
    }
    res.send();
    next();
  };
}

export function sendInventoryMessage(item, quantity, price, cb) {
  let message = {
    id: item
    ,quantity
    ,price
  }

  sqs.sendMessage({
    MessageBody: JSON.stringify(message),
    QueueUrl: queueUrl,
  }, cb);
}
