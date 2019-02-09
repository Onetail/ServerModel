const fs = require("fs")
const path = require("path")
const message = require(path.join(__dirname,"../../../../Assets/message/MessageActivity"))
const global = require(path.join(__dirname,"../../../../Assets/global/Global"))

var locateGetarray = [];
var locatePostarray = [];

module.exports = {
    exec:(locate)=>
    {        
        var list = fs.readdirSync(locate)
        list.forEach(function(i)
        {
            if(!module.exports.isPostFile(i.toLowerCase()))
            {
                // when isFile do save in array
                fs.statSync(locate+"/"+i).isFile() ? locateGetarray.push(locate+"/"+i) : module.exports.exec(locate+"/"+i)
            }else{locatePostarray.push(locate+"/"+i)}
        })
    },
    isPostFile: (str)=>
    {
        for(var i=0 , max = global.POSTFILEENDWITH.length;i<max;i++)
        {if(str.endsWith(global.POSTFILEENDWITH[i]))return true}
        return false 
    },

    getLocate:()=>{return locateGetarray} ,
    postLocate:()=>{return locatePostarray},
    clsLocate: ()=>{
        locateGetarray.length = 0
        locatePostarray.length = 0
    }
}