/**
 * Created by Administrator on 2016/4/13.
 */
Function.prototype.binding = function() {
    if (arguments.length < 2 && typeof arguments[0] == "undefined") return this;
    var __method = this, args = jQuery.makeArray(arguments), object = args.shift();
    return function() {
        return __method.apply(object, args.concat(jQuery.makeArray(arguments)));
    }
}

var Class = function(subclass){
    subclass.setOptions = function(options){
        this.options = jQuery.extend({}, this.options,options);
        for(var key in options){
            if(/^on[A-Z][A-Za-z]*$/.test(key)){
                $(this).bind(key,options[key]);
            }
        }
    }
    var fn =  function(){
        if(subclass._init && typeof subclass._init == 'function'){
            this._init.apply(this,arguments);
        }
    }
    if(typeof subclass == 'object'){
        fn.prototype = subclass;
    }
    return fn;
}
var PopupLayer = new Class({
    options:{
        trigger:null,
        popupBlk:null,
        closeBtn:null,
        popupLayerClass:"popupLayer",
        eventType:"click",
        offsets:{
            x:0,
            y:0
        },
        locat:{
            x:0,
            y:0
        },
        useFx:false,
        useOverlay:false,
        usePopupIframe:false,
        isresize:true,
        onBeforeStart:function(){}
    },
    _init:function(options){
        this.setOptions(options);
        this.isSetPosition = this.isDoPopup = this.isOverlay = true;
        this.popupLayer = $(document.createElement("div")).addClass(this.options.popupLayerClass);
        this.popupIframe = $(document.createElement("iframe")).attr({border:0,frameborder:0});
        this.trigger = $(this.options.trigger);
        this.popupBlk = $(this.options.popupBlk);
        this.closeBtn = $(this.options.closeBtn);
        $(this).trigger("onBeforeStart");
        this._construct()
        //this.trigger.bind(this.options.eventType,function(){
        //    if(this.isSetPosition){
        //        if(this.options.locat.x == 0 && this.options.locat.y == 0){
        //            this.setPosition(this.trigger.offset().left + this.options.offsets.x, this.trigger.offset().top + this.trigger.get(0).offsetHeight + this.options.offsets.y);
        //        }else{
        //            this.setPosition(this.options.locat.x, this.options.locat.y);
        //        }
        //
        //    }
        //    this.options.useOverlay?this._loadOverlay():null;
        //    (this.isOverlay && this.options.useOverlay)?this.overlay.show():null;
        //    if(this.isDoPopup && (this.popupLayer.css("display")== "none")){
        //        this.options.useFx?this.doEffects("open"):this.popupLayer.show();
        //    }
        //}.binding(this));
        this.isresize?$(window).bind("resize",this.doresize.binding(this)):null;
        this.options.closeBtn?this.closeBtn.bind("click",this.close.binding(this)):null;
    },
    _construct:function(){
        this.popupBlk.show();
        this.popupLayer.append(this.popupBlk.css({opacity:1})).appendTo($(document.body)).css({position:"absolute",'z-index':2,width:this.popupBlk.get(0).offsetWidth,height:this.popupBlk.get(0).offsetHeight});
        this.options.usePopupIframe?this.popupLayer.append(this.popupIframe):null;
        this.recalculatePopupIframe();
        this.popupLayer.hide();
    },
    _loadOverlay:function(){
        pageWidth = ($.browser.version=="6.0")?$(document).width()-21:$(document).width();
        this.overlay?this.overlay.remove():null;
        this.overlay = $(document.createElement("div"));
        this.overlay.css({position:"absolute","z-index":-1,left:0,top:0,zoom:1,display:"none",width:pageWidth,height:$(document).height()}).appendTo($(document.body)).append("<div style='position:absolute;z-index:2;width:100%;height:100%;left:0;top:0;opacity:0.3;filter:Alpha(opacity=30);background:#000'></div>")
    },
    doresize:function(){
        this.overlay?this.overlay.css({width:($.browser.version=="6.0")?$(document).width()-21:$(document).width(),height:($.browser.version=="6.0")?$(document).height()-4:$(document).height()}):null;
        if(this.isSetPosition){
            this.setPosition(this.trigger.offset().left + this.options.offsets.x, this.trigger.offset().top + this.trigger.get(0).offsetHeight + this.options.offsets.y);
        }
    },
    setPosition:function(left,top){
        this.popupLayer.css({left:left,top:top});
    },
    doEffects:function(way){
        if(way == "open"){
            this.popupLayer.css({opacity:0.3}).show(400,function(){
                this.popupLayer.animate({left:($(document).width() - this.popupLayer.width())/2,top:document.documentElement.clientHeight*0.1,opacity:0.8},1000,function(){this.popupLayer.css("opacity",1)}.binding(this));
            }.binding(this));
        }else{
            this.popupLayer.animate({
                left:$(document).width(),top:0,opacity:0.1
            },{duration:500,complete:function(){this.popupLayer.css("opacity",1);this.popupLayer.hide()}.binding(this)});
        }
    },
    recalculatePopupIframe:function(){
        this.popupIframe.css({position:"absolute",'z-index':-1,left:0,top:0,opacity:0,width:this.popupBlk.get(0).offsetWidth,height:this.popupBlk.get(0).offsetHeight});
    },
    close:function(){
        //this.options.useOverlay?this.overlay.hide():null;
        this.options.useFx?this.doEffects("close"):this.popupLayer.hide();
    }
});