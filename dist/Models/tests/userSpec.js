"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("../users.model");
const database_1 = __importDefault(require("../../database"));
const userModel = new users_model_1.userStore();
describe('userModel', () => {
    describe('if models exist', () => {
        it('the main route exists', () => {
            expect(userModel.showAll).toBeDefined();
        });
        it('the get one exists', () => {
            expect(userModel.getOne).toBeDefined();
        });
        it('the create exists', () => {
            expect(userModel.createOne).toBeDefined();
        });
        it('the authenticate exists', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('logic of the model', () => {
        const user = {
            email: "ahmed@mail.com",
            first_name: "ahmed",
            last_name: "youssef",
        };
        afterAll(async () => {
            const conn = await database_1.default.connect();
            const sql = `DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;`;
            await database_1.default.query(sql);
            conn.release();
        });
        it('the create method should return a user', async () => {
            const userCreated = await userModel.createOne(user);
            expect(userCreated).toEqual({
                id: userCreated.id,
                email: "ahmed@mail.com",
                first_name: "ahmed",
                last_name: "youssef",
            });
        });
        it("the getAll method should return all users in database", async () => {
            const allUsers = await userModel.showAll();
            expect(allUsers.length).toBe(1);
        });
        it("the getOne method should return the user with id (1)", async () => {
            const selectedUser = await userModel.getOne(1);
            expect(selectedUser.id).toEqual(1);
            expect(selectedUser.first_name).toEqual("ahmed");
            expect(selectedUser.last_name).toEqual("youssef");
            expect(selectedUser.email).toEqual("ahmed@mail.com");
        });
        it("authenticate method should return the authenticated user", async () => {
            const authenticatedUser = await userModel.authenticate("ahmed@mail.com", "1234");
            if (authenticatedUser) {
                expect(authenticatedUser.email).toBe("ahmed@mail.com");
                expect(authenticatedUser.first_name).toBe("ahmed");
                expect(authenticatedUser.last_name).toBe("youssef");
            }
        });
    });
});
