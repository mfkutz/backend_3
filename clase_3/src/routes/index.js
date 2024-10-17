import { Router } from "express";
import userRoutes from "./user.routes.js";
import userMockRoutes from "./user.mock.js";
import productRoutes from "./product.routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/user-mock", userMockRoutes);
router.use("/products", productRoutes);

export default router;
