-- CreateTable
CREATE TABLE "SiteState" (
    "id" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteState_pkey" PRIMARY KEY ("id")
);
