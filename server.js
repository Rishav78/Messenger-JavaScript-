const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app);
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const io = socketIO(server);
const path = require('path');
const port = 8000;
const session = require('express-session');
const MongooseStore = require('connect-mongo')(session);
const passport = require('passport');
const mongoose = require('./model/db');
const User = require('./model/users');
const cookie = require('cookie-parser');
const message = require('./model/messages');

let m = new message({
    sender: "rishav",
    msg: "rishav"
})

m.save()

let connected = {};
//---------------Express Middleware--------------------//
// app.use(cookie());
app.use('/', express.static(path.join(__dirname,'public','javascript')));
app.use('/', express.static(path.join(__dirname,'public','css')));
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({extended: true})); 
// app.use(require('cors')({
//     origin: 'http://localhost:3000', //the port my react app is running on.
//     credentials: true,
//   }));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'sdfghjklkjhgfdstyu',
    resave: false,
    saveUninitialized: true,
    store: new MongooseStore({
        mongooseConnection: mongoose.connection,
    }),
}));
app.use(passport.initialize());
app.use(passport.session());
//--------------------------End----------------------//

//---------------Routers---------------//

app.use(function(req, res, next) {
    console.log(req.url);
//     console.log("session id",req.sessionID);
    // res.header('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Allow-Origin', req.headers.origin);
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.use('/', require('./routes'));

//----------------- End ----------------//

io.on('connection', function(socket){
    console.log('connected');

    socket.on('new connection', function(user){
        connected[user.id] = socket.id;
        console.log(connected)
    })

    // socket.on('disconnect', function(){
    //     console.log('disconected');
    //     let keys = Object.keys(connected);
    //     keys.forEach((value) => {
    //         if(connected[keys] === socket.id){
    //             delete connected[keys];
    //         }
    //     })
    // })

    socket.on('new message', function(data){
        console.log(data)
        data.members.forEach(element => {
            console.log(element, connected[element])
            connected[element] && io.to(connected[element]).emit('new message',data);
        });
        // console.log(connected[data['Rid']])
        // io.to(connected[data['Rid']]).emit('new message', data.msg)
    })

});




passport.serializeUser(function(user, done) {
        done(null, user);
    });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

server.listen(port , ()=>{console.log(`Listening on Port ${port}`)})