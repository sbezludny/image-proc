(function() {
	"use strict";

	this.MedianFilter = function() {

		var median = function(values) {
			values.sort(function(a, b) {
				return a - b;
			});

			var half = Math.floor(values.length / 2);

			if (values.length % 2) {
				return values[half];
			} else {
				return (values[half - 1] + values[half]) / 2;
			}
		};

		var processFilter = function(sourceBytes, rect, size) {

			var w = rect.width,
				h = rect.height,
				x, y,
				index,
				rx, ry, t, r, g, b;

			var radius = size >> 1;

			var c = 0;

			var result = new Uint8ClampedArray(sourceBytes);

			for (y = 0; y < h; y++) {
				for (x = 0; x < w; x++) {
					c = 0;
					r = [];
					g = [];
					b = [];
					for (ry = y - radius; ry <= y + radius; ry++) {
						for (rx = x - radius; rx <= x + radius; rx++) {

							var ri = (ry * w + rx) * 4;

							r[c] = sourceBytes[ri];
							g[c] = sourceBytes[ri + 1];
							b[c] = sourceBytes[ri + 2];
							c++;
						}
					}

					index = (y * w + x) * 4;
					result[index] = median(r);
					result[index + 1] = median(g);
					result[index + 2] = median(b);

				}
			}



			return result;
		};

		/**
		 * Process the filter on the specified image
		 * @param  {[type]} Source image data
		 * @param  {[type]} Image rectangle for processing by the filter
		 * @param  {[type]} amount
		 * @return {[type]}
		 */
		this.processFilter = function(sourceBytes, rect, amount) {

			var size = amount;

			if (size === 0) {
				return sourceBytes;
			}



			return processFilter(sourceBytes, rect, size);

		};

	};
})();
