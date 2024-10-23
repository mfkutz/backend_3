import { userModel } from "../models/user.model.js";

export class UserService {
  static async getAllUsers() {
    return await userModel.find();
  }

  static async createUser(user) {
    return await userModel.create(user);
  }

  static async deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
  }
}
