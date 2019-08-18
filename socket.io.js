const socketIO = require('socket.io');
const services = require('./services');


module.exports = (server) => {
    const io = socketIO(server);
    let connected = {};

    io.on('connection', function(socket){
        console.log('connected');
    
        socket.on('new connection', function(user){
            connected[user.id] = socket.id;
            services.updateUserStatus.updateUserStatus(user.id, 1)
                .then((res) => {
                    if(res.success){
                        socket.broadcast.emit('online',{
                            user: user.id,
                            status: 1,
                        });
                    }
                })
            console.log(connected)
        })
    
        socket.on('disconnect', function(){
            console.log('disconected');
            let keys = Object.keys(connected);
            keys.forEach((value) => {
                if(connected[value] === socket.id){
                    services.updateUserStatus.updateUserStatus(value, 0)
                        .then((res) => {
                            if(res.success){
                                socket.broadcast.emit('online',{
                                    user: value,
                                    status: 0,
                                });
                            }
                        })
                    delete connected[keys];
                }
            });
        })
    
        socket.on('new message', function(data){
            const {message, chatID, userinfo, members} = data;
            console.log(members)
            services.saveMessage.saveMessage(message, chatID, userinfo.id);
            members.forEach(element => {
                connected[element._id] && io.to(connected[element._id]).emit('new message',data);
            });
        })

        socket.on('typing', function(data){
            // console.log(data)
            data.receiver.forEach((user) => {
                socket.to(connected[user._id]).emit('typing', {
                    chatID: data.chatID,
                    status: data.status,
                });
            });
        });

        socket.on('new chat', function(chat){
            console.log(services.addToOngoing.addToOngoing(chat));
        })

        socket.on('open chat', function(chat){

        })

    });
}