import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

const router = Router();

router.post("/", ProductController.addProduct);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.delete("/:id", ProductController.deleteProduct);
router.post("/createProductsFake/:quantity", ProductController.createProductsFake);

export default router;
