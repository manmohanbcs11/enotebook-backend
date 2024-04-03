import { Request, Response } from 'express';
import { ApiResponse } from './apiResponse';
import { Database } from './database';

export class Util {
  public static isEmpty(data: any): boolean {
    if (data === null || data === '' || data === 'undefined' || data.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  public static validateBody(body: any) {
    if (Object.keys(body).length > 0) {
      for (const key in body) {
        if (Util.isEmpty(body[key])) {
          throw new Error('All fields are required.');
        } else if (key === 'email') {
          if (!body[key].match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new Error('Invalid email address.');
          }
        }
      }
    } else {
      throw new Error('Invalid request body.');
    }
  }
}

export async function processRequest(callback: Function, req: Request, res: Response) {
  await new Database().connectToMongo();
  const response: ApiResponse = await callback(req);
  res.send(response);
}