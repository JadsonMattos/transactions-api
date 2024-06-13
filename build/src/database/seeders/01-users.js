"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('users', [
            {
                email: 'user1@email.com',
                password: bcrypt.hashSync('chang3m3', SALT_ROUNDS),
                name: 'User 1',
            },
            {
                email: 'user2@email.com',
                password: bcrypt.hashSync('chang3m3', SALT_ROUNDS),
                name: 'User 2',
            },
        ], {});
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', {});
    }
};
