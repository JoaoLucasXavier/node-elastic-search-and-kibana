import { Response } from 'express';
import elasticSearchClient from '../../libs/elastic-search-client';
import UserService from '../services/UserService';

export default class UserController {
  constructor() {}

  async dataLoad(request: Request, response: Response) {
    const userService = new UserService();
    const users = userService.getUsers();
    for await (const item of users) {
      await elasticSearchClient.index(
        {
          index: 'users',
          document: item,
        },
        (error: any) => {
          if (error) {
            return response.status(400).json({ error: error });
          }
        },
      );
    }

    return response.json({ message: 'Data load saved successfully.' });
  }

  async getAll(request: Request, response: Response) {
    const userService = new UserService();
    const users = userService.getUsers();

    response.json(users);
  }

  async findOne(request: Request, response: Response) {}

  async create(request: Request, response: Response) {
    const { id, first_name, last_name, email, gender, photo, ip_address }: any =
      request.body;

    await elasticSearchClient.index(
      {
        index: 'users',
        document: {
          id,
          first_name,
          last_name,
          email,
          gender,
          photo,
          ip_address,
        },
      },
      (error: any) => {
        if (error) {
          return response.status(400).json({ error: error });
        }
      },
    );

    return response.json({ message: 'Users saved successfully' });
  }

  async update(request: Request, response: Response) {}

  async delete(request: Request, response: Response) {}

  async deleteAll(request: Request, response: Response) {}
}
