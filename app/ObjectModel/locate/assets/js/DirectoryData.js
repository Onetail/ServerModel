(()=>
{
    $.post("/ObjectModel/Package",(data)=>
    {
        data.forEach(element => {
            let elt = ObjectCreate("div",element.data,element.data)
            document.getElementById(elt.id).onclick = ()=>
            {
                var url = location.href
                if(!url.endsWith("/"))url+="/"   // linux and windows location.href unsample 
                element.data.endsWith(".html") ? location.assign(element.data):location.assign(url +element.data+"/index.html")
            }
        });
    })
})()
    
function ObjectCreate(type,id,html)
{
    var elt = document.createElement(type)
    elt.id = id 
    elt.setAttribute("class","menulist")
    document.getElementById("menu").appendChild(elt)
    document.getElementById(id).innerHTML = html
    return elt
}