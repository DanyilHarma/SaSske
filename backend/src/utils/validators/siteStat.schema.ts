import { z } from "zod";

export const siteStatSchema = z.object({
    site: z.string().min(1, "Site is required"),
    timeSpent: z.number().int().nonnegative("Time must be a positive number"),
});

export type SiteStatInput = z.infer<typeof siteStatSchema>;
