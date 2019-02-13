import assets.python.Global as Global

class Style:
	def fIlestyle(self,data="",savefile="",color="#ffaacc",fontsize="36px"):
		with open(Global.ADDRESS+"/"+savefile,"r",encoding = "utf-8") as fopen:
			data = fopen.read()
		dataline = data.split("\n")
		with open(Global.ADDRESS+"/"+savefile,"w+",encoding = "utf-8") as fopen:
			fopen.write("<div class='scrollbar'><div id='centerframe'>")
			fopen.write("<div style='color:"+color+";font-size:"+fontsize+"'><pre>")
			fopen.write("\n"+data) if dataline[0] != "" else fopen.write(data)

	def rEmovestyle(self,data="",savefile=""):
		with open(Global.ADDRESS+"/"+savefile,"r",encoding="utf-8") as fopen:
			data = fopen.read()
		data = data.split("\n")
		# print(data[0][:3])
		if data[0][:4]=="<div":
			del data[0] 
			with open(Global.ADDRESS + "/" +savefile,"w+",encoding="utf-8") as fopen:
				for i in range(len(data)):
					fopen.write("\n"+data[i]) if len(data)!=0 else fopen.write(data[i])
			return True 
		return False

	def sTyleexist(self,savefile =""): # doing write model first check the styleexist is True/False
		data = ""
		with open(Global.ADDRESS+"/"+savefile,"r",encoding = "utf-8") as fopen:
			data = fopen.read()
		dataline = data.split("\n")
		if dataline[0][:4] == "<div":
			return True
		else:
			return False