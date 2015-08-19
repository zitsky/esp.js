define(['backbone','underscore','app/system/console'],function(Backbone,_,sConsole){
    return Backbone.Ribs.View.extend({
        initialize:function(){
            console.log("init console");
            this.$el.html('<h1>Console <i>&darr;</i> <i>X</i></h1><div class="content"></div><div class="input"><input placeholder="Type JS to execute"/></div>');
            sConsole.on("console.message", _.bind(function(msg,remote){
                this.$el.find(".content").append("<p>From: "+remote.address+", Msg:"+msg+"</p>");
            },this));
        }
    });
});