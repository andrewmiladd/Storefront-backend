"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedUser = exports.createdUser = exports.oneUser = exports.allUsers = void 0;
const users_model_1 = require("../Models/users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const getAllUsers = new users_model_1.userStore();
const allUsers = async (_req, res, next) => {
    try {
        const users = await getAllUsers.showAll();
        res.json(users);
    }
    catch (err) {
        next(err);
    }
};
exports.allUsers = allUsers;
const getOneUser = new users_model_1.userStore();
const oneUser = async (req, res, next) => {
    try {
        const user = await getOneUser.getOne(req.params.id);
        res.json(user);
    }
    catch (err) {
        next();
    }
};
exports.oneUser = oneUser;
const CreateUser = new users_model_1.userStore();
const createdUser = async (req, res, next) => {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    };
    try {
        const newUser = await CreateUser.createOne(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, TOKEN_SECRET);
        return res.json({
            data: { ...newUser, token },
            message: 'user authenticated'
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createdUser = createdUser;
const authenticated = new users_model_1.userStore();
const authenticatedUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const authentication = await authenticated.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ authentication }, TOKEN_SECRET);
        if (!authentication) {
            return res.json({
                message: "wrong username or password!"
            });
        }
        next();
        return res.json({
            data: { ...authentication, token },
            message: 'user authenticated'
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.authenticatedUser = authenticatedUser;
