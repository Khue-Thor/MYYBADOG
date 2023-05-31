-- CreateTable
CREATE TABLE "raffles" (
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

    CONSTRAINT "raffles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT,
    "badges" JSON,
    "level" BIGINT,
    "quests" JSON,
    "friends" JSON,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "raffles_raffler_key" ON "raffles"("raffler");
