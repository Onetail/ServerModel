function pOinterbackgroundmenutype(element,menu){}
pOinterbackgroundmenutype.prototype.bAckpointer = (element,menu)=>
{
    $("#centerframe").click(()=>
    {
      MENUTYPE = 0 
      $(element).css("opacity","0.5")
      $(menu).hide(SPEEDTIME)  
    })
}
pOinterbackgroundmenutype.prototype.hIde = (element,menu)=>
{
    MENUTYPE = 0
    $(element).css("opacity","0.5")
    $(menu).hide(SPEEDTIME)
}
pOinterbackgroundmenutype.prototype.sHow = (element,menu,number)=>
{
    $(menu).show(SPEEDTIME)
    $(element).css("opacity","1")   
    MENUTYPE = number
}
pOinterbackgroundmenutype.prototype.iNit = ()=>
{
    $("div.menudata").hide(SPEEDTIME)
    $("div.menuclass").hide(SPEEDTIME)
    $("div.menuthree").hide(SPEEDTIME)
    $('div#detailbtn').css("opacity","0.5")
    $('div#classbtn').css("opacity","0.5")
    $('div#anybtn').css("opacity","0.5")
}

// cookies 

function sEtupcookies(cookiename = "onetailuser",value = "",days = "")
{
    var time = new Date()
    time.setTime(time.getTime()+ days*24*60*60*1000) // 5天過期   
    days == "" ? document.cookie = cookiename + "="+escape(value) + ";exoures="+ time.toGMTString() : document.cookie = cookiename + "="+escape(value) + ";"
}
function gEtcookies(cookiename = "")
{
    var read = decodeURIComponent(document.cookie),
        i = 0,
        max;
    read = read.split(";")
    cookiename == ""?(()=>
    {
        for(i = 1,max = read.length;i<max;i++)
        {
            if(read[i].charAt(0)== ' ')read[i] = read[i].substring(1)
            console.log(read[i])
        }
    })():(()=>
    {
        for(i= 1,max = read.length;i<max;i++)
        {
            if(read[i].charAt(0)== ' ')read[i] = read[i].substring(1)
            if(read[i].split("=")[0] == cookiename)console.log(read[i])
        }
    })()
}
function dElcookies(cookiename)
{
    document.cookie = cookiename +"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}
