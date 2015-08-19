define(['underscore','backbone','code-mirror!htmlmixed:monokai','app/system/buffers','app/views/filelistmenu','app/views/console'],function(_,Backbone,CodeMirror,Buffers,FileListMenu,sConsole){

	var ModelEditor=new (Backbone.Ribs.Model.extend({
		defaults:{
			allowfiles:false
		}
	}))();

	return new (Backbone.Ribs.View.extend({
		tagName:"div",
		className:"editor-style",
		editor:null,
		topmenu:null,
		console:null,
		bindings:{
			'#editor':{
				toggle:"model.allowfiles"
			}
		},
		initialize:function(){
			console.log("Editor Initialize");
			window.GE.on("editor.activate", _.bind(this.swapOn,this));
			this.model=ModelEditor;
			this.$el.html('<ul id="editor_files"></ul><div id="editor"></div><div id="console"></div>');
			this.editor=new CodeMirror(this.$el.find("#editor")[0],{
				lineNumbers:true,
				mode:"htmlmixed",
				theme:"monokai"
			});
			this.topmenu=new FileListMenu({el:this.$el.find("#editor_files")[0]});
			this.console=new sConsole({el:this.$el.find("#console")[0]});
			Buffers.on("add reset remove", _.bind(function(){
				this.model.set("allowfiles",Buffers.length);
			},this));

		},
		didShow:function()
		{
			this.editor.refresh();
		},
		swapOn:function(buffer)
		{
			var ibuff=Buffers.getBuffer(buffer);
			this.editor.swapDoc(ibuff.get("buffer"));
		}
	}))();
});