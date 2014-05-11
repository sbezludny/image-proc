(function() {
	"use strict";

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var controls = {
		amount: document.getElementById("amount"),
		filter: document.getElementById("filter")
	};

	var filterConfig = {
		noise:{
			min:0,
			max:150
		},
		median:{
			min:0,
			max:10
		},
		blur:{
			min:0,
			max:20
		}
	};


	var imageData = null;
	var proc = new Improcjs.Processor("javascripts/improcjs/");

	proc.addFilter("noise", "filters/noise.js");
	proc.addFilter("median", "filters/median.js");
	proc.addFilter("blur", "filters/blur.js");

	var drawImage = function(data) {
		var imageData = ctx.createImageData(canvas.width, canvas.height);
		imageData.data.set(data);
		ctx.putImageData(imageData, 0, 0);
	};

	controls.filter.addEventListener("change", function (e) {

		var conf = filterConfig[controls.filter.value];
		controls.amount.setAttribute("min", conf.min);
		controls.amount.setAttribute("max", conf.max);
		controls.amount.value = conf.min;

		drawImage(imageData.data);
	});

	controls.amount
		.addEventListener("input", function(e) {

			var amount = parseInt(controls.amount.value, 10);

			proc.processImage(
				controls.filter.value,
				imageData.data, {
					width: canvas.width,
					height: canvas.height
				},
				amount,
				function(data) {
					drawImage(data);
				});

		});



	document.getElementById("image-loader")
		.addEventListener("change", function(e) {

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



})();
