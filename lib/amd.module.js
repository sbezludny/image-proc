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
