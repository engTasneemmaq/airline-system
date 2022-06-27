'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/airline`;


const systemConnection = io.connect(host);

systemConnection.on('took-off', handleTookOff);

function handleTookOff(payload) {
        console.log(` Pilot: flight with ID : " ${payload.flightID} "  took-off `);
               
};

systemConnection.on('arrived', handleArrived);

function handleArrived(payload) {
        console.log(` Pilot: flight with ID : " ${payload.flightID} "  arrived `);
        console.log("----------------------------------------------------------------");

        systemConnection.emit("message",payload);        
};