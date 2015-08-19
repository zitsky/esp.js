define(['underscore','backbone','app/views/headermenucollection'],function(_,Backbone,HeaderMenuCollection) {
	return Backbone.Ribs.View.extend({
		model:null,
		el:".window-header",
		bindings:{
			'.title span':{
				text:{
					data:"model.title",
					filter:function(title)
					{
						return title+((title=="")?"":" - ");
					}
				}
			},
			'.win-button-group':{
				mod:{
					'on-':"model.buttons.position"
				}
			}
		},
		events:{
			"click .button-min":"onMinimize",
			"click .button-max":"onMaximize",
			"click .button-close":"onClose"
		},
		headermenu:null,
		initialize:function(options){
			options=_.extend({
				title:"",
				menu:[],
				buttons:{
					position:'right'
				},
				minButton:true,
				maxButton:true,
				closeButton:true,
				win:null,
				maximized:false,
				show:true,
				onClose:function(){}
			},options);
			this.winObject=options.win;
			this.model=new (Backbone.Ribs.Model.extend({
				defaults:{
					title:"Main Title",
					menu:null
				}
			}))();
			
			this.model.set(options);
			this.headermenu=new HeaderMenuCollection({el:this.$el.find(".menu")[0]});


			

			this.model.on("change:maximized",_.bind(function(){
				if(this.model.get("maximized"))
					this.model.get("win").maximize();
				else
					this.model.get("win").unmaximize();
			},this));

			this.model.on("change:show",_.bind(function(){
				if(this.model.get("minimized"))
					this.model.get("win").show();
				else
					this.model.get("win").hide();
			},this));

			this.applyBindings();
		},
		onMinimize:function()
		{
			this.model.get("win").minimize();
		},
		onMaximize:function()
		{
			this.model.set("maximized",!this.model.get("maximized"));
		},
		onClose:function()
		{
			this.model.get("onClose")();
		}
	});
});