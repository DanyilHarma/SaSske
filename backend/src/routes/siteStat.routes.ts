import { Router } from "express";
import { createSiteStat } from "../controllers/siteStat.controllers";

const router = Router();

/**
 * @swagger
 * /site-stat:
 *   post:
 *     summary: Save time spent on a website
 *     tags: [SiteStat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               site:
 *                 type: string
 *               timeSpent:
 *                 type: integer
 *             required:
 *               - site
 *               - timeSpent
 *     responses:
 *       201:
 *         description: Time entry created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

router.post("/site-stat", createSiteStat);
console.log(createSiteStat);
export default router;
