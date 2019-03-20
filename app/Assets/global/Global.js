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
        MYSQLDATABASEIP : process.env.MYSQL_HOST || "127.0.0.1" ,
        MONGODATABASEIP : process.env.MONGO_HOST || "127.0.0.1" ,
        DATABASEUSER : "root" , 
        DATABASEPASSWORD : process.env.MYSQL_ROOT_PASSWORD  || "root",
        MYSQLDATABASENAME : "ServerModel",
        MONGOPORT : 27017,
    },
}