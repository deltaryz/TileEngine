// Server software based on node.js with socket.io.
// Also includes an express server for basic direct connection.

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 3000;
var socketio = require('socket.io')(server);

server.listen(port, function(){
    console.log("Server active at port " + port )
});

app.use(express.static(__dirname + '/public')); // For direct http connection to the game server. There will be a proper "website" hosted via nginx.

var currentPlayers = [];

/*
 *   Description of player object:
 *   username:	self-explanatory. TODO: Implement persistent user profiles.
 *   pos:	An array of X, Y and Z coordinates. [x, y, z]
 *   race:	string identifier of "earth", "pegasus", "unicorn", or "alicorn". TODO: Implement visual and mechanical differences.
 *   inv:	Contents of a player's inventory. Currently unused. TODO: Implement inventory management (should other players' inventories be visible to clients?)
 *   hp:	Available health of the player. Integer value with no hardcoded maximum.
 *
 */

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
	var initPlayer = {}; // TODO: this
        currentPlayers.push(data); // TODO: Adjust to init'd player.
        addedUser = true;
	// socket.emit(initPlayer); TODO: Initialize player with all variables and emit to the client.
    })
});

socketio.on('disconnect', function () {
    if (addedUser) {
        --numUsers;
    }
});
