// Server software based on node.js with socket.io.

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 3000;
var socketio = require('socket.io')(server);

server.listen(port, function(){
    console.log("Server active at port " + port )
});

app.use(express.static(__dirname + '/public')); // For direct http connection to the game server. There will be a proper "website" hosted via nginx.

var numUsers = 0;

socketio.on('connection', function(socket){
    var addedUser = false;
    //console.log(socket);
    socket.on('message', function(data){
        console.log(data);
    })

    socket.on('login', function(data){
        console.log('Received login data from ' + data.username);
        console.log(data);
        if(addedUser) return;
        socket.username = data.username;
        ++numUsers;
        addedUser = true;
    })
});

socketio.on('disconnect', function () {
    if (addedUser) {
        --numUsers;
    }
});