
module.exports = {
    exec:(val,msg)=>
    {
        switch(val)
        {
            case 1:
                console.log("\x1b[32m",`Listening in ${msg} port .`)
                break;
            case 2:
                console.log("\x1b[32m",`Success connect to Database ${msg}`)
                break;
            case 3:
                console.log("\x1b[32m",`Success connect socket.io ${msg} module`)
        }
        console.log("\x1b[0m","")   // reset color
    }
}