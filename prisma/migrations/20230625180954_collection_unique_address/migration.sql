/*
  Warnings:

  - A unique constraint covering the columns `[contract_address]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "created_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_contract_address_key" ON "Collection"("contract_address");
