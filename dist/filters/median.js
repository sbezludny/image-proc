(function(Improcjs) {
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

	Improcjs.median = {
		processFilter: function(data, rect, amount) {

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

							var ri = (ry * w + rx) << 2;

							r[c] = data[ri];
							g[c] = data[ri + 1];
							b[c] = data[ri + 2];
							c++;
						}
					}

					index = (y * w + x) << 2;
					data[index] = median(r);
					data[index + 1] = median(g);
					data[index + 2] = median(b);

				}
			}

		}
	};
})(this.Improcjs || (this.Improcjs = {}));
