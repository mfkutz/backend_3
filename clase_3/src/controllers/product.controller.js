import { productService } from "../services/product.service.js";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

class ProductController {
  async addProduct(req, res) {
    let { title, description, price, thumbnail, status, code, stock, category } = req.body;

    try {
      let product = await productService.create({
        title,
        description,
        price,
        thumbnail,
        status,
        code,
        stock,
        category,
      });
      res.status(201).json({ result: "Success", details: product });
    } catch (error) {
      res.status(500).json({ response: "Server error", details: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const allProducts = await productService.getAll();
      res.status(200).json({ result: "Success", products: allProducts });
    } catch (error) {
      res.status(500).json({ response: "Server error", details: error.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const product = await productService.getById(id);
      if (!product) return res.status(404).json({ result: "Product not found" });
      res.status(200).json({ result: "Product found", product });
    } catch (error) {
      res.status(500).json({ response: "Server error", details: error.message });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await productService.delete(id);
      if (!product)
        return res
          .status(404)
          .json({ response: "Error deleting product", details: "Product not found" });
      res.status(200).json({ response: "Product deleted successfully", message: product });
    } catch (error) {
      res.status(500).json({ response: "Server error", details: error.message });
    }
  }

  async createProductsFake(req, res) {
    const { quantity } = req.params;
    try {
      for (let i = 0; i < quantity; i++) {
        const title = faker.vehicle.bicycle().toLowerCase();
        const description = faker.lorem.lines(1);
        const price = faker.number.float({ min: 10, max: 200 }).toFixed(2);
        const thumbnail = faker.image.avatar();
        const status = faker.datatype.boolean({ probability: 0.5 });
        const code = uuidv4();
        const stock = faker.number.int({ min: 10, max: 60 });
        const category = "category fake";
        const data = {
          title,
          description,
          price,
          thumbnail,
          status,
          code,
          stock,
          category,
        };
        await productService.create(data);
      }
      res
        .status(200)
        .json({ response: "Product created", details: `Total products created:${quantity}` });
    } catch (error) {
      res.status(500).json({ response: "Server error", details: error.message });
    }
  }
}

export const productController = new ProductController();
