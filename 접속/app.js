const dgram = require('dgram');
const { sequelize, User } = require('./models');
const socket = dgram.createSocket('udp4');
const marr = [{ mID: 1, mcHP: 100, cLx: -2400, cLy: -9510, cLz: -111.6, cRz: 90, mAct: 101, mRT: 10000 },
    { mID: 2, mcHP: 100, cLx: -3580, cLy: -9660, cLz: -168, cRz: 50, mAct: 101, mRT: 10000 },
    { mID: 3, mcHP: 100, cLx: -3160, cLy: -8680, cLz: -168, cRz: 140, mAct: 101, mRT: 10000 },
    { mID: 4, mcHP: 100, cLx: -1960, cLy: -8390, cLz: -168, mAct: 101, mRT: 10000 },
    { mID: 5, mcHP: 100, cLx: -890, cLy: -7140, cLz: 72, cRz: 110, mAct: 101, mRT: 10000 },
    { mID: 6, mcHP: 100, cLx: 2340, cLy: -5660, cLz: -8, cRz: 40, mAct: 101, mRT: 10000 },
    { mID: 7, mcHP: 100, cLx: 310, cLy: -5610, cLz: 42, cRz: 0, mAct: 101, mRT: 10000 },
    { mID: 8, mcHP: 100, cLx: 240, cLy: -3480, cLz: 202, cRz: 190, mAct: 101, mRT: 10000 },
    { mID: 9, mcHP: 100, cLx: 2630, cLy: -4340, cLz: -28, cRz: 100, mAct: 101, mRT: 10000 },
    { mID: 10, mcHP: 100, cLx: 1640, cLy: -1690, cLz: -98, cRz: 230, mAct: 10, mRT: 10000 },
    { mID: 11, mcHP: 100, cLx: 1870, cLy: -250, cLz: 152, cRz: 150, Act: 101, mRT: 10000 },
    { mID: 21, mcHP: 500, cLx: -7210, cLy: -7360, cLz: -98, cRz: 100, mAct: 101, mRT: 30000 },
    { mID: 22, mcHP: 500, cLx: -8070, cLy: 680, cLz:  62, cRz: 30, mAct: 101, mRT: 30000 }];
const charr = [{ nick: "kk", Lx: 453.2335, Ly: 441.21, Lz: 929.193, Rz: 50, cla: 1, pmHP: 100, pcHP: 100, lv: 1, pExp:9 },
    { nick: "pd", Lx: 453.1232, Ly: 440.21, Lz: 920.193, Rz: 50, cla: 2, pmHP: 100, pcHP: 100, lv: 1, pExp:9 },
    { nick: "jj", Lx: 490.1232, Ly: 442.21, Lz: 933.193, Rz: 50, cla: 3, pmHP: 100, pcHP: 100, lv: 1, pExp:9 }];
let cnt = 6;
    socket.bind(9000);

function Cs(cmd, id, Ipaddress, port) {
    this.cmd = cmd;
    this.id = id;
    this.Ipaddress = Ipaddress;
    this.port = port;
}

function Udb(cmd, nick, Lx, Ly, Lz, Ry, cla, lv, pExp, Ipaddress, port) {
    this.cmd = cmd;
    this.nick = nick;
    this.Lx = Lx;
    this.Ly = Ly;
    this.Lz = Lz;
    this.Ry = Ry;
    this.cla = cla;
    this.lv = lv;
    this.pExp = pExp;
    this.Ipaddress = Ipaddress;
    this.port = port;
}

function CLS(cmd, nick, Lx, Ly, Lz, Ry, cla, lv, pExp, Ipaddress, port) {
    this.cmd = cmd;
    this.nick = nick;
    this.Lx = Lx;
    this.Ly = Ly;
    this.Lz = Lz;
    this.Ry = Ry;
    this.cla = cla;
    this.lv = lv;
    this.pExp = pExp;
    this.Ipaddress = Ipaddress;
    this.port = port;
}

function MAS(cmd, mID, mcHP, cLx, cLy, cLz, cRz, mAct, mRT, Ipaddress, port) {
    this.cmd = cmd;
    this.mID = mID;
    this.mcHP = mcHP;
    this.cLx = cLx;
    this.cLy = cLy;
    this.cLz = cLz;
    this.cRz = cRz;
    this.mRT = mRT;
    this.mAct = mAct;
    this.Ipaddress = Ipaddress;
    this.port = port;
}
sequelize.sync()
    .then(() => {
        console.log("DB 연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });

socket.on('listening', function() {
    console.log('listening event');
});

let str;

socket.on('message', function(msg, rinfo) {
    str = JSON.parse(msg.toString());
    console.log(str);
    if (str.cmd == "CS") {
        try {
            const csid = User.findOne({
                attributes: ['id', 'nick', 'Lx', 'Ly', 'Lz', 'Ry', 'cla', 'lv', 'pExp'],
                where: { id: str.id }
            });
            //console.log(csid);
            const message = JSON.stringify({cmd: "uDB", nick: csid.nick, Lx: csid.Lx, Ly: csid.Ly, Lz: csid.Lz, Ry: csid.Ry, cla: csid.cla, lv: csid.lv, pExp: csid.pExp })
            console.log(message);
            let udb = new Udb("uDB", csid.nick, csid.Lx, csid.Ly, csid.Lz, csid.Ry, csid.cla, csid.lv, csid.pExp, rinfo.Ipaddress, rinfo.port);
            socket.send(message, 0, message.length, udb.port, 
                function(err) {
                    if (err) {
                        console.log('메세지 전송 실패');
                        return;
                    }
                }
            );
            console.log('메세지 전송 성공');
        } catch (err) {
            console.error(err);
        }
        // 1초 카운트한 뒤
        //console.log(str);
    } 

    function countTime(cnt)
    {
        if(cnt <= 1)
            clearInterval(cscnt);
        //console.log(cnt);
    }

    let cscnt = setInterval(function() {countTime(cnt--)}, 1000);
    //console.log(cscnt);
     if (str.cmd == "DBs" && cnt > 0) {
        //console.log("vvv");
        clearInterval(cscnt);
        cnt = 6;
        try {
            // 배열 전체 보내야함
            const ms = JSON.stringify({cmd: "cLs", charr: charr })

            console.log(rinfo.port);

            let cls = new CLS("cLs", charr, rinfo.Ipaddress, rinfo.port);
            socket.send(ms, 0, ms.length, rinfo.port, rinfo.Ipaddress, 
                function(err) {
                    if (err) {
                        console.log('메세지 전송 실패');    
                    }
                }
            );
            console.log('메세지 전송 성공');
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log("참여자 배열 로그아웃 처리");
    }
    let clcnt = setInterval(function() {countTime(cnt--)}, 1000);
    clearInterval(clcnt);
     if (str.cmd == "cLo" && clcnt < 0) {
         clearTimeout(clcnt);
         cnt = 6;
        try {
            // 배열 전체 보내야함
            //console.log(csid);
            const message = JSON.stringify({cmd: "mAs", marr: marr})
            let mas = new MAS("mAs", marr, rinfo.Ipaddress, rinfo.port);
            socket.send(message, 0, message.length, mas.port, 
                function(err) {
                    if (err) {
                        console.log('메세지 전송 실패');
                        return;
                    }
                }
            );
            console.log('메세지 전송 성공');
        } catch (err) {
            console.error(err);
        }
     }  else {
        console.log("몬스터 배열 로그아웃 처리");
    }
    //  //mAo는 그냥 카운트해서 오면 접속 끝내고 안올 시 로그아웃 처리
});