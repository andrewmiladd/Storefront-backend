"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProduct = exports.createProduct = exports.getAll = void 0;
const products_model_1 = require("../Models/products.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const product = new products_model_1.productStore();
const getAll = async (_req, res, next) => {
    try {
        const getAllProducts = await product.getAll();
        res.json(getAllProducts);
    }
    catch (error) {
        throw new Error(`couldn't show all products ${error}`);
        next(error);
    }
};
exports.getAll = getAll;
const newProduct = new products_model_1.productStore();
const createProduct = async (req, res, next) => {
    const product = {
        product_name: req.body.product_name,
        price: req.body.price,
    };
    try {
        const createdProduct = await newProduct.Create(product);
        res.json(createdProduct);
    }
    catch (error) {
        throw new Error(`couldn't create product ${error}`);
        next(error);
    }
};
exports.createProduct = createProduct;
const oneProduct = new products_model_1.productStore();
const getOneProduct = async (req, res) => {
    try {
        const recievedProduct = await oneProduct.getOne((req.params.id));
        res.json(recievedProduct);
    }
    catch (error) {
        throw new Error(`couldn't get product ${error}`);
    }
};
exports.getOneProduct = getOneProduct;
