import { userService } from "../services/user.service.js";

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req, res) {
    const { first_name, last_name, email, password } = req.body;
    try {
      if (!first_name || !last_name || !email || !password) {
        return res.status(404).json({ response: "Error", message: "All fields are required" });
      }
      const user = await userService.createUser({
        first_name,
        last_name,
        email,
        password,
      });
      res.status(200).json({ response: "User created", message: user });
    } catch (error) {
      res.status(500).json({ response: "error", message: error.message });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await userService.deleteUser(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const userController = new UserController();
