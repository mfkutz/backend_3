import { userService } from "../services/user.service.js";
import { faker } from "@faker-js/faker";

class UserMock {
  async createMock(req, res) {
    const first_name = faker.person.firstName().toLocaleLowerCase();
    const last_name = faker.person.lastName().toLocaleLowerCase();
    const data = {
      first_name,
      last_name,
      email: first_name + last_name + "@mfk22.com",
      password: "1234",
    };
    const user = await userService.createUser(data);
    res.status(201).json({ response: "User created OK", message: user });
  }

  async createMocks(req, res) {
    const { quantity } = req.params;
    try {
      for (let i = 0; i < quantity; i++) {
        const first_name = faker.person.firstName().toLocaleLowerCase();
        const last_name = faker.person.lastName().toLocaleLowerCase();
        const data = {
          first_name,
          last_name,
          email: first_name + last_name + "@mfk22.com",
          password: "1234",
        };
        await userService.createUser(data);
      }
      res.status(201).json({ response: "Ok", message: `Total new users created: ${quantity}` });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }
}

export const userMock = new UserMock();
