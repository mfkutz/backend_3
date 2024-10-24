import { Router } from "express";
import { TestingPerformance } from "../controllers/testing.controller.js";

const router = Router();

router.get("/simplex", TestingPerformance.simplex);
router.get("/complex", TestingPerformance.complex);

export default router;
