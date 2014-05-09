(function(improcjs) {
	"use strict";

	improcjs.MedianFilter = function() {

		var processFilter = function(sourceBytes, rect, size) {

			var w = rect.width,
				h = rect.height,
				x, y,
				index,
				rx, ry, t, r, g, b;
			// processing square's radius
			var radius = size >> 1;
			// number of elements
			var c = 0;

			// array to hold pixel values (R, G, B)



			var result = new Uint8ClampedArray(w * h * 4);

			for (x = 0; x < w; x++) {
				for (y = 0; y < h; y++) {
					index = (y * w + x) * 4;
					c = 0;
					r = [];
					g = [];
					b = [];
					for (rx = -radius; rx <= radius; rx++) {
						t = x + rx;

						if (t < 0) {
							continue;
						}

						if (t > w) {
							break;
						}

						for (ry = -radius; ry <= radius; ry++) {
							t = y + ry;
							if (t < 0) {
								continue;
							}

							if (t < h) {

								var ri = ((y + ry) * w + x + rx) * 4;
								r[c] = sourceBytes[ri];
								g[c] = sourceBytes[ri + 1];
								b[c] = sourceBytes[ri + 2];
								c++;
							} else {
								break;
							}
						}
					}

					t = c >> 1;



					result[index] = r.sort()[t];
					result[index + 1] = g.sort()[t];
					result[index + 2] = b.sort()[t];
					result[index + 3] = 255;

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
})(improcjs);
