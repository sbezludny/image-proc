(function() {
	"use strict";

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var imageData = null;
	var proc = new Improcjs.Processor();

	var drawImage = function(data) {
		var imageData = ctx.createImageData(canvas.width, canvas.height);
		imageData.data.set(data);
		ctx.putImageData(imageData, 0, 0);
	};

	document
		.getElementById("amount")
		.addEventListener("input", function(e) {

			var amount = parseInt(document.getElementById("amount").value, 10);

			proc.processImage(
				"noise",
				imageData.data, {
					width: canvas.width,
					height: canvas.height
				},
				amount,
				function (data) {
					drawImage(data);
				});

		});



	document.getElementById("image-loader").addEventListener("change", function(e) {

		var file = e.target.files[0];
		var fr = new FileReader();

		fr.onload = function(e) {
			var dataURL = fr.result;

			var img = new Image();
			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;

				ctx.drawImage(img, 0, 0);
				imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			};
			img.src = dataURL;
		};
		fr.readAsDataURL(file);
	}, false);


	proc.addFilter("noise", "filters/noise.js");
})();
