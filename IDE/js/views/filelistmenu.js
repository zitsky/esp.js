define(['underscore','backbone','app/system/buffers','app/views/filelistitem'],function(_,Backbone,Buffers,FileListItem){
	return Backbone.Ribs.View.extend({
		tagName:'ul',
		viewLi:FileListItem,
		collection:null,
		bindings:{
			'el':{
				collection:{
					view:"viewLi",
					col:"collection",
					data:{}
				}
			}
		},
		initialize:function()
		{
			
			this.collection=new (Backbone.Collection.extend({
				model:Backbone.Ribs.Model.extend({
					defaults:{
						title:'123',
						saved:false
					}
				}),
				initialize:function()
				{
					this.reset([{title:'test'},{title:'test2'}]);
				}
			}))();
		}
	});
});