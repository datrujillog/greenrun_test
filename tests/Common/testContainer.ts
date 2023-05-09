import { Container } from 'inversify';
import "reflect-metadata";
import BetRepositoryInterface from '../../src/Domain/Interfaces/Repositories/BetRepositoryInterface';
import TransactionRepositoryInterface from '../../src/Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import UserBetRepositoryInterface from '../../src/Domain/Interfaces/Repositories/UserBetRepositoryInterface';
import UserRepositoryInterface from '../../src/Domain/Interfaces/Repositories/UserRepositoryInterface';
import MockBetRepository from './MockBetRepository';
import MockTransactionRepository from './MockTransactionRepository';
import MockUserBetRepository from './MockUserBetRepository';
import MockUserRepository from './MockUserRepository';

const DIContainer = new Container();

//Respoitories
DIContainer.bind<UserRepositoryInterface>('UserRepositoryInterface').to(MockUserRepository);
DIContainer.bind<BetRepositoryInterface>('BetRepositoryInterface').to(MockBetRepository);
DIContainer.bind<UserBetRepositoryInterface>('UserBetRepositoryInterface').to(MockUserBetRepository);
DIContainer.bind<TransactionRepositoryInterface>('TransactionRepositoryInterface').to(MockTransactionRepository);


export default DIContainer;
