/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Tasks_id_user_id_key` ON `Tasks`(`id`, `user_id`);
