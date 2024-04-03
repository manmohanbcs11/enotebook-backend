import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Note extends Document {
  title: string;
  description: string;
  tag: string;
  createdDate: Date;
}

const noteSchema: Schema<Note> = new Schema({
  title: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'General'
  },
  description: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const NoteModel: Model<Note> = mongoose.model<Note>('Note', noteSchema);

export default NoteModel;
