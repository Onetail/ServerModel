import sys
import re
import assets.python.Global as Global
import assets.python.factory as ft 
import assets.python.model as md
import assets.python.filesystem as fs

class Main:
	def __init__(self):
		#   build a linkedlist 
		#   aDd for new a node 
		#   oUtput for see list
		#   uPdate for update node value 
		#   dElete for delete node 
		if len(sys.argv) < 2:
			self.uSage()
		else:
			test = fs.Test()
			model = md.Model()
			if sys.argv[1][1:].strip().upper() == "MODEL":
				if len(sys.argv) >= 3:
					#	for some type doing some thing
					if sys.argv[2][:].strip().upper() == "BUILD":
							pass
					else:
							ipcheck = sys.argv[2].strip().upper()
							ipcheck = re.findall(r"[0-9]+",ipcheck)
							outputip = "" # save ip
							if len(ipcheck) == 4:
								# True ip check 
								for i in range(len(ipcheck)):
									# Check if number > 255 ip 
									if int(ipcheck[i]) > 255:
										# err
										self.eRror(2)
										return 
									else:
										# true
										continue
								if len(sys.argv) == 4: # other server type
									if sys.argv[3].strip().upper() == "AMAZON":
										outputip = "ec2-{:}.ap-northeast-1.compute.amazonaws.com".format('-'.join(ipcheck))
										Global.SERVERIP = outputip
										self.sUccess(1,detail = outputip)
									else:
										self.eRror(4)
										return
								else:
									outputip = '.'.join(ipcheck)
									Global.SERVERIP = outputip
									self.sUccess(1,detail = outputip)
							else:
								# Error ip check
								self.eRror(3)
								return 
							model.mOdelenvironment(ft)	#	normal running type
				else:
						model.mOdelenvironment(ft)	#	normal running type

			elif sys.argv[1][1:].strip().upper() == "OPENURL":
				if len(sys.argv)== 3:
					test.oPensystem(sys.argv[2])
				else:
					self.eRror(1)
			elif sys.argv[1][1:].strip().upper() == "MAKE":
					test.mAkedir()
			else:
				self.uSage()
			# test.mAkedir()

	def uSage(self):
		#	help message
		string =  "\n\t -model\t\t: for use list to control data\t"
		string += "\n\t -openurl\t: for open url brower\t"
		string += "\n\t -make\t\t: build a new dir || overwrite 'data' dir "
		string += "\n"
		return print(string)
	
	def eRror(self,type,detail=""):
		#	error message
		switch = {
			1: lambda: "\n\t[Error] Value is not enough\t\n",
			2: lambda: "\n\t[Error] Enter ip is error \n",
			3: lambda: "\n\t[Error] Ip need more value \n",
			4: lambda: "\n\t[Error] not have this server model \n",
		}
		return print(switch.get(type)())

	def sUccess(self,type,detail =""):
		switch = {
			1: lambda: "\n\t[Success] ip address : {:10} \t\n".format(detail),
		}
		return print(switch.get(type)())
		