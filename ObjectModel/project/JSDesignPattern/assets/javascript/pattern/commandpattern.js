// 命令對象 , client , 取用者 invoker , receiver

var menuType = {
    "addElement": (element)=>{return new addElement(element)},
    "build":(element,html,id="test")=>{return new buildElement(element,html,id="test")}
}

function addElement(element){
    this.element = element;
    this.times = 0
    this.old = []
}
addElement.prototype.execute = function()
{
    this.old.push(this.element.style.left)
    this.times += 1
    this.element.style.left = 10 * this.times 

}
addElement.prototype.undo = function()
{
    if(this.times===0)return
    this.times -= 1
    this.element.style.left =  this.old.pop()   
}
function buildElement(element,html,id="test")
{
    this.obj = null
    this.element = element
    this.html =html
    this.id = id
}
buildElement.prototype.execute = function(){this.obj = objectCreate(this.element,this.html,this.id)}
buildElement.prototype.getObject = function(){return this.obj}
buildElement.prototype.onClick = function(eltevent,type)
{
    this.obj.className="btnstyle"
    this.obj.style.fontSize = "20px"
    this.obj.style.background="#000f11"
    this.obj.style.color="#aabb11"
    this.obj.style.border = "solid #aaffFF"
    if(type==="execute") this.obj.onclick = ()=>{eltevent.execute()}
    else if(type==="undo") this.obj.onclick = ()=>{eltevent.undo()}
}

var useCommand = ()=>
{
    // 對象
    var bt1 = menuType.build("button","execute")
    var bt2 = menuType.build("button","undo")
    var obj = menuType.build("span","o","commandtest")
    // client
    bt1.execute()
    bt2.execute()
    obj.execute()
    // 取用
    var addelt = menuType.addElement(obj.getObject())
    // 接收
    bt1.onClick(addelt,"execute")
    bt2.onClick(addelt,"undo")
}