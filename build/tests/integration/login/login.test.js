"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app_1 = __importDefault(require("../../../src/app"));
const login_mock_1 = __importDefault(require("../../mocks/login.mock"));
const user_model_1 = __importDefault(require("../../../src/database/models/user.model"));
chai_1.default.use(chai_http_1.default);
describe('POST /login', function () {
    beforeEach(function () { sinon_1.default.restore(); });
    it('ao não receber um e-mail, retorne um erro', async function () {
        // Arrange
        const httpRequestBody = login_mock_1.default.noEmailLoginBody;
        // Act
        const httpResponse = await chai_1.default.request(app_1.default).post('/login').send(httpRequestBody);
        // Assert
        (0, chai_1.expect)(httpResponse.status).to.equal(400);
        (0, chai_1.expect)(httpResponse.body).to.be.deep.equal({ message: 'Dados inválidos' });
    });
    it('ao não receber uma senha, retorne um erro', async function () {
        // Arrange
        const httpRequestBody = login_mock_1.default.noPasswordLoginBody;
        // Act
        const httpResponse = await chai_1.default.request(app_1.default).post('/login').send(httpRequestBody);
        // Assert
        (0, chai_1.expect)(httpResponse.status).to.equal(400);
        (0, chai_1.expect)(httpResponse.body).to.be.deep.equal({ message: 'Dados inválidos' });
    });
    it('ao receber um e-mail inexistente, retorne um erro', async function () {
        // Arrange
        const httpRequestBody = login_mock_1.default.notExistingUserBody;
        sinon_1.default.stub(user_model_1.default, 'findOne').resolves(null);
        // Act
        const httpResponse = await chai_1.default.request(app_1.default).post('/login').send(httpRequestBody);
        // Assert
        (0, chai_1.expect)(httpResponse.status).to.equal(401);
        (0, chai_1.expect)(httpResponse.body).to.be.deep.equal({ message: 'E-mail ou senha inválidos' });
    });
    it('ao receber um e-mail existente e uma senha errada, retorne um erro', async function () {
        // Arrange
        const httpRequestBody = login_mock_1.default.existingUserWithWrongPasswordBody;
        const mockFindOneReturn = user_model_1.default.build(login_mock_1.default.existingUser);
        sinon_1.default.stub(user_model_1.default, 'findOne').resolves(mockFindOneReturn);
        // Act
        const httpResponse = await chai_1.default.request(app_1.default).post('/login')
            .send(httpRequestBody);
        // Assert
        (0, chai_1.expect)(httpResponse.status).to.equal(401);
        (0, chai_1.expect)(httpResponse.body).to.be.deep.equal({ message: 'E-mail ou senha inválidos' });
    });
    it('ao receber um e-mail e uma senha válida, retorne um token de login', async function () {
        // Arrange
        const httpRequestBody = login_mock_1.default.validLoginBody;
        const mockFindOneReturn = user_model_1.default.build(login_mock_1.default.existingUser);
        sinon_1.default.stub(user_model_1.default, 'findOne').resolves(mockFindOneReturn);
        // Act
        const httpResponse = await chai_1.default.request(app_1.default).post('/login').send(httpRequestBody);
        // Assert
        (0, chai_1.expect)(httpResponse.status).to.equal(200);
        (0, chai_1.expect)(httpResponse.body).to.have.key('token');
    });
});
