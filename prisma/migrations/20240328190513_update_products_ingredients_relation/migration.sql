-- DropForeignKey
ALTER TABLE "products_ingredients" DROP CONSTRAINT "products_ingredients_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "products_ingredients" DROP CONSTRAINT "products_ingredients_product_id_fkey";

-- AddForeignKey
ALTER TABLE "products_ingredients" ADD CONSTRAINT "products_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_ingredients" ADD CONSTRAINT "products_ingredients_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
