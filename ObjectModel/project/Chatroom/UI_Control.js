Main_Action;
	Main_Action = new function()
	{
		// __init__
		init_Build();


	}
	function init_Build()
	{
		// build frame 
		var top_frame = document.createElement("div");
		var left_frame = document.createElement("span")
		var center_frame = document.createElement("span");
		var right_frame = document.createElement("span");
		var bottom_frame = document.createElement("div");

		// frame set id
		top_frame.id = "top_frame";
		left_frame.id = "left_frame";
		center_frame.id = "center_frame";
		right_frame.id = "right_frame";
		bottom_frame.id = "bottom_frame";

		// append body
		document.body.appendChild(top_frame);
		document.body.appendChild(left_frame);
		document.body.appendChild(center_frame);
		document.body.appendChild(right_frame);
		document.body.appendChild(bottom_frame);

		// UI
		UI_Control();

	}
	function UI_Control()
	{
		document.getElementById("top_frame").innerHTML="<img src='img1.png'><br><hr></hr>";
	}