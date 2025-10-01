-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rank" TEXT NOT NULL DEFAULT 'C',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" TEXT,
    "shirtNumber" INTEGER NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Players_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Matches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "scoreHome" INTEGER,
    "scoreAway" INTEGER,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Matches_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Matches_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InternalMathes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "teamid" TEXT NOT NULL,
    "score" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InternalMathes_teamid_fkey" FOREIGN KEY ("teamid") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_InternalMatchToPlayer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_InternalMatchToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "InternalMathes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InternalMatchToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Players" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Teams_email_key" ON "Teams"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_InternalMatchToPlayer_AB_unique" ON "_InternalMatchToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_InternalMatchToPlayer_B_index" ON "_InternalMatchToPlayer"("B");
