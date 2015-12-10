import Restify from 'restify'
import uuid    from 'uuid'
import { buyItem, sellItem } from './inventory/index'
import validatedRoute from './validatedRoute'

let server = Restify.createServer();
server.use(Restify.bodyParser());

let buyTypes = [
  {field: 'quantity', type: 'integer', required: true}
  ,{field: 'price', type: 'float', required: true}
]

server.post('/inventory/:id/buy', validatedRoute(buyItem, buyTypes));
server.post('/inventory/:id/sell', sellItem);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
