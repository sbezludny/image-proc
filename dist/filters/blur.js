(function() {
	"use strict";

	this.GaussianBlurFilter = function() {

		var getKernel = function(sigma) {

			var kernel = [],
				size = parseInt(sigma * 3, 10);

			for (var i = 0; i < size; i++) {
				kernel[i] =
					1 / (Math.sqrt(2 * Math.PI) * sigma) * Math.exp(-Math.pow((i - (size - 1) / 2), 2) / (2 * Math.pow(sigma, 2)));
			}
			return kernel;
		};

		var processPoint = function(bitmap, x, y, kernel, rect, direction) {
			var pixel = [0, 0, 0, 0],
				raduis = kernel.length >> 1,
				k, cox, coy, kernelPoint, m;

			for (k = 0; k < kernel.length; k++) {
				kernelPoint = kernel[k];
				cox = direction === 0 ? x + k - raduis : x;
				coy = direction === 1 ? y + k - raduis : y;

				if (cox < 0) {
					cox = 0;
				} else if (cox >= rect.width) {
					cox = rect.width - 1;
				}

				if (coy < 0) {
					coy = 0;
				} else if (coy >= rect.height) {
					coy = rect.height - 1 ;
				}

				if (cox >= 0 && cox < rect.width && coy >= 0 && coy < rect.height) {
					m = bitmap[cox][coy];

					pixel[0] += m[0] * kernelPoint;
					pixel[1] += m[1] * kernelPoint;
					pixel[2] += m[2] * kernelPoint;
					pixel[3] += m[3] * kernelPoint;
				}
			}
			return pixel;
		};

		var processImage = function(bitmap, kernel, rect) {
			var xConvolution = [],
				yConvolution = [],
				x, y;

			//x-direction
			for (x = 0; x < rect.width; x++) {
				xConvolution[x] = [];
				for (y = 0; y < rect.height; y++) {
					xConvolution[x][y] = processPoint(bitmap, x, y, kernel, rect, 0);
				}
			}

			//y-direction
			for (x = 0; x < rect.width; x++) {
				yConvolution[x] = [];
				for (y = 0; y < rect.height; y++) {
					yConvolution[x][y] = processPoint(xConvolution, x, y, kernel, rect, 1);
				}
			}

			return yConvolution;
		};

		var toBitmap = function(bytes, rect) {
			var bitmap = [],
				index, x, y;
			for (x = 0; x < rect.width; x++) {
				bitmap[x] = [];
				for (y = 0; y < rect.height; y++) {
					index = (y * rect.width + x) * 4;
					bitmap[x][y] = [
						bytes[index],
						bytes[index + 1],
						bytes[index + 2],
						bytes[index + 3]
					];
				}
			}

			return bitmap;
		};

		var flattenBitmap = function(bitmap) {
			var w = bitmap.length,
				h = bitmap[0].length,
				index, x, y;

			var result = new Uint8ClampedArray(w * h * 4);

			for (x = 0; x < w; x++) {
				for (y = 0; y < h; y++) {
					index = (y * w + x) * 4;
					result[index] = bitmap[x][y][0];
					result[index + 1] = bitmap[x][y][1];
					result[index + 2] = bitmap[x][y][2];
					result[index + 3] = bitmap[x][y][3];
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

			var sigma = amount;

			if (sigma === 0) {
				return sourceBytes;
			}

			var sourceBitmap = toBitmap(sourceBytes, rect);

			var kernel = getKernel(sigma);

			var destBitmap = processImage(sourceBitmap, kernel, rect);

			var result = flattenBitmap(destBitmap);

			return result;

		};

	};
})();
