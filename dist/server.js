"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
const address = "0.0.0.0:3000";
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.use('/store', routes_1.default);
exports.app.get("/", function (req, res) {
    res.send("Hello World!");
});
exports.app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
