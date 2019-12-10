const socketIO = require('socket.io');
const services = require('./services');


module.exports = (server) => {
    const io = socketIO(server);
    let connected = {};

    io.on('connection', function(socket){

        socket.on('new connection', async (user) => {
            const { phone, password } = user;
            const valid = await services.LoginService.login(phone, password);
            if(!valid.success) return;
            const { _id } = valid;
            const res = await services.updateUserStatus.updateUserStatus(_id, 1);
            if(res.success){
                connected[_id] = socket.id;
                socket.broadcast.emit('online',{
                    user: _id,
                    status: 1,
                });
                console.log('connected');
            }
            console.log(connected)
        })
    
        socket.on('disconnect', function(){
            let keys = Object.keys(connected);
            for(let i=0;i<keys.length;i++) {
                const value = keys[i];
                if(connected[value] === socket.id){
                    services.updateUserStatus.updateUserStatus(value, 0)
                        .then((res) => {
                            if(res.success){
                                socket.broadcast.emit('online',{
                                    user: value,
                                    status: 0,
                                });
                                console.log('disconected');
                            }
                        })
                    delete connected[keys];
                    break;
                }
            }
        })
    
        socket.on('new message', (data) => {
            const { message, chatID, userinfo, members } = data;
            services.saveMessage.saveMessage(message, chatID, userinfo.id);
            members.forEach(element => {
                const user = connected[element._id];
                if(user) io.to(user).emit('new message', data);
            });
        })

        socket.on('typing', function(data){
            data.receiver.forEach((user) => {
                const { chatID, status } = data;
                socket.to(connected[user._id]).emit('typing', { chatID, status });
            });
        });

        socket.on('new chat', function(chat){
            services.addToOngoing.addToOngoing(chat)
             .then((res) => {
                 chat.Members.forEach((value) => {
                     console.log(res);
                     socket.to(connected[value]).emit('new chat', res)
                 })
             })
        })

        socket.on('open chat', function(chat){

        })

    });
}