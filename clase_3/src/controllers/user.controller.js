import { UserService } from "../services/user.service.js";
import { CustomError } from "../utils/errors/custom.error.js";
import errors from "../utils/errors/dictionaty.errors.js";

export class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    const { first_name, last_name, email, password } = req.body;
    try {
      if (!first_name || !last_name || !email || !password) {
        CustomError.newError(errors.badRequest);
      }

      console.log("pasó el if");
      const user = await UserService.createUser({
        first_name,
        last_name,
        email,
        password,
      });
      res.status(200).json({ response: "User created", message: user });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserService.deleteUser(id);
      if (!user) {
        return CustomError.newError(errors.notFound);
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
