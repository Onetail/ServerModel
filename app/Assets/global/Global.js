module.exports = {
    Server: {
        SERVERHTTPPORT : 8501 ,
        SERVERHTTPSPORT : 443,
        SERVERADDRESS : "/project",
        SERVERLOCALE : "/ObjectModel",
        SERVERABSOLUTEPOSITION : "../../../.."
    },
    
    POSTFILEENDWITH : ["action.js","action.html","action.htm","action",".DS_Store"], // file name endwiths for post feature
    INDEXFILE : "index.html",
    
    Database: {
        DATABASEIP : "127.0.0.1",
        DATABASEUSER : "root" , 
        DATABASEPASSWORD : "",
        MYSQLDATABASENAME : "ServerModel",
        MONGOPORT : 27017,
    },
}