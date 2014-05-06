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
