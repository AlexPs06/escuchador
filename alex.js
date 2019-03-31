var express = require('express');
var app = express();

var net = require('net');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
  for (var k2 in interfaces[k]) {
    var address = interfaces[k][k2];
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address);
    }
  }
}


var HOST = '192.168.0.18';
var PORT = 4000;
server.listen(5000);

var web_sockets = [];




io.on('connection', function(socket) {
    web_sockets.push(socket)

    // socket.on("room",function(data){
    //   socket.join(room);
    // });
    socket.on('lobby',function(data){
      console.log("player1 "+ data.player1+" player2 "+ data.player2+" player3 "+ data.player3+" player4 "+ data.player4+" player5 "+ data.player5)
      console.log("idLobby "+ data.idLobby)
      socket
      io.emit('playersLobby',
       { 
        idLobby:data.idLobby, 
        player1:data.player1,
        player2:data.player2,
        player3:data.player3,
        player4:data.player4,
        player5:data.player5,
        playersCount:data.playersCount,
       });
    })
    socket.on('destroyUser',function(data){
      console.log("entre"+ data.userOut)
      console.log("entre"+ data.idLobby)
      io.emit('destroy',
          {
            playersCount:data.playersCount,
            userOut:data.userOut,
            idLobby:data.idLobby
          });

    })
    socket.on('reconection',function(data){
      io.emit('reconectUser');
    })
    socket.on('message',function(data){
      console.log("message "+ data.message)
      console.log("idLobby "+ data.idLobby)
      console.log("idUser "+ data.idUser)

      io.emit('new-message', { message:data.message, idLobby: data.idLobby, idUser: data.idUser })

    })
    socket.on('disconnect', function() {
          var idx = web_sockets.indexOf(socket);

          if (idx != -1) {
            web_sockets.splice(idx, 1);

          }
    });



    socket.on('end', function() {
        
    });

    socket.on('error', function() {

    });

    socket.on('timeout', function() {
        
    });

    socket.on('close', function() {
        
    });

});

io.on('error',function(err){ 
  console.error(err)
});



net.createServer(function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);    
    sock.on('data', function(data) {
    });

}).listen(PORT, HOST);



