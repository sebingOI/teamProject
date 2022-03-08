var PORT = 9000;
var HOST = '127.0.0.1';
var dgram = require('dgram');
var CS = JSON.stringify({ cmd: "CS", id: "acc" });
var DBS = JSON.stringify({ cmd: "DBs", nick: "kk" })
var CLO = JSON.stringify({ cmd: "cLo", nick: "kk" })
var MAO = JSON.stringify({ cmd: "mAo", mID: "11" })
var CC = JSON.stringify({cmd: "CC", id: "acc", cla: 1, pAtt: 1, pmHP: 10});
var CN = JSON.stringify({ cmd: "CN", nick: "kk", CNt: 20});
var MOVE = JSON.stringify({ cmd: "move", nick: "kk", Lx: 441.45, Ly: 456.7845, Lz: 930.156, Rz:122, act: 61});

var client = dgram.createSocket('udp4');

client.send(CN, 0, CN.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message send to ' + HOST +':'+ PORT);
});

setInterval(()=>{
    client.send(CN, 0, CN.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message send to ' + HOST +':'+ PORT);
    });
}, 20000);

client.send(CS, 0, CS.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message send to ' + HOST +':'+ PORT);
});

setTimeout(()=>{
    client.send(MOVE, 0, MOVE.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message send to ' + HOST +':'+ PORT);
    });
}, 1000)


client.on('message',function(msg,rinfo){
    //console.log(JSON.parse(msg.toString()));
    const msgIN = JSON.parse(msg.toString())
    if (msgIN.cmd == 'CC') {
        client.send(CC, 0, CC.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            //console.log('UDP message send to' + HOST + ":" + PORT);
        });
    }
    //const udbin = JSON.parse(msg.toString())
    if (msgIN.cmd == 'uDB') {
        client.send(DBS, 0, DBS.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            //console.log('UDP message send to' + HOST + ":" + PORT);
        });
    }
    //const cloin = JSON.parse(msg.toString());
    if (msgIN.cmd == "cLs") {
        client.send(CLO, 0, CLO.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            //console.log('UDP message send to' + HOST + ":" + PORT);
        });
    }
    //const maoin = JSON.parse(msg.toString());
    if (msgIN.cmd == "mAs") {
        client.send(MAO, 0, MAO.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            //console.log('UDP message send to' + HOST + ":" + PORT);
        });
    }

    if(msgIN.cmd == "move")
    {
        console.log(msgIN);
    }
});

// client.on('message',function(msg,rinfo){
//     console.log(JSON.parse(msg.toString()));
// })

// client.send(UDB, 0, UDB.length, PORT, HOST, function(err, bytes) {
//     if (err) throw err;
//     console.log('UDP message send to' + HOST +':'+ PORT);
//     // console.log()
//     // client.close();
// });

// client.send(CLS, 0, UDB.length, PORT, HOST, function(err, bytes) {
//     if (err) throw err;
//     console.log('UDP message send to' + HOST +':'+ PORT);
//     // console.log()
//     // client.close();
// });

// client.send(MAS, 0, UDB.length, PORT, HOST, function(err, bytes) {
//     if (err) throw err;
//     console.log('UDP message send to' + HOST +':'+ PORT);
//     // console.log()
//     // client.close();
// });

// var UDB = JSON.stringify({cmd:"uDB",  nick: "asdf", Lx: "5435", Ly: "213", Lz: "3454", Rz: "9809", cla: "1", lv: "1", pExp: "8", act: "31"});
// var CLS = JSON.stringify({cmd:"cLs",  nick: "asdf", Lx: "5435", Ly: "213", Lz: "3454", Rz: "9809", cla: "1", lv: "1", pExp: "8", act: "31"});
// const MAS = JSON.stringify({cmd: "mAs", mID: "11", mcHP: "100", cLx: "-2400", cLy: "-9510", cLz: "-111.6", cRz: "90", mAct: "101", mRT: "10000"})