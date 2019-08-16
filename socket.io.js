const socketIO = require('socket.io');
const services = require('./services');


module.exports = (server) => {
    const io = socketIO(server);
    let connected = {};

    io.on('connection', function(socket){
        console.log('connected');
    
        socket.on('new connection', function(user){
            connected[user.id] = socket.id;
            console.log(connected)
        })
    
        socket.on('disconnect', function(){
            console.log('disconected');
            let keys = Object.keys(connected);
            keys.forEach((value) => {
                if(connected[keys] === socket.id){
                    delete connected[keys];
                }
            })
        })
    
        socket.on('new message', function(data){
            const {msg, chatID, sender} = data;
            services.saveMessage.saveMessage(msg, chatID, sender);
            data.members.forEach(element => {
                connected[element] && io.to(connected[element]).emit('new message',data);
            });
        })
    
    });
}