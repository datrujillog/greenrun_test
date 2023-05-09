import { Container } from 'inversify';
import CreateUsersAction from '../../Http/Actions/Users/CreateUsersAction';
import CreateUsersAdapter from '../../Http/Adapters/Users/CreateUsersAdapter';
import CreateUsersHandler from '../../Application/Handlers/Users/CreateUsersHandler';
import UserRepositoryInterface from '../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from './Interfaces.types';
import KnexUserRepository from '../Persistence/Repositories/KnexUserRepository';
import TransactionRepositoryInterface from '../../Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import KnexTransactionRepository from '../Persistence/Repositories/KnexTransactionRepository';
import BetRepositoryInterface from '../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import KnexBetRepository from '../Persistence/Repositories/KnexBetRepository';
import GetUsersHandler from '../../Application/Handlers/Users/GetUsersHandler';
import GetUsersAction from '../../Http/Actions/Users/GetUsersAction';
import UpdateUserAction from '../../Http/Actions/Users/UpdateUsersAction';
import UpdateUsersAdapter from '../../Http/Adapters/Users/UpdateUsersAdapter';
import UpdateUsersHandler from '../../Application/Handlers/Users/UpudateUsersHandler';
import BanUsersAdapter from '../../Http/Adapters/Users/BanUsersAdapter';
import BanUserAction from '../../Http/Actions/Users/BanUsersAction';
import BanUsersHandler from '../../Application/Handlers/Users/BanUsersHandler';
import LoginUsersAction from '../../Http/Actions/Auth/LoginUsersAction';
import LoginUsersAdapter from '../../Http/Adapters/Auth/LoginUserAdapter';
import LoginUsersHandler from '../../Application/Handlers/Auth/LoginUsersHandler';
import { RedisConnectionInterface } from '../Persistence/RedisConnectionInterface';
import RedisConnection from '../Persistence/RedisConnection';
import PlaceBetsAction from '../../Http/Actions/Bets/PlaceBetsAction';
import PlaceBetsAdapter from '../../Http/Adapters/Bets/PlaceBetsAdapter';
import PlaceBetsHandler from '../../Application/Handlers/Bets/PlaceBetsHandler';
import CreateBetsAction from '../../Http/Actions/Bets/CreateBetsAction';
import CreateBetsAdapter from '../../Http/Adapters/Bets/CreateBetsAdapter';
import CreateBetsHandler from '../../Application/Handlers/Bets/CreateBetsHandler';
import UserBetRepositoryInterface from '../../Domain/Interfaces/Repositories/UserBetRepositoryInterface';
import KnexUserBetRepository from '../Persistence/Repositories/KnexUserBetRepository';
import TransactionService from '../../Application/Services/Transactions/TransactionsService';
import GetBetsAction from '../../Http/Actions/Bets/GetBetsAction';
import GetBetsAdapter from '../../Http/Adapters/Bets/GetBetsAdapter';
import GetBetsHandler from '../../Application/Handlers/Bets/GetBetsHandler';
import DepositAction from '../../Http/Actions/Transactions/DepositAction';
import DepositAdapter from '../../Http/Adapters/Transactions/DepositAdapter';
import DepositHandler from '../../Application/Handlers/Transactions/DepositHandler';
import WithdrawAction from '../../Http/Actions/Transactions/WithdrawAction';
import WithdrawAdapter from '../../Http/Adapters/Transactions/WithdrawAdapter';
import WithdrawHandler from '../../Application/Handlers/Transactions/WithdrawHandler';
import GetTransactionsAction from '../../Http/Actions/Transactions/GetTransactionsAction';
import GetTransactionAdapter from '../../Http/Adapters/Transactions/GetTransactionsAdapter';
import GetTransactionsHandler from '../../Application/Handlers/Transactions/GetTransactionsHandler';
import GetUsersBalanceAction from '../../Http/Actions/Users/GetUsersBalanceAction';
import GetUsersBalanceAdapter from '../../Http/Adapters/Users/GetUsersBalanceAdapter';
import GetUsersBalanceHandler from '../../Application/Handlers/Users/GetUsersBalanceHandler';
import UpdateBetsAction from '../../Http/Actions/Bets/UpdateBetsAction';
import UpdateBetsAdapter from '../../Http/Adapters/Bets/UpdateBetsAdapter';
import UpdateBetsHandler from '../../Application/Handlers/Bets/UpdateBetsHandler';
import ResultBetsAction from '../../Http/Actions/Bets/ResultBetsAction';
import ResultBetsAdapter from '../../Http/Adapters/Bets/ResultBetsAdapter';
import ResultBetHandler from '../../Application/Handlers/Bets/ResultBetsHandler';
import ValidatorInterface from '../../Http/Validators/ValidatorInterface';
import Validator from '../../Http/Validators/Validator';
import { AuthMiddlewareInterface } from '../../Http/Middlewares/AuthMiddlewareInterface';
import AuthMiddleware from '../../Http/Middlewares/AuthMiddleware';
import ProtectedRoutes from '../../Http/Middlewares/ProtectedRoutes';
import 'reflect-metadata';

const DIContainer = new Container();

//Actions
DIContainer.bind<LoginUsersAction>(LoginUsersAction).toSelf();

DIContainer.bind<CreateUsersAction>(CreateUsersAction).toSelf();
DIContainer.bind<GetUsersAction>(GetUsersAction).toSelf();
DIContainer.bind<UpdateUserAction>(UpdateUserAction).toSelf();
DIContainer.bind<BanUserAction>(BanUserAction).toSelf();
DIContainer.bind<GetUsersBalanceAction>(GetUsersBalanceAction).toSelf();

DIContainer.bind<CreateBetsAction>(CreateBetsAction).toSelf();
DIContainer.bind<PlaceBetsAction>(PlaceBetsAction).toSelf();
DIContainer.bind<GetBetsAction>(GetBetsAction).toSelf();
DIContainer.bind<UpdateBetsAction>(UpdateBetsAction).toSelf();
DIContainer.bind<ResultBetsAction>(ResultBetsAction).toSelf();

DIContainer.bind<DepositAction>(DepositAction).toSelf();
DIContainer.bind<WithdrawAction>(WithdrawAction).toSelf();
DIContainer.bind<GetTransactionsAction>(GetTransactionsAction).toSelf();

//Adapters
DIContainer.bind<LoginUsersAdapter>(LoginUsersAdapter).toSelf();

DIContainer.bind<CreateUsersAdapter>(CreateUsersAdapter).toSelf();
DIContainer.bind<UpdateUsersAdapter>(UpdateUsersAdapter).toSelf();
DIContainer.bind<BanUsersAdapter>(BanUsersAdapter).toSelf();
DIContainer.bind<GetUsersBalanceAdapter>(GetUsersBalanceAdapter).toSelf();
DIContainer.bind<ResultBetsAdapter>(ResultBetsAdapter).toSelf();

DIContainer.bind<CreateBetsAdapter>(CreateBetsAdapter).toSelf();
DIContainer.bind<PlaceBetsAdapter>(PlaceBetsAdapter).toSelf();
DIContainer.bind<GetBetsAdapter>(GetBetsAdapter).toSelf();
DIContainer.bind<UpdateBetsAdapter>(UpdateBetsAdapter).toSelf();

DIContainer.bind<DepositAdapter>(DepositAdapter).toSelf();
DIContainer.bind<WithdrawAdapter>(WithdrawAdapter).toSelf();
DIContainer.bind<GetTransactionAdapter>(GetTransactionAdapter).toSelf();

//Handlers
DIContainer.bind<LoginUsersHandler>(LoginUsersHandler).toSelf();

DIContainer.bind<CreateUsersHandler>(CreateUsersHandler).toSelf();
DIContainer.bind<GetUsersHandler>(GetUsersHandler).toSelf();
DIContainer.bind<UpdateUsersHandler>(UpdateUsersHandler).toSelf();
DIContainer.bind<BanUsersHandler>(BanUsersHandler).toSelf();
DIContainer.bind<GetUsersBalanceHandler>(GetUsersBalanceHandler).toSelf();
DIContainer.bind<ResultBetHandler>(ResultBetHandler).toSelf();

DIContainer.bind<PlaceBetsHandler>(PlaceBetsHandler).toSelf();
DIContainer.bind<CreateBetsHandler>(CreateBetsHandler).toSelf();
DIContainer.bind<GetBetsHandler>(GetBetsHandler).toSelf();
DIContainer.bind<UpdateBetsHandler>(UpdateBetsHandler).toSelf();

DIContainer.bind<DepositHandler>(DepositHandler).toSelf();
DIContainer.bind<WithdrawHandler>(WithdrawHandler).toSelf();
DIContainer.bind<GetTransactionsHandler>(GetTransactionsHandler).toSelf();

//Respoitories
DIContainer.bind<UserRepositoryInterface>(INTERFACES.UserRepositoryInterface).to(KnexUserRepository);
DIContainer.bind<TransactionRepositoryInterface>(INTERFACES.TransactionRepositoryInterface).to(
  KnexTransactionRepository,
);
DIContainer.bind<BetRepositoryInterface>(INTERFACES.BetRepositoryInterface).to(KnexBetRepository);
DIContainer.bind<UserBetRepositoryInterface>(INTERFACES.UserBetRepositoryInterface).to(KnexUserBetRepository);

//Services
DIContainer.bind<RedisConnectionInterface>(INTERFACES.RedisConnectionInterface).to(RedisConnection).inSingletonScope();
DIContainer.bind<TransactionService>(TransactionService).toSelf();

DIContainer.bind<ValidatorInterface>(INTERFACES.ValidatorInterface).to(Validator);
DIContainer.bind<AuthMiddlewareInterface>(INTERFACES.AuthMiddlewareInterface).to(AuthMiddleware);
DIContainer.bind<ProtectedRoutes>(ProtectedRoutes).toSelf();

export default DIContainer;
