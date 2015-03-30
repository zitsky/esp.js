define(['underscore','Backbone','app/system/preloader'],function(_,Backbone,Preloader){
	return Backbone.Ribs.View.extend({
		el:"#mainView",
		assets:{
			Editor: 'app/system/editor',
			Wizard: 'app/system/wizard',
			Welcome:'app/system/welcome',
			Windows:'app/windows/baseline',
			Board:  'app/system/board', 
		},
		Views:{},
		initialize:function()
		{
			Preloader.show("Loading assets");
			var toLoad=[],loadPath=[];

			for(var i in this.assets)
			{
				toLoad.push(i);
				loadPath.push(this.assets[i]);
			}

			requirejs(loadPath,_.bind(function(){

				for(var i=0;i<arguments.length;i++)
				{
					this.Views[toLoad[i]]=arguments[i];
				}

				Preloader.show("Lookup project");

			},this));
		}
	});
});