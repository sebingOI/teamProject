var PORT = 9000;
var HOST = '127.0.0.1';
var dgram = require('dgram');
var CS = JSON.stringify({ cmd: "CS", id: "asdf" });
var DBS = JSON.stringify({ cmd: "DBs", nick: "kk" })
var CLO = JSON.stringify({ cmd: "cLo", nick: "kk" });
var MAO = JSON.stringify({ cmd: "mAo", mID: "11" });
var GG = JSON.stringify({ cmd: "GG", nick: "kk"});
var CN = JSON.stringify({ cmd: "CN", nick: "kk", CNt: 20});

var client = dgram.createSocket('udp4');
// client.send(GG, 0, GG.length, PORT, HOST, function(err, bytes) {
//     if (err) throw err;
//     console.log('UDP message send to' + HOST +':'+ PORT);
// });

setInterval(()=>{
    client.send(CN, 0, CN.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message send to' + HOST +':'+ PORT);
    });
}, 20000);

client.on('message',function(msg,rinfo){
    const getInfo = JSON.parse(msg.toString())
    if (getInfo.cmd == 'uDB') {
        client.send(DBS, 0, DBS.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP message send to' + HOST + ":" + PORT);
        });
    }
    //const cloin = JSON.parse(msg.toString());
    if (getInfo.cmd == "cLs") {
        client.send(CLO, 0, CLO.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP message send to' + HOST + ":" + PORT);
        });
    }
    //const maoin = JSON.parse(msg.toString());
    if (getInfo.cmd == "mAs") {
        client.send(MAO, 0, MAO.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP message send to' + HOST + ":" + PORT);
        });
    }
    if(getInfo.cmd == "GG")
    {
        console.log(getInfo.cmd);
    }
});
