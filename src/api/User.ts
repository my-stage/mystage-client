class User {

  name: string;
  username: string;
  email: string;
  _sex: number;

  get sex(): string {
    return this._sex ? "männlich" : "weiblich";
  }
  set sex(strSex: string) {
    this._sex = strSex === "männlich" ? 1 : 0;
  }

  constructor(dbUser: any) {
    this.name = dbUser["name"];
    this.username = dbUser["username"];
    this.email = dbUser["email"];
    this._sex = dbUser["sex"];
  }

}

export default User;
