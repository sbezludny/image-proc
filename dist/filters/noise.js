(function(Improcjs) {
	"use strict";

	var getNoise = function(noiseValue) {
		return Math.floor((noiseValue >> 1) - (Math.random() * noiseValue));
	};

	/**
	 * Process the filter on the specified image
	 * @param  {[type]} Source image data
	 * @param  {[type]} Image rectangle for processing by the filter
	 * @param  {[type]} amount
	 * @return {[type]}
	 */
	Improcjs.noise = {
		processFilter: function(bytes, rect, amount) {

			if (amount === 0) {
				return;
			}

			var w = rect.width,
				h = rect.height,
				x, y, index;

			for (x = 0; x < w; x++) {
				for (y = 0; y < h; y++) {
					index = (y * w + x) << 2;
					bytes[index] = Math.max(0, Math.min(255, bytes[index] + getNoise(amount)));
					bytes[index + 1] = Math.max(0, Math.min(255, bytes[index + 1] + getNoise(amount)));
					bytes[index + 2] = Math.max(0, Math.min(255, bytes[index + 2] + getNoise(amount)));
				}
			}

		}
	};


})(this.Improcjs || (this.Improcjs = {}));
