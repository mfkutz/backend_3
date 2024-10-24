import { Router } from "express";
import { UserMock } from "../controllers/user.mock.js";

const router = Router();

router.get("/createUser", UserMock.createUser);
router.get("/createUsers/:quantity", UserMock.createUsers);

export default router;
