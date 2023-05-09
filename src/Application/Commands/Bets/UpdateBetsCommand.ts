export default class UpdateBetsCommand {
  public id: number;
  public status: string | null;
  public odd: number | null;

  public constructor(id: number, status: string | null, odd: number | null) {
    this.id = id;
    this.status = status;
    this.odd = odd;
  }

  public getId(): number {
    return this.id;
  }

  public getStatus(): string | null {
    return this.status;
  }

  public getOdd(): number | null {
    return this.odd;
  }
}
