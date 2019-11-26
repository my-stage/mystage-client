class User {

  name: string;
  username: string;

  constructor(dbUser: any) {
    this.name = dbUser["name"];
    this.username = dbUser["username"];
  }

}

export default User;
