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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = __importDefault(require("../../../src/middlewares/auth.middleware"));
const user_model_1 = __importDefault(require("../../../src/database/models/user.model"));
const login_mock_1 = __importDefault(require("../../mocks/login.mock"));
chai_1.default.use(sinon_chai_1.default);
describe('AuthMiddlware', function () {
    const req = {};
    const res = {};
    let nextFunction;
    const tokenRequired = 'Token é obrigatório';
    beforeEach(function () {
        res.status = sinon_1.default.stub().returns(res);
        res.json = sinon_1.default.stub().returns(res);
        nextFunction = sinon_1.default.spy();
        sinon_1.default.restore();
    });
    it('deve retornar um erro ao acontecer uma exception', async function () {
        // Arrange
        req.headers = { authorization: 'teste' };
        sinon_1.default.stub(jsonwebtoken_1.default, 'verify')
            .callsFake(() => { throw new Error('JsonWebTokenError: jwt malformed'); });
        // Act
        await (0, auth_middleware_1.default)(req, res, nextFunction);
        // Assert
        (0, chai_1.expect)(res.status).to.have.been.calledWith(401);
        (0, chai_1.expect)(res.json).to.have.been.calledWith({ message: 'Token inválido' });
        (0, chai_1.expect)(nextFunction).not.to.have.been.calledWith();
    });
    it('deve retornar um erro ao não enviar um token', async function () {
        // Arrange
        req.headers = {};
        // Act
        await (0, auth_middleware_1.default)(req, res, nextFunction);
        // Assert
        (0, chai_1.expect)(res.status).to.have.been.calledWith(401);
        (0, chai_1.expect)(res.json).to.have.been.calledWith({ message: tokenRequired });
        (0, chai_1.expect)(nextFunction).not.to.have.been.calledWith();
    });
    it('deve retornar um erro ao enviar um token vazio', async function () {
        // Arrange
        req.headers = { authorization: '' };
        // Act
        await (0, auth_middleware_1.default)(req, res, nextFunction);
        // Assert
        (0, chai_1.expect)(res.status).to.have.been.calledWith(401);
        (0, chai_1.expect)(res.json).to.have.been.calledWith({ message: tokenRequired });
        (0, chai_1.expect)(nextFunction).not.to.have.been.calledWith();
    });
    it('deve retornar um erro ao enviar um token com usuário que não existe', async function () {
        // Arrange
        req.headers = { authorization: 'token' };
        sinon_1.default.stub(jsonwebtoken_1.default, 'verify').callsFake(() => ({ email: login_mock_1.default.notExistingUserBody.email }));
        sinon_1.default.stub(user_model_1.default, 'findOne').resolves(null);
        // Act
        await (0, auth_middleware_1.default)(req, res, nextFunction);
        // Assert
        (0, chai_1.expect)(res.status).to.have.been.calledWith(401);
        (0, chai_1.expect)(res.json).to.have.been.calledWith({ message: 'Token inválido' });
        (0, chai_1.expect)(nextFunction).not.to.have.been.calledWith();
    });
    it('deve chamar next ao enviar um token válido', async function () {
        // Arrange
        // const next = sinon.stub() as NextFunction;
        req.headers = { authorization: 'token' };
        sinon_1.default.stub(jsonwebtoken_1.default, 'verify').callsFake(() => ({ email: login_mock_1.default.existingUser.email }));
        const mockFindOneReturn = user_model_1.default.build(login_mock_1.default.existingUser);
        sinon_1.default.stub(user_model_1.default, 'findOne').resolves(mockFindOneReturn);
        // Act
        await (0, auth_middleware_1.default)(req, res, nextFunction);
        // Assert
        (0, chai_1.expect)(nextFunction).to.have.been.calledWith();
        (0, chai_1.expect)(res.status).to.not.have.been.calledWith();
        (0, chai_1.expect)(res.json).to.not.have.been.calledWith();
    });
});
