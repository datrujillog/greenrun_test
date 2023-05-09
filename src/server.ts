import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import dotenv from 'dotenv';
import HapiSwagger from 'hapi-swagger';
import Joi from 'joi';
import 'reflect-metadata';
import LoginUsersAction from './Http/Actions/Auth/LoginUsersAction';
import CreateBetsAction from './Http/Actions/Bets/CreateBetsAction';
import GetBetsAction from './Http/Actions/Bets/GetBetsAction';
import PlaceBetsAction from './Http/Actions/Bets/PlaceBetsAction';
import ResultBetsAction from './Http/Actions/Bets/ResultBetsAction';
import UpdateBetsAction from './Http/Actions/Bets/UpdateBetsAction';
import DepositAction from './Http/Actions/Transactions/DepositAction';
import GetTransactionsAction from './Http/Actions/Transactions/GetTransactionsAction';
import WithdrawAction from './Http/Actions/Transactions/WithdrawAction';
import BanUsersAction from './Http/Actions/Users/BanUsersAction';
import CreateUsersAction from './Http/Actions/Users/CreateUsersAction';
import GetUsersAction from './Http/Actions/Users/GetUsersAction';
import GetUsersBalanceAction from './Http/Actions/Users/GetUsersBalanceAction';
import UpdateUserAction from './Http/Actions/Users/UpdateUsersAction';
import { AuthMiddlewareInterface } from './Http/Middlewares/AuthMiddlewareInterface';
import ProtectedRoutes from './Http/Middlewares/ProtectedRoutes';
import { getBetsResultSchema } from './Http/Validators/Schemas/Bets/GetBetsSchema';
import { getTransactionResultSchema } from './Http/Validators/Schemas/Transactions/GetTransactionSchema';
import { getUsersResultSchema } from './Http/Validators/Schemas/Users/CreateUsersSchema';
import DIContainer from './Infrastructure/DI/di.config';
import { INTERFACES } from './Infrastructure/DI/Interfaces.types';

class Server {
  private loginUserAction: LoginUsersAction;
  private createUserAction: CreateUsersAction;
  private getUsersAction: GetUsersAction;
  private updateUsersAction: UpdateUserAction;
  private banUsersAction: BanUsersAction;
  private createBetsAction: CreateBetsAction;
  private placeBetsAction: PlaceBetsAction;
  private getBetsAction: GetBetsAction;
  private depositAction: DepositAction;
  private withdrawAction: WithdrawAction;
  private getTransactionsAction: GetTransactionsAction;
  private getUsersBalanceAction: GetUsersBalanceAction;
  private updateBetsAction: UpdateBetsAction;
  private resultBetsAction: ResultBetsAction;
  private authMiddleware: AuthMiddlewareInterface;
  private protectedRoutes: ProtectedRoutes;

  constructor() {
    this.loginUserAction = DIContainer.get<LoginUsersAction>(LoginUsersAction);
    this.createUserAction = DIContainer.get<CreateUsersAction>(CreateUsersAction);
    this.getUsersAction = DIContainer.get<GetUsersAction>(GetUsersAction);
    this.updateUsersAction = DIContainer.get<UpdateUserAction>(UpdateUserAction);
    this.banUsersAction = DIContainer.get<BanUsersAction>(BanUsersAction);
    this.createBetsAction = DIContainer.get<CreateBetsAction>(CreateBetsAction);
    this.placeBetsAction = DIContainer.get<PlaceBetsAction>(PlaceBetsAction);
    this.getBetsAction = DIContainer.get<GetBetsAction>(GetBetsAction);
    this.depositAction = DIContainer.get<DepositAction>(DepositAction);
    this.withdrawAction = DIContainer.get<WithdrawAction>(WithdrawAction);
    this.getTransactionsAction = DIContainer.get<GetTransactionsAction>(GetTransactionsAction);
    this.getUsersBalanceAction = DIContainer.get<GetUsersBalanceAction>(GetUsersBalanceAction);
    this.updateBetsAction = DIContainer.get<UpdateBetsAction>(UpdateBetsAction);
    this.resultBetsAction = DIContainer.get<ResultBetsAction>(ResultBetsAction);
    this.authMiddleware = DIContainer.get<AuthMiddlewareInterface>(INTERFACES.AuthMiddlewareInterface);
    this.protectedRoutes = DIContainer.get<ProtectedRoutes>(ProtectedRoutes);
    this.init();
  }

  init = async () => {
    const server = Hapi.server({
      port: 3000,
    });

    const swaggerOptions: HapiSwagger.RegisterOptions = {
      info: {
        title: 'GreenRun API Documentation',
      },
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    };

    const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
      {
        plugin: Inert,
      },
      {
        plugin: Vision,
      },
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ];
    await server.register(plugins);

    dotenv.config();

    var authMiddleware = this.authMiddleware;
    var protectedRoutes = this.protectedRoutes;
    server.ext('onRequest', async function (request, h) {
      if (!protectedRoutes.getPublicRoutues().includes(request.path)) {
        request = await authMiddleware.check(request);
      }
      return h.continue;
    });

    server.route([
      {
        method: 'POST',
        path: this.loginUserAction.ROUTE_PATH,
        options: {
          handler: this.loginUserAction.execute,
          tags: ['api', 'auth'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Login successfully',
                  schema: Joi.object().keys({
                    token: 'jwt',
                  }),
                },
                '400': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'POST',
        path: this.createUserAction.ROUTE_PATH,
        options: {
          handler: this.createUserAction.execute,
          tags: ['api', 'users'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'GET',
        path: this.getUsersAction.ROUTE_PATH,
        options: {
          handler: this.getUsersAction.execute,
          tags: ['api', 'users'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Retreived data successfully',
                  schema: Joi.array().items(getUsersResultSchema),
                },
                '400': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'PUT',
        path: this.updateUsersAction.ROUTE_PATH,
        options: {
          handler: this.updateUsersAction.execute,
          tags: ['api', 'users'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Updated data successfully',
                },
                '400': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'PUT',
        path: this.banUsersAction.ROUTE_PATH,
        options: {
          handler: this.banUsersAction.execute,
          tags: ['api', 'users'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Baned user successfully',
                },
                '400': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'POST',
        path: this.createBetsAction.ROUTE_PATH,
        options: {
          handler: this.createBetsAction.execute,
          tags: ['api', 'bets'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Created bet successfully',
                },
                '400': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'PUT',
        path: this.updateBetsAction.ROUTE_PATH,
        options: {
          handler: this.updateBetsAction.execute,
          tags: ['api', 'bets'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Updated bet successfully',
                },
                '400': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'PUT',
        path: this.resultBetsAction.ROUTE_PATH,
        options: {
          handler: this.resultBetsAction.execute,
          tags: ['api', 'bets'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Setted a result on a bet successfully',
                },
                '400': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'GET',
        path: this.getBetsAction.ROUTE_PATH,
        options: {
          handler: this.getBetsAction.execute,
          tags: ['api', 'bets'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Retreived information about bets successfully',
                  schema: getBetsResultSchema,
                },
                '400': {
                  description: 'BadRequest',
                },
              },
            },
          },
        },
      },
      {
        method: 'POST',
        path: this.placeBetsAction.ROUTE_PATH,
        options: {
          handler: this.placeBetsAction.execute,
          tags: ['api', 'user_bets'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Placed a user bet successfully',
                },
                '400': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'POST',
        path: this.depositAction.ROUTE_PATH,
        options: {
          handler: this.depositAction.execute,
          tags: ['api', 'transactions'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Deposited some amount of money on an account successfully',
                },
                '400': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'POST',
        path: this.withdrawAction.ROUTE_PATH,
        options: {
          handler: this.withdrawAction.execute,
          tags: ['api', 'transactions'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Withdrawed some amount of money from an account successfully',
                },
                '400': {
                  description: 'BadRequest',
                },
              },
              payloadType: 'json',
            },
          },
        },
      },
      {
        method: 'GET',
        path: this.getTransactionsAction.ROUTE_PATH,
        options: {
          handler: this.getTransactionsAction.execute,
          tags: ['api', 'transactions'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Retreived information about transactions successfully',
                  schema: getTransactionResultSchema,
                },
                '400': {
                  description: 'BadRequest',
                },
              },
            },
          },
        },
      },
      {
        method: 'GET',
        path: this.getUsersBalanceAction.ROUTE_PATH,
        options: {
          handler: this.getUsersBalanceAction.execute,
          tags: ['api', 'users'],
          plugins: {
            'hapi-swagger': {
              responses: {
                '200': {
                  description: 'Retreived information about users balance successfully',
                  schema: Joi.object().keys({
                    amount: Joi.number(),
                  }),
                },
                '400': {
                  description: 'BadRequest',
                },
              },
            },
          },
        },
      },
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
  };
}

export default new Server();
