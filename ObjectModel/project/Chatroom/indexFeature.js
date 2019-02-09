
// TODO: enum for feature button 
var FeatureEnum = {
    DEFAULT : 0,
    AUTHOR_ABOUT : 3
}

function UiOnClickListener(type = DEFAULT){
    console.log(`enum = ${type}`)
    switch(type){
        case FeatureEnum.AUTHOR_ABOUT:
            console.log("enter")
            // $(document).ready(function() {
                $('.loginbtn').click(()=>{
                    $('.loginbg').fadeIn(0);
                    $('.loginpage').fadeIn(0);
                })
                $('.login_disappear').click(()=>{
                    $('.loginbg').fadeOut(0);
                    $('.loginpage').fadeOut(0);
                })
            // })
        break;

        default:
                console.log(type)
                
        
    }
    
}