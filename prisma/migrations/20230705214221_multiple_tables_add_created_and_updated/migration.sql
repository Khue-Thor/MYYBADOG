/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `purchased_at` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `dispensed` on the `RewardEarned` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `RewardEarned` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchased_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RewardEarned" DROP COLUMN "dispensed",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
