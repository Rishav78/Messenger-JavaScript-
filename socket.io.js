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
            const {message, chatID, userinfo} = data;
            services.saveMessage.saveMessage(message, chatID, userinfo.id);
            data.members.forEach(element => {
                connected[element._id] && io.to(connected[element._id]).emit('new message',data);
            });
        })
    
    });
}