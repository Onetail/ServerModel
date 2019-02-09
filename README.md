# ServerModel

##### use nodejs 
> You can use this model do your  server service .
> Some webservice use more port for many project 
> and this component it and only use one port .  

### Add your project 

##### static web

> Set your project in the ```ObjectModel/project```
> and start server that you will see your project in ```<youraddress>/ObjectModel/project/<yourproject>```

![example Staticproject](https://i.imgur.com/NlAygtJ.jpg,"example")

> *this only apply to static web(not send data to server)*

##### dynamic web
> Set your project in the ```ObjectModel/project```
> go to ```ServerModel/nodejs/postManage.js ``` , add new case ```"/ObjectModel/project/<youraddress>" ```

![example Dynamicproject](https://i.imgur.com/fBJs4SA.jpg,"example2")

> you can delete your origin server file

> your post file must be ```xxxaction.js``` or ```xxxaction.html``` 

> start server that you will see your project in ```<youraddress>/ObjectModel/project/<yourproject>```

![example ajax](https://i.imgur.com/cSGPKEZ.jpg,"useajax")

![exmaple postdata](https://i.imgur.com/0sCC1Fd.jpg,"postaction")

> *Can database now*

### Open server
> go in directory
> ``` cd ServerModel/nodejs/ ``` 
> and use nodejs express 
> ``` node server.js ``` 
> or 
> ``` nodejs server.js ``` 
> and server already start 

