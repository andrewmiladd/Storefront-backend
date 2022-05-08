"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const users_model_1 = require("../../../Models/users.model");
const products_model_1 = require("../../../Models/products.model");
const server_1 = require("../../../server");
const database_1 = __importDefault(require("../../../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const productModel = new products_model_1.productStore();
const userModel = new users_model_1.userStore();
const request = (0, supertest_1.default)(server_1.app);
let token = '';
describe('Products endpoints', () => {
    beforeAll(async () => {
        const user = {
            email: "abc@ef.com",
            first_name: "abc",
            last_name: "def",
            password: "1234"
        };
        await userModel.createOne(user);
        token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
    });
    afterAll(async () => {
        const conn = await database_1.default.connect();
        const sql = `DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1`;
        await conn.query(sql);
        conn.release();
    });
    describe('authetnication', () => {
        it('should get a token', async () => {
            const resp = await request
                .post('/store/users/authenticate')
                .set('Content-type', 'application/json')
                .set("Authorization", `Bearer ${token}`)
                .send({
                email: "abc@ef.com",
                password: '1234'
            });
            expect(resp.status).toBe(200);
            const { id, email, token: Token } = resp.body.data;
            expect(id).toBe(1);
            expect(email).toBe('abc@ef.com');
            token = Token;
        });
    });
    describe('methods of api', () => {
        it('should return a new product', async () => {
            const product = {
                product_name: 'product test',
                price: 20,
            };
            await productModel.Create(product);
            const resp = await request
                .post('/store/products/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(product);
            expect(resp.status).toBe(200);
            const { product_name, price } = resp.body;
            expect(product_name).toBe('product test');
            expect(price).toBe(20);
        });
        it('should get one product', async () => {
            const resp = await request
                .get('/store/products/2')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(resp.status).toBe(200);
            expect(resp.body.id).toBe(2);
            expect(resp.body.product_name).toBe('product test');
            expect(resp.body.price).toBe(20);
        });
        it('get list of all products', async () => {
            const resp = await request
                .get('/store/products/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(resp.status).toBe(200);
            console.log(resp.body);
            expect(resp.body.length).toBe(2);
        });
    });
});
