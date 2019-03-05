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


var HOST = '134.209.76.81';
var PORT = 1010;
server.listen(5010);

var web_sockets = [];




io.on('connection', function(socket) {
      web_sockets.push(socket)
    
    socket.on('validacion',function(data){
      socket.emit('mensaje', {latitud:'51.678418',longitud:'7.809007'});
    })
    socket.emit('mensaje', {latitud:'51.678418',longitud:'7.809007'});

      
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



