"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("../users.model");
const user = new users_model_1.userStore();
describe('authenticion', () => {
    describe('test if authentication exixt', () => {
        it('should find the authentication in user model', () => {
            expect(user.authenticate).toBeDefined();
        });
    });
});
