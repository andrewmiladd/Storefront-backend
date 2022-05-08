"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const Salt = SALT_ROUNDS;
const Pepper = BCRYPT_PASSWORD;
const { NODE_ENV, POSTGRES_HOST, POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, TOKEN_SECRET, POSTGRES_DB_TEST } = process.env;
const connection = new pg_1.Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    password: POSTGRES_PASSWORD,
});
exports.default = connection;
Salt;
Pepper;
TOKEN_SECRET;
