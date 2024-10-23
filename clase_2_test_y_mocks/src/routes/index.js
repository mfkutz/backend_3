import { Router } from "express";
import userRoutes from "./user.routes.js";
import userMocksRoutes from "./user.mock.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/create", userMocksRoutes);

export default router;
