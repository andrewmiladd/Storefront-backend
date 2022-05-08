"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    async getAll() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * from products`;
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get products ${err}`);
        }
    }
    async getOne(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * from products WHERE id=($1)`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`invalid id ${err}`);
        }
    }
    async Create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO products ( product_name , price) VALUES($1,$2) returning *`;
            const result = await conn.query(sql, [
                p.product_name,
                p.price
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`can't create product ${err}`);
        }
    }
}
exports.productStore = productStore;
