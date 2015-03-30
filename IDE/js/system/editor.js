define(['underscore','backbone','codemirror','app/system/buffers','javascript'],function(_,Backbone,CodeMirror,Buffers){
	return new (Backbone.Ribs.View.extend({
		tagName:"div",
		editor:null,
		initialize:function(){
			console.log("Editor Initialize");
			this.$el.html('<ul id="editor_files"></ul><div id="editor"></div>');
			this.editor=new CodeMirror(this.$el.find("#editor")[0],{
				lineNumbers:true
			});

			Buffers.makeBuffer("Untitled");
			this.swapOn(Buffers.getBuffer("Untitled"));
		},
		swapOn:function(buffer)
		{
			this.editor.swapDoc(buffer);
		}
	}))();
});