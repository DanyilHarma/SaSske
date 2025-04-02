import { prisma } from "../db/client";

export const saveTime = async (site: string, timeSpent: number) => {
    return await prisma.siteState.create({
        data: { site, timeSpent },
    });
};
