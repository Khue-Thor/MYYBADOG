/*
  Warnings:

  - The `badges` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `quests` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `friends` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `raffles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[address]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "inventory" JSON[],
ADD COLUMN     "last_logged_in" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nonce" TEXT,
DROP COLUMN "badges",
ADD COLUMN     "badges" JSON[],
ALTER COLUMN "level" SET DEFAULT 0,
DROP COLUMN "quests",
ADD COLUMN     "quests" JSON[],
DROP COLUMN "friends",
ADD COLUMN     "friends" JSON[];

-- DropTable
DROP TABLE "raffles";

-- CreateTable
CREATE TABLE "Raffle" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "token_id" INTEGER,
    "nft_address" VARCHAR,
    "start_date" TIMESTAMPTZ(6),
    "end_date" TIMESTAMPTZ(6),
    "raffle_cost" REAL,
    "max_tickets" INTEGER,
    "sold_tickets" INTEGER,
    "created_by" VARCHAR,
    "participant_list" JSON[],
    "transaction_list" JSON[],
    "favourite_count" INTEGER,
    "nft_image" VARCHAR,
    "raffler" VARCHAR,

    CONSTRAINT "Raffle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" BIGSERIAL NOT NULL,
    "dispensed" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "contract_address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "email" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "telegram" TEXT,
    "github" TEXT,
    "instagram" TEXT,
    "medium" TEXT,
    "logo_url" TEXT,
    "banner_url" TEXT,
    "featured_url" TEXT,
    "large_image_url" TEXT,
    "attributes" JSONB,
    "erc_type" TEXT NOT NULL,
    "token_type" TEXT NOT NULL,
    "deploy_block_number" INTEGER NOT NULL,
    "owner" TEXT NOT NULL,
    "contract_deployer" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "opensea_verified" BOOLEAN NOT NULL,
    "baddogs_verified" BOOLEAN NOT NULL,
    "rug_verified" BOOLEAN NOT NULL,
    "sus_verified" BOOLEAN NOT NULL,
    "royalty" DOUBLE PRECISION,
    "items_total" INTEGER NOT NULL,
    "amounts_total" INTEGER NOT NULL,
    "owners_total" INTEGER NOT NULL,
    "opensea_floor_price" DOUBLE PRECISION NOT NULL,
    "floor_price" DOUBLE PRECISION NOT NULL,
    "collections_with_same_name" JSONB,
    "price_symbol" TEXT NOT NULL,
    "volume_total" DOUBLE PRECISION NOT NULL,
    "sales_total" INTEGER NOT NULL,
    "average_price" DOUBLE PRECISION NOT NULL,
    "lowest_price_24h" DOUBLE PRECISION NOT NULL,
    "average_price_24h" DOUBLE PRECISION NOT NULL,
    "volume_24h" DOUBLE PRECISION NOT NULL,
    "sales_24h" INTEGER NOT NULL,
    "highest_price" DOUBLE PRECISION NOT NULL,
    "volume_1d" DOUBLE PRECISION NOT NULL,
    "volume_7d" DOUBLE PRECISION NOT NULL,
    "volume_30d" DOUBLE PRECISION NOT NULL,
    "volume_change_1d" TEXT NOT NULL,
    "volume_change_7d" TEXT NOT NULL,
    "volume_change_30d" TEXT NOT NULL,
    "market_cap" INTEGER NOT NULL,
    "average_price_change_1d" TEXT NOT NULL,
    "average_price_change_7d" TEXT NOT NULL,
    "average_price_change_30d" TEXT NOT NULL,
    "last_ingested_at" TIMESTAMP(3),
    "last_updated_at" TIMESTAMP(3),

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Raffle_raffler_key" ON "Raffle"("raffler");

-- CreateIndex
CREATE UNIQUE INDEX "users_address_key" ON "users"("address");
