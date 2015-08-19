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
	},
	cm: {
	    // baseUrl to CodeMirror dir
	    baseUrl: './',
	    // path to CodeMirror lib
	    path: 'codemirror/codemirror',
	    // path to CodeMirror css file
	    css: '/js/vendor/codemirror/codemirror.css',
	    // define themes
	    themes: {
	        monokai: '/js/vendor/codemirror/theme/monokai.css',
	    },
	    modes: {
	      // modes dir structure
	      path:"codemirror/mode/{mode}/{mode}",
	      javascript: 'mode/javascript/javascript',
	      htmlmixed:'mode/htmlmixed/htmlmixed'
	    }
  }
});

requirejs(['IDE','backbone'],function(ide,Backbone){
	//$(function(){
		window.GE= _.extend({},Backbone.Events);
		ide.start();
//	});
});