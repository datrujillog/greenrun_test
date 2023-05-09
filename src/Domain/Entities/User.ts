export default class User {
  private id: number;

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
  public user_state: string | null;

  public created_at: Date;

  public updated_at: Date;

  public deleted: boolean;

  public deleted_at: Date | null;

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
    user_state?: string | null,
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
    this.user_state = user_state ? user_state : null;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted = false;
    this.deleted_at = null;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public setRole(role: string): void {
    this.role = role;
  }

  public setFirstName(first_name: string): void {
    this.first_name = first_name;
  }

  public setLastName(last_name: string): void {
    this.last_name = last_name;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public setGender(gender: string): void {
    this.gender = gender;
  }

  public setBirthDate(birth_date: string): void {
    this.birth_date = birth_date;
  }

  public setCountryId(country_id: number): void {
    this.country_id = country_id;
  }

  public setCity(city: string): void {
    this.city = city;
  }

  public setCategory(category: string): void {
    this.category = category;
  }

  public setDocumentId(document_id: number): void {
    this.document_id = document_id;
  }

  public setUserState(user_state: string): void {
    this.user_state = user_state;
  }

  public setCreatedAt(created_at: Date): void {
    this.created_at = created_at;
  }

  public setUpdatedAt(updated_at: Date): void {
    this.updated_at = updated_at;
  }
}
