import { Router } from "express";
import { userMock } from "../controllers/user.mock.js";

const router = Router();

router.post("/mock", userMock.createMock);
router.post("/mocks/:quantity", userMock.createMocks);

export default router;
