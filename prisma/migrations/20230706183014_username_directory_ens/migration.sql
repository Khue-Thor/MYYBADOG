-- AlterTable
ALTER TABLE "UsernameDirectory" ADD COLUMN     "ens_username" TEXT;

-- CreateIndex
CREATE INDEX "UsernameDirectory_ens_username_idx" ON "UsernameDirectory"("ens_username");
