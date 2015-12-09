import Restify from 'restify'
import uuid    from 'uuid'
import { buyItem, sellItem } from './inventory/index'

var server = Restify.createServer();
server.use(Restify.bodyParser())
server.post('/inventory/:id/buy', buyItem);
server.post('/inventory/:id/sell', sellItem);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
