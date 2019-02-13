class Studio_detail
{
	constructor(img,introduction,detail="",tools = "",workTimes = "")
	{
		this.getImg = img
		this.getIntroduction = introduction
		this.getDetail = detail 
		this.getTools = tools
		this.getWorkTimes = workTimes
	}
	static allcontent(image)
	{
		var string = ""
		string += "[" + image.getImg +","+images.getIntroducion
		string += "" ? images.getDetail === "" : "," + images.getDetail
		string += "" ? images.getTools === "" : "," + images.getTools
		string += "" ? images.getWorkTimes === "" : "," + images.getWorkTimes
		string += "]"
		return string
	}
}