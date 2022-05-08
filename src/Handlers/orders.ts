import { orderStore , order } from "../Models/orders.model";
import { Express , Request, Response , NextFunction } from "express";

const getAllorders = new orderStore();
export const allOrders =async (_req:Request , res: Response , next:NextFunction) => {
    try {
     const orders = await getAllorders.getALL();
     res.json(orders);
    } catch (error) {
        throw new Error (`couldn't get orders ${error}`)
        next(error)
    }
}
const getOneOrder = new orderStore();
export const OneOrder = async (req:Request , res: Response , next:NextFunction)=>{
    try {
    const order = await getOneOrder.getOrder(req.params.userId);
    res.json(order)
    } catch (error) {
        throw new Error (`couldn't get order ${error}`)
        next(error)
    }
}
const createOrder = new orderStore();
export const createdOrder = async (req:Request,res:Response)=>{
    try{
    const order = {
        user_id : req.body.user_id,
        status : req.body.status
    }
    const createdOrder = await createOrder.Create(req.body)
    res.json(createdOrder)
    }catch(err){
        throw new Error (`couldn't create order ${err}`)
    }
}
const addProduct = new orderStore();
export const addingProduct = async (_req:Request ,res:Response) =>{
    const orderId:number = parseInt(_req.params.id)
    const productId:number = parseInt(_req.body.productId)
    const quantity:number = parseInt(_req.body.quantity)
    try {
      const addedProduct = await addProduct.addProduct(quantity, orderId , productId);  
      res.json(addedProduct)
    } catch (error) {
    res.json(error)
    }
}