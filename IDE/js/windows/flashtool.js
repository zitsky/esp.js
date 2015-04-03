define(['underscore','backbone','app/windows/baseline'],function(_,Backbone,WinBase){
	return WinBase.extend({
		
		initialize:function(options)
		{
			WinBase.prototype.initialize.call(this,options);
		}
	});
});