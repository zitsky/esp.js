define(['underscore','backbone','code-mirror!@','app/system/filedialog'],function(_,Backbone,CodeMirror,sFileDialog){
	var private={};
	var ModelBuffer=Backbone.Ribs.Model.extend({
		defaults:{
			id:"",
			name:"",
			lastsaved:0,
			edited:false,
			buffer:null,
			filename:null,
			path:null,
			active:false
		},
		initialize:function()
		{

		},
		save:function()
		{

		}
	});

	var CollectionBuffer=Backbone.Collection.extend({
		model:ModelBuffer,
		untitled:0,
		initialize:function(){
			window.GE.on("buffer.createfile", _.bind(this.createFile,this));
			window.GE.on("buffer.openfile", _.bind(this.openFile,this));
			window.GE.on("buffer.activate", _.bind(this.activateBuffer,this));
			window.GE.on("buffer.close", _.bind(this.closeBuffer,this));
		},
		prepareName:function(name)
		{
			return name.replace(/[\\\\/]/g,".").replace(/[^A-Za-z.А-Яа-я_0-9\\\\/-]/g,"");
		},
		makeBuffer:function(path)
		{
			var name=this.prepareName(path);
			var nameCols=name.split(".");
			var pathCols=path.split("\\").length?path.split("\\"):path.split("/");

			var fs = require("fs");
			var bufdata = "";
			if(pathCols.length>1)
			{
				bufdata=fs.readFileSync(path, "utf8");
			}

			var buffer=CodeMirror.Doc(bufdata,"javascript");

			buffer.on("change",_.bind(function(){
				this.trigChanged(name);
			},this));

			this.add({
				buffer:buffer,
				id:name,
				name:(pathCols.length>1)?pathCols[pathCols.length-1]:nameCols[nameCols.length-1],
				edited:(pathCols.length>1)?false:true,
				lastsaved:new Date(),
				path:(pathCols.length>1)?path:null
			});

			this.activateBuffer(name);

			return name;
		},
		getBuffer:function(name)
		{
			return this.get(name);
		},
		removeBuffer:function(name)
		{
			this.remove(this.getBuffer(name));
		},
		closeBuffer:function(name,promt)
		{
			var b=this.get(name);
			if(b.get("edited"))
			{
				if(confirm("Save data?"))
				{
					alert("SAVED");
				}else{
					alert("discard");
				}
			}

			this.removeBuffer(name);
			if(this.models.length) {
				var hasos=false;
				_.each(this.models,function(model){
					if(model.get("active"))
						hasos=true;
				});
				if(!hasos)
					this.activateBuffer(this.models[0].get("id"));
			}
		},
		trigChanged:function(name)
		{
			this.get(name).set("edited",true);
		},
		trigSaved:function(name)
		{
			this.get(name).set({edited:false,lastsaved:new Date()});
		},
		activateBuffer:function(name)
		{
			console.log("active buffer",name);
			_.each(this.models,function(model){
				model.set("active",false);
			});
			this.get(name).set("active",true);
			window.GE.trigger("editor.activate",name);
		},
		openFile:function()
		{
			console.log(sFileDialog);
			sFileDialog.openFile(_.bind(function(name){
				console.log("file to open",name,this.prepareName(name));
				this.makeBuffer(name);
			},this));
		},
		createFile:function()
		{
			console.log("event triggered");
			this.makeBuffer("Untitled "+(this.untitled++));
		}
	});

	return new (CollectionBuffer)();
});