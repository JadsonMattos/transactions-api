"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactions_service_1 = __importDefault(require("../services/transactions.service"));
const mapStatusHTTP_1 = __importDefault(require("../utils/mapStatusHTTP"));
async function list(_req, res) {
    const serviceResponse = await transactions_service_1.default.list();
    if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status((0, mapStatusHTTP_1.default)(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(200).json(serviceResponse.data);
}
async function create(req, res) {
    const { name, price, type, userId } = req.body;
    const serviceResponse = await transactions_service_1.default.create({ name, price, type, userId });
    if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status((0, mapStatusHTTP_1.default)(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(201).json(serviceResponse.data);
}
async function findById(req, res) {
    const serviceResponse = await transactions_service_1.default.findById(Number(req.params.id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status((0, mapStatusHTTP_1.default)(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(200).json(serviceResponse.data);
}
exports.default = {
    list,
    create,
    findById,
};
