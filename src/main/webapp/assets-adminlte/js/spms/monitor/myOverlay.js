/** 3.0百度地图自定义覆盖物js create.by 陈尚波 2016年4月20日16:55:03*/
// 字符串转dom对象
function parseDom(arg) { 
	var objE = document.createElement("div"); 
	objE.innerHTML = arg; 
	return objE.childNodes; 
}; 
var point ;
/**
 * 1、定义自定义覆盖物的构造函数  
 * 参数：json对象(包含坐标、姓名等信息)，height高，width宽
 */
function MyOverlay(obj, height, width){ 
	this._obj = obj;
	this._point = new BMap.Point(obj.LONGITUDE,obj.LATITUDE);
	this._height =height; 
	this._width =width; 
}  

MyOverlay.prototype = new BMap.Overlay();   

/**
 * 2、初始化自定义覆盖物    
 * 实现初始化方法  
 */
MyOverlay.prototype.initialize =function(map){   
	//保存map对象实例  
	this._map =map;   
	//创建div元素，作为自定义覆盖物的容器  
	var content = "<div id=\"container\" style=\"border: 0px solid #a9a2a2;\"><div id=\"header\" style=\"border: 0px solid #a9a2a2;\"><img src=\""+basePath+"/assets/images/ext_icons/user/photos.png\" /></div><div id=\"footer\" style=\"text-align:center;background-color:white;color:red;padding-top: 3px;padding-bottom: 4px;\">"+this._obj.NAME+"</div></div>";
	var div = parseDom(content)[0];
	div.style.position ="absolute"; 
	//div.style.width =this._width +"px";  
	//div.style.height =this._height +"px";  
	//将div添加到覆盖物容器中  
	map.getPanes().markerPane.appendChild(div); //保存div实例  
	this._div =div; //需要将div元素作为方法的返回值，当调用该覆盖物的show、  
	//hide方法，或者对覆盖物进行移除时，API都将操作此元素。  
	return div;   
}  

/**
 * 3、绘制覆盖物       
 * 实现绘制方法  
 */
MyOverlay.prototype.draw =function(){   
	//根据地理坐标转换为像素坐标，并设置给容器  
	var position =this._map.pointToOverlayPixel(this._point);  
	this._div.style.left =position.x-this._width/2 +"px";  
	this._div.style.top =position.y-this._height/2+"px";
}  

/**
 * 4、显示覆盖物       
 * 实现显示方法    
 */
MyOverlay.prototype.show =function(){   
	if(this._div){   
		this._div.style.display ="";  
	}   
}  

/**
 * 5、隐藏覆盖物       
 * 实现隐藏方法    
 */  
MyOverlay.prototype.hide =function(){   
	if(this._div){   
		this._div.style.display ="none";  
	}   
}  
 
/**
 * 6、自定义覆盖物添加事件方法        
 * 实现隐藏方法    
 */ 
MyOverlay.prototype.addEventListener =function(event,fun){  
	this._div['on'+event] =fun;  
}  