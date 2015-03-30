define(['underscore','backbone','codemirror'],function(_,Backbone,CodeMirror){
	var private={};
	var ModelBuffer=Backbone.Ribs.Model.extend({
		defaults:{
			id:"",
			name:"",
			lastsaved:0,
			edited:false,
			buffer:null
		},
		initialize:function()
		{

		}
	});

	var CollectionBuffer=Backbone.Collection.extend({
		model:ModelBuffer,
		prepareName:function(name)
		{
			return name.replace(/[\\\\/]/g,".").replace(/[^A-Za-z.А-Яа-я_\\\\/-]/g,"");
		},
		makeBuffer:function(name)
		{
			var nameCols=name.split(".");
			var buffer=CodeMirror.Doc(name,"","javascript");
			
			buffer.on("change",_.bind(function(){
				this.trigChanged();
			},this));

			this.add({
				buffer:buffer,
				id:name,
				name:nameCols[nameCols.length-2]+"."+nameCols[nameCols.length-1],
				edited:false,
				lastsaved:new Date()
			});
		},
		getBuffer:function(name)
		{
			return this.get(name);
		},
		removeBuffer:function(name)
		{
			this.remove(this.getBuffer(name));
		},
		trigChanged:function(name)
		{
			this.get(name).set("edited",true);
		},
		trigSaved:function(name)
		{
			this.get(name).set({edited:false,lastsaved:new Date()});
		}
	});

	return new (CollectionBuffer)();
});