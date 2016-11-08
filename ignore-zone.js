/*
 * @function steal-socket.io.ignore-zone ignore-zone
 * @parent steal-socket.io
 * @type {Function}
 * @hide
 *
 * @description Wrap `socket-io` when using a `can-zone` module.
 *
 * @signature `ignoreZone( io )`
 *
 * This wrapper is aware of [can-zone](https://github.com/canjs/can-zone) module which helps to track asynchronous
 * activity. It uses `can-zone.ignore` to skip the tracking of `socket.io` calls. For more information about what
 * `can-zone` is checkout [this article](https://davidwalsh.name/can-zone) as well as
 * the [documentation](http://v3.canjs.com/doc/can-zone.html).
 *
 * ```
 * var ignoreZone = require("steal-socket.io/ignore-zone");
 * var socketIO = require("socket.io-client/socket.io");
 * var io  = ignoreZone( socketIO );
 *
 * io("localhost");
 * ```
 *   @param {module} io The SocketIO client module. Usually, it is `socket.io-client/socket.io`.
 */

module.exports = function(io){
	return function(){
		if(typeof CanZone === "function" &&
		   typeof CanZone.ignore === "function") {
			return CanZone.ignore(io).apply(this, arguments);
		}
		//return io.apply(this, arguments);
		return io.apply(this, arguments);
	}
};
