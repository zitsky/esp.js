define(['underscore','backbone'],function(_,Backbone){
	var PreloaderSingletone=Backbone.Ribs.View.extend({
		el:"#preloader",
		model:new (Backbone.Ribs.Model.extend({
			defaults:{
				status:"Bootstrap",
				show:true
			}
		}))(),
		bindings:{
			"span":{
				text:"model.status"
			},
			'el':{
				fadesOutin:"model.show"
			}
		},
		handlers:{
			fadesOutin:function($el,value){
				if(value)
					$el.show().fadeIn(500);
				else
					$el.fadeOut(500,function(){$el.hide()});
			}
		},
		initialize:function()
		{
			console.log("preloader initizlize");
			//setTimeout(_.bind(this.hide,this),3000);
			this.hide();
		},
		hide:function()
		{
			this.model.set("show",false);
		},
		show:function(text)
		{
			this.model.set({show:true,status:text});
		}
	});

	return new PreloaderSingletone();
});