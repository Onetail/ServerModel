import os 
import assets.python.Global as Global
import random
import assets.python.filestyle as fstyle
import assets.python.server.interact as interact

class Test:
	def rAndom(self,number = 10,type="normal"):
		number_list = [chr(random.randint(0,128)) for i in range(number)] if type == "normal" else [random.randint(0,999) for i in range(number)]
		return number_list

	def oPensystem(self,url = ""):
		#   start 'url' in command line
		data = os.system("start " + url) if url != "" else None
		return  data

	def sAvefile(self,data="",savefile="data.txt",type="w",pack = True,style="scroll"):	# if model == write pack == false save == true
		if savefile =="":	#	if save = ' ' is error
			savefile = "data.txt"
		if savefile != "Package":
			fs = fstyle.Style()
			if style.upper() == "MODEL1":
				fs.fIlestyle(savefile=savefile,color="#ffaa39",fontsize="48px")
				
			elif style.upper() == "MODEL2":
				fs.fIlestyle(savefile=savefile,color="#fdda19",fontsize="44px")

			elif style.upper()=="SCROLL":		
				with open(Global.ADDRESS+"/"+savefile,type,encoding = "utf-8") as fopen:
					fopen.write("\n"+data) if data != "" else fopen.write(data)
			else:
				print("\n\tNot have this save mode\n")

			if savefile != "data.txt" and pack == True:
				self.sAvepackagedata(savefile=savefile)
				
			return False
		else:
			return True

	def rEadfile(self,readfile="data.txt",type="r",model="normal"):
		if readfile=="":
			readfile = "data.txt"
		with open(Global.ADDRESS+"/"+readfile,type,encoding="utf=8") as fopen:
			data = fopen.read()
			if model != "normal":
				datasize = data.split('\n')
				response = datasize[len(datasize)-1] if datasize[len(datasize)-1]!='' else "此行無資料"
				with open(Global.ADDRESS+"/"+readfile,"w+",encoding="utf-8") as f:
					for i in range(len(datasize)-1):
						f.write(datasize[i]+"\n") if i != len(datasize)-2 else f.write(datasize[i])
				return response
		datasplit = data.split("\n")
		data = ""
		for i in range(len(datasplit)):
			data += ">  "+datasplit[i]+"\n" if i != len(datasplit)-1 else ">  "+datasplit[i]
		return data
			

	def mAkedir(self):
		#   try 'data' is exist? if yes do remove else if no do build
		if os.path.exists(Global.ADDRESS):
			self.rEmovedir()
		else:
			print("\nBuild "+Global.ADDRESS+" Dir")
			os.makedirs(".\\"+Global.ADDRESS)

	def rEmovedir(self,address = os.getcwd()+'\\data'):	
		#   remove dir 'data'
		command = "rmdir %s /s /q"
		command = command % address
		result = os.system(command)
		if result == 0:
			print("\n已刪除: "+os.getcwd()+"\\data\n***********************************")
		else:
			print("\nWARN:刪除失敗\n***********************************")

	def sAvepackagedata(self,savefile=""):
		# deal with Package problem repeat filename and space list
		if not os.path.exists(Global.ADDRESS+"/Package"):	#	if package not exists run
			with open(Global.ADDRESS +"/Package","w",encoding="utf-8") as fopen:
				fopen.write("")
		
		""" old model """
		# if filename is repeat , do overwrite else add in Package
		# with open(Global.ADDRESS+"/Package","r",encoding="utf-8") as f:
		# 	Packagedata = f.read()
		# 	Packagedata = Packagedata.split(" ")
		# 	for i in range(len(Packagedata)):
		# 		if Packagedata[i] == savefile:
		# 			#repeat ! 
		# 			del Packagedata[i]
		# 			break
		# 	# remove list more space
		# 	Packagedata.remove('')
		# 	with open(Global.ADDRESS+"/Package","w+",encoding="utf-8") as f:
		# 		for i in range(len(Packagedata)):
		# 			f.write(Packagedata[i]+" ")
		# with open(Global.ADDRESS+"/Package","a+",encoding="utf-8") as fopen:
		# 	fopen.write(savefile+" ")		
		self.cHeckpackagelist()
	def uPloadtoserver(self,file = Global.ADDRESS):
		self.cHeckpackagelist()
		try:
			# ssh start
			conn = interact.Connect() 
			# sftp start 
			conn.sFtpconnect()		

			serverfile = conn.sFtplistdir()
			localfile = os.listdir(file)
			for i in range(len(serverfile)):
				conn.sFtpremove(file=serverfile[i])

			for i in range(len(localfile)):
				conn.sFtpput(file=localfile[i])
			conn.sFtpclose()
			conn.sShclose()
		except:
			return False
		return True

	def eXeccommandtoserver(self,command=""):
		# try:
		conn = interact.Connect()
			# conn.sShexeccommand(command="cd "+Global.SERVERADDRESS +"/assets/javascript && ls ")
		conn.sShexeccommand(command=command)
		conn.sShclose()
		# except:
			# return False
		
		return True
	def rEmovestyle(self,savefile=""):
		return fstyle.Style().rEmovestyle(savefile=savefile)

	def sTyleexist(self,savefile=""):	# doing write model first check the styleexist is True/False
		return fstyle.Style().sTyleexist(savefile=savefile)
	
	def cHeckpackagelist(self):
		# update Package list
		string = ""
		for addr,dire,file in os.walk(Global.ADDRESS):
			for i in range(len(file)):
				string += file[i]+" " if file[i]!="Package" and file[i] !="data.txt" else ""
		with open(Global.ADDRESS+"/Package","w+",encoding="utf-8") as fopen:
			fopen.write(string)
		return self
	def lIstdir(self,type="-N"):
		string = ""
		for i in os.listdir(Global.ADDRESS):
			switch = {
				"-N":lambda: " {:}".format(i),
				"-L":lambda: "\n {:}".format(i)
			}
			string += switch.get(type)()
		
		return string 