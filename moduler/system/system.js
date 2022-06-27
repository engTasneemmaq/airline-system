'use strict';
require('dotenv').config();
const { faker } =require('@faker-js/faker');
const PORT = process.env.PORT || 3030;
const ioServer = require('socket.io')(PORT);


let flight = {
    event: "newEvent",
    time: faker.date.past(),
    Details: "any" ,
    airLine: 'Royal Jordanian Airlines',
    destination: faker.address.city(),
    flightID: faker.datatype.uuid(),
    pilot: faker.name.firstName()
 };

 
 
 
 ioServer.on('connection', (socket) => {
    console.log('connected ', socket.id);
      
    // setInterval(() => { 
        setTimeout(() => {    
            ioServer.emit('new-flight', flight);
        console.log(flight);
            setTimeout(() => {
                console.log(flight);
                ioServer.emit('took-off', flight);
               
               }, 4000)
    
        
        setTimeout(() => { 
            console.log(flight);
            ioServer.emit('arrived', flight);
        }, 7000) 
        setTimeout(() => { 
            
            ioServer.emit("massage", flight); 
        }, 8000)
      
        }, 10000)

   });


//  namespace
const airLineSystem = ioServer.of('/airline');
airLineSystem.on('connection', (socket) => {
console.log('connected to AirLine', socket.id);
setTimeout(() => {
            
    airLineSystem.emit('took-off', flight);
   
   }, 4000)

   setTimeout(() => { 
        
    airLineSystem.emit('arrived', flight);
}, 7000)
    

});