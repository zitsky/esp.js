define(['underscore','backbone','text!app/templates/window.html','app/views/header'],function(_,Backbone,windowTemplate,Header){
	return Backbone.Ribs.View.extend({
		head:null,
		windowOptions:{
			position: 'center',
  			width: 901,
  			height: 127
		},
		bindings:{
			'head title':{
				text:'headermodel.title'
			}
		},
		winObject:null,
		initialize:function(options)
		{
			options=_.extend({
				width:100,
				height:100,
				title:"No Title"
			},options);
			this.winObject=options.win;
			this.$el.find("body").html(windowTemplate);
			this.header=new Header({el:this.$el.find(".window-header")[0],win:this.winObject})
			this.close=options.close;
			this.headermodel=this.header.model;
			this.header.model.set("title",options.title);
		}
	});
});