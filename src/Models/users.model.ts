import connection from "../database";
import bcrypt from "bcrypt";
import dotenv, { config } from "dotenv";
import Salt from "../database";
import Pepper from "../database"
dotenv.config(); 


export type User = {
    id?:number,
    email:string,
    first_name:string,
    last_name:string,
    password:string
}

export const hashPassword = (password:string) =>{
    const salt = parseInt(Salt as unknown as string , 10)
    return bcrypt.hashSync(`${password}${Pepper}`,salt);
}
export class userStore{
    async showAll():Promise<User[]> {
        try {
        const conn= await connection.connect();
        const sql = `SELECT id,first_name,last_name,email from users`;
        const result = await conn.query(sql)
        conn.release()
        return result.rows;
        }catch(err){
        throw new Error(`cannot get all users${err}`)
        }
} 
    async getOne(id:string):Promise<User>{
    try {
        const conn = await connection.connect();
        const sql = `SELECT id,first_name,last_name,email from users where id=($1)`;
        const result = await conn.query(sql,[id]);
        conn.release();
        return result.rows[0];
    } catch (err) {
            throw new Error(`couldn't get user ${err}`);
        }
    }
    async createOne(u:User):Promise<User>{
        try {
        const conn = await connection.connect();
        const sql = `INSERT INTO users (first_name,last_name,email,password) VALUES($1,$2,$3,$4) returning id,first_name,last_name,email`;
        const result = await conn.query(sql,[
        u.first_name,
        u.last_name,
        u.email,
        hashPassword(u.password)])
        conn.release();
        return result.rows[0];
        } catch (err) {
            throw new Error (`coudln't create user ${err}`)
        }
    }
    async authenticate(email:string,password:string):Promise<User|null> {
     try {
        const conn = await connection.connect();
        const sql = `SELECT password FROM users where email=($1)`;
        const result =  await conn.query(sql, [email]);
        if (result.rows.length){
            const {password: hashPassword} = result.rows[0]
            const isValid = bcrypt.compareSync(`${password}${Pepper}` , hashPassword)
            if (isValid){
            const info = await conn.query(`SELECT id ,first_name ,last_name, email FROM users WHERE email=($1)`, [email])
            return info.rows[0]
            }
        }
        conn.release();
        return null;
           } catch (error) {
                throw new Error (`wrong user ${error}`)
            }
    }
}

