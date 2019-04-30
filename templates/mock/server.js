/* eslint no-unused-vars: "off" */
const fs = require('fs');
const jsonServer = require('json-server');
const simulateLatency = require('express-simulate-latency');
const util = require('./util');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const smallLag = simulateLatency({ min: 100, max: 500 });
const lag = simulateLatency({ min: 800, max: 1600 });
server.use(smallLag);

server.get('/api/cart', (req, res) => {
  res.json({
    code: 1,
    data: {
      count: 2
    },
    msg: 'ok'
  });
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
