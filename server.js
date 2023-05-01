import { createServer } from "http";
import Express from "./lib/express.js";

import adminController from "./controllers/admin.controller.js";
import categoryController from "./controllers/category.controller.js";
import productController from "./controllers/products.controller.js";
import subCategoryController from "./controllers/subCategory.controller.js";

const PORT = process.env.PORT || 7000;

function httpServer(req, res) {
  const app = new Express(req, res);

  // for admins
  app.get("/signin", adminController.GET);
  app.post("/signin", adminController.POST);
  // for admins

  // for categories
  app.get("/categories", categoryController.GET);
  app.post("/categories", categoryController.POST);
  app.put("/categories", categoryController.PUT);
  app.delete("/categories", categoryController.DELETE);
  // for categories

  // for subcategories
  app.get("/subcategories", subCategoryController.GET);
  app.post("/subcategories", subCategoryController.POST);
  app.put("/subcategories", subCategoryController.PUT);
  app.delete("/subcategories", subCategoryController.DELETE);
  // for subcategories

  // for products
  app.get("/products", productController.GET);
  app.post("/products", productController.POST);
  app.put("/products", productController.PUT);
  app.delete("/products", productController.DELETE);
  // for products
}

// createserver
createServer(httpServer).listen(PORT, () =>
  console.log("server running " + PORT)
);
