Image_information_list = new Array()

async function getProjectNumber(type = "app" , img = "statics/images/SOFTWARE/software_requestsbug.png"){
	var array,receive;
	await $.get(`./get_portfolio?type=${type}`,  (data)=>{
		receive = JSON.parse(data)
		array = receive
		for(let i = 0 , max = array.length; i < max ; i++){
			
			array[i] = new Studio_detail(img = img,
				introduction = receive[i].title,
				detail = receive[i].info,
				tools = receive[i].tools,
				workTimes = receive[i].worktime)
			

		}
	})
	return array
}

async function sendtoKWCworks_APP(string="")
{
	Image_information_list.length = 0
	Image_information_list = await getProjectNumber(type="app")
	
	
	string += await Draw_table()
	
	return string
}
async function sendtoKWCworks_WEB(string = "")
{

	Image_information_list.length = 0
	Image_information_list = await getProjectNumber(type="web")
	
	string += Draw_table()
	return string
}
async function sendtoKWCworks_SOFTWARE(string= "")
{

	Image_information_list.length = 0
	// getLocationHref("SOFTWARE")
	Image_information_list = await getProjectNumber(type="software")
	// Image_information_list[0] = new Studio_detail('statics/images/SOFTWARE/software_requestsbug.png')
	// Image_information_list[1] = new Studio_detail('statics/images/SOFTWARE/1.png')
	// Image_information_list[0].getIntroduction = "爬取蘋果新聞TOP30"
	// Image_information_list[0].getDetail = "利用python每日爬取蘋果新聞前30條"
    string += Draw_table()

	return string

}
//	draw table to works appear 
function Draw_table(string="")
{
	string += "<table >"
	for(let i = 0, max = Image_information_list.length ;i<max;i++)
	{
		if(i%4==0)string+="<tr>"
		string+= "<td><div id='frame"+i+"' class='works_img_frame'><img id='img"+i+"' src='"+Image_information_list[i].getImg+"' class='works_img'></img>"
		string +="<div id='intro"+i+"' style='font-size:32'>"+Image_information_list[i].getIntroduction
		string += "" ? Image_information_list[i].getDetail === "" : "</div><div id='detail"+i+"' class='detailclass' style='font-family: Arial;font-size:18;'>"+Image_information_list[i].getDetail+"</div>"		
		string+= "</div></td>"
		if(i%4==3)string+="</tr>"
	}
	string += "</table>"
	return string
}

