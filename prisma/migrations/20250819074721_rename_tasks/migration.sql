/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_authorId_fkey";

-- DropTable
DROP TABLE "public"."Task";

-- CreateTable
CREATE TABLE "public"."t1sks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "t1sks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "t1sks_slug_key" ON "public"."t1sks"("slug");

-- CreateIndex
CREATE INDEX "t1sks_slug_idx" ON "public"."t1sks"("slug");

-- AddForeignKey
ALTER TABLE "public"."t1sks" ADD CONSTRAINT "t1sks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
