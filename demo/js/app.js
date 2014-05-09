(function() {
	"use strict";

	var gBlurProc = new improcjs.Improc(document.getElementById("gaussian-blur"), new improcjs.GaussianBlurFilter());

	document
		.getElementById("gaussian-blur-sigma")
		.addEventListener("input", function(e) {

			gBlurProc.processImage({
				sigma: parseInt(document.getElementById("gaussian-blur-sigma").value, 10)
			});

		});





	document.getElementById("image-loader").addEventListener("change", function(e) {

		var file = e.target.files[0];
		var reader = new FileReader();

		reader.onload = function(e) {
			var dataURL = reader.result;

			var img = new Image();
			img.onload = function() {
				gBlurProc.updateImage(img);
			};
			img.src = dataURL;
		};
		reader.readAsDataURL(file);
	}, false);
})();
