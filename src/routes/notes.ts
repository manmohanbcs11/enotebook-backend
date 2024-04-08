import express, { Request, Response, Router } from 'express';
import { Database } from '../common/database';
import { NotesController } from '../controller/notesController';
import { processRequest } from '../common/utils';
import { authorizer } from '../middleware/authorizer';

const router: Router = express.Router();
const notesController = new NotesController();

// fetch all notes of a user
router.get('/fetchnotes', authorizer, async (req: Request, res: Response) => {
  await processRequest(notesController.fetchAllNotes, req, res);
});


// add a note for a user
router.post('/addnote', authorizer, async (req: Request, res: Response) => {
  await processRequest(notesController.insertNote, req, res);
});

// update a note for a user
router.put('/updatenote', authorizer, async (req: Request, res: Response) => {
  await processRequest(notesController.updateNote, req, res);
});

// delete a note of a user
router.delete('/deletenote/:noteId', authorizer, async (req: Request, res: Response) => {
  await processRequest(notesController.deleteNote, req, res);
});

export default router;
