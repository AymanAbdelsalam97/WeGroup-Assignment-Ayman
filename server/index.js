/**
 * Please do not edit this file
 */
import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('./server/db.json');
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  const delay = 2000;
  setTimeout(() => next(), delay);
});

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log('\x1b[32m%s\x1b[0m', 'JSON Server is running');
  console.log('\x1b[34m%s\x1b[0m', 'Database URL: http://localhost:3001');
});