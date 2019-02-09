const global = require("../global/Global")
const message = require("../message/MessageActivity")

var value = "";
module.exports = {
    exec : (connection,mysql)=>
    {
        try{
            connection = module.exports.init(mysql)
            module.exports.connect(connection)
            message.success(2,global.Database.MYSQLDATABASENAME)
        }catch(err){
            message.error(2,err)   
        }  
        return connection
    },
    init : (mysql)=>
    {
        return mysql.createConnection({
            host: global.Database.DATABASEIP,
            user: global.Database.DATABASEUSER,
            password : global.Database.DATABASEPASSWORD,
            database : global.Database.MYSQLDATABASENAME
        })
    },
    connect : (connection)=>{connection.connect((err)=>{if(err) throw err })},
    getValue : ()=>{ return value;},
    setValue : (connection)=>{ value = connection;}
}