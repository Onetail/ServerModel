//  web init model 
const fs = require("fs")
module.exports= 
{
    cOmposing: ()=>
    {
        fs.readFile("../../index.html",'utf-8',(err,data)=>
        {
            if (err) throw err 
            HTMLDATA = data
            // res.sendFile("index.html" , {root:'../../'})
            fs.readFile("../../data/data.txt",'utf-8',(err,data)=>
            {
                if(err) throw err
                FILEDATA = data
                HTMLDATA += data
                fs.readFile("../../bottomlayout.html","utf-8",(err,data)=>
                {
                    HTMLDATA += data 
                })
            })
            
        })
    } 
}
