define(['backbone','underscore'],function(Backbone,_){

    var dgram = require('dgram');
    var udp4 = dgram.createSocket('udp4');

    var consoleobj=_.extend({
        init:function(){
            udp4.on('listening', function () {
                var address = udp4.address();
                console.log('UDP Client listening on ' + address.address + ":" + address.port);
                client.setBroadcast(true)
                client.setMulticastTTL(128);
            });

            udp4.on('message', _.bind(function (message, remote) {
                console.log('From: ' + remote.address + ':' + remote.port +' - ' + message);
                this.trigger("console.message",message,remote);
                window.GE.trigger("console.message",message,remote);
            },this));

            udp4.bind(555);
        }
    },Backbone.Events);

    consoleobj.init();
    return consoleobj;
});