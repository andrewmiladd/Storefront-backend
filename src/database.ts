import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const {BCRYPT_PASSWORD,SALT_ROUNDS} =process.env
const Salt = SALT_ROUNDS ;
const Pepper =BCRYPT_PASSWORD
const {NODE_ENV, POSTGRES_HOST, POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD , TOKEN_SECRET , POSTGRES_DB_TEST} =
  process.env;
  
const connection = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  database: NODE_ENV ==='dev' ? POSTGRES_DB :POSTGRES_DB_TEST,
  password: POSTGRES_PASSWORD as unknown as string,
  
});



export default connection ; Salt ; Pepper; TOKEN_SECRET; 
