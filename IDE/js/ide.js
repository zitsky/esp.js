define(['underscore','backbone','app/system/preloader','app/views/codeview','app/views/header'],function(_,Backbone,Preloader,CodeView,Header){
	var self={};	
	return (window.IDE=_.extend(self,{
		myHead:null,
		codeView:null,
		start:function()
		{
			console.log("Ide Start loading");
			this.myHead=new Header();
			this.codeView=new CodeView();
		}
	}));
});