import { inject, injectable } from 'inversify';
import LoginUsersAction from '../Actions/Auth/LoginUsersAction';

@injectable()
export default class ProtectedRoutes {
  constructor(@inject(LoginUsersAction) private loginUserAction: LoginUsersAction) {}

  public getPublicRoutues(): string[] {
    return [this.loginUserAction.ROUTE_PATH];
  }
}
