define(['underscore','backbone'],function(_,Backbone) {
	return Backbone.Ribs.View.extend({
		model:null,
		el:".window-header",
		bindings:{
			'.title span':{
				text:"model.title"
			},
			'.win-button-group':{
				mod:{
					'on-':"model.positionClose"
				}
			}
		},
		initialize:function(){
			this.model=new (Backbone.Ribs.Model.extend({
				defaults:{
					title:"Main Title",
					menu:null,
					positionClose:"right"
				}
			}))();
			this.applyBindings();
		}
	});
});