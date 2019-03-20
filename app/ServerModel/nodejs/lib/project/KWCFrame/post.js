
const mysql = require("mysql")
const Express = require('express');
const path = require("path")
const fs = require("fs")

const global = require("../../../../../Assets/global/Global")
const mdw = require("./middleware/require")

const Project_Name = "KWCFrame"
/*

Create table portfolio ( 
    sn Int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title varchar(30), 
    info varchar(255), 
    worktime varchar(20), 
    tools varchar(30), 
    type varchar(10), 
    image_url varchar(255)  );

 create table account(
    id Int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username varchar(50),
    password varchar(50)
    );
*/ 

module.exports = {

    exec: async (app,socket)=>{
        await module.exports.Middleware(app)
        await module.exports.Atdomain(app,socket)
    },
    Middleware:(app)=>{
        mdw.exec(app,global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name)
    },
    Atdomain:(app,socket)=>
    {
        var times = new Date();
        var io = socket.getValue()
        var out_filename = path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/device/")

        var connection = mysql.createConnection({
            host: global.Database.DATABASEIP,
            user: global.Database.DATABASEUSER,
            password: global.Database.DATABASEPASSWORD,
            database: 'kwc_image_site'
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
        
        
        // app.use(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/staitcs',Express.static('statics'));
        //get portfolio
        app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/get_portfolio',function(req,res){
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
        
        app.post(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/update_delete',function(req,res){
            var post_id=req.body.id;
            var sql = "DELETE FROM portfolio WHERE sn = "+post_id;
              connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
            
          });
        });
        
        app.post(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/update',function(req,res){
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
        
            console.log(data);
        });
        
        // app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/',function(req,res){
        //     res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/index.html");
        // });
        
        app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/workdetail',function(req,res){
            res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/workdetail.html"))
        });
        
        app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/works',function(req,res){
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
        
        app.post(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/login',function(req,res){
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
                    res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/back.html"))
            }
                else{
                      res.redirect(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/test/?id=login_fail');
            }
        
            }
            else{
                res.redirect(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/test/?id=login_fail');
            }
            
        });
        });
        // console.log(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+"/back.html")
        // app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+"/back.html",(req,res)=>{
        //     res.send("****")
        // })
        
        app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/login_test',function(req,res){
            res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/logintest.html"))
        });
        
        app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/portfolio_controller',function(req,res){
            res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/index.html"))
        });
        
        // app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/static/css/homepage.css',function(req,res)
        // {
        //     res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/static/css/homepage.css");
        // });
        // app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/statics/css/admin.css',(req,res)=>
        // {
        //     res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/statics/css/admin.css")
        // })
        // app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/"+Project_Name+'/statics/css/workspage.css',(req,res)=>
        // {
        //     res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/statics/css/workspage.css")
        // })
        // app.get('/statics/js/backstage.js',(req,res)=>{res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/statics/js/backstage.js")})
        // app.get("/statics/js/KWCworks.js",(req,res)=>{res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/statics/js/KWCworks.js")})
        // app.get("/statics/js/method.js",(req,res)=>{res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/statics/js/method.js")})
        // app.get('/static/images/background.JPG',function(req,res)
        // {
        //     res.sendFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../ObjectModel/project/"+Project_Name+"/static/images/background.JPG");
        // });
        
        //app.use(Express.static("./"))
        
        
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
        
    }
}