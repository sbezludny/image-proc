/*global self*/
(function() {
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
	this.processFilter = function(bytes, rect, amount) {

		if (amount === 0) {
			return;
		}

		var w = rect.width,
			h = rect.height,
			x, y, index;

		for (x = 0; x < w; x++) {
			for (y = 0; y < h; y++) {
				index = (y * w + x) * 4;
				bytes[index] = Math.max(0, Math.min(255, bytes[index] + getNoise(amount)));
				bytes[index + 1] = Math.max(0, Math.min(255, bytes[index + 1] + getNoise(amount)));
				bytes[index + 2] = Math.max(0, Math.min(255, bytes[index + 2] + getNoise(amount)));
			}
		}

	};


	/*self.addEventListener("message", function(e) {

		var data = e.data;

		processFilter(data.bytes, data.rect, data.amount);

		self.postMessage(data.bytes, [data.bytes.buffer]);
	});*/

})();
