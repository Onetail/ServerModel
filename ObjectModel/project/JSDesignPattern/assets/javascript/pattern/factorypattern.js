/*
建立相似的obj進行重複性動作
提供建立obj方式
*/
var colorType = {
    "red":()=>{return redColor()},
    "yellow": ()=>{return yellowColor()},
    "blue":()=>{return blueColor()}
}
var redColor = ()=>
{
    var elt = objectCreate("div","red")
    elt.style.color="red"
}
var yellowColor = ()=>
{
    var elt = objectCreate("div","yellow")
    elt.style.color="yellow"
}
var blueColor = ()=>
{
    var elt = objectCreate("div","blue")
    elt.style.color="blue"
}
var useFactory = ()=>
{
    colorType.red()
    colorType.yellow()
    colorType.blue()
}