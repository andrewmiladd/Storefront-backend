
import { Express ,Request ,Response ,NextFunction} from "express";
import { productStore ,Product} from "../Models/products.model";
import jwt, { verify } from "jsonwebtoken";
import dotenv, { config } from 'dotenv'
dotenv.config();
const {TOKEN_SECRET} = process.env;

const product = new productStore();

export const getAll = async(_req:Request,res:Response,next:NextFunction)=>{
    try {
    const getAllProducts = await product.getAll()
    res.json(getAllProducts);
    } catch (error) {
        throw new Error (`couldn't show all products ${error}`)
        next(error);
    }
}
const newProduct = new productStore();
export const createProduct = async(req:Request,res:Response,next:NextFunction)=>{
  
        const product = {
            product_name: req.body.product_name,
            price: req.body.price,
            };
            
    try{
    const createdProduct = await newProduct.Create(product)
    res.json(createdProduct);
    } catch (error) {
        throw new Error (`couldn't create product ${error}`)
        next(error);
    }
}
const oneProduct = new productStore();
export const getOneProduct = async(req:Request,res:Response)=>{
    try {
    
    const recievedProduct = await oneProduct.getOne((req.params.id))
    res.json(recievedProduct);
    } catch (error) {
        throw new Error (`couldn't get product ${error}`)
       
    }
}