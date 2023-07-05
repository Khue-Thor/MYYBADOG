/*
  Warnings:

  - You are about to drop the column `last_ingested_at` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `last_updated_at` on the `Collection` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `Collection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "last_ingested_at",
DROP COLUMN "last_updated_at",
ADD COLUMN     "ingested_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
