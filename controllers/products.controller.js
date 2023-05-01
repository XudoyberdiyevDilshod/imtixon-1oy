// Start the code
import { read, write } from "../utils/model.js";

// ALL methods for products

const productController = {
  // method get for products
  GET: (request, response) => {
    const products = read("products");
    const subCategories = read("subCategories");
    const { sub_category_id, category_id, model, color } = request.query;
    const arr = [];
    // filter with sub_category_id
    const product = products.filter(
      (product) => product.sub_category_id == sub_category_id
    );

    // find sub_category_id
    const subCategoryId = subCategories.find(
      (subCategory) => subCategory.sub_category_id == sub_category_id
    );

    if (!subCategoryId) {
      return response.json(200, arr);
    }

    response.json(200, product);
  },
  // method post for products
  POST: async (request, response) => {
    try {
      const { sub_category_id, product_name, price, color, model } =
        await request.body;
      const products = read("products");
      const subCategories = read("subCategories");

      // validate product_name

      if (!(product_name.length > 1 && product_name.trim())) {
        throw new Error("Not found product");
      }
      // find sub_category_id
      const subCategoryId = subCategories.find(
        (subCategory) => subCategory.sub_category_id == sub_category_id
      );
      // create newproduct
      if (subCategoryId) {
        const newProduct = {
          product_id: products.at(-1)?.product_id + 1 || 1,
          sub_category_id,
          model,
          product_name,
          color,
          price,
        };

        products.push(newProduct);
        write("products", products);
        response.json(201, { status: 201, message: true, data: newProduct });
      } else throw new Error("not found sub_category_id");
    } catch (error) {
      response.json(400, { status: 400, message: error.message });
    }
  },
  // method put for products
  PUT: async (request, response) => {
    try {
      const { product_id, product_name, price, model, color } =
        await request.body;
      const products = read("products");

      const product = products.find(
        (product) => product.product_id == product_id
      );
      if (!product) {
        throw new Error("not found product");
      }
      // change names product
      product.model = model || product.model;
      product.product_name = product_name || product.product_name;
      product.color = color || product.color;
      product.price = price || product.price;

      write("products", products);
      response.json(200, { status: 200, message: true });
    } catch (error) {
      response.json(400, { status: 400, message: error.message });
    }
  },
  // method delete for products
  DELETE: async (request, response) => {
    try {
      const { product_id } = await request.body;
      const products = read("products");
      const productIndex = products.findIndex(
        (product) => product.product_id == product_id
      );

      if (productIndex == -1) {
        throw new Error("product not found...");
      }
      // delete product
      const [deleted_product] = products.splice(productIndex, 1);
      console.log(deleted_product);
      write("products", products);
      response.json(204, { status: 204 });
    } catch (error) {
      response.json(500, { status: 500, message: error.message });
    }
  },
};

export default productController;
