"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const users_model_1 = require("../../../Models/users.model");
const orders_model_1 = require("../../../Models/orders.model");
const database_1 = __importDefault(require("../../../database"));
const server_1 = require("../../../server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new users_model_1.userStore();
const orderModel = new orders_model_1.orderStore();
const request = (0, supertest_1.default)(server_1.app);
let token = '';
describe('Orders endpoints', () => {
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
        const sql = `DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;`;
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
                email: 'abc@ef.com',
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
        it('should create new order', async () => {
            const resp = await request
                .post('/store/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                user_id: '1',
                status: 'active'
            });
            expect(resp.status).toBe(200);
            const { id, status, user_id } = resp.body;
            expect(id).toBe(1);
            expect(status).toBe('active');
            expect(user_id).toBe('1');
        });
        it('should get all of orders', async () => {
            const resp = await request
                .get('/store/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(resp.status).toBe(200);
            expect(resp.body[0].status).toBe('active');
            expect(resp.body[0].user_id).toBe('1');
        });
        it('should get one', async () => {
            const resp = await request
                .get('/store/orders/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(resp.status).toBe(200);
            expect(resp.body.id).toBe(1);
            expect(resp.body.status).toBe('active');
            expect(resp.body.user_id).toBe('1');
        });
    });
});
