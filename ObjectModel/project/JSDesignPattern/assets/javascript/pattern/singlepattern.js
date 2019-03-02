// 保證一個類別只有一個實例，並提供global save
// single pattern
var useSingleton = (()=>
{
    var instance 
    function createInstance()
    {
        var obj = objectCreate("div","singleton")
        return obj
    }
    return ()=>{
            if(typeof(instance)==="undefined") instance = createInstance()
            return instance 
        }
        
    
})()

