export default class ResultBetsCommand {
  public id: number;
  public result: string;

  public constructor(id: number, result: string) {
    this.id = id;
    this.result = result;
  }

  public getId(): number {
    return this.id;
  }

  public getResult(): string {
    return this.result;
  }
}
