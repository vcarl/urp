import Restify from 'restify'
import uuid    from 'uuid'
import Routes from './routes'
import validatedRoute from './validatedRoute'

let server = Restify.createServer();
server.use(Restify.bodyParser());

const VERSION = 'v0';

let buyTypes = [
  {field: 'quantity', type: 'integer', required: true}
  ,{field: 'price', type: 'float', required: true}
]



Routes.POST.forEach(function(route) {
  server.post(
    `/api/${VERSION}/${route.route}`
    ,validatedRoute(route.handler, route.validation)
  );
});

Routes.GET.forEach(function(route) {
  server.post(
    `/api/${VERSION}/${route.route}`
    ,validatedRoute(route.handler, route.validation)
  );
});

Routes.PUT.forEach(function(route) {
  server.post(
    `/api/${VERSION}/${route.route}`
    ,validatedRoute(route.handler, route.validation)
  );
});

Routes.DELETE.forEach(function(route) {
  server.post(
    `/api/${VERSION}/${route.route}`
    ,validatedRoute(route.handler, route.validation)
  );
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
