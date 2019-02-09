var KKname;
var KKrace;
function Game_slot_process()
{

	$('#about_btn').fadeOut(500);
	$('#start_btn').fadeOut(500,function()
	{
		Game_Hero_Name();
	})
}
function Game_Hero_Name()
{
	document.getElementById("center_screen").innerHTML = "<p style='font-size:32px;font-family:Cursive;' id='title'>你的名子</p>";
	document.getElementById("center_screen").innerHTML+="<input type='text' class='textstyle' id='kkname'>";
	$('#kkname').keydown((event)=>
	{
		if(event.which == 13)
		{
			if($('#kkname').val() == "")document.getElementById("title").innerHTML ="輸入名子好嗎?";
			else
			{
				document.getElementById("left_hidden").innerHTML="名子: " +$('#kkname').val();
				KKname = $('#kkname').val();
				Game_Hero_Race();
			}
		}
	});
}
function Game_Hero_Race()
{
	var Race_String_List = ["人類","精靈","獸人","龍"];
	document.getElementById("center_screen").innerHTML= "<p style='font-size:32px;font-family:Cursive;' id='title'>選擇種族</p>";
	document.getElementById("center_screen").innerHTML +="<span style='font-size:22px;font-family:monospace;'><form name='form_race' id='form_race'>";
	document.getElementById('center_screen').innerHTML +="<input type='radio' id='radio1' name='racebtn' value='人族'>人族";
	document.getElementById("center_screen").innerHTML +="<input type='radio' id='radio2' name='racebtn' value='精靈'>精靈";
	document.getElementById("center_screen").innerHTML +="<input type='radio' id='radio3' name='racebtn' value='獸人'>獸人";
	document.getElementById("center_screen").innerHTML +="<span id='radio4' style='display:none;'><input type='radio' name='racebtn' value='龍族'>龍族</span>";
	document.getElementById('center_screen').innerHTML +="</form></span>";

	var race_build = document.createElement("div");
	race_build.id='race_build';
	document.body.appendChild(race_build);
	$('#radio4').after(race_build);
	$('#race_build').hide();
	for(let i =0;i<Race_String_List.length;i++)
	{
		$('#radio'+(i+1)).click(function()
		{
			$('#race_build').fadeIn(300,()=>
			{
				document.getElementById('race_build').innerHTML=Race_String_List[i];
				document.getElementById('race_build').innerHTML+="<br><div class='btnstyle' style='background:#599abc;border-radius: 10%;margin-top:1%;margin-left:35%;'>確定</div>";
				$('.btnstyle').click(function()
				{
					document.getElementById('center_screen').innerHTML = "";
					document.getElementById('left_hidden').innerHTML+="<div>種族: "+Race_String_List[i]+"</div>";
					Game_Personality_Choose();
				});
			});
		});
	}
}	
function Game_Personality_Choose()
{
	document.getElementById('center_screen').innerHTML = "製作中請稍後~~";
}