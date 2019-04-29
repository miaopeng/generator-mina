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

server.use(require('./list'));

server.post('/api/register', (req, res) => {
  // res.json({
  //   code: 1,
  //   msg: '成功',
  //   data: {
  //     sessionKey: 'uf65nSqlh8FebkEXbRN/7w==',
  //     openid: 'o-7f15TMLxLO6jNAjy4_wFINTlOk',
  //     unionid: null
  //   }
  // });
  // res.sendStatus(401);
  res.json({
    code: 1,
    data: null,
    msg: '成功'
  });
});

server.post('/api/voucher/gift', (req, res) => {
  res.json(util.ok({ data: { giftId: 123 } }));
});

server.get('/api/voucher/gift/:id', (req, res) => {
  res.json(
    util.ok({
      data: {
        fromNickname: '李强',
        giftName: '飞天茅台酒劵',
        amount: 2
      }
    })
  );
});

server.post('/api/reward/list', (req, res) => {
  res.json(
    util.ok({
      data: {
        totalReward: 106.44,
        list: [
          {
            nickname: 'Berge',
            crtTime: '2019-04-08',
            total: 26.12,
            products: [
              {
                productName: '茅台飞天56度',
                amount: 2,
                basePrice: 1888.9,
                reward: 20.32
              },
              {
                productName: '茅台迎宾酒',
                amount: 1,
                basePrice: 188.0,
                reward: 5.8
              }
            ]
          },
          {
            nickname: 'Jack',
            crtTime: '2019-03-18',
            total: 80.32,
            products: [
              {
                productName: '茅台飞天56度',
                amount: 12,
                basePrice: 5888.9,
                reward: 80.32
              }
            ]
          }
        ]
      }
    })
  );
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
