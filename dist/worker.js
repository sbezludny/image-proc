/*global self, importScripts*/
(function() {
	"use strict";

	self.addEventListener("message", function(e) {

		var args = e.data;

		importScripts(args.script);
		self.processFilter(args.bytes, args.rect, args.amount);
		self.postMessage(args.bytes, [args.bytes.buffer]);
	});

})(self);

