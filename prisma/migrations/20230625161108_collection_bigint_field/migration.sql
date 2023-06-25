/*
  Warnings:

  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
-- ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pkey",
-- ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
-- ALTER COLUMN "deploy_block_number" SET DATA TYPE BIGINT,
-- ALTER COLUMN "items_total" SET DATA TYPE BIGINT,
-- ALTER COLUMN "amounts_total" SET DATA TYPE BIGINT,
-- ALTER COLUMN "market_cap" SET DATA TYPE BIGINT,
-- ADD CONSTRAINT "Collection_pkey" PRIMARY KEY ("id");
