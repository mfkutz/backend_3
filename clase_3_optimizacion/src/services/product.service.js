import { productModel } from "../models/product.model.js";

export class ProductService {
  static async create(product) {
    return await productModel.create(product);
  }

  static async getAll() {
    return await productModel.find();
  }

  static async getById(id) {
    return await productModel.findById(id);
  }

  static async delete(id) {
    return await productModel.findByIdAndDelete(id);
  }
}
