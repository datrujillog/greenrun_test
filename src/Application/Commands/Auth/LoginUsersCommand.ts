export default class LoginUsersCommand {
  public username: string;
  public password: string;

  public constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }
}
