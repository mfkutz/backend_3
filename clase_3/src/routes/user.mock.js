import { Router } from "express";
import { userMock } from "../controllers/user.mock.js";

const router = Router();

router.post("/createUser", userMock.createUser);
router.post("/createUsers/:quantity", userMock.createUsers);

export default router;
