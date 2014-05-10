/* global describe, assert, should, expect, it, beforeEach, sampleImage, MedianFitler */

(function() {
	"use strict";

	var filter = null,
		sourceBytes = sampleImage,
		imageSize = {
			width: 3,
			height: 3
		};

	var toArray = function (arrayLike) {
		return Array.prototype.slice.call(arrayLike, 0);
	};

	beforeEach(function() {
		filter = new MedianFitler();
	});

	describe("Guassian blur image filter", function() {
		it("should return typed byte collection - Uint8ClampedArray", function() {

			var result = filter.processFilter(sourceBytes, imageSize, 1);

			assert(result instanceof Uint8ClampedArray);

		});

		it("should return source byte array if amount is zero", function() {

			var amount = 0;

			var result = filter.processFilter(sourceBytes, imageSize, amount);

			expect(result).to.be.equal(sourceBytes);

			//
		});

		it("should apply filter if amount not equal zero", function() {

			var amount = 1;

			var result = filter.processFilter(sourceBytes, imageSize, amount);

			expect(toArray(result)).to.have.members([
				79, 79, 79, 255, 135, 135, 135, 255, 184, 184, 184, 255,
				135, 135, 135, 255, 128, 128, 128, 255, 135, 135, 135, 255,
				184, 184, 184, 255, 135, 135, 135, 255, 79, 79, 79, 255
			]);

		});
	});
})();
