(function(Improcjs) {
	"use strict";

	var getNoise = function(noiseValue) {
		return Math.floor((noiseValue >> 1) - (Math.random() * noiseValue));
	};

	var fitToByte = function(value) {
		return Math.max(0, Math.min(255, value));
	};


	Improcjs.noise = {
		processFilter: function(imageData, rect, amount) {

			if (amount === 0) {
				return;
			}

			var w = rect.width,
				h = rect.height,
				x, y, index;

			for (x = 0; x < w; x++) {
				for (y = 0; y < h; y++) {
					index = (y * w + x) << 2;
					imageData[index] = fitToByte(imageData[index] + getNoise(amount));
					imageData[index + 1] = fitToByte(imageData[index + 1] + getNoise(amount));
					imageData[index + 2] = fitToByte(imageData[index + 2] + getNoise(amount));
				}
			}

		}
	};


})(this.Improcjs || (this.Improcjs = {}));
