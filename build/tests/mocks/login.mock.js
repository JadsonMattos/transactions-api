"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validPassword = 'ch4ng3m3';
const noEmailLoginBody = { email: '', password: validPassword };
const validEmail = 'user1@email.com';
const noPasswordLoginBody = { email: validEmail, password: '' };
const notExistingUserBody = { email: 'notfound@email.com', password: validPassword };
const existingUserWithWrongPasswordBody = { email: validEmail, password: 'wrong_password' };
const hashPassword = '$2a$10$lQGsGScdxhjGRuYVJX3PX.347IWLNiSk6hOiMmjxlzLEI32lg5LMW';
const existingUser = {
    id: 1,
    email: validEmail,
    password: hashPassword,
    name: 'user1'
};
const validLoginBody = { email: validEmail, password: validPassword };
exports.default = {
    noEmailLoginBody,
    noPasswordLoginBody,
    notExistingUserBody,
    existingUserWithWrongPasswordBody,
    existingUser,
    validLoginBody,
};
