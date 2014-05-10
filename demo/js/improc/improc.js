/*global Improcjs:true */
(function(Improcjs) {
	"use strict";

	Improcjs.Processor = function(canvas) {
		var worker = null;
		var filters = {};

		this.processImage = function(filter, imageData, rect, amount, cb) {
			var file = filters[filter].file;
			if (worker !== null) {
				worker.terminate();
			}
			worker = new Worker("js/improc/worker.js");

			worker.addEventListener("message", function(e) {
				cb(e.data);
			}, false);

			var bytes = new Uint8ClampedArray(imageData);

			var objData = {
				script: file,
				bytes: bytes,
				rect: rect,
				amount: amount
			};
			worker.postMessage(objData, [bytes.buffer]);
		};

		this.addFilter = function(name, file) {
			filters[name] = {
				file: file
			};
		};
	};



})(this.Improcjs || (this.Improcjs = {}));
