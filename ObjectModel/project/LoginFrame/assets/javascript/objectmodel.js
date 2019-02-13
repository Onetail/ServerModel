((window)=>
{
    document.getElementById("insert").onclick = (e)=>
    {
        actionFrame()
    }

})()
function actionFrame()
{
    var hash = new hashCode(),
        act,
        pwd

    hash.setValue()  // add salt 
    hash.setString($("#account").val())
    act = hash.useHash()
    hash.clearArray()
    hash.setString($("#password").val())
    pwd = hash.useHash()
    $.post("./action.html",
    {
        act:act,
        pwd:pwd,
        salt:hash.getValue()
    },(data)=>{
        console.log(data)
    })
    
    // $("#loginform").submit()
}
function objectCreate(elmtype,elmid,content)
{
    var obj = document.creinsertent(elmtype)
    obj.id=elmid
    obj.innerHTML=content
    document.getElementById("loginframe").appendChild(obj)
    return obj
}



