import Restify from 'restify'
import uuid    from 'uuid'
import Routes from './inventory'
import validatedRoute from './validatedRoute'

let server = Restify.createServer();
server.use(Restify.bodyParser());

let buyTypes = [
  {field: 'quantity', type: 'integer', required: true}
  ,{field: 'price', type: 'float', required: true}
]

Routes.forEach(function(route) {
  server.post(route.route, validatedRoute(route.handler, route.validation));
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
