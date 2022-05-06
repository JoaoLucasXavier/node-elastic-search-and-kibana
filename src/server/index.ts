import express, { Request, Response } from 'express';
import router from '../app/router';
import UserService from '../app/services/UserService';
import elasticSearchClient from '../libs/elastic-search-client';

const app = express();

app.use(express.json());

router(app);

app.get('/', async (request: Request, response: Response) => {
  //   const result = await elasticSearchClient.index({
  //     index: 'game-of-thrones',
  //     document: {
  //       character: 'Ned Stark',
  //       quote: 'Winter is coming.',
  //     },
  //   });

  //   response.json(result);

  const userService = new UserService();
  const user = userService.getUsers();

  response.json(user);
});

app.listen(3333, () => {
  console.log('Server started on http://127.0.0.1:3333');
});
