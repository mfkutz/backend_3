import { userModel } from "../models/user.model.js";

class UserService {
  async getAllUsers() {
    return await userModel.find();
  }

  async createUser(user) {
    return await userModel.create(user);
  }

  async deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
  }
}

export const userService = new UserService();
