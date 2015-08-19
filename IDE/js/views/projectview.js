define(['backbone','underscore','text!app/templates/projectview.html'],function(Backbone,_,projectTemplate){
    return Backbone.Ribs.View.extend({
        el:"#project_info",
        initialize:function()
        {
            console.log("project view initialize");
            this.$el.html(projectTemplate);
        }
    });
});