import express, { Request, Response, Router } from 'express';
import { Database } from '../common/database';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  new Database().connectToMongo();
  res.send('Hello Notes!');
});

export default router;
