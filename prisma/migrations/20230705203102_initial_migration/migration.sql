-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'MODERATOR', 'BOT', 'AI');

-- CreateEnum
CREATE TYPE "EnumOfferStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "last_logged_in" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT,
    "badges" JSON[],
    "level" BIGINT DEFAULT 0,
    "quests" JSON[],
    "inventory" JSON[],
    "nonce" TEXT,
    "profile_picture" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRaffle" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "raffle_id" TEXT NOT NULL,

    CONSTRAINT "UserRaffle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "nft_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "from_id" TEXT NOT NULL,
    "to_id" TEXT NOT NULL,
    "nft_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "message" TEXT,
    "status" "EnumOfferStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raffle" (
    "id" TEXT NOT NULL,
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
    "transaction_list" JSON[],
    "favourite_count" INTEGER,
    "nft_image" VARCHAR,
    "raffler_id" TEXT,

    CONSTRAINT "Raffle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFT" (
    "id" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "collection_id" BIGINT,
    "owner_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "listed_at" TIMESTAMP(3),
    "category_id" BIGINT,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "dispensed" BIGINT NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardEarned" (
    "id" SERIAL NOT NULL,
    "dispensed" BIGINT NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "RewardEarned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" BIGSERIAL NOT NULL,
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
    "deploy_block_number" BIGINT NOT NULL,
    "owner" TEXT NOT NULL,
    "contract_deployer" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "opensea_verified" BOOLEAN NOT NULL,
    "baddogs_verified" BOOLEAN NOT NULL,
    "rug_verified" BOOLEAN NOT NULL,
    "sus_verified" BOOLEAN NOT NULL,
    "royalty" DOUBLE PRECISION,
    "items_total" BIGINT NOT NULL,
    "amounts_total" BIGINT NOT NULL,
    "owners_total" INTEGER NOT NULL,
    "opensea_floor_price" DOUBLE PRECISION,
    "floor_price" DOUBLE PRECISION NOT NULL,
    "collections_with_same_name" JSONB,
    "price_symbol" TEXT NOT NULL,
    "volume_total" DOUBLE PRECISION,
    "sales_total" INTEGER,
    "average_price" DOUBLE PRECISION,
    "lowest_price_24h" DOUBLE PRECISION,
    "average_price_24h" DOUBLE PRECISION,
    "volume_24h" DOUBLE PRECISION,
    "sales_24h" INTEGER,
    "highest_price" DOUBLE PRECISION,
    "volume_1d" DOUBLE PRECISION,
    "volume_7d" DOUBLE PRECISION,
    "volume_30d" DOUBLE PRECISION,
    "volume_change_1d" TEXT,
    "volume_change_7d" TEXT,
    "volume_change_30d" TEXT,
    "market_cap" BIGINT,
    "average_price_change_1d" TEXT,
    "average_price_change_7d" TEXT,
    "average_price_change_30d" TEXT,
    "last_ingested_at" TIMESTAMP(3),
    "last_updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3),
    "asset_contract_type" TEXT,
    "blur_floor_price" DOUBLE PRECISION,
    "chain_identifier" TEXT,
    "contract_name" TEXT,
    "image_url" TEXT,
    "is_featured" BOOLEAN,
    "is_hidden" BOOLEAN,
    "is_nsfw" BOOLEAN,
    "looksrare_floor_price" DOUBLE PRECISION,
    "slug" TEXT,
    "version" DOUBLE PRECISION,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_address_idx" ON "User"("address");

-- CreateIndex
CREATE INDEX "Purchase_id_idx" ON "Purchase"("id");

-- CreateIndex
CREATE INDEX "Listing_id_idx" ON "Listing"("id");

-- CreateIndex
CREATE INDEX "Offer_id_idx" ON "Offer"("id");

-- CreateIndex
CREATE INDEX "Raffle_id_idx" ON "Raffle"("id");

-- CreateIndex
CREATE INDEX "NFT_owner_id_idx" ON "NFT"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "RewardEarned_id_idx" ON "RewardEarned"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_contract_address_key" ON "Collection"("contract_address");

-- CreateIndex
CREATE INDEX "Collection_contract_address_idx" ON "Collection"("contract_address");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRaffle" ADD CONSTRAINT "UserRaffle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRaffle" ADD CONSTRAINT "UserRaffle_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "Raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_raffler_id_fkey" FOREIGN KEY ("raffler_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardEarned" ADD CONSTRAINT "RewardEarned_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
