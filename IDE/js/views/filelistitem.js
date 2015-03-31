define(['underscore','backbone'],function(_,Backbone){
	return Backbone.Ribs.View.extend({
		tagName:"li",
		className:"file-select",
		initialize:function()
		{
			this.$el.html("<span>TestFile</span><i>X</i>");
		}
	});
});