import connection from "../database";

export type Product = {
    id?:string | undefined,
    product_name:string,
    price:number
};

export class productStore {
async getAll():Promise<Product[]>{
    try{
    const conn = await connection.connect()
    const sql = `SELECT * from products`
   const result = await conn.query(sql);
   conn.release;
   return result.rows
    }catch(err){
        throw new Error (`cannot get products ${err}`)
    }
}
async getOne(id:string):Promise<Product>{
    try {
    const conn = await connection.connect();
    const sql = `SELECT * from products WHERE id=($1)`;
    const result= await conn.query(sql,[id])
    conn.release();
    return result.rows[0]
    } catch (err){
        throw new Error (`invalid id ${err}`)
    }
}
async Create(p:Product):Promise<Product>{
try {
    const conn = await connection.connect();
    const sql = `INSERT INTO products ( product_name , price) VALUES($1,$2) returning *`
    const result = await conn.query(sql,
        [
        p.product_name,
        p.price]
        );
    conn.release();
    return result.rows[0];
} catch (err) {
    throw new Error(`can't create product ${err}`)
}
}
}