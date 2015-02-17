/**
 * Created by steva on 2/16/15.
 */

peraf = 'blic';

function User(name, password) {
    this.username = name;
    this.password = password;

}

function createUser(name, password) {
    var user = new User(name, password);

    return user;
}

function addUser(username, password) {
    newUser = new aUser;
    newUser.password = password;
    newUser.username = username;

}

exports.create = createUser;
exports.user = User;