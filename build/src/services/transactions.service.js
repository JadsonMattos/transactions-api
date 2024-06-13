"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_model_1 = __importDefault(require("../database/models/transaction.model"));
function validateParams({ name, price, type, userId, }) {
    if (!name)
        return 'Name is required';
    if (!price)
        return 'Price is required';
    if (!type)
        return 'Type is required';
    if (!userId)
        return 'userId is required';
    return null;
}
async function list() {
    const transactions = await transaction_model_1.default.findAll();
    return { status: 'SUCCESSFUL', data: transactions };
}
async function create(transaction) {
    let responseService;
    const error = validateParams(transaction);
    if (error) {
        responseService = { status: 'INVALID_DATA', data: { message: error } };
        return responseService;
    }
    const newTransaction = await transaction_model_1.default.create(transaction);
    responseService = { status: 'SUCCESSFUL', data: newTransaction.dataValues };
    return responseService;
}
async function findById(id) {
    const transaction = await transaction_model_1.default.findByPk(id);
    let serviceResponse;
    if (!transaction) {
        serviceResponse = { status: 'NOT_FOUND', data: { message: 'Transaction not found' } };
        return serviceResponse;
    }
    serviceResponse = { status: 'SUCCESSFUL', data: transaction.dataValues };
    return serviceResponse;
}
exports.default = {
    list,
    create,
    findById,
};
