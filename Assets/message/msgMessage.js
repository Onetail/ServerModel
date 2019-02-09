module.exports = {
    exec:(val,msg)=>
    {
        switch(val)
        {
            case 1:
                console.log(`Listening in ${msg} port .`)
                break;
            case "test":
                console.log(`${val} = [ ${msg} ]`)
                break;
            case "obj":
                console.log(msg)
                break;
            case "run":
                console.log('\x1b[36m%s\x1b[0m',`${msg}`)
                console.log("\x1b[0m","")
                break;
            case "remind":
                console.log('\x1b[33m%s\x1b[1m',` ${msg}`)
                console.log("\x1b[0m","")
                break;
                
        }
        // process.stdout.write("\x1b[0m");
    }
}