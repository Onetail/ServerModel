// 定義一系列算法，依序封裝，並且使它們可以相互替換

var clientManage = (()=>{
     return { 
        "name":(name,element="")=>{return clientName(name,element)},
        "value":(value,element="")=>{return clientValue(value,element)}
     }
})()

var clientName = (name,element="")=>
{
    return element==="" ?objectCreate(element="div",html=name):objectCreate(element=element,html=name)
}
var clientValue = (value,element="")=>
{
    return element==="" ?objectCreate(element="span",html=value): objectCreate(element=element,html = name)
}

var strategy = (()=>
{
    return {
        "onclick":(element)=>{element.onclick = ()=>{alert(element)}},
        "color":(element,color)=>{element.style.color=color},
        "size":(element,size)=>{element.style.fontSize=size}
    }
})()

var useStrategy = ()=>
{
    var run = clientManage.name("Test1")
    run = strategy.size(run,"30px")

    run = clientManage.value("sa")
    run = strategy.color(run,"#111bcc")

    run = clientManage.name("我是按鈕!","button")
    run = strategy.onclick(run)
    return run   
}