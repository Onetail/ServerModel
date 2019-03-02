const app = require('express')();
// const https = require('https')
const http = require("http").createServer(app)
const fs = require("fs")
const url = require("./htmlcomposing")
const global = require("./Global")

// FILEDATA = ""   //..python string
// HTMLDATA = ""  //..web string  

IMAGESARRAY = ["title.png","background.png","backgrounddark.png","login.png","close.png","searchbar.png"] //  圖片array
FILEARRAY = [] ;  // to get 'Package' for know how many file to save

(()=>    // init fs and array
{
    // var keyPath = __dirname + '/.ssl/private.key';
    // var certPath = __dirname + '/.ssl/certificate.crt';
    
    // var hskey = fs.readFileSync(keyPath);
    // var hscert = fs.readFileSync(certPath);
    
    // var options = {
    //     key: hskey,
    //     cert: hscert
    // };
    for(var i = 1 ; i <=25;i++)
    {
        IMAGESARRAY.push(i+".jpg")
    }
    gEtfiledata()
    hTmlurlset()
})()
function gEtfiledata()
{
    FILEARRAY = []  // init
    fs.readFile("../../data/Package","utf-8",(err,data)=>
    {
        if(err) throw err 
        data = data.split(" ")
        for(var i = 0,max = data.length-1 ; i<max;i++){FILEARRAY.push(data[i])}
        fIleurlset()
    })
    url.cOmposing()
}
function hTmlurlset()
{
    var cssfile = ["index.css","indexsmall.css"]
    var javascriptfile = ["feature.js","Global.js","control.js","loginmethod.js"]
    //  put html , css , js file 
    app.get('/', (req, res)=>
    {
        
        gEtfiledata()
        res.setHeader('Content-Type', 'text/html');
        res.send(HTMLDATA)
        res.end()
           
    });
    app.post("/pydata",(req,res)=>
    {
        res.send(FILEDATA)
    })
    app.post("/classimage",(req,res)=>
    {
        res.send(IMAGESARRAY)   
    })
    //  import rwd
    
    for(let i = 0 ,max = cssfile.length; i<max ; i++)
    {
        app.get("/assets/css/"+cssfile[i],(req,res)=>
        {
            res.sendFile(cssfile[i],{root:"../css/"})
        })  
    }
    for(let i = 0 , max = javascriptfile.length; i < max ; i++)
    {
        app.get("/assets/javascript/" + javascriptfile[i],(req,res)=>
        {
            res.sendFile(javascriptfile[i],{root:"../javascript/"})
        })    
    }
    
    for(let i = 0,max=IMAGESARRAY.length;i<max;i++)
    {
        app.get("/assets/images/"+IMAGESARRAY[i],(req,res)=>
        {
            res.sendFile(IMAGESARRAY[i],{root:'../../assets/images'})
        })
    }
    
}
function fIleurlset()
{
    // sync
    app.get("/data/Package",(req,res)=>
    {
        fs.readFile("../../data/Package","utf-8",(err,data)=>
        {
            if(err) throw err
            FILEARRAY.length = 0
            datasplit = data.split(" ")
            console.log("這是 utf8 = " + data)
            for(var i = 0,max = datasplit.length-1 ; i<max;i++)
            {
                FILEARRAY.push(datasplit[i])
                console.log("[+加入陣列 ] "+ datasplit[i])
            }                
            console.log("[+] 陣列內容" + FILEARRAY)
            data = data.substring(0,data.length-1)
            //  put save data to post
            for(let i =0,max = FILEARRAY.length;i<max;i++)
            {
              // fs.readFile("../../data/"+FILEARRAY[i],"utf-8",(err,data)=>
             // {
                //     if(err) throw err
                //     app.post("/data/"+encodeURIComponent(FILEARRAY[i]),(req,res)=>
                //     {
                //         res.send(data)
                //     })
                // })
        
                // sync   
                app.get("/data/"+encodeURIComponent(FILEARRAY[i]),(reqq,ress)=>
                {
                    fs.readFile("../../data/"+FILEARRAY[i],"utf-8",(err,filedata)=>
                    {
                        ress.send(filedata)
                        console.log(filedata)
                    })
                })
            }
            res.send(data)
        })
    
    })
    

    // fs.readFile("../../data/Package","utf-8",(err,data)=>
    // {
    //     if(err) throw err 
    //     data = data.substring(0,data.length-1)
    //     app.post("/data/Package",(req,res)=>
    //     {
    //         res.send(data)
    //     })

    // })
}
//指定port
// var server = https.createServer(options, App).listen(3000,function()
// {
// 	console.log("listening on 3000....");
// });
http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000' );
}); 