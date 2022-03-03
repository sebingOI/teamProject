var PORT = 9000;
var HOST = '127.0.0.1';
var dgram = require('dgram');
var message = JSON.stringify({cmd:"CS", id:"asdf", pos: [1.7, 2.3, 5.5]});

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message send to' + HOST +':'+ PORT);
    // console.log()
    // client.close();
});

client.on('message',function(msg,rinfo){
    console.log(JSON.parse(msg.toString()));
})
