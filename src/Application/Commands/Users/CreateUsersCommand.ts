export default class CreateUsersCommand {
  public role: string;
  public first_name: string;
  public last_name: string;
  public phone: string;
  public email: string;
  public username: string;
  public password: string;
  public address: string;
  public gender: string;
  public birth_date: string;
  public country_id: number;
  public city: string;
  public category: string;
  public document_id: number;

  public constructor(
    role: string,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    username: string,
    password: string,
    address: string,
    gender: string,
    birth_date: string,
    country_id: number,
    city: string,
    category: string,
    document_id: number,
  ) {
    this.role = role;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
    this.email = email;
    this.username = username;
    this.password = password;
    this.address = address;
    this.gender = gender;
    this.birth_date = birth_date;
    this.country_id = country_id;
    this.city = city;
    this.category = category;
    this.document_id = document_id;
  }

  public getRole(): string {
    return this.role;
  }

  public getFirstName(): string {
    return this.first_name;
  }

  public getLastName(): string {
    return this.last_name;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getEmail(): string {
    return this.email;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public getAddress(): string {
    return this.address;
  }

  public getGender(): string {
    return this.gender;
  }

  public getBirthDate(): string {
    return this.birth_date;
  }

  public getCountryId(): number {
    return this.country_id;
  }

  public getCity(): string {
    return this.city;
  }

  public getCategory(): string {
    return this.category;
  }

  public getDocumentId(): number {
    return this.document_id;
  }
}
