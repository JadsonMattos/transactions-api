"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const user_model_1 = __importDefault(require("../../../src/database/models/user.model"));
const login_mock_1 = __importDefault(require("../../mocks/login.mock"));
const login_service_1 = __importDefault(require("../../../src/services/login.service"));
describe('LoginService', function () {
    beforeEach(function () { sinon_1.default.restore(); });
    describe('#verifyLogin', function () {
        it('ao não receber um e-mail, retorne um erro', async function () {
            // Arrange
            const parameters = login_mock_1.default.noEmailLoginBody;
            // Act
            const serviceResponse = await login_service_1.default.verifyLogin(parameters);
            // Assert
            (0, chai_1.expect)(serviceResponse.status).to.eq('INVALID_DATA');
            (0, chai_1.expect)(serviceResponse.data).not.to.have.key('token');
            (0, chai_1.expect)(serviceResponse.data).to.deep.eq({ message: 'Dados inválidos' });
        });
        it('ao receber um e-mail e uma senha válida, retorne um token de login', async function () {
            // Arrange
            const parameters = login_mock_1.default.validLoginBody;
            const mockFindOneReturn = user_model_1.default.build(login_mock_1.default.existingUser);
            sinon_1.default.stub(user_model_1.default, 'findOne').resolves(mockFindOneReturn);
            // Act
            const serviceResponse = await login_service_1.default.verifyLogin(parameters);
            // Assert
            (0, chai_1.expect)(serviceResponse.status).to.eq('SUCCESSFUL');
            (0, chai_1.expect)(serviceResponse.data).to.have.key('token');
        });
        it('ao não receber uma senha, retorne um erro', async function () {
            // Arrange
            const parameters = login_mock_1.default.noPasswordLoginBody;
            // Act
            const serviceResponse = await login_service_1.default.verifyLogin(parameters);
            // Assert
            (0, chai_1.expect)(serviceResponse.status).to.eq('INVALID_DATA');
            (0, chai_1.expect)(serviceResponse.data).not.to.have.key('token');
            (0, chai_1.expect)(serviceResponse.data).to.deep.eq({ message: 'Dados inválidos' });
        });
        it('ao receber um e-mail inexistente, retorne um erro', async function () {
            // Arrange
            const parameters = login_mock_1.default.notExistingUserBody;
            sinon_1.default.stub(user_model_1.default, 'findOne').resolves(null);
            // Act
            const serviceResponse = await login_service_1.default.verifyLogin(parameters);
            // Assert
            (0, chai_1.expect)(serviceResponse.status).to.eq('UNAUTHORIZED');
            (0, chai_1.expect)(serviceResponse.data).not.to.have.key('token');
            (0, chai_1.expect)(serviceResponse.data).to.deep.eq({ message: 'E-mail ou senha inválidos' });
        });
        it('ao receber um e-mail existente e uma senha errada, retorne um erro', async function () {
            // Arrange
            const parameters = login_mock_1.default.existingUserWithWrongPasswordBody;
            const userInstance = user_model_1.default.build(login_mock_1.default.existingUser);
            const mockFindOneReturn = user_model_1.default.build(login_mock_1.default.existingUser);
            sinon_1.default.stub(user_model_1.default, 'findOne').resolves(mockFindOneReturn);
            // Act
            const serviceResponse = await login_service_1.default.verifyLogin(parameters);
            // Assert
            (0, chai_1.expect)(serviceResponse.status).to.eq('UNAUTHORIZED');
            (0, chai_1.expect)(serviceResponse.data).not.to.have.key('token');
            (0, chai_1.expect)(serviceResponse.data).to.deep.eq({ message: 'E-mail ou senha inválidos' });
        });
    });
});
