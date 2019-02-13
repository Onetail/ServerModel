(()=>
{
    var dropDown = (()=>
    {
        document.getElementById("dropdown").classList.toggle("show")
    })
    document.getElementById("pointme").onclick=()=>
    {
        dropDown()
    }
    document.getElementById("clear").onclick=()=>
    {
        clearTestcontent()
    }

    document.getElementById("single").onclick = (()=>{moduleSwitch(type="single")})
    document.getElementById("strategy").onclick= (()=>{moduleSwitch(type="strategy")})
    document.getElementById("command").onclick= (()=>{moduleSwitch(type="command")})
    document.getElementById("factory").onclick= (()=>{moduleSwitch(type="factory")})
    
})()

function objectCreate(element="div",html="obj",id="test")
{
    var content =  document.createElement(element)
    content.id=id
    content.style.position = "relative"
    content.innerHTML=html
    document.getElementById("testframe").appendChild(content)
    
    return content
    
}
function moduleSwitch(type)
{
    var runStatement;
    switch(type)
    {
        case "single":
            runStatement = useSingleton()
            break;
        case "strategy":
            runStatement = useStrategy()
            break;
        case "command":
            runStatement = useCommand()
            break;
        case "factory":
            runStatement = useFactory()
        default:
            return false
    }
    console.log(runStatement)
}
function clearTestcontent()
{   
    // $("#testframe").empty()
    location.reload()   
}