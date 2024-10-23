import { Router } from "express";
import { UserMock } from "../controllers/user.mock.js";

const router = Router();

router.post("/createUser", UserMock.createUser);
router.post("/createUsers/:quantity", UserMock.createUsers);

export default router;
