import dotenv from 'dotenv';
import express from 'express';
import authRouter from './routes/auth';
import notesRouter from './routes/notes';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use('/api/auth/', authRouter);
app.use('/api/notes/', notesRouter);

app.listen(port, () => {
  console.log(`eNotebook backend is listening at http://localhost:${port}`);
});
