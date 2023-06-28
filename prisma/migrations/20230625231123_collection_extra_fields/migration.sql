-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "asset_contract_type" TEXT,
ADD COLUMN     "blur_floor_price" DOUBLE PRECISION,
ADD COLUMN     "chain_identifier" TEXT,
ADD COLUMN     "contract_name" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "is_featured" BOOLEAN,
ADD COLUMN     "is_hidden" BOOLEAN,
ADD COLUMN     "is_nsfw" BOOLEAN,
ADD COLUMN     "looksrare_floor_price" DOUBLE PRECISION,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "version" DOUBLE PRECISION,
ALTER COLUMN "opensea_floor_price" DROP NOT NULL;
