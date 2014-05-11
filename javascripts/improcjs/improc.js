/*global Improcjs:true */
(function(Improcjs) {
	"use strict";

	Improcjs.Processor = function(path) {
		var worker = null;
		var filters = {};

		this.processImage = function(filter, imageData, rect, amount, cb) {
			var script = filters[filter].script;
			if (worker !== null) {
				worker.terminate();
			}
			worker = new Worker(path + "worker.js");

			worker.addEventListener("message", function(e) {
				cb(e.data);
			}, false);

			var bytes = new Uint8ClampedArray(imageData);

			var objData = {
				filter: filter,
				script: script,
				bytes: bytes,
				rect: rect,
				amount: amount
			};
			worker.postMessage(objData, [bytes.buffer]);
		};

		this.addFilter = function(name, script) {
			filters[name] = {
				script: script
			};
		};
	};



})(this.Improcjs || (this.Improcjs = {}));
