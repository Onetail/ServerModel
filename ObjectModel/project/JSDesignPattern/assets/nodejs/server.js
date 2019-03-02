const app = require('express')();
const http = require("http").createServer(app)
SERVERPORT = 8501
URLARRAY = ["javascript/menulist.js","javascript/pattern/commandpattern.js","javascript/pattern/factorypattern.js","javascript/pattern/singlepattern.js","javascript/pattern/strategypattern.js","css/index.css","images/title.jpg"];

(()=>
{
    app.get("/javascript_designpattern/index.html",(req,res)=>
    {
        res.setHeader('Content-Type', 'text/html');
        res.sendFile("index.html",{root:"../../"})
    })

    for(let i=0,max=URLARRAY.length;i<max;i++)
    {
        
        app.get("/javascript_designpattern/assets/"+URLARRAY[i],(req,res)=>
        {
            res.sendFile(URLARRAY[i],{root:__dirname+"/../"})
        })
    }
})()

http.listen(process.env.PORT || SERVERPORT, function(){
	console.log('listening on *:' + SERVERPORT );
}); 