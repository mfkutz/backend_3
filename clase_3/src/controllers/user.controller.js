import { userService } from "../services/user.service.js";
import { CustomError } from "../utils/errors/custom.error.js";
import errors from "../utils/errors/dictionaty.errors.js";

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    const { first_name, last_name, email, password } = req.body;
    try {
      if (!first_name || !last_name || !email || !password) {
        CustomError.newError(errors.badRequest);
      }

      console.log("pasó el if");
      const user = await userService.createUser({
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

  async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const user = await userService.deleteUser(id);
      if (!user) {
        return CustomError.newError(errors.notFound);
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
