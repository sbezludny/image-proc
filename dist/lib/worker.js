/*global self, importScripts*/
(function() {
	"use strict";

	self.addEventListener("message", function(e) {

		var data = e.data;

		importScripts(data.filter);

		this.processFilter(data.bytes, data.rect, data.amount);

		self.postMessage(data.bytes, [data.bytes.buffer]);
	});

})(self);
