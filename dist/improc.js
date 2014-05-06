"use strict";

/* jshint ignore:start */
var improcjs;
var improcjsGlobal;

try {
	improcjs = improcjs || exports || {};
} catch (error) {
	improcjs = {};
}

try {
	improcjsGlobal = improcjsGlobal || global || {};
} catch (error) {
	improcjsGlobal = {};
}


if (typeof define !== 'undefined' && define.amd) {
 define([], function() {
   return improcjs;
 });
}
/* jshint ignore:end */

"use strict";

improcjs.Filter = function () {

};

improcjs.Filter.prototype.applyFilter = function () {

};

"use strict";

improcjs.Improc = function(options) {

	this.options = options;

	this.handleImage();

};

improcjs.Improc.prototype.handleImage = function() {
	var canvas = document.getElementById("image-canvas");
	var ctx = canvas.getContext("2d");
	var imageLoader = document.getElementById("image-loader");

	imageLoader.addEventListener("change", function (e) {
		var reader = new FileReader();
		reader.onload = function(event) {

			console.log(event);
			/*var img = new Image();
			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);
			};
			img.src = event.target.result;*/
		};
		reader.readAsArrayBuffer(e.target.files[0]);
	}, false);





};

improcjsGlobal.Improc = improcjsGlobal.Improc || improcjs.Improc;
