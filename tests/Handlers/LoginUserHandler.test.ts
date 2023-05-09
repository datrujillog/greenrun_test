import LoginUsersCommand from '../../src/Application/Commands/Auth/LoginUsersCommand';
import LoginUsersHandler from '../../src/Application/Handlers/Auth/LoginUsersHandler';
import UserRepositoryInterface from '../../src/Domain/Interfaces/Repositories/UserRepositoryInterface';
import DIContainer from '../Common/testContainer';

describe('Login user handler tests', () => {
  let sut: LoginUsersHandler;
  let userRepository: UserRepositoryInterface;
  beforeEach(done => {
    userRepository = DIContainer.get<UserRepositoryInterface>('UserRepositoryInterface');
    sut = new LoginUsersHandler(userRepository);
    done();
  });

  test('should return user successfully', async () => {
    const command = new LoginUsersCommand('fakeUser', 'fakePassword')
    const result = sut.execute(command);
    expect(result).not.toBeNull();
  });
});
