import { Router } from "express";
import { createSiteStat, getSiteStat } from "../controllers/siteStat.controllers";

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
 *   get:
 *     summary: Get all site statistics
 *     tags: [SiteStat]
 *     responses:
 *       200:
 *         description: A list of site time entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   site:
 *                     type: string
 *                   timeSpent:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */

router.post("/site-stat", createSiteStat);
router.get("/site-stat", getSiteStat);
export default router;
