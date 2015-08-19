define(['underscore','backbone'],function(_,Backbone){
	return Backbone.Ribs.View.extend({
		tagName:"li",
		className:"file-select",
		bindings:{
			'span':{
				text:{
					data:['model.name','model.edited'],
					filter:function(name,ed)
					{
						return name+(ed?"*":"");
					}
				}
			},
			'el':{
				classes:{
					active:'model.active'
				}
			}
		},
		events:{
			"click":"activeMe",
			"click i":"closeMe"
		},
		initialize:function()
		{
			this.$el.html("<span>TestFile</span><i>X</i>");
		},
		activeMe:function()
		{
			console.log("click to active",this.model.get("id"));
			window.GE.trigger("buffer.activate",this.model.get("id"));
		},
		closeMe:function()
		{
			console.log("try close",this.model.get("id"));
			window.GE.trigger("buffer.close",this.model.get("id"));
			return false;
		}
	});
});