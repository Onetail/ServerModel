function hashCode()
{
    this.string = ""
    this.value = null
    this.array = []
}
hashCode.prototype.useHash = function()
{
    var i,
        max
    for(i = 0,max=this.string.length;i < max;i++)
    {
        this.array.push(this.string.charCodeAt(i)-this.value)
    }
    
    return this.array.join()
}
hashCode.prototype.clearArray = function(){this.array.length = 0}
hashCode.prototype.reHash = function()
{
    var i,
        max
    for(i = 0 , max = this.string.length; i < max ; i ++)
    {
        this.array[i] = String.fromCharCode(this.array[i]+this.value)
    }
    return this.array.join("")
}
hashCode.prototype.setString = function(string){this.string=string}
hashCode.prototype.getString = function(){return this.string}
hashCode.prototype.setValue = function(){this.value = Math.floor(Math.random()*100)}
hashCode.prototype.getValue = function(){return this.value}
// var useLogincheck = ((value)=>
// {
//     var value = value
        
//     hash = new hashCode(value)
//     gethash = hash.useHash()
//     console.log(gethash)
//     return hash.array.join()
// })