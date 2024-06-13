"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactions_router_1 = __importDefault(require("./routers/transactions.router"));
const login_router_1 = __importDefault(require("./routers/login.router"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(login_router_1.default);
app.use(auth_middleware_1.default);
app.use(transactions_router_1.default);
app.get('/', (_req, res) => {
    res.status(200).send('Aplicação está funcionando!');
});
exports.default = app;
