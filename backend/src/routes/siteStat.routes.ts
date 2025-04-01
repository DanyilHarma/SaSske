import { Router } from "express";
import { createSiteStat } from "../controllers/siteStat.controllers";

const router = Router();

router.post("/site-stat", createSiteStat);
console.log(createSiteStat);
export default router;
