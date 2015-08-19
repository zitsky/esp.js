define(['backbone','underscore'],function(Backbone,_){
    var dialog=$("#fileDialog");
    return {
        openFile:function(cb,options)
        {
            dialog.unbind("change");
            dialog.on("change",function(){
                console.log($(this).val());
                cb($(this).val());
                $(this).val("");
            });
            dialog.trigger('click');
        }
    }
});