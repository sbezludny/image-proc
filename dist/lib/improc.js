(function() {
	"use strict";

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var imageData = null;
	var worker = null;

	document
		.getElementById("amount")
		.addEventListener("input", function(e) {

			processImage("noise", parseInt(document.getElementById("amount").value, 10));

		});


	var drawImage = function(data) {
		var imageData = ctx.createImageData(canvas.width, canvas.height);
		imageData.data.set(data);
		ctx.putImageData(imageData, 0, 0);
	};

	var processImage = function(filter, amount) {
		if (worker !== null){
			worker.terminate();
		}
		worker = new Worker("js/worker.js");

		worker.addEventListener("message", function(e) {
			drawImage(e.data);
		}, false);
		var bytes = new Uint8ClampedArray(imageData.data);
		var objData = {
			filter: "js/filters/" + filter + ".js",
			bytes: bytes,
			rect: {
				width: canvas.width,
				height: canvas.height
			},
			amount: amount
		};
		worker.postMessage(objData, [bytes.buffer]);
	};

	document.getElementById("image-loader").addEventListener("change", function(e) {

		var file = e.target.files[0];
		var reader = new FileReader();

		reader.onload = function(e) {
			var dataURL = reader.result;

			var img = new Image();
			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;

				ctx.drawImage(img, 0, 0);
				imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			};
			img.src = dataURL;
		};
		reader.readAsDataURL(file);
	}, false);
})();
