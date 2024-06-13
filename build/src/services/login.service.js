"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_util_1 = __importDefault(require("../utils/jwt.util"));
const user_model_1 = __importDefault(require("../database/models/user.model"));
async function verifyLogin(login) {
    if (!login.email || !login.password) {
        return { status: 'INVALID_DATA', data: { message: 'Dados inválidos' } };
    }
    const foundUser = await user_model_1.default.findOne({ where: { email: login.email } });
    if (!foundUser || !bcryptjs_1.default.compareSync(login.password, foundUser.dataValues.password)) {
        return { status: 'UNAUTHORIZED', data: { message: 'E-mail ou senha inválidos' } };
    }
    const { id, email } = foundUser.dataValues;
    const token = jwt_util_1.default.sign({ id, email });
    return { status: 'SUCCESSFUL', data: { token } };
}
exports.default = {
    verifyLogin,
};
