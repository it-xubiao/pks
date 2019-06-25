$(document).ready(function(){
	var oButtonsAuthInit = new ButtonsAuthInit();
    oButtonsAuthInit.Init();
});
var ButtonsAuthInit = function(){
	var oButtonsAuthInit = new Object();
    //初始化Table
	oButtonsAuthInit.Init = function () {		
		var buttons = parent.getbutonsbyUrl(location.pathname.substring(5,location.pathname.lenth));
		if(buttons!=null){
			$("#toolbar").children().each(function(i,obj){
				if((","+buttons).indexOf(","+obj.id+",")==-1){
					obj.style.display='none';
				}
				$("#toolbar").show(); 
			});
		}
		$("#toolbar").show(); 
	}
	return oButtonsAuthInit;
}