define(['underscore','backbone','code-mirror!htmlmixed:monokai','app/system/buffers','app/views/filelistmenu'],function(_,Backbone,CodeMirror,Buffers,FileListMenu){
	return new (Backbone.Ribs.View.extend({
		tagName:"div",
		className:"editor-style",
		editor:null,
		topmenu:null,
		initialize:function(){
			console.log("Editor Initialize");
			this.$el.html('<ul id="editor_files"></ul><div id="editor"></div>');
			this.editor=new CodeMirror(this.$el.find("#editor")[0],{
				lineNumbers:true,
				mode:"htmlmixed",
				theme:"monokai"
			});
			this.topmenu=new FileListMenu({el:this.$el.find("#editor_files")[0]});

			Buffers.makeBuffer("Untitled");
			this.swapOn(Buffers.getBuffer("Untitled"));
		},
		didShow:function()
		{
			this.editor.refresh();
		},
		swapOn:function(buffer)
		{
			this.editor.swapDoc(buffer.get("buffer"));
		}
	}))();
});