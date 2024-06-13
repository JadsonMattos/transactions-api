"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const TransactionModel = index_1.default.define('Transaction', {
    name: sequelize_1.DataTypes.STRING(30),
    price: sequelize_1.DataTypes.DECIMAL(10, 2),
    type: sequelize_1.DataTypes.STRING,
    userId: sequelize_1.DataTypes.INTEGER,
}, {
    tableName: 'transactions',
    timestamps: false,
    underscored: true,
});
exports.default = TransactionModel;
