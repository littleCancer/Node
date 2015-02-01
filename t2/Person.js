/**
 * Created by steva on 1/25/15.
 */

function Person (name) {
    console.log('person constructor');
    this.name = name;
}

Person.prototype.talk = function () {
    console.log('my name is ', this.name);
}

function pevaj(sta) {
    console.log('idri brigu na veselje', sta);
}

//module.exports = Person;
exports.pevaj = pevaj;