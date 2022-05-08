"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addingProduct = exports.createdOrder = exports.OneOrder = exports.allOrders = void 0;
const orders_model_1 = require("../Models/orders.model");
const getAllorders = new orders_model_1.orderStore();
const allOrders = async (_req, res, next) => {
    try {
        const orders = await getAllorders.getALL();
        res.json(orders);
    }
    catch (error) {
        throw new Error(`couldn't get orders ${error}`);
        next(error);
    }
};
exports.allOrders = allOrders;
const getOneOrder = new orders_model_1.orderStore();
const OneOrder = async (req, res, next) => {
    try {
        const order = await getOneOrder.getOrder(req.params.userId);
        res.json(order);
    }
    catch (error) {
        throw new Error(`couldn't get order ${error}`);
        next(error);
    }
};
exports.OneOrder = OneOrder;
const createOrder = new orders_model_1.orderStore();
const createdOrder = async (req, res) => {
    try {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status
        };
        const createdOrder = await createOrder.Create(req.body);
        res.json(createdOrder);
    }
    catch (err) {
        throw new Error(`couldn't create order ${err}`);
    }
};
exports.createdOrder = createdOrder;
const addProduct = new orders_model_1.orderStore();
const addingProduct = async (_req, res) => {
    const orderId = parseInt(_req.params.id);
    const productId = parseInt(_req.body.productId);
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = await addProduct.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (error) {
        res.json(error);
    }
};
exports.addingProduct = addingProduct;
