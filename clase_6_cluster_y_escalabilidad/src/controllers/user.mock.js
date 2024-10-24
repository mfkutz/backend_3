import { UserService } from "../services/user.service.js";
import { faker } from "@faker-js/faker";

export class UserMock {
  static async createUser(req, res) {
    try {
      const first_name = faker.person.firstName().toLowerCase();
      const last_name = faker.person.lastName().toLowerCase();
      const data = {
        first_name,
        last_name,
        email: first_name + last_name + "@mfk23.com",
        password: "1234",
      };
      const user = await UserService.createUser(data);
      res.status(201).json({ response: "User created OK", message: user });
    } catch (error) {
      res.status(500).json({ response: "Server error", details: error.message });
    }
  }

  static async createUsers(req, res) {
    const { quantity } = req.params;
    try {
      for (let i = 0; i < quantity; i++) {
        const first_name = faker.person.firstName().toLowerCase();
        const last_name = faker.person.lastName().toLowerCase();
        const data = {
          first_name,
          last_name,
          email: first_name + last_name + "@mfk23.com",
          password: "1234",
        };
        await UserService.createUser(data);
      }
      res
        .status(201)
        .json({ response: "Users created OK", message: `Total users created: ${quantity}` });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }
}
