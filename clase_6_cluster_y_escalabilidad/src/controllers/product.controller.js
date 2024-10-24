import { ProductService } from "../services/product.service.js";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../utils/errors/custom.error.js";
import errors from "../utils/errors/dictionaty.errors.js";

export class ProductController {
  static async addProduct(req, res, next) {
    let { title, description, price, thumbnail, status, code, stock, category } = req.body;

    try {
      if (
        !title ||
        !description ||
        !price ||
        !thumbnail ||
        !status ||
        !code ||
        !stock ||
        !category
      ) {
        CustomError.newError(errors.badRequest);
      }
      let product = await ProductService.create({
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
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const allProducts = await ProductService.getAll();
      res.status(200).json({ result: "Success", products: allProducts });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await ProductService.getById(id);
      if (!product) CustomError.newError(errors.notFound);

      res.status(200).json({ result: "Product found", product });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const product = await ProductService.delete(id);
      if (!product) CustomError.newError(errors.notFound);

      res.status(200).json({ response: "Product deleted successfully", message: product });
    } catch (error) {
      next(error);
    }
  }

  static async createProductsFake(req, res, next) {
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
        await ProductService.create(data);
      }
      res
        .status(200)
        .json({ response: "Product created", details: `Total products created:${quantity}` });
    } catch (error) {
      next(error);
    }
  }
}
