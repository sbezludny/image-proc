(function(improcjs) {
	"use strict";

	improcjs.NoiseFilter = function() {

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
		this.processFilter = function(sourceBytes, rect, amount) {

			if (amount === 0) {
				return sourceBytes;
			}

			var w = rect.width,
				h = rect.height,
				x, y, index;

			var result = new Uint8ClampedArray(w * h * 4);

			for (x = 0; x < w; x++) {
				for (y = 0; y < h; y++) {
					index = (y * w + x) * 4;
					result[index] = Math.max(0, Math.min(255, sourceBytes[index] + getNoise(amount)));
					result[index + 1] = Math.max(0, Math.min(255, sourceBytes[index + 1] + getNoise(amount)));
					result[index + 2] = Math.max(0, Math.min(255, sourceBytes[index + 2] + getNoise(amount)));
					result[index + 3] = 255;
				}
			}

			return result;

		};

	};
})(improcjs);
