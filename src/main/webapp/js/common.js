/**
 * 命名空间定义解析
 */
var Namespace;
if(typeof Namespace == 'undefined'){
	Namespace = new Object();
	Namespace.register = function(fullNS) {
		
		var nsArray = fullNS.split('.');
		var sEval = "";
		var sNS = "";
		for ( var i = 0; i < nsArray.length; i++) {
			if (i != 0)
				sNS += ".";
			sNS += nsArray[i];
			
			sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS
			+ " = new Object();";
		}
		if (sEval != "")
			eval(sEval);
	};
};
