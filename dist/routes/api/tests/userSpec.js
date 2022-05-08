"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../../database"));
const users_model_1 = require("../../../Models/users.model");
const server_1 = require("../../../server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userModel = new users_model_1.userStore();
const request = (0, supertest_1.default)(server_1.app);
let token = "";
describe("User endpoints", () => {
    beforeAll(async () => {
        const user = {
            email: "abc@ef.com",
            first_name: "abc",
            last_name: "def",
            password: "1234",
        };
        const userCreated = await userModel.createOne(user);
        token = jsonwebtoken_1.default.sign(userCreated, process.env.TOKEN_SECRET);
    });
    afterAll(async () => {
        const conn = await database_1.default.connect();
        const sql = `DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1`;
        await conn.query(sql);
        conn.release();
    });
    describe("authetnication", () => {
        it("should get a token", async () => {
            const resp = await request
                .post("/store/users/authenticate")
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .send({ email: "abc@ef.com", password: "1234" });
            expect(resp.status).toBe(200);
            const { id, email, token: Token } = resp.body.data;
            expect(id).toBe(1);
            expect(email).toBe("abc@ef.com");
            token = Token;
        });
    });
    describe("methods of api", () => {
        it("should return new user", async () => {
            const user = {
                email: "ssss@ssss.com",
                first_name: "ddddd",
                last_name: "fff",
                password: "1234",
            };
            const resp = await request
                .post("/store/users/")
                .set("Content-type", "application/json")
                .send(user);
            expect(resp.status).toBe(200);
            const { email, first_name, last_name } = resp.body.data;
            expect(email).toBe("ssss@ssss.com");
            expect(first_name).toBe("ddddd");
            expect(last_name).toBe("fff");
        });
        it("should get all users", async () => {
            const resp = await request
                .get("/store/users/")
                .set("Content-type", "application/json")
                .set("Authorization", `Bearer ${token}`);
            expect(resp.status).toBe(200);
        });
        it("should get one user", async () => {
            const resp = await request
                .get("/store/users/1")
                .set("Content-type", "application/json")
                .set("Authorization", `Bearer ${token}`);
            expect(resp.status).toBe(200);
            expect(resp.body.email).toBe("abc@ef.com");
        });
    });
});
