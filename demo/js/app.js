(function() {
	"use strict";

	var gBlurProc = new improcjs.Improc(document.getElementById("gaussian-blur"), new improcjs.GaussianBlurFilter());
	var noiseProc = new improcjs.Improc(document.getElementById("noise"), new improcjs.NoiseFilter());
	var medianProc = new improcjs.Improc(document.getElementById("median"), new improcjs.MedianFilter());

	document
		.getElementById("gaussian-blur-sigma")
		.addEventListener("input", function(e) {

			gBlurProc.processImage(parseInt(document.getElementById("gaussian-blur-sigma").value, 10));

		});

	document
		.getElementById("noise-amount")
		.addEventListener("input", function(e) {

			noiseProc.processImage(parseInt(document.getElementById("noise-amount").value, 10));

		});

	document
		.getElementById("median-amount")
		.addEventListener("input", function(e) {

			medianProc.processImage(parseInt(document.getElementById("median-amount").value, 10));

		});





	document.getElementById("image-loader").addEventListener("change", function(e) {

		var file = e.target.files[0];
		var reader = new FileReader();

		reader.onload = function(e) {
			var dataURL = reader.result;

			var img = new Image();
			img.onload = function() {
				gBlurProc.updateImage(img);
				noiseProc.updateImage(img);
				medianProc.updateImage(img);
			};
			img.src = dataURL;
		};
		reader.readAsDataURL(file);
	}, false);
})();
