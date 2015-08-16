ESP.Js Platform
======

Based on v7 engine. Now it coming to alpha.
Coming soon:
- WiFi API
- Sockets API
- IDE

Now:
- v7 on esp
- gpio api
- require and module.exports system
- Simple Project File System (SPFS for storage js in flash memory)

example:
 var myModule=require("test-module");
 myModule.method();

 var pin0=gpio(0);
 pin0.mode(PIN_OUT);//default
 pin0.set(true);//for on
 pin0.get();//return true
 //future...
 pin0.on implementation for track events on gpio system.

SPFS - now only fot js code.