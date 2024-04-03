import express, { Request, Response, Router } from 'express';
import { AuthController } from '../controller/authController';
import { processRequest } from '../utils';

const router: Router = express.Router();
const authController = new AuthController();

// sign up a user
router.post('/signup', async (req: Request, res: Response) => {
  await processRequest(authController.signup, req, res);
});

// get user information by emailId
router.get('/getuser/:emailid', async (req: Request, res: Response) => {
  await processRequest(authController.getuser, req, res);
});

// update user information - not working
router.put('/updateuser', async (req: Request, res: Response) => {
  await processRequest(authController.updateuser, req, res);
});

// delete user by emailId
router.delete('/deleteuser/:emailid', async (req: Request, res: Response) => {
  await processRequest(authController.deleteuser, req, res);
});

export default router;
