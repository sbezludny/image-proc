"use strict";

/* jshint ignore:start */
var improcjs;
var improcjsGlobal;

try {
	improcjs = improcjs || exports || {};
} catch (error) {
	improcjs = {};
}

try {
	improcjsGlobal = improcjsGlobal || global || {};
} catch (error) {
	improcjsGlobal = {};
}


if (typeof define !== 'undefined' && define.amd) {
 define([], function() {
   return improcjs;
 });
}
/* jshint ignore:end */

(function(improcjs) {
	"use strict";

	improcjs.GaussianBlurFilter = function() {

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
			var pixel = [0, 0, 0, 255],
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
})(improcjs);

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

"use strict";

improcjs.Improc = function(canvas, filter) {
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.sourceImageData = null;

	this.processImage = function (amount) {
		var res = filter.processFilter(this.sourceImageData.data, {
			width: canvas.width,
			height: canvas.height
		}, amount);

		var imageData = this.ctx.createImageData(canvas.width, canvas.height);
		imageData.data.set(res);
		this.ctx.putImageData(imageData, 0, 0);
	};

	this.updateImage = function(img) {

		canvas.width = img.width;
		canvas.height = img.height;

		this.ctx.drawImage(img, 0, 0);
		this.sourceImageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
	};
};


/*improcjs.Improc.prototype.handleImage = function() {
	var canvas = document.getElementById("image-canvas");
	var ctx = canvas.getContext("2d");
	var imageLoader = document.getElementById("image-loader");


	imageLoader.addEventListener("change", function(e) {

		var file = e.target.files[0];
		var reader = new FileReader();

		reader.onload = function(e) {
			var dataURL = reader.result;

			var img = new Image();
			img.onload = function() {

				var rect = {
					width: img.width,
					height: img.height
				};

				canvas.width = rect.width;
				canvas.height =rect.height;

				ctx.drawImage(img, 0, 0);

				var imageData = ctx.getImageData(0, 0, rect.width, rect.height);

				var filter = new improcjs.GaussianBlurFilter();


				var res = filter.processFilter(imageData.data, rect);


				imageData.data.set(res);
				ctx.putImageData(imageData, 0,0);
			};
			img.src = dataURL;
		};

		reader.readAsDataURL(file);



	}, false);



};*/

improcjsGlobal.Improc = improcjsGlobal.Improc || improcjs.Improc;
