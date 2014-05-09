/* global describe, assert, it, beforeEach, sampleImage, improcjs */

(function() {
	"use strict";

	var filter = null,
		sourceBytes = sampleImage,
		imageSize = {
			width: 10,
			height: 10
		};

	beforeEach(function() {
		filter = new improcjs.GaussianBlurFilter();
	});

	describe("Guassian blur image filter", function() {
		it("should return byte array", function() {

			var bytes = filter.processFilter(sourceBytes, imageSize);



			console.log(bytes);

		});
	});
})();
