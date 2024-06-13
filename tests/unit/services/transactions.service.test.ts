import { expect } from 'chai';
import sinon from 'sinon';

import TransactionModel from '../../../src/database/models/transaction.model';
import transactionMock from '../../../tests/mocks/transaction.mock';
import transactionsService from '../../../src/services/transactions.service';

describe('TransactionService', function () {
  beforeEach(function () { sinon.restore(); });
  
  describe('#create', function () {
    it('deve ser possível criar uma transação com sucesso', async function () {
      const mockCreateReturn = TransactionModel.build(transactionMock.validTransactionFromDB);
      sinon.stub(TransactionModel, 'create')
        .resolves(mockCreateReturn);

      const serviceResponse = await transactionsService.create(transactionMock.validTransactionFromDB);
      
      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.eq(transactionMock.validTransactionFromDB);
    });

    it('deve retornar um erro quando um nome não é enviado', async function () {
      // Arrange

      const serviceResponse = await transactionsService.create(transactionMock.emptyNameTransaction);

      expect(serviceResponse.status).to.eq('INVALID_DATA');
      expect(serviceResponse.data).to.deep.eq({ message: "Name is required"});
    });
  });
});