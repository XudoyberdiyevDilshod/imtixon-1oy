// Start the code
import { read, write } from "../utils/model.js";

// ALL methods for products

const productController = {
  // method get for products
  GET: (req, res) => {
    const products = read("products");
    const subCategories = read("subCategories");
    const { sub_category_id, category_id, model, color } = req.query;

    // filter with sub_category_id
    const product = products.filter(
      (product) => product.sub_category_id == sub_category_id
    );

    // find sub_category_id
    const productId = subCategories.find(
      (subCategory) => subCategory.sub_category_id == sub_category_id
    );

    if (productId) {
      res.json(200, product);
    } else throw new Error("not found sub_category_id");
  },
  // method post for products
  POST: async (req, res) => {
    try {
      const { sub_category_id, product_name, price, color, model } =
        await req.body;
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
        res.json(201, { status: 201, message: true, data: newProduct });
      } else throw new Error("not found sub_category_id");
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
  // method put for products
  PUT: async (req, res) => {
    try {
      const { product_id, product_name, price, model, color } = await req.body;
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
      res.json(200, { status: 200, message: true });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
  // method delete for products
  DELETE: async (req, res) => {
    try {
      const { product_id } = await req.body;
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
      res.json(204, { status: 204 });
    } catch (error) {
      res.json(500, { status: 500, message: error.message });
    }
  },
};

export default productController;
