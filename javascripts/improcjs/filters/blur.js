(function(self) {
	"use strict";

	var getKernel = function(sigma) {

		var kernel = [],
			size = parseInt(sigma * 3, 10);

		for (var i = 0; i < size; i++) {
			kernel[i] =
				1 / (Math.sqrt(2 * Math.PI) * sigma) * Math.exp(-Math.pow((i - (size - 1) / 2), 2) / (2 * Math.pow(sigma, 2)));
		}
		return kernel;
	};

	var setPx = function(imageData, index, r, g, b, a) {
		imageData[index] = r;
		imageData[index + 1] = g;
		imageData[index + 2] = b;
		imageData[index + 3] = a;
	};

	var forEachPx = function(imageData, w, h, cb) {
		for (var x = 0; x < w; x++) {
			for (var y = 0; y < h; y++) {
				var i = (y * w + x) << 2;

				cb(x, y, i);
			}
		}
	};

	var processPx = function(bytes, x, y, kernel, rect, direction) {
		var pxSum = [0, 0, 0, 255],
			raduis = Math.round(kernel.length / 2),
			k, rx, ry, kernelPoint, m, w = rect.width,
			h = rect.height;

		for (k = 0; k < kernel.length; k++) {
			rx = direction === 1 ? x + k - raduis : x;
			ry = direction === 0 ? y + k - raduis : y;

			if (rx < 0) {
				rx = 0;
			} else if (rx >= w) {
				rx = w - 1;
			}

			if (ry < 0) {
				ry = 0;
			} else if (ry >= h) {
				ry = h - 1;
			}

			var i = (ry * w + rx) << 2;


			var kk = kernel[k];

			var pxR = bytes[i];
			var pxG = bytes[i + 1];
			var pxB = bytes[i + 2];
			var pxA = bytes[i + 3];

			if (pxA === 0) {
				pxR = 255;
				pxG = 255;
				pxB = 255;
				pxA = 255;
			}

			pxSum[0] += pxR * kk;
			pxSum[1] += pxG * kk;
			pxSum[2] += pxB * kk;
			pxSum[3] += pxA * kk;
		}

		return pxSum;
	};

	var processImage = function(data, kernel, rect) {
		var x, y, w = rect.width,
			h = rect.height,
			index, px;

		var tempData = new Uint8ClampedArray(data);

		//x-direction
		forEachPx(data, w, h, function(x, y, index) {
			px = processPx(data, x, y, kernel, rect, 0);
			setPx(tempData, index, px[0], px[1], px[2], px[3]);
		});

		//y-direction
		forEachPx(data, w, h, function(x, y, index) {
			px = processPx(tempData, x, y, kernel, rect, 1);
			setPx(data, index, px[0], px[1], px[2], px[3]);
		});
	};



	self.processFilter = function(sourceBytes, rect, amount) {

		if (amount === 0) {
			return;
		}

		var kernel = getKernel(amount);

		processImage(sourceBytes, kernel, rect);


	};
})(this);
