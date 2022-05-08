"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const validateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const bearer = authHeader.split(" ")[0].toLocaleLowerCase();
            const token = authHeader.split(" ")[1];
            if (token && bearer === "bearer") {
                const decode = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
                if (decode) {
                    next();
                }
                else {
                    res.json({ message: "error" });
                }
            }
        }
        else {
            res.status(401);
            res.json({
                message: "token is needed",
            });
        }
    }
    catch (error) {
        throw new Error(`error! ${error}`);
    }
};
exports.validateToken = validateToken;
