// Barebones "direct-connection" client.
// To be embedded into proper webpage later.

var socketio = io();
var player = {
    username: null
};

var login = function(){
    player.username = document.getElementById("loginField").value;
    console.log("Username '" + player.username + "' set.");
    socketio.emit('login', player);
    document.getElementById("login").innerHTML = "";
}