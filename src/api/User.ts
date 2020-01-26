import Api from './Api';

class User {

  static SexNames = {0: "Undefiniert", 1: "Herr", 2: "Dame"};

  id: number = 1;
  name: string = "";
  username: string = "";
  password: string = ""; // empty when requested from server, filled with password when edit/create
  email: string = "";
  sex: number = 0;

  get sexStr() : string {
    if(this.sex == 1) {
      return "Herr";
    } else if(this.sex == 2) {
      return "Dame";
    } else {
      return "Undefiniert";
    }
  }

  isNewModel: boolean = false;

  static async GetById(id: number) {
    const response = await Api.request("GET", "records/users/" + id, {}, {});
    return User.fromDb(response.data[0]);
  }

  static async MyUser() {
    const response = await Api.request("GET", "myuser", {}, {});
    return User.fromDb(response.data);
  }

  static async GetAll() {
    const response = await Api.request("GET", "records/users", {}, {});
    return response.data.map((dbUser: any) => User.fromDb(dbUser));
  }

  constructor() {

  }

  setAttributes(attributes: any) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.username = attributes.username;
    this.password = attributes.password;
    this.email = attributes.email;
    this.sex = attributes.sex;
  }

  static fromDb(dbUser: any) {
    const user = new User();
    user.setAttributes(dbUser);
    user.isNewModel = false;
    return user;
  }

  async Delete() {
    const response = await Api.request("DELETE", "records/users/" + this.id, {}, {});
    return response;
  }

  async Save() {
    if(this.isNewModel) {
      // edit
      return await Api.request("POST", "register", {}, {
        name: this.name,
        username: this.username,
        password: this.password,
        email: this.email,
        sex: this.sex,
      });
      // set user.id from response
    } else {
      // update
      this.isNewModel = false;
      return await Api.request("PUT", "records/users/" + this.id, {}, {
        name: this.name,
        username: this.username,
        password: this.password,
        email: this.email,
        sex: this.sex,
      });
    }
  }

  static async TryLogin(username: string, password: string) {
    const res = await Api.request("POST", "login",  {},{
      username: username,
      password: password,
    });

    return res;
  }
}

export default User;
