import { ApiResponse } from "../apiResponse";
import UserModel from "../models/UserModel";
import { Util } from "../utils";

export class AuthController {
  public async signup(req: any) {
    let response: ApiResponse;
    try {
      Util.validateBody(req.body);
      const user = new UserModel(req.body);
      await user.save();
      response = new ApiResponse(200, 'User signed up successfully');
    } catch (err) {
      response = new ApiResponse(err.statusCode, err.message);
    }
    return response;
  }

  public async getuser(req: any) {
    let response: ApiResponse;
    try {
      const emailId = req.params.emailid;
      console.log('Getting user details for emailId:', emailId);
      const result = await UserModel.find({ email: emailId }).exec();
      if (result.length === 0) {
        response = new ApiResponse(404, `User with emailId ${emailId} not found.`);
      } else {
        response = new ApiResponse(200, `User with emailId ${emailId} found successfully.`, result);
      }
    } catch (err) {
      response = new ApiResponse(err.statusCode, err.message);
    }
    return response;
  }

  public async updateuser(req: any) {
    let response: ApiResponse;
    try {
      const result = await UserModel.findOneAndUpdate(req.body);
      if (result) {
        response = new ApiResponse(200, `User updated successfully.`, result);
      } else {
        response = new ApiResponse(404, `User not found.`);
      }
    } catch (err) {
      response = new ApiResponse(err.statusCode, err.message);
    }
    return response;
  }

  public async deleteuser(req: any) {
    let response: ApiResponse;
    try {
      const emailId = req.params.emailid;
      console.log('Deleting user with emailId:', emailId);
      const result = await UserModel.findOneAndDelete({ email: emailId });
      if (result) {
        response = new ApiResponse(200, `User with emailId ${emailId} deleted successfully.`, result);
      } else {
        response = new ApiResponse(404, `User with emailId ${emailId} not found.`);
      }
    } catch (err) {
      response = new ApiResponse(err.statusCode, err.message);
    }
    return response;
  }
}