import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/register", userController.createUser);
router.delete("/:id", userController.deleteUser);

export default router;
