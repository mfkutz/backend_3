import { Router } from "express";
import userRoutes from "./user.routes.js";
import userMockRoutes from "./user.mock.js";
import productRoutes from "./product.routes.js";
import testingRoutes from "./testing.routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/user-mock", userMockRoutes);
router.use("/products", productRoutes);
router.use("/testing", testingRoutes);

export default router;
