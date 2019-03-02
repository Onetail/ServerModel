(()=>
{
    $("img#loginicon").click(()=>
    {
        $("div#loginframe").fadeIn(SPEEDTIME)
    })
})()
function dEtailimages()
{
    tEstfunction()  //  !!  for test function 

    var stringhtml = ""
    $.post("/classimage",(data)=>
    {
        for(let i = 6,max = data.length ; i < max ; i++)
        {
            stringhtml += "<img class='classimage' src=/assets/images/"+data[i]+"></img>"
            stringhtml += "<br>"
        }
        $("table#maintable").html(stringhtml)
    })
}
function cLasssearch()
{
    $("#maintable").html("")    //..clean data
    var ajaxdata = ""
    $.ajax(
        {
            type: "GET",
            url: "/data/Package",
            success: (data)=>
            {
               ajaxdata = data 
            },
            async:false
        })
        
    ajaxdata = ajaxdata.split(" ")
    for(let i in ajaxdata)
    {
        console.log(ajaxdata[i])
        let alldata = document.createElement("div")
        alldata.id = "alldata"+ajaxdata[i]
        alldata.className = "Btnstyle"
        $("#maintable").append(alldata)
        $("div#alldata"+ajaxdata[i]).text(ajaxdata[i])
        $("div#alldata"+ajaxdata[i]).css(
            {
                "color":"#aadd11",
                "background":"#112233",
                "width":"100%",
                "margin":"10px"
            })
        $("div#alldata"+ajaxdata[i]).click(()=> //..onclick Package data's filename
        {
            dArkscreendetail(ajaxdata[i])
        })
    }
}
function dArkscreendetail(detail)
{
    var screendata = ""
    var darkbackground = document.createElement("div")
    darkbackground.id = "darkbackground"
    $.ajax(
        {
            type: "GET",
            url: "/data/"+detail.toString(),
            success: (data)=>
            {
                screendata = data 
            },
            async:false
        })
    console.log(screendata)
    $(darkbackground).html(screendata)
    $("#maintable").append(darkbackground)
    $("div#bg").fadeIn(SPEEDTIME,()=>
    {
        $("div#bg").click(()=>
        {
            $(darkbackground).remove() 
            $("div#bg").fadeOut(SPEEDTIME)   
        })
    })
    
}

function tEstfunction()
{
    // i am test for example     by Admin 
    ((cAlla) =>
    {
        var isfunction = true,
            i = 0,
            max = 100
        if(typeof cAlla === "function") isfunction = true
        else isfunction = false

        for(i;i<max;i++)
        {
            if(isfunction)
            {
                console.log(cAlla(i))
            }
        }
    })()
    
    //  for example to try new feature 
    function cAlla(a)
    {
        
        a = a + 100 
        return a 
    }
}