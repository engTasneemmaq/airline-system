'use strict';
const events = require('./events');
const flight = require('../system')
require('./pilot');


events.on('new-flight', newFlight);
function newFlight(payload) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(`Manager: new flight with ID :" ${payload.flightID}" have been scheduled`);
        console.log(payload); 

        setTimeout(() => {
            events.emit('took-off', payload);
           
           }, 4000)
    
    
    setTimeout(() => { 
        events.emit('arrived', payload);
    }, 7000) 
       
}

events.on('message', managerMassage);
function managerMassage(payload){
    console.log(`Manager: we're greatly thankful for the amazing flight, ${payload.pilot}`);
}
 
