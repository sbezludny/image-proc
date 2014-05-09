"use strict";

improcjs.Improc = function(canvas, filter) {
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.sourceImageData = null;

	this.processImage = function (params) {
		filter.parameters = params;

		var res = filter.processFilter(this.sourceImageData.data, {
			width: canvas.width,
			height: canvas.height
		});

		var imageData = this.ctx.createImageData(canvas.width, canvas.height);
		imageData.data.set(res);
		this.ctx.putImageData(imageData, 0, 0);
	};

	this.updateImage = function(img) {

		canvas.width = img.width;
		canvas.height = img.height;

		this.ctx.drawImage(img, 0, 0);
		this.sourceImageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

		filter.reset();
	};
};


/*improcjs.Improc.prototype.handleImage = function() {
	var canvas = document.getElementById("image-canvas");
	var ctx = canvas.getContext("2d");
	var imageLoader = document.getElementById("image-loader");


	imageLoader.addEventListener("change", function(e) {

		var file = e.target.files[0];
		var reader = new FileReader();

		reader.onload = function(e) {
			var dataURL = reader.result;

			var img = new Image();
			img.onload = function() {

				var rect = {
					width: img.width,
					height: img.height
				};

				canvas.width = rect.width;
				canvas.height =rect.height;

				ctx.drawImage(img, 0, 0);

				var imageData = ctx.getImageData(0, 0, rect.width, rect.height);

				var filter = new improcjs.GaussianBlurFilter();


				var res = filter.processFilter(imageData.data, rect);


				imageData.data.set(res);
				ctx.putImageData(imageData, 0,0);
			};
			img.src = dataURL;
		};

		reader.readAsDataURL(file);



	}, false);



};*/

improcjsGlobal.Improc = improcjsGlobal.Improc || improcjs.Improc;
