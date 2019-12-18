import User from './User'
import Event from './Event';

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

    static async getEvents(): Promise<Event[]> {
        let events: Event[] = [];
        events.push(new Event(0, 1, 2, 3, "Event 1"));
        events.push(new Event(4, 5, 6, 7, "Event 2"));
        events.push(new Event(8, 9, 10, 11, "Event 3"));
        events.push(new Event(12, 13, 14, 15, "Event 4"));
        events.push(new Event(16, 17, 18, 19, "Event 5"));
        return new Promise(function(resolve, reject) {
            resolve(events);
        });
    }

}
