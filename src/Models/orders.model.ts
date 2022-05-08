import { query } from "express";
import connection from "../database";
export type order = {
    id?:string,
    user_id:string,
    status:string
}

export class orderStore{
    async getOrder(userId:string):Promise<order>{
        try {
        const conn = await connection.connect();
        const sql = `SELECT * FROM orders WHERE user_id=$1`
        const result = await conn.query(sql , [userId]);
        conn.release();
        return result.rows[0];
        } catch (err) {
            throw new Error (`can't get the order ${err}`)
        }
    }
    async getALL():Promise<order[]>{
        try {
            const conn = await connection.connect();
            const sql = `SELECT * from orders`
            const result = await conn.query(sql)
            conn.release()
            return result.rows;
        } catch (error) {
            throw new Error(`couldn't get all orders ${error}`)
        }
    }
    async Create(o:order):Promise<order>{
        try {
        const conn = await connection.connect()
        const sql = `INSERT INTO orders(user_id,status) VALUES ($1,$2) returning *`;
        const result = await conn.query(sql,[
            o.user_id,
            o.status
        ])
        conn.release()
        return result.rows[0];
        } catch (error) {
            throw new Error(`couldn't create order ${error}`)
        }
    }
    async addProduct(quantity:number , orderId:number , productId:number):Promise<order>{
        try {
           const conn =  await connection.connect();
           const sql = `INSERT INTO order_product (quantity ,order_id , product_id ) VALUES ($1,$2,$3) RETURNING *`;
           const result = await conn.query(sql , [quantity,orderId,productId])
           conn.release();
           
           return result.rows[0];
        } catch (error) {
            throw new Error (`error ${error}`)
        }
    }
}