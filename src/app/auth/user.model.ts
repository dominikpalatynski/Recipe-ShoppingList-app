export class User {
  constructor(
    public email: string,
    public id: string,
    public token: string,
    private tokenExpirationDate: Date
  ) {}
  getToken() {
    if (this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }

    return this.token;
  }
}
