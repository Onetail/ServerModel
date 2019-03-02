const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/chatroom.html');
});

var user_count = 0;
var user_list = [];	// user list of all

//當新的使用者連接進來的時候
io.on('connection', function(socket){
	user_count = user_list.length;
	//新user
	socket.on('add user',function(msg){
		socket.username = msg;
		console.log("new user:"+msg+" logged.");
		socket.broadcast.emit('add user',{
			username: socket.username
		});
		user_list.push(socket.username);
		io.emit('user count',++user_count);
		io.emit('user list',user_list);
		// io.emit('count',user_list);
	});
		
	//監聽新訊息事件
	socket.on('chat message', function(msg){

		console.log(socket.username+":"+msg);

  		//發佈新訊息
		io.emit('chat message', {
			username:socket.username,
			msg:msg
		});
	});

	//left
	socket.on('disconnect',function(){
		console.log(socket.username+" left.");
		// 清除記錄暫定
		for(i = 0;i<user_list.length;i++)
		{
			if(user_list[i] === socket.username)
			{
				user_list.splice(i,1);
				break;
			}
		}
		io.emit('user count',--user_count);
		io.emit('user list',user_list);
		io.emit('user left',{
			username:socket.username
		});

	});


});

//指定port
http.listen(process.env.PORT || 80, function(){
	console.log('listening on *:80');
});