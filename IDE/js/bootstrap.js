//var requirejs=require("requirejs");

requirejs.config({
	nodeRequire:require,
	waitSeconds:100,
	baseUrl:'js/vendor',
	paths:{
		'jquery':'jquery',
		'app': '..',
		'underscore':'underscore-min',
		'backbone':'backbone-min',
		'ribs':'backbone.ribs',
		'text':'require.text',
		'async':'async',
		'IDE':'../ide'

	},
	shim:{
		
		underscore:{
			exports:'_',
			deps:['async']
		},
		backbone:{
			deps:['jquery','underscore'],
			exports:'Backbone'
		},
		ribs:{
			deps:['backbone'],
			exports:'Backbone.Ribs'
		},
		IDE:{
			deps:['jquery','backbone','ribs','text']
		}
	}
});

requirejs(['IDE'],function(ide){
	//$(function(){
		ide.start();
//	});
});