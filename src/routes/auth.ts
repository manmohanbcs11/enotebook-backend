import express, { Request, Response, Router } from 'express';
import { Database } from '../database';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  console.log('body:', req.body);
  console.log('params:', req.params);
  new Database().connectToMongo();
  res.send('Hello Auth!');
});

export default router;
