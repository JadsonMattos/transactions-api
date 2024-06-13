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
const chai_1 = __importStar(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const sinon_chai_1 = __importDefault(require("sinon-chai"));
const login_service_1 = __importDefault(require("../../../src/services/login.service"));
const login_controller_1 = __importDefault(require("../../../src/controllers/login.controller"));
const login_mock_1 = __importDefault(require("../../mocks/login.mock"));
chai_1.default.use(sinon_chai_1.default);
describe('LoginController', function () {
    const req = {};
    const res = {};
    const messageEmailOrPasswordEmpty = 'Dados inválidos';
    const messageEmailOrPasswordInvalid = 'E-mail ou senha inválidos';
    beforeEach(function () {
        res.status = sinon_1.default.stub().returns(res);
        res.json = sinon_1.default.stub().returns(res);
        sinon_1.default.restore();
    });
    describe('#login', function () {
        it('ao não receber um e-mail, retorne um erro', async function () {
            // Arrange
            req.body = login_mock_1.default.noEmailLoginBody;
            const serviceResponse = {
                status: 'INVALID_DATA',
                data: { message: messageEmailOrPasswordEmpty },
            };
            sinon_1.default.stub(login_service_1.default, 'verifyLogin').resolves(serviceResponse);
            // Act
            await login_controller_1.default.login(req, res);
            // Assert
            (0, chai_1.expect)(res.status).to.have.been.calledWith(400);
            (0, chai_1.expect)(res.json).to.have.been.calledWith({ message: messageEmailOrPasswordEmpty });
        });
        it('ao receber um e-mail e uma senha válida, retorne um token de login', async function () {
            // Arrange
            req.body = login_mock_1.default.validLoginBody;
            const token = { token: 'm1nh4t0k3nbcr1p7v4l1d4' };
            const serviceResponse = {
                status: 'SUCCESSFUL',
                data: token,
            };
            sinon_1.default.stub(login_service_1.default, 'verifyLogin').resolves(serviceResponse);
            // Act
            await login_controller_1.default.login(req, res);
            // Assert
            (0, chai_1.expect)(res.status).to.have.been.calledWith(200);
            (0, chai_1.expect)(res.json).to.have.been.calledWith(token);
        });
        it('ao não receber uma senha, retorne um erro', async function () {
            // Arrange
            req.body = login_mock_1.default.noPasswordLoginBody;
            const serviceResponse = {
                status: 'INVALID_DATA',
                data: { message: messageEmailOrPasswordEmpty },
            };
            sinon_1.default.stub(login_service_1.default, 'verifyLogin').resolves(serviceResponse);
            // Act
            await login_controller_1.default.login(req, res);
            // Assert
            (0, chai_1.expect)(res.status).to.have.been.calledWith(400);
            (0, chai_1.expect)(res.json).to.have.been.calledWith({ message: messageEmailOrPasswordEmpty });
        });
        it('ao receber um e-mail inexistente, retorne um erro', async function () {
            // Arrange
            req.body = login_mock_1.default.notExistingUserBody;
            const serviceResponse = {
                status: 'UNAUTHORIZED',
                data: { message: messageEmailOrPasswordInvalid },
            };
            sinon_1.default.stub(login_service_1.default, 'verifyLogin').resolves(serviceResponse);
            // Act
            await login_controller_1.default.login(req, res);
            // Assert
            (0, chai_1.expect)(res.status).to.have.been.calledWith(401);
            (0, chai_1.expect)(res.json).to.have.been.calledWith({ message: messageEmailOrPasswordInvalid });
        });
        it('ao receber um e-mail existente e uma senha errada, retorne um erro', async function () {
            // Arrange
            req.body = login_mock_1.default.existingUserWithWrongPasswordBody;
            const serviceResponse = {
                status: 'UNAUTHORIZED',
                data: { message: messageEmailOrPasswordInvalid },
            };
            sinon_1.default.stub(login_service_1.default, 'verifyLogin').resolves(serviceResponse);
            // Act
            await login_controller_1.default.login(req, res);
            // Assert
            (0, chai_1.expect)(res.status).to.have.been.calledWith(401);
            (0, chai_1.expect)(res.json).to.have.been.calledWith({ message: messageEmailOrPasswordInvalid });
        });
    });
});
