"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'secret';
function sign(payload) {
    const token = jsonwebtoken_1.default.sign(payload, secret);
    return token;
}
function verify(token) {
    /* Ao utilizarmos Type Assertion para `TokenPayload` aqui, estamos garantindo que
    a função `jwt.verify` sempre retornará o `id` e o `email`. Nesse caso, irá, mas
    vale lembrar que, se não retornar, perdemos a proteção da tipagem aqui. Usamos
    a ferramenta com responsabilidade! */
    const data = jsonwebtoken_1.default.verify(token, secret);
    return data;
}
exports.default = {
    sign,
    verify,
};
