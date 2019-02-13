
var CURRENT_PROCESS_PAGE = 0    //  this control this screen page

//  作品button
$('#collections').click(function()
{
    CURRENT_PROCESS_PAGE = 1 

    $("#UI_design").fadeOut(300,()=>
    {
        Works_UI()    
        Btn_Features()
    })
});

//  new element in body
function Works_UI()
{
    var Works = document.createElement("div")
    var Back_btn = document.createElement("div")
    Works.id = "Works"
    Back_btn.id = "Back_btn"
    document.getElementById("main_div").appendChild(Works)

    var Works_Element = document.createElement("div")
    var APP_works = document.createElement("div")
    var WEB_works = document.createElement("div")
    var SOFTWARE_works = document.createElement("div")
    Works_Element.id = "Works_Element"
    APP_works.id = "APP_works"
    WEB_works.id = "WEB_works"
    SOFTWARE_works.id = "SOFTWARE_works"
    document.getElementById("Works").appendChild(Works_Element)
    document.getElementById("Works_Element").appendChild(WEB_works)
    document.getElementById("Works_Element").appendChild(APP_works)
    document.getElementById("Works_Element").appendChild(SOFTWARE_works)
    document.getElementById("Works").appendChild(Back_btn)
}
//  picture three app web and software feature
async function Btn_Features()
{
    var work_pic_frame,Works_Element_Control = 1;

    document.getElementById("APP_works").innerHTML = "<img class='worksimg' src='statics/images/apppic.jpg' style='cursor: pointer;'></img>"
    document.getElementById("WEB_works").innerHTML = "<img class='worksimg' src='statics/images/webpic.jpg' style='cursor: pointer;'></img>"
    document.getElementById("SOFTWARE_works").innerHTML = "<img class='worksimg' src='statics/images/softwarepic.jpg' style='cursor: pointer;'></img>"
    document.getElementById("Back_btn").innerHTML = "<div id='Backbtn' style='cursor:pointer;position:fixed'>返回</div>"

    async function build_element(type)
    {
        work_pic_frame = document.createElement("div")
        work_pic_frame.id = "work_pic_frame"
        document.getElementById(type+"_works").appendChild(work_pic_frame)
        document.getElementById("work_pic_frame").innerHTML = await KWCworks(type)
        for(let i = 0;i<Image_information_list.length;i++)
        {
            // document.getElementById("frame"+i).onmouseover= function()
            // {
            //     console.log(Image_information_list[i].getDetail)
            // }
            //  第一次呼叫此 listener
            $("div#frame"+i).click(()=>
            {
                CURRENT_PROCESS_PAGE =3
                scaletoFullScreen(i)
            })
        }
        await $("html,body").stop(true).animate({scrollTop:"+=500%"},"fast")
        Works_Element_Control =2;
    }

    await $("#APP_works").click(async ()=>
    {
        if(Works_Element_Control==1)CURRENT_PROCESS_PAGE = 2
        //  APP
        await $("#WEB_works,#SOFTWARE_works").hide(300,()=>{(Works_Element_Control == 1)?build_element("APP"):Works_Element_Control = 2})
    })

    await $("#WEB_works").click(async ()=>
    {
        if(Works_Element_Control==1)CURRENT_PROCESS_PAGE = 2
        //  WEB
        await $("#APP_works,#SOFTWARE_works").hide(300,()=>{(Works_Element_Control == 1)?build_element("WEB"):Works_Element_Control = 2})
    })
    await $("#SOFTWARE_works").click(async () =>
    {
        if(Works_Element_Control==1)CURRENT_PROCESS_PAGE = 2
        //  software
        await $("#WEB_works,#APP_works").hide(300,()=>{(Works_Element_Control == 1)?build_element("SOFTWARE"):Works_Element_Control = 2})

    })
    await $("#Back_btn").click(()=>
    {
        if(CURRENT_PROCESS_PAGE == 1)
        {
            $("#APP_works,#WEB_wroks,#SOFTWARE_works,#Back_btn").remove();
            $("#Works").remove()
            $("#UI_design").fadeIn(500);
        }else if(CURRENT_PROCESS_PAGE==2)
        {
            $("html, body").animate({scrollTop:"0"},"fast")
            $("#work_pic_frame").fadeOut(300,()=>{$("#work_pic_frame").remove()})
            $("#WEB_works,#SOFTWARE_works,#APP_works").show(100)
            Works_Element_Control = 1
        }else if(CURRENT_PROCESS_PAGE==3)
        {
            $("#works_screen_picture").fadeOut(300,()=>{$("#works_screen_picture").remove()})
            $("#works_screen_title").fadeOut(300,()=>{$("#works_screen_title").remove()})
            $("#works_screen_detail").fadeOut(300,()=>
                {
                    $("#works_screen_detail").remove()
                    $('table').show(300,()=>
                    {
                        for(let i= 0;i<Image_information_list.length;i++)
                        {
                            //  之後使用此listener
                            $("#frame"+i).click(()=>
                            {
                                CURRENT_PROCESS_PAGE =3
                                scaletoFullScreen(i)
                            })
                        }
                    })
                    
                })
        }
        if(CURRENT_PROCESS_PAGE > 0)CURRENT_PROCESS_PAGE -= 1;
    })

}



//  show KWC works  
async function KWCworks(type=None,string = "",domain = document.location.href)
{
     // APP add method
    if(type == "APP")string+= await sendtoKWCworks_APP()
    //  WEB add method
    else if(type == "WEB")string+=await sendtoKWCworks_WEB()
    //  Software add method
    else if(type == "SOFTWARE")string +=await sendtoKWCworks_SOFTWARE()

    //  call studio detail
    string += "<br>"

    return string
}


//  image full screen event
function scaletoFullScreen(number,bg="")
{
    //  change pointer image size and word's family
    $("table").hide(300,()=>
    {
        document.getElementById("work_pic_frame").innerHTML += "<div id='works_screen_title'>"+Image_information_list[number].getIntroduction+"</div>"
        document.getElementById("work_pic_frame").innerHTML += "<img id='works_screen_picture' src='"+Image_information_list[number].getImg+"'></img>"
        document.getElementById("work_pic_frame").innerHTML += "<div id='works_screen_detail'>"+Image_information_list[number].getDetail+"</div>"
    })
    
}