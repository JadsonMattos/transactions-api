import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import jwt from 'jsonwebtoken';
import TransactionModel from '../../../src/database/models/transaction.model';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../../tests/mocks/login.mock';
import transactionMock from '../../../tests/mocks/transaction.mock';

chai.use(chaiHttp);

describe('POST /transactions', function () {
  beforeEach(function () { sinon.restore(); });

  describe('quando a requisição é feita com dados válidos', function () {
    it('deve retornar um status 201 com uma transação criada', async function () {
      sinon.stub(jwt, 'verify').resolves({ email: loginMock.existingUser.email });
      const mockFindOneReturn = UserModel.build(loginMock.existingUser);
      sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
      const mockCreateReturn = TransactionModel.build(transactionMock.validTransaction);
      sinon.stub(TransactionModel, 'create').resolves(mockCreateReturn);

      const httpResponse = await chai
        .request(app)
        .post('/transactions')
        .send(transactionMock.validTransaction)
        .set('Authorization', 'genericToken');

      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.be.deep.equal(transactionMock.validTransaction);
    });
  });

  describe('quando a requisição é feita com dados inválidos', function () {
    it('ao enviar um nome vazio deve retornar um status 400 com uma mensagem de erro', async function () {
      sinon.stub(jwt, 'verify').resolves({email: loginMock.existingUser.email});
      const mockFindOneReturn = UserModel.build(loginMock.existingUser);
      sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

      const httpResponse = await chai
        .request(app)
        .post('/transactions')
        .send(transactionMock.emptyNameTransaction)
        .set('Authorization', 'genericToken');

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Name is required'});
    });
  });
});
