import { productModel } from "../models/product.model.js";

class ProductService {
  async create(product) {
    return await productModel.create(product);
  }

  async getAll() {
    return await productModel.find();
  }

  async getById(id) {
    return await productModel.findById(id);
  }

  async delete(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

export const productService = new ProductService();
