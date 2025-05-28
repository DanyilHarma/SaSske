import { siteStatSchema } from "../utils/validators/siteStat.schema";
import { Request, Response } from "express";
import { saveOrUpdateTime } from "../services/timeService";

export const createSiteStat = async (req: Request, res: Response) => {
    try {
        const parseResult = siteStatSchema.safeParse(req.body);

        if (!parseResult.success) {
            res.status(400).json({ error: "Invalid request data" });
            return;
        }

        const { site, timeSpent } = parseResult.data;

        const created = await saveOrUpdateTime(site, timeSpent);

        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
