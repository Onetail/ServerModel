const Express = require('express');
const App = Express();
const mysql = require('mysql');
const fs = require('fs');
const bodyparser = require('body-parser');
const path = require('path');
const http = require('http').Server(App);
const io = require('socket.io')(http);
var out_filename = "./device/"
var times = new Date();
//db info
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ajgedbaa',
    database: 'image_site'
});

//try to connect to portfolio
connection.connect(function(err) {
    if(err) {
        console.log('error when connecting to db:', err);
        // 2秒後重新連線
        setTimeout(handleDisconnect, 2000);
	}
	console.log("db connect successful!");
    });


App.use(bodyparser());
App.use('/staitcs',Express.static('statics'));
//get portfolio
App.get('/get_portfolio',function(req,res){
	var portfolio=[];
	var type = req.query.type;
	connection.query('SELECT * FROM portfolio WHERE type=\''+type+'\';',function(error, results, fields){
    if(error){
        throw error;
    }
	if(results.length>0){
  	for(i=0;i<results.length;i++){
    portfolio.push({
        id:results[i].sn,
        title:results[i].title,
        info:results[i].info,
        worktime:results[i].worktime,
        tools:results[i].tools,
        type:results[i].type,
		image_url:results[i].img_url
    	});
  	}
    var json_obj=JSON.stringify(portfolio);
    res.send(json_obj);
	}
});
});

App.post('/update_delete',function(req,res){
	var post_id=req.body.id;
	var sql = "DELETE FROM portfolio WHERE sn = "+post_id;
  	connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
	
  });
});

App.post('/update',function(req,res){
	var post_id=req.body.id;
	var post_title=req.body.title;
	var post_info=req.body.info;
	var post_worktime=req.body.worktime;
	var post_tools=req.body.tools;
	var post_type=req.body.type;
	var post_imgurl=req.body.image_url;

	var data={
		title:post_title,
		info:post_info,
		worktime:post_worktime,
		tools:post_tools,
		type:post_type,
		image_url:post_imgurl
	}


	if(post_id=="new"){
		connection.query('INSERT INTO `portfolio` SET ?', data, function(error){
            if(error){
            console.log('write db fail！');
            throw error;
            }
            else{
				console.log("success write db to portfolio\n");
				console.log(data);
				connection.query('SELECT * FROM portfolio WHERE title=\''+post_title+"\';",function(error, result, fields){
    			if(error){
        			throw error;
   	 			}
				if(result[0]){
					send_data={
						id:result[0].sn,
						title:result[0].title,
						info:result[0].info,
						worktime:result[0].worktime,
						tools:result[0].tools,
						type:result[0].type,
						image_url:result[0].image_url
					}
					var obj=JSON.stringify(send_data);
					res.send(obj);
					console.log(send_data);
					//res.redirect('/login');
				}
				else{
					console.log("select error");
				}
    
				});
			}
                
        });
	}
	if(Number.isInteger(parseInt(post_id))){
		connection.query('UPDATE `portfolio` SET ? WHERE sn = '+parseInt(post_id), data, function(error){
            if(error){
            console.log('write db fail！');
            throw error;
            }
            else{
				console.log("success update db to portfolio\n");
				console.log(data);
				connection.query('SELECT * FROM portfolio WHERE title=\''+post_title+"\';",function(error, result, fields){
    			if(error){
        			throw error;
   	 			}
				if(result[0]){
					send_data={
						id:result[0].sn,
						title:result[0].title,
						info:result[0].info,
						worktime:result[0].worktime,
						tools:result[0].tools,
						type:result[0].type,
						image_url:result[0].image_url
					}
					var obj=JSON.stringify(send_data);
					res.send(obj);
					console.log(send_data);
					//res.redirect('/login');
				}
				else{
					console.log("select error");
				}
    
				});
			}
                
        });
	}

	//console.log(data);
});

App.get('/',function(req,res){
	res.sendFile(__dirname+"/index.html");
});

App.get('/workdetail',function(req,res){
	res.sendFile(__dirname+"/workdetail.html");
});

App.get('/works',function(req,res){
	var post_id=req.query.ID;
	console.log("ok");
	console.log(post_id.toString());
	if(Number.isInteger(parseInt(post_id))){
	connection.query('SELECT * FROM portfolio WHERE sn='+post_id+';',function(error, result, fields){
    if(error){
        throw error;
		console.log('database wrong');
		res.send('database wrong');
    }
	else{
 		console.log(result[0]); 
		if(result[0]){
		var portfolio={
			id:result[0].sn,
			title:result[0].title,
        	info:result[0].info,
        	worktime:result[0].worktime,
			tools:result[0].tools,
			type:result[0].type,
			image_url:result[0].image_url
		}
	var json_obj=JSON.stringify(portfolio);
    res.send(json_obj);

	}

	else{
		res.send(post_id+"portfolio not found");
	}
	}
});
	}
	else{
		console.log(typeof post_id);
		console.log("i need ID");
		res.send("give me ID plz");
	}
});

App.post('/login',function(req,res){
	var username = req.body.username;
	var inputpassword = req.body.password;
	console.log("username : "+ username);
	console.log("passwd : "+inputpassword);
	connection.query('SELECT password FROM account WHERE username=\''+username+"\';",function(error, result, fields){
    if(error){
        throw error;
    }
    console.log(result[0]); 
	if(result[0]){
		if(inputpassword==result[0].password){
        	res.sendFile(__dirname+"/back.html");
    }
    	else{
      		res.redirect('/test/?id=login_fail');
    }

	}
	else{
		res.redirect('/test/?id=login_fail');
	}
    
});
});

App.get('/login_test',function(req,res){
	res.sendFile(__dirname+"/logintest.html");
});

App.get('/portfolio_controller',function(req,res){
	res.sendFile(__dirname+"/index.html");
});

App.get('/static/css/homepage.css',function(req,res)
{
	res.sendFile(__dirname+"/static/css/homepage.css");
});
App.get('/statics/css/admin.css',(req,res)=>
{
	res.sendFile(__dirname+"/statics/css/admin.css")
})
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

http.listen(8888,function()
{
	console.log("listening on 8888....");
});
