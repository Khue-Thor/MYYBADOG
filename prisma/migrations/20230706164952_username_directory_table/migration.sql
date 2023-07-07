-- CreateTable
CREATE TABLE "UsernameDirectory" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "opensea_username" TEXT,
    "looksrare_username" TEXT,
    "blur_username" TEXT,
    "twitter_username" TEXT,
    "discord_username" TEXT,
    "threads_username" TEXT,
    "facebook_username" TEXT,
    "instagram_username" TEXT,
    "snapchat_username" TEXT,
    "linkedin_username" TEXT,
    "pinterest_username" TEXT,
    "telegram_username" TEXT,
    "whatsapp_username" TEXT,
    "wechat_username" TEXT,
    "twitch_username" TEXT,
    "reddit_username" TEXT,
    "meetup_username" TEXT,
    "tiktok_username" TEXT,
    "weibo_username" TEXT,
    "youtube_username" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsernameDirectory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsernameDirectory_address_key" ON "UsernameDirectory"("address");

-- CreateIndex
CREATE INDEX "UsernameDirectory_address_idx" ON "UsernameDirectory"("address");
