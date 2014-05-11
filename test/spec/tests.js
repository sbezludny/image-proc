/* global describe, assert, should, expect, it, beforeEach, sampleImage, Improcjs */

(function() {
	"use strict";

	var imageData = null,
		sampleImage = [
			239, 239, 239, 255, 167, 167, 167, 255, 247, 247, 247, 255,
			143, 143, 143, 255, 0, 0, 0, 255, 175, 175, 175, 255,
			239, 239, 239, 255, 135, 135, 135, 255, 247, 247, 247, 255
		],
		imageSize = {
			width: 3,
			height: 3
		};

	var toArray = function(arrayLike) {
		return Array.prototype.slice.call(arrayLike, 0);
	};

	beforeEach(function() {
		imageData = new Uint8ClampedArray(sampleImage);
	});

	describe("Blur filter", function() {
		it("should not apply if amount equals zero", function() {

			var amount = 0;

			Improcjs.blur.processFilter(imageData, imageSize, amount);

			expect(toArray(imageData)).to.have.members(toArray(sampleImage));


		});

		it("should apply filter if amount not equal zero", function() {

			var amount = 1;

			Improcjs.blur.processFilter(imageData, imageSize, amount);

			expect(toArray(imageData)).to.have.members([
				186, 186, 186, 255, 171, 171, 171, 255, 163, 163, 163, 255,
				166, 166, 166, 255, 146, 146, 146, 255, 137, 137, 137, 255,
				152, 152, 152, 255, 128, 128, 128, 255, 117, 117, 117, 255
			]);

		});

		it("alpha channel not modified", function() {

			var amount = 3;

			Improcjs.blur.processFilter(imageData, imageSize, amount);

			for (var i = 3; i < imageData.length; i = i + 4) {
				expect(imageData[i]).to.be.equal(255);
			}


		});


	});

	describe("Median filter", function() {
		it("should not apply if amount equals zero", function() {

			var amount = 0;

			Improcjs.median.processFilter(imageData, imageSize, amount);

			expect(toArray(imageData)).to.have.members(toArray(sampleImage));


		});

		it("should apply filter if amount not equal zero", function() {

			var amount = 3;

			Improcjs.median.processFilter(imageData, imageSize, amount);

			expect(toArray(imageData)).to.have.members([
				247, 247, 247, 255, 247, 247, 247, 255, 247, 247, 247, 255,
				239, 239, 239, 255, 239, 239, 239, 255, 239, 239, 239, 255,
				239, 239, 239, 255, 239, 239, 239, 255, 247, 247, 247, 255
			]);

		});

		it("alpha channel not modified", function() {

			var amount = 3;

			Improcjs.median.processFilter(imageData, imageSize, amount);

			for (var i = 3; i < imageData.length; i = i + 4) {
				expect(imageData[i]).to.be.equal(255);
			}


		});
	});

	describe("Noise filter", function() {
		it("should not apply if amount equals zero", function() {

			var amount = 0;

			Improcjs.noise.processFilter(imageData, imageSize, amount);

			expect(toArray(imageData)).to.have.members(toArray(sampleImage));


		});

		it("should apply filter if amount not equal zero", function() {

			var noiseValue = 10;

			Improcjs.noise.processFilter(imageData, imageSize, noiseValue);

			for (var i = 0; i < imageData.length; i++) {
				var delta = sampleImage[i] - imageData[i];

				expect(delta).to.be.at.most(5);
			}

		});

		it("alpha channel not modified", function() {

			var amount = 3;

			Improcjs.noise.processFilter(imageData, imageSize, amount);

			for (var i = 3; i < imageData.length; i = i + 4) {
				expect(imageData[i]).to.be.equal(255);
			}


		});
	});
})();
