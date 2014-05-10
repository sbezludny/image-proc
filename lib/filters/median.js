(function(self) {
	"use strict";

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

	/**
	 * Process the filter on the specified image
	 * @param  {[type]} Source image data
	 * @param  {[type]} Image rectangle for processing by the filter
	 * @param  {[type]} amount
	 * @return {[type]}
	 */
	self.processFilter = function(bytes, rect, amount) {

		if (amount === 0) {
			return;
		}

		var w = rect.width,
			h = rect.height,
			x, y,
			index,
			rx, ry, t, r, g, b;

		var radius = amount >> 1;

		var c = 0;

		for (y = 0; y < h; y++) {
			for (x = 0; x < w; x++) {
				c = 0;
				r = [];
				g = [];
				b = [];
				for (ry = y - radius; ry <= y + radius; ry++) {
					for (rx = x - radius; rx <= x + radius; rx++) {

						var ri = (ry * w + rx) * 4;

						r[c] = bytes[ri];
						g[c] = bytes[ri + 1];
						b[c] = bytes[ri + 2];
						c++;
					}
				}

				index = (y * w + x) * 4;
				bytes[index] = median(r);
				bytes[index + 1] = median(g);
				bytes[index + 2] = median(b);

			}
		}

	};
})(this);
