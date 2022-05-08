"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = exports.hashPassword = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_2 = __importDefault(require("../database"));
const database_3 = __importDefault(require("../database"));
dotenv_1.default.config();
const hashPassword = (password) => {
    const salt = parseInt(database_2.default, 10);
    return bcrypt_1.default.hashSync(`${password}${database_3.default}`, salt);
};
exports.hashPassword = hashPassword;
class userStore {
    async showAll() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT id,first_name,last_name,email from users`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get all users${err}`);
        }
    }
    async getOne(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT id,first_name,last_name,email from users where id=($1)`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`couldn't get user ${err}`);
        }
    }
    async createOne(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO users (first_name,last_name,email,password) VALUES($1,$2,$3,$4) returning id,first_name,last_name,email`;
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                u.email,
                (0, exports.hashPassword)(u.password)
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`coudln't create user ${err}`);
        }
    }
    async authenticate(email, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT password FROM users where email=($1)`;
            const result = await conn.query(sql, [email]);
            if (result.rows.length) {
                const { password: hashPassword } = result.rows[0];
                const isValid = bcrypt_1.default.compareSync(`${password}${database_3.default}`, hashPassword);
                if (isValid) {
                    const info = await conn.query(`SELECT id ,first_name ,last_name, email FROM users WHERE email=($1)`, [email]);
                    return info.rows[0];
                }
            }
            conn.release();
            return null;
        }
        catch (error) {
            throw new Error(`wrong user ${error}`);
        }
    }
}
exports.userStore = userStore;
