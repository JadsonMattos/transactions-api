"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const path_1 = __importDefault(require("path"));
const mocks_1 = __importDefault(require("./utils/mocks"));
const transactions_controller_1 = __importDefault(require("../src/controllers/transactions.controller"));
const MochaRunner_1 = __importDefault(require("./utils/MochaRunner"));
const mochaOptions = {
    reporter: function () { },
    checkLeaks: true,
    allowUncaught: true,
    diff: true,
    fullTrace: true,
};
const studentTestPath = path_1.default.resolve(__dirname, '..', 'tests', 'unit', 'controllers', 'transactions.controller.test.ts');
const expectedSuccessTestTitle = 'deve salvar ao enviar dados válidos';
const expectedEmptyFieldTestTitle = 'deve retornar um erro se enviar um nome inválido';
jest.mock('../src/controllers/transactions.controller.ts');
describe('03 - Crie testes unitários para a função `create`, da camada `Controller`', function () {
    test('3.1 - Valida os testes quando os campos são corretos - modifica erroneamente a implementação do Controller, o teste de SUCESSO falha', async function () {
        transactions_controller_1.default.create.mockImplementation(() => null);
        const runner = new MochaRunner_1.default(expectedSuccessTestTitle, mochaOptions);
        const run = await runner.execute([studentTestPath]);
        (0, chai_1.expect)(run.testResult).to.be.eq('failed');
    });
    test('3.1 - Valida os testes quando os campos são corretos - sem modificar a implementação do Controller, o teste de SUCESSO passa', async function () {
        jest.unmock('../src/controllers/transactions.controller.ts');
        const runner = new MochaRunner_1.default(expectedSuccessTestTitle, mochaOptions);
        const run = await runner.execute([studentTestPath]);
        (0, chai_1.expect)(run.testResult).to.be.eq('passed');
    });
    test('3.2 - Valida os testes quando o campo `name` é vazio - modifica erroneamente a implementação do Controller, o teste de nome vazio falha', async function () {
        jest.mock('../src/controllers/transactions.controller.ts');
        transactions_controller_1.default.create.mockImplementation(async (_req, res) => {
            return res.status(201).json(mocks_1.default.transactionWithoutName);
        });
        const runner = new MochaRunner_1.default(expectedEmptyFieldTestTitle, mochaOptions);
        const run = await runner.execute([studentTestPath]);
        (0, chai_1.expect)(run.testResult).to.be.eq('failed');
    });
    test('3.2 - Valida os testes quando o campo `name` é vazio - sem modificar a implementação do Controller, o teste de nome vazio passa', async function () {
        jest.unmock('../src/controllers/transactions.controller.ts');
        const runner = new MochaRunner_1.default(expectedEmptyFieldTestTitle, mochaOptions);
        const run = await runner.execute([studentTestPath]);
        (0, chai_1.expect)(run.testResult).to.be.eq('passed');
    });
});
