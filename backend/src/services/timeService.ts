import { prisma } from "../db/client";

export const saveOrUpdateTime = async (site: string, timeSpent: number) => {
    const existing = await prisma.siteState.findFirst({ where: { site } });

    if (existing) {
        return await prisma.siteState.update({
            where: { id: existing.id },
            data: { timeSpent: existing.timeSpent + timeSpent },
        });
    } else {
        return await prisma.siteState.create({
            data: { site, timeSpent },
        });
    }
};
