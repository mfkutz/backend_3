import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const router = Router();

router.post("/", productController.addProduct);
router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.delete("/:id", productController.deleteProduct);
router.post("/createProductsFake/:quantity", productController.createProductsFake);

export default router;
