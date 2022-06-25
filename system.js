'use strict';
const events = require('./moduler/events');
const {faker} = require('@faker-js/faker');

require('./moduler/pilot');
require('./moduler/manager');



let flight = {
    event: "newEvent",
    time: faker.date.past(),
    Details: "any" ,
    airLine: 'Royal Jordanian Airlines',
    destination: faker.address.city(),
    flightID: faker.datatype.uuid(),
    pilot: faker.name.firstName()
}
setInterval(() => { 
    events.emit('new-flight', flight);
}, 10000)

module.exports ={flight};