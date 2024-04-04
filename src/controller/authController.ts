import { ApiResponse } from "../common/apiResponse";
import UserModel from "../models/UserModel";
import { Util } from "../common/utils";
import { httpStatusCode } from "../common/httpStatusCodes";

export class AuthController {
  public async signup(req: any) {
    let response: ApiResponse;
    try {
      Util.validateBody(req.body);
      const user = new UserModel(req.body);
      await user.save();
      response = new ApiResponse(httpStatusCode.success, 'User signed up successfully');
    } catch (err) {
      response = new ApiResponse(err?.statusCode? err.statusCode : httpStatusCode.internalServerError, err.message);
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
        response = new ApiResponse(httpStatusCode.notFound, `User with emailId ${emailId} not found.`);
      } else {
        response = new ApiResponse(httpStatusCode.success, `User with emailId ${emailId} found successfully.`, result);
      }
    } catch (err) {
      response = new ApiResponse(err?.statusCode? err.statusCode : httpStatusCode.internalServerError, err.message);
    }
    return response;
  }

  public async updateuser(req: any) {
    let response: ApiResponse;
    try {
      const result = await UserModel.findOneAndUpdate(req.body);
      if (result) {
        response = new ApiResponse(httpStatusCode.success, `User updated successfully.`, result);
      } else {
        response = new ApiResponse(httpStatusCode.notFound, `User not found.`);
      }
    } catch (err) {
      response = new ApiResponse(err.statusCode? err.statusCode : httpStatusCode.internalServerError, err.message);
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
        response = new ApiResponse(httpStatusCode.success, `User with emailId ${emailId} deleted successfully.`, result);
      } else {
        response = new ApiResponse(httpStatusCode.notFound, `User with emailId ${emailId} not found.`);
      }
    } catch (err) {
      response = new ApiResponse(err.statusCode? err.statusCode : httpStatusCode.internalServerError, err.message);
    }
    return response;
  }
}