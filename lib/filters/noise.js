(function(Improcjs) {
	"use strict";

	var getNoise = function(noiseValue) {
		return Math.floor((noiseValue >> 1) - (Math.random() * noiseValue));
	};



	Improcjs.noise = {
		processFilter: function(data, rect, amount) {

			if (amount === 0) {
				return;
			}

			var w = rect.width,
				h = rect.height,
				x, y, index;

			for (x = 0; x < w; x++) {
				for (y = 0; y < h; y++) {
					index = (y * w + x) << 2;
					data[index] = data[index] + getNoise(amount);
					data[index + 1] = data[index + 1] + getNoise(amount);
					data[index + 2] = data[index + 1] + getNoise(amount);
				}
			}

		}
	};


})(this.Improcjs || (this.Improcjs = {}));
