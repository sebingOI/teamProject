const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
const arr = [];
socket.bind(9000);

function Cs(cmd, id, Ipaddress, port, pos) {
    this.cmd = cmd;
    this.id = id;
    this.Ipaddress = Ipaddress;
    this.port = port;
    this.pos = pos;
}

socket.on('listening', function() {
    console.log('listening event');
});

let str;

socket.on('message', function(msg, rinfo) {
    str = JSON.parse(msg.toString());
    let cs = new Cs(str.cmd, str.id, rinfo.address, rinfo.port, str.pos);
    if (cs.cmd == "CS") {
        socket.send(cmd, id, Ipaddress, port, 
            function(err) {
                if (err) {
                    console.log('메세지 전송 실패');
                    return;
                }
            }
        );
        console.log('메세지 전송 성공');
    }
})