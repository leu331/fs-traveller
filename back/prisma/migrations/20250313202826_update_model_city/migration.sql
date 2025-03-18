/*
  Warnings:

  - You are about to drop the column `locationsCount` on the `City` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "locationsCount",
ADD COLUMN     "foodAndDrinksCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "organizedEventsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "touristSpotsCount" INTEGER NOT NULL DEFAULT 0;
