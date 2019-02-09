module.exports = {
    exec:(val,msg)=>
    {
        switch(val)
        {
            case 1:
                console.error("\x1b[41m",`user can't connect to ${msg} .`)
                break;
            case 2:
                console.error("\x1b[41m",`Database connect error msg: ${msg}`)
                break;
        }
        console.log("\x1b[0m","")   // reset color
    }
}