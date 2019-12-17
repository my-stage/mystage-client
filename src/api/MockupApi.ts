import User from './User'

export default class MockupApi {

    static async getUsers(): Promise<User[]> {
        let users: User[] = [];
        users.push(new User("Name 1", "username1", "address1@example.com", 0));
        users.push(new User("Name 2", "username2", "address2@example.com", 1));
        users.push(new User("Name 3", "username3", "address3@example.com", 0));
        users.push(new User("Name 4", "username4", "address4@example.com", 1));
        return new Promise(function(resolve, reject) {
            resolve(users);
        });
    }

}
