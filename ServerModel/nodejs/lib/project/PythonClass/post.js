const fs = require("fs")
const path = require("path")
module.exports = {
    exec: (app,global)=> module.exports.Atdomain(app,global),
    Atdomain:(app,global)=>{
        var FILEDATA = "",//..python string
            HTMLDATA = "",
            IMAGESARRAY = ["title.png","background.png","backgrounddark.png","login.png","close.png","searchbar.png"], //  圖片array
            FILEARRAY = [] ;  // to get 'Package' for know how many file to save

        (()=>    // init fs and array
        {
            
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
            // fs.readFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/../Assets/global/")+"/global.Server.js","utf-8",(err,data)=>{
            //     if(err)throw err 
            //     console.log("success " + data)
            // })
            fs.readFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/.."+global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/data/") + "Package","utf-8",(err,data)=>
            {
                if(err) throw err 
                data = data.split(" ")
                for(var i = 0,max = data.length-1 ; i<max;i++){FILEARRAY.push(data[i])}
                fIleurlset()
            })
            module.exports.cOmposing(global)
        }
        function hTmlurlset()
        {
            var cssfile = ["index.css","indexsmall.css"]
            var javascriptfile = ["feature.js","global.Server.js","control.js","loginmethod.js"]
            //  put html , css , js file 
            app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/", (req, res)=>
            {

                gEtfiledata()
                res.setHeader('Content-Type', 'text/html');
                res.send(HTMLDATA)
                res.end()

            });
            app.post(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/pydata",(req,res)=>
            {
                res.send(FILEDATA)
            })
            app.post(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/classimage",(req,res)=>
            {
                res.send(IMAGESARRAY)   
            })
            //  import rwd

            for(let i = 0 ,max = cssfile.length; i<max ; i++)
            {
                app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/assets/css/"+cssfile[i],(req,res)=>
                {
                    res.sendFile(cssfile[i],{root:"../css/"})
                })  
            }
            for(let i = 0 , max = javascriptfile.length; i < max ; i++)
            {
                app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/assets/javascript/" + javascriptfile[i],(req,res)=>
                {
                    res.sendFile(javascriptfile[i],{root:"../javascript/"})
                })    
            }

            for(let i = 0,max=IMAGESARRAY.length;i<max;i++)
            {
                app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/assets/images/"+IMAGESARRAY[i],(req,res)=>
                {
                    res.sendFile(IMAGESARRAY[i],{root:'../../assets/images'})
                })
            }

        }
        function fIleurlset()
        {
            // sync
            app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/data/Package",(req,res)=>
            {
                fs.readFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/.."+global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/data/")+"Package","utf-8",(err,data)=>
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
                        app.get(global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/data/"+encodeURIComponent(FILEARRAY[i]),(reqq,ress)=>
                        {
                            fs.readFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/.."+global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/data/")+FILEARRAY[i],"utf-8",(err,filedata)=>
                            {
                                ress.send(filedata)
                                console.log(filedata)
                            })
                        })
                    }
                    res.send(data)
                })
            
            })
        }
    },
    cOmposing: (global)=>
    {
        fs.readFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/.."+global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/")+ "index.html" ,'utf-8',(err,data)=>
        {
            if (err) throw err 
            HTMLDATA = data
            // res.sendFile("index.html" , {root:'../../'})
            fs.readFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/.."+global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/data/")+ "data.txt",'utf-8',(err,data)=>
            {
                if(err) throw err
                FILEDATA = data
                HTMLDATA += data
                fs.readFile(path.join(__dirname,global.Server.SERVERABSOLUTEPOSITION+"/.."+global.Server.SERVERLOCALE+global.Server.SERVERADDRESS+"/class_for_python/")+ "bottomlayout.html","utf-8",(err,data)=>
                {
                    HTMLDATA += data 
                })
            })
            
        })
    } 
}