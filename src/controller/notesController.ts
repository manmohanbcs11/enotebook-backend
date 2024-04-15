import { ApiResponse } from "../common/apiResponse";
import { httpStatusCode } from "../common/httpStatusCodes";
import { Util } from "../common/utils";
import NoteModel, { Note } from "../models/NoteModel";
import UserModel, { User } from "../models/UserModel";

export class NotesController extends Util {
  constructor() {
    super();
  }

  public async fetchAllNotes(req: any) {
    let response: ApiResponse;
    try {
      const userId = req.user.id;
      const user: User = await UserModel.findById(userId).exec();
      if (!user) {
        return new ApiResponse(httpStatusCode.unauthorized, `User is Invalid.`);
      }

      console.log('Fetching all notes of user with id:', userId);
      const notes: Note[] = await NoteModel.find({ user: userId }).exec();
      response = new ApiResponse(httpStatusCode.success, 'Notes fetched successfully.', notes);
    } catch (err) {
      response = new ApiResponse(err?.statusCode ? err.statusCode : httpStatusCode.internalServerError, err.message);
    }
    return response;
  }

  public async insertNote(req: any) {
    let response: ApiResponse;
    try {
      const userId = req.user.id;
      const user: User = await UserModel.findById(userId).exec();

      if (!user) {
        return new ApiResponse(httpStatusCode.unauthorized, `User is Invalid.`);
      }

      Util.validateBody(req.body);
      const note: Note = await NoteModel.create({
        user: userId,
        title: req.body.title,
        description: req.body?.description,
        tag: req.body?.tag
      });
      response = new ApiResponse(httpStatusCode.success, 'Note created successfully.', note);
    } catch (err) {
      response = new ApiResponse(err?.statusCode ? err.statusCode : httpStatusCode.internalServerError, err.message);
    }
    return response;
  }

  public async updateNote(req: any) {
    let response: ApiResponse;
    try {
      const userId = req.user.id;
      let user: User = await UserModel.findById(userId).exec();
      if (!user) {
        return new ApiResponse(httpStatusCode.unauthorized, `User is Invalid.`);
      }

      if (!req.body.id) {
        return new ApiResponse(httpStatusCode.badRequest, `Note id is required.`);
      }
      Util.validateBody(req.body);

      let note: Note = await NoteModel.findById(req.body.id).exec();
      if (!note) {
        return new ApiResponse(httpStatusCode.notFound, `Note not found.`);
      } else if (note.user.toString() !== userId) {
        return new ApiResponse(httpStatusCode.unauthorized, `You are not authorized to update this note.`);
      }

      note = await NoteModel.findByIdAndUpdate(req.body.id, req.body, { new: true });
      response = new ApiResponse(httpStatusCode.success, 'Note updated successfully.', note);
    } catch (err) {
      response = new ApiResponse(err?.statusCode ? err.statusCode : httpStatusCode.internalServerError, err.message);
    }
    return response;
  }

  public async deleteNote(req: any) {
    let response: ApiResponse;
    try {
      const userId = req.user.id;
      const user: User = await UserModel.findById(userId).exec();
      if (!user) {
        return new ApiResponse(httpStatusCode.unauthorized, `User is Invalid.`);
      }

      if (!req.params.noteId) {
        return new ApiResponse(httpStatusCode.badRequest, `Note id is required.`);
      }

      let note: Note = await NoteModel.findById(req.params.noteId).exec();
      if (!note) {
        return new ApiResponse(httpStatusCode.notFound, `Note not found.`);
      } else if (note.user.toString() !== userId) {
        return new ApiResponse(httpStatusCode.unauthorized, `You are not authorized to delete this note.`);
        
      }

      note = await NoteModel.findByIdAndDelete(req.params.noteId);
      response = new ApiResponse(httpStatusCode.success, 'Note deleted successfully.', note);
    } catch (err) {
      response = new ApiResponse(err?.statusCode ? err.statusCode : httpStatusCode.internalServerError, err.message);
    }
    return response;
  }
}