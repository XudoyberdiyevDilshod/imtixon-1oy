// Start the code
import { read, write } from "../utils/model.js";

// ALL methods for subCategories

const subCategoryController = {
  // method get for subCategories
  GET: async (request, response) => {
    const { sub_category_id } = await request.body;
    const products = read("products");
    const subCategories = read("subCategories");

    subCategories.map((subCategory) => {
      subCategory.products = products.filter(
        (product) =>
          product.sub_category_id == product.sub_category_id &&
          delete product.sub_category_id
      );

      delete subCategory.category_id;
    });

    // find subCategoryId

    const subCategoryId = subCategories.find(
      (subCategory) => subCategory.sub_category_id == sub_category_id
    );

    if (subCategoryId) {
      response.json(200, subCategories);
    } else throw new Error("not found sub_category_id");
  },
  // method post for subCategories
  POST: async (request, response) => {
    try {
      const { category_id, sub_category_name } = await request.body;
      const subCategories = read("subCategories");
      const categories = read("categories");

      // validate sub_category_name
      if (!(sub_category_name.length > 1 && sub_category_name.trim())) {
        throw new Error("Not found subCategory");
      }

      // find categoryId

      const categoryId = categories.find(
        (categoryId) => categoryId.category_id == category_id
      );

      // create newsubcategory if you have categoryId

      if (categoryId) {
        const newSubCategory = {
          sub_category_id: subCategories.at(-1)?.sub_category_id + 1 || 1,
          category_id,
          sub_category_name,
        };
        subCategories.push(newSubCategory);
        write("subCategories", subCategories);
        response.json(201, {
          status: 201,
          message: true,
          data: newSubCategory,
        });
      } else throw new Error("not found category_id");
    } catch (error) {
      response.json(400, { status: 400, message: error.message });
    }
  },
  // method put for subCategories
  PUT: async (request, response) => {
    try {
      const { sub_category_id, sub_category_name } = await request.body;
      const subCategories = read("subCategories");

      const subCategory = subCategories.find(
        (subCategory) => subCategory.sub_category_id == sub_category_id
      );
      if (!subCategory) {
        throw new Error("not found subcategory");
      }

      // change subcategory name
      subCategory.sub_category_name =
        sub_category_name || subCategory.sub_category_name;

      write("subCategories", subCategories);
      response.json(200, { status: 200, message: true });
    } catch (error) {
      response.json(500, { status: 500, message: error.message });
    }
  },
  // method delete for subCategories
  DELETE: async (request, response) => {
    try {
      const { sub_category_id } = await request.body;
      const subCategories = read("subCategories");
      const subCategoryIndex = subCategories.findIndex(
        (subCategory) => subCategory.sub_category_id == sub_category_id
      );
      if (subCategoryIndex == -1) {
        throw new Error("subCategory not found...");
      }
      // delete subcategory
      const [deleted_subCategory] = subCategories.splice(subCategoryIndex, 1);

      write("subCategories", subCategories);
      response.json(204, { status: 200 });
    } catch (error) {
      response.json(400, { status: 400, message: error.message });
    }
  },
};

// export all categories

export default subCategoryController;
// Finished the code
