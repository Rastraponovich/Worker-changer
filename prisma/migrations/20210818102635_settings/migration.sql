-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mainParentIdent" INTEGER NOT NULL,
    "port" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "selected" BOOLEAN NOT NULL

);
