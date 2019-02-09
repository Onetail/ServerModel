import assets.python.Global  as Global
# class first upper 
# function second upper
# variable all lower
# global varialbe all upper

class Factory:
        def __init__(self,uid,name="None"):
                self.uid = Global.UID
                self.name = name
                Global.UID += 1
        
        #       to print class value
        def oUtput(self,text=""):
                text += "\t"+str(self.uid)+"\t\n"
                text += "\t"+self.name+"\t\n"
                return print(text)
class ProductA(Factory):
        
        def __init__(self,name,value):
                super(ProductA,self).__init__(name)
                self.name = name
                self.value = value
                ProductA.next = None 
        
        def uPdate(self,name=None,value=None):
                self.name = name #i     f name is None else self.name
                self.value = value  #if value is None else self.value
        
        #       to overwrite print
        def oUtput(self,text=""):
                text+= "\t" +str(self.uid)+"\t\n"
                text+= "\t" +str(self.name)+"\t\n"
                text+= "\t" +str(self.value)+"\t\n"
                return print(text)
        
                

class LinkedList(ProductA):
        def __init__(self,name,value):
                super(LinkedList,self).__init__(name,value)
                self.name = name 
                self.value = value 
                ProductA.first = None 
                ProductA.last = None 
                self.aDd(self.name,self.value)
        
        def aDd(self,name,value):
                newnode = ProductA(name,value)
                if Global.COUNT == 0:
                        ProductA.first = newnode
                else:
                        ProductA.last.next = newnode
                ProductA.last = newnode
                Global.COUNT+=1
        
        def uPdate(self,name,value):
                tmp = ProductA.first 
                while tmp != None:
                        # tmp.value = value  if tmp.name == name else tmp.value
                        if tmp.name == name:
                                tmp.value = value 
                                break
                        tmp = tmp.next

        def dElete(self,name):
                tmp = ProductA.first
                if ProductA.first.name == name: #       head
                        tmp = tmp.next 
                        ProductA.first = tmp 
                elif ProductA.last.name == name:#       tail
                        while tmp.next != ProductA.last:
                                tmp = tmp.next 
                        tmp.next = None 
                        ProductA.last = tmp
                else :
                        while tmp.next!=None:
                                if tmp.next.name == name:
                                        tmp.next = tmp.next.next
                                tmp = tmp.next
                Global.COUNT -=1
        def oUtput(self):
                ProductA.tmp = ProductA.first 
                print("{:}\t{:}\t{:}".format("UID","Name","Value"))
                while ProductA.tmp != None:
                        print("{:}\t{:}\t{:}".format(ProductA.tmp.uid,ProductA.tmp.name,ProductA.tmp.value))
                        ProductA.tmp = ProductA.tmp.next

        def sAvetofile(self):
                string = ""
                ProductA.tmp = ProductA.first 
                # print("{:}\t{:}\t{:}".format("UID","Name","Value"))
                string += "<div class='scrollbar'>"
                string += "<div id='centerframe'>"
                string += "<table id='maintable' border='0' width='300px'>"
                string += "<tr><td>{:}</td><td>{:}</td><td>{:}</td></tr>".format("UID","Name","Value")
                while ProductA.tmp != None:
                        # print("{:}\t{:}\t{:}".format(ProductA.tmp.uid,ProductA.tmp.name,ProductA.tmp.value))
                        string += "<tr><td>{:}</td><td>{:}</td><td>{:}</td></tr>".format(ProductA.tmp.uid,ProductA.tmp.name,ProductA.tmp.value)
                        ProductA.tmp = ProductA.tmp.next
                string += "</table>"
                string += "</div>"
                string += "</div>"
                return string
        def iSexist(self,name):
                #       check the people exist
                tmp = ProductA.first 
                while tmp!=None:
                        if tmp.name == name:
                                return True
                        tmp = tmp.next 
                return False