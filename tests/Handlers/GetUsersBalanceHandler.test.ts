import GetUsersBalanceQuery from '../../src/Application/Commands/Users/GetUsersBalanceQuery';
import GetUsersBalanceHandler from '../../src/Application/Handlers/Users/GetUsersBalanceHandler';
import TransactionRepositoryInterface from '../../src/Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import UserBetRepositoryInterface from '../../src/Domain/Interfaces/Repositories/UserBetRepositoryInterface';
import UserRepositoryInterface from '../../src/Domain/Interfaces/Repositories/UserRepositoryInterface';
import DIContainer from '../Common/testContainer';

describe('Get users balance handler tests', () => {
    let sut: GetUsersBalanceHandler;
    let userRepository: UserRepositoryInterface;
    let userBetRepository: UserBetRepositoryInterface;
    let transactionRepository: TransactionRepositoryInterface;
    beforeEach(done => {
        userRepository = DIContainer.get<UserRepositoryInterface>('UserRepositoryInterface');
        transactionRepository = DIContainer.get<TransactionRepositoryInterface>('TransactionRepositoryInterface');
        userBetRepository = DIContainer.get<UserBetRepositoryInterface>('UserBetRepositoryInterface');
        sut = new GetUsersBalanceHandler(
            userRepository,
            transactionRepository,
            userBetRepository
        );
        done();
    });

    test('should return balance successfully', async () => {
        const command = new GetUsersBalanceQuery(2)
        const result = await sut.execute(command);
        expect(result).toBe(200);
    });
});
