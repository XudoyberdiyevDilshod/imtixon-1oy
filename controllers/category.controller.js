// Start the code
import { read, write } from "../utils/model.js";

// ALL methods for categories

const categoryController = {
  // method get for categories
  GET: (req, res) => {
    const subCategories = read("subCategories");
    const categories = read("categories");

    categories.map((category) => {
      category.subcategories = subCategories.filter(
        (subcategory) =>
          subcategory.category_id == category.category_id &&
          delete subcategory.category_id
      );
    });

    res.json(200, categories);
  },

  // method post for categories
  POST: async (req, res) => {
    try {
      const { category_name } = await req.body;
      const categories = read("categories");

      // validate category_name

      if (!(category_name.length > 2 && category_name.trim())) {
        throw new Error("invalid username");
      }

      // create newCategory

      const newCategory = {
        category_id: categories.at(-1)?.category_id + 1 || 1,
        category_name,
      };

      categories.push(newCategory);
      write("categories", categories);
      res.json(201, { status: 201, message: true, data: newCategory });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
  // method put for categories
  PUT: async (req, res) => {
    try {
      const { category_id, category_name } = await req.body;
      const categories = read("categories");
      const category = categories.find(
        (category) => category.category_id == category_id
      );
      // validate category
      if (!category) {
        throw new Error("category not found");
      }


      // change category_name

      category.category_name = category_name || category.category_name;

      write("categories", categories);
      res.json(200, { status: 200, message: true });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
  // method delete for categories
  DELETE: async (req, res) => {
    try {
      const { category_id } = await req.body;
      const categories = read("categories");
      const categoryIndex = categories.findIndex(
        (category) => category.category_id == category_id
      );
      if (categoryIndex == -1) {
        throw new Error("category not found...");
      }


      // delete category

      const [deleted_Category] = categories.splice(categoryIndex, 1);

      write("categories", categories);
      res.json(204, { status: 204 });
    } catch (error) {
      res.json(500, { status: 500, message: error.message });
    }
  },
};

// export all categories
export default categoryController;
// Finished the code
