'use strict';
require('dotenv').config();
const { faker } =require('@faker-js/faker');
const PORT = process.env.PORT || 3030;
const ioServer = require('socket.io')(PORT);
const uuid = require('uuid').v4;

const queue = {
    flight: {

    }
}

  
 
    ioServer.on('connection', (socket) => {
        console.log('connected ', socket.id);
         
        socket.on("new-flight", (payload) =>{
            const id = uuid();
        queue.flight[id] = payload;
    
    console.log(queue.flight);
    
    
    
    setTimeout(() => {
        
        ioServer.emit("new-flight", payload)
    }, 1000);
    
    setTimeout(() => {
        
        ioServer.emit("took-off", payload)
        
    }, 4000);
    setTimeout(() => {
        
        ioServer.emit("arrived", payload)
        
    }, 7000);
    setTimeout(() => {
        
        ioServer.emit("massage" , payload)
        
    }, 8000);
    
    
    setTimeout(() => {  
        ioServer.emit("flight" , queue.flight)
        
    }, 10000);
    })
    socket.on("get-all" , (payload) => {
       
    console.log("all flights  from get-all event");
    const id = uuid();
    queue.flight[id] = payload;
    console.log("----------------------------------------------");
    console.log(queue.flight);
    console.log("----------------------------------------------");
        
    })
    
    
    
    
           })   
            
        
        //namespace
        
        const airLineSystem = ioServer.of('/airline');
        airLineSystem.on('connection', (socket) => {
        console.log('connected to AirLine', socket.id);
        setTimeout(() => {
                    
            airLineSystem.emit('took-off', queue.flight);
           
           }, 4000)
    
           setTimeout(() => { 
                
            airLineSystem.emit('arrived', queue.flight);
        }, 7000)
            
        
    });