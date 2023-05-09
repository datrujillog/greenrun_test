import CreateBetsCommand from '../../src/Application/Commands/Bets/CreateBetsCommand';
import CreateBetsHandler from '../../src/Application/Handlers/Bets/CreateBetsHandler';
import BetRepositoryInterface from '../../src/Domain/Interfaces/Repositories/BetRepositoryInterface';
import DIContainer from '../Common/testContainer';

describe('Create Bet handler tests', () => {
  let sut: CreateBetsHandler;
  let betRepository: BetRepositoryInterface;
  beforeEach(done => {
    betRepository = DIContainer.get<BetRepositoryInterface>('BetRepositoryInterface');
    sut = new CreateBetsHandler(betRepository);
    done();
  });

  test('should return user successfully', async () => {
    const command = new CreateBetsCommand(
        'optionA',
        'football',
        'some name',
        1,
        1.4,
    )
    sut.execute(command);
  });
});
