var express = require('express');
var app = express()
var serv = require('http').Server(app);
var io = require('socket.io')(serv,{});

app.get('/',function(req,res){
    res.sendFile(__dirname + '/client/index.html');
   // res.sendFile(__dirname + '/client/up.png');
});
app.use('/cilent',express.static(__dirname + '/client'));
serv.listen(8080);
console.log("server listen on 3000");

var userList = {};
var tankList = {};
var bulletList = [];
var barrel = 20;
var safeZone = 100;
var worldX = 1000;
var worldY = 500;
var tankSize=20;
var bulletSize=3;

var Tank = function(ID){
    this.speaktime=new Date().getTime();
    this.name="noob";
    this.ID=ID;
    this.hp=10;
    this.die=false;
    this.point=0;
    this.safe=true;
    this.color=getRandomColor();
    this.x=Math.floor((safeZone-tankSize)*Math.random())+worldX-safeZone;
    this.y=Math.floor((safeZone-tankSize)*Math.random())+worldY-safeZone;
    this.barrelX=this.x;
    this.barrelY=this.y;
    this.mouseX=this.x;
    this.mouseY=this.y;
    this.height=tankSize;
    this.width=tankSize;
    this.moveUp=false;
    this.moveDown=false;
    this.moveLeft=false;
    this.moveRight=false;
    this.shoot=false;
    this.speed=8;
    this.msg=" ";
}
Tank.prototype.getID = function(){return this.ID;}
Tank.prototype.getName = function(){return this.name;}
Tank.prototype.getMsg = function(){return this.msg};
Tank.prototype.getDie = function(){return this.die;}
Tank.prototype.getColor = function(){return this.color;}
Tank.prototype.Speak = function(when){this.speaktime=when};
Tank.prototype.getSpeak = function(){return this.speaktime};
Tank.prototype.getX = function(){return this.x;}
Tank.prototype.getY = function(){return this.y;}
Tank.prototype.getHP = function(){return this.hp;}
Tank.prototype.getPoint = function(){return this.point;}
Tank.prototype.getBarrelX = function(){return this.barrelX;}
Tank.prototype.getBarrelY = function(){return this.barrelY;}
Tank.prototype.getMouseX = function(){return this.mouseX;}
Tank.prototype.getMouseY = function(){return this.mouseY;}
Tank.prototype.getHeight = function(){return this.height;}
Tank.prototype.getWidth = function(){return this.width;}
Tank.prototype.getMoveUp = function(){return this.moveUp;}
Tank.prototype.getMoveDown = function(){return this.moveDown;}
Tank.prototype.getMoveLeft = function(){return this.moveLeft;}
Tank.prototype.getMoveRight = function(){return this.moveRight;}
Tank.prototype.getShoot = function(){return this.shoot;}
Tank.prototype.getSpeed = function(){return this.speed;}
Tank.prototype.getSafe = function(){return this.safe;}
Tank.prototype.goUp = function(){if(0<this.y){this.y-=this.speed;}}
Tank.prototype.setMsg = function(msg){this.msg = msg};
Tank.prototype.setName = function(name){this.name=name;}
Tank.prototype.isShoot = function(shoot){this.shoot=shoot};
Tank.prototype.goDown = function(){
    if(this.y<480){
        if(this.safe==true){
            this.y+=this.speed;}
        else if(this.safe==false  && this.x+tankSize<worldX-safeZone || this.y+tankSize<worldY-safeZone){
            this.y+=this.speed;
        }
    }

}
Tank.prototype.goLeft = function(){if(this.x>0){this.x-=this.speed;}}
Tank.prototype.goRight = function(){
        if(this.x<980){
        if(this.safe==true){
            this.x+=this.speed;}
        else if(this.safe==false && this.x+tankSize<worldX-safeZone || this.y+tankSize<worldY-safeZone){
            this.x+=this.speed;
        }
    }
}
Tank.prototype.setDie = function(die){this.die=die;}
Tank.prototype.setMoveUp = function(state){this.moveUp=state;}
Tank.prototype.setShoot = function(state){this.shoot=state;}
Tank.prototype.setMoveDown = function(state){this.moveDown=state;}
Tank.prototype.setMoveLeft = function(state){this.moveLeft=state;}
Tank.prototype.setMoveRight = function(state){this.moveRight=state;}
Tank.prototype.notSafe = function(){
    this.safe=false;
}
Tank.prototype.setBullets = function(bullet){this.bullets=bullet;}
Tank.prototype.setBarrelXY = function(x,y){
    this.barrelX=x;
    this.barrelY=y;
}
Tank.prototype.setMouseXY = function(x,y){
    this.mouseX=x;
    this.mouseY=y;
}
Tank.prototype.kill = function(){
    this.point+=1;
}
Tank.prototype.hurt = function(){
    this.hp--;
}
Tank.prototype.usePoint = function(use){
    this.point-=use;
}
Tank.prototype.health = function(){
    this.hp=10;
}


var Bullet = function(owner,x,y,spd,yspd){
    this.owner=owner;
    this.x=x;
    this.y=y;
    this.height=3;
    this.width=3;
    this.color="#FF0000";
    this.speed=spd;
    this.yspeed=yspd;
}
Bullet.prototype.getX = function(){return this.x;}
Bullet.prototype.getY = function(){return this.y;}
Bullet.prototype.getOwner = function(){return this.owner;}
Bullet.prototype.getSpdX = function(){return this.speed;}
Bullet.prototype.getSpdY = function(){return this.yspeed;}
Bullet.prototype.getHeight = function(){return this.height;}
Bullet.prototype.getWidth = function(){return this.width;}
Bullet.prototype.getColor = function(){return this.color;}
Bullet.prototype.setSpeed = function(sx,sy){
    this.speed=sx;
    this.yspeed=sy;
}
Bullet.prototype.fly=function(){
    this.x=this.x+this.speed;
    this.y=this.y+this.yspeed;
}

function updateBullet(){
    for(var i=0; i<bulletList.length; i++){
        if(bulletList[i].getX()>worldX || bulletList[i].getX()<0 || bulletList[i].getY()>worldY || bulletList[i].getY()<0 || ((bulletList[i].getX()+bulletList[i].getSpdX()/2>(worldX-safeZone)) && bulletList[i].getY()+bulletList[i].getSpdY()/2>(worldY-safeZone))){
            bulletList.splice(i,1);
        }
        else{
            bulletList[i].fly();
            for(var j in tankList){
                if(tankList[j].getSafe()==false && tankList[j].getDie()==false && bulletList[i].getX()+bulletSize/2<tankList[j].getX()+tankSize && bulletList[i].getX()+bulletSize/2>tankList[j].getX() && bulletList[i].getY()+bulletSize/2<tankList[j].getY()+tankSize && bulletList[i].getY()+bulletSize/2>tankList[j].getY()){
                    tankList[j].hurt();
                    if(tankList[j].getHP()<=0 && tankList[j].getDie()==false){
                        tankList[bulletList[i].getOwner()].kill();
                        var socket = userList[tankList[bulletList[i].getOwner()].getID()];
                        socket.emit('yourPoint',{point:tankList[bulletList[i].getOwner()].getPoint()});
                        console.log(tankList[bulletList[i].getOwner()].getPoint().toString());
                        tankList[j].setDie(true);
                        tankList[j].isShoot(false);
                    }
                    bulletList.splice(i,1);
                    break;
                }
            }
        }

    }
}
function updatePosition(index){
    var datenow = new Date().getTime();
    if((datenow-tankList[index].getSpeak()) > 3000 && tankList[index].getMsg()!=""){
        tankList[index].setMsg("");
    }
    if(tankList[index].getMoveUp() == true){tankList[index].goUp();}
    if(tankList[index].getMoveDown() == true){tankList[index].goDown();}
    if(tankList[index].getMoveLeft() == true){tankList[index].goLeft();}
    if(tankList[index].getMoveRight() == true){tankList[index].goRight();}  
    if(tankList[index].getX()<(worldX-safeZone) || tankList[index].getY()<(worldY-safeZone)){
        tankList[index].notSafe();
    }
    if(tankList[index].getShoot()==true){
        var addbullet = new Bullet(index, tankList[index].getBarrelX(), tankList[index].getBarrelY(),(tankList[index].getBarrelX()-(tankList[index].getX()+tankList[index].getWidth()/2))*0.5,(tankList[index].getBarrelY()-(tankList[index].getY()+tankList[index].getHeight()/2))*0.5);
        bulletList.push(addbullet);
    }
    var dx=tankList[index].getMouseX()-(tankList[index].getX()+tankList[index].getWidth()/2);
    var dy=-(tankList[index].getMouseY()-(tankList[index].getY()+tankList[index].getHeight()/2));
    var angle=Math.atan2(dy,dx);
    var barrelX=(tankList[index].getX()+tankList[index].getWidth()/2)+barrel*Math.cos(angle);
    var barrelY=(tankList[index].getY()+tankList[index].getHeight()/2)-barrel*Math.sin(angle);
    tankList[index].setBarrelXY(barrelX,barrelY);

}

io.sockets.on('connection',function(socket){

    userList[socket.id] = socket;
    socket.on("addUser",function(data){
        var tank =new Tank(socket.id);
        tank.setName(data);
        tankList[socket.id] = tank;
        console.log('a user connect , name = '+tank.getName() );
        console.log("id = "+socket.id.toString());
    });


    socket.on('sendMsg',function(data){
        tankList[socket.id].setMsg(encodeURIComponent( data.toString()));
        tankList[socket.id].Speak(new Date().getTime());
        console.log(data);
    });

    socket.on('disconnect',function(){
        delete userList[socket.id];
        delete tankList[socket.id];
    });
    socket.on('mousePosition',function(data){
       // console.log("mouse X = "+data.mouseX+", Y = "+data.mouseY+"/n");
       if(tankList[socket.id]!=undefined){
           var mousex=data.mouseX;
           var mousey=data.mouseY;
           tankList[socket.id].setMouseXY(mousex,mousey);
       }

    });


    socket.on('keyPress',function(data){
        if(data.inputId == 'left'){
            tankList[socket.id].setMoveLeft(data.state);
            if(data.state==true && tankList[socket.id].getMoveRight()==true){
                tankList[socket.id].setMoveRight(false);
            }
        }
        else if(data.inputId == 'up'){
            tankList[socket.id].setMoveUp(data.state);
            if(data.state==true && tankList[socket.id].getMoveDown()==true){
                tankList[socket.id].setMoveDown(false);
           }
        }
        else if(data.inputId == 'right'){
            tankList[socket.id].setMoveRight(data.state);
            if(data.state==true && tankList[socket.id].getMoveLeft()==true){
                tankList[socket.id].setMoveLeft(false);
            }
        }
        else if(data.inputId == 'down'){
            tankList[socket.id].setMoveDown(data.state);
            if(data.state==true && tankList[socket.id].getMoveUp()==true){
                tankList[socket.id].setMoveUp(false);
            }
        }
        else if(data.inputId == "space" && data.state==true){
            if(tankList[socket.id].getDie()==false && tankList[socket.id].getSafe() == false){
            var addbullet = new Bullet(socket.id, tankList[socket.id].getBarrelX(), tankList[socket.id].getBarrelY(),(tankList[socket.id].getBarrelX()-(tankList[socket.id].getX()+tankList[socket.id].getWidth()/2))*0.5,(tankList[socket.id].getBarrelY()-(tankList[socket.id].getY()+tankList[socket.id].getHeight()/2))*0.5);
            bulletList.push(addbullet);
        }
        }
        else if(data.inputId == 'health'){
            if(tankList[socket.id].getPoint()>0){
                var sendsocket=userList[socket.id];
                tankList[socket.id].usePoint(1);
                sendsocket.emit('yourPoint',{point:tankList[socket.id].getPoint()});
                tankList[socket.id].health();
            }
        }
    });

    socket.on('mouseClick',function(data){
        if(tankList[socket.id]!=undefined && tankList[socket.id].getDie()==false && tankList[socket.id].getSafe() == false){
            //tankList[socket.id].isShoot(data.state);
            var addbullet = new Bullet(socket.id, tankList[socket.id].getBarrelX(), tankList[socket.id].getBarrelY(),(tankList[socket.id].getBarrelX()-(tankList[socket.id].getX()+tankList[socket.id].getWidth()/2))*0.5,(tankList[socket.id].getBarrelY()-(tankList[socket.id].getY()+tankList[socket.id].getHeight()/2))*0.5);
            bulletList.push(addbullet);
        }
    });

});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 15)];
    }
    return color;
}


setInterval(function(){
    var pack=[];
    var allBullets=[];
    updateBullet();
    for(var i in tankList){
        updatePosition(i);
        pack.push({
            nickname:tankList[i].getName(),
            name:tankList[i].getID().toString(),
            die:tankList[i].getDie(),
            hp:tankList[i].getHP(),
            color:tankList[i].getColor(),
            x:tankList[i].getX(),
            y:tankList[i].getY(),
            barrelx:tankList[i].getBarrelX(),
            barrely:tankList[i].getBarrelY(),
            msg:tankList[i].getMsg()
        });
    }
    for(var i in userList){
        var socket = userList[i];
        socket.emit('new positions',{tankinfo:pack,bulletinfo:bulletList});
    }
    for(var i in tankList){
        if(tankList[i].getDie()==true){
            var socket = userList[i];
            socket.emit('lose');
        }
    }
},1000/40);
