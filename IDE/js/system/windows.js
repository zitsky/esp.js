define(['underscore','backbone'],function(_,Backbone){
	var nwGUI=require("nw.gui");

	var winTypes=['flashtool'];
	var winObjs={};
	var toRequire=[];

	for(var i=0;i<winTypes.length;i++)
		toRequire.push('app/windows/'+winTypes[i]);

	requirejs(toRequire,function(){
		for(var i=0;i<winTypes.length;i++)
		{
			winObjs[winTypes[i]]=arguments[i];
		}
	})
	
	return new (Backbone.Collection.extend({
		model:Backbone.Ribs.Model.extend({
			defaults:{
				id:"",
				obj:null,
				win:null,
				opened:false
			}
		}),
		openWindow:function(type,options)
		{
			if(this.get(type) && this.get(type).get("opened"))
				return this.get(type).get("win").focus();

			var winobj={
				obj:null,
				id:type,
				opened:false
			}

			this.add([winobj]);
			var win=nwGUI.Window.open("window.html",_.extend({frame:false,toolbar:false},options));
			this.get(type).set("win",win);
			win.on("loaded",_.bind(function(){
				this.onLoaded(type);
			},this))
		},
		onLoaded:function(objwin)
		{
			var model=this.get(objwin);
			model.set("obj",new winObjs[objwin]({el:model.get("win").window.document.childNodes[0],win:model.get("win")}));
			model.set("opened",true);
		}
	}))();

	return {
		openWindow:function(type,options)
		{
			options=_.extend({
				position: 'center',
  				width: 901,
  				height: 127
			},options);
			var win = nwGUI.Window.open('window.html', options);
			win.on("loaded",_.bind(function(){
				var test=new WindowEvent({el:win.window.document.childNodes[0]});
			},this));
		},
		factory:function(obj)
		{
			return WinBase.extend(obj);
		}
	}
})