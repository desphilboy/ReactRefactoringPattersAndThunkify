import express from 'express';
import cors from 'cors';
import { nameType } from './fixtures/name-type';
import { animals } from './fixtures/animals';

const server = express();

server.use(cors());

server.get('/type/:name', async (req, res) => {
  res.set();
  console.log('got request for type with name=', req.params.name);
  await setTimeout(() => res.send({ status: 200, type: nameType[req.params.name] || 'NotFound' }), 3000);
});

server.get('/info/:type', async (req, res) => {
  console.log('got request for info with type=', req.params.name);
  await setTimeout(() => res.send({ status: 200, info: animals[req.params.type] || {} }), 300);
});

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(3010, () => console.log('Server is running on port 3010'));
