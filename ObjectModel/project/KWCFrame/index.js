const Express = require('express');
const App = Express();
const fs = require('fs');
const http = require('http').Server(App);
const io = require('socket.io')(http);
var out_filename = "./device/"
var times = new Date();

App.get('/',function(req,res){
	res.sendFile(__dirname+"/index.html");
});
App.get('/static/css/homepage.css',function(req,res)
{
	res.sendFile(__dirname+"/static/css/homepage.css");
});
App.get('/statics/css/workspage.css',(req,res)=>
{
	res.sendFile(__dirname+"/statics/css/workspage.css")
})
App.get('/statics/js/backstage.js',(req,res)=>{res.sendFile(__dirname+"/statics/js/backstage.js")})
App.get("/statics/js/KWCworks.js",(req,res)=>{res.sendFile(__dirname+"/statics/js/KWCworks.js")})
App.get("/statics/js/method.js",(req,res)=>{res.sendFile(__dirname+"/statics/js/method.js")})
App.get('/static/images/background.JPG',function(req,res)
{
	res.sendFile(__dirname+"/static/images/background.JPG");
});

//App.use(Express.static("./"))

io.on('connection',function(socket)
{
	socket.on('send',function(msg)
	{
		times = new Date()
		msg = times.getFullYear()+"/"+(times.getMonth()+1)+"/"+times.getDate()+" "+times.getHours()+":"+times.getMinutes()+":"+times.getSeconds()+"\n\n" +msg
		msg = "\n--------------------------\n"+msg
		msg = msg + "\n--------------------------\n"
		
		fs.writeFile(out_filename+times.getFullYear()+"-"+(times.getMonth()+1)+"-"+times.getDate()+";"+times.getHours()+":"+times.getMinutes()+":"+times.getSeconds()+".txt",msg+"\n",function(err)
		{
			if(err)
			{
				socket.emit("response","ERROR");
				return console.log(err);
			}
			socket.emit("response","OK");
			console.log("File save!");
			console.log(msg);
		});
		//times++;
	})
});
io.on('disconnection',function(socket)
{
	socket.on('left',function()
	{
		console.log('bye bye');
	}
	);
});

http.listen(8501,function()
{
	console.log("listening on 8501....");
});
