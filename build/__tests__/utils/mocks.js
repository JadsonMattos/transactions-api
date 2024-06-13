"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transactionDB = {
    id: 1,
    name: 'Boleto da Internet',
    price: 100.0,
    type: 1,
    userId: 1,
};
const transactionWithoutName = {
    id: 1,
    name: '',
    price: 100.0,
    type: 1,
    userId: 1,
};
exports.default = {
    transactionDB,
    transactionWithoutName
};
