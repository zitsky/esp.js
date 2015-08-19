define(['underscore','backbone'],function(){

	var ItemViewSub=Backbone.Ribs.View.extend({
		tagName:'li',
		bindings:{
			el:{
				text:{
					data:['model.name','model.edited'],
					filter:function(name,ed)
					{
						return name+(ed?"*":"");
					}
				}
			}
		},
		events:
		{
			"click":"onClick"
		},
		initialize:function()
		{
			if(this.model.get("seperator"))
				this.setElement("<hr/>");
		},
		onClick:function()
		{
			if(this.model.get("trig"))
				window.GE.trigger(this.model.get("trig"));
			return false;
		}
	})

	var ItemViewMain= Backbone.Ribs.View.extend({
		tagName:'li',
		subView:ItemViewSub,
		bindings:{
			'ul':{
				collection:{
					 col:'collection',
					 view:'subView'
				}
			},
			span:{
				text:'model.name'
			},

		},
		events: {
			"click":"onClick"
		},
		initialize:function()
		{
			this.collection=this.model.get("collection");
			this.$el.html('<span>file</span><ul></ul>');
		},
		onClick:function()
		{
			console.log(this.model);
		}
	});

	var MenuItem=Backbone.Ribs.Model.extend({
		defaults:{
			name:"menu name",
			collection:null
		},
		initialize:function()
		{
			this.set("collection",new (Backbone.Collection.extend({
				model:Backbone.Ribs.Model.extend({
					defaults:{
						id:'',
						name:'',
						enabled:true,
						visible:true,
						trig:null,
						onclick:function(){}
					}
				})
			}))());
		},
		addSubMenu:function(objmenu)
		{
			this.get("collection").add([objmenu]);
		}
	});

	var MenuCollection=Backbone.Collection.extend({
		model:MenuItem,
		addMenu:function(id,objmenu)
		{
			this.get(id).addSubMenu(objmenu);
		}
	});

	return Backbone.Ribs.View.extend({
		collection:null,
		itemView:ItemViewMain,
		bindings:{
			'el':{
				collection:{
					col:'collection',
					view:'itemView'
				}
			}
		},
		initialize:function(options)
		{
			this.collection=new MenuCollection();
			this.collection.reset();
		},
		addMenu:function(id,name)
		{
			this.collection.add([{id:id,name:name}]);
		},
		addSubMenu:function(id,obj){
			this.collection.addMenu(id,obj);
		},
		getMenu:function(id)
		{
			return this.collection.get(id);
		}
	});
});