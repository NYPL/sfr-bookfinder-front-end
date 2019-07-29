(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("underscore"), require("react-dom"), require("dgx-react-ga"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "underscore", "react-dom", "dgx-react-ga"], factory);
	else if(typeof exports === 'object')
		exports["dgxHeaderComponent"] = factory(require("react"), require("underscore"), require("react-dom"), require("dgx-react-ga"));
	else
		root["dgxHeaderComponent"] = factory(root["React"], root["underscore"], root["ReactDOM"], root["dgx-react-ga"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_192__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 193);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var require;//! moment.js
//! version : 2.19.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
        }
        else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function mod(n, x) {
    return ((n % x) + x) % x;
}

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            __webpack_require__(179)("./" + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, tmpLocale, parentConfig = baseConfig;
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== config._d.getDay()) {
        getParsingFlags(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];

    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }

    return result;
}

function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
        return 2000 + year;
    } else if (year <= 999) {
        return 1900 + year;
    }
    return year;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
}

function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}

var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};

function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
    }
}

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
            return;
        }

        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);

        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function clone$1 () {
    return createDuration(this);
}

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function sign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

    return totalSign + 'P' +
        (Y ? ymSign + Y + 'Y' : '') +
        (M ? ymSign + M + 'M' : '') +
        (D ? daysSign + D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? hmsSign + h + 'H' : '') +
        (m ? hmsSign + m + 'M' : '') +
        (s ? hmsSign + s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.clone          = clone$1;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.19.3';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(191)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(182)();
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _dgxReactGa = __webpack_require__(192);

var _dgxFeatureFlags = __webpack_require__(18);

var _dgxFeatureFlags2 = _interopRequireDefault(_dgxFeatureFlags);

var _underscore = __webpack_require__(4);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _appConfig = __webpack_require__(7);

var _appConfig2 = _interopRequireDefault(_appConfig);

var _gaConfig = __webpack_require__(17);

var _gaConfig2 = _interopRequireDefault(_gaConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Utils() {
  var _this = this;

  this.formatDate = function (startDate, endDate) {
    var formattedDate = void 0,
        numDaysBetween = function numDaysBetween(start, end) {
      var s = (0, _moment2.default)(start),
          e = (0, _moment2.default)(end);
      return e.diff(s, 'days');
    },
        dateToString = function dateToString(start, end, type) {
      var dateString = void 0,
          months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      if (!start && !end) {
        return;
      }

      // String assignment based on type
      switch (type) {
        case "current":
          dateString = "Open now. Ends " + months[end.getUTCMonth()] + " " + end.getUTCDate() + ", " + end.getUTCFullYear() + ".";
          break;
        case "current-ongoing":
          dateString = "Open now. Ongoing.";
          break;
        case "upcoming":
          dateString = "Opening soon. " + months[start.getUTCMonth()] + " " + start.getUTCDate() + ", " + start.getUTCFullYear() + " - " + months[end.getUTCMonth()] + " " + end.getUTCDate() + ", " + end.getUTCFullYear() + ".";
          break;
        case "upcoming-ongoing":
          dateString = "Opening soon. " + months[start.getUTCMonth()] + " " + start.getUTCDate() + ", " + start.getUTCFullYear() + ".";
          break;
        default:
          dateString = months[start.getUTCMonth()] + " " + start.getUTCDate() + ", " + start.getUTCFullYear() + " - " + months[end.getUTCMonth()] + " " + end.getUTCDate() + ", " + end.getUTCFullYear() + ".";
      }
      return dateString;
    };

    if (startDate && endDate) {
      var sDate = new Date(startDate),
          eDate = new Date(endDate),
          today = new Date(),
          daysBetweenStartEnd = numDaysBetween(sDate, eDate),
          rangeLimit = 365;

      // Current Event and not past 1 year between start and end dates.
      if (sDate.getTime() <= today.getTime() && eDate.getTime() >= today.getTime() && daysBetweenStartEnd < rangeLimit && daysBetweenStartEnd > 0) {
        formattedDate = dateToString(sDate, eDate, 'current');
      }
      // Current Event and past 1 year which implies Ongoing
      else if (sDate.getTime() <= today.getTime() && eDate.getTime() >= today.getTime() && daysBetweenStartEnd > rangeLimit) {
          formattedDate = dateToString(sDate, eDate, 'current-ongoing');
        }
        // Upcoming Event and not past 1 year between start and end dates.
        else if (sDate.getTime() > today.getTime() && eDate.getTime() >= today.getTime() && daysBetweenStartEnd < rangeLimit && daysBetweenStartEnd > 0) {
            formattedDate = dateToString(sDate, eDate, 'upcoming');
          }
          // Upcoming Event and past 1 year which implies Ongoing.
          else {
              formattedDate = dateToString(sDate, eDate, 'upcoming-ongoing');
            }
    }

    return formattedDate;
  };

  /**
   * trackHeader(action, label)
   * Track a GA click event, where action and label come from
   * the higher level function call from _trackEvent().
   *
   * @param {string} action - Action for GA event.
   * @param {string} label - Label for GA event.
   */
  this.trackHeader = _dgxReactGa.gaUtils.trackEvent('Global Header');

  /**
   * createFunctionWithTimeout(callback, optTimeout)
   * The function serves as a pipe to return the function that is passed to it.
   * It also searves as a timer to execute that function after a certain amount of time.
   *
   * @param {Function} callback - The function to be executed after the time of optTimeout
   * @param {Number} optTimeout
   * @return {Function}
   */
  this.createFunctionWithTimeout = function (callback, optTimeout) {
    var called = false;

    var fn = function fn() {
      if (!called) {
        called = true;
        callback();
      }
    };

    setTimeout(fn, optTimeout || 500);

    return fn;
  };

  /**
   * trackSearchQuerySend = (label = '', dimensions = {})
   * Track a GA click event with custom dimensions.
   * The parameter "dimensions" should be an object with dimensions listed as the following format,
   * { dimensions1: 'value1', dimensions2: 'value2', ... }
   * This function will send GA event first, and after it is completed, it will trigger the
   * original event.
   *
   * @param {string} label - Label for GA event.
   * @param {object} dimensions - the object that consists the custom dimensions for the event.
   * @param {function} hitCallback - the function to be executed after sending GA is completed.
   */
  this.trackSearchQuerySend = function () {
    var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var dimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var hitCallback = arguments[2];

    _dgxReactGa.ga.ga('send', 'event', _gaConfig2.default.eventCategory, _gaConfig2.default.eventAction, label, 0, dimensions, { hitCallback: _this.createFunctionWithTimeout(hitCallback) });
  };

  /**
   * setDimensions(dimensions)
   * Set the dimensions for GA events. The scope is decided by the admin of the GA platform.
   * This function will set the dimensions that affect all the hits on the same page.
   *
   * @param {array} dimensions - The array of dimensions. Each dimension includes two properties:
   * the index and the value.
   */
  this.setDimensions = function (dimensions) {
    _dgxReactGa.gaUtils.setDimensions(dimensions);
  };

  /**
   * encodeURI(sKey)
   * Enocode the cookie response.
   *
   * @param {string} sKey -  The name of the cookie to be looked up.
   */
  this.encodeURI = function (sKey) {
    return encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&');
  };

  /**
   * getCookie(sKey)
   * Get a cookie based on its name.
   *
   * @param {string} sKey - The name of the cookie to be looked up.
   */
  this.getCookie = function (sKey) {
    if (!sKey) {
      return null;
    }

    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + _this.encodeURI(sKey) + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
  };

  /**
   * hasCookie(sKey)
   * See if a specific cookie.
   *
   * @param {string} sKey - The name of the cookie to be looked up.
   */
  this.hasCookie = function (sKey) {
    if (!sKey) {
      return false;
    }

    return new RegExp('(?:^|;\\s*)' + _this.encodeURI(sKey) + '\\s*\\=').test(document.cookie);
  };

  /**
   * setCookie(name, value, maxAge)
   * Sets a cookie with a given name, value and defaults the expiration to 24 hours in seconds
   *
   * @param {string} name - The name of the cookie to be looked up.
   * @param {string} value - value of the given cookie.
   * @param {string} maxAge - string representation of cookie's maximum age in seconds
   */
  this.setCookie = function (name, value) {
    var maxAge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '86400';

    if (!name || !value) {
      return false;
    }

    var expires = ' max-age=' + maxAge + ';';
    var pathAndDomain = ' path=/; domain=.nypl.org;';

    document.cookie = encodeURI(name) + '=' + encodeURI(value) + ';' + expires + pathAndDomain;
  };

  /**
   * deleteCookie(sKey)
   * Delete the cookie by having it expired.
   *
   * @param {string} sKey - The name of the cookie to be looked up.
   */
  this.deleteCookie = function (sKey) {
    document.cookie = sKey + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ' + 'path=/; domain=.nypl.org;';
  };

  /**
   * getLoginData(cookie, cb, refreshLink, refreshCookieCb, logOutLink)
   * Handle the cookie from log in and make api calls with the callback function passed in.
   * If the returned statusCode is 401 and the cookie is expired, invoke refreshAccessToken()
   * to refresh access_token in the nyplIdentityPatron cookie.
   *
   * @param {string} cookie - The cookie returned.
   * @param {function(result: Object)} cb - The callback function passed in for dealing with data
   * responses.
   * @param {string} refreshLink - The link to call for refreshing access_token
   * @param {function(result: Object)} refreshCookieCb - The callback function passed in for cookie
   * refreshing mechanism.
   */
  this.getLoginData = function (cookie, cb, refreshLink, refreshCookieCb) {
    var decodedToken = JSON.parse(cookie).access_token;
    var endpoint = '' + _appConfig2.default.patronApiUrl + decodedToken;

    _axios2.default.get(endpoint).then(cb).catch(function (response) {
      if (response instanceof Error) {
        console.warn(response.message);
      } else {
        // If the cookie for getting log in Data is expired
        if (response.data.statusCode === 401 && response.data.expired === true) {
          _this.refreshAccessToken(refreshLink, refreshCookieCb, function () {
            _this.deleteCookie('nyplIdentityPatron');
          });
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx and it is not 401 with the expired token
          console.warn(response.data);
          console.warn(response.status);
          console.warn(response.headers);
          console.warn(response.config);
        }
      }
    });
  };

  /**
   * refreshAccessToken(cb)
   * Hit the refresh endpoint to set new cookie value.
   *
   * @param {function(result: Object)} cb - The callback function passed in after the cookie
   * has been refreshed.
   */
  this.refreshAccessToken = function (api, cb, fallBackCb) {
    _axios2.default.get(api, { withCredentials: true }).then(cb).catch(function (response) {
      if (response instanceof Error) {
        fallBackCb();
        console.warn(response.message);
      } else {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.warn(response.status);
        console.warn(response.headers);
        console.warn(response.config);
        fallBackCb();
      }
    });
  };

  this.logOut = function (link) {
    window.location.href = link;
  };

  /**
   * extractPatronName(data)
   * Dig in the returned patron data to extract the patron's name.
   *
   * @param {Object} data - The returned patron data.
   */
  this.extractPatronName = function (data) {
    try {
      var _data$data$patron$nam = _slicedToArray(data.data.patron.names, 1),
          patronName = _data$data$patron$nam[0];

      return patronName;
    } catch (e) {
      return null;
    }
  };

  /**
   * modelPatronName (name)
   * Model the returned patron name data to get a string of the full name
   * and a string of the initial.
   *
   * @param {string} name - The name data returned.
   * @return {Object} The object contains the modeled patron name and initial.
   */
  this.modelPatronName = function (name) {
    if (!name) {
      return { name: '', initial: '' };
    }

    var nameArray = name.replace(/ /g, '').split(',').reverse();
    var initialArray = (0, _underscore.map)(nameArray, function (item) {
      return item.charAt(0);
    });
    var patronInitial = initialArray.join('');

    return { name: name, initial: patronInitial };
  };

  /**
   * renderDynamicLogOutLink (location)
   * Render the log out link URL with redirect URI.
   *
   * @param {string} location - The url it is passed in.
   * @return {String} The log out URL with redirect URI
   */
  this.renderDynamicLogOutLink = function (location) {
    if (!location || location === 'about:blank') {
      return _appConfig2.default.loginMyNyplLinks.logOutLink;
    }

    return _appConfig2.default.loginMyNyplLinks.logOutLink + '?redirect_uri=' + location;
  };

  /**
   * checkFeatureFlagActivated(featureFlagList, componentStateObject)
   * Check if the feature flags have been set. If they have not, activate the function to check
   * if the related cookies are set.
   * @param {string[]} featureFlagList - The list of the feature flags we want to set.
   * @param {object} componentStateObject - The object that points to the state object of
   * the component. The feature flag will change the state of the component through it.
   */
  this.checkFeatureFlagActivated = function (featureFlagList, componentStateObject) {
    (0, _underscore.map)(featureFlagList, function (item) {
      if (!componentStateObject[item]) {
        _this.checkFeatureFlagCookie(item);
      }
    });
  };

  /**
   * checkFeatureFlagCookie(name)
   * Check if the cookie exist. If they do, activate the function to enable
   * the indicated feature flags.
   * @param {string} name - The name of the cookie.
   */
  this.checkFeatureFlagCookie = function (name) {
    if (_this.hasCookie('nyplFeatureFlag' + name)) {
      _dgxFeatureFlags2.default.utils.activateFeature(name);
    }
  };
}

exports.default = new Utils();
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(1)):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.dgxSvgIcons=t(require("react")):e.dgxSvgIcons=t(e.React)}(this,function(e){return function(e){function t(l){if(a[l])return a[l].exports;var i=a[l]={exports:{},id:l,loaded:!1};return e[l].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){e.exports=a(58)},function(e,t,a){(function(t){if("production"!==t.env.NODE_ENV){var l="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103,i=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===l},r=!0;e.exports=a(61)(i,r)}else e.exports=a(60)()}).call(t,a(3))},function(t,a){t.exports=e},function(e,t){function a(){throw new Error("setTimeout has not been defined")}function l(){throw new Error("clearTimeout has not been defined")}function i(e){if(u===setTimeout)return setTimeout(e,0);if((u===a||!u)&&setTimeout)return u=setTimeout,setTimeout(e,0);try{return u(e,0)}catch(t){try{return u.call(null,e,0)}catch(t){return u.call(this,e,0)}}}function r(e){if(c===clearTimeout)return clearTimeout(e);if((c===l||!c)&&clearTimeout)return c=clearTimeout,clearTimeout(e);try{return c(e)}catch(t){try{return c.call(null,e)}catch(t){return c.call(this,e)}}}function n(){g&&h&&(g=!1,h.length?p=h.concat(p):v=-1,p.length&&d())}function d(){if(!g){var e=i(n);g=!0;for(var t=p.length;t;){for(h=p,p=[];++v<t;)h&&h[v].run();v=-1,t=p.length}h=null,g=!1,r(e)}}function s(e,t){this.fun=e,this.array=t}function o(){}var u,c,f=e.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:a}catch(e){u=a}try{c="function"==typeof clearTimeout?clearTimeout:l}catch(e){c=l}}();var h,p=[],g=!1,v=-1;f.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var a=1;a<arguments.length;a++)t[a-1]=arguments[a];p.push(new s(e,t)),1!==p.length||g||i(d)},s.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=o,f.addListener=o,f.once=o,f.off=o,f.removeListener=o,f.removeAllListeners=o,f.emit=o,f.prependListener=o,f.prependOnceListener=o,f.listeners=function(e){return[]},f.binding=function(e){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(e){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(e,t){"use strict";function a(e){return function(){return e}}var l=function(){};l.thatReturns=a,l.thatReturnsFalse=a(!1),l.thatReturnsTrue=a(!0),l.thatReturnsNull=a(null),l.thatReturnsThis=function(){return this},l.thatReturnsArgument=function(e){return e},e.exports=l},function(e,t,a){(function(t){"use strict";function a(e,t,a,i,r,n,d,s){if(l(t),!e){var o;if(void 0===t)o=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[a,i,r,n,d,s],c=0;o=new Error(t.replace(/%s/g,function(){return u[c++]})),o.name="Invariant Violation"}throw o.framesToPop=1,o}}var l=function(e){};"production"!==t.env.NODE_ENV&&(l=function(e){if(void 0===e)throw new Error("invariant requires an error message argument")}),e.exports=a}).call(t,a(3))},function(e,t){"use strict";var a="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=a},function(e,t,a){(function(t){"use strict";var l=a(4),i=l;if("production"!==t.env.NODE_ENV){var r=function(e){for(var t=arguments.length,a=Array(t>1?t-1:0),l=1;l<t;l++)a[l-1]=arguments[l];var i=0,r="Warning: "+e.replace(/%s/g,function(){return a[i++]});"undefined"!=typeof console&&console.error(r);try{throw new Error(r)}catch(n){}};i=function(e,t){if(void 0===t)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==t.indexOf("Failed Composite propType: ")&&!e){for(var a=arguments.length,l=Array(a>2?a-2:0),i=2;i<a;i++)l[i-2]=arguments[i];r.apply(void 0,[t].concat(l))}}}e.exports=i}).call(t,a(3))},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.iconId,n=e.preserveAspectRatio,d=e.title,s=e.viewBox,o=e.width;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":i,className:a+" svgIcon",height:l,preserveAspectRatio:n,viewBox:s,width:o},r["default"].createElement("title",{id:i},d),r["default"].createElement("g",null,r["default"].createElement("path",{d:"M47.1181,31.16626v9.81838a7.69657,7.69657,0,0,1-7.69659,7.69659H14.65722a7.69657,7.69657,0,0,1-7.69659-7.69659V16.22035a7.69657,7.69657,0,0,1,7.69659-7.69659h24.7643A7.68562,7.68562,0,0,1,46.04723,12.318v-.029l4.98249-4.98249A14.61787,14.61787,0,0,0,39.42151,1.56313H14.65722A14.67381,14.67381,0,0,0,0,16.22035v24.7643A14.67381,14.67381,0,0,0,14.65722,55.64186h24.7643A14.67381,14.67381,0,0,0,54.07873,40.98464V24.20557Z"}),r["default"].createElement("path",{d:"M66.88559,1.11424q-.04628-.04628-.09412-.09092a3.8044,3.8044,0,0,0-5.28616.091L52.99074,9.62894,47.1181,15.50158,32.5635,30.05624,17.90785,15.40066a3.80454,3.80454,0,0,0-5.39511,5.3657l.01458.01458L32.5635,40.81739,47.1181,26.26266,54.07873,19.302,66.88565,6.49491A3.80469,3.80469,0,0,0,66.88559,1.11424Z"})))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,preserveAspectRatio:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string},s.defaultProps={ariaHidden:!0,className:"apply-icon",height:"68",preserveAspectRatio:"xMidYMid meet",title:"apply",viewBox:"0 0 68 55",width:"55"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":d},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M16,4.0625A11.9375,11.9375,0,1,0,27.9375,16,11.9375,11.9375,0,0,0,16,4.0625ZM16,19.75A3.75,3.75,0,1,1,19.75,16,3.75,3.75,0,0,1,16,19.75Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"audio-disc-icon",title:"NYPL Audio Disc SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":d},r["default"].createElement("title",null,i),r["default"].createElement("g",null,r["default"].createElement("path",{d:"M7.50842,19.29355A0.94557,0.94557,0,0,1,6.56284,18.348V15.376a9.47232,9.47232,0,0,1,18.94464,0v2.91654a0.94558,0.94558,0,0,1-1.89117,0V15.376a7.58115,7.58115,0,0,0-15.16231,0v2.972A0.94557,0.94557,0,0,1,7.50842,19.29355Z"}),r["default"].createElement("g",null,r["default"].createElement("path",{d:"M21.82651,23.66863a0.94557,0.94557,0,0,1-.94558-0.94558V16.22111a0.94558,0.94558,0,0,1,1.89117,0V22.723A0.94557,0.94557,0,0,1,21.82651,23.66863Z"}),r["default"].createElement("path",{d:"M10.24381,23.75a0.94557,0.94557,0,0,1-.94558-0.94558V16.22111a0.94558,0.94558,0,1,1,1.89117,0v6.58331A0.94557,0.94557,0,0,1,10.24381,23.75Z"}))))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"audio-headphone-icon",title:"NYPL Audio/Headphone SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden,s=e.preserveAspectRatio;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":d,preserveAspectRatio:s},r["default"].createElement("title",null,i),r["default"].createElement("g",null,r["default"].createElement("path",{d:"M26.09478,8.31652A13.1617,13.1617,0,0,0,15.97189,8.1603a13.079,13.079,0,0,0-10.09165.18746,0.88881,0.88881,0,0,0-.46865.84357V21.81371a0.89164,0.89164,0,0,0,.37492.81233,0.93487,0.93487,0,0,0,.90606.06249,11.44018,11.44018,0,0,1,8.9044,0c0.03124,0,.03124,0,0.03124.03124a0.06237,0.06237,0,0,1,.06249.03124,0.70873,0.70873,0,0,0,.125.03124h0.18746a0.5317,0.5317,0,0,0,.2187-0.03124,0.06237,0.06237,0,0,0,.06249-0.03124,0.70873,0.70873,0,0,1,.125-0.03124,11.464,11.464,0,0,1,8.9044,0,0.86486,0.86486,0,0,0,.40617.09373A1.05326,1.05326,0,0,0,26.251,22.626a0.94244,0.94244,0,0,0,.43741-0.81233V9.19133A1.04849,1.04849,0,0,0,26.09478,8.31652ZM24.78256,20.439a13.30172,13.30172,0,0,0-8.74818.34368A13.26349,13.26349,0,0,0,7.2862,20.439V9.8162a11.30538,11.30538,0,0,1,8.342.2187c0.03124,0,.03124,0,0.03124.03124a0.06237,0.06237,0,0,1,.06249.03124,0.70872,0.70872,0,0,0,.125.03124h0.34368a0.11478,0.11478,0,0,0,.09373-0.03124c0.03125,0,.06249-0.03124.09373-0.03124,0,0,.06249,0,0.06249-0.03124a11.51979,11.51979,0,0,1,8.37326-.2187V20.439H24.78256Z"}),r["default"].createElement("path",{d:"M16.00313,17.81454a0.76028,0.76028,0,0,1-.74984-0.74984V13.378a0.74984,0.74984,0,0,1,1.49969,0V17.0647A0.74014,0.74014,0,0,1,16.00313,17.81454Z"})))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,preserveAspectRatio:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"book-icon",title:"NYPL Book SVG Icon",height:"24px",width:"24px",viewBox:"0 0 32 32",preserveAspectRatio:"xMidYMid meet"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.style,s=e.ariaHidden,o=e.preserveAspectRatio,u=e.iconId,c=e.svgRole,f=e.focusable;return r["default"].createElement("svg",{viewBox:t,height:a,width:l,className:n+" svgIcon",style:d,"aria-hidden":s,preserveAspectRatio:o,"aria-labelledby":u,role:c,focusable:f},r["default"].createElement("title",{id:u},i),r["default"].createElement("path",{d:"M13.329 9.245a1.466 1.466 0 0 0 .766-.217l9.536-5.834 9.536 5.834a1.47 1.47 0 0 0 1.535-2.509L24.398.216a1.473 1.473 0 0 0-1.535 0L12.56 6.519a1.47 1.47 0 0 0 .769 2.726zM45.811 36.982h-1.564V20.08h1.423a1.51 1.51 0 0 0 0-3.018h-5.817a1.51 1.51 0 0 0 0 3.018h1.376v16.902H6.218V20.08h1.8a1.51 1.51 0 0 0 0-3.018H2.202a1.51 1.51 0 0 0 0 3.018h.997v16.902H1.47a1.51 1.51 0 0 0 0 3.018h44.341a1.51 1.51 0 0 0 0-3.018z"}),r["default"].createElement("path",{d:"M21.007 35.128a1.504 1.504 0 0 0 1.509-1.47V22.512a5.435 5.435 0 1 0-10.866 0v11.146a1.51 1.51 0 0 0 3.019 0V22.512a2.424 2.424 0 1 1 4.829 0v11.146a1.504 1.504 0 0 0 1.509 1.47zM34.287 35.128a1.504 1.504 0 0 0 1.509-1.47V22.512a5.435 5.435 0 1 0-10.866 0v11.146a1.51 1.51 0 0 0 3.019 0V22.512a2.424 2.424 0 1 1 4.829 0v11.146a1.504 1.504 0 0 0 1.509 1.47zM2.06 14.647h43.613a1.51 1.51 0 0 0 0-3.018H2.06a1.51 1.51 0 0 0 0 3.018z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,style:d["default"].object,ariaHidden:d["default"].bool,preserveAspectRatio:d["default"].string,svgRole:d["default"].string,iconId:d["default"].string,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"bldgIcon",height:"40",preserveAspectRatio:"xMidYMid meet",svgRole:"img",title:"NYPL Building Icon",viewBox:"0 0 47.282 40",width:"47.282"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){return r["default"].createElement("path",{d:"M12,4a8,8,0,1,1-8,8,8.00906,8.00906,0,0,1,8-8m0-4A12,12,0,1,0,24,12,12,12,0,0,0,12,0h0Z",fill:e})},o=function(e){return r["default"].createElement("path",{d:"M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0h0Z",fill:e})},u=function(e){var t=e.className,a=e.title,l=e.type,i=e.height,n=e.width,d=e.viewBox,u=e.fill,c=e.ariaHidden;return r["default"].createElement("svg",{className:t+" svgIcon",width:n,height:i,viewBox:d,"aria-hidden":c},r["default"].createElement("title",null,a),"solid"!==l?s(u):o(u))};u.propTypes={className:d["default"].string,title:d["default"].string,type:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool},u.defaultProps={className:"nyplCarouselCircle-icon",title:"NYPL Carousel Circle SVG Icon",ref:"nyplCarouselCircle",type:"",height:"24px",width:"24px",viewBox:"0 0 24 24",fill:"#000"},t["default"]=u},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden,s=e.focusable;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":d,focusable:s},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M25.51266,9.42987a1.40287,1.40287,0,0,0-1.94927.03357L12.891,20.13586,7.48668,14.73156a1.40294,1.40294,0,1,0-1.9841,1.984L12.891,24.10406,25.5474,11.44754A1.403,1.403,0,0,0,25.51266,9.42987Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,ariaHidden:d["default"].bool,focusable:d["default"].bool},s.defaultProps={className:"check-solo-icon",title:"NYPL Check Solo SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.fill,s=e.ariaHidden;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon",fill:d,"aria-hidden":s},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M16,3A13,13,0,1,1,3,16,13.0147,13.0147,0,0,1,16,3m0-3A16,16,0,1,0,32,16,16,16,0,0,0,16,0h0Z"}),r["default"].createElement("path",{d:"M24,14H8a2.0025,2.0025,0,0,0,0,4H24A2.0025,2.0025,0,0,0,24,14Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"circle-dash-icon",title:"NYPL Circle Dash SVG Icon",width:"24",height:"24",viewBox:"0 0 32 32",fill:"#000"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.length,n=e.stroke,d=e.strokeWidth,s=e.title,o=e.viewBox,u=e.width;return r["default"].createElement("svg",{"aria-hidden":t,className:a+" svgIcon",height:l,viewBox:o,width:u},r["default"].createElement("title",null,s),r["default"].createElement("line",{x1:"0",y1:"0",x2:i,y2:"0",stroke:n,strokeWidth:d}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,length:d["default"].string,stroke:d["default"].string,strokeWidth:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string},s.defaultProps={ariaHidden:!0,className:"divideLine-icon",height:"2",length:"84",stroke:"#000",strokeWidth:"2",title:"NYPL Divide Line SVG Icon",viewBox:"0 0 84 2",width:"84"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.className,a=e.title,l=e.height,i=e.width,n=e.viewBox,d=e.fill,s=e.ariaHidden;return r["default"].createElement("svg",{width:i,height:l,viewBox:n,className:t+" svgIcon",fill:d,"aria-hidden":s},r["default"].createElement("title",null,a),r["default"].createElement("circle",{cx:"16",cy:"16",r:"1.9029"}),r["default"].createElement("circle",{cx:"24",cy:"16",r:"1.9029"}),r["default"].createElement("circle",{cx:"8",cy:"16",r:"1.9029"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"dotsIcon",title:"NYPL Dots SVG Icon",height:"24px",width:"24px",viewBox:"0 0 32 32",fill:"#000"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.iconId,n=e.title,d=e.viewBox,s=e.width;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":i,className:a+" svgIcon",height:l,viewBox:d,width:s},r["default"].createElement("title",{id:i},n),r["default"].createElement("path",{d:"M23.26,13.1819a1.2736,1.2736,0,0,0-1.7332,0L17,17.6253V6.1041a1.0119,1.0119,0,1,0-2,0V17.6253l-4.5268-4.4434a1.2212,1.2212,0,0,0-1.6916,0,1.17,1.17,0,0,0-.0208,1.65L15.1786,21.26l0,0.0083a1.1694,1.1694,0,0,0,1.6488,0l0.0048-.0083L23.26,14.8318A1.17,1.17,0,0,0,23.26,13.1819Z"}),r["default"].createElement("rect",{x:"14.8333",y:"16.3602",width:"2.3333",height:"16.6711",rx:"1.1667",ry:"1.1667",transform:"translate(-8.6957 40.6957) rotate(-90)"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string},s.defaultProps={ariaHidden:!0,className:"download-icon",height:"32",title:"Download",viewBox:"0 0 32 32",width:"32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.fill,s=e.ariaHidden;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":s,fill:d},r["default"].createElement("title",null,i),r["default"].createElement("circle",{cx:"16",cy:"16",r:"3.75",fill:"none"}),r["default"].createElement("path",{d:"M16,10.625A5.375,5.375,0,1,0,21.375,16,5.381,5.381,0,0,0,16,10.625Zm0,9.125A3.75,3.75,0,1,1,19.75,16,3.75,3.75,0,0,1,16,19.75Z"}),r["default"].createElement("path",{d:"M16,4.0625A11.9375,11.9375,0,1,0,27.9375,16,11.9375,11.9375,0,0,0,16,4.0625Zm0,19.65625A7.71875,7.71875,0,1,1,23.71875,16,7.72719,7.72719,0,0,1,16,23.71875Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"dvd-disc-icon",title:"NYPL DVD Disc SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":d},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M23.02352,5.00588H9.00588a2.38332,2.38332,0,0,0-2,2.00588V24.99412A2.45762,2.45762,0,0,0,9,27.00588H22.99412A2.22259,2.22259,0,0,0,24.98824,25V6.98843a1.97259,1.97259,0,0,0-1.6106-1.94478ZM23,23.99608H9V7.0002l14.02352-.01178Z"}),r["default"].createElement("path",{d:"M20.61338,9.99038h-9.186a0.456,0.456,0,0,1,0-.9121h9.12081a0.44532,0.44532,0,0,1,.456.456,0.43566,0.43566,0,0,1-.3909.456h0Z"}),r["default"].createElement("path",{d:"M20.642,13H11.456a0.50163,0.50163,0,1,1,0-1h9.12081a0.674,0.674,0,0,1,.6497.49219A0.74346,0.74346,0,0,1,20.642,13h0Z"}),r["default"].createElement("path",{d:"M20.65624,15.956h-9.186a0.456,0.456,0,1,1,0-.9121h9.12081a0.44532,0.44532,0,0,1,.456.456,0.43566,0.43566,0,0,1-.3909.456h0Z"}),r["default"].createElement("path",{d:"M20.55608,18.9121h-9.186a0.456,0.456,0,1,1,0-.9121h9.12081a0.44532,0.44532,0,0,1,.456.456,0.43566,0.43566,0,0,1-.3909.456h0Z"}),r["default"].createElement("path",{d:"M20.61338,21.98237h-9.186a0.456,0.456,0,0,1,0-.9121h9.12081a0.44532,0.44532,0,0,1,.456.456,0.43566,0.43566,0,0,1-.3909.456h0Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"eReader-icon",title:"NYPL eReader SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.iconId,n=e.preserveAspectRatio,d=e.title,s=e.viewBox,o=e.width,u=e.focusable;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":i,className:a+" svgIcon",height:l,preserveAspectRatio:n,viewBox:s,width:o,focusable:u},r["default"].createElement("title",{id:i},d),r["default"].createElement("path",{d:"M46.052 36.91H1.948A1.938 1.938 0 0 1 0 34.981V1.927A1.937 1.937 0 0 1 1.948 0h44.104A1.938 1.938 0 0 1 48 1.927v33.055a1.938 1.938 0 0 1-1.948 1.927zM3.896 33.054h40.208V3.854H3.896z"}),r["default"].createElement("path",{d:"M24 25.007a1.915 1.915 0 0 1-1.176-.402l-11.93-9.251a1.925 1.925 0 0 1 2.352-3.049L24 20.644l10.754-8.339a1.925 1.925 0 0 1 2.352 3.049l-11.93 9.25a1.917 1.917 0 0 1-1.176.403z"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,preserveAspectRatio:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"envelope-icon",height:"48",preserveAspectRatio:"xMidYMid meet",title:"mail",viewBox:"0 0 48 36.909",width:"36.909"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.iconId,i=e.height,n=e.preserveAspectRatio,d=e.title,s=e.viewBox,o=e.width,u=e.focusable;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":l,className:a+" svgIcon",height:i,preserveAspectRatio:n,title:d,viewBox:s,width:o,focusable:u},r["default"].createElement("title",{id:l},d),r["default"].createElement("path",{d:"M7.1267,13.68408v9.7265H0V35.30576H7.1267V67.94592H21.76584V35.30576H31.588s.9207-5.70326,1.36529-11.94H21.82116v-8.1318a3.45468,3.45468,0,0,1,3.17363-2.85086h7.9757V0H22.12679C6.76506,0,7.1267,11.90635,7.1267,13.68408Z"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,preserveAspectRatio:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"face-book-icon",height:"32",preserveAspectRatio:"xMidYMid meet",title:"Facebook",viewBox:"0 0 32 67",width:"67"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.title,n=e.viewBox,d=e.width;return r["default"].createElement("svg",{"aria-hidden":t,className:a+" svgIcon",height:l,viewBox:n,width:d},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M21.649 67.67a2.657 2.657 0 0 1-2.657-2.657V36.3L.706 16.584a2.657 2.657 0 1 1 3.902-3.608l19.697 21.242v30.795a2.657 2.657 0 0 1-2.656 2.656zM32.441 59.93a2.657 2.657 0 0 1-2.656-2.656V34.235l19.922-21.848a2.657 2.657 0 0 1 3.943 3.563L35.098 36.283v20.991a2.657 2.657 0 0 1-2.657 2.657zM29.36 10.54l7.325-7.325A1.884 1.884 0 0 0 34.02.552l-7.325 7.325L19.37.552a1.884 1.884 0 1 0-2.664 2.663l7.325 7.326-7.325 7.325a1.884 1.884 0 1 0 2.664 2.664l7.325-7.326 7.325 7.326a1.884 1.884 0 1 0 2.664-2.664z"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,title:d["default"].string,width:d["default"].string,viewBox:d["default"].string},s.defaultProps={ariaHidden:!0,className:"filter-cancel-icon",height:"67.669",title:"NYPL Cancel Filter SVG Icon",width:"54.333",viewBox:"0 0 54.333 67.669"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.fill,i=e.height,n=e.title,d=e.viewBox,s=e.width;return r["default"].createElement("svg",{"aria-hidden":t,className:a+" svgIcon",fill:l,height:i,viewBox:d,width:s},r["default"].createElement("title",null,n),r["default"].createElement("g",null,r["default"].createElement("circle",{cx:"13.0944",cy:"7.375",r:"1.3192"}),r["default"].createElement("circle",{cx:"19.6222",cy:"6.375",r:"1.3189"}),r["default"].createElement("circle",{cx:"15.9997",cy:"10.5242",r:"1.3193"}),r["default"].createElement("g",null,r["default"].createElement("path",{d:"M14.1785,27.562a0.95,0.95,0,0,1-.95-0.95v-10.27L6.6875,9.2893a0.95,0.95,0,0,1,1.3956-1.29l7.0455,7.598v11.015A0.95,0.95,0,0,1,14.1785,27.562Z"}),r["default"].createElement("path",{d:"M18.0387,24.794a0.95,0.95,0,0,1-.95-0.95V15.603l7.126-7.8149a0.95,0.95,0,0,1,1.41,1.2744l-6.636,7.2729v7.5083A0.95,0.95,0,0,1,18.0387,24.794Z"}))))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,fill:d["default"].string,height:d["default"].string,title:d["default"].string,width:d["default"].string,viewBox:d["default"].string},s.defaultProps={ariaHidden:!0,className:"filter-icon",fill:"#000",height:"32",title:"NYPL Filter SVG Icon",width:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden,s=e.preserveAspectRatio,o=e.iconId,u=e.svgRole,c=e.focusable;return r["default"].createElement("svg",{viewBox:t,height:a,width:l,className:n+" svgIcon","aria-hidden":d,preserveAspectRatio:s,"aria-labelledby":o,role:u,focusable:c},r["default"].createElement("title",{id:o},i),r["default"].createElement("path",{d:"M17.749 26.818L6.205 15.288 17.832 3.592a2.075 2.075 0 0 0 .01-2.901 2.278 2.278 0 0 0-3.243-.026L0 15.225 14.693 29.87a2.16 2.16 0 0 0 3.065-.016 2.16 2.16 0 0 0-.01-3.036z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,style:d["default"].object,ariaHidden:d["default"].bool,preserveAspectRatio:d["default"].string,svgRole:d["default"].string,iconId:d["default"].string,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"GenericWedgeIcon",title:"NYPL Wedge Down Icon",width:"30.5",height:"18.428",viewBox:"0 0 18.428 30.5",preserveAspectRatio:"xMidYMid meet",svgRole:"img"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":d},r["default"].createElement("title",null,i),r["default"].createElement("rect",{x:"8",y:"8",width:"7",height:"7"}),r["default"].createElement("rect",{x:"17",y:"8",width:"7",height:"7"}),r["default"].createElement("rect",{x:"8",y:"17",width:"7",height:"7"}),r["default"].createElement("rect",{x:"17",y:"17",width:"7",height:"7"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"grid-icon",title:"NYPL Grid SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.iconId,i=e.height,n=e.preserveAspectRatio,d=e.title,s=e.viewBox,o=e.width;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":l,className:a+" svgIcon",height:i,preserveAspectRatio:n,title:d,viewBox:s,width:o},r["default"].createElement("title",{id:l},d),r["default"].createElement("path",{d:"M47.832 41.697a6.167 6.167 0 0 1-6.135 6.136H6.135A6.167 6.167 0 0 1 0 41.697V6.135A6.167 6.167 0 0 1 6.135 0h35.562a6.167 6.167 0 0 1 6.135 6.135zm-5.418-21.455H38.21a13.628 13.628 0 0 1 .622 4.079 14.651 14.651 0 0 1-14.885 14.418A14.644 14.644 0 0 1 9.093 24.321a13.621 13.621 0 0 1 .623-4.08H5.325v20.18a1.888 1.888 0 0 0 1.9 1.9h33.29a1.887 1.887 0 0 0 1.899-1.9zm-18.467-5.73a9.46 9.46 0 0 0-9.591 9.311 9.46 9.46 0 0 0 9.591 9.31 9.466 9.466 0 0 0 9.623-9.31 9.466 9.466 0 0 0-9.623-9.311zm18.467-7.038a2.153 2.153 0 0 0-2.15-2.148h-5.418a2.153 2.153 0 0 0-2.148 2.148v5.138a2.153 2.153 0 0 0 2.148 2.15h5.419a2.153 2.153 0 0 0 2.149-2.15z"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,preserveAspectRatio:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string},s.defaultProps={ariaHidden:!0,className:"instagram-icon",height:"47.832",preserveAspectRatio:"xMidYMid meet",title:"Instagram",viewBox:"0 0 47.832 47.833",width:"47.832"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":d},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M7.132,6.0411H24.97514l0.16949,5.36219h-0.755a6.43678,6.43678,0,0,0-1.40988-3.28973q-0.85518-.76272-3.5979-0.76272H17.62525V23.499q0,1.824.57012,2.25992a5.26381,5.26381,0,0,0,2.49619.57525v0.58553H11.49263V26.3342a4.36809,4.36809,0,0,0,2.49619-.66,4.1201,4.1201,0,0,0,.49307-2.545V7.35083h-1.772a6.022,6.022,0,0,0-3.56709.755,5.57976,5.57976,0,0,0-1.42529,3.29744H6.9471Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,
ariaHidden:d["default"].bool},s.defaultProps={className:"large-print-icon",title:"NYPL Large Print SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden,s=e.preserveAspectRatio,o=e.iconId,u=e.svgRole,c=e.focusable;return r["default"].createElement("svg",{viewBox:t,height:a,width:l,className:n+" svgIcon","aria-hidden":d,preserveAspectRatio:s,"aria-labelledby":o,role:u,focusable:c},r["default"].createElement("title",{id:o},i),r["default"].createElement("polygon",{points:"16.959 24.065 9.905 16.963 27.298 16.963 27.298 14.548 9.905 14.548 16.959 7.397 15.026 5.417 4.688 15.707 15.026 25.998 16.959 24.065"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,style:d["default"].object,ariaHidden:d["default"].bool,preserveAspectRatio:d["default"].string,svgRole:d["default"].string,iconId:d["default"].string,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"leftArrowIcon",title:"NYPL Left Arrow Icon",width:"32",height:"32",viewBox:"0 0 32 32",preserveAspectRatio:"xMidYMid meet",svgRole:"img"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.fill,i=e.height,n=e.title,d=e.viewBox,s=e.width;return r["default"].createElement("svg",{"aria-hidden":t,className:a+" svgIcon",fill:l,height:i,viewBox:d,width:s},r["default"].createElement("title",null,n),r["default"].createElement("polygon",{points:"19.156 23.563 11.593 16 19.156 8.438 20.563 9.845 14.408 16 20.563 22.155 19.156 23.563"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,fill:d["default"].string,height:d["default"].string,title:d["default"].string,width:d["default"].string,viewBox:d["default"].string},s.defaultProps={ariaHidden:!0,className:"left-wedge-icon",fill:"#000",height:"32",title:"NYPL Left Wedge SVG Icon",width:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.iconId,n=e.preserveAspectRatio,d=e.title,s=e.viewBox,o=e.width,u=e.focusable;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":i,className:a+" svgIcon",height:l,preserveAspectRatio:n,viewBox:s,width:o,focusable:u},r["default"].createElement("title",{id:i},d),r["default"].createElement("path",{d:"M61.554 46.28H6.824A6.832 6.832 0 0 1 0 39.453V6.824A6.833 6.833 0 0 1 6.825 0h54.729a6.832 6.832 0 0 1 6.823 6.825v32.63a6.832 6.832 0 0 1-6.823 6.824zM6.824 3.31A3.52 3.52 0 0 0 3.31 6.824v32.63a3.52 3.52 0 0 0 3.516 3.515h54.729a3.519 3.519 0 0 0 3.514-3.516V6.824a3.519 3.519 0 0 0-3.514-3.515z"}),r["default"].createElement("path",{d:"M56.943 14.56H42.59a1.707 1.707 0 1 1 0-3.413h14.353a1.707 1.707 0 0 1 0 3.413zM56.943 20.971H42.59a1.707 1.707 0 1 1 0-3.413h14.353a1.707 1.707 0 1 1 0 3.413zM56.943 27.382H42.59a1.707 1.707 0 1 1 0-3.414h14.353a1.707 1.707 0 1 1 0 3.414zM22.471 14.335c1.003 0 1.851 1.129 1.851 2.465s-.848 2.464-1.85 2.464-1.852-1.128-1.852-2.464.848-2.465 1.851-2.465m0-3.111c-2.597 0-4.703 2.496-4.703 5.576s2.106 5.576 4.703 5.576 4.703-2.497 4.703-5.576-2.106-5.576-4.703-5.576zM22.403 24.634a49.169 49.169 0 0 0-7.08.613 2.834 2.834 0 0 0-2.175 1.805l-2.26 5.898a2.793 2.793 0 0 0 2.601 3.81h4.106a1.793 1.793 0 0 0 0-3.587l-2.934-.046 1.666-4.35a44.936 44.936 0 0 1 6.076-.557 42.747 42.747 0 0 1 5.961.49l1.71 4.463h-2.892a1.793 1.793 0 0 0 0 3.586h4.105a2.794 2.794 0 0 0 2.6-3.816l-2.318-5.892a2.92 2.92 0 0 0-2.215-1.817 47.371 47.371 0 0 0-6.95-.6z"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,preserveAspectRatio:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"library-card-icon",height:"46.279",preserveAspectRatio:"xMidYMid meet",title:"library-card",viewBox:"0 0 68.377 46.279",width:"68.377"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var d=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),s=a(2),o=l(s),u=a(1),c=l(u),f=function(e){function t(){return i(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return n(t,e),d(t,[{key:"getViewBox",value:function(){return"0 0 "+this.props.width+" "+this.props.height}},{key:"renderSvgIcon",value:function(){return o["default"].createElement("svg",{className:this.props.className+" svgIcon",width:this.props.width,height:this.props.height,viewBox:this.getViewBox(),style:this.props.style,"aria-hidden":this.props.ariaHidden,focusable:this.props.focusable},o["default"].createElement("title",null,this.props.title),o["default"].createElement("ellipse",{cx:"12.503",cy:"12.485",rx:"12.251",ry:"12.24",fill:this.props.fill}),o["default"].createElement("path",{d:"M13.048,8.85a4.934,4.934,0,0,1,.879.322,0.893,0.893,0,0,0,.475.263,0.771,0.771,0,0,0,.352-0.609,1.481,1.481,0,0,0-.076-0.837,1.18,1.18,0,0,0-1.119-.351,2.931,2.931,0,0,0-.773.123c-0.27.082-.644,0.263-0.486,0.638A1.2,1.2,0,0,0,13.048,8.85Z"}),o["default"].createElement("path",{d:"M12.444,0A12.5,12.5,0,1,0,25,12.5,12.468,12.468,0,0,0,12.444,0ZM5.15,21.271a1.841,1.841,0,0,1-.457-0.562c-1.06-1.7-1.658-7.7-.287-9.746,0.434-.714.9-0.386,0.744,0.17a4.505,4.505,0,0,0,.5,3.278c0.949,2,3.873,4.771,4.646,5.777a7.852,7.852,0,0,1,1.764,3.319c-0.006.258-.059,0.427-0.516,0.386A11.339,11.339,0,0,1,5.15,21.271Zm18.344-5.7c-0.094.293-.205,0.661-0.445,0.492a10.744,10.744,0,0,0-2.39-1.317c-0.053-.012-0.047-0.082-0.029-0.123a1.67,1.67,0,0,0,.129-0.468,1.228,1.228,0,0,1,.228-0.41,4.186,4.186,0,0,0,.434-1.5,3.646,3.646,0,0,0-.07-1.188A2.7,2.7,0,0,1,21.2,10.53c0-.17.082-0.345,0.1-0.544a1.614,1.614,0,0,0-1.072-1.235c-0.9-.416-1.851-0.79-2.818-1.305a11.027,11.027,0,0,1-1.424-1.258,10.435,10.435,0,0,0-2.437-1.054,0.228,0.228,0,0,1-.193-0.193,5.677,5.677,0,0,0-2.127-3.3c-0.4-.31.047-0.486,0.6-0.515A11.389,11.389,0,0,1,23.494,15.57Zm-3.527-3.834c-0.006-.047-0.023-0.193-0.023-0.222a0.6,0.6,0,0,1,.24-0.246,2.091,2.091,0,0,1,.334-0.234c0.029-.018.053,0.023,0.059,0.035a3.181,3.181,0,0,1-.029,2.254c-0.029.059-.076,0.082-0.094,0.041a1.454,1.454,0,0,0-.492-0.615,0.115,0.115,0,0,1-.035-0.1A2.749,2.749,0,0,0,19.967,11.736ZM9.491,6.4a3.811,3.811,0,0,1,3.029-.433,13.8,13.8,0,0,1,2.15.784c0.685,0.316,1.172.9,1.81,1.247,0.8,0.445,1.91.656,2.76,1.071a0.8,0.8,0,0,1,.5.451,3.059,3.059,0,0,1-1.623-.023,0.524,0.524,0,0,0-.615.094,0.906,0.906,0,0,0,.059.749,0.979,0.979,0,0,0,.469.509c0.275,0.129.656,0.135,0.908,0.281a1.227,1.227,0,0,1,.182,1.6,2.206,2.206,0,0,1-1.746.4,5.289,5.289,0,0,0-2,.105,2.328,2.328,0,0,0-1.043,1,0.12,0.12,0,0,1-.17.023c-1.775-1.065-4.019-1.616-5.214-3.307a3.638,3.638,0,0,1-.58-1.528A3.018,3.018,0,0,1,9.491,6.4ZM6.72,3.214c-0.352-.041-0.357-0.3-0.205-0.4a8.284,8.284,0,0,1,1.623-.837A0.8,0.8,0,0,1,8.589,1.9a4.956,4.956,0,0,1,2.086.972c1.043,0.743,1.974,2.16,1.353,2.043a5.866,5.866,0,0,0-.68-0.1c-0.469-.041-0.779.006-1-0.018a0.434,0.434,0,0,1-.234-0.123A5.867,5.867,0,0,0,6.72,3.214Zm9.292,11.473a0.675,0.675,0,0,1,.3-0.41,3.043,3.043,0,0,1,1.242-.222,3.994,3.994,0,0,0,1.26-.2,0.773,0.773,0,0,1,.691-0.217,0.5,0.5,0,0,1,.264.322,1.25,1.25,0,0,1,.07.486,13.41,13.41,0,0,1-.58,1.352,0.451,0.451,0,0,1-.07.246,2.132,2.132,0,0,1-1.652.217,2.074,2.074,0,0,1-.592-0.1,1.145,1.145,0,0,1-.293-0.24,6.619,6.619,0,0,1-.51-0.544,0.851,0.851,0,0,1-.228-0.293A1.2,1.2,0,0,1,16.012,14.686ZM4.09,4.812a0.521,0.521,0,0,1,.27-0.17,6.908,6.908,0,0,1,4.365.369C8.982,5.128,9.1,5.286,8.929,5.4a8.935,8.935,0,0,0-1.236.89,0.562,0.562,0,0,1-.4.082,6.571,6.571,0,0,0-4.1.486C2.883,6.983,2.6,6.808,2.742,6.562A10.008,10.008,0,0,1,4.09,4.812Zm-2.818,5.45a0.49,0.49,0,0,1,.123-0.3,7.869,7.869,0,0,1,4.412-2.54,0.628,0.628,0,0,1,.644.111c0.1,0.24-.1.38-0.34,0.515-4.166,2.488-3.873,6.187-3.914,7.7,0.012,0.62-.434.732-0.545,0.439A10.877,10.877,0,0,1,1.271,10.261Zm5.25,2.909a4.944,4.944,0,0,1,.07-4c0.164-.31.322-0.509,0.533-0.451,0.228,0.064.281,0.293,0.311,0.726,0.228,3.565,2.39,4.771,5.1,6.029a15.622,15.622,0,0,1,6.615,5.368c0.311,0.439.352,0.7,0.006,0.954a11.145,11.145,0,0,1-4.019,1.826c-0.246.059-.5,0.012-0.727-0.55C12.122,17.168,8.279,17.437,6.521,13.17Zm14.19,7.252c-0.352.345-.545,0.076-0.662-0.146a10.28,10.28,0,0,0-1.734-2.745,0.178,0.178,0,0,1,.164-0.3,1.287,1.287,0,0,0,.691-0.111,1.383,1.383,0,0,0,.633-0.9c0.1-.339.1-0.445,0.311-0.462a0.632,0.632,0,0,1,.205.023,2.5,2.5,0,0,1,.732.433,6.868,6.868,0,0,1,1.412,1.539,0.4,0.4,0,0,1-.047.4A11.284,11.284,0,0,1,20.711,20.423Z"}))}},{key:"renderInverseSvgIcon",value:function(){return o["default"].createElement("svg",{className:this.props.className+" svgIcon",width:this.props.width,height:this.props.height,viewBox:this.getViewBox(),style:this.props.style,"aria-hidden":this.props.ariaHidden},o["default"].createElement("title",null,this.props.title),o["default"].createElement("path",{d:"M19.87,8.731c-0.93-.457-2.136-0.685-3.011-1.176-0.7-.387-1.226-1.024-1.97-1.37a14.467,14.467,0,0,0-2.349-.858,4.167,4.167,0,0,0-3.307.477,3.358,3.358,0,0,0-1.247,3.32A3.951,3.951,0,0,0,8.619,10.8c1.309,1.854,3.755,2.456,5.691,3.625a0.126,0.126,0,0,0,.178-0.016L14.5,14.4a2.572,2.572,0,0,1,1.137-1.1,5.759,5.759,0,0,1,2.191-.118,2.41,2.41,0,0,0,1.908-.443,1.36,1.36,0,0,0-.2-1.757c-0.276-.159-0.689-0.166-0.992-0.3a1.049,1.049,0,0,1-.51-0.56,1.012,1.012,0,0,1-.062-0.823,0.572,0.572,0,0,1,.675-0.1,3.42,3.42,0,0,0,1.771.028A0.872,0.872,0,0,0,19.87,8.731Zm-4.885-.27a0.84,0.84,0,0,1-.386.664,0.906,0.906,0,0,1-.517-0.291,5.687,5.687,0,0,0-.958-0.353,1.245,1.245,0,0,1-.806-0.5c-0.172-.415.234-0.609,0.53-0.706A3.233,3.233,0,0,1,13.69,7.14a1.265,1.265,0,0,1,1.219.387,1.855,1.855,0,0,1,.076.934h0Z",transform:"translate(0 0)",fill:this.props.inverseFill}),o["default"].createElement("path",{d:"M0.262,10.039A0.554,0.554,0,0,1,.4,9.714,8.544,8.544,0,0,1,5.215,6.926a0.661,0.661,0,0,1,.7.125c0.11,0.263-.11.415-0.372,0.567C1,10.35,1.323,14.4,1.275,16.064c0.014,0.678-.475.8-0.6,0.484A12.07,12.07,0,0,1,.262,10.039Z",transform:"translate(0 0)",fill:this.props.inverseFill}),o["default"].createElement("path",{d:"M3.342,4.062a0.587,0.587,0,0,1,.289-0.187,7.477,7.477,0,0,1,4.761.408c0.282,0.125.413,0.3,0.227,0.422a10.347,10.347,0,0,0-1.35.975,0.642,0.642,0,0,1-.441.09A7.209,7.209,0,0,0,2.356,6.3c-0.344.145-.648-0.055-0.489-0.318A11.264,11.264,0,0,1,3.342,4.062Z",transform:"translate(0 0)",fill:this.props.inverseFill}),o["default"].createElement("path",{d:"M6.214,2.305C5.829,2.264,5.829,1.98,5.987,1.87A9.3,9.3,0,0,1,7.758.956a0.868,0.868,0,0,1,.5-0.083,5.4,5.4,0,0,1,2.28,1.065c1.137,0.816,2.15,2.366,1.474,2.241a5.93,5.93,0,0,0-.744-0.111c-0.517-.048-0.847.007-1.089-0.014a0.443,0.443,0,0,1-.255-0.138A6.36,6.36,0,0,0,6.214,2.305Z",transform:"translate(0 0)",fill:this.props.inverseFill}),o["default"].createElement("path",{d:"M24.52,15.856c-0.1.318-.227,0.726-0.482,0.54a11.846,11.846,0,0,0-2.6-1.446c-0.055-.014-0.048-0.09-0.028-0.131a1.752,1.752,0,0,0,.138-0.512,1.251,1.251,0,0,1,.248-0.45,4.545,4.545,0,0,0,.468-1.646,4.133,4.133,0,0,0-.076-1.307,2.725,2.725,0,0,1-.158-0.574c0-.187.09-0.374,0.11-0.595a1.779,1.779,0,0,0-1.171-1.356c-0.978-.457-2.019-0.872-3.073-1.432a12.154,12.154,0,0,1-1.557-1.383,11.185,11.185,0,0,0-2.659-1.155,0.255,0.255,0,0,1-.214-0.214A6.25,6.25,0,0,0,11.141.569C10.707,0.23,11.2.036,11.8,0.009A12.484,12.484,0,0,1,24.52,15.856Z",transform:"translate(0 0)",fill:this.props.inverseFill}),o["default"].createElement("path",{d:"M20.676,11.65c-0.007-.048-0.028-0.214-0.028-0.249a0.69,0.69,0,0,1,.262-0.27,2.766,2.766,0,0,1,.365-0.256c0.034-.021.055,0.028,0.062,0.042a3.471,3.471,0,0,1-.034,2.469c-0.028.062-.083,0.09-0.1,0.042a1.624,1.624,0,0,0-.537-0.678,0.147,0.147,0,0,1-.041-0.111A2.876,2.876,0,0,0,20.676,11.65Z",transform:"translate(0 0)",fill:this.props.inverseFill}),o["default"].createElement("path",{d:"M16.356,14.888a0.757,0.757,0,0,1,.331-0.45,3.224,3.224,0,0,1,1.357-.242,4.209,4.209,0,0,0,1.371-.228,0.831,0.831,0,0,1,.751-0.235,0.545,0.545,0,0,1,.289.353,1.279,1.279,0,0,1,.076.533,16.052,16.052,0,0,1-.634,1.487,0.478,0.478,0,0,1-.076.27,2.322,2.322,0,0,1-1.805.235,1.945,1.945,0,0,1-.648-0.111,1.289,1.289,0,0,1-.324-0.263c-0.214-.2-0.338-0.353-0.558-0.595a1.078,1.078,0,0,1-.255-0.325A2.709,2.709,0,0,1,16.356,14.888Z",transform:"translate(0 0)",fill:this.props.inverseFill}),o["default"].createElement("path",{d:"M4.5,22.116A1.977,1.977,0,0,1,4,21.494c-1.164-1.861-1.812-8.446-.317-10.68,0.475-.782.978-0.422,0.813,0.18a4.977,4.977,0,0,0,.544,3.6c1.033,2.193,4.23,5.236,5.071,6.336a8.635,8.635,0,0,1,1.922,3.645c-0.007.284-.062,0.463-0.558,0.422A12.362,12.362,0,0,1,4.5,22.116Z",transform:"translate(0 0)",fill:this.props.inverseFill}),o["default"].createElement("path",{d:"M5.994,13.228A5.45,5.45,0,0,1,6.07,8.842c0.179-.339.351-0.56,0.579-0.491,0.248,0.069.3,0.325,0.338,0.8,0.255,3.915,2.611,5.229,5.567,6.613a17.018,17.018,0,0,1,7.22,5.887c0.338,0.477.386,0.768,0.007,1.044a12.064,12.064,0,0,1-4.389,2c-0.269.062-.551,0.014-0.792-0.609C12.105,17.613,7.909,17.9,5.994,13.228Z",transform:"translate(0 0)",fill:this.props.inverseFill}),o["default"].createElement("path",{d:"M21.482,21.182c-0.379.38-.6,0.083-0.723-0.166A11.3,11.3,0,0,0,18.864,18a0.194,0.194,0,0,1,.179-0.332,1.341,1.341,0,0,0,.751-0.125,1.519,1.519,0,0,0,.689-0.982c0.1-.374.11-0.484,0.338-0.512a0.68,0.68,0,0,1,.227.028,2.921,2.921,0,0,1,.8.477,7.656,7.656,0,0,1,1.543,1.688,0.459,0.459,0,0,1-.048.443A12.318,12.318,0,0,1,21.482,21.182Z",transform:"translate(0 0)",fill:this.props.inverseFill}))}},{key:"render",value:function(){return"inverse"!==this.props.type?this.renderSvgIcon():this.renderInverseSvgIcon()}}]),t}(o["default"].Component);f.propTypes={className:c["default"].string,title:c["default"].string,type:c["default"].string,height:c["default"].number,width:c["default"].number,fill:c["default"].string,inverseFill:c["default"].string,style:c["default"].object,ariaHidden:c["default"].bool,focusable:c["default"].bool},f.defaultProps={className:"nyplLionLogo-icon",title:"NYPL Lion Logo",ref:"nyplLionLogoIcon",type:"",height:"50",width:"50",fill:"#FFF",inverseFill:"#000"},t["default"]=f},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.className,a=e.width,l=e.height,i=e.viewBox,n=e.style,d=e.ariaHidden,s=e.title,o=e.fill,u=e.focusable;return r["default"].createElement("svg",{className:t+" svgIcon",width:a,height:l,viewBox:i,style:n,"aria-hidden":d,focusable:u},r["default"].createElement("title",null,s),r["default"].createElement("g",{className:t+"-text"},r["default"].createElement("g",{className:t+"-text-ny"},r["default"].createElement("path",{d:"M156.36639,26.64949h1.93408l14.21812,20.593v-20.593H174.381V50.5016h-1.82667L158.19274,29.76519V50.5016h-1.82635V26.64949Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M178.14171,41.79879c0-4.83479,2.79354-8.77447,7.34205-8.77447,4.36937,0,6.769,3.50975,6.41048,8.38043h-11.7828v0.394c0.036,3.90364,1.68361,7.48511,5.76653,7.48511a8.46392,8.46392,0,0,0,4.942-1.6117l0.78812,1.46846a9.8233,9.8233,0,0,1-5.80219,1.755C180.577,50.89564,178.14171,46.70533,178.14171,41.79879Zm11.89053-1.934c-0.03568-2.57842-1.36073-5.22886-4.61985-5.22886-2.97264,0-4.69193,2.29208-5.19321,5.22886h9.81306Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M193.899,33.41818h2.00542l4.155,14.21833,4.47647-14.21833h1.82667l4.47679,14.254,4.18995-14.254H216.892L211.73445,50.5016h-1.71894L205.3953,36.10434,200.77545,50.5016h-1.71894Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M233.365,41.51212l-7.98639-14.86264h2.22057l6.76869,12.8929h0.07172l6.76869-12.8929H243.214l-7.915,14.86264V50.5016H233.365V41.51212Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M241.60144,41.97789c0-4.29786,2.29194-8.95357,7.66422-8.95357s7.84333,4.62,7.84333,8.88188c0,4.2975-2.43536,8.98944-7.80764,8.98944C243.92939,50.89564,241.60144,46.27543,241.60144,41.97789Zm13.53778,0c0-3.83227-2.04146-7.342-5.94493-7.342-3.86813,0-5.62308,3.4382-5.62308,7.27032,0,3.868,1.89836,7.3777,5.76582,7.3777C253.24085,49.2839,255.13922,45.84571,255.13922,41.97789Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M260.68578,33.41818h1.86268v2.97264c0.64469-1.25353,2.18453-3.3665,4.5842-3.3665a4.68342,4.68342,0,0,1,1.64757.28648l-0.46591,1.7548a3.56466,3.56466,0,0,0-1.39677-.25066c-2.36363,0-3.90381,2.79371-4.36909,3.79644V50.5016h-1.86268V33.41818Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M272.21742,24.7154h1.86236V50.5016h-1.86236V24.7154Zm2.04111,16.18807,7.48547-7.48529h2.32795l-7.55684,7.48529,7.9507,9.59813h-2.32795Z",transform:"translate(-27.25197 -24.7154)"})),r["default"].createElement("g",{className:t+"-text-public"},r["default"].createElement("path",{d:"M156.40225,62.53555h5.193c5.01407,0,8.16582,2.47119,8.16582,6.733,0,4.29754-2.97264,6.98369-8.38061,6.98369h-3.00833V86.38762h-1.96991V62.53555ZM161.34481,74.569c4.54816,0,6.41052-2.07729,6.41052-5.22886,0-2.97264-1.79067-5.12148-6.33914-5.12148h-3.044V74.569h2.97264Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M172.76837,81.37373V69.30424h1.86271V80.97966c0,2.50723.89514,4.11861,3.5096,4.11861,2.54306,0,4.65554-2.39949,5.22886-3.40219V69.30424h1.862V83.09285a14.41314,14.41314,0,0,0,.32252,3.29478h-1.898a18.73138,18.73138,0,0,1-.2508-2.79354,6.85642,6.85642,0,0,1-5.65845,3.18761C174.16549,86.7817,172.76837,84.45358,172.76837,81.37373Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M189.88744,85.49231V60.60146h1.862V70.88029a6.07292,6.07292,0,0,1,4.47714-1.96974c4.87033,0,7.23432,3.90347,7.23432,8.88171,0,4.79913-3.22344,8.98944-8.45233,8.98944A9.6515,9.6515,0,0,1,189.88744,85.49231ZM201.49116,77.864c0-3.72489-1.43281-7.27032-5.58707-7.27032a6.12767,6.12767,0,0,0-4.15465,1.934V84.48962a7.70565,7.70565,0,0,0,3.33121.68035C199.41366,85.17,201.49116,81.40938,201.49116,77.864Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M207.292,60.60146h1.86271V86.38762H207.292V60.60146Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M214.23944,64.25466a1.41471,1.41471,0,1,1,2.82919,0A1.41558,1.41558,0,1,1,214.23944,64.25466Zm0.46559,5.04958h1.898V86.38762h-1.898V69.30424Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M220.184,77.82795c0-5.40782,3.116-8.91739,7.52112-8.91739a7.42136,7.42136,0,0,1,5.08548,1.79045l-0.96686,1.36094a6.121,6.121,0,0,0-4.1543-1.54c-3.79641,0-5.5157,3.295-5.5157,7.23464,0,3.79623,1.68361,7.41339,5.48,7.41339a6.88911,6.88911,0,0,0,4.36941-1.54l0.82344,1.39677a8.00839,8.00839,0,0,1-5.30059,1.755C222.61969,86.7817,220.184,82.41229,220.184,77.82795Z",transform:"translate(-27.25197 -24.7154)"})),r["default"].createElement("g",{className:t+"-text-library"},r["default"].createElement("path",{d:"M155.86494,122.27422V98.42179h5.08565v19.76915h8.88188v4.08328H155.86494Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M176.00777,102.5764A2.8586,2.8586,0,0,1,173.1065,99.711a2.82221,2.82221,0,0,1,2.90127-2.79354,2.85364,2.85364,0,0,1,2.9366,2.79354A2.88946,2.88946,0,0,1,176.00777,102.5764Zm-2.39967,19.69782V104.83195h4.799v17.44227h-4.799Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M187.36031,96.4877v9.706a6.22015,6.22015,0,0,1,4.26168-1.791c4.36973,0,7.41374,3.008,7.41374,9.0253,0,5.94493-4.0112,9.27574-9.27578,9.27574A16.58426,16.58426,0,0,1,182.597,121.307V96.4877h4.76327Zm0,22.09713a6.72755,6.72755,0,0,0,2.39964.39457c2.65011,0,4.22563-1.96974,4.22563-5.55139,0-3.25913-1.10993-5.26455-3.68867-5.26455a4.14376,4.14376,0,0,0-2.9366,1.325v9.09632Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M212.42937,109.02257a3.39138,3.39138,0,0,0-1.827-.39386c-2.11248,0-3.36615,1.86271-3.79605,2.65012v10.99539H202.043V104.83195h4.7633v2.36431a5.16217,5.16217,0,0,1,4.40506-2.79354,4.7777,4.7777,0,0,1,2.364.46594Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M225.03561,122.27422a9.70593,9.70593,0,0,1-.28684-1.86271,6.43294,6.43294,0,0,1-4.90634,2.29226c-2.97264,0-5.26454-1.79028-5.26454-4.90669,0-4.54851,4.69154-6.19573,9.31143-6.19573h0.609v-1.00291c0-1.5045-.609-2.435-2.82922-2.435a7.36142,7.36142,0,0,0-4.4411,1.64721l-2.07715-2.90091a10.36488,10.36488,0,0,1,7.05553-2.50705c4.76331,0,7.01953,1.82667,7.01953,6.44656v6.26742a23.45627,23.45627,0,0,0,.50128,5.15752h-4.69158Zm-0.53728-7.73627h-0.609c-2.79318,0-4.72727.82412-4.72727,2.86523a1.86412,1.86412,0,0,0,2.11284,1.82635,4.27676,4.27676,0,0,0,3.22344-1.53951V114.538Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M243.44337,109.02257a3.39017,3.39017,0,0,0-1.82632-.39386c-2.11315,0-3.36686,1.86271-3.79676,2.65012v10.99539H233.057V104.83195h4.76331v2.36431a5.16277,5.16277,0,0,1,4.40541-2.79354,4.77608,4.77608,0,0,1,2.36363.46594Z",transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M246.30792,104.83195h5.08548l3.86813,11.497h0.17907l3.54564-11.497h4.90669l-7.19863,19.30392c-1.54019,4.119-3.36686,6.51825-8.12981,6.51825a9.32322,9.32322,0,0,1-2.68612-.32217l0.68038-3.7604a5.485,5.485,0,0,0,1.68325.17879c2.43532,0,3.29481-1.1813,3.97516-3.044l0.64469-1.79031Z",transform:"translate(-27.25197 -24.7154)"}))),r["default"].createElement("g",{className:t+"-lion"},r["default"].createElement("path",{d:"M111.90871,99.19328c-3.7417-1.83124-8.60114-2.74854-12.13721-4.7124-2.7998-1.55231-4.946-4.11652-7.95886-5.498a60.02908,60.02908,0,0,0-9.468-3.45349c-6.25116-1.53778-11.50183.46472-13.323,1.90582A13.4137,13.4137,0,0,0,64.00112,100.774a15.94352,15.94352,0,0,0,2.55627,6.72852c5.27264,7.447,15.14136,9.86646,22.95953,14.56458a0.50625,0.50625,0,0,0,.73907-0.10187c1.31311-1.93127,2.3808-3.48566,4.59235-4.40546,2.24567-.93738,5.7793-0.619,8.82611-0.47076,3.14771,0.1521,6.54541-.14337,7.68689-1.77087,1.36383-1.94238,1.28436-5.85663-.7973-7.05243-1.117-.64368-2.78278-0.6731-3.9975-1.23328a4.3204,4.3204,0,0,1-2.059-2.24237,4.07459,4.07459,0,0,1-.25964-3.31146c0.489-.88025,1.7226-0.63116,2.71332-0.40076,1.9635,0.45068,5.24432.92871,7.13336,0.1001C114.65114,100.89348,112.66127,99.56114,111.90871,99.19328ZM92.18856,98.119c-0.16821.87573-.7019,2.567-1.55566,2.67712-0.86029.1098-1.48022-.81232-2.09686-1.15808a24.4124,24.4124,0,0,0-3.87262-1.41064c-1.17352-.38867-2.78247-0.87018-3.254-1.98981-0.707-1.66663.94434-2.45544,2.13348-2.82123a12.11641,12.11641,0,0,1,3.40045-.54181c2.1485-.10327,4.19965.20435,4.92053,1.55475A6.49319,6.49319,0,0,1,92.18856,98.119Z",transform:"translate(-27.25197 -24.7154)",fill:o}),r["default"].createElement("path",{d:"M32.83333,104.45157a2.29443,2.29443,0,0,1,.54613-1.31607A34.48454,34.48454,0,0,1,52.806,91.93851c1.50521-.21582,2.58985-0.11156,2.83649.49191,0.43235,1.05764-.4436,1.66732-1.49758,2.27736C35.79955,105.672,37.1,121.9711,36.92438,128.639c0.05527,2.72734-1.91432,3.22379-2.40623,1.93891A48.03813,48.03813,0,0,1,32.83333,104.45157Z",transform:"translate(-27.25197 -24.7154)",fill:o}),r["default"].createElement("path",{d:"M45.24681,80.43961a2.19666,2.19666,0,0,1,1.1785-.73891,30.35514,30.35514,0,0,1,19.20314,1.6337c1.14285,0.50578,1.65764,1.2227.90727,1.704a38.83021,38.83021,0,0,0-5.4445,3.92461,2.4715,2.4715,0,0,1-1.782.35665c-5.96657-.78655-9.06564-1.25111-18.03517,2.149-1.37634.57868-2.61425-.20873-1.98084-1.29042A45.71179,45.71179,0,0,1,45.24681,80.43961Z",transform:"translate(-27.25197 -24.7154)",fill:o}),r["default"].createElement("path",{d:"M56.83993,73.40033c-1.54242-.17563-1.56427-1.30393-0.91213-1.74352a37.79982,37.79982,0,0,1,7.13141-3.67693,3.616,3.616,0,0,1,1.99226-.33359c2.016,0.20181,5.35429,1.55906,9.18483,4.292,4.59371,3.27786,8.68043,9.50494,5.94738,9.0009a25.58659,25.58659,0,0,0-3.00191-.43945c-2.07059-.18361-3.42908.02891-4.3831-0.06825a1.96274,1.96274,0,0,1-1.03614-.55044C67.88555,76.40433,63.4065,74.19781,56.83993,73.40033Z",transform:"translate(-27.25197 -24.7154)",fill:o}),r["default"].createElement("path",{d:"M130.64639,127.82663c-0.41362,1.29077-.90482,2.91-1.9576,2.15892a47.305,47.305,0,0,0-10.51423-5.80672c-0.22586-.05055-0.20021-0.36442-0.12054-0.54143a7.76418,7.76418,0,0,0,.56119-2.05533,5.10548,5.10548,0,0,1,1.01156-1.8083,18.619,18.619,0,0,0,1.89907-6.60278,16.56311,16.56311,0,0,0-.30071-5.24067,10.43877,10.43877,0,0,1-.63877-2.31961c0.01245-.73927.36027-1.51387,0.43164-2.38651,0.20819-2.525-2.97853-4.63025-4.71776-5.44156-3.94536-1.84228-8.13861-3.48984-12.39993-5.73812-2.40556-1.26892-4.33617-4.05224-6.26607-5.546-1.94966-1.50432-8.21587-3.9897-10.72015-4.65121a1.03792,1.03792,0,0,1-.86172-0.86328,25.0259,25.0259,0,0,0-9.3712-14.55086c-1.759-1.36679.21341-2.14416,2.63539-2.26232C117.499,62.86187,139.47112,98.00018,130.64639,127.82663Z",transform:"translate(-27.25197 -24.7154)",fill:o}),r["default"].createElement("path",{d:"M115.14271,110.93761c-0.02739-.19436-0.111-0.85254-0.11036-0.98836a2.60871,2.60871,0,0,1,1.04881-1.08393,10.66027,10.66027,0,0,1,1.47176-1.03614c0.13838-.08695.23019,0.114,0.24892,0.15381,1.40748,2.13671.87988,7.41754-.13721,9.92874-0.11795.25534-.33306,0.35473-0.42089,0.16768a6.365,6.365,0,0,0-2.17328-2.71248,0.53647,0.53647,0,0,1-.16314-0.43959A10.78454,10.78454,0,0,0,115.14271,110.93761Z",transform:"translate(-27.25197 -24.7154)",fill:o}),r["default"].createElement("path",{d:"M97.73573,123.93565a3.07547,3.07547,0,0,1,1.33667-1.817c1.28091-.80333,3.40964-0.838,5.46408-0.97864a17.34326,17.34326,0,0,0,5.53425-.90517c0.85722-.39425,1.71461-1.517,3.03915-0.945a2.19649,2.19649,0,0,1,1.15583,1.41653,5.15178,5.15178,0,0,1,.29759,2.13323c-0.19071,2.46342-2.1913,3.66618-2.55122,5.96884a2.05507,2.05507,0,0,1-.29862,1.07563c-1.52756,1.55473-4.54834,1.22774-7.27933.95267a8.69735,8.69735,0,0,1-2.6051-.43856,5.72964,5.72964,0,0,1-1.302-1.04622,30.722,30.722,0,0,1-2.24377-2.38822,4.156,4.156,0,0,1-1.01465-1.30081A6.83012,6.83012,0,0,1,97.73573,123.93565Z",transform:"translate(-27.25197 -24.7154)",fill:o}),r["default"].createElement("path",{d:"M49.90735,152.96743a8.06424,8.06424,0,0,1-2.0101-2.48694c-4.67633-7.4744-7.29718-33.94506-1.27119-42.92361,1.91762-3.14586,3.94919-1.69538,3.274.73615-1.15409,5.45855-.44672,8.51743,2.20759,14.44054,4.1714,8.80221,17.047,21.02289,20.4556,25.45534,5.84308,7.6015,7.7877,13.13937,7.76138,14.63142-0.03154,1.14459-.25115,1.87413-2.25675,1.70475A50.122,50.122,0,0,1,49.90735,152.96743Z",transform:"translate(-27.25197 -24.7154)",fill:o}),r["default"].createElement("path",{d:"M55.95568,117.26983A21.79207,21.79207,0,0,1,56.26125,99.645c0.7188-1.35484,1.42117-2.24,2.33834-1.985,0.998,0.27818,1.22855,1.29978,1.36626,3.19329,1.01553,15.714,10.52044,21.00487,22.459,26.55281,9.41867,4.81489,20.135,10.31952,29.11613,23.65392,1.35938,1.92507,1.55544,3.09321.02079,4.19587A48.8677,48.8677,0,0,1,93.868,163.29216c-1.09244.25566-2.21933,0.06375-3.187-2.43259C80.59868,134.8822,63.671,136.05311,55.95568,117.26983Z",transform:"translate(-27.25197 -24.7154)",fill:o}),r["default"].createElement("path",{d:"M118.40353,149.20773c-1.535,1.5343-2.40553.3315-2.907-.65371a45.56777,45.56777,0,0,0-7.63545-12.10255,0.78694,0.78694,0,0,1,.72767-1.34444,5.49981,5.49981,0,0,0,3.03671-.493,6.08555,6.08555,0,0,0,2.787-3.94433c0.427-1.50695.447-1.95037,1.37041-2.04423a3.03406,3.03406,0,0,1,.90418.10947,10.91687,10.91687,0,0,1,3.21234,1.91465,31.19354,31.19354,0,0,1,6.22659,6.775,1.79563,1.79563,0,0,1-.19539,1.76708A50.13544,50.13544,0,0,1,118.40353,149.20773Z",transform:"translate(-27.25197 -24.7154)",fill:o}),r["default"].createElement("path",{d:"M82.02851,59.23935a55.06858,55.06858,0,1,0,55.25255,55.07377A54.89374,54.89374,0,0,0,82.02851,59.23935ZM49.90735,152.95427a8.06426,8.06426,0,0,1-2.0101-2.48694c-4.67633-7.4744-7.29718-33.9451-1.27119-42.92361,1.91762-3.14586,3.94919-1.69538,3.274.73615-1.15409,5.45855-.44672,8.51743,2.20759,14.44054,4.1714,8.80221,17.047,21.02289,20.4556,25.45534,5.84308,7.6015,7.7877,13.13937,7.76138,14.63142-0.03154,1.14455-.25115,1.87413-2.25675,1.70471A50.12176,50.12176,0,0,1,49.90735,152.95427Zm80.739-25.14079c-0.41362,1.29077-.90482,2.90992-1.9576,2.15892a47.30207,47.30207,0,0,0-10.51423-5.80672c-0.22586-.05059-0.20021-0.36442-0.12054-0.54143a7.76415,7.76415,0,0,0,.56119-2.05533,5.10548,5.10548,0,0,1,1.01156-1.80829,18.61918,18.61918,0,0,0,1.89907-6.60278,16.56311,16.56311,0,0,0-.30071-5.24067,10.43874,10.43874,0,0,1-.63877-2.31961c0.01245-.73927.36027-1.51387,0.43164-2.38652,0.20819-2.525-2.97853-4.63007-4.71776-5.44138-3.94536-1.84228-8.13861-3.48984-12.39993-5.73812-2.40556-1.269-4.33617-4.05224-6.26607-5.546-1.94966-1.50432-8.21587-3.98974-10.72015-4.65121a1.038,1.038,0,0,1-.86172-0.86328,25.02589,25.02589,0,0,0-9.3712-14.55086c-1.759-1.36683.21341-2.14419,2.63539-2.26232C117.499,62.84888,139.47112,97.9872,130.64639,127.81347Zm-15.50368-16.889c-0.02739-.19436-0.111-0.85253-0.11036-0.98836a2.60871,2.60871,0,0,1,1.04881-1.08393,10.66026,10.66026,0,0,1,1.47176-1.03614c0.13838-.08695.23019,0.114,0.24892,0.15381,1.40748,2.13671.87988,7.41754-.13721,9.92874-0.11795.25534-.33306,0.35473-0.42089,0.16768a6.365,6.365,0,0,0-2.17328-2.71248,0.5365,0.5365,0,0,1-.16314-0.43962A10.7843,10.7843,0,0,0,115.14271,110.92445ZM69.02163,87.42221c1.82114-1.44111,7.07185-3.44359,13.323-1.90581a60.02216,60.02216,0,0,1,9.468,3.45363c3.0128,1.3812,5.159,3.94557,7.95883,5.49789,3.5361,1.96385,8.39551,2.88116,12.13721,4.71233,0.75257,0.3679,2.74242,1.70007,2.18591,1.98449-1.889.82862-5.16983,0.3509-7.13332-.10014-0.99077-.23036-2.22436-0.47942-2.71333.40081a4.07468,4.07468,0,0,0,.25963,3.31145,4.32051,4.32051,0,0,0,2.059,2.24238c1.21472,0.56016,2.88048.5896,3.99751,1.23324,2.08165,1.19584,2.16115,5.11006.7973,7.05245-1.14147,1.62749-4.53915,1.923-7.68689,1.7709-3.04678-.14828-6.58043-0.46662-8.82612.47077-2.21156.91976-3.2792,2.47413-4.59232,4.40545a0.50625,0.50625,0,0,1-.73909.10184c-7.81818-4.69814-17.68686-7.11757-22.95953-14.56456a15.94379,15.94379,0,0,1-2.55625-6.72854A13.41361,13.41361,0,0,1,69.02163,87.42221ZM56.83993,73.38734c-1.54242-.17563-1.56427-1.30394-0.91213-1.74356a37.7999,37.7999,0,0,1,7.13141-3.6769,3.616,3.616,0,0,1,1.99226-.33359c2.016,0.20177,5.35429,1.55906,9.18483,4.292,4.59371,3.27782,8.68043,9.5049,5.94738,9.00086a25.59524,25.59524,0,0,0-3.00191-.43941c-2.07059-.18361-3.42908.02891-4.3831-0.06825a1.96255,1.96255,0,0,1-1.03614-.55048C67.88555,76.39134,63.4065,74.18479,56.83993,73.38734Zm40.8958,50.53515a3.07547,3.07547,0,0,1,1.33667-1.817c1.28091-.80333,3.40964-0.838,5.46408-0.97864a17.3433,17.3433,0,0,0,5.53425-.90518c0.85722-.39425,1.71461-1.517,3.03915-0.945a2.1965,2.1965,0,0,1,1.15583,1.41653,5.15179,5.15179,0,0,1,.29759,2.13323c-0.19071,2.46342-2.1913,3.66618-2.55122,5.96884a2.05507,2.05507,0,0,1-.29862,1.07563c-1.52756,1.55473-4.54834,1.22774-7.27933.95268a8.69731,8.69731,0,0,1-2.6051-.43859,5.72851,5.72851,0,0,1-1.302-1.04618,30.72225,30.72225,0,0,1-2.24377-2.38822,4.156,4.156,0,0,1-1.01465-1.30081A6.83011,6.83011,0,0,1,97.73573,123.92249ZM45.24681,80.42659a2.19709,2.19709,0,0,1,1.1785-.73891,30.35515,30.35515,0,0,1,19.20314,1.63373c1.14285,0.50578,1.65764,1.2227.90727,1.704a38.83021,38.83021,0,0,0-5.4445,3.92461,2.4715,2.4715,0,0,1-1.782.35665c-5.96657-.78655-9.06564-1.25111-18.03517,2.149-1.37634.57868-2.61425-.20873-1.98084-1.29042A45.71349,45.71349,0,0,1,45.24681,80.42659Zm-12.404,24.0215a2.29577,2.29577,0,0,1,.54631-1.316A34.484,34.484,0,0,1,52.81575,91.93521c1.505-.21547,2.58967-0.11153,2.83632.49191,0.43232,1.058-.4436,1.66768-1.49741,2.2774-18.34557,10.964-17.04493,27.26345-17.22056,33.931,0.05523,2.72738-1.91434,3.22379-2.40625,1.93926A48.03957,48.03957,0,0,1,32.84285,104.44809Zm23.11943,12.81412a21.79159,21.79159,0,0,1,.30553-17.62467c0.71883-1.35484,1.42121-2.24,2.33834-1.985,0.998,0.27818,1.22859,1.29978,1.3663,3.19314,1.01553,15.714,10.52044,21.00487,22.459,26.55278,9.41867,4.81489,20.135,10.31952,29.11613,23.654,1.35934,1.925,1.55544,3.09318.02079,4.19584a48.8677,48.8677,0,0,1-17.69378,8.03627c-1.09244.25566-2.21936,0.06375-3.18708-2.43256C80.60524,134.87457,63.67758,136.04548,55.96228,117.26221Zm62.44125,31.94758c-1.535,1.5343-2.40553.33154-2.907-.65367a45.56724,45.56724,0,0,0-7.63545-12.10256,0.787,0.787,0,0,1,.72767-1.34448,5.49979,5.49979,0,0,0,3.03671-.49294,6.08554,6.08554,0,0,0,2.787-3.94437c0.427-1.50691.447-1.95033,1.37041-2.04423a3.03522,3.03522,0,0,1,.90418.10947,10.91777,10.91777,0,0,1,3.21234,1.91468,31.19269,31.19269,0,0,1,6.22659,6.77494,1.7957,1.7957,0,0,1-.19539,1.76711A50.13426,50.13426,0,0,1,118.40353,149.20979Z",
transform:"translate(-27.25197 -24.7154)"}),r["default"].createElement("path",{d:"M84.67135,98.22743a24.39354,24.39354,0,0,1,3.87228,1.41064c0.61681,0.34572,1.23657,1.26789,2.09726,1.15807,0.85356-.11015,1.38723-1.80138,1.55541-2.67715a6.49165,6.49165,0,0,0-.32458-3.6897c-0.72075-1.35037-2.77207-1.658-4.92038-1.55473a12.1195,12.1195,0,0,0-3.40063.54179c-1.18893.36584-2.84033,1.15463-2.13345,2.82124C81.88892,97.35723,83.49753,97.83874,84.67135,98.22743Z",transform:"translate(-27.25197 -24.7154)"})))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool,style:d["default"].object,focusable:d["default"].bool},s.defaultProps={className:"nyplLionLogo",title:"The New York Public Library",ref:"nyplLionLogo",type:"",height:"144",width:"257",viewBox:"0 0 257 144",fill:"#FFF"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.className,a=e.title,l=e.width,i=e.height,n=e.viewBox,d=e.ariaHidden,s=e.fill,o=e.style;return r["default"].createElement("svg",{className:t+" svgIcon",width:l,height:i,viewBox:n,style:o,"aria-hidden":d},r["default"].createElement("title",null,a),r["default"].createElement("g",{className:t+"-text"},r["default"].createElement("g",{className:t+"-text-ny"},r["default"].createElement("path",{d:"M156.36639,26.64949h1.93408l14.21812,20.593v-20.593H174.381V50.5016h-1.82667L158.19274,29.76519V50.5016h-1.82635V26.64949Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M178.14171,41.79879c0-4.83479,2.79354-8.77447,7.34205-8.77447,4.36937,0,6.769,3.50975,6.41048,8.38043h-11.7828v0.394c0.036,3.90364,1.68361,7.48511,5.76653,7.48511a8.46392,8.46392,0,0,0,4.942-1.6117l0.78812,1.46846a9.8233,9.8233,0,0,1-5.80219,1.755C180.577,50.89564,178.14171,46.70533,178.14171,41.79879Zm11.89053-1.934c-0.03568-2.57842-1.36073-5.22886-4.61985-5.22886-2.97264,0-4.69193,2.29208-5.19321,5.22886h9.81306Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M193.899,33.41818h2.00542l4.155,14.21833,4.47647-14.21833h1.82667l4.47679,14.254,4.18995-14.254H216.892L211.73445,50.5016h-1.71894L205.3953,36.10434,200.77545,50.5016h-1.71894Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M233.365,41.51212l-7.98639-14.86264h2.22057l6.76869,12.8929h0.07172l6.76869-12.8929H243.214l-7.915,14.86264V50.5016H233.365V41.51212Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M241.60144,41.97789c0-4.29786,2.29194-8.95357,7.66422-8.95357s7.84333,4.62,7.84333,8.88188c0,4.2975-2.43536,8.98944-7.80764,8.98944C243.92939,50.89564,241.60144,46.27543,241.60144,41.97789Zm13.53778,0c0-3.83227-2.04146-7.342-5.94493-7.342-3.86813,0-5.62308,3.4382-5.62308,7.27032,0,3.868,1.89836,7.3777,5.76582,7.3777C253.24085,49.2839,255.13922,45.84571,255.13922,41.97789Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M260.68578,33.41818h1.86268v2.97264c0.64469-1.25353,2.18453-3.3665,4.5842-3.3665a4.68342,4.68342,0,0,1,1.64757.28648l-0.46591,1.7548a3.56466,3.56466,0,0,0-1.39677-.25066c-2.36363,0-3.90381,2.79371-4.36909,3.79644V50.5016h-1.86268V33.41818Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M272.21742,24.7154h1.86236V50.5016h-1.86236V24.7154Zm2.04111,16.18807,7.48547-7.48529h2.32795l-7.55684,7.48529,7.9507,9.59813h-2.32795Z",transform:"translate(-31.77892 -24.7154)"})),r["default"].createElement("g",{className:t+"-text-public"},r["default"].createElement("path",{d:"M156.40225,62.53555h5.193c5.01407,0,8.16582,2.47119,8.16582,6.733,0,4.29754-2.97264,6.98369-8.38061,6.98369h-3.00833V86.38762h-1.96991V62.53555ZM161.34481,74.569c4.54816,0,6.41052-2.07729,6.41052-5.22886,0-2.97264-1.79067-5.12148-6.33914-5.12148h-3.044V74.569h2.97264Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M172.76837,81.37373V69.30424h1.86271V80.97966c0,2.50723.89514,4.11861,3.5096,4.11861,2.54306,0,4.65554-2.39949,5.22886-3.40219V69.30424h1.862V83.09285a14.41314,14.41314,0,0,0,.32252,3.29478h-1.898a18.73138,18.73138,0,0,1-.2508-2.79354,6.85642,6.85642,0,0,1-5.65845,3.18761C174.16549,86.7817,172.76837,84.45358,172.76837,81.37373Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M189.88744,85.49231V60.60146h1.862V70.88029a6.07292,6.07292,0,0,1,4.47714-1.96974c4.87033,0,7.23432,3.90347,7.23432,8.88171,0,4.79913-3.22344,8.98944-8.45233,8.98944A9.6515,9.6515,0,0,1,189.88744,85.49231ZM201.49116,77.864c0-3.72489-1.43281-7.27032-5.58707-7.27032a6.12767,6.12767,0,0,0-4.15465,1.934V84.48962a7.70565,7.70565,0,0,0,3.33121.68035C199.41366,85.17,201.49116,81.40938,201.49116,77.864Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M207.292,60.60146h1.86271V86.38762H207.292V60.60146Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M214.23944,64.25466a1.41471,1.41471,0,1,1,2.82919,0A1.41558,1.41558,0,1,1,214.23944,64.25466Zm0.46559,5.04958h1.898V86.38762h-1.898V69.30424Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M220.184,77.82795c0-5.40782,3.116-8.91739,7.52112-8.91739a7.42136,7.42136,0,0,1,5.08548,1.79045l-0.96686,1.36094a6.121,6.121,0,0,0-4.1543-1.54c-3.79641,0-5.5157,3.295-5.5157,7.23464,0,3.79623,1.68361,7.41339,5.48,7.41339a6.88911,6.88911,0,0,0,4.36941-1.54l0.82344,1.39677a8.00839,8.00839,0,0,1-5.30059,1.755C222.61969,86.7817,220.184,82.41229,220.184,77.82795Z",transform:"translate(-31.77892 -24.7154)"})),r["default"].createElement("g",{className:t+"-text-library"},r["default"].createElement("path",{d:"M155.86494,122.27422V98.42179h5.08565v19.76915h8.88188v4.08328H155.86494Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M176.00777,102.5764A2.8586,2.8586,0,0,1,173.1065,99.711a2.82221,2.82221,0,0,1,2.90127-2.79354,2.85364,2.85364,0,0,1,2.9366,2.79354A2.88946,2.88946,0,0,1,176.00777,102.5764Zm-2.39967,19.69782V104.83195h4.799v17.44227h-4.799Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M187.36031,96.4877v9.706a6.22015,6.22015,0,0,1,4.26168-1.791c4.36973,0,7.41374,3.008,7.41374,9.0253,0,5.94493-4.0112,9.27574-9.27578,9.27574A16.58426,16.58426,0,0,1,182.597,121.307V96.4877h4.76327Zm0,22.09713a6.72755,6.72755,0,0,0,2.39964.39457c2.65011,0,4.22563-1.96974,4.22563-5.55139,0-3.25913-1.10993-5.26455-3.68867-5.26455a4.14376,4.14376,0,0,0-2.9366,1.325v9.09632Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M212.42937,109.02257a3.39138,3.39138,0,0,0-1.827-.39386c-2.11248,0-3.36615,1.86271-3.79605,2.65012v10.99539H202.043V104.83195h4.7633v2.36431a5.16217,5.16217,0,0,1,4.40506-2.79354,4.7777,4.7777,0,0,1,2.364.46594Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M225.03561,122.27422a9.70593,9.70593,0,0,1-.28684-1.86271,6.43294,6.43294,0,0,1-4.90634,2.29226c-2.97264,0-5.26454-1.79028-5.26454-4.90669,0-4.54851,4.69154-6.19573,9.31143-6.19573h0.609v-1.00291c0-1.5045-.609-2.435-2.82922-2.435a7.36142,7.36142,0,0,0-4.4411,1.64721l-2.07715-2.90091a10.36488,10.36488,0,0,1,7.05553-2.50705c4.76331,0,7.01953,1.82667,7.01953,6.44656v6.26742a23.45627,23.45627,0,0,0,.50128,5.15752h-4.69158Zm-0.53728-7.73627h-0.609c-2.79318,0-4.72727.82412-4.72727,2.86523a1.86412,1.86412,0,0,0,2.11284,1.82635,4.27676,4.27676,0,0,0,3.22344-1.53951V114.538Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M243.44337,109.02257a3.39017,3.39017,0,0,0-1.82632-.39386c-2.11315,0-3.36686,1.86271-3.79676,2.65012v10.99539H233.057V104.83195h4.76331v2.36431a5.16277,5.16277,0,0,1,4.40541-2.79354,4.77608,4.77608,0,0,1,2.36363.46594Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M246.30792,104.83195h5.08548l3.86813,11.497h0.17907l3.54564-11.497h4.90669l-7.19863,19.30392c-1.54019,4.119-3.36686,6.51825-8.12981,6.51825a9.32322,9.32322,0,0,1-2.68612-.32217l0.68038-3.7604a5.485,5.485,0,0,0,1.68325.17879c2.43532,0,3.29481-1.1813,3.97516-3.044l0.64469-1.79031Z",transform:"translate(-31.77892 -24.7154)"}))),r["default"].createElement("g",{className:t+"-lion",fill:s},r["default"].createElement("path",{d:"M111.90871,99.19328c-3.7417-1.83124-8.60114-2.74854-12.13721-4.7124-2.7998-1.55231-4.946-4.11652-7.95886-5.498a60.02908,60.02908,0,0,0-9.468-3.45349c-6.25116-1.53778-11.50183.46472-13.323,1.90582A13.4137,13.4137,0,0,0,64.00112,100.774a15.94352,15.94352,0,0,0,2.55627,6.72852c5.27264,7.447,15.14136,9.86646,22.95953,14.56458a0.50625,0.50625,0,0,0,.73907-0.10187c1.31311-1.93127,2.3808-3.48566,4.59235-4.40546,2.24567-.93738,5.7793-0.619,8.82611-0.47076,3.14771,0.1521,6.54541-.14337,7.68689-1.77087,1.36383-1.94238,1.28436-5.85663-.7973-7.05243-1.117-.64368-2.78278-0.6731-3.9975-1.23328a4.3204,4.3204,0,0,1-2.059-2.24237,4.07459,4.07459,0,0,1-.25964-3.31146c0.489-.88025,1.7226-0.63116,2.71332-0.40076,1.9635,0.45068,5.24432.92871,7.13336,0.1001C114.65114,100.89348,112.66127,99.56114,111.90871,99.19328ZM92.18856,98.119c-0.16821.87573-.7019,2.567-1.55566,2.67712-0.86029.1098-1.48022-.81232-2.09686-1.15808a24.4124,24.4124,0,0,0-3.87262-1.41064c-1.17352-.38867-2.78247-0.87018-3.254-1.98981-0.707-1.66663.94434-2.45544,2.13348-2.82123a12.11641,12.11641,0,0,1,3.40045-.54181c2.1485-.10327,4.19965.20435,4.92053,1.55475A6.49319,6.49319,0,0,1,92.18856,98.119Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M32.83333,104.45157a2.29443,2.29443,0,0,1,.54613-1.31607A34.48454,34.48454,0,0,1,52.806,91.93851c1.50521-.21582,2.58985-0.11156,2.83649.49191,0.43235,1.05764-.4436,1.66732-1.49758,2.27736C35.79955,105.672,37.1,121.9711,36.92438,128.639c0.05527,2.72734-1.91432,3.22379-2.40623,1.93891A48.03813,48.03813,0,0,1,32.83333,104.45157Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M45.24681,80.43961a2.19666,2.19666,0,0,1,1.1785-.73891,30.35514,30.35514,0,0,1,19.20314,1.6337c1.14285,0.50578,1.65764,1.2227.90727,1.704a38.83021,38.83021,0,0,0-5.4445,3.92461,2.4715,2.4715,0,0,1-1.782.35665c-5.96657-.78655-9.06564-1.25111-18.03517,2.149-1.37634.57868-2.61425-.20873-1.98084-1.29042A45.71179,45.71179,0,0,1,45.24681,80.43961Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M56.83993,73.40033c-1.54242-.17563-1.56427-1.30393-0.91213-1.74352a37.79982,37.79982,0,0,1,7.13141-3.67693,3.616,3.616,0,0,1,1.99226-.33359c2.016,0.20181,5.35429,1.55906,9.18483,4.292,4.59371,3.27786,8.68043,9.50494,5.94738,9.0009a25.58659,25.58659,0,0,0-3.00191-.43945c-2.07059-.18361-3.42908.02891-4.3831-0.06825a1.96274,1.96274,0,0,1-1.03614-.55044C67.88555,76.40433,63.4065,74.19781,56.83993,73.40033Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M130.64639,127.82663c-0.41362,1.29077-.90482,2.91-1.9576,2.15892a47.305,47.305,0,0,0-10.51423-5.80672c-0.22586-.05055-0.20021-0.36442-0.12054-0.54143a7.76418,7.76418,0,0,0,.56119-2.05533,5.10548,5.10548,0,0,1,1.01156-1.8083,18.619,18.619,0,0,0,1.89907-6.60278,16.56311,16.56311,0,0,0-.30071-5.24067,10.43877,10.43877,0,0,1-.63877-2.31961c0.01245-.73927.36027-1.51387,0.43164-2.38651,0.20819-2.525-2.97853-4.63025-4.71776-5.44156-3.94536-1.84228-8.13861-3.48984-12.39993-5.73812-2.40556-1.26892-4.33617-4.05224-6.26607-5.546-1.94966-1.50432-8.21587-3.9897-10.72015-4.65121a1.03792,1.03792,0,0,1-.86172-0.86328,25.0259,25.0259,0,0,0-9.3712-14.55086c-1.759-1.36679.21341-2.14416,2.63539-2.26232C117.499,62.86187,139.47112,98.00018,130.64639,127.82663Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M115.14271,110.93761c-0.02739-.19436-0.111-0.85254-0.11036-0.98836a2.60871,2.60871,0,0,1,1.04881-1.08393,10.66027,10.66027,0,0,1,1.47176-1.03614c0.13838-.08695.23019,0.114,0.24892,0.15381,1.40748,2.13671.87988,7.41754-.13721,9.92874-0.11795.25534-.33306,0.35473-0.42089,0.16768a6.365,6.365,0,0,0-2.17328-2.71248,0.53647,0.53647,0,0,1-.16314-0.43959A10.78454,10.78454,0,0,0,115.14271,110.93761Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M97.73573,123.93565a3.07547,3.07547,0,0,1,1.33667-1.817c1.28091-.80333,3.40964-0.838,5.46408-0.97864a17.34326,17.34326,0,0,0,5.53425-.90517c0.85722-.39425,1.71461-1.517,3.03915-0.945a2.19649,2.19649,0,0,1,1.15583,1.41653,5.15178,5.15178,0,0,1,.29759,2.13323c-0.19071,2.46342-2.1913,3.66618-2.55122,5.96884a2.05507,2.05507,0,0,1-.29862,1.07563c-1.52756,1.55473-4.54834,1.22774-7.27933.95267a8.69735,8.69735,0,0,1-2.6051-.43856,5.72964,5.72964,0,0,1-1.302-1.04622,30.722,30.722,0,0,1-2.24377-2.38822,4.156,4.156,0,0,1-1.01465-1.30081A6.83012,6.83012,0,0,1,97.73573,123.93565Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M49.90735,152.96743a8.06424,8.06424,0,0,1-2.0101-2.48694c-4.67633-7.4744-7.29718-33.94506-1.27119-42.92361,1.91762-3.14586,3.94919-1.69538,3.274.73615-1.15409,5.45855-.44672,8.51743,2.20759,14.44054,4.1714,8.80221,17.047,21.02289,20.4556,25.45534,5.84308,7.6015,7.7877,13.13937,7.76138,14.63142-0.03154,1.14459-.25115,1.87413-2.25675,1.70475A50.122,50.122,0,0,1,49.90735,152.96743Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M55.95568,117.26983A21.79207,21.79207,0,0,1,56.26125,99.645c0.7188-1.35484,1.42117-2.24,2.33834-1.985,0.998,0.27818,1.22855,1.29978,1.36626,3.19329,1.01553,15.714,10.52044,21.00487,22.459,26.55281,9.41867,4.81489,20.135,10.31952,29.11613,23.65392,1.35938,1.92507,1.55544,3.09321.02079,4.19587A48.8677,48.8677,0,0,1,93.868,163.29216c-1.09244.25566-2.21933,0.06375-3.187-2.43259C80.59868,134.8822,63.671,136.05311,55.95568,117.26983Z",transform:"translate(-31.77892 -24.7154)"}),r["default"].createElement("path",{d:"M118.40353,149.20773c-1.535,1.5343-2.40553.3315-2.907-.65371a45.56777,45.56777,0,0,0-7.63545-12.10255,0.78694,0.78694,0,0,1,.72767-1.34444,5.49981,5.49981,0,0,0,3.03671-.493,6.08555,6.08555,0,0,0,2.787-3.94433c0.427-1.50695.447-1.95037,1.37041-2.04423a3.03406,3.03406,0,0,1,.90418.10947,10.91687,10.91687,0,0,1,3.21234,1.91465,31.19354,31.19354,0,0,1,6.22659,6.775,1.79563,1.79563,0,0,1-.19539,1.76708A50.13544,50.13544,0,0,1,118.40353,149.20773Z",transform:"translate(-31.77892 -24.7154)"})))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool,style:d["default"].object},s.defaultProps={className:"nyplLionLogoInverse",title:"The New York Public Library",height:"139",width:"252",viewBox:"0 0 252 139",fill:"#000"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":d},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M23.4829,9.5H7.83a1.0143,1.0143,0,1,1,0-2.0285H23.4829A1.0143,1.0143,0,1,1,23.4829,9.5Z"}),r["default"].createElement("path",{d:"M23.4829,19.5285H7.83a1.0143,1.0143,0,1,1,0-2.0285H23.4829A1.0143,1.0143,0,1,1,23.4829,19.5285Z"}),r["default"].createElement("path",{d:"M16.8125,14.5h-9a0.977,0.977,0,0,1-1-.9857A1.0155,1.0155,0,0,1,7.83,12.5h8.7651a1.1951,1.1951,0,0,1,1.2178,1A0.9889,0.9889,0,0,1,16.8125,14.5Z"}),r["default"].createElement("path",{d:"M16.5947,25.4H7.83a1.0143,1.0143,0,1,1,0-2.0285h8.7651A1.0143,1.0143,0,1,1,16.5947,25.4Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"list-icon",title:"NYPL List SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){return"large"===e?r["default"].createElement("g",null,r["default"].createElement("path",{d:"M15.9996,11.594a2.00366,2.00366,0,1,1-2.00366,2.00366A2.00388,2.00388,0,0,1,15.9996,11.594m0-1.68708a3.69114,3.69114,0,1,0,3.69074,3.69074A3.69513,3.69513,0,0,0,15.9996,9.90695"}),r["default"].createElement("path",{d:"M27.23733,10.69471a11.53736,11.53736,0,0,0-2.931-5.21513c-0.03126-.03206-0.0577-0.06732-0.089-0.09938-0.03286-.03286-0.06973-0.06011-0.10259-0.093a11.5287,11.5287,0,0,0-5.22074-2.935,11.3323,11.3323,0,0,0-5.789,0,11.52609,11.52609,0,0,0-5.21994,2.935c-0.03366.03286-.06973,0.06011-0.10259,0.093-0.03206.03206-.05851,0.06732-0.08976,0.09938a11.52831,11.52831,0,0,0-2.93015,5.21513,11.69294,11.69294,0,0,0,0,5.80581,11.52676,11.52676,0,0,0,2.93015,5.21593c0.03126,0.03206.05771,0.06732,0.08976,0.09858,0.03286,0.03366.06893,0.06091,0.10259,0.09377L16,30.02362l8.11482-8.11482c0.03286-.03286.06973-0.06011,0.10259-0.09377,0.03126-.03126.05771-0.06652,0.089-0.09858a11.5358,11.5358,0,0,0,2.931-5.21593,11.693,11.693,0,0,0,0-5.80581M22.79321,20.94463l-3.89912,3.89912L16,27.73784l-2.89489-2.89409L9.206,20.94383l-0.55221-.55221A10.00247,10.00247,0,0,1,8.653,6.8044l0.55381-.553a9.97128,9.97128,0,0,1,13.58562-.0008L23.347,6.8052a10.00228,10.00228,0,0,1-.0008,13.58642Z"})):r["default"].createElement("g",null,r["default"].createElement("path",{d:"M25.70866,11.094a9.9406,9.9406,0,0,0-2.53-4.49511c-0.027-.02763-0.04981-0.058-0.07679-0.08566-0.02837-.02832-0.06019-0.05181-0.08855-0.08013A9.95556,9.95556,0,0,0,18.50669,3.9033a9.79611,9.79611,0,0,0-4.9971,0,9.95331,9.95331,0,0,0-4.5059,2.52975c-0.02906.02832-.06019,0.05181-0.08855,0.08013-0.02767.02763-.0505,0.058-0.07748,0.08566A9.9328,9.9328,0,0,0,6.30831,11.094a10.06419,10.06419,0,0,0,0,5.00424A9.93146,9.93146,0,0,0,8.83765,20.594c0.027,0.02763.04981,0.058,0.07748,0.085,0.02837,0.029.0595,0.0525,0.08855,0.08082l7.0048,6.99447,7.0048-6.99447c0.02837-.02832.06019-0.05181,0.08855-0.08082,0.027-.02694.04981-0.05734,0.07679-0.085a9.93926,9.93926,0,0,0,2.53-4.4958,10.06422,10.06422,0,0,0,0-5.00424m-4.20385,8.54915-3.15475,3.1501-2.34158,2.33813-2.34223-2.33813L10.5115,19.64246l-0.44679-.44613a8.07225,8.07225,0,0,1-.00065-10.97711l0.44808-.44678a8.0764,8.0764,0,0,1,10.992-.00065L21.9529,8.21987a8.0721,8.0721,0,0,1-.00065,10.97646Z"}),r["default"].createElement("circle",{cx:"15.9996",cy:"13.59769",r:"2.00366"}))},o=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.size,o=e.style,u=e.fill,c=e.ariaHidden,f=e.focusable;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon",style:o,fill:u,"aria-hidden":c,focusable:f},r["default"].createElement("title",null,i),s(d))};o.propTypes={size:d["default"].string,className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,style:d["default"].object,fill:d["default"].string,ariaHidden:d["default"].bool,focusable:d["default"].bool},o.defaultProps={className:"locatorIcon",title:"NYPL Locator SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=o},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.style,s=e.fill,o=e.ariaHidden,u=e.preserveAspectRatio,c=e.iconId,f=e.svgRole,h=e.focusable;return r["default"].createElement("svg",{viewBox:t,height:a,width:l,className:n+" svgIcon",style:d,fill:s,"aria-hidden":o,preserveAspectRatio:u,"aria-labelledby":c,role:f,focusable:h},r["default"].createElement("title",{id:c},i),r["default"].createElement("path",{d:"M16.07184,6.52418c1.24313,0,2.29334,1.39823,2.29334,3.05329s-1.05022,3.05329-2.29334,3.05329S13.7785,11.23252,13.7785,9.57746s1.05022-3.05329,2.29334-3.05329m0-1.8c-2.26069,0-4.09334,2.17289-4.09334,4.85329s1.83265,4.85329,4.09334,4.85329,4.09334-2.17289,4.09334-4.85329-1.83265-4.85329-4.09334-4.85329Z",opacity:"0.85"}),r["default"].createElement("path",{d:"M25.28125,27.34375H21a1,1,0,0,1,0-2h4.28125l-2.377-6.2041a.28873.28873,0,0,0-.10547-.11719,47.03461,47.03461,0,0,0-6.7832-.585,48.40643,48.40643,0,0,0-6.957.6084h.00049c.0249,0-.00244.03418-.02246.085l-2.355,6.14551L11,25.34375a1,1,0,0,1,0,2H6.71826a2.04254,2.04254,0,0,1-1.90088-2.791l2.355-6.14551a2.07691,2.07691,0,0,1,1.57617-1.33789,50.4409,50.4409,0,0,1,7.26709-.63184,48.54187,48.54187,0,0,1,7.11816.61621,2.19071,2.19071,0,0,1,1.63184,1.35352l2.417,6.14551a2.04377,2.04377,0,0,1-1.90137,2.791Z",opacity:"0.85"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,style:d["default"].object,ariaHidden:d["default"].bool,preserveAspectRatio:d["default"].string,iconId:d["default"].string,svgRole:d["default"].string,focusable:d["default"].bool},s.defaultProps={className:"loginIcon",title:"Log in to your account",width:"32",height:"32",viewBox:"0 0 32 32",preserveAspectRatio:"xMidYMid meet",svgRole:"img"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.style,s=e.fill,o=e.ariaHidden,u=e.preserveAspectRatio,c=e.iconId,f=e.svgRole,h=e.focusable;return r["default"].createElement("svg",{viewBox:t,height:a,width:l,className:n+" svgIcon",style:d,fill:s,"aria-hidden":o,preserveAspectRatio:u,"aria-labelledby":c,role:f,focusable:h},r["default"].createElement("title",{id:c},i),r["default"].createElement("ellipse",{cx:"16.07184",cy:"9.57746",rx:"4.09334",ry:"4.85329"}),r["default"].createElement("path",{d:"M25.25882,27.3451,6.61176,27.33725a2.05352,2.05352,0,0,1-1.87843-2.5451l2.46189-6.50245a2.1203,2.1203,0,0,1,1.34706-1.18431,45.76876,45.76876,0,0,1,7.00567-.657c2.94823,0,5.86851.45206,7.09041.53934a2.20375,2.20375,0,0,1,1.97255,1.1098l2.62353,6.64706A2.01818,2.01818,0,0,1,25.25882,27.3451Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,style:d["default"].object,ariaHidden:d["default"].bool,preserveAspectRatio:d["default"].string,iconId:d["default"].string,svgRole:d["default"].string,focusable:d["default"].bool},s.defaultProps={className:"loginIcon",title:"You are logged in to your account",width:"32",height:"32",viewBox:"0 0 32 32",preserveAspectRatio:"xMidYMid meet",svgRole:"img"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.style,s=e.ariaHidden,o=e.focusable;return r["default"].createElement("svg",{viewBox:t,height:a,width:l,className:n+" svgIcon",style:d,"aria-hidden":s,focusable:o},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M35.951 9.268a2.826 2.826 0 1 0-4.084 3.906l5.418 5.664H13.187a2.826 2.826 0 0 0 0 5.652h24.258l-5.742 6.222a2.826 2.826 0 0 0 4.154 3.834l11.916-12.917z"}),r["default"].createElement("path",{d:"M45.173 39.56H5.652V5.653h17.366a2.826 2.826 0 0 0 0-5.652H0v45.212h45.173a2.826 2.826 0 0 0 0-5.651z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,style:d["default"].object,ariaHidden:d["default"].bool,focusable:d["default"].bool},s.defaultProps={className:"logoutIcon",height:"45.212",title:"NYPL Logout SVG Icon",viewBox:"0 0 47.99 45.212",width:"47.99"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":d},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M12.25,16a3.738,3.738,0,0,0,1.09839,2.65161l5.30328-5.30328A3.75,3.75,0,0,0,12.25,16Z",fill:"none"}),r["default"].createElement("path",{d:"M16,19.75a3.75,3.75,0,0,0,2.65167-6.40167l-5.30328,5.30328A3.738,3.738,0,0,0,16,19.75Z"}),r["default"].createElement("path",{d:"M24.4411,7.5589A11.93752,11.93752,0,1,0,27.9375,16,11.90013,11.90013,0,0,0,24.4411,7.5589ZM12.25,16a3.75013,3.75013,0,1,1,1.09839,2.65161A3.75,3.75,0,0,1,12.25,16ZM16,26.9375a10.85556,10.85556,0,0,1-6.99524-2.52808l4.41772-4.41772a4.75228,4.75228,0,0,0,6.56927-6.56927l4.41766-4.41766A10.9387,10.9387,0,0,1,16,26.9375Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"media-blu-ray-icon",title:"NYPL Media/Blu-Ray SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.style,s=e.fill,o=e.ariaHidden,u=e.focusable;return r["default"].createElement("svg",{viewBox:t,width:l,height:a,className:n+" svgIcon",fill:s,style:d,"aria-hidden":o,focusable:u},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M26.22029,10.40244H5.77971a1.09221,1.09221,0,1,1,0-2.18441H26.22029A1.09221,1.09221,0,1,1,26.22029,10.40244Z"}),r["default"].createElement("path",{d:"M26.22029,16.95568H5.77971a1.09221,1.09221,0,0,1,0-2.18441H26.22029A1.09221,1.09221,0,0,1,26.22029,16.95568Z"}),r["default"].createElement("path",{d:"M26.22029,23.782H5.77971a1.09221,1.09221,0,1,1,0-2.18441H26.22029A1.09221,1.09221,0,1,1,26.22029,23.782Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,style:d["default"].object,ariaHidden:d["default"].bool,focusable:d["default"].bool},s.defaultProps={className:"menuIcon",title:"NYPL Hamburger Menu SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.title,n=e.viewBox,d=e.width;return r["default"].createElement("svg",{"aria-hidden":t,className:a+" svgIcon",height:l,viewBox:n,width:d},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M9.826 45.06l28.026-28.026-6.964-6.964L2.862 38.096 0 47.923l9.826-2.863zM33.409 7.626l2.792-2.792 6.965 6.964-2.793 2.793zM38.243 2.793L41.036 0 48 6.965l-2.792 2.792z"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,title:d["default"].string,width:d["default"].string,viewBox:d["default"].string},s.defaultProps={ariaHidden:!0,className:"filter-cancel-icon",height:"47.923",title:"NYPL Cancel Filter SVG Icon",width:"48",viewBox:"0 0 48 47.923"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.className,a=e.title,l=e.height,i=e.width,n=e.viewBox,d=e.fill,s=e.ariaHidden;return r["default"].createElement("svg",{width:i,height:l,viewBox:n,className:t+" svgIcon",fill:d,"aria-hidden":s},r["default"].createElement("title",null,a),r["default"].createElement("path",{d:"M7.96875,4.64844A3.32031,3.32031,0,1,1,4.64844,7.96875,3.32407,3.32407,0,0,1,7.96875,4.64844M7.96875,0A7.96875,7.96875,0,1,0,15.9375,7.96875,7.96875,7.96875,0,0,0,7.96875,0Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"radioActiveIcon",title:"NYPL Radio Active Icon",height:"16px",width:"16px",viewBox:"0 0 16 16",fill:"#000"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.className,a=e.title,l=e.height,i=e.width,n=e.viewBox,d=e.fill,s=e.ariaHidden;return r["default"].createElement("svg",{width:i,height:l,viewBox:n,className:t+" svgIcon",fill:d,"aria-hidden":s},r["default"].createElement("title",null,a),r["default"].createElement("path",{d:"M7.96875,1A6.96875,6.96875,0,1,1,1,7.96875,6.97663,6.97663,0,0,1,7.96875,1m0-1A7.96875,7.96875,0,1,0,15.9375,7.96875,7.96873,7.96873,0,0,0,7.96875,0Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"radioInactiveIcon",title:"NYPL Radio Inactive Icon",height:"16px",width:"16px",viewBox:"0 0 16 16",fill:"#000"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.fill,s=e.ariaHidden,o=e.labelledById;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":s,"aria-labelledby":o,fill:d},r["default"].createElement("title",{id:o},i),r["default"].createElement("path",{d:"M10.96075,11l4.60907-3.19434a1,1,0,0,0-1.13965-1.64355L5.939,12.04688l8.83594,6.248a0.99981,0.99981,0,0,0,1.1543-1.63281L10.75061,13H23v8H6a1,1,0,0,0,0,2H25V11H10.96075Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool,labelledById:d["default"].string.isRequired},s.defaultProps={ariaHidden:!0,className:"reset-icon",title:"NYPL Reset SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32",fill:"#000",labelledById:""},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden,s=e.preserveAspectRatio,o=e.iconId,u=e.svgRole;return r["default"].createElement("svg",{viewBox:t,height:a,width:l,className:n+" svgIcon","aria-hidden":d,preserveAspectRatio:s,"aria-labelledby":o,role:u},r["default"].createElement("title",{id:o},i),r["default"].createElement("polygon",{points:"16.959 25.998 27.298 15.707 16.959 5.417 15.026 7.397 22.08 14.548 4.688 14.548 4.687 16.963 22.08 16.963 15.026 24.065 16.959 25.998"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,style:d["default"].object,ariaHidden:d["default"].bool,preserveAspectRatio:d["default"].string,svgRole:d["default"].string,iconId:d["default"].string},s.defaultProps={ariaHidden:!0,className:"rightArrowIcon",title:"NYPL Right Arrow Icon",width:"32",height:"32",viewBox:"0 0 32 32",preserveAspectRatio:"xMidYMid meet",
svgRole:"img"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.fill,i=e.height,n=e.title,d=e.viewBox,s=e.width,o=e.focusable;return r["default"].createElement("svg",{"aria-hidden":t,className:a+" svgIcon",fill:l,height:i,viewBox:d,width:s,focusable:o},r["default"].createElement("title",null,n),r["default"].createElement("polygon",{points:"13 8.437 20.563 16 13 23.563 11.593 22.155 17.748 16 11.593 9.845 13 8.437"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,fill:d["default"].string,height:d["default"].string,title:d["default"].string,width:d["default"].string,viewBox:d["default"].string,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"right-wedge-icon",fill:"#000",height:"32",title:"NYPL Right Wedge SVG Icon",width:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.style,s=e.fill,o=e.ariaHidden,u=e.focusable;return r["default"].createElement("svg",{viewBox:t,width:l,height:a,className:n+" svgIcon",fill:s,style:d,"aria-hidden":o,focusable:u},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M25.26014,23.627l-3.76-3.75948a8.53632,8.53632,0,1,0-2.07145,1.85393l3.86877,3.86822A1.38781,1.38781,0,0,0,25.26014,23.627ZM9.109,14.52943a5.75012,5.75012,0,1,1,5.75012,5.74948A5.75662,5.75662,0,0,1,9.109,14.52943Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,style:d["default"].object,ariaHidden:d["default"].bool,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"searchIcon",title:"NYPL Search SVG Icon",width:"32",height:"32",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.iconId,n=e.preserveAspectRatio,d=e.title,s=e.viewBox,o=e.width,u=e.focusable;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":i,className:a+" svgIcon",height:l,preserveAspectRatio:n,viewBox:s,width:o,focusable:u},r["default"].createElement("title",{id:i},d),r["default"].createElement("path",{d:"M45.163 50.301l-6.19-32.137a6.754 6.754 0 0 0-6.75-5.289h-.07V6.25A6.25 6.25 0 0 0 25.902 0h-6.5a6.25 6.25 0 0 0-6.25 6.25v6.625h-.102a6.754 6.754 0 0 0-6.75 5.289L.11 50.3a6.568 6.568 0 0 0 6.75 7.574h31.551a6.568 6.568 0 0 0 6.75-7.574zM17.682 6.671a2.235 2.235 0 0 1 2.234-2.234h5.533a2.235 2.235 0 0 1 2.234 2.235v6.203H17.682zm22.925 46.492a2.891 2.891 0 0 1-2.195.962H6.862a2.89 2.89 0 0 1-2.195-.962 2.535 2.535 0 0 1-.62-2.196l6.19-32.137a2.814 2.814 0 0 1 2.814-2.205h.101v5.57a2.235 2.235 0 0 0 2.243 2.234h.06a2.235 2.235 0 0 0 2.227-2.234v-5.57h10.001v5.518a2.235 2.235 0 1 0 4.47 0v-5.518h.07a2.814 2.814 0 0 1 2.814 2.205l6.19 32.137a2.535 2.535 0 0 1-.62 2.196z"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,preserveAspectRatio:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"shopping-bag-icon",height:"45.274",preserveAspectRatio:"xMidYMid meet",title:"shop",viewBox:"0 0 45.274 57.875",width:"57.875"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.className,a=e.title,l=e.height,i=e.width,n=e.viewBox,d=e.fill,s=e.ariaHidden;return r["default"].createElement("svg",{width:i,height:l,viewBox:n,className:t+" svgIcon",fill:d,"aria-hidden":s},r["default"].createElement("title",null,a),r["default"].createElement("circle",{cx:"6",cy:"6",r:"6",fill:d}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"smallDotClosedIcon",title:"NYPL Small Dot Closed Icon",height:"12px",width:"12px",viewBox:"0 0 12 12",fill:"#010101"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.className,a=e.title,l=e.height,i=e.width,n=e.viewBox,d=e.fill,s=e.ariaHidden;return r["default"].createElement("svg",{width:i,height:l,viewBox:n,className:t+" svgIcon",fill:d,"aria-hidden":s},r["default"].createElement("title",null,a),r["default"].createElement("path",{d:"M6,2A4,4,0,1,1,2,6,4.00454,4.00454,0,0,1,6,2M6,0a6,6,0,1,0,6,6A6,6,0,0,0,6,0Z",fill:d}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"smallDotOpenIcon",title:"NYPL Small Dot Open Icon",height:"12px",width:"12px",viewBox:"0 0 12 12",fill:"#010101"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.ariaHidden;return r["default"].createElement("svg",{width:l,height:a,viewBox:t,className:n+" svgIcon","aria-hidden":d},r["default"].createElement("title",null,i),r["default"].createElement("path",{d:"M26.45536,26.45536H16.80078L4.92843,14.58216l9.65373-9.65373,11.8732,11.87235v9.65458ZM17.87606,23.859h5.983v-5.983L14.58216,8.5992l-5.983,5.983Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,ariaHidden:d["default"].bool},s.defaultProps={className:"tag-icon",title:"NYPL Tag SVG Icon",width:"24",height:"24",viewBox:"0 0 32 32"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.iconId,n=e.preserveAspectRatio,d=e.title,s=e.viewBox,o=e.width;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":i,className:a+" svgIcon",height:l,preserveAspectRatio:n,title:d,viewBox:s,width:o},r["default"].createElement("title",{id:i},d),r["default"].createElement("path",{d:"M16.644 0v12.131h11.424v7.534H16.644v12.309a19.61 19.61 0 0 0 .441 5.357 3.664 3.664 0 0 0 1.652 1.895 6.971 6.971 0 0 0 3.656.953 13.194 13.194 0 0 0 7.274-2.37v7.573a28.934 28.934 0 0 1-5.589 2.031 23.648 23.648 0 0 1-5.413.586 18.768 18.768 0 0 1-5.837-.831A12.607 12.607 0 0 1 8.5 44.796a8.592 8.592 0 0 1-2.484-3.273 14.11 14.11 0 0 1-.692-5.023V19.665H0v-6.79a14.235 14.235 0 0 0 4.862-2.634 13.131 13.131 0 0 0 3.247-4.124A18.576 18.576 0 0 0 9.796 0z"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,preserveAspectRatio:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string},s.defaultProps={ariaHidden:!0,className:"tumblr-icon",height:"47.999",preserveAspectRatio:"xMidYMid meet",title:"Tumblr",viewBox:"0 0 29.667 47.999",width:"29.667"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.iconId,n=e.preserveAspectRatio,d=e.title,s=e.viewBox,o=e.width,u=e.focusable;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":i,className:a+" svgIcon",height:l,preserveAspectRatio:n,title:d,viewBox:s,width:o,focusable:u},r["default"].createElement("title",{id:i},d),r["default"].createElement("path",{d:"M68,6.51074a27.99231,27.99231,0,0,1-8.01276,2.18635,13.937,13.937,0,0,0,6.13419-7.68177,28.01282,28.01282,0,0,1-8.859,3.36949A13.94135,13.94135,0,0,0,33.48906,17.04873,39.66941,39.66941,0,0,1,4.73387,2.54149,13.85672,13.85672,0,0,0,9.05141,21.0789a13.94473,13.94473,0,0,1-6.319-1.73673c-.001.058-.0012.11605-.0012.17455a13.91,13.91,0,0,0,11.1911,13.61485,14.05089,14.05089,0,0,1-6.30034.23787,13.95724,13.95724,0,0,0,13.03232,9.6428A28.07735,28.07735,0,0,1,3.328,48.95584,28.53232,28.53232,0,0,1,0,48.762,39.625,39.625,0,0,0,21.38562,55c25.66113,0,39.69344-21.15722,39.69344-39.50546q0-.90295-.04031-1.79619A28.279,28.279,0,0,0,68,6.51074Z"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,preserveAspectRatio:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"twitter-icon",height:"68",preserveAspectRatio:"xMidYMid meet",title:"Twitter",viewBox:"0 0 68 55",width:"55"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.height,i=e.iconId,n=e.preserveAspectRatio,d=e.title,s=e.viewBox,o=e.width;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":i,className:a+" svgIcon",height:l,preserveAspectRatio:n,viewBox:s,width:o},r["default"].createElement("title",{id:i},d),r["default"].createElement("g",null,r["default"].createElement("path",{d:"M52.36107,47.9805,65.04781,35.29375a2.97433,2.97433,0,1,0-4.20634-4.20634L48.18214,43.74674,35.509,30.90731a2.97542,2.97542,0,0,0-4.23539,4.1802L43.97471,47.95417,31.095,60.83392a2.97433,2.97433,0,1,0,4.20634,4.20634L48.154,52.18757,60.82695,65.02573a2.9744,2.9744,0,0,0,4.23539-4.17729Z"}),r["default"].createElement("path",{d:"M48.07141,96.142A48.0713,48.0713,0,1,1,82.07922,82.07849h0A47.94915,47.94915,0,0,1,48.07141,96.142Zm0-90.48193A42.41114,42.41114,0,1,0,78.07532,18.06775,42.29216,42.29216,0,0,0,48.07141,5.66Z"})))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,preserveAspectRatio:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string},s.defaultProps={ariaHidden:!0,className:"x-close-circle-icon",height:"48",preserveAspectRatio:"xMidYMid meet",title:"close",viewBox:"0 0 98 98",width:"48"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.viewBox,a=e.height,l=e.width,i=e.title,n=e.className,d=e.style,s=e.fill,o=e.ariaHidden,u=e.preserveAspectRatio,c=e.iconId,f=e.svgRole,h=e.focusable;return r["default"].createElement("svg",{viewBox:t,height:a,width:l,className:n+" svgIcon",style:d,fill:s,"aria-hidden":o,preserveAspectRatio:u,"aria-labelledby":c,role:f,focusable:h},r["default"].createElement("title",{id:c},i),r["default"].createElement("path",{d:"M17.91272,15.97339l5.65689-5.65689A1.32622,1.32622,0,0,0,21.694,8.44093L16.04938,14.0856l-5.65082-5.725A1.32671,1.32671,0,1,0,8.51,10.22454l5.66329,5.73712L8.43038,21.7046a1.32622,1.32622,0,1,0,1.87557,1.87557l5.73088-5.73088,5.65074,5.72441a1.32626,1.32626,0,1,0,1.88852-1.86261Z"}))};s.propTypes={className:d["default"].string,title:d["default"].string,height:d["default"].string,width:d["default"].string,viewBox:d["default"].string,fill:d["default"].string,style:d["default"].object,ariaHidden:d["default"].bool,preserveAspectRatio:d["default"].string,iconId:d["default"].string,svgRole:d["default"].string,focusable:d["default"].bool},s.defaultProps={ariaHidden:!0,className:"x-icon",title:"Close Icon",fill:"#000",height:"32",width:"32",viewBox:"0 0 32 32",preserveAspectRatio:"xMidYMid meet",svgRole:"img"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(2),r=l(i),n=a(1),d=l(n),s=function(e){var t=e.ariaHidden,a=e.className,l=e.iconId,i=e.height,n=e.preserveAspectRatio,d=e.title,s=e.viewBox,o=e.width;return r["default"].createElement("svg",{"aria-hidden":t,"aria-labelledby":l,className:a+" svgIcon",height:i,preserveAspectRatio:n,title:d,viewBox:s,width:o},r["default"].createElement("title",{id:l},d),r["default"].createElement("path",{d:"M13.746 0l-3.243 6.43L7.259 0H3.123l5.845 10.19.035-.024v7.833h3v-7.833l.032.023L17.882 0zM22.502 6a1.52 1.52 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-3 0v-6a1.518 1.518 0 0 1 1.5-1.5zm0-3a4.512 4.512 0 0 0-4.5 4.5v6a4.5 4.5 0 0 0 9 0v-6a4.512 4.512 0 0 0-4.5-4.5zM36.002 3v11.812c-1.31 1.09-3 1.746-3-2.142V3h-3v10.28h.006c.044 2.481.568 6.946 5.994 3.316v1.403h3V3zM40.501 32.999a1.499 1.499 0 0 0-1.5 1.5v1.5h3v-1.5a1.5 1.5 0 0 0-1.5-1.5zM27.002 34.499v7.874c1.017 1.017 3 1.125 3-.375v-7.03c0-1.5-1.5-1.97-3-.47z"}),r["default"].createElement("path",{d:"M47.755 27.26a6.24 6.24 0 0 0-6.135-6.015C38.351 21.085 30.866 21 24.29 21s-14.593.082-17.862.246a6.384 6.384 0 0 0-4.269 1.785 6.383 6.383 0 0 0-1.866 4.23C.1 30.78 0 32.055 0 33.819q0 2.641.293 7.922a6.384 6.384 0 0 0 1.866 4.23 6.398 6.398 0 0 0 4.269 1.784c3.269.161 11.287.243 17.861.243s14.059-.082 17.331-.243a6.239 6.239 0 0 0 6.135-6.014q.246-4.404.246-7.922c0-2.35-.082-3.624-.246-6.56zM9.003 44.998h-3v-15h-3v-3h9v3h-3zm12 0h-3v-1.403c-5.705 3.199-5.95.102-5.995-2.376h-.005v-8.217h3v8.264c0 1.813 1.69 1.638 3 .545V33h3v11.997zm11.999-3.04c0 3.134-3.211 4.048-6 1.61v1.43h-3v-18h3v4.876c3-3 6-1.875 6 1.125zm12-5.96v1.5h-6v3a1.5 1.5 0 0 0 3 0v-1.5h3v1.5a4.5 4.5 0 1 1-9 0v-6a4.5 4.5 0 0 1 9 0z"}))};s.propTypes={ariaHidden:d["default"].bool,className:d["default"].string,height:d["default"].string,iconId:d["default"].string.isRequired,preserveAspectRatio:d["default"].string,title:d["default"].string,viewBox:d["default"].string,width:d["default"].string},s.defaultProps={ariaHidden:!0,className:"youtube-icon",height:"47.998",preserveAspectRatio:"xMidYMid meet",title:"Youtube",viewBox:"0 0 48.001 47.998",width:"48.001"},t["default"]=s},function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.ShoppingBagIcon=t.PencilIcon=t.LibraryCardIcon=t.EnvelopeIcon=t.YoutubeIcon=t.TumblrIcon=t.TwitterIcon=t.InstagramIcon=t.FaceBookIcon=t.RightArrowIcon=t.LeftArrowIcon=t.GenericWedgeIcon=t.BuildingIcon=t.SmallDotOpenIcon=t.SmallDotClosedIcon=t.RadioActiveIcon=t.RadioInactiveIcon=t.LeftWedgeIcon=t.RightWedgeIcon=t.DivideLineIcon=t.CheckSoloIcon=t.SearchIcon=t.LogoutIcon=t.LoginIconSolid=t.LoginIcon=t.MenuIcon=t.LocatorIcon=t.TagIcon=t.EReaderIcon=t.LargePrintIcon=t.DvdDiscIcon=t.AudioDiscIcon=t.MediaBluRayIcon=t.AudioHeadphoneIcon=t.CircleDashIcon=t.ResetIcon=t.DownLoadIcon=t.ApplyIcon=t.GridIcon=t.ListIcon=t.FilterCancelIcon=t.FilterIcon=t.XCloseIcon=t.XIcon=t.DotsIcon=t.BookIcon=t.CarouselCircleIcon=t.LionLogoWithTextInverse=t.LionLogoWithText=t.LionLogoIcon=void 0;var i=a(32),r=l(i),n=a(33),d=l(n),s=a(34),o=l(s),u=a(13),c=l(u),f=a(11),h=l(f),p=a(17),g=l(p),v=a(56),m=l(v),w=a(55),y=l(w),b=a(24),E=l(b),M=a(23),x=l(M),N=a(35),I=l(N),A=a(26),_=l(A),B=a(8),H=l(B),Z=a(18),P=l(Z),R=a(45),V=l(R),L=a(15),T=l(L),O=a(10),j=l(O),C=a(40),S=l(C),Y=a(9),z=l(Y),k=a(19),D=l(k),F=a(28),G=l(F),q=a(20),W=l(q),X=a(52),U=l(X),$=a(36),J=l($),K=a(41),Q=l(K),ee=a(37),te=l(ee),ae=a(38),le=l(ae),ie=a(39),re=l(ie),ne=a(48),de=l(ne),se=a(14),oe=l(se),ue=a(16),ce=l(ue),fe=a(47),he=l(fe),pe=a(30),ge=l(pe),ve=a(44),me=l(ve),we=a(43),ye=l(we),be=a(50),Ee=l(be),Me=a(51),xe=l(Me),Ne=a(12),Ie=l(Ne),Ae=a(25),_e=l(Ae),Be=a(29),He=l(Be),Ze=a(46),Pe=l(Ze),Re=a(22),Ve=l(Re),Le=a(54),Te=l(Le),Oe=a(53),je=l(Oe),Ce=a(57),Se=l(Ce),Ye=a(27),ze=l(Ye),ke=a(21),De=l(ke),Fe=a(31),Ge=l(Fe),qe=a(42),We=l(qe),Xe=a(49),Ue=l(Xe);t.LionLogoIcon=r["default"],t.LionLogoWithText=d["default"],t.LionLogoWithTextInverse=o["default"],t.CarouselCircleIcon=c["default"],t.BookIcon=h["default"],t.DotsIcon=g["default"],t.XIcon=m["default"],t.XCloseIcon=y["default"],t.FilterIcon=E["default"],t.FilterCancelIcon=x["default"],t.ListIcon=I["default"],t.GridIcon=_["default"],t.ApplyIcon=H["default"],t.DownLoadIcon=P["default"],t.ResetIcon=V["default"],t.CircleDashIcon=T["default"],t.AudioHeadphoneIcon=j["default"],t.MediaBluRayIcon=S["default"],t.AudioDiscIcon=z["default"],t.DvdDiscIcon=D["default"],t.LargePrintIcon=G["default"],t.EReaderIcon=W["default"],t.TagIcon=U["default"],t.LocatorIcon=J["default"],t.MenuIcon=Q["default"],t.LoginIcon=te["default"],t.LoginIconSolid=le["default"],t.LogoutIcon=re["default"],t.SearchIcon=de["default"],t.CheckSoloIcon=oe["default"],t.DivideLineIcon=ce["default"],t.RightWedgeIcon=he["default"],t.LeftWedgeIcon=ge["default"],t.RadioInactiveIcon=me["default"],t.RadioActiveIcon=ye["default"],t.SmallDotClosedIcon=Ee["default"],t.SmallDotOpenIcon=xe["default"],t.BuildingIcon=Ie["default"],t.GenericWedgeIcon=_e["default"],t.LeftArrowIcon=He["default"],t.RightArrowIcon=Pe["default"],t.FaceBookIcon=Ve["default"],t.InstagramIcon=ze["default"],t.TwitterIcon=Te["default"],t.TumblrIcon=je["default"],t.YoutubeIcon=Se["default"],t.EnvelopeIcon=De["default"],t.LibraryCardIcon=Ge["default"],t.PencilIcon=We["default"],t.ShoppingBagIcon=Ue["default"]},function(e,t,a){(function(t){"use strict";function l(e,a,l,s,o){if("production"!==t.env.NODE_ENV)for(var u in e)if(e.hasOwnProperty(u)){var c;try{i("function"==typeof e[u],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",s||"React class",l,u),c=e[u](a,u,s,l,null,n)}catch(f){c=f}if(r(!c||c instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",s||"React class",l,u,typeof c),c instanceof Error&&!(c.message in d)){d[c.message]=!0;var h=o?o():"";r(!1,"Failed %s type: %s%s",l,c.message,null!=h?h:"")}}}if("production"!==t.env.NODE_ENV)var i=a(5),r=a(7),n=a(6),d={};e.exports=l}).call(t,a(3))},function(e,t,a){"use strict";var l=a(4),i=a(5),r=a(6);e.exports=function(){function e(e,t,a,l,n,d){d!==r&&i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t};return a.checkPropTypes=l,a.PropTypes=a,a}},function(e,t,a){(function(t){"use strict";var l=a(4),i=a(5),r=a(7),n=a(6),d=a(59);e.exports=function(e,a){function s(e){var t=e&&(B&&e[B]||e[H]);if("function"==typeof t)return t}function o(e,t){return e===t?0!==e||1/e===1/t:e!==e&&t!==t}function u(e){this.message=e,this.stack=""}function c(e){function l(l,o,c,f,h,p,g){if(f=f||Z,p=p||c,g!==n)if(a)i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if("production"!==t.env.NODE_ENV&&"undefined"!=typeof console){var v=f+":"+c;!d[v]&&s<3&&(r(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",p,f),d[v]=!0,s++)}return null==o[c]?l?new u(null===o[c]?"The "+h+" `"+p+"` is marked as required "+("in `"+f+"`, but its value is `null`."):"The "+h+" `"+p+"` is marked as required in "+("`"+f+"`, but its value is `undefined`.")):null:e(o,c,f,h,p)}if("production"!==t.env.NODE_ENV)var d={},s=0;var o=l.bind(null,!1);return o.isRequired=l.bind(null,!0),o}function f(e){function t(t,a,l,i,r,n){var d=t[a],s=N(d);if(s!==e){var o=I(d);return new u("Invalid "+i+" `"+r+"` of type "+("`"+o+"` supplied to `"+l+"`, expected ")+("`"+e+"`."))}return null}return c(t)}function h(){return c(l.thatReturnsNull)}function p(e){function t(t,a,l,i,r){if("function"!=typeof e)return new u("Property `"+r+"` of component `"+l+"` has invalid PropType notation inside arrayOf.");var d=t[a];if(!Array.isArray(d)){var s=N(d);return new u("Invalid "+i+" `"+r+"` of type "+("`"+s+"` supplied to `"+l+"`, expected an array."))}for(var o=0;o<d.length;o++){var c=e(d,o,l,i,r+"["+o+"]",n);if(c instanceof Error)return c}return null}return c(t)}function g(){function t(t,a,l,i,r){var n=t[a];if(!e(n)){var d=N(n);return new u("Invalid "+i+" `"+r+"` of type "+("`"+d+"` supplied to `"+l+"`, expected a single ReactElement."))}return null}return c(t)}function v(e){function t(t,a,l,i,r){if(!(t[a]instanceof e)){var n=e.name||Z,d=_(t[a]);return new u("Invalid "+i+" `"+r+"` of type "+("`"+d+"` supplied to `"+l+"`, expected ")+("instance of `"+n+"`."))}return null}return c(t)}function m(e){function a(t,a,l,i,r){for(var n=t[a],d=0;d<e.length;d++)if(o(n,e[d]))return null;var s=JSON.stringify(e);return new u("Invalid "+i+" `"+r+"` of value `"+n+"` "+("supplied to `"+l+"`, expected one of "+s+"."))}return Array.isArray(e)?c(a):("production"!==t.env.NODE_ENV?r(!1,"Invalid argument supplied to oneOf, expected an instance of array."):void 0,l.thatReturnsNull)}function w(e){function t(t,a,l,i,r){if("function"!=typeof e)return new u("Property `"+r+"` of component `"+l+"` has invalid PropType notation inside objectOf.");var d=t[a],s=N(d);if("object"!==s)return new u("Invalid "+i+" `"+r+"` of type "+("`"+s+"` supplied to `"+l+"`, expected an object."));for(var o in d)if(d.hasOwnProperty(o)){var c=e(d,o,l,i,r+"."+o,n);if(c instanceof Error)return c}return null}return c(t)}function y(e){function a(t,a,l,i,r){for(var d=0;d<e.length;d++){var s=e[d];if(null==s(t,a,l,i,r,n))return null}return new u("Invalid "+i+" `"+r+"` supplied to "+("`"+l+"`."))}if(!Array.isArray(e))return"production"!==t.env.NODE_ENV?r(!1,"Invalid argument supplied to oneOfType, expected an instance of array."):void 0,l.thatReturnsNull;for(var i=0;i<e.length;i++){var d=e[i];if("function"!=typeof d)return r(!1,"Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.",A(d),i),l.thatReturnsNull}return c(a)}function b(){function e(e,t,a,l,i){return M(e[t])?null:new u("Invalid "+l+" `"+i+"` supplied to "+("`"+a+"`, expected a ReactNode."))}return c(e)}function E(e){function t(t,a,l,i,r){var d=t[a],s=N(d);if("object"!==s)return new u("Invalid "+i+" `"+r+"` of type `"+s+"` "+("supplied to `"+l+"`, expected `object`."));for(var o in e){var c=e[o];if(c){var f=c(d,o,l,i,r+"."+o,n);if(f)return f}}return null}return c(t)}function M(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(M);if(null===t||e(t))return!0;var a=s(t);if(!a)return!1;var l,i=a.call(t);if(a!==t.entries){for(;!(l=i.next()).done;)if(!M(l.value))return!1}else for(;!(l=i.next()).done;){var r=l.value;if(r&&!M(r[1]))return!1}return!0;default:return!1}}function x(e,t){return"symbol"===e||"Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol}function N(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":x(t,e)?"symbol":t}function I(e){if("undefined"==typeof e||null===e)return""+e;var t=N(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function A(e){var t=I(e);switch(t){case"array":case"object":return"an "+t;case"boolean":case"date":case"regexp":return"a "+t;default:return t}}function _(e){return e.constructor&&e.constructor.name?e.constructor.name:Z}var B="function"==typeof Symbol&&Symbol.iterator,H="@@iterator",Z="<<anonymous>>",P={array:f("array"),bool:f("boolean"),func:f("function"),number:f("number"),object:f("object"),string:f("string"),symbol:f("symbol"),any:h(),arrayOf:p,element:g(),instanceOf:v,node:b(),objectOf:w,oneOf:m,oneOfType:y,shape:E};return u.prototype=Error.prototype,P.checkPropTypes=d,P.PropTypes=P,P}}).call(t,a(3))}])});
//# sourceMappingURL=index.min.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  trim: trim
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var authServerDomain = 'https://login.nypl.org/auth';

var config = {
  appTitle: 'NYPL | React Header Component',
  appName: 'NYPL React Header Component',
  port: 3001,
  webpackDevServerPort: 3000,
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  alertsApiUrl: 'https://refinery.nypl.org/api/nypl/ndo/v0.1/content/alerts?filter%5Bscope%5D=all',
  fundraising: {
    apiUrl: 'https://platform.nypl.org/api/v0.1/fundraising-banner',
    experimentName: 'FundraisingFall2017',
    primaryBgImage: '//d2znry4lg8s0tq.cloudfront.net/fundraising/snowflake_wht_bg.png',
    secondaryBgImage: '//d2znry4lg8s0tq.cloudfront.net/fundraising/snowflake_teal_bg.png',
    cookieExpInSeconds: '86400' // 24hrs
  },
  socialMediaLinks: {
    facebook: 'https://www.facebook.com/nypl',
    twitter: 'https://twitter.com/nypl',
    instagram: 'https://instagram.com/nypl',
    tumblr: 'http://nypl.tumblr.com/',
    youtube: 'https://www.youtube.com/user/NewYorkPublicLibrary',
    soundcloud: 'https://soundcloud.com/nypl'
  },
  donationLinks: [{
    url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=55&s_src=FRQ16ZZ_TNN&s_subsrc=55',
    amount: '$55'
  }, {
    url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=115&s_src=FRQ16ZZ_TNN&s_subsrc=115',
    amount: '$115'
  }, {
    url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=250&s_src=FRQ16ZZ_TNN&s_subsrc=250',
    amount: '$250'
  }, {
    url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=0&s_src=FRQ16ZZ_TNN&s_subsrc=other',
    amount: 'Other'
  }],
  loginMyNyplLinks: {
    catalog: authServerDomain + '/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount',
    research: authServerDomain + '/login?redirect_uri=https://catalog.nypl.org/patroninfo/top',
    tokenRefreshLink: authServerDomain + '/refresh',
    logOutLink: authServerDomain + '/logout'
  },
  myNyplLinks: {
    catalog: 'https://browse.nypl.org/iii/encore/myaccount',
    research: 'https://catalog.nypl.org/patroninfo/top'
  },
  patronApiUrl: 'https://platform.nypl.org/api/v0.1/auth/patron/tokens/'
};

exports.default = config;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(139);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);
var createFocusTrap = __webpack_require__(178);

var checkedProps = ['active', 'paused', 'tag', 'focusTrapOptions', '_createFocusTrap'];

var FocusTrap = function (_React$Component) {
  _inherits(FocusTrap, _React$Component);

  function FocusTrap() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FocusTrap);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FocusTrap.__proto__ || Object.getPrototypeOf(FocusTrap)).call.apply(_ref, [this].concat(args))), _this), _this.setNode = function (el) {
      _this.node = el;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FocusTrap, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (typeof document !== 'undefined') {
        this.previouslyFocusedElement = document.activeElement;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // We need to hijack the returnFocusOnDeactivate option,
      // because React can move focus into the element before we arrived at
      // this lifecycle hook (e.g. with autoFocus inputs). So the component
      // captures the previouslyFocusedElement in componentWillMount,
      // then (optionally) returns focus to it in componentWillUnmount.
      var specifiedFocusTrapOptions = this.props.focusTrapOptions;
      var tailoredFocusTrapOptions = {
        returnFocusOnDeactivate: false
      };
      for (var optionName in specifiedFocusTrapOptions) {
        if (!specifiedFocusTrapOptions.hasOwnProperty(optionName)) continue;
        if (optionName === 'returnFocusOnDeactivate') continue;
        tailoredFocusTrapOptions[optionName] = specifiedFocusTrapOptions[optionName];
      }

      this.focusTrap = this.props._createFocusTrap(this.node, tailoredFocusTrapOptions);
      if (this.props.active) {
        this.focusTrap.activate();
      }
      if (this.props.paused) {
        this.focusTrap.pause();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.active && !this.props.active) {
        this.focusTrap.deactivate();
      } else if (!prevProps.active && this.props.active) {
        this.focusTrap.activate();
      }

      if (prevProps.paused && !this.props.paused) {
        this.focusTrap.unpause();
      } else if (!prevProps.paused && this.props.paused) {
        this.focusTrap.pause();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.focusTrap.deactivate();
      if (this.props.focusTrapOptions.returnFocusOnDeactivate !== false && this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var elementProps = {
        ref: this.setNode
      };

      // This will get id, className, style, etc. -- arbitrary element props
      for (var prop in this.props) {
        if (!this.props.hasOwnProperty(prop)) continue;
        if (checkedProps.indexOf(prop) !== -1) continue;
        elementProps[prop] = this.props[prop];
      }

      return React.createElement(this.props.tag, elementProps, this.props.children);
    }
  }]);

  return FocusTrap;
}(React.Component);

FocusTrap.defaultProps = {
  active: true,
  tag: 'div',
  paused: false,
  focusTrapOptions: {},
  _createFocusTrap: createFocusTrap
};

module.exports = FocusTrap;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function () {
	'use strict';

	function classNames () {

		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if ('string' === argType || 'number' === argType) {
				classes += ' ' + arg;

			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);

			} else if ('object' === argType) {
				for (var key in arg) {
					if (arg.hasOwnProperty(key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true){
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}

}());


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var buildURL = __webpack_require__(145);
var parseHeaders = __webpack_require__(150);
var transformData = __webpack_require__(13);
var isURLSameOrigin = __webpack_require__(149);
var btoa = window.btoa || __webpack_require__(144);

module.exports = function xhrAdapter(resolve, reject, config) {
  var requestData = config.data;
  var requestHeaders = config.headers;

  if (utils.isFormData(requestData)) {
    delete requestHeaders['Content-Type']; // Let the browser set it
  }

  var request = new XMLHttpRequest();

  // For IE 8/9 CORS support
  // Only supports POST and GET calls and doesn't returns the response headers.
  if (window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
    request = new window.XDomainRequest();
  }

  // HTTP basic authentication
  if (config.auth) {
    var username = config.auth.username || '';
    var password = config.auth.password || '';
    requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
  }

  request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

  // Set the request timeout in MS
  request.timeout = config.timeout;

  // Listen for ready state
  request.onload = function handleLoad() {
    if (!request) {
      return;
    }
    // Prepare the response
    var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
    var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
    var response = {
      data: transformData(
        responseData,
        responseHeaders,
        config.transformResponse
      ),
      // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
      status: request.status === 1223 ? 204 : request.status,
      statusText: request.status === 1223 ? 'No Content' : request.statusText,
      headers: responseHeaders,
      config: config
    };

    // Resolve or reject the Promise based on the status
    ((response.status >= 200 && response.status < 300) ||
     (!('status' in request) && response.responseText) ?
      resolve :
      reject)(response);

    // Clean up request
    request = null;
  };

  // Handle low level network errors
  request.onerror = function handleError() {
    // Real errors are hidden from us by the browser
    // onerror should only fire if it's a network error
    reject(new Error('Network Error'));

    // Clean up request
    request = null;
  };

  // Add xsrf header
  // This is only done if running in a standard browser environment.
  // Specifically not if we're in a web worker, or react-native.
  if (utils.isStandardBrowserEnv()) {
    var cookies = __webpack_require__(147);

    // Add xsrf header
    var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ?
        cookies.read(config.xsrfCookieName) :
        undefined;

    if (xsrfValue) {
      requestHeaders[config.xsrfHeaderName] = xsrfValue;
    }
  }

  // Add headers to the request
  if ('setRequestHeader' in request) {
    utils.forEach(requestHeaders, function setRequestHeader(val, key) {
      if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
        // Remove Content-Type if data is undefined
        delete requestHeaders[key];
      } else {
        // Otherwise add header to the request
        request.setRequestHeader(key, val);
      }
    });
  }

  // Add withCredentials to request if needed
  if (config.withCredentials) {
    request.withCredentials = true;
  }

  // Add responseType to request if needed
  if (config.responseType) {
    try {
      request.responseType = config.responseType;
    } catch (e) {
      if (request.responseType !== 'json') {
        throw e;
      }
    }
  }

  if (utils.isArrayBuffer(requestData)) {
    requestData = new DataView(requestData);
  }

  // Send the request
  request.send(requestData);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = __webpack_require__(4);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyles = {
  backgroundColor: '#E32B31',
  color: '#FFFFFF'
};

var DonateButton = function DonateButton(_ref) {
  var id = _ref.id,
      className = _ref.className,
      target = _ref.target,
      label = _ref.label,
      gaLabel = _ref.gaLabel,
      style = _ref.style;
  return _react2.default.createElement(
    'a',
    {
      id: id,
      className: className,
      href: target,
      onClick: function onClick() {
        return _utils2.default.trackHeader('Donate', gaLabel);
      },
      style: (0, _underscore.extend)(style, defaultStyles)
    },
    label
  );
};

DonateButton.propTypes = {
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  target: _propTypes2.default.string,
  label: _propTypes2.default.string,
  style: _propTypes2.default.object,
  gaLabel: _propTypes2.default.string
};

DonateButton.defaultProps = {
  label: 'Donate',
  className: 'donateButton',
  target: 'https://secure3.convio.net/nypl/site/Donation2?7825.donation=form1&df_id=7825' + '&mfc_pref=T&s_src=FRQ18ZZ_TNN'
};

exports.default = DonateButton;
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = __webpack_require__(4);

var _dgxSvgIcons = __webpack_require__(5);

var _SearchButton = __webpack_require__(167);

var _SearchButton2 = _interopRequireDefault(_SearchButton);

var _NavMenuItem = __webpack_require__(165);

var _NavMenuItem2 = _interopRequireDefault(_NavMenuItem);

var _NavMenuMobileButtons = __webpack_require__(166);

var _NavMenuMobileButtons2 = _interopRequireDefault(_NavMenuMobileButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Dependent Components


var NavMenu = function (_React$Component) {
  _inherits(NavMenu, _React$Component);

  function NavMenu() {
    _classCallCheck(this, NavMenu);

    return _possibleConstructorReturn(this, (NavMenu.__proto__ || Object.getPrototypeOf(NavMenu)).apply(this, arguments));
  }

  _createClass(NavMenu, [{
    key: 'renderNavMenu',

    /**
     * Generates the DOM for the NavItems with appropriate class.
     * Optionally, removes any NavItems if a match is found from the exceptionList.
     * @param {items[]} - Array containing NavMenu item Objects.
     * @param {exceptionList[]} (optional) - Array containing NavId strings.
     * @returns {Object} React DOM.
     */
    value: function renderNavMenu(items, exceptionList) {
      var _this2 = this;

      var navItems = items;

      if ((0, _underscore.isArray)(exceptionList) && !(0, _underscore.isEmpty)(exceptionList)) {
        navItems = (0, _underscore.filter)(navItems, function (item) {
          return item.id && !(0, _underscore.contains)(exceptionList, item.id);
        });
      }

      return (0, _underscore.map)(navItems, function (item, index) {
        return _react2.default.createElement(_NavMenuItem2.default, {
          label: item.name,
          lang: _this2.props.lang,
          target: item.link.en.text,
          urlType: _this2.props.urlType,
          navId: item.id,
          key: index
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var mobileActiveClass = this.props.mobileActive ? 'mobileActive' : '';

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'nav',
          {
            className: this.props.className + '-wrapper ' + mobileActiveClass,
            'aria-label': 'Main Navigation'
          },
          _react2.default.createElement(_dgxSvgIcons.LionLogoWithText, { ariaHidden: true, focusable: false }),
          _react2.default.createElement(
            'ul',
            { className: this.props.className + '-list', id: 'navMenu-List' },
            this.renderNavMenu(this.props.items)
          ),
          _react2.default.createElement(_SearchButton2.default, {
            className: this.props.className
          }),
          _react2.default.createElement(_NavMenuMobileButtons2.default, {
            className: 'mobileBottomButtons',
            libraryCardLink: this.props.urlType === 'absolute' ? '//www.nypl.org/library-card' : '/library-card'
          })
        )
      );
    }
  }]);

  return NavMenu;
}(_react2.default.Component);

NavMenu.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  items: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  urlType: _propTypes2.default.string,
  mobileActive: _propTypes2.default.bool
};

NavMenu.defaultProps = {
  lang: 'en',
  className: 'navMenu',
  urlType: 'relative',
  mobileActive: false
};

exports.default = NavMenu;
module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dgxSvgIcons = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _gaConfig = __webpack_require__(17);

var _gaConfig2 = _interopRequireDefault(_gaConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Import React libraries

// GA Utility Library


var SearchBox = function (_React$Component) {
  _inherits(SearchBox, _React$Component);

  function SearchBox(props) {
    _classCallCheck(this, SearchBox);

    var _this = _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call(this, props));

    _this.state = {
      searchInput: '',
      searchOption: 'catalog',
      placeholder: _this.props.placeholder,
      placeholderAnimation: null,
      isSearchRequested: false,
      isGAResponseReceived: false
    };

    _this.handleSearchInputChange = _this.handleSearchInputChange.bind(_this);
    _this.handleSearchOptionChange = _this.handleSearchOptionChange.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    return _this;
  }

  /**
   * setCatalogUrl(searchString, catalogBaseUrl)
   * Returns the final URL for the catalog search.
   */


  _createClass(SearchBox, [{
    key: 'setCatalogUrl',
    value: function setCatalogUrl(searchString, catalogBaseUrl) {
      var catalogUrl = catalogBaseUrl || '//www.nypl.org/search/';

      if (searchString) {
        return catalogUrl + encodeURIComponent(searchString) + this.generateQueriesForGA();
      }
      return null;
    }
  }, {
    key: 'getAnimationClass',
    value: function getAnimationClass() {
      if (this.state.placeholderAnimation === 'initial') {
        return 'keywords-pulse-fade-in';
      }
      if (this.state.placeholderAnimation === 'sequential') {
        return 'keywords-pulse';
      }
      return '';
    }

    /**
     * setEncoreUrl(searchInput, baseUrl, language, scopeString)
     * Returns the final URL for encore search which,
     * is first encoded, then concatenated by the
     * base encore root url. An optional scope and
     * language may be concatenated as well.
     */

  }, {
    key: 'setEncoreUrl',
    value: function setEncoreUrl(searchInput, baseUrl, language, scopeString) {
      var searchTerm = this.encoreEncodeSearchString(searchInput);
      var rootUrl = baseUrl || 'https://browse.nypl.org/iii/encore/search/';
      var defaultLang = language ? '&lang=' + language : '';
      var finalEncoreUrl = void 0;

      if (searchTerm) {
        finalEncoreUrl = this.encoreAddScope(rootUrl, searchTerm, scopeString) + this.generateQueriesForGA() + defaultLang;
      }

      return finalEncoreUrl;
    }

    /**
     * generateQueriesForGA()
     * Generates the queries to be added to the URL of Encore search page. It is for the scripts
     * of GA on Encore to tell where the search request is coming from.
     *
     * @return {string} the queries to add to the URL for Encore search.
     */

  }, {
    key: 'generateQueriesForGA',
    value: function generateQueriesForGA() {
      // the time stamp here is for the purpose of telling when this search query is made.
      var currentTimeStamp = new Date().getTime();

      return currentTimeStamp ? '?searched_from=header_search&timestamp=' + currentTimeStamp : '?searched_from=header_search';
    }

    /**
    * encoreAddScope(baseUrl, searchString, scopeString)
    * Enchances the encore url with a possible scope.
    * If no scope is set, adds the required string to
    * be returned as the final url.
    */

  }, {
    key: 'encoreAddScope',
    value: function encoreAddScope(baseUrl, searchString, scopeString) {
      return scopeString ? baseUrl + 'C__S' + searchString + scopeString + '__Orightresult__U' : baseUrl + 'C__S' + searchString + '__Orightresult__U';
    }

    /**
     * encoreEncodeSearchString(string)
     * base64_encoding_map includes special characters that need to be
     * encoded using base64 - these chars are "=","/", "\", "?"
     * character : base64 encoded
     */

  }, {
    key: 'encoreEncodeSearchString',
    value: function encoreEncodeSearchString(string) {
      var base64EncMap = {
        '=': 'PQ==',
        '/': 'Lw==',
        '\\': 'XA==',
        '?': 'Pw=='
      };
      var encodedString = string;
      var charRegExString = void 0;
      var base64Regex = void 0;

      Object.keys(base64EncMap).forEach(function (specialChar) {
        charRegExString = specialChar.replace(/([\.\*\+\?\^\=\!\:\$\{\}\(\)\|\[\]\/\\])/g, '\\$1');
        base64Regex = new RegExp(charRegExString, 'g');
        encodedString = encodedString.replace(base64Regex, base64EncMap[specialChar]);
      });

      return encodedString;
    }
  }, {
    key: 'animationTimer',
    value: function animationTimer() {
      var _this2 = this;

      var frame = 0;
      // Decide which CSS animation is going to perform
      // by adding different classes to the element.
      // It is based on if it is the first time the validation to be triggered.
      if (this.state.placeholder === 'Please enter a search term.') {
        this.setState({ placeholderAnimation: 'sequential' });
      } else {
        this.setState({ placeholderAnimation: 'initial' });
      }

      var animation = setInterval(function () {
        frame++;
        // Remove the class to stop the animation after 0.1s
        if (frame > 1) {
          clearInterval(animation);
          _this2.setState({ placeholderAnimation: null });
        }
      }, 100);
    }
  }, {
    key: 'isSearchInputValid',
    value: function isSearchInputValid(input) {
      return input !== '';
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      if (e.key === 'Enter' || e.charCode === 13) {
        if (this.props.type !== 'mobile') {
          this.submitSearchRequest(null);
        }
      }
    }
  }, {
    key: 'handleSearchInputChange',
    value: function handleSearchInputChange(event) {
      this.setState({ searchInput: event.target.value });
    }
  }, {
    key: 'handleSearchOptionChange',
    value: function handleSearchOptionChange(event) {
      this.setState({ searchOption: event.target.value });
    }
  }, {
    key: 'submitSearchRequest',
    value: function submitSearchRequest(searchType) {
      var _this3 = this;

      var requestUrl = void 0;
      var gaSearchLabel = void 0;
      var searchInputValue = this.state.searchInput;
      var searchOptionValue = this.state.searchOption;
      var encoreBaseUrl = 'https://browse.nypl.org/iii/encore/search/';
      var catalogBaseUrl = void 0;

      try {
        if (appEnv === 'development') {
          catalogBaseUrl = '//dev-www.nypl.org/search/';
        } else if (appEnv === 'qa') {
          catalogBaseUrl = '//qa-www.nypl.org/search/';
        } else {
          catalogBaseUrl = '//www.nypl.org/search/';
        };
      } catch (err) {
        // For the header markup and static assets import, appEnv will not be set so it will always get caught here.
        // One example is the Drupal import.
        catalogBaseUrl = '//www.nypl.org/search/';
      }

      // For GA "Search" Catalog, "Query Sent" Action Event
      // GASearchedRepo indicates which kind of search is sent
      var GASearchedRepo = 'Unknown';
      var isSearchRequested = this.state.isSearchRequested;
      var isGAResponseReceived = this.state.isGAResponseReceived;

      if (this.isSearchInputValid(searchInputValue)) {
        // Explicit checks for mobile search
        if (this.props.type === 'mobile') {
          if (searchType === 'catalog') {
            gaSearchLabel = 'Submit Catalog Search';
            GASearchedRepo = 'Encore';
            requestUrl = this.setEncoreUrl(searchInputValue, encoreBaseUrl, 'eng');
          } else if (searchType === 'website') {
            gaSearchLabel = 'Submit Search';
            GASearchedRepo = 'DrupalSearch';
            requestUrl = this.setCatalogUrl(searchInputValue, catalogBaseUrl);
          }
        } else {
          // Explicit checks for desktop search
          if (searchOptionValue === 'catalog') {
            gaSearchLabel = 'Submit Catalog Search';
            GASearchedRepo = 'Encore';
            requestUrl = this.setEncoreUrl(searchInputValue, encoreBaseUrl, 'eng');
          } else if (searchOptionValue === 'website') {
            gaSearchLabel = 'Submit Search';
            GASearchedRepo = 'DrupalSearch';
            requestUrl = this.setCatalogUrl(searchInputValue, catalogBaseUrl);
          }
        }

        // Safety check to ensure a proper requestUrl has been defined.
        if (gaSearchLabel && requestUrl) {
          // Fire GA event to track Search
          _utils2.default.trackHeader('Search', gaSearchLabel);

          // Set a dynamic value for custom dimension2
          _gaConfig2.default.customDimensions.dimension2 = GASearchedRepo;

          // 3 phase to handle GA event. We need to prevent sending extra GA events after the search
          // request is made.
          if (isSearchRequested && !isGAResponseReceived) {
            return false;
          }

          if (isSearchRequested && isGAResponseReceived) {
            window.location.assign(requestUrl);

            return true;
          }

          if (!isSearchRequested && !isGAResponseReceived) {
            this.setState({ isSearchRequested: true });
            // Send GA "Search" Catalog, "Query Sent" Action Event
            _utils2.default.trackSearchQuerySend(searchInputValue, _gaConfig2.default.customDimensions, function () {
              _this3.setState({ isGAResponseReceived: true });
              // Go to the proper search page
              window.location.assign(requestUrl);
            });
          }
        }
      } else {
        event.preventDefault();
        // No search input has been entered
        this.setState({ placeholder: 'Please enter a search term.' });
        this.animationTimer();
        this.refs.headerSearchInputField.focus();
      }

      return true;
    }
  }, {
    key: 'renderSearchInputField',
    value: function renderSearchInputField() {
      var animationClass = this.getAnimationClass();
      return _react2.default.createElement(
        'div',
        { className: this.props.className + '-inputBox ' + animationClass },
        _react2.default.createElement(
          'label',
          {
            className: this.props.type === 'mobile' ? 'visuallyHidden' : '',
            htmlFor: this.props.className + '-searchInput'
          },
          'Enter Search Keyword'
        ),
        _react2.default.createElement('input', {
          id: this.props.className + '-searchInput',
          type: 'text',
          ref: 'headerSearchInputField',
          placeholder: this.state.placeholder,
          value: this.state.searchInput,
          onChange: this.handleSearchInputChange,
          onKeyPress: this.handleKeyPress,
          required: true,
          'aria-required': 'true',
          autoComplete: 'off',
          autoFocus: true
        }),
        _react2.default.createElement(_dgxSvgIcons.SearchIcon, { ariaHidden: true, focusable: false })
      );
    }
  }, {
    key: 'renderMobileControls',
    value: function renderMobileControls() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: this.props.className + '-mobileControls' },
        _react2.default.createElement(
          'button',
          {
            'aria-label': 'Submit Catalog Search',
            onClick: function onClick() {
              return _this4.submitSearchRequest('catalog');
            }
          },
          _react2.default.createElement(
            'span',
            { className: 'label' },
            'CATALOG'
          ),
          _react2.default.createElement(_dgxSvgIcons.RightWedgeIcon, { ariaHidden: true, focusable: false })
        ),
        _react2.default.createElement(
          'button',
          {
            'aria-label': 'Submit NYPL Website Search',
            onClick: function onClick() {
              return _this4.submitSearchRequest('website');
            }
          },
          _react2.default.createElement(
            'span',
            { className: 'label' },
            'NYPL.ORG'
          ),
          _react2.default.createElement(_dgxSvgIcons.RightWedgeIcon, { ariaHidden: true, focusable: false })
        )
      );
    }
  }, {
    key: 'renderDesktopControls',
    value: function renderDesktopControls() {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        { className: this.props.className + '-desktopControls' },
        _react2.default.createElement('input', {
          type: 'radio',
          name: 'catalogWebsiteSearch',
          id: 'catalogSearch',
          value: 'catalog',
          checked: this.state.searchOption === 'catalog',
          onChange: this.handleSearchOptionChange
        }),
        _react2.default.createElement(
          'label',
          { htmlFor: 'catalogSearch', className: 'catalogOption' },
          'Search the Catalog'
        ),
        _react2.default.createElement('input', {
          type: 'radio',
          name: 'catalogWebsiteSearch',
          id: 'websiteSearch',
          value: 'website',
          checked: this.state.searchOption === 'website',
          onChange: this.handleSearchOptionChange
        }),
        _react2.default.createElement(
          'label',
          { htmlFor: 'websiteSearch', className: 'websiteOption' },
          'Search NYPL.org'
        ),
        _react2.default.createElement(
          'button',
          { type: 'submit', onClick: function onClick() {
              return _this5.submitSearchRequest(null);
            } },
          _react2.default.createElement(
            'span',
            { className: 'visuallyHidden' },
            'Search'
          ),
          _react2.default.createElement(_dgxSvgIcons.SearchIcon, { ariaHidden: true, fill: '#FFF', focusable: false })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className, role: 'dialog' },
        _react2.default.createElement(
          'fieldset',
          null,
          _react2.default.createElement(
            'legend',
            { className: this.props.className + '-legend visuallyHidden' },
            this.props.legendText
          ),
          this.renderSearchInputField(),
          this.props.type === 'mobile' ? this.renderMobileControls() : this.renderDesktopControls()
        )
      );
    }
  }]);

  return SearchBox;
}(_react2.default.Component);

SearchBox.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  legendText: _propTypes2.default.string
};

SearchBox.defaultProps = {
  lang: 'en',
  placeholder: 'What would you like to find?',
  legendText: 'Enter a keyword, then choose to search either the catalog or the website'
};

exports.default = SearchBox;
module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var gaConfig = {
  eventCategory: 'Search',
  eventAction: 'QuerySent',
  customDimensions: {
    dimension1: 'HeaderSearch',
    dimension2: 'Unknown',
    dimension4: 'NotSet',
    dimension5: 'NotSet'
  }
};

exports.default = gaConfig;
module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.dgxFeatureFlags=e():t.dgxFeatureFlags=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){t.exports=r(15)},function(t,e){"use strict";function r(t){var e=t.constructor;return!!t&&"object"==typeof t&&!Object.isFrozen(t)&&"[object Object]"===Object.prototype.toString.call(t)&&u(e)&&(e instanceof e||"AltStore"===t.type)}function n(t){return!!t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then}function i(t,e){e.forEach(function(e){Object.keys(Object(e)).forEach(function(r){t(r,e[r])})})}function o(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;e>n;n++)r[n-1]=arguments[n];return i(function(e,r){return t[e]=r},r),t}Object.defineProperty(e,"__esModule",{value:!0}),e.isMutableObject=r,e.isPromise=n,e.eachObject=i,e.assign=o;var u=function(t){return"function"==typeof t};e.isFunction=u},function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e["default"]=t,e}function i(t,e){var r=e?d:v,n=e?t.prototype:t;return Object.getOwnPropertyNames(n).reduce(function(t,e){return-1!==r.indexOf(e)?t:(t[e]=n[e],t)},{})}function o(t){"undefined"!=typeof console&&console.warn(new ReferenceError(t))}function u(t,e){for(var r=0,n=e;Object.hasOwnProperty.call(t,n);)n=e+String(++r);return n}function s(t){return t.replace(/[a-z]([A-Z])/g,function(t){return t[0]+"_"+t[1].toLowerCase()}).toUpperCase()}function a(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;e>n;n++)r[n-1]=arguments[n];this.dispatch(r.length?[t].concat(r):t)}function c(t,e,r,n){return{type:e,payload:r,meta:p({dispatchId:t},n),id:t,action:e,data:r,details:n}}function f(t,e,r,n){var i=e.dispatch(r);if(void 0===i)return null;var o=e.id,u=o,s=o,a={id:o,namespace:u,name:s},f=function(t){return n.dispatch(o,t,a)};return _.isFunction(i)?i(f,n):n.dispatcher.dispatch(c(t,o,i,a))}function h(){}Object.defineProperty(e,"__esModule",{value:!0});var p=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t};e.getInternalMethods=i,e.warn=o,e.uid=u,e.formatAsConstant=s,e.dispatchIdentity=a,e.fsa=c,e.dispatch=f;var l=r(1),_=n(l),v=Object.getOwnPropertyNames(h),d=Object.getOwnPropertyNames(h.prototype)},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=r(4),s=n(u),a=function(){function t(){i(this,t)}return o(t,[{key:"activateFeature",value:function(t){this.dispatch(t)}},{key:"deactivateFeature",value:function(t){this.dispatch(t)}}]),t}();e["default"]=s["default"].createActions(a),t.exports=e["default"]},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=r(10),o=n(i),u=new o["default"];e["default"]=u,t.exports=e["default"]},function(t,e,r){!function(e,r){t.exports=r()}(this,function(){"use strict";function t(t,e){e&&(t.prototype=Object.create(e.prototype)),t.prototype.constructor=t}function e(t){return o(t)?t:A(t)}function r(t){return u(t)?t:k(t)}function n(t){return s(t)?t:E(t)}function i(t){return o(t)&&!a(t)?t:x(t)}function o(t){return!(!t||!t[ar])}function u(t){return!(!t||!t[cr])}function s(t){return!(!t||!t[fr])}function a(t){return u(t)||s(t)}function c(t){return!(!t||!t[hr])}function f(t){return t.value=!1,t}function h(t){t&&(t.value=!0)}function p(){}function l(t,e){e=e||0;for(var r=Math.max(0,t.length-e),n=new Array(r),i=0;r>i;i++)n[i]=t[i+e];return n}function _(t){return void 0===t.size&&(t.size=t.__iterate(d)),t.size}function v(t,e){if("number"!=typeof e){var r=e>>>0;if(""+r!==e||4294967295===r)return NaN;e=r}return 0>e?_(t)+e:e}function d(){return!0}function y(t,e,r){return(0===t||void 0!==r&&-r>=t)&&(void 0===e||void 0!==r&&e>=r)}function g(t,e){return w(t,e,0)}function m(t,e){return w(t,e,e)}function w(t,e,r){return void 0===t?r:0>t?Math.max(0,e+t):void 0===e?t:Math.min(e,t)}function b(t){this.next=t}function S(t,e,r,n){var i=0===t?e:1===t?r:[e,r];return n?n.value=i:n={value:i,done:!1},n}function O(){return{value:void 0,done:!0}}function z(t){return!!M(t)}function I(t){return t&&"function"==typeof t.next}function D(t){var e=M(t);return e&&e.call(t)}function M(t){var e=t&&(Sr&&t[Sr]||t[Or]);return"function"==typeof e?e:void 0}function j(t){return t&&"number"==typeof t.length}function A(t){return null===t||void 0===t?C():o(t)?t.toSeq():K(t)}function k(t){return null===t||void 0===t?C().toKeyedSeq():o(t)?u(t)?t.toSeq():t.fromEntrySeq():T(t)}function E(t){return null===t||void 0===t?C():o(t)?u(t)?t.entrySeq():t.toIndexedSeq():U(t)}function x(t){return(null===t||void 0===t?C():o(t)?u(t)?t.entrySeq():t:U(t)).toSetSeq()}function q(t){this._array=t,this.size=t.length}function P(t){var e=Object.keys(t);this._object=t,this._keys=e,this.size=e.length}function F(t){this._iterable=t,this.size=t.length||t.size}function L(t){this._iterator=t,this._iteratorCache=[]}function R(t){return!(!t||!t[Ir])}function C(){return Dr||(Dr=new q([]))}function T(t){var e=Array.isArray(t)?new q(t).fromEntrySeq():I(t)?new L(t).fromEntrySeq():z(t)?new F(t).fromEntrySeq():"object"==typeof t?new P(t):void 0;if(!e)throw new TypeError("Expected Array or iterable object of [k, v] entries, or keyed object: "+t);return e}function U(t){var e=$(t);if(!e)throw new TypeError("Expected Array or iterable object of values: "+t);return e}function K(t){var e=$(t)||"object"==typeof t&&new P(t);if(!e)throw new TypeError("Expected Array or iterable object of values, or keyed object: "+t);return e}function $(t){return j(t)?new q(t):I(t)?new L(t):z(t)?new F(t):void 0}function N(t,e,r,n){var i=t._cache;if(i){for(var o=i.length-1,u=0;o>=u;u++){var s=i[r?o-u:u];if(e(s[1],n?s[0]:u,t)===!1)return u+1}return u}return t.__iterateUncached(e,r)}function B(t,e,r,n){var i=t._cache;if(i){var o=i.length-1,u=0;return new b(function(){var t=i[r?o-u:u];return u++>o?O():S(e,n?t[0]:u-1,t[1])})}return t.__iteratorUncached(e,r)}function W(t,e){return e?H(e,t,"",{"":t}):J(t)}function H(t,e,r,n){return Array.isArray(e)?t.call(n,r,E(e).map(function(r,n){return H(t,r,n,e)})):V(e)?t.call(n,r,k(e).map(function(r,n){return H(t,r,n,e)})):e}function J(t){return Array.isArray(t)?E(t).map(J).toList():V(t)?k(t).map(J).toMap():t}function V(t){return t&&(t.constructor===Object||void 0===t.constructor)}function Y(t,e){if(t===e||t!==t&&e!==e)return!0;if(!t||!e)return!1;if("function"==typeof t.valueOf&&"function"==typeof e.valueOf){if(t=t.valueOf(),e=e.valueOf(),t===e||t!==t&&e!==e)return!0;if(!t||!e)return!1}return"function"==typeof t.equals&&"function"==typeof e.equals&&t.equals(e)?!0:!1}function Q(t,e){if(t===e)return!0;if(!o(e)||void 0!==t.size&&void 0!==e.size&&t.size!==e.size||void 0!==t.__hash&&void 0!==e.__hash&&t.__hash!==e.__hash||u(t)!==u(e)||s(t)!==s(e)||c(t)!==c(e))return!1;if(0===t.size&&0===e.size)return!0;var r=!a(t);if(c(t)){var n=t.entries();return e.every(function(t,e){var i=n.next().value;return i&&Y(i[1],t)&&(r||Y(i[0],e))})&&n.next().done}var i=!1;if(void 0===t.size)if(void 0===e.size)"function"==typeof t.cacheResult&&t.cacheResult();else{i=!0;var f=t;t=e,e=f}var h=!0,p=e.__iterate(function(e,n){return(r?t.has(e):i?Y(e,t.get(n,dr)):Y(t.get(n,dr),e))?void 0:(h=!1,!1)});return h&&t.size===p}function X(t,e){if(!(this instanceof X))return new X(t,e);if(this._value=t,this.size=void 0===e?1/0:Math.max(0,e),0===this.size){if(Mr)return Mr;Mr=this}}function Z(t,e){if(!t)throw new Error(e)}function G(t,e,r){if(!(this instanceof G))return new G(t,e,r);if(Z(0!==r,"Cannot step a Range by 0"),t=t||0,void 0===e&&(e=1/0),r=void 0===r?1:Math.abs(r),t>e&&(r=-r),this._start=t,this._end=e,this._step=r,this.size=Math.max(0,Math.ceil((e-t)/r-1)+1),0===this.size){if(jr)return jr;jr=this}}function tt(){throw TypeError("Abstract")}function et(){}function rt(){}function nt(){}function it(t){return t>>>1&1073741824|3221225471&t}function ot(t){if(t===!1||null===t||void 0===t)return 0;if("function"==typeof t.valueOf&&(t=t.valueOf(),t===!1||null===t||void 0===t))return 0;if(t===!0)return 1;var e=typeof t;if("number"===e){var r=0|t;for(r!==t&&(r^=4294967295*t);t>4294967295;)t/=4294967295,r^=t;return it(r)}if("string"===e)return t.length>Lr?ut(t):st(t);if("function"==typeof t.hashCode)return t.hashCode();if("object"===e)return at(t);if("function"==typeof t.toString)return st(t.toString());throw new Error("Value type "+e+" cannot be hashed.")}function ut(t){var e=Tr[t];return void 0===e&&(e=st(t),Cr===Rr&&(Cr=0,Tr={}),Cr++,Tr[t]=e),e}function st(t){for(var e=0,r=0;r<t.length;r++)e=31*e+t.charCodeAt(r)|0;return it(e)}function at(t){var e;if(qr&&(e=Ar.get(t),void 0!==e))return e;if(e=t[Fr],void 0!==e)return e;if(!xr){if(e=t.propertyIsEnumerable&&t.propertyIsEnumerable[Fr],void 0!==e)return e;if(e=ct(t),void 0!==e)return e}if(e=++Pr,1073741824&Pr&&(Pr=0),qr)Ar.set(t,e);else{if(void 0!==Er&&Er(t)===!1)throw new Error("Non-extensible objects are not allowed as keys.");if(xr)Object.defineProperty(t,Fr,{enumerable:!1,configurable:!1,writable:!1,value:e});else if(void 0!==t.propertyIsEnumerable&&t.propertyIsEnumerable===t.constructor.prototype.propertyIsEnumerable)t.propertyIsEnumerable=function(){return this.constructor.prototype.propertyIsEnumerable.apply(this,arguments)},t.propertyIsEnumerable[Fr]=e;else{if(void 0===t.nodeType)throw new Error("Unable to set a non-enumerable property on object.");t[Fr]=e}}return e}function ct(t){if(t&&t.nodeType>0)switch(t.nodeType){case 1:return t.uniqueID;case 9:return t.documentElement&&t.documentElement.uniqueID}}function ft(t){Z(t!==1/0,"Cannot perform this action with an infinite size.")}function ht(t){return null===t||void 0===t?St():pt(t)&&!c(t)?t:St().withMutations(function(e){var n=r(t);ft(n.size),n.forEach(function(t,r){return e.set(r,t)})})}function pt(t){return!(!t||!t[Ur])}function lt(t,e){this.ownerID=t,this.entries=e}function _t(t,e,r){this.ownerID=t,this.bitmap=e,this.nodes=r}function vt(t,e,r){this.ownerID=t,this.count=e,this.nodes=r}function dt(t,e,r){this.ownerID=t,this.keyHash=e,this.entries=r}function yt(t,e,r){this.ownerID=t,this.keyHash=e,this.entry=r}function gt(t,e,r){this._type=e,this._reverse=r,this._stack=t._root&&wt(t._root)}function mt(t,e){return S(t,e[0],e[1])}function wt(t,e){return{node:t,index:0,__prev:e}}function bt(t,e,r,n){var i=Object.create(Kr);return i.size=t,i._root=e,i.__ownerID=r,i.__hash=n,i.__altered=!1,i}function St(){return $r||($r=bt(0))}function Ot(t,e,r){var n,i;if(t._root){var o=f(yr),u=f(gr);if(n=zt(t._root,t.__ownerID,0,void 0,e,r,o,u),!u.value)return t;i=t.size+(o.value?r===dr?-1:1:0)}else{if(r===dr)return t;i=1,n=new lt(t.__ownerID,[[e,r]])}return t.__ownerID?(t.size=i,t._root=n,t.__hash=void 0,t.__altered=!0,t):n?bt(i,n):St()}function zt(t,e,r,n,i,o,u,s){return t?t.update(e,r,n,i,o,u,s):o===dr?t:(h(s),h(u),new yt(e,n,[i,o]))}function It(t){return t.constructor===yt||t.constructor===dt}function Dt(t,e,r,n,i){if(t.keyHash===n)return new dt(e,n,[t.entry,i]);var o,u=(0===r?t.keyHash:t.keyHash>>>r)&vr,s=(0===r?n:n>>>r)&vr,a=u===s?[Dt(t,e,r+lr,n,i)]:(o=new yt(e,n,i),s>u?[t,o]:[o,t]);return new _t(e,1<<u|1<<s,a)}function Mt(t,e,r,n){t||(t=new p);for(var i=new yt(t,ot(r),[r,n]),o=0;o<e.length;o++){var u=e[o];i=i.update(t,0,void 0,u[0],u[1])}return i}function jt(t,e,r,n){for(var i=0,o=0,u=new Array(r),s=0,a=1,c=e.length;c>s;s++,a<<=1){var f=e[s];void 0!==f&&s!==n&&(i|=a,u[o++]=f)}return new _t(t,i,u)}function At(t,e,r,n,i){for(var o=0,u=new Array(_r),s=0;0!==r;s++,r>>>=1)u[s]=1&r?e[o++]:void 0;return u[n]=i,new vt(t,o+1,u)}function kt(t,e,n){for(var i=[],u=0;u<n.length;u++){var s=n[u],a=r(s);o(s)||(a=a.map(function(t){return W(t)})),i.push(a)}return qt(t,e,i)}function Et(t,e,r){return t&&t.mergeDeep&&o(e)?t.mergeDeep(e):Y(t,e)?t:e}function xt(t){return function(e,r,n){if(e&&e.mergeDeepWith&&o(r))return e.mergeDeepWith(t,r);var i=t(e,r,n);return Y(e,i)?e:i}}function qt(t,e,r){return r=r.filter(function(t){return 0!==t.size}),0===r.length?t:0!==t.size||t.__ownerID||1!==r.length?t.withMutations(function(t){for(var n=e?function(r,n){t.update(n,dr,function(t){return t===dr?r:e(t,r,n)})}:function(e,r){t.set(r,e)},i=0;i<r.length;i++)r[i].forEach(n)}):t.constructor(r[0])}function Pt(t,e,r,n){var i=t===dr,o=e.next();if(o.done){var u=i?r:t,s=n(u);return s===u?t:s}Z(i||t&&t.set,"invalid keyPath");var a=o.value,c=i?dr:t.get(a,dr),f=Pt(c,e,r,n);return f===c?t:f===dr?t.remove(a):(i?St():t).set(a,f)}function Ft(t){return t-=t>>1&1431655765,t=(858993459&t)+(t>>2&858993459),t=t+(t>>4)&252645135,t+=t>>8,t+=t>>16,127&t}function Lt(t,e,r,n){var i=n?t:l(t);return i[e]=r,i}function Rt(t,e,r,n){var i=t.length+1;if(n&&e+1===i)return t[e]=r,t;for(var o=new Array(i),u=0,s=0;i>s;s++)s===e?(o[s]=r,u=-1):o[s]=t[s+u];return o}function Ct(t,e,r){var n=t.length-1;if(r&&e===n)return t.pop(),t;for(var i=new Array(n),o=0,u=0;n>u;u++)u===e&&(o=1),i[u]=t[u+o];return i}function Tt(t){var e=Bt();if(null===t||void 0===t)return e;if(Ut(t))return t;var r=n(t),i=r.size;return 0===i?e:(ft(i),i>0&&_r>i?Nt(0,i,lr,null,new Kt(r.toArray())):e.withMutations(function(t){t.setSize(i),r.forEach(function(e,r){return t.set(r,e)})}))}function Ut(t){return!(!t||!t[Hr])}function Kt(t,e){this.array=t,this.ownerID=e}function $t(t,e){function r(t,e,r){return 0===e?n(t,r):i(t,e,r)}function n(t,r){var n=r===s?a&&a.array:t&&t.array,i=r>o?0:o-r,c=u-r;return c>_r&&(c=_r),function(){if(i===c)return Yr;var t=e?--c:i++;return n&&n[t]}}function i(t,n,i){var s,a=t&&t.array,c=i>o?0:o-i>>n,f=(u-i>>n)+1;return f>_r&&(f=_r),function(){for(;;){if(s){var t=s();if(t!==Yr)return t;s=null}if(c===f)return Yr;var o=e?--f:c++;s=r(a&&a[o],n-lr,i+(o<<n))}}}var o=t._origin,u=t._capacity,s=Xt(u),a=t._tail;return r(t._root,t._level,0)}function Nt(t,e,r,n,i,o,u){var s=Object.create(Jr);return s.size=e-t,s._origin=t,s._capacity=e,s._level=r,s._root=n,s._tail=i,s.__ownerID=o,s.__hash=u,s.__altered=!1,s}function Bt(){return Vr||(Vr=Nt(0,0,lr))}function Wt(t,e,r){if(e=v(t,e),e!==e)return t;if(e>=t.size||0>e)return t.withMutations(function(t){0>e?Yt(t,e).set(0,r):Yt(t,0,e+1).set(e,r)});e+=t._origin;var n=t._tail,i=t._root,o=f(gr);return e>=Xt(t._capacity)?n=Ht(n,t.__ownerID,0,e,r,o):i=Ht(i,t.__ownerID,t._level,e,r,o),o.value?t.__ownerID?(t._root=i,t._tail=n,t.__hash=void 0,t.__altered=!0,t):Nt(t._origin,t._capacity,t._level,i,n):t}function Ht(t,e,r,n,i,o){var u=n>>>r&vr,s=t&&u<t.array.length;if(!s&&void 0===i)return t;var a;if(r>0){var c=t&&t.array[u],f=Ht(c,e,r-lr,n,i,o);return f===c?t:(a=Jt(t,e),a.array[u]=f,a)}return s&&t.array[u]===i?t:(h(o),a=Jt(t,e),void 0===i&&u===a.array.length-1?a.array.pop():a.array[u]=i,a)}function Jt(t,e){return e&&t&&e===t.ownerID?t:new Kt(t?t.array.slice():[],e)}function Vt(t,e){if(e>=Xt(t._capacity))return t._tail;if(e<1<<t._level+lr){for(var r=t._root,n=t._level;r&&n>0;)r=r.array[e>>>n&vr],n-=lr;return r}}function Yt(t,e,r){void 0!==e&&(e=0|e),void 0!==r&&(r=0|r);var n=t.__ownerID||new p,i=t._origin,o=t._capacity,u=i+e,s=void 0===r?o:0>r?o+r:i+r;if(u===i&&s===o)return t;if(u>=s)return t.clear();for(var a=t._level,c=t._root,f=0;0>u+f;)c=new Kt(c&&c.array.length?[void 0,c]:[],n),a+=lr,f+=1<<a;f&&(u+=f,i+=f,s+=f,o+=f);for(var h=Xt(o),l=Xt(s);l>=1<<a+lr;)c=new Kt(c&&c.array.length?[c]:[],n),a+=lr;var _=t._tail,v=h>l?Vt(t,s-1):l>h?new Kt([],n):_;if(_&&l>h&&o>u&&_.array.length){c=Jt(c,n);for(var d=c,y=a;y>lr;y-=lr){var g=h>>>y&vr;d=d.array[g]=Jt(d.array[g],n)}d.array[h>>>lr&vr]=_}if(o>s&&(v=v&&v.removeAfter(n,0,s)),u>=l)u-=l,s-=l,a=lr,c=null,v=v&&v.removeBefore(n,0,u);else if(u>i||h>l){for(f=0;c;){var m=u>>>a&vr;if(m!==l>>>a&vr)break;m&&(f+=(1<<a)*m),a-=lr,c=c.array[m]}c&&u>i&&(c=c.removeBefore(n,a,u-f)),c&&h>l&&(c=c.removeAfter(n,a,l-f)),f&&(u-=f,s-=f)}return t.__ownerID?(t.size=s-u,t._origin=u,t._capacity=s,t._level=a,t._root=c,t._tail=v,t.__hash=void 0,t.__altered=!0,t):Nt(u,s,a,c,v)}function Qt(t,e,r){for(var i=[],u=0,s=0;s<r.length;s++){var a=r[s],c=n(a);c.size>u&&(u=c.size),o(a)||(c=c.map(function(t){return W(t)})),i.push(c)}return u>t.size&&(t=t.setSize(u)),qt(t,e,i)}function Xt(t){return _r>t?0:t-1>>>lr<<lr}function Zt(t){return null===t||void 0===t?ee():Gt(t)?t:ee().withMutations(function(e){var n=r(t);ft(n.size),n.forEach(function(t,r){return e.set(r,t)})})}function Gt(t){return pt(t)&&c(t)}function te(t,e,r,n){var i=Object.create(Zt.prototype);return i.size=t?t.size:0,i._map=t,i._list=e,i.__ownerID=r,i.__hash=n,i}function ee(){return Qr||(Qr=te(St(),Bt()))}function re(t,e,r){var n,i,o=t._map,u=t._list,s=o.get(e),a=void 0!==s;if(r===dr){if(!a)return t;u.size>=_r&&u.size>=2*o.size?(i=u.filter(function(t,e){return void 0!==t&&s!==e}),n=i.toKeyedSeq().map(function(t){return t[0]}).flip().toMap(),t.__ownerID&&(n.__ownerID=i.__ownerID=t.__ownerID)):(n=o.remove(e),i=s===u.size-1?u.pop():u.set(s,void 0))}else if(a){if(r===u.get(s)[1])return t;n=o,i=u.set(s,[e,r])}else n=o.set(e,u.size),i=u.set(u.size,[e,r]);return t.__ownerID?(t.size=n.size,t._map=n,t._list=i,t.__hash=void 0,t):te(n,i)}function ne(t,e){this._iter=t,this._useKeys=e,this.size=t.size}function ie(t){this._iter=t,this.size=t.size}function oe(t){this._iter=t,this.size=t.size}function ue(t){this._iter=t,this.size=t.size}function se(t){var e=je(t);return e._iter=t,e.size=t.size,e.flip=function(){return t},e.reverse=function(){var e=t.reverse.apply(this);return e.flip=function(){return t.reverse()},e},e.has=function(e){return t.includes(e)},e.includes=function(e){return t.has(e)},e.cacheResult=Ae,e.__iterateUncached=function(e,r){var n=this;return t.__iterate(function(t,r){return e(r,t,n)!==!1},r)},e.__iteratorUncached=function(e,r){if(e===br){var n=t.__iterator(e,r);return new b(function(){var t=n.next();if(!t.done){var e=t.value[0];t.value[0]=t.value[1],t.value[1]=e}return t})}return t.__iterator(e===wr?mr:wr,r)},e}function ae(t,e,r){var n=je(t);return n.size=t.size,n.has=function(e){return t.has(e)},n.get=function(n,i){var o=t.get(n,dr);return o===dr?i:e.call(r,o,n,t)},n.__iterateUncached=function(n,i){var o=this;return t.__iterate(function(t,i,u){return n(e.call(r,t,i,u),i,o)!==!1},i)},n.__iteratorUncached=function(n,i){var o=t.__iterator(br,i);return new b(function(){var i=o.next();if(i.done)return i;var u=i.value,s=u[0];return S(n,s,e.call(r,u[1],s,t),i)})},n}function ce(t,e){var r=je(t);return r._iter=t,r.size=t.size,r.reverse=function(){return t},t.flip&&(r.flip=function(){var e=se(t);return e.reverse=function(){return t.flip()},e}),r.get=function(r,n){return t.get(e?r:-1-r,n)},r.has=function(r){return t.has(e?r:-1-r)},r.includes=function(e){return t.includes(e)},r.cacheResult=Ae,r.__iterate=function(e,r){var n=this;return t.__iterate(function(t,r){return e(t,r,n)},!r)},r.__iterator=function(e,r){return t.__iterator(e,!r)},r}function fe(t,e,r,n){var i=je(t);return n&&(i.has=function(n){var i=t.get(n,dr);return i!==dr&&!!e.call(r,i,n,t)},i.get=function(n,i){var o=t.get(n,dr);return o!==dr&&e.call(r,o,n,t)?o:i}),i.__iterateUncached=function(i,o){var u=this,s=0;return t.__iterate(function(t,o,a){return e.call(r,t,o,a)?(s++,i(t,n?o:s-1,u)):void 0},o),s},i.__iteratorUncached=function(i,o){var u=t.__iterator(br,o),s=0;return new b(function(){for(;;){var o=u.next();if(o.done)return o;var a=o.value,c=a[0],f=a[1];if(e.call(r,f,c,t))return S(i,n?c:s++,f,o)}})},i}function he(t,e,r){var n=ht().asMutable();return t.__iterate(function(i,o){n.update(e.call(r,i,o,t),0,function(t){return t+1})}),n.asImmutable()}function pe(t,e,r){var n=u(t),i=(c(t)?Zt():ht()).asMutable();t.__iterate(function(o,u){i.update(e.call(r,o,u,t),function(t){return t=t||[],t.push(n?[u,o]:o),t})});var o=Me(t);return i.map(function(e){return ze(t,o(e))})}function le(t,e,r,n){var i=t.size;if(void 0!==e&&(e=0|e),void 0!==r&&(r=0|r),y(e,r,i))return t;var o=g(e,i),u=m(r,i);if(o!==o||u!==u)return le(t.toSeq().cacheResult(),e,r,n);var s,a=u-o;a===a&&(s=0>a?0:a);var c=je(t);return c.size=0===s?s:t.size&&s||void 0,!n&&R(t)&&s>=0&&(c.get=function(e,r){return e=v(this,e),e>=0&&s>e?t.get(e+o,r):r}),c.__iterateUncached=function(e,r){var i=this;if(0===s)return 0;if(r)return this.cacheResult().__iterate(e,r);var u=0,a=!0,c=0;return t.__iterate(function(t,r){return a&&(a=u++<o)?void 0:(c++,e(t,n?r:c-1,i)!==!1&&c!==s)}),c},c.__iteratorUncached=function(e,r){if(0!==s&&r)return this.cacheResult().__iterator(e,r);var i=0!==s&&t.__iterator(e,r),u=0,a=0;return new b(function(){for(;u++<o;)i.next();if(++a>s)return O();var t=i.next();return n||e===wr?t:e===mr?S(e,a-1,void 0,t):S(e,a-1,t.value[1],t)})},c}function _e(t,e,r){var n=je(t);return n.__iterateUncached=function(n,i){var o=this;if(i)return this.cacheResult().__iterate(n,i);var u=0;return t.__iterate(function(t,i,s){return e.call(r,t,i,s)&&++u&&n(t,i,o)}),u},n.__iteratorUncached=function(n,i){var o=this;if(i)return this.cacheResult().__iterator(n,i);var u=t.__iterator(br,i),s=!0;return new b(function(){if(!s)return O();var t=u.next();if(t.done)return t;var i=t.value,a=i[0],c=i[1];return e.call(r,c,a,o)?n===br?t:S(n,a,c,t):(s=!1,O())})},n}function ve(t,e,r,n){var i=je(t);return i.__iterateUncached=function(i,o){var u=this;if(o)return this.cacheResult().__iterate(i,o);var s=!0,a=0;return t.__iterate(function(t,o,c){return s&&(s=e.call(r,t,o,c))?void 0:(a++,i(t,n?o:a-1,u))}),a},i.__iteratorUncached=function(i,o){var u=this;if(o)return this.cacheResult().__iterator(i,o);var s=t.__iterator(br,o),a=!0,c=0;return new b(function(){var t,o,f;do{if(t=s.next(),t.done)return n||i===wr?t:i===mr?S(i,c++,void 0,t):S(i,c++,t.value[1],t);var h=t.value;o=h[0],f=h[1],a&&(a=e.call(r,f,o,u))}while(a);return i===br?t:S(i,o,f,t)})},i}function de(t,e){var n=u(t),i=[t].concat(e).map(function(t){return o(t)?n&&(t=r(t)):t=n?T(t):U(Array.isArray(t)?t:[t]),t}).filter(function(t){return 0!==t.size});if(0===i.length)return t;if(1===i.length){var a=i[0];if(a===t||n&&u(a)||s(t)&&s(a))return a}var c=new q(i);return n?c=c.toKeyedSeq():s(t)||(c=c.toSetSeq()),c=c.flatten(!0),c.size=i.reduce(function(t,e){if(void 0!==t){var r=e.size;if(void 0!==r)return t+r}},0),c}function ye(t,e,r){var n=je(t);return n.__iterateUncached=function(n,i){function u(t,c){var f=this;t.__iterate(function(t,i){return(!e||e>c)&&o(t)?u(t,c+1):n(t,r?i:s++,f)===!1&&(a=!0),!a},i)}var s=0,a=!1;return u(t,0),s},n.__iteratorUncached=function(n,i){var u=t.__iterator(n,i),s=[],a=0;return new b(function(){for(;u;){var t=u.next();if(t.done===!1){var c=t.value;if(n===br&&(c=c[1]),e&&!(s.length<e)||!o(c))return r?t:S(n,a++,c,t);s.push(u),u=c.__iterator(n,i)}else u=s.pop()}return O()})},n}function ge(t,e,r){var n=Me(t);return t.toSeq().map(function(i,o){return n(e.call(r,i,o,t))}).flatten(!0)}function me(t,e){var r=je(t);return r.size=t.size&&2*t.size-1,r.__iterateUncached=function(r,n){var i=this,o=0;return t.__iterate(function(t,n){return(!o||r(e,o++,i)!==!1)&&r(t,o++,i)!==!1},n),o},r.__iteratorUncached=function(r,n){var i,o=t.__iterator(wr,n),u=0;return new b(function(){return(!i||u%2)&&(i=o.next(),i.done)?i:u%2?S(r,u++,e):S(r,u++,i.value,i)})},r}function we(t,e,r){e||(e=ke);var n=u(t),i=0,o=t.toSeq().map(function(e,n){return[n,e,i++,r?r(e,n,t):e]}).toArray();return o.sort(function(t,r){return e(t[3],r[3])||t[2]-r[2]}).forEach(n?function(t,e){o[e].length=2}:function(t,e){o[e]=t[1]}),n?k(o):s(t)?E(o):x(o)}function be(t,e,r){if(e||(e=ke),r){var n=t.toSeq().map(function(e,n){return[e,r(e,n,t)]}).reduce(function(t,r){return Se(e,t[1],r[1])?r:t});return n&&n[0]}return t.reduce(function(t,r){return Se(e,t,r)?r:t})}function Se(t,e,r){var n=t(r,e);return 0===n&&r!==e&&(void 0===r||null===r||r!==r)||n>0}function Oe(t,r,n){var i=je(t);return i.size=new q(n).map(function(t){return t.size}).min(),i.__iterate=function(t,e){for(var r,n=this.__iterator(wr,e),i=0;!(r=n.next()).done&&t(r.value,i++,this)!==!1;);return i},i.__iteratorUncached=function(t,i){var o=n.map(function(t){return t=e(t),D(i?t.reverse():t)}),u=0,s=!1;return new b(function(){var e;return s||(e=o.map(function(t){return t.next()}),s=e.some(function(t){return t.done})),s?O():S(t,u++,r.apply(null,e.map(function(t){return t.value})))})},i}function ze(t,e){return R(t)?e:t.constructor(e)}function Ie(t){if(t!==Object(t))throw new TypeError("Expected [K, V] tuple: "+t)}function De(t){return ft(t.size),_(t)}function Me(t){return u(t)?r:s(t)?n:i}function je(t){return Object.create((u(t)?k:s(t)?E:x).prototype)}function Ae(){return this._iter.cacheResult?(this._iter.cacheResult(),this.size=this._iter.size,this):A.prototype.cacheResult.call(this)}function ke(t,e){return t>e?1:e>t?-1:0}function Ee(t){var r=D(t);if(!r){if(!j(t))throw new TypeError("Expected iterable or array-like: "+t);r=D(e(t))}return r}function xe(t,e){var r,n=function(o){if(o instanceof n)return o;if(!(this instanceof n))return new n(o);if(!r){r=!0;var u=Object.keys(t);Fe(i,u),i.size=u.length,i._name=e,i._keys=u,i._defaultValues=t}this._map=ht(o)},i=n.prototype=Object.create(Xr);return i.constructor=n,n}function qe(t,e,r){var n=Object.create(Object.getPrototypeOf(t));return n._map=e,n.__ownerID=r,n}function Pe(t){return t._name||t.constructor.name||"Record"}function Fe(t,e){try{e.forEach(Le.bind(void 0,t))}catch(r){}}function Le(t,e){Object.defineProperty(t,e,{get:function(){return this.get(e)},set:function(t){Z(this.__ownerID,"Cannot set on an immutable record."),this.set(e,t)}})}function Re(t){return null===t||void 0===t?Ke():Ce(t)&&!c(t)?t:Ke().withMutations(function(e){var r=i(t);ft(r.size),r.forEach(function(t){return e.add(t)})})}function Ce(t){return!(!t||!t[Zr])}function Te(t,e){return t.__ownerID?(t.size=e.size,t._map=e,t):e===t._map?t:0===e.size?t.__empty():t.__make(e)}function Ue(t,e){var r=Object.create(Gr);return r.size=t?t.size:0,r._map=t,r.__ownerID=e,r}function Ke(){return tn||(tn=Ue(St()))}function $e(t){return null===t||void 0===t?We():Ne(t)?t:We().withMutations(function(e){var r=i(t);ft(r.size),r.forEach(function(t){return e.add(t)})})}function Ne(t){return Ce(t)&&c(t)}function Be(t,e){var r=Object.create(en);return r.size=t?t.size:0,r._map=t,r.__ownerID=e,r}function We(){return rn||(rn=Be(ee()))}function He(t){return null===t||void 0===t?Ye():Je(t)?t:Ye().unshiftAll(t)}function Je(t){return!(!t||!t[nn])}function Ve(t,e,r,n){var i=Object.create(on);return i.size=t,i._head=e,i.__ownerID=r,i.__hash=n,i.__altered=!1,i}function Ye(){return un||(un=Ve(0))}function Qe(t,e){var r=function(r){t.prototype[r]=e[r]};return Object.keys(e).forEach(r),Object.getOwnPropertySymbols&&Object.getOwnPropertySymbols(e).forEach(r),t}function Xe(t,e){return e}function Ze(t,e){return[e,t]}function Ge(t){return function(){return!t.apply(this,arguments)}}function tr(t){return function(){return-t.apply(this,arguments)}}function er(t){return"string"==typeof t?JSON.stringify(t):t}function rr(){return l(arguments)}function nr(t,e){return e>t?1:t>e?-1:0}function ir(t){if(t.size===1/0)return 0;var e=c(t),r=u(t),n=e?1:0,i=t.__iterate(r?e?function(t,e){n=31*n+ur(ot(t),ot(e))|0}:function(t,e){n=n+ur(ot(t),ot(e))|0}:e?function(t){n=31*n+ot(t)|0}:function(t){n=n+ot(t)|0});return or(i,n)}function or(t,e){return e=kr(e,3432918353),e=kr(e<<15|e>>>-15,461845907),e=kr(e<<13|e>>>-13,5),e=(e+3864292196|0)^t,e=kr(e^e>>>16,2246822507),e=kr(e^e>>>13,3266489909),e=it(e^e>>>16)}function ur(t,e){return t^e+2654435769+(t<<6)+(t>>2)|0}var sr=Array.prototype.slice;t(r,e),t(n,e),t(i,e),e.isIterable=o,e.isKeyed=u,e.isIndexed=s,e.isAssociative=a,e.isOrdered=c,e.Keyed=r,e.Indexed=n,e.Set=i;var ar="@@__IMMUTABLE_ITERABLE__@@",cr="@@__IMMUTABLE_KEYED__@@",fr="@@__IMMUTABLE_INDEXED__@@",hr="@@__IMMUTABLE_ORDERED__@@",pr="delete",lr=5,_r=1<<lr,vr=_r-1,dr={},yr={value:!1},gr={value:!1},mr=0,wr=1,br=2,Sr="function"==typeof Symbol&&Symbol.iterator,Or="@@iterator",zr=Sr||Or;b.prototype.toString=function(){return"[Iterator]"},b.KEYS=mr,b.VALUES=wr,b.ENTRIES=br,b.prototype.inspect=b.prototype.toSource=function(){return this.toString()},b.prototype[zr]=function(){return this},t(A,e),A.of=function(){return A(arguments)},A.prototype.toSeq=function(){return this},A.prototype.toString=function(){return this.__toString("Seq {","}")},A.prototype.cacheResult=function(){return!this._cache&&this.__iterateUncached&&(this._cache=this.entrySeq().toArray(),this.size=this._cache.length),this},A.prototype.__iterate=function(t,e){return N(this,t,e,!0)},A.prototype.__iterator=function(t,e){return B(this,t,e,!0)},t(k,A),k.prototype.toKeyedSeq=function(){return this},t(E,A),E.of=function(){return E(arguments)},E.prototype.toIndexedSeq=function(){return this},E.prototype.toString=function(){return this.__toString("Seq [","]")},E.prototype.__iterate=function(t,e){return N(this,t,e,!1)},E.prototype.__iterator=function(t,e){return B(this,t,e,!1)},t(x,A),x.of=function(){return x(arguments)},x.prototype.toSetSeq=function(){return this},A.isSeq=R,A.Keyed=k,A.Set=x,A.Indexed=E;var Ir="@@__IMMUTABLE_SEQ__@@";A.prototype[Ir]=!0,t(q,E),q.prototype.get=function(t,e){return this.has(t)?this._array[v(this,t)]:e},q.prototype.__iterate=function(t,e){for(var r=this._array,n=r.length-1,i=0;n>=i;i++)if(t(r[e?n-i:i],i,this)===!1)return i+1;return i},q.prototype.__iterator=function(t,e){var r=this._array,n=r.length-1,i=0;return new b(function(){return i>n?O():S(t,i,r[e?n-i++:i++])})},t(P,k),P.prototype.get=function(t,e){return void 0===e||this.has(t)?this._object[t]:e},P.prototype.has=function(t){return this._object.hasOwnProperty(t)},P.prototype.__iterate=function(t,e){for(var r=this._object,n=this._keys,i=n.length-1,o=0;i>=o;o++){var u=n[e?i-o:o];if(t(r[u],u,this)===!1)return o+1}return o},P.prototype.__iterator=function(t,e){var r=this._object,n=this._keys,i=n.length-1,o=0;return new b(function(){var u=n[e?i-o:o];return o++>i?O():S(t,u,r[u])})},P.prototype[hr]=!0,t(F,E),F.prototype.__iterateUncached=function(t,e){if(e)return this.cacheResult().__iterate(t,e);var r=this._iterable,n=D(r),i=0;if(I(n))for(var o;!(o=n.next()).done&&t(o.value,i++,this)!==!1;);return i},F.prototype.__iteratorUncached=function(t,e){if(e)return this.cacheResult().__iterator(t,e);var r=this._iterable,n=D(r);if(!I(n))return new b(O);var i=0;return new b(function(){var e=n.next();return e.done?e:S(t,i++,e.value)})},t(L,E),L.prototype.__iterateUncached=function(t,e){if(e)return this.cacheResult().__iterate(t,e);for(var r=this._iterator,n=this._iteratorCache,i=0;i<n.length;)if(t(n[i],i++,this)===!1)return i;for(var o;!(o=r.next()).done;){var u=o.value;if(n[i]=u,t(u,i++,this)===!1)break}return i},L.prototype.__iteratorUncached=function(t,e){if(e)return this.cacheResult().__iterator(t,e);var r=this._iterator,n=this._iteratorCache,i=0;return new b(function(){if(i>=n.length){var e=r.next();if(e.done)return e;n[i]=e.value}return S(t,i,n[i++])})};var Dr;t(X,E),X.prototype.toString=function(){return 0===this.size?"Repeat []":"Repeat [ "+this._value+" "+this.size+" times ]"},X.prototype.get=function(t,e){return this.has(t)?this._value:e},X.prototype.includes=function(t){return Y(this._value,t)},X.prototype.slice=function(t,e){var r=this.size;return y(t,e,r)?this:new X(this._value,m(e,r)-g(t,r))},X.prototype.reverse=function(){return this},X.prototype.indexOf=function(t){return Y(this._value,t)?0:-1},X.prototype.lastIndexOf=function(t){return Y(this._value,t)?this.size:-1},X.prototype.__iterate=function(t,e){for(var r=0;r<this.size;r++)if(t(this._value,r,this)===!1)return r+1;return r},X.prototype.__iterator=function(t,e){var r=this,n=0;return new b(function(){return n<r.size?S(t,n++,r._value):O();
})},X.prototype.equals=function(t){return t instanceof X?Y(this._value,t._value):Q(t)};var Mr;t(G,E),G.prototype.toString=function(){return 0===this.size?"Range []":"Range [ "+this._start+"..."+this._end+(this._step>1?" by "+this._step:"")+" ]"},G.prototype.get=function(t,e){return this.has(t)?this._start+v(this,t)*this._step:e},G.prototype.includes=function(t){var e=(t-this._start)/this._step;return e>=0&&e<this.size&&e===Math.floor(e)},G.prototype.slice=function(t,e){return y(t,e,this.size)?this:(t=g(t,this.size),e=m(e,this.size),t>=e?new G(0,0):new G(this.get(t,this._end),this.get(e,this._end),this._step))},G.prototype.indexOf=function(t){var e=t-this._start;if(e%this._step===0){var r=e/this._step;if(r>=0&&r<this.size)return r}return-1},G.prototype.lastIndexOf=function(t){return this.indexOf(t)},G.prototype.__iterate=function(t,e){for(var r=this.size-1,n=this._step,i=e?this._start+r*n:this._start,o=0;r>=o;o++){if(t(i,o,this)===!1)return o+1;i+=e?-n:n}return o},G.prototype.__iterator=function(t,e){var r=this.size-1,n=this._step,i=e?this._start+r*n:this._start,o=0;return new b(function(){var u=i;return i+=e?-n:n,o>r?O():S(t,o++,u)})},G.prototype.equals=function(t){return t instanceof G?this._start===t._start&&this._end===t._end&&this._step===t._step:Q(this,t)};var jr;t(tt,e),t(et,tt),t(rt,tt),t(nt,tt),tt.Keyed=et,tt.Indexed=rt,tt.Set=nt;var Ar,kr="function"==typeof Math.imul&&-2===Math.imul(4294967295,2)?Math.imul:function(t,e){t=0|t,e=0|e;var r=65535&t,n=65535&e;return r*n+((t>>>16)*n+r*(e>>>16)<<16>>>0)|0},Er=Object.isExtensible,xr=function(){try{return Object.defineProperty({},"@",{}),!0}catch(t){return!1}}(),qr="function"==typeof WeakMap;qr&&(Ar=new WeakMap);var Pr=0,Fr="__immutablehash__";"function"==typeof Symbol&&(Fr=Symbol(Fr));var Lr=16,Rr=255,Cr=0,Tr={};t(ht,et),ht.prototype.toString=function(){return this.__toString("Map {","}")},ht.prototype.get=function(t,e){return this._root?this._root.get(0,void 0,t,e):e},ht.prototype.set=function(t,e){return Ot(this,t,e)},ht.prototype.setIn=function(t,e){return this.updateIn(t,dr,function(){return e})},ht.prototype.remove=function(t){return Ot(this,t,dr)},ht.prototype.deleteIn=function(t){return this.updateIn(t,function(){return dr})},ht.prototype.update=function(t,e,r){return 1===arguments.length?t(this):this.updateIn([t],e,r)},ht.prototype.updateIn=function(t,e,r){r||(r=e,e=void 0);var n=Pt(this,Ee(t),e,r);return n===dr?void 0:n},ht.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._root=null,this.__hash=void 0,this.__altered=!0,this):St()},ht.prototype.merge=function(){return kt(this,void 0,arguments)},ht.prototype.mergeWith=function(t){var e=sr.call(arguments,1);return kt(this,t,e)},ht.prototype.mergeIn=function(t){var e=sr.call(arguments,1);return this.updateIn(t,St(),function(t){return"function"==typeof t.merge?t.merge.apply(t,e):e[e.length-1]})},ht.prototype.mergeDeep=function(){return kt(this,Et,arguments)},ht.prototype.mergeDeepWith=function(t){var e=sr.call(arguments,1);return kt(this,xt(t),e)},ht.prototype.mergeDeepIn=function(t){var e=sr.call(arguments,1);return this.updateIn(t,St(),function(t){return"function"==typeof t.mergeDeep?t.mergeDeep.apply(t,e):e[e.length-1]})},ht.prototype.sort=function(t){return Zt(we(this,t))},ht.prototype.sortBy=function(t,e){return Zt(we(this,e,t))},ht.prototype.withMutations=function(t){var e=this.asMutable();return t(e),e.wasAltered()?e.__ensureOwner(this.__ownerID):this},ht.prototype.asMutable=function(){return this.__ownerID?this:this.__ensureOwner(new p)},ht.prototype.asImmutable=function(){return this.__ensureOwner()},ht.prototype.wasAltered=function(){return this.__altered},ht.prototype.__iterator=function(t,e){return new gt(this,t,e)},ht.prototype.__iterate=function(t,e){var r=this,n=0;return this._root&&this._root.iterate(function(e){return n++,t(e[1],e[0],r)},e),n},ht.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?bt(this.size,this._root,t,this.__hash):(this.__ownerID=t,this.__altered=!1,this)},ht.isMap=pt;var Ur="@@__IMMUTABLE_MAP__@@",Kr=ht.prototype;Kr[Ur]=!0,Kr[pr]=Kr.remove,Kr.removeIn=Kr.deleteIn,lt.prototype.get=function(t,e,r,n){for(var i=this.entries,o=0,u=i.length;u>o;o++)if(Y(r,i[o][0]))return i[o][1];return n},lt.prototype.update=function(t,e,r,n,i,o,u){for(var s=i===dr,a=this.entries,c=0,f=a.length;f>c&&!Y(n,a[c][0]);c++);var p=f>c;if(p?a[c][1]===i:s)return this;if(h(u),(s||!p)&&h(o),!s||1!==a.length){if(!p&&!s&&a.length>=Nr)return Mt(t,a,n,i);var _=t&&t===this.ownerID,v=_?a:l(a);return p?s?c===f-1?v.pop():v[c]=v.pop():v[c]=[n,i]:v.push([n,i]),_?(this.entries=v,this):new lt(t,v)}},_t.prototype.get=function(t,e,r,n){void 0===e&&(e=ot(r));var i=1<<((0===t?e:e>>>t)&vr),o=this.bitmap;return 0===(o&i)?n:this.nodes[Ft(o&i-1)].get(t+lr,e,r,n)},_t.prototype.update=function(t,e,r,n,i,o,u){void 0===r&&(r=ot(n));var s=(0===e?r:r>>>e)&vr,a=1<<s,c=this.bitmap,f=0!==(c&a);if(!f&&i===dr)return this;var h=Ft(c&a-1),p=this.nodes,l=f?p[h]:void 0,_=zt(l,t,e+lr,r,n,i,o,u);if(_===l)return this;if(!f&&_&&p.length>=Br)return At(t,p,c,s,_);if(f&&!_&&2===p.length&&It(p[1^h]))return p[1^h];if(f&&_&&1===p.length&&It(_))return _;var v=t&&t===this.ownerID,d=f?_?c:c^a:c|a,y=f?_?Lt(p,h,_,v):Ct(p,h,v):Rt(p,h,_,v);return v?(this.bitmap=d,this.nodes=y,this):new _t(t,d,y)},vt.prototype.get=function(t,e,r,n){void 0===e&&(e=ot(r));var i=(0===t?e:e>>>t)&vr,o=this.nodes[i];return o?o.get(t+lr,e,r,n):n},vt.prototype.update=function(t,e,r,n,i,o,u){void 0===r&&(r=ot(n));var s=(0===e?r:r>>>e)&vr,a=i===dr,c=this.nodes,f=c[s];if(a&&!f)return this;var h=zt(f,t,e+lr,r,n,i,o,u);if(h===f)return this;var p=this.count;if(f){if(!h&&(p--,Wr>p))return jt(t,c,p,s)}else p++;var l=t&&t===this.ownerID,_=Lt(c,s,h,l);return l?(this.count=p,this.nodes=_,this):new vt(t,p,_)},dt.prototype.get=function(t,e,r,n){for(var i=this.entries,o=0,u=i.length;u>o;o++)if(Y(r,i[o][0]))return i[o][1];return n},dt.prototype.update=function(t,e,r,n,i,o,u){void 0===r&&(r=ot(n));var s=i===dr;if(r!==this.keyHash)return s?this:(h(u),h(o),Dt(this,t,e,r,[n,i]));for(var a=this.entries,c=0,f=a.length;f>c&&!Y(n,a[c][0]);c++);var p=f>c;if(p?a[c][1]===i:s)return this;if(h(u),(s||!p)&&h(o),s&&2===f)return new yt(t,this.keyHash,a[1^c]);var _=t&&t===this.ownerID,v=_?a:l(a);return p?s?c===f-1?v.pop():v[c]=v.pop():v[c]=[n,i]:v.push([n,i]),_?(this.entries=v,this):new dt(t,this.keyHash,v)},yt.prototype.get=function(t,e,r,n){return Y(r,this.entry[0])?this.entry[1]:n},yt.prototype.update=function(t,e,r,n,i,o,u){var s=i===dr,a=Y(n,this.entry[0]);return(a?i===this.entry[1]:s)?this:(h(u),s?void h(o):a?t&&t===this.ownerID?(this.entry[1]=i,this):new yt(t,this.keyHash,[n,i]):(h(o),Dt(this,t,e,ot(n),[n,i])))},lt.prototype.iterate=dt.prototype.iterate=function(t,e){for(var r=this.entries,n=0,i=r.length-1;i>=n;n++)if(t(r[e?i-n:n])===!1)return!1},_t.prototype.iterate=vt.prototype.iterate=function(t,e){for(var r=this.nodes,n=0,i=r.length-1;i>=n;n++){var o=r[e?i-n:n];if(o&&o.iterate(t,e)===!1)return!1}},yt.prototype.iterate=function(t,e){return t(this.entry)},t(gt,b),gt.prototype.next=function(){for(var t=this._type,e=this._stack;e;){var r,n=e.node,i=e.index++;if(n.entry){if(0===i)return mt(t,n.entry)}else if(n.entries){if(r=n.entries.length-1,r>=i)return mt(t,n.entries[this._reverse?r-i:i])}else if(r=n.nodes.length-1,r>=i){var o=n.nodes[this._reverse?r-i:i];if(o){if(o.entry)return mt(t,o.entry);e=this._stack=wt(o,e)}continue}e=this._stack=this._stack.__prev}return O()};var $r,Nr=_r/4,Br=_r/2,Wr=_r/4;t(Tt,rt),Tt.of=function(){return this(arguments)},Tt.prototype.toString=function(){return this.__toString("List [","]")},Tt.prototype.get=function(t,e){if(t=v(this,t),t>=0&&t<this.size){t+=this._origin;var r=Vt(this,t);return r&&r.array[t&vr]}return e},Tt.prototype.set=function(t,e){return Wt(this,t,e)},Tt.prototype.remove=function(t){return this.has(t)?0===t?this.shift():t===this.size-1?this.pop():this.splice(t,1):this},Tt.prototype.insert=function(t,e){return this.splice(t,0,e)},Tt.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=this._origin=this._capacity=0,this._level=lr,this._root=this._tail=null,this.__hash=void 0,this.__altered=!0,this):Bt()},Tt.prototype.push=function(){var t=arguments,e=this.size;return this.withMutations(function(r){Yt(r,0,e+t.length);for(var n=0;n<t.length;n++)r.set(e+n,t[n])})},Tt.prototype.pop=function(){return Yt(this,0,-1)},Tt.prototype.unshift=function(){var t=arguments;return this.withMutations(function(e){Yt(e,-t.length);for(var r=0;r<t.length;r++)e.set(r,t[r])})},Tt.prototype.shift=function(){return Yt(this,1)},Tt.prototype.merge=function(){return Qt(this,void 0,arguments)},Tt.prototype.mergeWith=function(t){var e=sr.call(arguments,1);return Qt(this,t,e)},Tt.prototype.mergeDeep=function(){return Qt(this,Et,arguments)},Tt.prototype.mergeDeepWith=function(t){var e=sr.call(arguments,1);return Qt(this,xt(t),e)},Tt.prototype.setSize=function(t){return Yt(this,0,t)},Tt.prototype.slice=function(t,e){var r=this.size;return y(t,e,r)?this:Yt(this,g(t,r),m(e,r))},Tt.prototype.__iterator=function(t,e){var r=0,n=$t(this,e);return new b(function(){var e=n();return e===Yr?O():S(t,r++,e)})},Tt.prototype.__iterate=function(t,e){for(var r,n=0,i=$t(this,e);(r=i())!==Yr&&t(r,n++,this)!==!1;);return n},Tt.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?Nt(this._origin,this._capacity,this._level,this._root,this._tail,t,this.__hash):(this.__ownerID=t,this)},Tt.isList=Ut;var Hr="@@__IMMUTABLE_LIST__@@",Jr=Tt.prototype;Jr[Hr]=!0,Jr[pr]=Jr.remove,Jr.setIn=Kr.setIn,Jr.deleteIn=Jr.removeIn=Kr.removeIn,Jr.update=Kr.update,Jr.updateIn=Kr.updateIn,Jr.mergeIn=Kr.mergeIn,Jr.mergeDeepIn=Kr.mergeDeepIn,Jr.withMutations=Kr.withMutations,Jr.asMutable=Kr.asMutable,Jr.asImmutable=Kr.asImmutable,Jr.wasAltered=Kr.wasAltered,Kt.prototype.removeBefore=function(t,e,r){if(r===e?1<<e:0===this.array.length)return this;var n=r>>>e&vr;if(n>=this.array.length)return new Kt([],t);var i,o=0===n;if(e>0){var u=this.array[n];if(i=u&&u.removeBefore(t,e-lr,r),i===u&&o)return this}if(o&&!i)return this;var s=Jt(this,t);if(!o)for(var a=0;n>a;a++)s.array[a]=void 0;return i&&(s.array[n]=i),s},Kt.prototype.removeAfter=function(t,e,r){if(r===(e?1<<e:0)||0===this.array.length)return this;var n=r-1>>>e&vr;if(n>=this.array.length)return this;var i;if(e>0){var o=this.array[n];if(i=o&&o.removeAfter(t,e-lr,r),i===o&&n===this.array.length-1)return this}var u=Jt(this,t);return u.array.splice(n+1),i&&(u.array[n]=i),u};var Vr,Yr={};t(Zt,ht),Zt.of=function(){return this(arguments)},Zt.prototype.toString=function(){return this.__toString("OrderedMap {","}")},Zt.prototype.get=function(t,e){var r=this._map.get(t);return void 0!==r?this._list.get(r)[1]:e},Zt.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._map.clear(),this._list.clear(),this):ee()},Zt.prototype.set=function(t,e){return re(this,t,e)},Zt.prototype.remove=function(t){return re(this,t,dr)},Zt.prototype.wasAltered=function(){return this._map.wasAltered()||this._list.wasAltered()},Zt.prototype.__iterate=function(t,e){var r=this;return this._list.__iterate(function(e){return e&&t(e[1],e[0],r)},e)},Zt.prototype.__iterator=function(t,e){return this._list.fromEntrySeq().__iterator(t,e)},Zt.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map.__ensureOwner(t),r=this._list.__ensureOwner(t);return t?te(e,r,t,this.__hash):(this.__ownerID=t,this._map=e,this._list=r,this)},Zt.isOrderedMap=Gt,Zt.prototype[hr]=!0,Zt.prototype[pr]=Zt.prototype.remove;var Qr;t(ne,k),ne.prototype.get=function(t,e){return this._iter.get(t,e)},ne.prototype.has=function(t){return this._iter.has(t)},ne.prototype.valueSeq=function(){return this._iter.valueSeq()},ne.prototype.reverse=function(){var t=this,e=ce(this,!0);return this._useKeys||(e.valueSeq=function(){return t._iter.toSeq().reverse()}),e},ne.prototype.map=function(t,e){var r=this,n=ae(this,t,e);return this._useKeys||(n.valueSeq=function(){return r._iter.toSeq().map(t,e)}),n},ne.prototype.__iterate=function(t,e){var r,n=this;return this._iter.__iterate(this._useKeys?function(e,r){return t(e,r,n)}:(r=e?De(this):0,function(i){return t(i,e?--r:r++,n)}),e)},ne.prototype.__iterator=function(t,e){if(this._useKeys)return this._iter.__iterator(t,e);var r=this._iter.__iterator(wr,e),n=e?De(this):0;return new b(function(){var i=r.next();return i.done?i:S(t,e?--n:n++,i.value,i)})},ne.prototype[hr]=!0,t(ie,E),ie.prototype.includes=function(t){return this._iter.includes(t)},ie.prototype.__iterate=function(t,e){var r=this,n=0;return this._iter.__iterate(function(e){return t(e,n++,r)},e)},ie.prototype.__iterator=function(t,e){var r=this._iter.__iterator(wr,e),n=0;return new b(function(){var e=r.next();return e.done?e:S(t,n++,e.value,e)})},t(oe,x),oe.prototype.has=function(t){return this._iter.includes(t)},oe.prototype.__iterate=function(t,e){var r=this;return this._iter.__iterate(function(e){return t(e,e,r)},e)},oe.prototype.__iterator=function(t,e){var r=this._iter.__iterator(wr,e);return new b(function(){var e=r.next();return e.done?e:S(t,e.value,e.value,e)})},t(ue,k),ue.prototype.entrySeq=function(){return this._iter.toSeq()},ue.prototype.__iterate=function(t,e){var r=this;return this._iter.__iterate(function(e){if(e){Ie(e);var n=o(e);return t(n?e.get(1):e[1],n?e.get(0):e[0],r)}},e)},ue.prototype.__iterator=function(t,e){var r=this._iter.__iterator(wr,e);return new b(function(){for(;;){var e=r.next();if(e.done)return e;var n=e.value;if(n){Ie(n);var i=o(n);return S(t,i?n.get(0):n[0],i?n.get(1):n[1],e)}}})},ie.prototype.cacheResult=ne.prototype.cacheResult=oe.prototype.cacheResult=ue.prototype.cacheResult=Ae,t(xe,et),xe.prototype.toString=function(){return this.__toString(Pe(this)+" {","}")},xe.prototype.has=function(t){return this._defaultValues.hasOwnProperty(t)},xe.prototype.get=function(t,e){if(!this.has(t))return e;var r=this._defaultValues[t];return this._map?this._map.get(t,r):r},xe.prototype.clear=function(){if(this.__ownerID)return this._map&&this._map.clear(),this;var t=this.constructor;return t._empty||(t._empty=qe(this,St()))},xe.prototype.set=function(t,e){if(!this.has(t))throw new Error('Cannot set unknown key "'+t+'" on '+Pe(this));var r=this._map&&this._map.set(t,e);return this.__ownerID||r===this._map?this:qe(this,r)},xe.prototype.remove=function(t){if(!this.has(t))return this;var e=this._map&&this._map.remove(t);return this.__ownerID||e===this._map?this:qe(this,e)},xe.prototype.wasAltered=function(){return this._map.wasAltered()},xe.prototype.__iterator=function(t,e){var n=this;return r(this._defaultValues).map(function(t,e){return n.get(e)}).__iterator(t,e)},xe.prototype.__iterate=function(t,e){var n=this;return r(this._defaultValues).map(function(t,e){return n.get(e)}).__iterate(t,e)},xe.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map&&this._map.__ensureOwner(t);return t?qe(this,e,t):(this.__ownerID=t,this._map=e,this)};var Xr=xe.prototype;Xr[pr]=Xr.remove,Xr.deleteIn=Xr.removeIn=Kr.removeIn,Xr.merge=Kr.merge,Xr.mergeWith=Kr.mergeWith,Xr.mergeIn=Kr.mergeIn,Xr.mergeDeep=Kr.mergeDeep,Xr.mergeDeepWith=Kr.mergeDeepWith,Xr.mergeDeepIn=Kr.mergeDeepIn,Xr.setIn=Kr.setIn,Xr.update=Kr.update,Xr.updateIn=Kr.updateIn,Xr.withMutations=Kr.withMutations,Xr.asMutable=Kr.asMutable,Xr.asImmutable=Kr.asImmutable,t(Re,nt),Re.of=function(){return this(arguments)},Re.fromKeys=function(t){return this(r(t).keySeq())},Re.prototype.toString=function(){return this.__toString("Set {","}")},Re.prototype.has=function(t){return this._map.has(t)},Re.prototype.add=function(t){return Te(this,this._map.set(t,!0))},Re.prototype.remove=function(t){return Te(this,this._map.remove(t))},Re.prototype.clear=function(){return Te(this,this._map.clear())},Re.prototype.union=function(){var t=sr.call(arguments,0);return t=t.filter(function(t){return 0!==t.size}),0===t.length?this:0!==this.size||this.__ownerID||1!==t.length?this.withMutations(function(e){for(var r=0;r<t.length;r++)i(t[r]).forEach(function(t){return e.add(t)})}):this.constructor(t[0])},Re.prototype.intersect=function(){var t=sr.call(arguments,0);if(0===t.length)return this;t=t.map(function(t){return i(t)});var e=this;return this.withMutations(function(r){e.forEach(function(e){t.every(function(t){return t.includes(e)})||r.remove(e)})})},Re.prototype.subtract=function(){var t=sr.call(arguments,0);if(0===t.length)return this;t=t.map(function(t){return i(t)});var e=this;return this.withMutations(function(r){e.forEach(function(e){t.some(function(t){return t.includes(e)})&&r.remove(e)})})},Re.prototype.merge=function(){return this.union.apply(this,arguments)},Re.prototype.mergeWith=function(t){var e=sr.call(arguments,1);return this.union.apply(this,e)},Re.prototype.sort=function(t){return $e(we(this,t))},Re.prototype.sortBy=function(t,e){return $e(we(this,e,t))},Re.prototype.wasAltered=function(){return this._map.wasAltered()},Re.prototype.__iterate=function(t,e){var r=this;return this._map.__iterate(function(e,n){return t(n,n,r)},e)},Re.prototype.__iterator=function(t,e){return this._map.map(function(t,e){return e}).__iterator(t,e)},Re.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map.__ensureOwner(t);return t?this.__make(e,t):(this.__ownerID=t,this._map=e,this)},Re.isSet=Ce;var Zr="@@__IMMUTABLE_SET__@@",Gr=Re.prototype;Gr[Zr]=!0,Gr[pr]=Gr.remove,Gr.mergeDeep=Gr.merge,Gr.mergeDeepWith=Gr.mergeWith,Gr.withMutations=Kr.withMutations,Gr.asMutable=Kr.asMutable,Gr.asImmutable=Kr.asImmutable,Gr.__empty=Ke,Gr.__make=Ue;var tn;t($e,Re),$e.of=function(){return this(arguments)},$e.fromKeys=function(t){return this(r(t).keySeq())},$e.prototype.toString=function(){return this.__toString("OrderedSet {","}")},$e.isOrderedSet=Ne;var en=$e.prototype;en[hr]=!0,en.__empty=We,en.__make=Be;var rn;t(He,rt),He.of=function(){return this(arguments)},He.prototype.toString=function(){return this.__toString("Stack [","]")},He.prototype.get=function(t,e){var r=this._head;for(t=v(this,t);r&&t--;)r=r.next;return r?r.value:e},He.prototype.peek=function(){return this._head&&this._head.value},He.prototype.push=function(){if(0===arguments.length)return this;for(var t=this.size+arguments.length,e=this._head,r=arguments.length-1;r>=0;r--)e={value:arguments[r],next:e};return this.__ownerID?(this.size=t,this._head=e,this.__hash=void 0,this.__altered=!0,this):Ve(t,e)},He.prototype.pushAll=function(t){if(t=n(t),0===t.size)return this;ft(t.size);var e=this.size,r=this._head;return t.reverse().forEach(function(t){e++,r={value:t,next:r}}),this.__ownerID?(this.size=e,this._head=r,this.__hash=void 0,this.__altered=!0,this):Ve(e,r)},He.prototype.pop=function(){return this.slice(1)},He.prototype.unshift=function(){return this.push.apply(this,arguments)},He.prototype.unshiftAll=function(t){return this.pushAll(t)},He.prototype.shift=function(){return this.pop.apply(this,arguments)},He.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._head=void 0,this.__hash=void 0,this.__altered=!0,this):Ye()},He.prototype.slice=function(t,e){if(y(t,e,this.size))return this;var r=g(t,this.size),n=m(e,this.size);if(n!==this.size)return rt.prototype.slice.call(this,t,e);for(var i=this.size-r,o=this._head;r--;)o=o.next;return this.__ownerID?(this.size=i,this._head=o,this.__hash=void 0,this.__altered=!0,this):Ve(i,o)},He.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?Ve(this.size,this._head,t,this.__hash):(this.__ownerID=t,this.__altered=!1,this)},He.prototype.__iterate=function(t,e){if(e)return this.reverse().__iterate(t);for(var r=0,n=this._head;n&&t(n.value,r++,this)!==!1;)n=n.next;return r},He.prototype.__iterator=function(t,e){if(e)return this.reverse().__iterator(t);var r=0,n=this._head;return new b(function(){if(n){var e=n.value;return n=n.next,S(t,r++,e)}return O()})},He.isStack=Je;var nn="@@__IMMUTABLE_STACK__@@",on=He.prototype;on[nn]=!0,on.withMutations=Kr.withMutations,on.asMutable=Kr.asMutable,on.asImmutable=Kr.asImmutable,on.wasAltered=Kr.wasAltered;var un;e.Iterator=b,Qe(e,{toArray:function(){ft(this.size);var t=new Array(this.size||0);return this.valueSeq().__iterate(function(e,r){t[r]=e}),t},toIndexedSeq:function(){return new ie(this)},toJS:function(){return this.toSeq().map(function(t){return t&&"function"==typeof t.toJS?t.toJS():t}).__toJS()},toJSON:function(){return this.toSeq().map(function(t){return t&&"function"==typeof t.toJSON?t.toJSON():t}).__toJS()},toKeyedSeq:function(){return new ne(this,!0)},toMap:function(){return ht(this.toKeyedSeq())},toObject:function(){ft(this.size);var t={};return this.__iterate(function(e,r){t[r]=e}),t},toOrderedMap:function(){return Zt(this.toKeyedSeq())},toOrderedSet:function(){return $e(u(this)?this.valueSeq():this)},toSet:function(){return Re(u(this)?this.valueSeq():this)},toSetSeq:function(){return new oe(this)},toSeq:function(){return s(this)?this.toIndexedSeq():u(this)?this.toKeyedSeq():this.toSetSeq()},toStack:function(){return He(u(this)?this.valueSeq():this)},toList:function(){return Tt(u(this)?this.valueSeq():this)},toString:function(){return"[Iterable]"},__toString:function(t,e){return 0===this.size?t+e:t+" "+this.toSeq().map(this.__toStringMapper).join(", ")+" "+e},concat:function(){var t=sr.call(arguments,0);return ze(this,de(this,t))},includes:function(t){return this.some(function(e){return Y(e,t)})},entries:function(){return this.__iterator(br)},every:function(t,e){ft(this.size);var r=!0;return this.__iterate(function(n,i,o){return t.call(e,n,i,o)?void 0:(r=!1,!1)}),r},filter:function(t,e){return ze(this,fe(this,t,e,!0))},find:function(t,e,r){var n=this.findEntry(t,e);return n?n[1]:r},findEntry:function(t,e){var r;return this.__iterate(function(n,i,o){return t.call(e,n,i,o)?(r=[i,n],!1):void 0}),r},findLastEntry:function(t,e){return this.toSeq().reverse().findEntry(t,e)},forEach:function(t,e){return ft(this.size),this.__iterate(e?t.bind(e):t)},join:function(t){ft(this.size),t=void 0!==t?""+t:",";var e="",r=!0;return this.__iterate(function(n){r?r=!1:e+=t,e+=null!==n&&void 0!==n?n.toString():""}),e},keys:function(){return this.__iterator(mr)},map:function(t,e){return ze(this,ae(this,t,e))},reduce:function(t,e,r){ft(this.size);var n,i;return arguments.length<2?i=!0:n=e,this.__iterate(function(e,o,u){i?(i=!1,n=e):n=t.call(r,n,e,o,u)}),n},reduceRight:function(t,e,r){var n=this.toKeyedSeq().reverse();return n.reduce.apply(n,arguments)},reverse:function(){return ze(this,ce(this,!0))},slice:function(t,e){return ze(this,le(this,t,e,!0))},some:function(t,e){return!this.every(Ge(t),e)},sort:function(t){return ze(this,we(this,t))},values:function(){return this.__iterator(wr)},butLast:function(){return this.slice(0,-1)},isEmpty:function(){return void 0!==this.size?0===this.size:!this.some(function(){return!0})},count:function(t,e){return _(t?this.toSeq().filter(t,e):this)},countBy:function(t,e){return he(this,t,e)},equals:function(t){return Q(this,t)},entrySeq:function(){var t=this;if(t._cache)return new q(t._cache);var e=t.toSeq().map(Ze).toIndexedSeq();return e.fromEntrySeq=function(){return t.toSeq()},e},filterNot:function(t,e){return this.filter(Ge(t),e)},findLast:function(t,e,r){return this.toKeyedSeq().reverse().find(t,e,r)},first:function(){return this.find(d)},flatMap:function(t,e){return ze(this,ge(this,t,e))},flatten:function(t){return ze(this,ye(this,t,!0))},fromEntrySeq:function(){return new ue(this)},get:function(t,e){return this.find(function(e,r){return Y(r,t)},void 0,e)},getIn:function(t,e){for(var r,n=this,i=Ee(t);!(r=i.next()).done;){var o=r.value;if(n=n&&n.get?n.get(o,dr):dr,n===dr)return e}return n},groupBy:function(t,e){return pe(this,t,e)},has:function(t){return this.get(t,dr)!==dr},hasIn:function(t){return this.getIn(t,dr)!==dr},isSubset:function(t){return t="function"==typeof t.includes?t:e(t),this.every(function(e){return t.includes(e)})},isSuperset:function(t){return t="function"==typeof t.isSubset?t:e(t),t.isSubset(this)},keySeq:function(){return this.toSeq().map(Xe).toIndexedSeq()},last:function(){return this.toSeq().reverse().first()},max:function(t){return be(this,t)},maxBy:function(t,e){return be(this,e,t)},min:function(t){return be(this,t?tr(t):nr)},minBy:function(t,e){return be(this,e?tr(e):nr,t)},rest:function(){return this.slice(1)},skip:function(t){return this.slice(Math.max(0,t))},skipLast:function(t){return ze(this,this.toSeq().reverse().skip(t).reverse())},skipWhile:function(t,e){return ze(this,ve(this,t,e,!0))},skipUntil:function(t,e){return this.skipWhile(Ge(t),e)},sortBy:function(t,e){return ze(this,we(this,e,t))},take:function(t){return this.slice(0,Math.max(0,t))},takeLast:function(t){return ze(this,this.toSeq().reverse().take(t).reverse())},takeWhile:function(t,e){return ze(this,_e(this,t,e))},takeUntil:function(t,e){return this.takeWhile(Ge(t),e)},valueSeq:function(){return this.toIndexedSeq()},hashCode:function(){return this.__hash||(this.__hash=ir(this))}});var sn=e.prototype;sn[ar]=!0,sn[zr]=sn.values,sn.__toJS=sn.toArray,sn.__toStringMapper=er,sn.inspect=sn.toSource=function(){return this.toString()},sn.chain=sn.flatMap,sn.contains=sn.includes,function(){try{Object.defineProperty(sn,"length",{get:function(){if(!e.noLengthWarning){var t;try{throw new Error}catch(r){t=r.stack}if(-1===t.indexOf("_wrapObject"))return console&&console.warn&&console.warn("iterable.length has been deprecated, use iterable.size or iterable.count(). This warning will become a silent error in a future version. "+t),this.size}}})}catch(t){}}(),Qe(r,{flip:function(){return ze(this,se(this))},findKey:function(t,e){var r=this.findEntry(t,e);return r&&r[0]},findLastKey:function(t,e){return this.toSeq().reverse().findKey(t,e)},keyOf:function(t){return this.findKey(function(e){return Y(e,t)})},lastKeyOf:function(t){return this.findLastKey(function(e){return Y(e,t)})},mapEntries:function(t,e){var r=this,n=0;return ze(this,this.toSeq().map(function(i,o){return t.call(e,[o,i],n++,r)}).fromEntrySeq())},mapKeys:function(t,e){var r=this;return ze(this,this.toSeq().flip().map(function(n,i){return t.call(e,n,i,r)}).flip())}});var an=r.prototype;an[cr]=!0,an[zr]=sn.entries,an.__toJS=sn.toObject,an.__toStringMapper=function(t,e){return JSON.stringify(e)+": "+er(t)},Qe(n,{toKeyedSeq:function(){return new ne(this,!1)},filter:function(t,e){return ze(this,fe(this,t,e,!1))},findIndex:function(t,e){var r=this.findEntry(t,e);return r?r[0]:-1},indexOf:function(t){var e=this.toKeyedSeq().keyOf(t);return void 0===e?-1:e},lastIndexOf:function(t){var e=this.toKeyedSeq().reverse().keyOf(t);return void 0===e?-1:e},reverse:function(){return ze(this,ce(this,!1))},slice:function(t,e){return ze(this,le(this,t,e,!1))},splice:function(t,e){var r=arguments.length;if(e=Math.max(0|e,0),0===r||2===r&&!e)return this;t=g(t,0>t?this.count():this.size);var n=this.slice(0,t);return ze(this,1===r?n:n.concat(l(arguments,2),this.slice(t+e)))},findLastIndex:function(t,e){var r=this.toKeyedSeq().findLastKey(t,e);return void 0===r?-1:r},first:function(){return this.get(0)},flatten:function(t){return ze(this,ye(this,t,!1))},get:function(t,e){return t=v(this,t),0>t||this.size===1/0||void 0!==this.size&&t>this.size?e:this.find(function(e,r){return r===t},void 0,e)},has:function(t){return t=v(this,t),t>=0&&(void 0!==this.size?this.size===1/0||t<this.size:-1!==this.indexOf(t))},interpose:function(t){return ze(this,me(this,t))},interleave:function(){var t=[this].concat(l(arguments)),e=Oe(this.toSeq(),E.of,t),r=e.flatten(!0);return e.size&&(r.size=e.size*t.length),ze(this,r)},last:function(){return this.get(-1)},skipWhile:function(t,e){return ze(this,ve(this,t,e,!1))},zip:function(){var t=[this].concat(l(arguments));return ze(this,Oe(this,rr,t))},zipWith:function(t){var e=l(arguments);return e[0]=this,ze(this,Oe(this,t,e))}}),n.prototype[fr]=!0,n.prototype[hr]=!0,Qe(i,{get:function(t,e){return this.has(t)?t:e},includes:function(t){return this.has(t)},keySeq:function(){return this.valueSeq()}}),i.prototype.has=sn.includes,Qe(k,r.prototype),Qe(E,n.prototype),Qe(x,i.prototype),Qe(et,r.prototype),Qe(rt,n.prototype),Qe(nt,i.prototype);var cn={Iterable:e,Seq:A,Collection:tt,Map:ht,OrderedMap:Zt,List:Tt,Stack:He,Set:Re,OrderedSet:$e,Record:xe,Range:G,Repeat:X,is:Y,fromJS:W};return cn})},function(t,e){"use strict";function r(){var t=[],e=function(e){var r=t.indexOf(e);r>=0&&t.splice(r,1)},r=function(r){t.push(r);var n=function(){return e(r)};return{dispose:n}},n=function(e){t.forEach(function(t){return t(e)})};return{subscribe:r,push:n,unsubscribe:e}}t.exports=r},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){return t.config=(0,s.assign)({setState:function(t,e){return this.state=e,this.state},getState:function(t){return t},onSerialize:function(t){return t.toJS()},onDeserialize:function(t){return u["default"].fromJS(t)}},e),t}Object.defineProperty(e,"__esModule",{value:!0});var o=r(5),u=n(o),s=r(8);e["default"]=i,t.exports=e["default"]},function(t,e){"use strict";function r(t){var e=t.constructor;return!!t&&"object"==typeof t&&"[object Object]"===Object.prototype.toString.call(t)&&u(e)&&(e instanceof e||"AltStore"===t.type)}function n(t){return!!t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then}function i(t,e){e.forEach(function(e){Object.keys(Object(e)).forEach(function(r){t(r,e[r])})})}function o(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;e>n;n++)r[n-1]=arguments[n];return i(function(e,r){return t[e]=r},r),t}Object.defineProperty(e,"__esModule",{value:!0}),e.isPojo=r,e.isPromise=n,e.eachObject=i,e.assign=o;var u=function(t){return"function"==typeof t};e.isFunction=u},function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e["default"]=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e,r,n,i){var o=f.uid(t._actionsRegistry,e+"."+r);t._actionsRegistry[o]=1;var u={id:o,namespace:e,name:r},s=new h(t,o,n,i,u),c=function(e){return t.dispatch(o,e,u)},p=function(){s.dispatched=!1;var e=s._dispatch.apply(s,arguments);return s.dispatched||void 0===e||a.isPromise(e)||(a.isFunction(e)?e(c,t):c(e)),e};p.defer=function(){for(var t=arguments.length,e=Array(t),r=0;t>r;r++)e[r]=arguments[r];setTimeout(function(){s._dispatch.apply(null,e)})},p.id=o,p.data=u;var l=t.actions[e],_=f.uid(l,r);return l[_]=p,p}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();e["default"]=o;var s=r(1),a=n(s),c=r(2),f=n(c),h=function(){function t(e,r,n,o,u){i(this,t),this.id=r,this._dispatch=n.bind(this),this.actions=o,this.actionDetails=u,this.alt=e}return u(t,[{key:"dispatch",value:function(t){this.dispatched=!0,this.alt.dispatch(this.id,t,this.actionDetails)}}]),t}();t.exports=e["default"]},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e["default"]=t,e}function o(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=Function.prototype.bind,c=function(t,e,r){for(var n=!0;n;){var i=t,o=e,u=r;s=c=a=void 0,n=!1,null===i&&(i=Function.prototype);
var s=Object.getOwnPropertyDescriptor(i,o);if(void 0!==s){if("value"in s)return s.value;var a=s.get;if(void 0===a)return;return a.call(u)}var c=Object.getPrototypeOf(i);if(null===c)return;t=c,e=o,r=u,n=!0}},f=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),h=r(18),p=r(14),l=i(p),_=r(1),v=i(_),d=r(13),y=i(d),g=r(2),m=i(g),w=r(9),b=n(w),S=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];s(this,t),this.config=e,this.serialize=e.serialize||JSON.stringify,this.deserialize=e.deserialize||JSON.parse,this.dispatcher=e.dispatcher||new h.Dispatcher,this.batchingFunction=e.batchingFunction||function(t){return t()},this.actions={global:{}},this.stores={},this.storeTransforms=e.storeTransforms||[],this.trapAsync=!1,this._actionsRegistry={},this._initSnapshot={},this._lastSnapshot={}}return f(t,[{key:"dispatch",value:function(t,e,r){var n=this;this.batchingFunction(function(){var i=Math.random().toString(18).substr(2,16);if(t.hasOwnProperty("type")&&t.hasOwnProperty("payload")){var o={id:t.type,namespace:t.type,name:t.type};return n.dispatcher.dispatch(m.fsa(i,t.type,t.payload,o))}return t.id&&t.dispatch?m.dispatch(i,t,e,n):n.dispatcher.dispatch(m.fsa(i,t,e,r))})}},{key:"createUnsavedStore",value:function(t){var e=t.displayName||"";y.createStoreConfig(this.config,t);for(var r=y.transformStore(this.storeTransforms,t),n=arguments.length,i=Array(n>1?n-1:0),o=1;n>o;o++)i[o-1]=arguments[o];return v.isFunction(r)?y.createStoreFromClass.apply(y,[this,r,e].concat(i)):y.createStoreFromObject(this,r,e)}},{key:"createStore",value:function(t,e){var r=e||t.displayName||t.name||"";y.createStoreConfig(this.config,t);var n=y.transformStore(this.storeTransforms,t);(this.stores[r]||!r)&&(this.stores[r]?m.warn("A store named "+r+" already exists, double check your store names or pass in your own custom identifier for each store"):m.warn("Store name was not specified"),r=m.uid(this.stores,r));for(var i=arguments.length,o=Array(i>2?i-2:0),u=2;i>u;u++)o[u-2]=arguments[u];var s=v.isFunction(n)?y.createStoreFromClass.apply(y,[this,n,r].concat(o)):y.createStoreFromObject(this,n,r);return this.stores[r]=s,l.saveInitialSnapshot(this,r),s}},{key:"generateActions",value:function(){for(var t={name:"global"},e=arguments.length,r=Array(e),n=0;e>n;n++)r[n]=arguments[n];return this.createActions(r.reduce(function(t,e){return t[e]=m.dispatchIdentity,t},t))}},{key:"createAction",value:function(t,e,r){return(0,b["default"])(this,"global",t,e,r)}},{key:"createActions",value:function(t){var e=arguments,r=this,n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i={},h=m.uid(this._actionsRegistry,t.displayName||t.name||"Unknown");if(v.isFunction(t)){var p,l,_;!function(){v.assign(i,m.getInternalMethods(t,!0));var r=function(t){function e(){s(this,e);for(var t=arguments.length,r=Array(t),n=0;t>n;n++)r[n]=arguments[n];c(Object.getPrototypeOf(e.prototype),"constructor",this).apply(this,r)}return u(e,t),f(e,[{key:"generateActions",value:function(){for(var t=arguments.length,e=Array(t),r=0;t>r;r++)e[r]=arguments[r];e.forEach(function(t){i[t]=m.dispatchIdentity})}}]),e}(t);for(p=e.length,l=Array(p>2?p-2:0),_=2;p>_;_++)l[_-2]=e[_];v.assign(i,new(a.apply(r,[null].concat(o(l)))))}()}else v.assign(i,t);return this.actions[h]=this.actions[h]||{},v.eachObject(function(t,e){if(v.isFunction(e)){n[t]=(0,b["default"])(r,h,t,e,n);var i=m.formatAsConstant(t);n[i]=n[t].id}},[i]),n}},{key:"takeSnapshot",value:function(){for(var t=arguments.length,e=Array(t),r=0;t>r;r++)e[r]=arguments[r];var n=l.snapshot(this,e);return v.assign(this._lastSnapshot,n),this.serialize(n)}},{key:"rollback",value:function(){l.setAppState(this,this.serialize(this._lastSnapshot),function(t){t.lifecycle("rollback"),t.emitChange()})}},{key:"recycle",value:function(){for(var t=arguments.length,e=Array(t),r=0;t>r;r++)e[r]=arguments[r];var n=e.length?l.filterSnapshots(this,this._initSnapshot,e):this._initSnapshot;l.setAppState(this,this.serialize(n),function(t){t.lifecycle("init"),t.emitChange()})}},{key:"flush",value:function(){var t=this.serialize(l.snapshot(this));return this.recycle(),t}},{key:"bootstrap",value:function(t){l.setAppState(this,t,function(t,e){t.lifecycle("bootstrap",e),t.emitChange()})}},{key:"prepare",value:function(t,e){var r={};if(!t.displayName)throw new ReferenceError("Store provided does not have a name");return r[t.displayName]=e,this.serialize(r)}},{key:"addActions",value:function(t,e){for(var r=arguments.length,n=Array(r>2?r-2:0),i=2;r>i;i++)n[i-2]=arguments[i];this.actions[t]=Array.isArray(e)?this.generateActions.apply(this,e):this.createActions.apply(this,[e].concat(n))}},{key:"addStore",value:function(t,e){for(var r=arguments.length,n=Array(r>2?r-2:0),i=2;r>i;i++)n[i-2]=arguments[i];this.createStore.apply(this,[e,t].concat(n))}},{key:"getActions",value:function(t){return this.actions[t]}},{key:"getStore",value:function(t){return this.stores[t]}}],[{key:"debug",value:function(t,e){var r="alt.js.org";return"undefined"!=typeof window&&(window[r]=window[r]||[],window[r].push({name:t,alt:e})),e}}]),t}();e["default"]=S,t.exports=e["default"]},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e["default"]=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=r(1),a=i(s),c=r(6),f=n(c),h=function(){function t(e,r,n,i){var u=this;o(this,t);var s=r.lifecycleEvents;this.transmitter=(0,f["default"])(),this.lifecycle=function(t,e){s[t]&&s[t].push(e)},this.state=n,this.alt=e,this.preventDefault=!1,this.displayName=r.displayName,this.boundListeners=r.boundListeners,this.StoreModel=i,this.reduce=r.reduce||function(t){return t};var c=r.output||function(t){return t};this.emitChange=function(){return u.transmitter.push(c(u.state))};var h=function(t,e){try{return t()}catch(n){if(r.handlesOwnErrors)return u.lifecycle("error",{error:n,payload:e,state:u.state}),!1;throw n}};a.assign(this,r.publicMethods),this.dispatchToken=e.dispatcher.register(function(t){u.preventDefault=!1,u.lifecycle("beforeEach",{payload:t,state:u.state});var e=r.actionListeners[t.action];if(e||r.otherwise){var n=void 0;n=e?h(function(){return e.filter(Boolean).every(function(e){return e.call(r,t.data,t.action)!==!1})},t):h(function(){return r.otherwise(t.data,t.action)},t),n===!1||u.preventDefault||u.emitChange()}r.reduce&&(h(function(){var e=r.reduce(u.state,t);void 0!==e&&(u.state=e)},t),u.preventDefault||u.emitChange()),u.lifecycle("afterEach",{payload:t,state:u.state})}),this.lifecycle("init")}return u(t,[{key:"listen",value:function(t){var e=this;if(!a.isFunction(t))throw new TypeError("listen expects a function");return this.transmitter.subscribe(t),function(){return e.unlisten(t)}}},{key:"unlisten",value:function(t){this.lifecycle("unlisten"),this.transmitter.unsubscribe(t)}},{key:"getState",value:function(){return this.StoreModel.config.getState.call(this,this.state)}}]),t}();e["default"]=h,t.exports=e["default"]},function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e["default"]=t,e}function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=r(6),u=i(o),s=r(1),a=n(s),c={waitFor:function(){for(var t=arguments.length,e=Array(t),r=0;t>r;r++)e[r]=arguments[r];if(!e.length)throw new ReferenceError("Dispatch tokens not provided");var n=e;1===e.length&&(n=Array.isArray(e[0])?e[0]:e);var i=n.map(function(t){return t.dispatchToken||t});this.dispatcher.waitFor(i)},exportAsync:function(t){this.registerAsync(t)},registerAsync:function(t){var e=this,r=0,n=a.isFunction(t)?t(this.alt):t,i=Object.keys(n).reduce(function(t,i){var o=n[i],u=a.isFunction(o)?o(e):o,s=["success","error","loading"];return s.forEach(function(t){if(u[t]&&!u[t].id)throw new Error(t+" handler must be an action function")}),t[i]=function(){for(var t=arguments.length,n=Array(t),i=0;t>i;i++)n[i]=arguments[i];var o=e.getInstance().getState(),s=u.local&&u.local.apply(u,[o].concat(n)),a=u.shouldFetch?u.shouldFetch.apply(u,[o].concat(n)):null==s,c=u.interceptResponse||function(t){return t},f=function(t,i){return function(o){var u=function(){if(r-=1,t(c(o,t,n)),i)throw o};return e.alt.trapAsync?function(){return u()}:u()}};return a?(r+=1,u.loading&&u.loading(c(null,u.loading,n)),u.remote.apply(u,[o].concat(n)).then(f(u.success),f(u.error,1))):(e.emitChange(),s)},t},{});this.exportPublicMethods(i),this.exportPublicMethods({isLoading:function(){return r>0}})},exportPublicMethods:function(t){var e=this;a.eachObject(function(t,r){if(!a.isFunction(r))throw new TypeError("exportPublicMethods expects a function");e.publicMethods[t]=r},[t])},emitChange:function(){this.getInstance().emitChange()},on:function(t,e){"error"===t&&(this.handlesOwnErrors=!0);var r=this.lifecycleEvents[t]||(0,u["default"])();return this.lifecycleEvents[t]=r,r.subscribe(e.bind(this))},bindAction:function(t,e){if(!t)throw new ReferenceError("Invalid action reference passed in");if(!a.isFunction(e))throw new TypeError("bindAction expects a function");if(e.length>1)throw new TypeError("Action handler in store "+this.displayName+" for "+((t.id||t).toString()+" was defined with ")+"two parameters. Only a single parameter is passed through the dispatcher, did you mean to pass in an Object instead?");var r=t.id?t.id:t;this.actionListeners[r]=this.actionListeners[r]||[],this.actionListenerHandlers[r]=this.actionListenerHandlers[r]||[],-1===this.actionListenerHandlers[r].indexOf(e)&&(this.actionListenerHandlers[r].push(e),this.actionListeners[r].push(e.bind(this))),this.boundListeners.push(r)},bindActions:function(t){var e=this;a.eachObject(function(t,r){var n=/./,i=t.replace(n,function(t){return"on"+t[0].toUpperCase()});if(e[t]&&e[i])throw new ReferenceError("You have multiple action handlers bound to an action: "+(t+" and "+i));var o=e[t]||e[i];o&&e.bindAction(r,o)},[t])},bindListeners:function(t){var e=this;a.eachObject(function(t,r){var n=e[t];if(!n)throw new ReferenceError(t+" defined but does not exist in "+e.displayName);Array.isArray(r)?r.forEach(function(t){e.bindAction(t,n)}):e.bindAction(r,n)},[t])}};e["default"]=c,t.exports=e["default"]},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e["default"]=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t,e,r){if(r){var n=e.StoreModel.config,i=g.isFunction(r)?r(e.state):r;e.state=n.setState.call(t,e.state,i),t.alt.dispatcher.isDispatching()||t.emitChange()}}function a(t,e,r,n){return g.assign(t,S["default"],{displayName:r,alt:e,dispatcher:e.dispatcher,preventDefault:function(){this.getInstance().preventDefault=!0},boundListeners:[],lifecycleEvents:{},actionListeners:{},actionListenerHandlers:{},publicMethods:{},handlesOwnErrors:!1},n)}function c(t,e){e.config=g.assign({getState:function(t){return Array.isArray(t)?t.slice():g.isMutableObject(t)?g.assign({},t):t},setState:function(t,e){return g.isMutableObject(e)?g.assign(t,e):e}},t,e.config)}function f(t,e){return t.reduce(function(t,e){return e(t)},e)}function h(t,e,r){var n=void 0,i=a({},t,r,g.assign({getInstance:function(){return n},setState:function(t){s(this,n,t)}},e));return i.bindListeners&&S["default"].bindListeners.call(i,i.bindListeners),i.observe&&S["default"].bindListeners.call(i,i.observe(t)),i.lifecycle&&g.eachObject(function(t,e){S["default"].on.call(i,t,e)},[i.lifecycle]),n=g.assign(new w["default"](t,i,void 0!==i.state?i.state:{},e),i.publicMethods,{displayName:r,config:e.config})}function p(t,e,r){var n=void 0,i=e.config,c=function(t){function e(){o(this,e);for(var t=arguments.length,r=Array(t),n=0;t>n;n++)r[n]=arguments[n];_(Object.getPrototypeOf(e.prototype),"constructor",this).apply(this,r)}return u(e,t),e}(e);a(c.prototype,t,r,{type:"AltStore",getInstance:function(){return n},setState:function(t){s(this,n,t)}});for(var f=arguments.length,h=Array(f>3?f-3:0),p=3;f>p;p++)h[p-3]=arguments[p];var v=new(l.apply(c,[null].concat(h)));return i.bindListeners&&v.bindListeners(i.bindListeners),i.datasource&&v.registerAsync(i.datasource),n=g.assign(new w["default"](t,v,void 0!==v.state?v.state:v,e),d.getInternalMethods(e),i.publicMethods,{displayName:r})}Object.defineProperty(e,"__esModule",{value:!0});var l=Function.prototype.bind,_=function(t,e,r){for(var n=!0;n;){var i=t,o=e,u=r;s=c=a=void 0,n=!1,null===i&&(i=Function.prototype);var s=Object.getOwnPropertyDescriptor(i,o);if(void 0!==s){if("value"in s)return s.value;var a=s.get;if(void 0===a)return;return a.call(u)}var c=Object.getPrototypeOf(i);if(null===c)return;t=c,e=o,r=u,n=!0}};e.createStoreConfig=c,e.transformStore=f,e.createStoreFromObject=h,e.createStoreFromClass=p;var v=r(2),d=i(v),y=r(1),g=i(y),m=r(11),w=n(m),b=r(12),S=n(b)},function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e["default"]=t,e}function i(t,e,r){var n=t.deserialize(e);c.eachObject(function(e,i){var o=t.stores[e];o&&!function(){var t=o.StoreModel.config,u=o.state;t.onDeserialize&&(n[e]=t.onDeserialize(i)||i),c.isMutableObject(u)?(c.eachObject(function(t){return delete u[t]},[u]),c.assign(u,n[e])):o.state=n[e],r(o,o.state)}()},[n])}function o(t){var e=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],r=e.length?e:Object.keys(t.stores);return r.reduce(function(e,r){var n=r.displayName||r,i=t.stores[n],o=i.StoreModel.config;i.lifecycle("snapshot");var u=o.onSerialize&&o.onSerialize(i.state);return e[n]=u?u:i.getState(),e},{})}function u(t,e){var r=t.deserialize(t.serialize(t.stores[e].state));t._initSnapshot[e]=r,t._lastSnapshot[e]=r}function s(t,e,r){return r.reduce(function(t,r){var n=r.displayName||r;if(!e[n])throw new ReferenceError(n+" is not a valid store");return t[n]=e[n],t},{})}Object.defineProperty(e,"__esModule",{value:!0}),e.setAppState=i,e.snapshot=o,e.saveInitialSnapshot=u,e.filterSnapshots=s;var a=r(1),c=n(a)},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=r(3),o=n(i),u=r(16),s=n(u),a=r(17),c=n(a);e["default"]={store:s["default"],actions:o["default"],utils:c["default"]},t.exports=e["default"]},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=r(4),s=n(u),a=r(7),c=n(a),f=r(5),h=n(f),p=r(3),l=n(p),_=function(){function t(){i(this,t);var e=l["default"].activateFeature,r=l["default"].deactivateFeature;this.bindListeners({setFeature:e,removeFeature:r}),this.exportPublicMethods({_isFeatureActive:this._isFeatureActive,_getImmutableState:this._getImmutableState}),this.state=h["default"].Map()}return o(t,[{key:"_isFeatureActive",value:function(t){return!!this.state.get(t)}},{key:"_getImmutableState",value:function(){return h["default"].fromJS(this.getState())}},{key:"setFeature",value:function(t){this.setState(this.state.set(t,!0))}},{key:"removeFeature",value:function(t){this.setState(this.state["delete"](t))}}]),t}();e["default"]=s["default"].createStore((0,c["default"])(_)),t.exports=e["default"]},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=r(3),o=n(i);e["default"]={activateFeature:function(t){return o["default"].activateFeature(t)},deactivateFeature:function(t){return o["default"].deactivateFeature(t)}},t.exports=e["default"]},function(t,e,r){t.exports.Dispatcher=r(19)},function(t,e,r){"use strict";function n(){this.$Dispatcher_callbacks={},this.$Dispatcher_isPending={},this.$Dispatcher_isHandled={},this.$Dispatcher_isDispatching=!1,this.$Dispatcher_pendingPayload=null}var i=r(20),o=1,u="ID_";n.prototype.register=function(t){var e=u+o++;return this.$Dispatcher_callbacks[e]=t,e},n.prototype.unregister=function(t){i(this.$Dispatcher_callbacks[t],"Dispatcher.unregister(...): `%s` does not map to a registered callback.",t),delete this.$Dispatcher_callbacks[t]},n.prototype.waitFor=function(t){i(this.$Dispatcher_isDispatching,"Dispatcher.waitFor(...): Must be invoked while dispatching.");for(var e=0;e<t.length;e++){var r=t[e];this.$Dispatcher_isPending[r]?i(this.$Dispatcher_isHandled[r],"Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.",r):(i(this.$Dispatcher_callbacks[r],"Dispatcher.waitFor(...): `%s` does not map to a registered callback.",r),this.$Dispatcher_invokeCallback(r))}},n.prototype.dispatch=function(t){i(!this.$Dispatcher_isDispatching,"Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."),this.$Dispatcher_startDispatching(t);try{for(var e in this.$Dispatcher_callbacks)this.$Dispatcher_isPending[e]||this.$Dispatcher_invokeCallback(e)}finally{this.$Dispatcher_stopDispatching()}},n.prototype.isDispatching=function(){return this.$Dispatcher_isDispatching},n.prototype.$Dispatcher_invokeCallback=function(t){this.$Dispatcher_isPending[t]=!0,this.$Dispatcher_callbacks[t](this.$Dispatcher_pendingPayload),this.$Dispatcher_isHandled[t]=!0},n.prototype.$Dispatcher_startDispatching=function(t){for(var e in this.$Dispatcher_callbacks)this.$Dispatcher_isPending[e]=!1,this.$Dispatcher_isHandled[e]=!1;this.$Dispatcher_pendingPayload=t,this.$Dispatcher_isDispatching=!0},n.prototype.$Dispatcher_stopDispatching=function(){this.$Dispatcher_pendingPayload=null,this.$Dispatcher_isDispatching=!1},t.exports=n},function(t,e){"use strict";var r=function(t,e,r,n,i,o,u,s){if(!t){var a;if(void 0===e)a=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[r,n,i,o,u,s],f=0;a=new Error("Invariant Violation: "+e.replace(/%s/g,function(){return c[f++]}))}throw a.framesToPop=1,a}};t.exports=r}])});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Afrikaans [af]
//! author : Werner Mollentze : https://github.com/wernerm

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var af = moment.defineLocale('af', {
    months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
    monthsShort : 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
    weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
    weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
    weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
    meridiemParse: /vm|nm/i,
    isPM : function (input) {
        return /^nm$/i.test(input);
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 12) {
            return isLower ? 'vm' : 'VM';
        } else {
            return isLower ? 'nm' : 'NM';
        }
    },
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Vandag om] LT',
        nextDay : '[Môre om] LT',
        nextWeek : 'dddd [om] LT',
        lastDay : '[Gister om] LT',
        lastWeek : '[Laas] dddd [om] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'oor %s',
        past : '%s gelede',
        s : '\'n paar sekondes',
        m : '\'n minuut',
        mm : '%d minute',
        h : '\'n uur',
        hh : '%d ure',
        d : '\'n dag',
        dd : '%d dae',
        M : '\'n maand',
        MM : '%d maande',
        y : '\'n jaar',
        yy : '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal : function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
    },
    week : {
        dow : 1, // Maandag is die eerste dag van die week.
        doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
    }
});

return af;

})));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Algeria) [ar-dz]
//! author : Noureddine LOUAHEDJ : https://github.com/noureddineme

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var arDz = moment.defineLocale('ar-dz', {
    months : 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    monthsShort : 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'أح_إث_ثلا_أر_خم_جم_سب'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[اليوم على الساعة] LT',
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'في %s',
        past : 'منذ %s',
        s : 'ثوان',
        m : 'دقيقة',
        mm : '%d دقائق',
        h : 'ساعة',
        hh : '%d ساعات',
        d : 'يوم',
        dd : '%d أيام',
        M : 'شهر',
        MM : '%d أشهر',
        y : 'سنة',
        yy : '%d سنوات'
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 4  // The week that contains Jan 1st is the first week of the year.
    }
});

return arDz;

})));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Kuwait) [ar-kw]
//! author : Nusret Parlak: https://github.com/nusretparlak

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var arKw = moment.defineLocale('ar-kw', {
    months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[اليوم على الساعة] LT',
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'في %s',
        past : 'منذ %s',
        s : 'ثوان',
        m : 'دقيقة',
        mm : '%d دقائق',
        h : 'ساعة',
        hh : '%d ساعات',
        d : 'يوم',
        dd : '%d أيام',
        M : 'شهر',
        MM : '%d أشهر',
        y : 'سنة',
        yy : '%d سنوات'
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return arKw;

})));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Lybia) [ar-ly]
//! author : Ali Hmer: https://github.com/kikoanis

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '0': '0'
};
var pluralForm = function (n) {
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
};
var plurals = {
    s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
    m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
    h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
    d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
    M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
    y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
};
var pluralize = function (u) {
    return function (number, withoutSuffix, string, isFuture) {
        var f = pluralForm(number),
            str = plurals[u][pluralForm(number)];
        if (f === 2) {
            str = str[withoutSuffix ? 0 : 1];
        }
        return str.replace(/%d/i, number);
    };
};
var months = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر'
];

var arLy = moment.defineLocale('ar-ly', {
    months : months,
    monthsShort : months,
    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'D/\u200FM/\u200FYYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM : function (input) {
        return 'م' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ص';
        } else {
            return 'م';
        }
    },
    calendar : {
        sameDay: '[اليوم عند الساعة] LT',
        nextDay: '[غدًا عند الساعة] LT',
        nextWeek: 'dddd [عند الساعة] LT',
        lastDay: '[أمس عند الساعة] LT',
        lastWeek: 'dddd [عند الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'بعد %s',
        past : 'منذ %s',
        s : pluralize('s'),
        m : pluralize('m'),
        mm : pluralize('m'),
        h : pluralize('h'),
        hh : pluralize('h'),
        d : pluralize('d'),
        dd : pluralize('d'),
        M : pluralize('M'),
        MM : pluralize('M'),
        y : pluralize('y'),
        yy : pluralize('y')
    },
    preparse: function (string) {
        return string.replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        }).replace(/,/g, '،');
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return arLy;

})));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Morocco) [ar-ma]
//! author : ElFadili Yassine : https://github.com/ElFadiliY
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var arMa = moment.defineLocale('ar-ma', {
    months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[اليوم على الساعة] LT',
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'في %s',
        past : 'منذ %s',
        s : 'ثوان',
        m : 'دقيقة',
        mm : '%d دقائق',
        h : 'ساعة',
        hh : '%d ساعات',
        d : 'يوم',
        dd : '%d أيام',
        M : 'شهر',
        MM : '%d أشهر',
        y : 'سنة',
        yy : '%d سنوات'
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return arMa;

})));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Saudi Arabia) [ar-sa]
//! author : Suhail Alkowaileet : https://github.com/xsoh

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '0': '٠'
};
var numberMap = {
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '٠': '0'
};

var arSa = moment.defineLocale('ar-sa', {
    months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM : function (input) {
        return 'م' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ص';
        } else {
            return 'م';
        }
    },
    calendar : {
        sameDay: '[اليوم على الساعة] LT',
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'في %s',
        past : 'منذ %s',
        s : 'ثوان',
        m : 'دقيقة',
        mm : '%d دقائق',
        h : 'ساعة',
        hh : '%d ساعات',
        d : 'يوم',
        dd : '%d أيام',
        M : 'شهر',
        MM : '%d أشهر',
        y : 'سنة',
        yy : '%d سنوات'
    },
    preparse: function (string) {
        return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
            return numberMap[match];
        }).replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        }).replace(/,/g, '،');
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return arSa;

})));


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale  :  Arabic (Tunisia) [ar-tn]
//! author : Nader Toukabri : https://github.com/naderio

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var arTn = moment.defineLocale('ar-tn', {
    months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[اليوم على الساعة] LT',
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'في %s',
        past: 'منذ %s',
        s: 'ثوان',
        m: 'دقيقة',
        mm: '%d دقائق',
        h: 'ساعة',
        hh: '%d ساعات',
        d: 'يوم',
        dd: '%d أيام',
        M: 'شهر',
        MM: '%d أشهر',
        y: 'سنة',
        yy: '%d سنوات'
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
});

return arTn;

})));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic [ar]
//! author : Abdel Said: https://github.com/abdelsaid
//! author : Ahmed Elkhatib
//! author : forabi https://github.com/forabi

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '0': '٠'
};
var numberMap = {
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '٠': '0'
};
var pluralForm = function (n) {
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
};
var plurals = {
    s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
    m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
    h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
    d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
    M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
    y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
};
var pluralize = function (u) {
    return function (number, withoutSuffix, string, isFuture) {
        var f = pluralForm(number),
            str = plurals[u][pluralForm(number)];
        if (f === 2) {
            str = str[withoutSuffix ? 0 : 1];
        }
        return str.replace(/%d/i, number);
    };
};
var months = [
    'كانون الثاني يناير',
    'شباط فبراير',
    'آذار مارس',
    'نيسان أبريل',
    'أيار مايو',
    'حزيران يونيو',
    'تموز يوليو',
    'آب أغسطس',
    'أيلول سبتمبر',
    'تشرين الأول أكتوبر',
    'تشرين الثاني نوفمبر',
    'كانون الأول ديسمبر'
];

var ar = moment.defineLocale('ar', {
    months : months,
    monthsShort : months,
    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'D/\u200FM/\u200FYYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM : function (input) {
        return 'م' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ص';
        } else {
            return 'م';
        }
    },
    calendar : {
        sameDay: '[اليوم عند الساعة] LT',
        nextDay: '[غدًا عند الساعة] LT',
        nextWeek: 'dddd [عند الساعة] LT',
        lastDay: '[أمس عند الساعة] LT',
        lastWeek: 'dddd [عند الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'بعد %s',
        past : 'منذ %s',
        s : pluralize('s'),
        m : pluralize('m'),
        mm : pluralize('m'),
        h : pluralize('h'),
        hh : pluralize('h'),
        d : pluralize('d'),
        dd : pluralize('d'),
        M : pluralize('M'),
        MM : pluralize('M'),
        y : pluralize('y'),
        yy : pluralize('y')
    },
    preparse: function (string) {
        return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
            return numberMap[match];
        }).replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        }).replace(/,/g, '،');
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return ar;

})));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Azerbaijani [az]
//! author : topchiyev : https://github.com/topchiyev

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var suffixes = {
    1: '-inci',
    5: '-inci',
    8: '-inci',
    70: '-inci',
    80: '-inci',
    2: '-nci',
    7: '-nci',
    20: '-nci',
    50: '-nci',
    3: '-üncü',
    4: '-üncü',
    100: '-üncü',
    6: '-ncı',
    9: '-uncu',
    10: '-uncu',
    30: '-uncu',
    60: '-ıncı',
    90: '-ıncı'
};

var az = moment.defineLocale('az', {
    months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
    monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
    weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
    weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
    weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[bugün saat] LT',
        nextDay : '[sabah saat] LT',
        nextWeek : '[gələn həftə] dddd [saat] LT',
        lastDay : '[dünən] LT',
        lastWeek : '[keçən həftə] dddd [saat] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s sonra',
        past : '%s əvvəl',
        s : 'birneçə saniyyə',
        m : 'bir dəqiqə',
        mm : '%d dəqiqə',
        h : 'bir saat',
        hh : '%d saat',
        d : 'bir gün',
        dd : '%d gün',
        M : 'bir ay',
        MM : '%d ay',
        y : 'bir il',
        yy : '%d il'
    },
    meridiemParse: /gecə|səhər|gündüz|axşam/,
    isPM : function (input) {
        return /^(gündüz|axşam)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'gecə';
        } else if (hour < 12) {
            return 'səhər';
        } else if (hour < 17) {
            return 'gündüz';
        } else {
            return 'axşam';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
    ordinal : function (number) {
        if (number === 0) {  // special case for zero
            return number + '-ıncı';
        }
        var a = number % 10,
            b = number % 100 - a,
            c = number >= 100 ? 100 : null;
        return number + (suffixes[a] || suffixes[b] || suffixes[c]);
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return az;

})));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Belarusian [be]
//! author : Dmitry Demidov : https://github.com/demidov91
//! author: Praleska: http://praleska.pro/
//! Author : Menelion Elensúle : https://github.com/Oire

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
        'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
        'dd': 'дзень_дні_дзён',
        'MM': 'месяц_месяцы_месяцаў',
        'yy': 'год_гады_гадоў'
    };
    if (key === 'm') {
        return withoutSuffix ? 'хвіліна' : 'хвіліну';
    }
    else if (key === 'h') {
        return withoutSuffix ? 'гадзіна' : 'гадзіну';
    }
    else {
        return number + ' ' + plural(format[key], +number);
    }
}

var be = moment.defineLocale('be', {
    months : {
        format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
        standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
    },
    monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
    weekdays : {
        format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
        standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
        isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
    },
    weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
    weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY г.',
        LLL : 'D MMMM YYYY г., HH:mm',
        LLLL : 'dddd, D MMMM YYYY г., HH:mm'
    },
    calendar : {
        sameDay: '[Сёння ў] LT',
        nextDay: '[Заўтра ў] LT',
        lastDay: '[Учора ў] LT',
        nextWeek: function () {
            return '[У] dddd [ў] LT';
        },
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return '[У мінулую] dddd [ў] LT';
                case 1:
                case 2:
                case 4:
                    return '[У мінулы] dddd [ў] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'праз %s',
        past : '%s таму',
        s : 'некалькі секунд',
        m : relativeTimeWithPlural,
        mm : relativeTimeWithPlural,
        h : relativeTimeWithPlural,
        hh : relativeTimeWithPlural,
        d : 'дзень',
        dd : relativeTimeWithPlural,
        M : 'месяц',
        MM : relativeTimeWithPlural,
        y : 'год',
        yy : relativeTimeWithPlural
    },
    meridiemParse: /ночы|раніцы|дня|вечара/,
    isPM : function (input) {
        return /^(дня|вечара)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ночы';
        } else if (hour < 12) {
            return 'раніцы';
        } else if (hour < 17) {
            return 'дня';
        } else {
            return 'вечара';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
            case 'w':
            case 'W':
                return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
            case 'D':
                return number + '-га';
            default:
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return be;

})));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Bulgarian [bg]
//! author : Krasen Borisov : https://github.com/kraz

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var bg = moment.defineLocale('bg', {
    months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
    monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
    weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
    weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
    weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'D.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY H:mm',
        LLLL : 'dddd, D MMMM YYYY H:mm'
    },
    calendar : {
        sameDay : '[Днес в] LT',
        nextDay : '[Утре в] LT',
        nextWeek : 'dddd [в] LT',
        lastDay : '[Вчера в] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 0:
                case 3:
                case 6:
                    return '[В изминалата] dddd [в] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[В изминалия] dddd [в] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'след %s',
        past : 'преди %s',
        s : 'няколко секунди',
        m : 'минута',
        mm : '%d минути',
        h : 'час',
        hh : '%d часа',
        d : 'ден',
        dd : '%d дни',
        M : 'месец',
        MM : '%d месеца',
        y : 'година',
        yy : '%d години'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
    ordinal : function (number) {
        var lastDigit = number % 10,
            last2Digits = number % 100;
        if (number === 0) {
            return number + '-ев';
        } else if (last2Digits === 0) {
            return number + '-ен';
        } else if (last2Digits > 10 && last2Digits < 20) {
            return number + '-ти';
        } else if (lastDigit === 1) {
            return number + '-ви';
        } else if (lastDigit === 2) {
            return number + '-ри';
        } else if (lastDigit === 7 || lastDigit === 8) {
            return number + '-ми';
        } else {
            return number + '-ти';
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return bg;

})));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Bambara [bm]
//! author : Estelle Comment : https://github.com/estellecomment

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

// Language contact person : Abdoufata Kane : https://github.com/abdoufata

var bm = moment.defineLocale('bm', {
    months : 'Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo'.split('_'),
    monthsShort : 'Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des'.split('_'),
    weekdays : 'Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri'.split('_'),
    weekdaysShort : 'Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib'.split('_'),
    weekdaysMin : 'Ka_Nt_Ta_Ar_Al_Ju_Si'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'MMMM [tile] D [san] YYYY',
        LLL : 'MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
        LLLL : 'dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm'
    },
    calendar : {
        sameDay : '[Bi lɛrɛ] LT',
        nextDay : '[Sini lɛrɛ] LT',
        nextWeek : 'dddd [don lɛrɛ] LT',
        lastDay : '[Kunu lɛrɛ] LT',
        lastWeek : 'dddd [tɛmɛnen lɛrɛ] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s kɔnɔ',
        past : 'a bɛ %s bɔ',
        s : 'sanga dama dama',
        m : 'miniti kelen',
        mm : 'miniti %d',
        h : 'lɛrɛ kelen',
        hh : 'lɛrɛ %d',
        d : 'tile kelen',
        dd : 'tile %d',
        M : 'kalo kelen',
        MM : 'kalo %d',
        y : 'san kelen',
        yy : 'san %d'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return bm;

})));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Bengali [bn]
//! author : Kaushik Gandhi : https://github.com/kaushikgandhi

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '0': '০'
};
var numberMap = {
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9',
    '০': '0'
};

var bn = moment.defineLocale('bn', {
    months : 'জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
    monthsShort : 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
    weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
    weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
    weekdaysMin : 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
    longDateFormat : {
        LT : 'A h:mm সময়',
        LTS : 'A h:mm:ss সময়',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm সময়',
        LLLL : 'dddd, D MMMM YYYY, A h:mm সময়'
    },
    calendar : {
        sameDay : '[আজ] LT',
        nextDay : '[আগামীকাল] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[গতকাল] LT',
        lastWeek : '[গত] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s পরে',
        past : '%s আগে',
        s : 'কয়েক সেকেন্ড',
        m : 'এক মিনিট',
        mm : '%d মিনিট',
        h : 'এক ঘন্টা',
        hh : '%d ঘন্টা',
        d : 'এক দিন',
        dd : '%d দিন',
        M : 'এক মাস',
        MM : '%d মাস',
        y : 'এক বছর',
        yy : '%d বছর'
    },
    preparse: function (string) {
        return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if ((meridiem === 'রাত' && hour >= 4) ||
                (meridiem === 'দুপুর' && hour < 5) ||
                meridiem === 'বিকাল') {
            return hour + 12;
        } else {
            return hour;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'রাত';
        } else if (hour < 10) {
            return 'সকাল';
        } else if (hour < 17) {
            return 'দুপুর';
        } else if (hour < 20) {
            return 'বিকাল';
        } else {
            return 'রাত';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return bn;

})));


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tibetan [bo]
//! author : Thupten N. Chakrishar : https://github.com/vajradog

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '༡',
    '2': '༢',
    '3': '༣',
    '4': '༤',
    '5': '༥',
    '6': '༦',
    '7': '༧',
    '8': '༨',
    '9': '༩',
    '0': '༠'
};
var numberMap = {
    '༡': '1',
    '༢': '2',
    '༣': '3',
    '༤': '4',
    '༥': '5',
    '༦': '6',
    '༧': '7',
    '༨': '8',
    '༩': '9',
    '༠': '0'
};

var bo = moment.defineLocale('bo', {
    months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
    monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
    weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
    weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
    weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
    longDateFormat : {
        LT : 'A h:mm',
        LTS : 'A h:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm',
        LLLL : 'dddd, D MMMM YYYY, A h:mm'
    },
    calendar : {
        sameDay : '[དི་རིང] LT',
        nextDay : '[སང་ཉིན] LT',
        nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
        lastDay : '[ཁ་སང] LT',
        lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s ལ་',
        past : '%s སྔན་ལ',
        s : 'ལམ་སང',
        m : 'སྐར་མ་གཅིག',
        mm : '%d སྐར་མ',
        h : 'ཆུ་ཚོད་གཅིག',
        hh : '%d ཆུ་ཚོད',
        d : 'ཉིན་གཅིག',
        dd : '%d ཉིན་',
        M : 'ཟླ་བ་གཅིག',
        MM : '%d ཟླ་བ',
        y : 'ལོ་གཅིག',
        yy : '%d ལོ'
    },
    preparse: function (string) {
        return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if ((meridiem === 'མཚན་མོ' && hour >= 4) ||
                (meridiem === 'ཉིན་གུང' && hour < 5) ||
                meridiem === 'དགོང་དག') {
            return hour + 12;
        } else {
            return hour;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'མཚན་མོ';
        } else if (hour < 10) {
            return 'ཞོགས་ཀས';
        } else if (hour < 17) {
            return 'ཉིན་གུང';
        } else if (hour < 20) {
            return 'དགོང་དག';
        } else {
            return 'མཚན་མོ';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return bo;

})));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Breton [br]
//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function relativeTimeWithMutation(number, withoutSuffix, key) {
    var format = {
        'mm': 'munutenn',
        'MM': 'miz',
        'dd': 'devezh'
    };
    return number + ' ' + mutation(format[key], number);
}
function specialMutationForYears(number) {
    switch (lastNumber(number)) {
        case 1:
        case 3:
        case 4:
        case 5:
        case 9:
            return number + ' bloaz';
        default:
            return number + ' vloaz';
    }
}
function lastNumber(number) {
    if (number > 9) {
        return lastNumber(number % 10);
    }
    return number;
}
function mutation(text, number) {
    if (number === 2) {
        return softMutation(text);
    }
    return text;
}
function softMutation(text) {
    var mutationTable = {
        'm': 'v',
        'b': 'v',
        'd': 'z'
    };
    if (mutationTable[text.charAt(0)] === undefined) {
        return text;
    }
    return mutationTable[text.charAt(0)] + text.substring(1);
}

var br = moment.defineLocale('br', {
    months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
    monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
    weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
    weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
    weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'h[e]mm A',
        LTS : 'h[e]mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D [a viz] MMMM YYYY',
        LLL : 'D [a viz] MMMM YYYY h[e]mm A',
        LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
    },
    calendar : {
        sameDay : '[Hiziv da] LT',
        nextDay : '[Warc\'hoazh da] LT',
        nextWeek : 'dddd [da] LT',
        lastDay : '[Dec\'h da] LT',
        lastWeek : 'dddd [paset da] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'a-benn %s',
        past : '%s \'zo',
        s : 'un nebeud segondennoù',
        m : 'ur vunutenn',
        mm : relativeTimeWithMutation,
        h : 'un eur',
        hh : '%d eur',
        d : 'un devezh',
        dd : relativeTimeWithMutation,
        M : 'ur miz',
        MM : relativeTimeWithMutation,
        y : 'ur bloaz',
        yy : specialMutationForYears
    },
    dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
    ordinal : function (number) {
        var output = (number === 1) ? 'añ' : 'vet';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return br;

})));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Bosnian [bs]
//! author : Nedim Cholich : https://github.com/frontyard
//! based on (hr) translation by Bojan Marković

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function translate(number, withoutSuffix, key) {
    var result = number + ' ';
    switch (key) {
        case 'm':
            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
        case 'mm':
            if (number === 1) {
                result += 'minuta';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'minute';
            } else {
                result += 'minuta';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'jedan sat' : 'jednog sata';
        case 'hh':
            if (number === 1) {
                result += 'sat';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'sata';
            } else {
                result += 'sati';
            }
            return result;
        case 'dd':
            if (number === 1) {
                result += 'dan';
            } else {
                result += 'dana';
            }
            return result;
        case 'MM':
            if (number === 1) {
                result += 'mjesec';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'mjeseca';
            } else {
                result += 'mjeseci';
            }
            return result;
        case 'yy':
            if (number === 1) {
                result += 'godina';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'godine';
            } else {
                result += 'godina';
            }
            return result;
    }
}

var bs = moment.defineLocale('bs', {
    months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
    monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd, D. MMMM YYYY H:mm'
    },
    calendar : {
        sameDay  : '[danas u] LT',
        nextDay  : '[sutra u] LT',
        nextWeek : function () {
            switch (this.day()) {
                case 0:
                    return '[u] [nedjelju] [u] LT';
                case 3:
                    return '[u] [srijedu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
            }
        },
        lastDay  : '[jučer u] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 0:
                case 3:
                    return '[prošlu] dddd [u] LT';
                case 6:
                    return '[prošle] [subote] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prošli] dddd [u] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'za %s',
        past   : 'prije %s',
        s      : 'par sekundi',
        m      : translate,
        mm     : translate,
        h      : translate,
        hh     : translate,
        d      : 'dan',
        dd     : translate,
        M      : 'mjesec',
        MM     : translate,
        y      : 'godinu',
        yy     : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return bs;

})));


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Catalan [ca]
//! author : Juan G. Hurtado : https://github.com/juanghurtado

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ca = moment.defineLocale('ca', {
    months : {
        standalone: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
        format: 'de gener_de febrer_de març_d\'abril_de maig_de juny_de juliol_d\'agost_de setembre_d\'octubre_de novembre_de desembre'.split('_'),
        isFormat: /D[oD]?(\s)+MMMM/
    },
    monthsShort : 'gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.'.split('_'),
    monthsParseExact : true,
    weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
    weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
    weekdaysMin : 'dg_dl_dt_dc_dj_dv_ds'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM [de] YYYY',
        ll : 'D MMM YYYY',
        LLL : 'D MMMM [de] YYYY [a les] H:mm',
        lll : 'D MMM YYYY, H:mm',
        LLLL : 'dddd D MMMM [de] YYYY [a les] H:mm',
        llll : 'ddd D MMM YYYY, H:mm'
    },
    calendar : {
        sameDay : function () {
            return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        nextDay : function () {
            return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        lastDay : function () {
            return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        lastWeek : function () {
            return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'd\'aquí %s',
        past : 'fa %s',
        s : 'uns segons',
        m : 'un minut',
        mm : '%d minuts',
        h : 'una hora',
        hh : '%d hores',
        d : 'un dia',
        dd : '%d dies',
        M : 'un mes',
        MM : '%d mesos',
        y : 'un any',
        yy : '%d anys'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
    ordinal : function (number, period) {
        var output = (number === 1) ? 'r' :
            (number === 2) ? 'n' :
            (number === 3) ? 'r' :
            (number === 4) ? 't' : 'è';
        if (period === 'w' || period === 'W') {
            output = 'a';
        }
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return ca;

})));


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Czech [cs]
//! author : petrbela : https://github.com/petrbela

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_');
var monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
function plural(n) {
    return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
}
function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':  // a few seconds / in a few seconds / a few seconds ago
            return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
        case 'm':  // a minute / in a minute / a minute ago
            return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'minuty' : 'minut');
            } else {
                return result + 'minutami';
            }
            break;
        case 'h':  // an hour / in an hour / an hour ago
            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
        case 'hh': // 9 hours / in 9 hours / 9 hours ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'hodiny' : 'hodin');
            } else {
                return result + 'hodinami';
            }
            break;
        case 'd':  // a day / in a day / a day ago
            return (withoutSuffix || isFuture) ? 'den' : 'dnem';
        case 'dd': // 9 days / in 9 days / 9 days ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'dny' : 'dní');
            } else {
                return result + 'dny';
            }
            break;
        case 'M':  // a month / in a month / a month ago
            return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
        case 'MM': // 9 months / in 9 months / 9 months ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'měsíce' : 'měsíců');
            } else {
                return result + 'měsíci';
            }
            break;
        case 'y':  // a year / in a year / a year ago
            return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
        case 'yy': // 9 years / in 9 years / 9 years ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'roky' : 'let');
            } else {
                return result + 'lety';
            }
            break;
    }
}

var cs = moment.defineLocale('cs', {
    months : months,
    monthsShort : monthsShort,
    monthsParse : (function (months, monthsShort) {
        var i, _monthsParse = [];
        for (i = 0; i < 12; i++) {
            // use custom parser to solve problem with July (červenec)
            _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
        }
        return _monthsParse;
    }(months, monthsShort)),
    shortMonthsParse : (function (monthsShort) {
        var i, _shortMonthsParse = [];
        for (i = 0; i < 12; i++) {
            _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
        }
        return _shortMonthsParse;
    }(monthsShort)),
    longMonthsParse : (function (months) {
        var i, _longMonthsParse = [];
        for (i = 0; i < 12; i++) {
            _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
        }
        return _longMonthsParse;
    }(months)),
    weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
    weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
    weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
    longDateFormat : {
        LT: 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd D. MMMM YYYY H:mm',
        l : 'D. M. YYYY'
    },
    calendar : {
        sameDay: '[dnes v] LT',
        nextDay: '[zítra v] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[v neděli v] LT';
                case 1:
                case 2:
                    return '[v] dddd [v] LT';
                case 3:
                    return '[ve středu v] LT';
                case 4:
                    return '[ve čtvrtek v] LT';
                case 5:
                    return '[v pátek v] LT';
                case 6:
                    return '[v sobotu v] LT';
            }
        },
        lastDay: '[včera v] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[minulou neděli v] LT';
                case 1:
                case 2:
                    return '[minulé] dddd [v] LT';
                case 3:
                    return '[minulou středu v] LT';
                case 4:
                case 5:
                    return '[minulý] dddd [v] LT';
                case 6:
                    return '[minulou sobotu v] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'za %s',
        past : 'před %s',
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    dayOfMonthOrdinalParse : /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return cs;

})));


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chuvash [cv]
//! author : Anatoly Mironov : https://github.com/mirontoli

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var cv = moment.defineLocale('cv', {
    months : 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
    monthsShort : 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
    weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
    weekdaysShort : 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
    weekdaysMin : 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD-MM-YYYY',
        LL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
        LLL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
        LLLL : 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
    },
    calendar : {
        sameDay: '[Паян] LT [сехетре]',
        nextDay: '[Ыран] LT [сехетре]',
        lastDay: '[Ӗнер] LT [сехетре]',
        nextWeek: '[Ҫитес] dddd LT [сехетре]',
        lastWeek: '[Иртнӗ] dddd LT [сехетре]',
        sameElse: 'L'
    },
    relativeTime : {
        future : function (output) {
            var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
            return output + affix;
        },
        past : '%s каялла',
        s : 'пӗр-ик ҫеккунт',
        m : 'пӗр минут',
        mm : '%d минут',
        h : 'пӗр сехет',
        hh : '%d сехет',
        d : 'пӗр кун',
        dd : '%d кун',
        M : 'пӗр уйӑх',
        MM : '%d уйӑх',
        y : 'пӗр ҫул',
        yy : '%d ҫул'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
    ordinal : '%d-мӗш',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return cv;

})));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Welsh [cy]
//! author : Robert Allen : https://github.com/robgallen
//! author : https://github.com/ryangreaves

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var cy = moment.defineLocale('cy', {
    months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
    monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
    weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
    weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
    weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
    weekdaysParseExact : true,
    // time formats are the same as en-gb
    longDateFormat: {
        LT: 'HH:mm',
        LTS : 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Heddiw am] LT',
        nextDay: '[Yfory am] LT',
        nextWeek: 'dddd [am] LT',
        lastDay: '[Ddoe am] LT',
        lastWeek: 'dddd [diwethaf am] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'mewn %s',
        past: '%s yn ôl',
        s: 'ychydig eiliadau',
        m: 'munud',
        mm: '%d munud',
        h: 'awr',
        hh: '%d awr',
        d: 'diwrnod',
        dd: '%d diwrnod',
        M: 'mis',
        MM: '%d mis',
        y: 'blwyddyn',
        yy: '%d flynedd'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
    // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
    ordinal: function (number) {
        var b = number,
            output = '',
            lookup = [
                '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
                'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
            ];
        if (b > 20) {
            if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
                output = 'fed'; // not 30ain, 70ain or 90ain
            } else {
                output = 'ain';
            }
        } else if (b > 0) {
            output = lookup[b];
        }
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return cy;

})));


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Danish [da]
//! author : Ulrik Nielsen : https://github.com/mrbase

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var da = moment.defineLocale('da', {
    months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
    weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
    weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
    weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY HH:mm',
        LLLL : 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
    },
    calendar : {
        sameDay : '[i dag kl.] LT',
        nextDay : '[i morgen kl.] LT',
        nextWeek : 'på dddd [kl.] LT',
        lastDay : '[i går kl.] LT',
        lastWeek : '[i] dddd[s kl.] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'om %s',
        past : '%s siden',
        s : 'få sekunder',
        m : 'et minut',
        mm : '%d minutter',
        h : 'en time',
        hh : '%d timer',
        d : 'en dag',
        dd : '%d dage',
        M : 'en måned',
        MM : '%d måneder',
        y : 'et år',
        yy : '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return da;

})));


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : German (Austria) [de-at]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Martin Groller : https://github.com/MadMG
//! author : Mikolaj Dadela : https://github.com/mik01aj

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [number + ' Tage', number + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [number + ' Monate', number + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

var deAt = moment.defineLocale('de-at', {
    months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort : 'Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY HH:mm',
        LLLL : 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime : {
        future : 'in %s',
        past : 'vor %s',
        s : 'ein paar Sekunden',
        m : processRelativeTime,
        mm : '%d Minuten',
        h : processRelativeTime,
        hh : '%d Stunden',
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return deAt;

})));


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : German (Switzerland) [de-ch]
//! author : sschueller : https://github.com/sschueller

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


// based on: https://www.bk.admin.ch/dokumentation/sprachen/04915/05016/index.html?lang=de#

function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [number + ' Tage', number + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [number + ' Monate', number + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

var deCh = moment.defineLocale('de-ch', {
    months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort : 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY HH.mm',
        LLLL : 'dddd, D. MMMM YYYY HH.mm'
    },
    calendar : {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime : {
        future : 'in %s',
        past : 'vor %s',
        s : 'ein paar Sekunden',
        m : processRelativeTime,
        mm : '%d Minuten',
        h : processRelativeTime,
        hh : '%d Stunden',
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return deCh;

})));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : German [de]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [number + ' Tage', number + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [number + ' Monate', number + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

var de = moment.defineLocale('de', {
    months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort : 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY HH:mm',
        LLLL : 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime : {
        future : 'in %s',
        past : 'vor %s',
        s : 'ein paar Sekunden',
        m : processRelativeTime,
        mm : '%d Minuten',
        h : processRelativeTime,
        hh : '%d Stunden',
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return de;

})));


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Maldivian [dv]
//! author : Jawish Hameed : https://github.com/jawish

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = [
    'ޖެނުއަރީ',
    'ފެބްރުއަރީ',
    'މާރިޗު',
    'އޭޕްރީލު',
    'މޭ',
    'ޖޫން',
    'ޖުލައި',
    'އޯގަސްޓު',
    'ސެޕްޓެމްބަރު',
    'އޮކްޓޯބަރު',
    'ނޮވެމްބަރު',
    'ޑިސެމްބަރު'
];
var weekdays = [
    'އާދިއްތަ',
    'ހޯމަ',
    'އަންގާރަ',
    'ބުދަ',
    'ބުރާސްފަތި',
    'ހުކުރު',
    'ހޮނިހިރު'
];

var dv = moment.defineLocale('dv', {
    months : months,
    monthsShort : months,
    weekdays : weekdays,
    weekdaysShort : weekdays,
    weekdaysMin : 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
    longDateFormat : {

        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'D/M/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /މކ|މފ/,
    isPM : function (input) {
        return 'މފ' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'މކ';
        } else {
            return 'މފ';
        }
    },
    calendar : {
        sameDay : '[މިއަދު] LT',
        nextDay : '[މާދަމާ] LT',
        nextWeek : 'dddd LT',
        lastDay : '[އިއްޔެ] LT',
        lastWeek : '[ފާއިތުވި] dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'ތެރޭގައި %s',
        past : 'ކުރިން %s',
        s : 'ސިކުންތުކޮޅެއް',
        m : 'މިނިޓެއް',
        mm : 'މިނިޓު %d',
        h : 'ގަޑިއިރެއް',
        hh : 'ގަޑިއިރު %d',
        d : 'ދުވަހެއް',
        dd : 'ދުވަސް %d',
        M : 'މަހެއް',
        MM : 'މަސް %d',
        y : 'އަހަރެއް',
        yy : 'އަހަރު %d'
    },
    preparse: function (string) {
        return string.replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/,/g, '،');
    },
    week : {
        dow : 7,  // Sunday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return dv;

})));


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Greek [el]
//! author : Aggelos Karalias : https://github.com/mehiel

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}


var el = moment.defineLocale('el', {
    monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
    monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
    months : function (momentToFormat, format) {
        if (!momentToFormat) {
            return this._monthsNominativeEl;
        } else if (typeof format === 'string' && /D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
            return this._monthsGenitiveEl[momentToFormat.month()];
        } else {
            return this._monthsNominativeEl[momentToFormat.month()];
        }
    },
    monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
    weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
    weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
    weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'μμ' : 'ΜΜ';
        } else {
            return isLower ? 'πμ' : 'ΠΜ';
        }
    },
    isPM : function (input) {
        return ((input + '').toLowerCase()[0] === 'μ');
    },
    meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendarEl : {
        sameDay : '[Σήμερα {}] LT',
        nextDay : '[Αύριο {}] LT',
        nextWeek : 'dddd [{}] LT',
        lastDay : '[Χθες {}] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 6:
                    return '[το προηγούμενο] dddd [{}] LT';
                default:
                    return '[την προηγούμενη] dddd [{}] LT';
            }
        },
        sameElse : 'L'
    },
    calendar : function (key, mom) {
        var output = this._calendarEl[key],
            hours = mom && mom.hours();
        if (isFunction(output)) {
            output = output.apply(mom);
        }
        return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
    },
    relativeTime : {
        future : 'σε %s',
        past : '%s πριν',
        s : 'λίγα δευτερόλεπτα',
        m : 'ένα λεπτό',
        mm : '%d λεπτά',
        h : 'μία ώρα',
        hh : '%d ώρες',
        d : 'μία μέρα',
        dd : '%d μέρες',
        M : 'ένας μήνας',
        MM : '%d μήνες',
        y : 'ένας χρόνος',
        yy : '%d χρόνια'
    },
    dayOfMonthOrdinalParse: /\d{1,2}η/,
    ordinal: '%dη',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4st is the first week of the year.
    }
});

return el;

})));


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (Australia) [en-au]
//! author : Jared Morse : https://github.com/jarcoal

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enAu = moment.defineLocale('en-au', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return enAu;

})));


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (Canada) [en-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enCa = moment.defineLocale('en-ca', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'YYYY-MM-DD',
        LL : 'MMMM D, YYYY',
        LLL : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

return enCa;

})));


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (United Kingdom) [en-gb]
//! author : Chris Gedrim : https://github.com/chrisgedrim

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enGb = moment.defineLocale('en-gb', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return enGb;

})));


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (Ireland) [en-ie]
//! author : Chris Cartlidge : https://github.com/chriscartlidge

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enIe = moment.defineLocale('en-ie', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD-MM-YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return enIe;

})));


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (New Zealand) [en-nz]
//! author : Luke McGregor : https://github.com/lukemcgregor

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enNz = moment.defineLocale('en-nz', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return enNz;

})));


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Esperanto [eo]
//! author : Colin Dean : https://github.com/colindean
//! author : Mia Nordentoft Imperatori : https://github.com/miestasmia
//! comment : miestasmia corrected the translation by colindean

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var eo = moment.defineLocale('eo', {
    months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
    weekdays : 'dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato'.split('_'),
    weekdaysShort : 'dim_lun_mard_merk_ĵaŭ_ven_sab'.split('_'),
    weekdaysMin : 'di_lu_ma_me_ĵa_ve_sa'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'D[-a de] MMMM, YYYY',
        LLL : 'D[-a de] MMMM, YYYY HH:mm',
        LLLL : 'dddd, [la] D[-a de] MMMM, YYYY HH:mm'
    },
    meridiemParse: /[ap]\.t\.m/i,
    isPM: function (input) {
        return input.charAt(0).toLowerCase() === 'p';
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'p.t.m.' : 'P.T.M.';
        } else {
            return isLower ? 'a.t.m.' : 'A.T.M.';
        }
    },
    calendar : {
        sameDay : '[Hodiaŭ je] LT',
        nextDay : '[Morgaŭ je] LT',
        nextWeek : 'dddd [je] LT',
        lastDay : '[Hieraŭ je] LT',
        lastWeek : '[pasinta] dddd [je] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'post %s',
        past : 'antaŭ %s',
        s : 'sekundoj',
        m : 'minuto',
        mm : '%d minutoj',
        h : 'horo',
        hh : '%d horoj',
        d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
        dd : '%d tagoj',
        M : 'monato',
        MM : '%d monatoj',
        y : 'jaro',
        yy : '%d jaroj'
    },
    dayOfMonthOrdinalParse: /\d{1,2}a/,
    ordinal : '%da',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return eo;

})));


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Spanish (Dominican Republic) [es-do]

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

var monthsParse = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
var monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

var esDo = moment.defineLocale('es-do', {
    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortDot;
        } else if (/-MMM-/.test(format)) {
            return monthsShort[m.month()];
        } else {
            return monthsShortDot[m.month()];
        }
    },
    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY h:mm A',
        LLLL : 'dddd, D [de] MMMM [de] YYYY h:mm A'
    },
    calendar : {
        sameDay : function () {
            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextDay : function () {
            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastDay : function () {
            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastWeek : function () {
            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'en %s',
        past : 'hace %s',
        s : 'unos segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'una hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un año',
        yy : '%d años'
    },
    dayOfMonthOrdinalParse : /\d{1,2}º/,
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return esDo;

})));


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Spanish (United States) [es-us]
//! author : bustta : https://github.com/bustta

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

var esUs = moment.defineLocale('es-us', {
    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortDot;
        } else if (/-MMM-/.test(format)) {
            return monthsShort[m.month()];
        } else {
            return monthsShortDot[m.month()];
        }
    },
    monthsParseExact : true,
    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'MM/DD/YYYY',
        LL : 'MMMM [de] D [de] YYYY',
        LLL : 'MMMM [de] D [de] YYYY H:mm',
        LLLL : 'dddd, MMMM [de] D [de] YYYY H:mm'
    },
    calendar : {
        sameDay : function () {
            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextDay : function () {
            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastDay : function () {
            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastWeek : function () {
            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'en %s',
        past : 'hace %s',
        s : 'unos segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'una hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un año',
        yy : '%d años'
    },
    dayOfMonthOrdinalParse : /\d{1,2}º/,
    ordinal : '%dº',
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return esUs;

})));


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Spanish [es]
//! author : Julio Napurí : https://github.com/julionc

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

var monthsParse = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
var monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

var es = moment.defineLocale('es', {
    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortDot;
        } else if (/-MMM-/.test(format)) {
            return monthsShort[m.month()];
        } else {
            return monthsShortDot[m.month()];
        }
    },
    monthsRegex : monthsRegex,
    monthsShortRegex : monthsRegex,
    monthsStrictRegex : /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    monthsShortStrictRegex : /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    monthsParse : monthsParse,
    longMonthsParse : monthsParse,
    shortMonthsParse : monthsParse,
    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY H:mm',
        LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
    },
    calendar : {
        sameDay : function () {
            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextDay : function () {
            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastDay : function () {
            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastWeek : function () {
            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'en %s',
        past : 'hace %s',
        s : 'unos segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'una hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un año',
        yy : '%d años'
    },
    dayOfMonthOrdinalParse : /\d{1,2}º/,
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return es;

})));


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Estonian [et]
//! author : Henry Kehlmann : https://github.com/madhenry
//! improvements : Illimar Tambek : https://github.com/ragulka

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
        'm' : ['ühe minuti', 'üks minut'],
        'mm': [number + ' minuti', number + ' minutit'],
        'h' : ['ühe tunni', 'tund aega', 'üks tund'],
        'hh': [number + ' tunni', number + ' tundi'],
        'd' : ['ühe päeva', 'üks päev'],
        'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
        'MM': [number + ' kuu', number + ' kuud'],
        'y' : ['ühe aasta', 'aasta', 'üks aasta'],
        'yy': [number + ' aasta', number + ' aastat']
    };
    if (withoutSuffix) {
        return format[key][2] ? format[key][2] : format[key][1];
    }
    return isFuture ? format[key][0] : format[key][1];
}

var et = moment.defineLocale('et', {
    months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
    monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
    weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
    weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
    weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
    longDateFormat : {
        LT   : 'H:mm',
        LTS : 'H:mm:ss',
        L    : 'DD.MM.YYYY',
        LL   : 'D. MMMM YYYY',
        LLL  : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd, D. MMMM YYYY H:mm'
    },
    calendar : {
        sameDay  : '[Täna,] LT',
        nextDay  : '[Homme,] LT',
        nextWeek : '[Järgmine] dddd LT',
        lastDay  : '[Eile,] LT',
        lastWeek : '[Eelmine] dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s pärast',
        past   : '%s tagasi',
        s      : processRelativeTime,
        m      : processRelativeTime,
        mm     : processRelativeTime,
        h      : processRelativeTime,
        hh     : processRelativeTime,
        d      : processRelativeTime,
        dd     : '%d päeva',
        M      : processRelativeTime,
        MM     : processRelativeTime,
        y      : processRelativeTime,
        yy     : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return et;

})));


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Basque [eu]
//! author : Eneko Illarramendi : https://github.com/eillarra

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var eu = moment.defineLocale('eu', {
    months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
    monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
    monthsParseExact : true,
    weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
    weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
    weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'YYYY[ko] MMMM[ren] D[a]',
        LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
        LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
        l : 'YYYY-M-D',
        ll : 'YYYY[ko] MMM D[a]',
        lll : 'YYYY[ko] MMM D[a] HH:mm',
        llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
    },
    calendar : {
        sameDay : '[gaur] LT[etan]',
        nextDay : '[bihar] LT[etan]',
        nextWeek : 'dddd LT[etan]',
        lastDay : '[atzo] LT[etan]',
        lastWeek : '[aurreko] dddd LT[etan]',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s barru',
        past : 'duela %s',
        s : 'segundo batzuk',
        m : 'minutu bat',
        mm : '%d minutu',
        h : 'ordu bat',
        hh : '%d ordu',
        d : 'egun bat',
        dd : '%d egun',
        M : 'hilabete bat',
        MM : '%d hilabete',
        y : 'urte bat',
        yy : '%d urte'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return eu;

})));


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Persian [fa]
//! author : Ebrahim Byagowi : https://github.com/ebraminio

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
    '0': '۰'
};
var numberMap = {
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
    '۰': '0'
};

var fa = moment.defineLocale('fa', {
    months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
    weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
    weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    meridiemParse: /قبل از ظهر|بعد از ظهر/,
    isPM: function (input) {
        return /بعد از ظهر/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'قبل از ظهر';
        } else {
            return 'بعد از ظهر';
        }
    },
    calendar : {
        sameDay : '[امروز ساعت] LT',
        nextDay : '[فردا ساعت] LT',
        nextWeek : 'dddd [ساعت] LT',
        lastDay : '[دیروز ساعت] LT',
        lastWeek : 'dddd [پیش] [ساعت] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'در %s',
        past : '%s پیش',
        s : 'چند ثانیه',
        m : 'یک دقیقه',
        mm : '%d دقیقه',
        h : 'یک ساعت',
        hh : '%d ساعت',
        d : 'یک روز',
        dd : '%d روز',
        M : 'یک ماه',
        MM : '%d ماه',
        y : 'یک سال',
        yy : '%d سال'
    },
    preparse: function (string) {
        return string.replace(/[۰-۹]/g, function (match) {
            return numberMap[match];
        }).replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        }).replace(/,/g, '،');
    },
    dayOfMonthOrdinalParse: /\d{1,2}م/,
    ordinal : '%dم',
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12 // The week that contains Jan 1st is the first week of the year.
    }
});

return fa;

})));


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Finnish [fi]
//! author : Tarmo Aidantausta : https://github.com/bleadof

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' ');
var numbersFuture = [
        'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
        numbersPast[7], numbersPast[8], numbersPast[9]
    ];
function translate(number, withoutSuffix, key, isFuture) {
    var result = '';
    switch (key) {
        case 's':
            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
        case 'm':
            return isFuture ? 'minuutin' : 'minuutti';
        case 'mm':
            result = isFuture ? 'minuutin' : 'minuuttia';
            break;
        case 'h':
            return isFuture ? 'tunnin' : 'tunti';
        case 'hh':
            result = isFuture ? 'tunnin' : 'tuntia';
            break;
        case 'd':
            return isFuture ? 'päivän' : 'päivä';
        case 'dd':
            result = isFuture ? 'päivän' : 'päivää';
            break;
        case 'M':
            return isFuture ? 'kuukauden' : 'kuukausi';
        case 'MM':
            result = isFuture ? 'kuukauden' : 'kuukautta';
            break;
        case 'y':
            return isFuture ? 'vuoden' : 'vuosi';
        case 'yy':
            result = isFuture ? 'vuoden' : 'vuotta';
            break;
    }
    result = verbalNumber(number, isFuture) + ' ' + result;
    return result;
}
function verbalNumber(number, isFuture) {
    return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
}

var fi = moment.defineLocale('fi', {
    months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
    monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
    weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
    weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
    weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD.MM.YYYY',
        LL : 'Do MMMM[ta] YYYY',
        LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
        LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
        l : 'D.M.YYYY',
        ll : 'Do MMM YYYY',
        lll : 'Do MMM YYYY, [klo] HH.mm',
        llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
    },
    calendar : {
        sameDay : '[tänään] [klo] LT',
        nextDay : '[huomenna] [klo] LT',
        nextWeek : 'dddd [klo] LT',
        lastDay : '[eilen] [klo] LT',
        lastWeek : '[viime] dddd[na] [klo] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s päästä',
        past : '%s sitten',
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return fi;

})));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Faroese [fo]
//! author : Ragnar Johannesen : https://github.com/ragnar123

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var fo = moment.defineLocale('fo', {
    months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
    weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
    weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
    weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D. MMMM, YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Í dag kl.] LT',
        nextDay : '[Í morgin kl.] LT',
        nextWeek : 'dddd [kl.] LT',
        lastDay : '[Í gjár kl.] LT',
        lastWeek : '[síðstu] dddd [kl] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'um %s',
        past : '%s síðani',
        s : 'fá sekund',
        m : 'ein minutt',
        mm : '%d minuttir',
        h : 'ein tími',
        hh : '%d tímar',
        d : 'ein dagur',
        dd : '%d dagar',
        M : 'ein mánaði',
        MM : '%d mánaðir',
        y : 'eitt ár',
        yy : '%d ár'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return fo;

})));


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : French (Canada) [fr-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var frCa = moment.defineLocale('fr-ca', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal : function (number, period) {
        switch (period) {
            // Words with masculine grammatical gender: mois, trimestre, jour
            default:
            case 'M':
            case 'Q':
            case 'D':
            case 'DDD':
            case 'd':
                return number + (number === 1 ? 'er' : 'e');

            // Words with feminine grammatical gender: semaine
            case 'w':
            case 'W':
                return number + (number === 1 ? 're' : 'e');
        }
    }
});

return frCa;

})));


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : French (Switzerland) [fr-ch]
//! author : Gaspard Bucher : https://github.com/gaspard

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var frCh = moment.defineLocale('fr-ch', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal : function (number, period) {
        switch (period) {
            // Words with masculine grammatical gender: mois, trimestre, jour
            default:
            case 'M':
            case 'Q':
            case 'D':
            case 'DDD':
            case 'd':
                return number + (number === 1 ? 'er' : 'e');

            // Words with feminine grammatical gender: semaine
            case 'w':
            case 'W':
                return number + (number === 1 ? 're' : 'e');
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return frCh;

})));


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : French [fr]
//! author : John Fischer : https://github.com/jfroffice

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var fr = moment.defineLocale('fr', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal : function (number, period) {
        switch (period) {
            // TODO: Return 'e' when day of month > 1. Move this case inside
            // block for masculine words below.
            // See https://github.com/moment/moment/issues/3375
            case 'D':
                return number + (number === 1 ? 'er' : '');

            // Words with masculine grammatical gender: mois, trimestre, jour
            default:
            case 'M':
            case 'Q':
            case 'DDD':
            case 'd':
                return number + (number === 1 ? 'er' : 'e');

            // Words with feminine grammatical gender: semaine
            case 'w':
            case 'W':
                return number + (number === 1 ? 're' : 'e');
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return fr;

})));


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Frisian [fy]
//! author : Robin van der Vliet : https://github.com/robin0van0der0v

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_');
var monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

var fy = moment.defineLocale('fy', {
    months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortWithDots;
        } else if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[m.month()];
        } else {
            return monthsShortWithDots[m.month()];
        }
    },
    monthsParseExact : true,
    weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
    weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
    weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD-MM-YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[hjoed om] LT',
        nextDay: '[moarn om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[juster om] LT',
        lastWeek: '[ôfrûne] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'oer %s',
        past : '%s lyn',
        s : 'in pear sekonden',
        m : 'ien minút',
        mm : '%d minuten',
        h : 'ien oere',
        hh : '%d oeren',
        d : 'ien dei',
        dd : '%d dagen',
        M : 'ien moanne',
        MM : '%d moannen',
        y : 'ien jier',
        yy : '%d jierren'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal : function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return fy;

})));


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Scottish Gaelic [gd]
//! author : Jon Ashdown : https://github.com/jonashdown

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = [
    'Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'
];

var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

var gd = moment.defineLocale('gd', {
    months : months,
    monthsShort : monthsShort,
    monthsParseExact : true,
    weekdays : weekdays,
    weekdaysShort : weekdaysShort,
    weekdaysMin : weekdaysMin,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[An-diugh aig] LT',
        nextDay : '[A-màireach aig] LT',
        nextWeek : 'dddd [aig] LT',
        lastDay : '[An-dè aig] LT',
        lastWeek : 'dddd [seo chaidh] [aig] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'ann an %s',
        past : 'bho chionn %s',
        s : 'beagan diogan',
        m : 'mionaid',
        mm : '%d mionaidean',
        h : 'uair',
        hh : '%d uairean',
        d : 'latha',
        dd : '%d latha',
        M : 'mìos',
        MM : '%d mìosan',
        y : 'bliadhna',
        yy : '%d bliadhna'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(d|na|mh)/,
    ordinal : function (number) {
        var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return gd;

})));


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Galician [gl]
//! author : Juan G. Hurtado : https://github.com/juanghurtado

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var gl = moment.defineLocale('gl', {
    months : 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
    monthsShort : 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays : 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
    weekdaysShort : 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
    weekdaysMin : 'do_lu_ma_mé_xo_ve_sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY H:mm',
        LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
    },
    calendar : {
        sameDay : function () {
            return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
        },
        nextDay : function () {
            return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
        },
        lastDay : function () {
            return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
        },
        lastWeek : function () {
            return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : function (str) {
            if (str.indexOf('un') === 0) {
                return 'n' + str;
            }
            return 'en ' + str;
        },
        past : 'hai %s',
        s : 'uns segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'unha hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un ano',
        yy : '%d anos'
    },
    dayOfMonthOrdinalParse : /\d{1,2}º/,
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return gl;

})));


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Konkani Latin script [gom-latn]
//! author : The Discoverer : https://github.com/WikiDiscoverer

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        's': ['thodde secondanim', 'thodde second'],
        'm': ['eka mintan', 'ek minute'],
        'mm': [number + ' mintanim', number + ' mintam'],
        'h': ['eka horan', 'ek hor'],
        'hh': [number + ' horanim', number + ' hor'],
        'd': ['eka disan', 'ek dis'],
        'dd': [number + ' disanim', number + ' dis'],
        'M': ['eka mhoinean', 'ek mhoino'],
        'MM': [number + ' mhoineanim', number + ' mhoine'],
        'y': ['eka vorsan', 'ek voros'],
        'yy': [number + ' vorsanim', number + ' vorsam']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

var gomLatn = moment.defineLocale('gom-latn', {
    months : 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split('_'),
    monthsShort : 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son\'var'.split('_'),
    weekdaysShort : 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
    weekdaysMin : 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'A h:mm [vazta]',
        LTS : 'A h:mm:ss [vazta]',
        L : 'DD-MM-YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY A h:mm [vazta]',
        LLLL : 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
        llll: 'ddd, D MMM YYYY, A h:mm [vazta]'
    },
    calendar : {
        sameDay: '[Aiz] LT',
        nextDay: '[Faleam] LT',
        nextWeek: '[Ieta to] dddd[,] LT',
        lastDay: '[Kal] LT',
        lastWeek: '[Fatlo] dddd[,] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : '%s',
        past : '%s adim',
        s : processRelativeTime,
        m : processRelativeTime,
        mm : processRelativeTime,
        h : processRelativeTime,
        hh : processRelativeTime,
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er)/,
    ordinal : function (number, period) {
        switch (period) {
            // the ordinal 'er' only applies to day of the month
            case 'D':
                return number + 'er';
            default:
            case 'M':
            case 'Q':
            case 'DDD':
            case 'd':
            case 'w':
            case 'W':
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    },
    meridiemParse: /rati|sokalli|donparam|sanje/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'rati') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'sokalli') {
            return hour;
        } else if (meridiem === 'donparam') {
            return hour > 12 ? hour : hour + 12;
        } else if (meridiem === 'sanje') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'rati';
        } else if (hour < 12) {
            return 'sokalli';
        } else if (hour < 16) {
            return 'donparam';
        } else if (hour < 20) {
            return 'sanje';
        } else {
            return 'rati';
        }
    }
});

return gomLatn;

})));


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Gujarati [gu]
//! author : Kaushik Thanki : https://github.com/Kaushik1987

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
        '1': '૧',
        '2': '૨',
        '3': '૩',
        '4': '૪',
        '5': '૫',
        '6': '૬',
        '7': '૭',
        '8': '૮',
        '9': '૯',
        '0': '૦'
    };
var numberMap = {
        '૧': '1',
        '૨': '2',
        '૩': '3',
        '૪': '4',
        '૫': '5',
        '૬': '6',
        '૭': '7',
        '૮': '8',
        '૯': '9',
        '૦': '0'
    };

var gu = moment.defineLocale('gu', {
    months: 'જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર'.split('_'),
    monthsShort: 'જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.'.split('_'),
    monthsParseExact: true,
    weekdays: 'રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર'.split('_'),
    weekdaysShort: 'રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ'.split('_'),
    weekdaysMin: 'ર_સો_મં_બુ_ગુ_શુ_શ'.split('_'),
    longDateFormat: {
        LT: 'A h:mm વાગ્યે',
        LTS: 'A h:mm:ss વાગ્યે',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY, A h:mm વાગ્યે',
        LLLL: 'dddd, D MMMM YYYY, A h:mm વાગ્યે'
    },
    calendar: {
        sameDay: '[આજ] LT',
        nextDay: '[કાલે] LT',
        nextWeek: 'dddd, LT',
        lastDay: '[ગઇકાલે] LT',
        lastWeek: '[પાછલા] dddd, LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s મા',
        past: '%s પેહલા',
        s: 'અમુક પળો',
        m: 'એક મિનિટ',
        mm: '%d મિનિટ',
        h: 'એક કલાક',
        hh: '%d કલાક',
        d: 'એક દિવસ',
        dd: '%d દિવસ',
        M: 'એક મહિનો',
        MM: '%d મહિનો',
        y: 'એક વર્ષ',
        yy: '%d વર્ષ'
    },
    preparse: function (string) {
        return string.replace(/[૧૨૩૪૫૬૭૮૯૦]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    // Gujarati notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Gujarati.
    meridiemParse: /રાત|બપોર|સવાર|સાંજ/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'રાત') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'સવાર') {
            return hour;
        } else if (meridiem === 'બપોર') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'સાંજ') {
            return hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 4) {
            return 'રાત';
        } else if (hour < 10) {
            return 'સવાર';
        } else if (hour < 17) {
            return 'બપોર';
        } else if (hour < 20) {
            return 'સાંજ';
        } else {
            return 'રાત';
        }
    },
    week: {
        dow: 0, // Sunday is the first day of the week.
        doy: 6 // The week that contains Jan 1st is the first week of the year.
    }
});

return gu;

})));


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Hebrew [he]
//! author : Tomer Cohen : https://github.com/tomer
//! author : Moshe Simantov : https://github.com/DevelopmentIL
//! author : Tal Ater : https://github.com/TalAter

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var he = moment.defineLocale('he', {
    months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
    monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
    weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
    weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
    weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [ב]MMMM YYYY',
        LLL : 'D [ב]MMMM YYYY HH:mm',
        LLLL : 'dddd, D [ב]MMMM YYYY HH:mm',
        l : 'D/M/YYYY',
        ll : 'D MMM YYYY',
        lll : 'D MMM YYYY HH:mm',
        llll : 'ddd, D MMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[היום ב־]LT',
        nextDay : '[מחר ב־]LT',
        nextWeek : 'dddd [בשעה] LT',
        lastDay : '[אתמול ב־]LT',
        lastWeek : '[ביום] dddd [האחרון בשעה] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'בעוד %s',
        past : 'לפני %s',
        s : 'מספר שניות',
        m : 'דקה',
        mm : '%d דקות',
        h : 'שעה',
        hh : function (number) {
            if (number === 2) {
                return 'שעתיים';
            }
            return number + ' שעות';
        },
        d : 'יום',
        dd : function (number) {
            if (number === 2) {
                return 'יומיים';
            }
            return number + ' ימים';
        },
        M : 'חודש',
        MM : function (number) {
            if (number === 2) {
                return 'חודשיים';
            }
            return number + ' חודשים';
        },
        y : 'שנה',
        yy : function (number) {
            if (number === 2) {
                return 'שנתיים';
            } else if (number % 10 === 0 && number !== 10) {
                return number + ' שנה';
            }
            return number + ' שנים';
        }
    },
    meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
    isPM : function (input) {
        return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 5) {
            return 'לפנות בוקר';
        } else if (hour < 10) {
            return 'בבוקר';
        } else if (hour < 12) {
            return isLower ? 'לפנה"צ' : 'לפני הצהריים';
        } else if (hour < 18) {
            return isLower ? 'אחה"צ' : 'אחרי הצהריים';
        } else {
            return 'בערב';
        }
    }
});

return he;

})));


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Hindi [hi]
//! author : Mayank Singhal : https://github.com/mayanksinghal

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
};
var numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
};

var hi = moment.defineLocale('hi', {
    months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
    monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
    monthsParseExact: true,
    weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
    weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
    weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
    longDateFormat : {
        LT : 'A h:mm बजे',
        LTS : 'A h:mm:ss बजे',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm बजे',
        LLLL : 'dddd, D MMMM YYYY, A h:mm बजे'
    },
    calendar : {
        sameDay : '[आज] LT',
        nextDay : '[कल] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[कल] LT',
        lastWeek : '[पिछले] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s में',
        past : '%s पहले',
        s : 'कुछ ही क्षण',
        m : 'एक मिनट',
        mm : '%d मिनट',
        h : 'एक घंटा',
        hh : '%d घंटे',
        d : 'एक दिन',
        dd : '%d दिन',
        M : 'एक महीने',
        MM : '%d महीने',
        y : 'एक वर्ष',
        yy : '%d वर्ष'
    },
    preparse: function (string) {
        return string.replace(/[१२३४५६७८९०]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    // Hindi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
    meridiemParse: /रात|सुबह|दोपहर|शाम/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'रात') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'सुबह') {
            return hour;
        } else if (meridiem === 'दोपहर') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'शाम') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'रात';
        } else if (hour < 10) {
            return 'सुबह';
        } else if (hour < 17) {
            return 'दोपहर';
        } else if (hour < 20) {
            return 'शाम';
        } else {
            return 'रात';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return hi;

})));


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Croatian [hr]
//! author : Bojan Marković : https://github.com/bmarkovic

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function translate(number, withoutSuffix, key) {
    var result = number + ' ';
    switch (key) {
        case 'm':
            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
        case 'mm':
            if (number === 1) {
                result += 'minuta';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'minute';
            } else {
                result += 'minuta';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'jedan sat' : 'jednog sata';
        case 'hh':
            if (number === 1) {
                result += 'sat';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'sata';
            } else {
                result += 'sati';
            }
            return result;
        case 'dd':
            if (number === 1) {
                result += 'dan';
            } else {
                result += 'dana';
            }
            return result;
        case 'MM':
            if (number === 1) {
                result += 'mjesec';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'mjeseca';
            } else {
                result += 'mjeseci';
            }
            return result;
        case 'yy':
            if (number === 1) {
                result += 'godina';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'godine';
            } else {
                result += 'godina';
            }
            return result;
    }
}

var hr = moment.defineLocale('hr', {
    months : {
        format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
        standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
    },
    monthsShort : 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
    monthsParseExact: true,
    weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd, D. MMMM YYYY H:mm'
    },
    calendar : {
        sameDay  : '[danas u] LT',
        nextDay  : '[sutra u] LT',
        nextWeek : function () {
            switch (this.day()) {
                case 0:
                    return '[u] [nedjelju] [u] LT';
                case 3:
                    return '[u] [srijedu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
            }
        },
        lastDay  : '[jučer u] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 0:
                case 3:
                    return '[prošlu] dddd [u] LT';
                case 6:
                    return '[prošle] [subote] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prošli] dddd [u] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'za %s',
        past   : 'prije %s',
        s      : 'par sekundi',
        m      : translate,
        mm     : translate,
        h      : translate,
        hh     : translate,
        d      : 'dan',
        dd     : translate,
        M      : 'mjesec',
        MM     : translate,
        y      : 'godinu',
        yy     : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return hr;

})));


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Hungarian [hu]
//! author : Adam Brunner : https://github.com/adambrunner

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
function translate(number, withoutSuffix, key, isFuture) {
    var num = number;
    switch (key) {
        case 's':
            return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
        case 'm':
            return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
        case 'mm':
            return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
        case 'h':
            return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
        case 'hh':
            return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
        case 'd':
            return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
        case 'dd':
            return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
        case 'M':
            return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
        case 'MM':
            return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
        case 'y':
            return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
        case 'yy':
            return num + (isFuture || withoutSuffix ? ' év' : ' éve');
    }
    return '';
}
function week(isFuture) {
    return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
}

var hu = moment.defineLocale('hu', {
    months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
    monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
    weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
    weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
    weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'YYYY.MM.DD.',
        LL : 'YYYY. MMMM D.',
        LLL : 'YYYY. MMMM D. H:mm',
        LLLL : 'YYYY. MMMM D., dddd H:mm'
    },
    meridiemParse: /de|du/i,
    isPM: function (input) {
        return input.charAt(1).toLowerCase() === 'u';
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 12) {
            return isLower === true ? 'de' : 'DE';
        } else {
            return isLower === true ? 'du' : 'DU';
        }
    },
    calendar : {
        sameDay : '[ma] LT[-kor]',
        nextDay : '[holnap] LT[-kor]',
        nextWeek : function () {
            return week.call(this, true);
        },
        lastDay : '[tegnap] LT[-kor]',
        lastWeek : function () {
            return week.call(this, false);
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s múlva',
        past : '%s',
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return hu;

})));


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Armenian [hy-am]
//! author : Armendarabyan : https://github.com/armendarabyan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var hyAm = moment.defineLocale('hy-am', {
    months : {
        format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
        standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
    },
    monthsShort : 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
    weekdays : 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
    weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
    weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY թ.',
        LLL : 'D MMMM YYYY թ., HH:mm',
        LLLL : 'dddd, D MMMM YYYY թ., HH:mm'
    },
    calendar : {
        sameDay: '[այսօր] LT',
        nextDay: '[վաղը] LT',
        lastDay: '[երեկ] LT',
        nextWeek: function () {
            return 'dddd [օրը ժամը] LT';
        },
        lastWeek: function () {
            return '[անցած] dddd [օրը ժամը] LT';
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : '%s հետո',
        past : '%s առաջ',
        s : 'մի քանի վայրկյան',
        m : 'րոպե',
        mm : '%d րոպե',
        h : 'ժամ',
        hh : '%d ժամ',
        d : 'օր',
        dd : '%d օր',
        M : 'ամիս',
        MM : '%d ամիս',
        y : 'տարի',
        yy : '%d տարի'
    },
    meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
    isPM: function (input) {
        return /^(ցերեկվա|երեկոյան)$/.test(input);
    },
    meridiem : function (hour) {
        if (hour < 4) {
            return 'գիշերվա';
        } else if (hour < 12) {
            return 'առավոտվա';
        } else if (hour < 17) {
            return 'ցերեկվա';
        } else {
            return 'երեկոյան';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'DDD':
            case 'w':
            case 'W':
            case 'DDDo':
                if (number === 1) {
                    return number + '-ին';
                }
                return number + '-րդ';
            default:
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return hyAm;

})));


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Indonesian [id]
//! author : Mohammad Satrio Utomo : https://github.com/tyok
//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var id = moment.defineLocale('id', {
    months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
    weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
    weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
    weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY [pukul] HH.mm',
        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|siang|sore|malam/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        } else if (meridiem === 'siang') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'sore' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'siang';
        } else if (hours < 19) {
            return 'sore';
        } else {
            return 'malam';
        }
    },
    calendar : {
        sameDay : '[Hari ini pukul] LT',
        nextDay : '[Besok pukul] LT',
        nextWeek : 'dddd [pukul] LT',
        lastDay : '[Kemarin pukul] LT',
        lastWeek : 'dddd [lalu pukul] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dalam %s',
        past : '%s yang lalu',
        s : 'beberapa detik',
        m : 'semenit',
        mm : '%d menit',
        h : 'sejam',
        hh : '%d jam',
        d : 'sehari',
        dd : '%d hari',
        M : 'sebulan',
        MM : '%d bulan',
        y : 'setahun',
        yy : '%d tahun'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return id;

})));


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Icelandic [is]
//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function plural(n) {
    if (n % 100 === 11) {
        return true;
    } else if (n % 10 === 1) {
        return false;
    }
    return true;
}
function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':
            return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
        case 'm':
            return withoutSuffix ? 'mínúta' : 'mínútu';
        case 'mm':
            if (plural(number)) {
                return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
            } else if (withoutSuffix) {
                return result + 'mínúta';
            }
            return result + 'mínútu';
        case 'hh':
            if (plural(number)) {
                return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
            }
            return result + 'klukkustund';
        case 'd':
            if (withoutSuffix) {
                return 'dagur';
            }
            return isFuture ? 'dag' : 'degi';
        case 'dd':
            if (plural(number)) {
                if (withoutSuffix) {
                    return result + 'dagar';
                }
                return result + (isFuture ? 'daga' : 'dögum');
            } else if (withoutSuffix) {
                return result + 'dagur';
            }
            return result + (isFuture ? 'dag' : 'degi');
        case 'M':
            if (withoutSuffix) {
                return 'mánuður';
            }
            return isFuture ? 'mánuð' : 'mánuði';
        case 'MM':
            if (plural(number)) {
                if (withoutSuffix) {
                    return result + 'mánuðir';
                }
                return result + (isFuture ? 'mánuði' : 'mánuðum');
            } else if (withoutSuffix) {
                return result + 'mánuður';
            }
            return result + (isFuture ? 'mánuð' : 'mánuði');
        case 'y':
            return withoutSuffix || isFuture ? 'ár' : 'ári';
        case 'yy':
            if (plural(number)) {
                return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
            }
            return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
    }
}

var is = moment.defineLocale('is', {
    months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
    monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
    weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
    weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
    weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY [kl.] H:mm',
        LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
    },
    calendar : {
        sameDay : '[í dag kl.] LT',
        nextDay : '[á morgun kl.] LT',
        nextWeek : 'dddd [kl.] LT',
        lastDay : '[í gær kl.] LT',
        lastWeek : '[síðasta] dddd [kl.] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'eftir %s',
        past : 'fyrir %s síðan',
        s : translate,
        m : translate,
        mm : translate,
        h : 'klukkustund',
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return is;

})));


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Italian [it]
//! author : Lorenzo : https://github.com/aliem
//! author: Mattia Larentis: https://github.com/nostalgiaz

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var it = moment.defineLocale('it', {
    months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
    monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
    weekdays : 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
    weekdaysShort : 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
    weekdaysMin : 'do_lu_ma_me_gi_ve_sa'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Oggi alle] LT',
        nextDay: '[Domani alle] LT',
        nextWeek: 'dddd [alle] LT',
        lastDay: '[Ieri alle] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[la scorsa] dddd [alle] LT';
                default:
                    return '[lo scorso] dddd [alle] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : function (s) {
            return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
        },
        past : '%s fa',
        s : 'alcuni secondi',
        m : 'un minuto',
        mm : '%d minuti',
        h : 'un\'ora',
        hh : '%d ore',
        d : 'un giorno',
        dd : '%d giorni',
        M : 'un mese',
        MM : '%d mesi',
        y : 'un anno',
        yy : '%d anni'
    },
    dayOfMonthOrdinalParse : /\d{1,2}º/,
    ordinal: '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return it;

})));


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Japanese [ja]
//! author : LI Long : https://github.com/baryon

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ja = moment.defineLocale('ja', {
    months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
    weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
    weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY/MM/DD',
        LL : 'YYYY年M月D日',
        LLL : 'YYYY年M月D日 HH:mm',
        LLLL : 'YYYY年M月D日 HH:mm dddd',
        l : 'YYYY/MM/DD',
        ll : 'YYYY年M月D日',
        lll : 'YYYY年M月D日 HH:mm',
        llll : 'YYYY年M月D日 HH:mm dddd'
    },
    meridiemParse: /午前|午後/i,
    isPM : function (input) {
        return input === '午後';
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return '午前';
        } else {
            return '午後';
        }
    },
    calendar : {
        sameDay : '[今日] LT',
        nextDay : '[明日] LT',
        nextWeek : '[来週]dddd LT',
        lastDay : '[昨日] LT',
        lastWeek : '[前週]dddd LT',
        sameElse : 'L'
    },
    dayOfMonthOrdinalParse : /\d{1,2}日/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            default:
                return number;
        }
    },
    relativeTime : {
        future : '%s後',
        past : '%s前',
        s : '数秒',
        m : '1分',
        mm : '%d分',
        h : '1時間',
        hh : '%d時間',
        d : '1日',
        dd : '%d日',
        M : '1ヶ月',
        MM : '%dヶ月',
        y : '1年',
        yy : '%d年'
    }
});

return ja;

})));


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Javanese [jv]
//! author : Rony Lantip : https://github.com/lantip
//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var jv = moment.defineLocale('jv', {
    months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
    weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
    weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
    weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY [pukul] HH.mm',
        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /enjing|siyang|sonten|ndalu/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'enjing') {
            return hour;
        } else if (meridiem === 'siyang') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
            return hour + 12;
        }
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'enjing';
        } else if (hours < 15) {
            return 'siyang';
        } else if (hours < 19) {
            return 'sonten';
        } else {
            return 'ndalu';
        }
    },
    calendar : {
        sameDay : '[Dinten puniko pukul] LT',
        nextDay : '[Mbenjang pukul] LT',
        nextWeek : 'dddd [pukul] LT',
        lastDay : '[Kala wingi pukul] LT',
        lastWeek : 'dddd [kepengker pukul] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'wonten ing %s',
        past : '%s ingkang kepengker',
        s : 'sawetawis detik',
        m : 'setunggal menit',
        mm : '%d menit',
        h : 'setunggal jam',
        hh : '%d jam',
        d : 'sedinten',
        dd : '%d dinten',
        M : 'sewulan',
        MM : '%d wulan',
        y : 'setaun',
        yy : '%d taun'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return jv;

})));


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Georgian [ka]
//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ka = moment.defineLocale('ka', {
    months : {
        standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
        format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
    },
    monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
    weekdays : {
        standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
        format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
        isFormat: /(წინა|შემდეგ)/
    },
    weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
    weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[დღეს] LT[-ზე]',
        nextDay : '[ხვალ] LT[-ზე]',
        lastDay : '[გუშინ] LT[-ზე]',
        nextWeek : '[შემდეგ] dddd LT[-ზე]',
        lastWeek : '[წინა] dddd LT-ზე',
        sameElse : 'L'
    },
    relativeTime : {
        future : function (s) {
            return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
                s.replace(/ი$/, 'ში') :
                s + 'ში';
        },
        past : function (s) {
            if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
                return s.replace(/(ი|ე)$/, 'ის უკან');
            }
            if ((/წელი/).test(s)) {
                return s.replace(/წელი$/, 'წლის უკან');
            }
        },
        s : 'რამდენიმე წამი',
        m : 'წუთი',
        mm : '%d წუთი',
        h : 'საათი',
        hh : '%d საათი',
        d : 'დღე',
        dd : '%d დღე',
        M : 'თვე',
        MM : '%d თვე',
        y : 'წელი',
        yy : '%d წელი'
    },
    dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
    ordinal : function (number) {
        if (number === 0) {
            return number;
        }
        if (number === 1) {
            return number + '-ლი';
        }
        if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
            return 'მე-' + number;
        }
        return number + '-ე';
    },
    week : {
        dow : 1,
        doy : 7
    }
});

return ka;

})));


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Kazakh [kk]
//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var suffixes = {
    0: '-ші',
    1: '-ші',
    2: '-ші',
    3: '-ші',
    4: '-ші',
    5: '-ші',
    6: '-шы',
    7: '-ші',
    8: '-ші',
    9: '-шы',
    10: '-шы',
    20: '-шы',
    30: '-шы',
    40: '-шы',
    50: '-ші',
    60: '-шы',
    70: '-ші',
    80: '-ші',
    90: '-шы',
    100: '-ші'
};

var kk = moment.defineLocale('kk', {
    months : 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
    monthsShort : 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
    weekdays : 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
    weekdaysShort : 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
    weekdaysMin : 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Бүгін сағат] LT',
        nextDay : '[Ертең сағат] LT',
        nextWeek : 'dddd [сағат] LT',
        lastDay : '[Кеше сағат] LT',
        lastWeek : '[Өткен аптаның] dddd [сағат] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s ішінде',
        past : '%s бұрын',
        s : 'бірнеше секунд',
        m : 'бір минут',
        mm : '%d минут',
        h : 'бір сағат',
        hh : '%d сағат',
        d : 'бір күн',
        dd : '%d күн',
        M : 'бір ай',
        MM : '%d ай',
        y : 'бір жыл',
        yy : '%d жыл'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
    ordinal : function (number) {
        var a = number % 10,
            b = number >= 100 ? 100 : null;
        return number + (suffixes[number] || suffixes[a] || suffixes[b]);
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return kk;

})));


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Cambodian [km]
//! author : Kruy Vanna : https://github.com/kruyvanna

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var km = moment.defineLocale('km', {
    months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
    monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
    weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
    weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
    weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS : 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
        nextDay: '[ស្អែក ម៉ោង] LT',
        nextWeek: 'dddd [ម៉ោង] LT',
        lastDay: '[ម្សិលមិញ ម៉ោង] LT',
        lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%sទៀត',
        past: '%sមុន',
        s: 'ប៉ុន្មានវិនាទី',
        m: 'មួយនាទី',
        mm: '%d នាទី',
        h: 'មួយម៉ោង',
        hh: '%d ម៉ោង',
        d: 'មួយថ្ងៃ',
        dd: '%d ថ្ងៃ',
        M: 'មួយខែ',
        MM: '%d ខែ',
        y: 'មួយឆ្នាំ',
        yy: '%d ឆ្នាំ'
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
});

return km;

})));


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Kannada [kn]
//! author : Rajeev Naik : https://github.com/rajeevnaikte

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '೧',
    '2': '೨',
    '3': '೩',
    '4': '೪',
    '5': '೫',
    '6': '೬',
    '7': '೭',
    '8': '೮',
    '9': '೯',
    '0': '೦'
};
var numberMap = {
    '೧': '1',
    '೨': '2',
    '೩': '3',
    '೪': '4',
    '೫': '5',
    '೬': '6',
    '೭': '7',
    '೮': '8',
    '೯': '9',
    '೦': '0'
};

var kn = moment.defineLocale('kn', {
    months : 'ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್'.split('_'),
    monthsShort : 'ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬ_ಅಕ್ಟೋಬ_ನವೆಂಬ_ಡಿಸೆಂಬ'.split('_'),
    monthsParseExact: true,
    weekdays : 'ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ'.split('_'),
    weekdaysShort : 'ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ'.split('_'),
    weekdaysMin : 'ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ'.split('_'),
    longDateFormat : {
        LT : 'A h:mm',
        LTS : 'A h:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm',
        LLLL : 'dddd, D MMMM YYYY, A h:mm'
    },
    calendar : {
        sameDay : '[ಇಂದು] LT',
        nextDay : '[ನಾಳೆ] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[ನಿನ್ನೆ] LT',
        lastWeek : '[ಕೊನೆಯ] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s ನಂತರ',
        past : '%s ಹಿಂದೆ',
        s : 'ಕೆಲವು ಕ್ಷಣಗಳು',
        m : 'ಒಂದು ನಿಮಿಷ',
        mm : '%d ನಿಮಿಷ',
        h : 'ಒಂದು ಗಂಟೆ',
        hh : '%d ಗಂಟೆ',
        d : 'ಒಂದು ದಿನ',
        dd : '%d ದಿನ',
        M : 'ಒಂದು ತಿಂಗಳು',
        MM : '%d ತಿಂಗಳು',
        y : 'ಒಂದು ವರ್ಷ',
        yy : '%d ವರ್ಷ'
    },
    preparse: function (string) {
        return string.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'ರಾತ್ರಿ') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'ಬೆಳಿಗ್ಗೆ') {
            return hour;
        } else if (meridiem === 'ಮಧ್ಯಾಹ್ನ') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'ಸಂಜೆ') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ರಾತ್ರಿ';
        } else if (hour < 10) {
            return 'ಬೆಳಿಗ್ಗೆ';
        } else if (hour < 17) {
            return 'ಮಧ್ಯಾಹ್ನ';
        } else if (hour < 20) {
            return 'ಸಂಜೆ';
        } else {
            return 'ರಾತ್ರಿ';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
    ordinal : function (number) {
        return number + 'ನೇ';
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return kn;

})));


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Korean [ko]
//! author : Kyungwook, Park : https://github.com/kyungw00k
//! author : Jeeeyul Lee <jeeeyul@gmail.com>

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ko = moment.defineLocale('ko', {
    months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
    monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
    weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
    weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
    weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
    longDateFormat : {
        LT : 'A h:mm',
        LTS : 'A h:mm:ss',
        L : 'YYYY.MM.DD',
        LL : 'YYYY년 MMMM D일',
        LLL : 'YYYY년 MMMM D일 A h:mm',
        LLLL : 'YYYY년 MMMM D일 dddd A h:mm',
        l : 'YYYY.MM.DD',
        ll : 'YYYY년 MMMM D일',
        lll : 'YYYY년 MMMM D일 A h:mm',
        llll : 'YYYY년 MMMM D일 dddd A h:mm'
    },
    calendar : {
        sameDay : '오늘 LT',
        nextDay : '내일 LT',
        nextWeek : 'dddd LT',
        lastDay : '어제 LT',
        lastWeek : '지난주 dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s 후',
        past : '%s 전',
        s : '몇 초',
        ss : '%d초',
        m : '1분',
        mm : '%d분',
        h : '한 시간',
        hh : '%d시간',
        d : '하루',
        dd : '%d일',
        M : '한 달',
        MM : '%d달',
        y : '일 년',
        yy : '%d년'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(일|월|주)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '일';
            case 'M':
                return number + '월';
            case 'w':
            case 'W':
                return number + '주';
            default:
                return number;
        }
    },
    meridiemParse : /오전|오후/,
    isPM : function (token) {
        return token === '오후';
    },
    meridiem : function (hour, minute, isUpper) {
        return hour < 12 ? '오전' : '오후';
    }
});

return ko;

})));


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Kyrgyz [ky]
//! author : Chyngyz Arystan uulu : https://github.com/chyngyz

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';



var suffixes = {
    0: '-чү',
    1: '-чи',
    2: '-чи',
    3: '-чү',
    4: '-чү',
    5: '-чи',
    6: '-чы',
    7: '-чи',
    8: '-чи',
    9: '-чу',
    10: '-чу',
    20: '-чы',
    30: '-чу',
    40: '-чы',
    50: '-чү',
    60: '-чы',
    70: '-чи',
    80: '-чи',
    90: '-чу',
    100: '-чү'
};

var ky = moment.defineLocale('ky', {
    months : 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
    monthsShort : 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
    weekdays : 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
    weekdaysShort : 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
    weekdaysMin : 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Бүгүн саат] LT',
        nextDay : '[Эртең саат] LT',
        nextWeek : 'dddd [саат] LT',
        lastDay : '[Кече саат] LT',
        lastWeek : '[Өткен аптанын] dddd [күнү] [саат] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s ичинде',
        past : '%s мурун',
        s : 'бирнече секунд',
        m : 'бир мүнөт',
        mm : '%d мүнөт',
        h : 'бир саат',
        hh : '%d саат',
        d : 'бир күн',
        dd : '%d күн',
        M : 'бир ай',
        MM : '%d ай',
        y : 'бир жыл',
        yy : '%d жыл'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
    ordinal : function (number) {
        var a = number % 10,
            b = number >= 100 ? 100 : null;
        return number + (suffixes[number] || suffixes[a] || suffixes[b]);
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return ky;

})));


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Luxembourgish [lb]
//! author : mweimerskirch : https://github.com/mweimerskirch
//! author : David Raison : https://github.com/kwisatz

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eng Minutt', 'enger Minutt'],
        'h': ['eng Stonn', 'enger Stonn'],
        'd': ['een Dag', 'engem Dag'],
        'M': ['ee Mount', 'engem Mount'],
        'y': ['ee Joer', 'engem Joer']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}
function processFutureTime(string) {
    var number = string.substr(0, string.indexOf(' '));
    if (eifelerRegelAppliesToNumber(number)) {
        return 'a ' + string;
    }
    return 'an ' + string;
}
function processPastTime(string) {
    var number = string.substr(0, string.indexOf(' '));
    if (eifelerRegelAppliesToNumber(number)) {
        return 'viru ' + string;
    }
    return 'virun ' + string;
}
/**
 * Returns true if the word before the given number loses the '-n' ending.
 * e.g. 'an 10 Deeg' but 'a 5 Deeg'
 *
 * @param number {integer}
 * @returns {boolean}
 */
function eifelerRegelAppliesToNumber(number) {
    number = parseInt(number, 10);
    if (isNaN(number)) {
        return false;
    }
    if (number < 0) {
        // Negative Number --> always true
        return true;
    } else if (number < 10) {
        // Only 1 digit
        if (4 <= number && number <= 7) {
            return true;
        }
        return false;
    } else if (number < 100) {
        // 2 digits
        var lastDigit = number % 10, firstDigit = number / 10;
        if (lastDigit === 0) {
            return eifelerRegelAppliesToNumber(firstDigit);
        }
        return eifelerRegelAppliesToNumber(lastDigit);
    } else if (number < 10000) {
        // 3 or 4 digits --> recursively check first digit
        while (number >= 10) {
            number = number / 10;
        }
        return eifelerRegelAppliesToNumber(number);
    } else {
        // Anything larger than 4 digits: recursively check first n-3 digits
        number = number / 1000;
        return eifelerRegelAppliesToNumber(number);
    }
}

var lb = moment.defineLocale('lb', {
    months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
    weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat: {
        LT: 'H:mm [Auer]',
        LTS: 'H:mm:ss [Auer]',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm [Auer]',
        LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
    },
    calendar: {
        sameDay: '[Haut um] LT',
        sameElse: 'L',
        nextDay: '[Muer um] LT',
        nextWeek: 'dddd [um] LT',
        lastDay: '[Gëschter um] LT',
        lastWeek: function () {
            // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
            switch (this.day()) {
                case 2:
                case 4:
                    return '[Leschten] dddd [um] LT';
                default:
                    return '[Leschte] dddd [um] LT';
            }
        }
    },
    relativeTime : {
        future : processFutureTime,
        past : processPastTime,
        s : 'e puer Sekonnen',
        m : processRelativeTime,
        mm : '%d Minutten',
        h : processRelativeTime,
        hh : '%d Stonnen',
        d : processRelativeTime,
        dd : '%d Deeg',
        M : processRelativeTime,
        MM : '%d Méint',
        y : processRelativeTime,
        yy : '%d Joer'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return lb;

})));


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Lao [lo]
//! author : Ryan Hart : https://github.com/ryanhart2

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var lo = moment.defineLocale('lo', {
    months : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
    monthsShort : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
    weekdays : 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
    weekdaysShort : 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
    weekdaysMin : 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'ວັນdddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
    isPM: function (input) {
        return input === 'ຕອນແລງ';
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ຕອນເຊົ້າ';
        } else {
            return 'ຕອນແລງ';
        }
    },
    calendar : {
        sameDay : '[ມື້ນີ້ເວລາ] LT',
        nextDay : '[ມື້ອື່ນເວລາ] LT',
        nextWeek : '[ວັນ]dddd[ໜ້າເວລາ] LT',
        lastDay : '[ມື້ວານນີ້ເວລາ] LT',
        lastWeek : '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'ອີກ %s',
        past : '%sຜ່ານມາ',
        s : 'ບໍ່ເທົ່າໃດວິນາທີ',
        m : '1 ນາທີ',
        mm : '%d ນາທີ',
        h : '1 ຊົ່ວໂມງ',
        hh : '%d ຊົ່ວໂມງ',
        d : '1 ມື້',
        dd : '%d ມື້',
        M : '1 ເດືອນ',
        MM : '%d ເດືອນ',
        y : '1 ປີ',
        yy : '%d ປີ'
    },
    dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
    ordinal : function (number) {
        return 'ທີ່' + number;
    }
});

return lo;

})));


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Lithuanian [lt]
//! author : Mindaugas Mozūras : https://github.com/mmozuras

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var units = {
    'm' : 'minutė_minutės_minutę',
    'mm': 'minutės_minučių_minutes',
    'h' : 'valanda_valandos_valandą',
    'hh': 'valandos_valandų_valandas',
    'd' : 'diena_dienos_dieną',
    'dd': 'dienos_dienų_dienas',
    'M' : 'mėnuo_mėnesio_mėnesį',
    'MM': 'mėnesiai_mėnesių_mėnesius',
    'y' : 'metai_metų_metus',
    'yy': 'metai_metų_metus'
};
function translateSeconds(number, withoutSuffix, key, isFuture) {
    if (withoutSuffix) {
        return 'kelios sekundės';
    } else {
        return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
    }
}
function translateSingular(number, withoutSuffix, key, isFuture) {
    return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
}
function special(number) {
    return number % 10 === 0 || (number > 10 && number < 20);
}
function forms(key) {
    return units[key].split('_');
}
function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    if (number === 1) {
        return result + translateSingular(number, withoutSuffix, key[0], isFuture);
    } else if (withoutSuffix) {
        return result + (special(number) ? forms(key)[1] : forms(key)[0]);
    } else {
        if (isFuture) {
            return result + forms(key)[1];
        } else {
            return result + (special(number) ? forms(key)[1] : forms(key)[2]);
        }
    }
}
var lt = moment.defineLocale('lt', {
    months : {
        format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
        standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
        isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
    },
    monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
    weekdays : {
        format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
        standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
        isFormat: /dddd HH:mm/
    },
    weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
    weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'YYYY [m.] MMMM D [d.]',
        LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
        l : 'YYYY-MM-DD',
        ll : 'YYYY [m.] MMMM D [d.]',
        lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
    },
    calendar : {
        sameDay : '[Šiandien] LT',
        nextDay : '[Rytoj] LT',
        nextWeek : 'dddd LT',
        lastDay : '[Vakar] LT',
        lastWeek : '[Praėjusį] dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'po %s',
        past : 'prieš %s',
        s : translateSeconds,
        m : translateSingular,
        mm : translate,
        h : translateSingular,
        hh : translate,
        d : translateSingular,
        dd : translate,
        M : translateSingular,
        MM : translate,
        y : translateSingular,
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}-oji/,
    ordinal : function (number) {
        return number + '-oji';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return lt;

})));


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Latvian [lv]
//! author : Kristaps Karlsons : https://github.com/skakri
//! author : Jānis Elmeris : https://github.com/JanisE

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var units = {
    'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
    'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
    'h': 'stundas_stundām_stunda_stundas'.split('_'),
    'hh': 'stundas_stundām_stunda_stundas'.split('_'),
    'd': 'dienas_dienām_diena_dienas'.split('_'),
    'dd': 'dienas_dienām_diena_dienas'.split('_'),
    'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
    'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
    'y': 'gada_gadiem_gads_gadi'.split('_'),
    'yy': 'gada_gadiem_gads_gadi'.split('_')
};
/**
 * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
 */
function format(forms, number, withoutSuffix) {
    if (withoutSuffix) {
        // E.g. "21 minūte", "3 minūtes".
        return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
    } else {
        // E.g. "21 minūtes" as in "pēc 21 minūtes".
        // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
        return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
    }
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
    return number + ' ' + format(units[key], number, withoutSuffix);
}
function relativeTimeWithSingular(number, withoutSuffix, key) {
    return format(units[key], number, withoutSuffix);
}
function relativeSeconds(number, withoutSuffix) {
    return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
}

var lv = moment.defineLocale('lv', {
    months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
    monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
    weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
    weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
    weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY.',
        LL : 'YYYY. [gada] D. MMMM',
        LLL : 'YYYY. [gada] D. MMMM, HH:mm',
        LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
    },
    calendar : {
        sameDay : '[Šodien pulksten] LT',
        nextDay : '[Rīt pulksten] LT',
        nextWeek : 'dddd [pulksten] LT',
        lastDay : '[Vakar pulksten] LT',
        lastWeek : '[Pagājušā] dddd [pulksten] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'pēc %s',
        past : 'pirms %s',
        s : relativeSeconds,
        m : relativeTimeWithSingular,
        mm : relativeTimeWithPlural,
        h : relativeTimeWithSingular,
        hh : relativeTimeWithPlural,
        d : relativeTimeWithSingular,
        dd : relativeTimeWithPlural,
        M : relativeTimeWithSingular,
        MM : relativeTimeWithPlural,
        y : relativeTimeWithSingular,
        yy : relativeTimeWithPlural
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return lv;

})));


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Montenegrin [me]
//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var translator = {
    words: { //Different grammatical cases
        m: ['jedan minut', 'jednog minuta'],
        mm: ['minut', 'minuta', 'minuta'],
        h: ['jedan sat', 'jednog sata'],
        hh: ['sat', 'sata', 'sati'],
        dd: ['dan', 'dana', 'dana'],
        MM: ['mjesec', 'mjeseca', 'mjeseci'],
        yy: ['godina', 'godine', 'godina']
    },
    correctGrammaticalCase: function (number, wordKey) {
        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
    },
    translate: function (number, withoutSuffix, key) {
        var wordKey = translator.words[key];
        if (key.length === 1) {
            return withoutSuffix ? wordKey[0] : wordKey[1];
        } else {
            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
        }
    }
};

var me = moment.defineLocale('me', {
    months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
    monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
    monthsParseExact : true,
    weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact : true,
    longDateFormat: {
        LT: 'H:mm',
        LTS : 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[danas u] LT',
        nextDay: '[sjutra u] LT',

        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[u] [nedjelju] [u] LT';
                case 3:
                    return '[u] [srijedu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
            }
        },
        lastDay  : '[juče u] LT',
        lastWeek : function () {
            var lastWeekDays = [
                '[prošle] [nedjelje] [u] LT',
                '[prošlog] [ponedjeljka] [u] LT',
                '[prošlog] [utorka] [u] LT',
                '[prošle] [srijede] [u] LT',
                '[prošlog] [četvrtka] [u] LT',
                '[prošlog] [petka] [u] LT',
                '[prošle] [subote] [u] LT'
            ];
            return lastWeekDays[this.day()];
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'za %s',
        past   : 'prije %s',
        s      : 'nekoliko sekundi',
        m      : translator.translate,
        mm     : translator.translate,
        h      : translator.translate,
        hh     : translator.translate,
        d      : 'dan',
        dd     : translator.translate,
        M      : 'mjesec',
        MM     : translator.translate,
        y      : 'godinu',
        yy     : translator.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return me;

})));


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Maori [mi]
//! author : John Corrigan <robbiecloset@gmail.com> : https://github.com/johnideal

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var mi = moment.defineLocale('mi', {
    months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
    monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
    monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
    weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
    weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
    weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [i] HH:mm',
        LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
    },
    calendar: {
        sameDay: '[i teie mahana, i] LT',
        nextDay: '[apopo i] LT',
        nextWeek: 'dddd [i] LT',
        lastDay: '[inanahi i] LT',
        lastWeek: 'dddd [whakamutunga i] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'i roto i %s',
        past: '%s i mua',
        s: 'te hēkona ruarua',
        m: 'he meneti',
        mm: '%d meneti',
        h: 'te haora',
        hh: '%d haora',
        d: 'he ra',
        dd: '%d ra',
        M: 'he marama',
        MM: '%d marama',
        y: 'he tau',
        yy: '%d tau'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return mi;

})));


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Macedonian [mk]
//! author : Borislav Mickov : https://github.com/B0k0

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var mk = moment.defineLocale('mk', {
    months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
    monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
    weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
    weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
    weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'D.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY H:mm',
        LLLL : 'dddd, D MMMM YYYY H:mm'
    },
    calendar : {
        sameDay : '[Денес во] LT',
        nextDay : '[Утре во] LT',
        nextWeek : '[Во] dddd [во] LT',
        lastDay : '[Вчера во] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 0:
                case 3:
                case 6:
                    return '[Изминатата] dddd [во] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[Изминатиот] dddd [во] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'после %s',
        past : 'пред %s',
        s : 'неколку секунди',
        m : 'минута',
        mm : '%d минути',
        h : 'час',
        hh : '%d часа',
        d : 'ден',
        dd : '%d дена',
        M : 'месец',
        MM : '%d месеци',
        y : 'година',
        yy : '%d години'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
    ordinal : function (number) {
        var lastDigit = number % 10,
            last2Digits = number % 100;
        if (number === 0) {
            return number + '-ев';
        } else if (last2Digits === 0) {
            return number + '-ен';
        } else if (last2Digits > 10 && last2Digits < 20) {
            return number + '-ти';
        } else if (lastDigit === 1) {
            return number + '-ви';
        } else if (lastDigit === 2) {
            return number + '-ри';
        } else if (lastDigit === 7 || lastDigit === 8) {
            return number + '-ми';
        } else {
            return number + '-ти';
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return mk;

})));


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Malayalam [ml]
//! author : Floyd Pink : https://github.com/floydpink

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ml = moment.defineLocale('ml', {
    months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
    monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
    monthsParseExact : true,
    weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
    weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
    weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
    longDateFormat : {
        LT : 'A h:mm -നു',
        LTS : 'A h:mm:ss -നു',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm -നു',
        LLLL : 'dddd, D MMMM YYYY, A h:mm -നു'
    },
    calendar : {
        sameDay : '[ഇന്ന്] LT',
        nextDay : '[നാളെ] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[ഇന്നലെ] LT',
        lastWeek : '[കഴിഞ്ഞ] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s കഴിഞ്ഞ്',
        past : '%s മുൻപ്',
        s : 'അൽപ നിമിഷങ്ങൾ',
        m : 'ഒരു മിനിറ്റ്',
        mm : '%d മിനിറ്റ്',
        h : 'ഒരു മണിക്കൂർ',
        hh : '%d മണിക്കൂർ',
        d : 'ഒരു ദിവസം',
        dd : '%d ദിവസം',
        M : 'ഒരു മാസം',
        MM : '%d മാസം',
        y : 'ഒരു വർഷം',
        yy : '%d വർഷം'
    },
    meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if ((meridiem === 'രാത്രി' && hour >= 4) ||
                meridiem === 'ഉച്ച കഴിഞ്ഞ്' ||
                meridiem === 'വൈകുന്നേരം') {
            return hour + 12;
        } else {
            return hour;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'രാത്രി';
        } else if (hour < 12) {
            return 'രാവിലെ';
        } else if (hour < 17) {
            return 'ഉച്ച കഴിഞ്ഞ്';
        } else if (hour < 20) {
            return 'വൈകുന്നേരം';
        } else {
            return 'രാത്രി';
        }
    }
});

return ml;

})));


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Marathi [mr]
//! author : Harshad Kale : https://github.com/kalehv
//! author : Vivek Athalye : https://github.com/vnathalye

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
};
var numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
};

function relativeTimeMr(number, withoutSuffix, string, isFuture)
{
    var output = '';
    if (withoutSuffix) {
        switch (string) {
            case 's': output = 'काही सेकंद'; break;
            case 'm': output = 'एक मिनिट'; break;
            case 'mm': output = '%d मिनिटे'; break;
            case 'h': output = 'एक तास'; break;
            case 'hh': output = '%d तास'; break;
            case 'd': output = 'एक दिवस'; break;
            case 'dd': output = '%d दिवस'; break;
            case 'M': output = 'एक महिना'; break;
            case 'MM': output = '%d महिने'; break;
            case 'y': output = 'एक वर्ष'; break;
            case 'yy': output = '%d वर्षे'; break;
        }
    }
    else {
        switch (string) {
            case 's': output = 'काही सेकंदां'; break;
            case 'm': output = 'एका मिनिटा'; break;
            case 'mm': output = '%d मिनिटां'; break;
            case 'h': output = 'एका तासा'; break;
            case 'hh': output = '%d तासां'; break;
            case 'd': output = 'एका दिवसा'; break;
            case 'dd': output = '%d दिवसां'; break;
            case 'M': output = 'एका महिन्या'; break;
            case 'MM': output = '%d महिन्यां'; break;
            case 'y': output = 'एका वर्षा'; break;
            case 'yy': output = '%d वर्षां'; break;
        }
    }
    return output.replace(/%d/i, number);
}

var mr = moment.defineLocale('mr', {
    months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
    monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
    monthsParseExact : true,
    weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
    weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
    weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
    longDateFormat : {
        LT : 'A h:mm वाजता',
        LTS : 'A h:mm:ss वाजता',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm वाजता',
        LLLL : 'dddd, D MMMM YYYY, A h:mm वाजता'
    },
    calendar : {
        sameDay : '[आज] LT',
        nextDay : '[उद्या] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[काल] LT',
        lastWeek: '[मागील] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future: '%sमध्ये',
        past: '%sपूर्वी',
        s: relativeTimeMr,
        m: relativeTimeMr,
        mm: relativeTimeMr,
        h: relativeTimeMr,
        hh: relativeTimeMr,
        d: relativeTimeMr,
        dd: relativeTimeMr,
        M: relativeTimeMr,
        MM: relativeTimeMr,
        y: relativeTimeMr,
        yy: relativeTimeMr
    },
    preparse: function (string) {
        return string.replace(/[१२३४५६७८९०]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'रात्री') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'सकाळी') {
            return hour;
        } else if (meridiem === 'दुपारी') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'सायंकाळी') {
            return hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 4) {
            return 'रात्री';
        } else if (hour < 10) {
            return 'सकाळी';
        } else if (hour < 17) {
            return 'दुपारी';
        } else if (hour < 20) {
            return 'सायंकाळी';
        } else {
            return 'रात्री';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return mr;

})));


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Malay [ms-my]
//! note : DEPRECATED, the correct one is [ms]
//! author : Weldan Jamili : https://github.com/weldan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var msMy = moment.defineLocale('ms-my', {
    months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
    weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
    weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
    weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY [pukul] HH.mm',
        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|tengahari|petang|malam/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        } else if (meridiem === 'tengahari') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'petang' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'tengahari';
        } else if (hours < 19) {
            return 'petang';
        } else {
            return 'malam';
        }
    },
    calendar : {
        sameDay : '[Hari ini pukul] LT',
        nextDay : '[Esok pukul] LT',
        nextWeek : 'dddd [pukul] LT',
        lastDay : '[Kelmarin pukul] LT',
        lastWeek : 'dddd [lepas pukul] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dalam %s',
        past : '%s yang lepas',
        s : 'beberapa saat',
        m : 'seminit',
        mm : '%d minit',
        h : 'sejam',
        hh : '%d jam',
        d : 'sehari',
        dd : '%d hari',
        M : 'sebulan',
        MM : '%d bulan',
        y : 'setahun',
        yy : '%d tahun'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return msMy;

})));


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Malay [ms]
//! author : Weldan Jamili : https://github.com/weldan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ms = moment.defineLocale('ms', {
    months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
    weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
    weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
    weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY [pukul] HH.mm',
        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|tengahari|petang|malam/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        } else if (meridiem === 'tengahari') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'petang' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'tengahari';
        } else if (hours < 19) {
            return 'petang';
        } else {
            return 'malam';
        }
    },
    calendar : {
        sameDay : '[Hari ini pukul] LT',
        nextDay : '[Esok pukul] LT',
        nextWeek : 'dddd [pukul] LT',
        lastDay : '[Kelmarin pukul] LT',
        lastWeek : 'dddd [lepas pukul] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dalam %s',
        past : '%s yang lepas',
        s : 'beberapa saat',
        m : 'seminit',
        mm : '%d minit',
        h : 'sejam',
        hh : '%d jam',
        d : 'sehari',
        dd : '%d hari',
        M : 'sebulan',
        MM : '%d bulan',
        y : 'setahun',
        yy : '%d tahun'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return ms;

})));


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Burmese [my]
//! author : Squar team, mysquar.com
//! author : David Rossellat : https://github.com/gholadr
//! author : Tin Aung Lin : https://github.com/thanyawzinmin

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '၁',
    '2': '၂',
    '3': '၃',
    '4': '၄',
    '5': '၅',
    '6': '၆',
    '7': '၇',
    '8': '၈',
    '9': '၉',
    '0': '၀'
};
var numberMap = {
    '၁': '1',
    '၂': '2',
    '၃': '3',
    '၄': '4',
    '၅': '5',
    '၆': '6',
    '၇': '7',
    '၈': '8',
    '၉': '9',
    '၀': '0'
};

var my = moment.defineLocale('my', {
    months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
    monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
    weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
    weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
    weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[ယနေ.] LT [မှာ]',
        nextDay: '[မနက်ဖြန်] LT [မှာ]',
        nextWeek: 'dddd LT [မှာ]',
        lastDay: '[မနေ.က] LT [မှာ]',
        lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'လာမည့် %s မှာ',
        past: 'လွန်ခဲ့သော %s က',
        s: 'စက္ကန်.အနည်းငယ်',
        m: 'တစ်မိနစ်',
        mm: '%d မိနစ်',
        h: 'တစ်နာရီ',
        hh: '%d နာရီ',
        d: 'တစ်ရက်',
        dd: '%d ရက်',
        M: 'တစ်လ',
        MM: '%d လ',
        y: 'တစ်နှစ်',
        yy: '%d နှစ်'
    },
    preparse: function (string) {
        return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 1st is the first week of the year.
    }
});

return my;

})));


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Norwegian Bokmål [nb]
//! authors : Espen Hovlandsdal : https://github.com/rexxars
//!           Sigurd Gartmann : https://github.com/sigurdga

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var nb = moment.defineLocale('nb', {
    months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
    monthsParseExact : true,
    weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
    weekdaysShort : 'sø._ma._ti._on._to._fr._lø.'.split('_'),
    weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY [kl.] HH:mm',
        LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
    },
    calendar : {
        sameDay: '[i dag kl.] LT',
        nextDay: '[i morgen kl.] LT',
        nextWeek: 'dddd [kl.] LT',
        lastDay: '[i går kl.] LT',
        lastWeek: '[forrige] dddd [kl.] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'om %s',
        past : '%s siden',
        s : 'noen sekunder',
        m : 'ett minutt',
        mm : '%d minutter',
        h : 'en time',
        hh : '%d timer',
        d : 'en dag',
        dd : '%d dager',
        M : 'en måned',
        MM : '%d måneder',
        y : 'ett år',
        yy : '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return nb;

})));


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Nepalese [ne]
//! author : suvash : https://github.com/suvash

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
};
var numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
};

var ne = moment.defineLocale('ne', {
    months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
    monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
    monthsParseExact : true,
    weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
    weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
    weekdaysMin : 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'Aको h:mm बजे',
        LTS : 'Aको h:mm:ss बजे',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, Aको h:mm बजे',
        LLLL : 'dddd, D MMMM YYYY, Aको h:mm बजे'
    },
    preparse: function (string) {
        return string.replace(/[१२३४५६७८९०]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'राति') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'बिहान') {
            return hour;
        } else if (meridiem === 'दिउँसो') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'साँझ') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 3) {
            return 'राति';
        } else if (hour < 12) {
            return 'बिहान';
        } else if (hour < 16) {
            return 'दिउँसो';
        } else if (hour < 20) {
            return 'साँझ';
        } else {
            return 'राति';
        }
    },
    calendar : {
        sameDay : '[आज] LT',
        nextDay : '[भोलि] LT',
        nextWeek : '[आउँदो] dddd[,] LT',
        lastDay : '[हिजो] LT',
        lastWeek : '[गएको] dddd[,] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%sमा',
        past : '%s अगाडि',
        s : 'केही क्षण',
        m : 'एक मिनेट',
        mm : '%d मिनेट',
        h : 'एक घण्टा',
        hh : '%d घण्टा',
        d : 'एक दिन',
        dd : '%d दिन',
        M : 'एक महिना',
        MM : '%d महिना',
        y : 'एक बर्ष',
        yy : '%d बर्ष'
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return ne;

})));


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Dutch (Belgium) [nl-be]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

var nlBe = moment.defineLocale('nl-be', {
    months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortWithDots;
        } else if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[m.month()];
        } else {
            return monthsShortWithDots[m.month()];
        }
    },

    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

    monthsParse : monthsParse,
    longMonthsParse : monthsParse,
    shortMonthsParse : monthsParse,

    weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin : 'zo_ma_di_wo_do_vr_za'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[vandaag om] LT',
        nextDay: '[morgen om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[gisteren om] LT',
        lastWeek: '[afgelopen] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'over %s',
        past : '%s geleden',
        s : 'een paar seconden',
        m : 'één minuut',
        mm : '%d minuten',
        h : 'één uur',
        hh : '%d uur',
        d : 'één dag',
        dd : '%d dagen',
        M : 'één maand',
        MM : '%d maanden',
        y : 'één jaar',
        yy : '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal : function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return nlBe;

})));


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Dutch [nl]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

var nl = moment.defineLocale('nl', {
    months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortWithDots;
        } else if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[m.month()];
        } else {
            return monthsShortWithDots[m.month()];
        }
    },

    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

    monthsParse : monthsParse,
    longMonthsParse : monthsParse,
    shortMonthsParse : monthsParse,

    weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin : 'zo_ma_di_wo_do_vr_za'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD-MM-YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[vandaag om] LT',
        nextDay: '[morgen om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[gisteren om] LT',
        lastWeek: '[afgelopen] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'over %s',
        past : '%s geleden',
        s : 'een paar seconden',
        m : 'één minuut',
        mm : '%d minuten',
        h : 'één uur',
        hh : '%d uur',
        d : 'één dag',
        dd : '%d dagen',
        M : 'één maand',
        MM : '%d maanden',
        y : 'één jaar',
        yy : '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal : function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return nl;

})));


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Nynorsk [nn]
//! author : https://github.com/mechuwind

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var nn = moment.defineLocale('nn', {
    months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
    weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
    weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
    weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY [kl.] H:mm',
        LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
    },
    calendar : {
        sameDay: '[I dag klokka] LT',
        nextDay: '[I morgon klokka] LT',
        nextWeek: 'dddd [klokka] LT',
        lastDay: '[I går klokka] LT',
        lastWeek: '[Føregåande] dddd [klokka] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'om %s',
        past : '%s sidan',
        s : 'nokre sekund',
        m : 'eit minutt',
        mm : '%d minutt',
        h : 'ein time',
        hh : '%d timar',
        d : 'ein dag',
        dd : '%d dagar',
        M : 'ein månad',
        MM : '%d månader',
        y : 'eit år',
        yy : '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return nn;

})));


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Punjabi (India) [pa-in]
//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '੧',
    '2': '੨',
    '3': '੩',
    '4': '੪',
    '5': '੫',
    '6': '੬',
    '7': '੭',
    '8': '੮',
    '9': '੯',
    '0': '੦'
};
var numberMap = {
    '੧': '1',
    '੨': '2',
    '੩': '3',
    '੪': '4',
    '੫': '5',
    '੬': '6',
    '੭': '7',
    '੮': '8',
    '੯': '9',
    '੦': '0'
};

var paIn = moment.defineLocale('pa-in', {
    // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
    months : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
    monthsShort : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
    weekdays : 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
    weekdaysShort : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
    weekdaysMin : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
    longDateFormat : {
        LT : 'A h:mm ਵਜੇ',
        LTS : 'A h:mm:ss ਵਜੇ',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm ਵਜੇ',
        LLLL : 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
    },
    calendar : {
        sameDay : '[ਅਜ] LT',
        nextDay : '[ਕਲ] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[ਕਲ] LT',
        lastWeek : '[ਪਿਛਲੇ] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s ਵਿੱਚ',
        past : '%s ਪਿਛਲੇ',
        s : 'ਕੁਝ ਸਕਿੰਟ',
        m : 'ਇਕ ਮਿੰਟ',
        mm : '%d ਮਿੰਟ',
        h : 'ਇੱਕ ਘੰਟਾ',
        hh : '%d ਘੰਟੇ',
        d : 'ਇੱਕ ਦਿਨ',
        dd : '%d ਦਿਨ',
        M : 'ਇੱਕ ਮਹੀਨਾ',
        MM : '%d ਮਹੀਨੇ',
        y : 'ਇੱਕ ਸਾਲ',
        yy : '%d ਸਾਲ'
    },
    preparse: function (string) {
        return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
    meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'ਰਾਤ') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'ਸਵੇਰ') {
            return hour;
        } else if (meridiem === 'ਦੁਪਹਿਰ') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'ਸ਼ਾਮ') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ਰਾਤ';
        } else if (hour < 10) {
            return 'ਸਵੇਰ';
        } else if (hour < 17) {
            return 'ਦੁਪਹਿਰ';
        } else if (hour < 20) {
            return 'ਸ਼ਾਮ';
        } else {
            return 'ਰਾਤ';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return paIn;

})));


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Polish [pl]
//! author : Rafal Hirsz : https://github.com/evoL

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_');
var monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
function plural(n) {
    return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
}
function translate(number, withoutSuffix, key) {
    var result = number + ' ';
    switch (key) {
        case 'm':
            return withoutSuffix ? 'minuta' : 'minutę';
        case 'mm':
            return result + (plural(number) ? 'minuty' : 'minut');
        case 'h':
            return withoutSuffix  ? 'godzina'  : 'godzinę';
        case 'hh':
            return result + (plural(number) ? 'godziny' : 'godzin');
        case 'MM':
            return result + (plural(number) ? 'miesiące' : 'miesięcy');
        case 'yy':
            return result + (plural(number) ? 'lata' : 'lat');
    }
}

var pl = moment.defineLocale('pl', {
    months : function (momentToFormat, format) {
        if (!momentToFormat) {
            return monthsNominative;
        } else if (format === '') {
            // Hack: if format empty we know this is used to generate
            // RegExp by moment. Give then back both valid forms of months
            // in RegExp ready format.
            return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
        } else if (/D MMMM/.test(format)) {
            return monthsSubjective[momentToFormat.month()];
        } else {
            return monthsNominative[momentToFormat.month()];
        }
    },
    monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
    weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
    weekdaysShort : 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
    weekdaysMin : 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Dziś o] LT',
        nextDay: '[Jutro o] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[W niedzielę o] LT';

                case 2:
                    return '[We wtorek o] LT';

                case 3:
                    return '[W środę o] LT';

                case 6:
                    return '[W sobotę o] LT';

                default:
                    return '[W] dddd [o] LT';
            }
        },
        lastDay: '[Wczoraj o] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[W zeszłą niedzielę o] LT';
                case 3:
                    return '[W zeszłą środę o] LT';
                case 6:
                    return '[W zeszłą sobotę o] LT';
                default:
                    return '[W zeszły] dddd [o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'za %s',
        past : '%s temu',
        s : 'kilka sekund',
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : '1 dzień',
        dd : '%d dni',
        M : 'miesiąc',
        MM : translate,
        y : 'rok',
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return pl;

})));


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Portuguese (Brazil) [pt-br]
//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ptBr = moment.defineLocale('pt-br', {
    months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
    monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
    weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin : 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
        LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
    },
    calendar : {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'em %s',
        past : '%s atrás',
        s : 'poucos segundos',
        ss : '%d segundos',
        m : 'um minuto',
        mm : '%d minutos',
        h : 'uma hora',
        hh : '%d horas',
        d : 'um dia',
        dd : '%d dias',
        M : 'um mês',
        MM : '%d meses',
        y : 'um ano',
        yy : '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal : '%dº'
});

return ptBr;

})));


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Portuguese [pt]
//! author : Jefferson : https://github.com/jalex79

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var pt = moment.defineLocale('pt', {
    months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
    monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
    weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin : 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY HH:mm',
        LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'em %s',
        past : 'há %s',
        s : 'segundos',
        m : 'um minuto',
        mm : '%d minutos',
        h : 'uma hora',
        hh : '%d horas',
        d : 'um dia',
        dd : '%d dias',
        M : 'um mês',
        MM : '%d meses',
        y : 'um ano',
        yy : '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return pt;

})));


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Romanian [ro]
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
            'mm': 'minute',
            'hh': 'ore',
            'dd': 'zile',
            'MM': 'luni',
            'yy': 'ani'
        },
        separator = ' ';
    if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
        separator = ' de ';
    }
    return number + separator + format[key];
}

var ro = moment.defineLocale('ro', {
    months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
    monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
    weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
    weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY H:mm',
        LLLL : 'dddd, D MMMM YYYY H:mm'
    },
    calendar : {
        sameDay: '[azi la] LT',
        nextDay: '[mâine la] LT',
        nextWeek: 'dddd [la] LT',
        lastDay: '[ieri la] LT',
        lastWeek: '[fosta] dddd [la] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'peste %s',
        past : '%s în urmă',
        s : 'câteva secunde',
        m : 'un minut',
        mm : relativeTimeWithPlural,
        h : 'o oră',
        hh : relativeTimeWithPlural,
        d : 'o zi',
        dd : relativeTimeWithPlural,
        M : 'o lună',
        MM : relativeTimeWithPlural,
        y : 'un an',
        yy : relativeTimeWithPlural
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return ro;

})));


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Russian [ru]
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
//! author : Коренберг Марк : https://github.com/socketpair

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
        'hh': 'час_часа_часов',
        'dd': 'день_дня_дней',
        'MM': 'месяц_месяца_месяцев',
        'yy': 'год_года_лет'
    };
    if (key === 'm') {
        return withoutSuffix ? 'минута' : 'минуту';
    }
    else {
        return number + ' ' + plural(format[key], +number);
    }
}
var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

// http://new.gramota.ru/spravka/rules/139-prop : § 103
// Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
// CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
var ru = moment.defineLocale('ru', {
    months : {
        format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
        standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
    },
    monthsShort : {
        // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
        format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
        standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
    },
    weekdays : {
        standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
        format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
        isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
    },
    weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    monthsParse : monthsParse,
    longMonthsParse : monthsParse,
    shortMonthsParse : monthsParse,

    // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
    monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

    // копия предыдущего
    monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

    // полные названия с падежами
    monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

    // Выражение, которое соотвествует только сокращённым формам
    monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY г.',
        LLL : 'D MMMM YYYY г., HH:mm',
        LLLL : 'dddd, D MMMM YYYY г., HH:mm'
    },
    calendar : {
        sameDay: '[Сегодня в] LT',
        nextDay: '[Завтра в] LT',
        lastDay: '[Вчера в] LT',
        nextWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[В следующее] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В следующий] dddd [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В следующую] dddd [в] LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[Во] dddd [в] LT';
                } else {
                    return '[В] dddd [в] LT';
                }
            }
        },
        lastWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[В прошлое] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В прошлый] dddd [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В прошлую] dddd [в] LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[Во] dddd [в] LT';
                } else {
                    return '[В] dddd [в] LT';
                }
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'через %s',
        past : '%s назад',
        s : 'несколько секунд',
        m : relativeTimeWithPlural,
        mm : relativeTimeWithPlural,
        h : 'час',
        hh : relativeTimeWithPlural,
        d : 'день',
        dd : relativeTimeWithPlural,
        M : 'месяц',
        MM : relativeTimeWithPlural,
        y : 'год',
        yy : relativeTimeWithPlural
    },
    meridiemParse: /ночи|утра|дня|вечера/i,
    isPM : function (input) {
        return /^(дня|вечера)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ночи';
        } else if (hour < 12) {
            return 'утра';
        } else if (hour < 17) {
            return 'дня';
        } else {
            return 'вечера';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return number + '-й';
            case 'D':
                return number + '-го';
            case 'w':
            case 'W':
                return number + '-я';
            default:
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return ru;

})));


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Sindhi [sd]
//! author : Narain Sagar : https://github.com/narainsagar

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = [
    'جنوري',
    'فيبروري',
    'مارچ',
    'اپريل',
    'مئي',
    'جون',
    'جولاءِ',
    'آگسٽ',
    'سيپٽمبر',
    'آڪٽوبر',
    'نومبر',
    'ڊسمبر'
];
var days = [
    'آچر',
    'سومر',
    'اڱارو',
    'اربع',
    'خميس',
    'جمع',
    'ڇنڇر'
];

var sd = moment.defineLocale('sd', {
    months : months,
    monthsShort : months,
    weekdays : days,
    weekdaysShort : days,
    weekdaysMin : days,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd، D MMMM YYYY HH:mm'
    },
    meridiemParse: /صبح|شام/,
    isPM : function (input) {
        return 'شام' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'صبح';
        }
        return 'شام';
    },
    calendar : {
        sameDay : '[اڄ] LT',
        nextDay : '[سڀاڻي] LT',
        nextWeek : 'dddd [اڳين هفتي تي] LT',
        lastDay : '[ڪالهه] LT',
        lastWeek : '[گزريل هفتي] dddd [تي] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s پوء',
        past : '%s اڳ',
        s : 'چند سيڪنڊ',
        m : 'هڪ منٽ',
        mm : '%d منٽ',
        h : 'هڪ ڪلاڪ',
        hh : '%d ڪلاڪ',
        d : 'هڪ ڏينهن',
        dd : '%d ڏينهن',
        M : 'هڪ مهينو',
        MM : '%d مهينا',
        y : 'هڪ سال',
        yy : '%d سال'
    },
    preparse: function (string) {
        return string.replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/,/g, '،');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return sd;

})));


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Northern Sami [se]
//! authors : Bård Rolstad Henriksen : https://github.com/karamell

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';



var se = moment.defineLocale('se', {
    months : 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
    monthsShort : 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
    weekdays : 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
    weekdaysShort : 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
    weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'MMMM D. [b.] YYYY',
        LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
        LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
    },
    calendar : {
        sameDay: '[otne ti] LT',
        nextDay: '[ihttin ti] LT',
        nextWeek: 'dddd [ti] LT',
        lastDay: '[ikte ti] LT',
        lastWeek: '[ovddit] dddd [ti] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : '%s geažes',
        past : 'maŋit %s',
        s : 'moadde sekunddat',
        m : 'okta minuhta',
        mm : '%d minuhtat',
        h : 'okta diimmu',
        hh : '%d diimmut',
        d : 'okta beaivi',
        dd : '%d beaivvit',
        M : 'okta mánnu',
        MM : '%d mánut',
        y : 'okta jahki',
        yy : '%d jagit'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return se;

})));


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Sinhalese [si]
//! author : Sampath Sitinamaluwa : https://github.com/sampathsris

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


/*jshint -W100*/
var si = moment.defineLocale('si', {
    months : 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
    monthsShort : 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
    weekdays : 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
    weekdaysShort : 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
    weekdaysMin : 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'a h:mm',
        LTS : 'a h:mm:ss',
        L : 'YYYY/MM/DD',
        LL : 'YYYY MMMM D',
        LLL : 'YYYY MMMM D, a h:mm',
        LLLL : 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
    },
    calendar : {
        sameDay : '[අද] LT[ට]',
        nextDay : '[හෙට] LT[ට]',
        nextWeek : 'dddd LT[ට]',
        lastDay : '[ඊයේ] LT[ට]',
        lastWeek : '[පසුගිය] dddd LT[ට]',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%sකින්',
        past : '%sකට පෙර',
        s : 'තත්පර කිහිපය',
        m : 'මිනිත්තුව',
        mm : 'මිනිත්තු %d',
        h : 'පැය',
        hh : 'පැය %d',
        d : 'දිනය',
        dd : 'දින %d',
        M : 'මාසය',
        MM : 'මාස %d',
        y : 'වසර',
        yy : 'වසර %d'
    },
    dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
    ordinal : function (number) {
        return number + ' වැනි';
    },
    meridiemParse : /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
    isPM : function (input) {
        return input === 'ප.ව.' || input === 'පස් වරු';
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'ප.ව.' : 'පස් වරු';
        } else {
            return isLower ? 'පෙ.ව.' : 'පෙර වරු';
        }
    }
});

return si;

})));


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Slovak [sk]
//! author : Martin Minka : https://github.com/k2s
//! based on work of petrbela : https://github.com/petrbela

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_');
var monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
function plural(n) {
    return (n > 1) && (n < 5);
}
function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':  // a few seconds / in a few seconds / a few seconds ago
            return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
        case 'm':  // a minute / in a minute / a minute ago
            return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'minúty' : 'minút');
            } else {
                return result + 'minútami';
            }
            break;
        case 'h':  // an hour / in an hour / an hour ago
            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
        case 'hh': // 9 hours / in 9 hours / 9 hours ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'hodiny' : 'hodín');
            } else {
                return result + 'hodinami';
            }
            break;
        case 'd':  // a day / in a day / a day ago
            return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
        case 'dd': // 9 days / in 9 days / 9 days ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'dni' : 'dní');
            } else {
                return result + 'dňami';
            }
            break;
        case 'M':  // a month / in a month / a month ago
            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
        case 'MM': // 9 months / in 9 months / 9 months ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'mesiace' : 'mesiacov');
            } else {
                return result + 'mesiacmi';
            }
            break;
        case 'y':  // a year / in a year / a year ago
            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
        case 'yy': // 9 years / in 9 years / 9 years ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'roky' : 'rokov');
            } else {
                return result + 'rokmi';
            }
            break;
    }
}

var sk = moment.defineLocale('sk', {
    months : months,
    monthsShort : monthsShort,
    weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
    weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
    weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
    longDateFormat : {
        LT: 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd D. MMMM YYYY H:mm'
    },
    calendar : {
        sameDay: '[dnes o] LT',
        nextDay: '[zajtra o] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[v nedeľu o] LT';
                case 1:
                case 2:
                    return '[v] dddd [o] LT';
                case 3:
                    return '[v stredu o] LT';
                case 4:
                    return '[vo štvrtok o] LT';
                case 5:
                    return '[v piatok o] LT';
                case 6:
                    return '[v sobotu o] LT';
            }
        },
        lastDay: '[včera o] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[minulú nedeľu o] LT';
                case 1:
                case 2:
                    return '[minulý] dddd [o] LT';
                case 3:
                    return '[minulú stredu o] LT';
                case 4:
                case 5:
                    return '[minulý] dddd [o] LT';
                case 6:
                    return '[minulú sobotu o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'za %s',
        past : 'pred %s',
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return sk;

})));


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Slovenian [sl]
//! author : Robert Sedovšek : https://github.com/sedovsek

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':
            return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
        case 'm':
            return withoutSuffix ? 'ena minuta' : 'eno minuto';
        case 'mm':
            if (number === 1) {
                result += withoutSuffix ? 'minuta' : 'minuto';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'minute' : 'minutami';
            } else {
                result += withoutSuffix || isFuture ? 'minut' : 'minutami';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'ena ura' : 'eno uro';
        case 'hh':
            if (number === 1) {
                result += withoutSuffix ? 'ura' : 'uro';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'uri' : 'urama';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'ure' : 'urami';
            } else {
                result += withoutSuffix || isFuture ? 'ur' : 'urami';
            }
            return result;
        case 'd':
            return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
        case 'dd':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'dan' : 'dnem';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
            } else {
                result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
            }
            return result;
        case 'M':
            return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
        case 'MM':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
            } else {
                result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
            }
            return result;
        case 'y':
            return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
        case 'yy':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'leto' : 'letom';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'leti' : 'letoma';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'leta' : 'leti';
            } else {
                result += withoutSuffix || isFuture ? 'let' : 'leti';
            }
            return result;
    }
}

var sl = moment.defineLocale('sl', {
    months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
    monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
    weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
    weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd, D. MMMM YYYY H:mm'
    },
    calendar : {
        sameDay  : '[danes ob] LT',
        nextDay  : '[jutri ob] LT',

        nextWeek : function () {
            switch (this.day()) {
                case 0:
                    return '[v] [nedeljo] [ob] LT';
                case 3:
                    return '[v] [sredo] [ob] LT';
                case 6:
                    return '[v] [soboto] [ob] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[v] dddd [ob] LT';
            }
        },
        lastDay  : '[včeraj ob] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 0:
                    return '[prejšnjo] [nedeljo] [ob] LT';
                case 3:
                    return '[prejšnjo] [sredo] [ob] LT';
                case 6:
                    return '[prejšnjo] [soboto] [ob] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prejšnji] dddd [ob] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'čez %s',
        past   : 'pred %s',
        s      : processRelativeTime,
        m      : processRelativeTime,
        mm     : processRelativeTime,
        h      : processRelativeTime,
        hh     : processRelativeTime,
        d      : processRelativeTime,
        dd     : processRelativeTime,
        M      : processRelativeTime,
        MM     : processRelativeTime,
        y      : processRelativeTime,
        yy     : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return sl;

})));


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Albanian [sq]
//! author : Flakërim Ismani : https://github.com/flakerimi
//! author : Menelion Elensúle : https://github.com/Oire
//! author : Oerd Cukalla : https://github.com/oerd

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var sq = moment.defineLocale('sq', {
    months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
    monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
    weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
    weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
    weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
    weekdaysParseExact : true,
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input.charAt(0) === 'M';
    },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Sot në] LT',
        nextDay : '[Nesër në] LT',
        nextWeek : 'dddd [në] LT',
        lastDay : '[Dje në] LT',
        lastWeek : 'dddd [e kaluar në] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'në %s',
        past : '%s më parë',
        s : 'disa sekonda',
        m : 'një minutë',
        mm : '%d minuta',
        h : 'një orë',
        hh : '%d orë',
        d : 'një ditë',
        dd : '%d ditë',
        M : 'një muaj',
        MM : '%d muaj',
        y : 'një vit',
        yy : '%d vite'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return sq;

})));


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Serbian Cyrillic [sr-cyrl]
//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var translator = {
    words: { //Different grammatical cases
        m: ['један минут', 'једне минуте'],
        mm: ['минут', 'минуте', 'минута'],
        h: ['један сат', 'једног сата'],
        hh: ['сат', 'сата', 'сати'],
        dd: ['дан', 'дана', 'дана'],
        MM: ['месец', 'месеца', 'месеци'],
        yy: ['година', 'године', 'година']
    },
    correctGrammaticalCase: function (number, wordKey) {
        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
    },
    translate: function (number, withoutSuffix, key) {
        var wordKey = translator.words[key];
        if (key.length === 1) {
            return withoutSuffix ? wordKey[0] : wordKey[1];
        } else {
            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
        }
    }
};

var srCyrl = moment.defineLocale('sr-cyrl', {
    months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
    monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
    monthsParseExact: true,
    weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
    weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
    weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
    weekdaysParseExact : true,
    longDateFormat: {
        LT: 'H:mm',
        LTS : 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[данас у] LT',
        nextDay: '[сутра у] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[у] [недељу] [у] LT';
                case 3:
                    return '[у] [среду] [у] LT';
                case 6:
                    return '[у] [суботу] [у] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[у] dddd [у] LT';
            }
        },
        lastDay  : '[јуче у] LT',
        lastWeek : function () {
            var lastWeekDays = [
                '[прошле] [недеље] [у] LT',
                '[прошлог] [понедељка] [у] LT',
                '[прошлог] [уторка] [у] LT',
                '[прошле] [среде] [у] LT',
                '[прошлог] [четвртка] [у] LT',
                '[прошлог] [петка] [у] LT',
                '[прошле] [суботе] [у] LT'
            ];
            return lastWeekDays[this.day()];
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'за %s',
        past   : 'пре %s',
        s      : 'неколико секунди',
        m      : translator.translate,
        mm     : translator.translate,
        h      : translator.translate,
        hh     : translator.translate,
        d      : 'дан',
        dd     : translator.translate,
        M      : 'месец',
        MM     : translator.translate,
        y      : 'годину',
        yy     : translator.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return srCyrl;

})));


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Serbian [sr]
//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var translator = {
    words: { //Different grammatical cases
        m: ['jedan minut', 'jedne minute'],
        mm: ['minut', 'minute', 'minuta'],
        h: ['jedan sat', 'jednog sata'],
        hh: ['sat', 'sata', 'sati'],
        dd: ['dan', 'dana', 'dana'],
        MM: ['mesec', 'meseca', 'meseci'],
        yy: ['godina', 'godine', 'godina']
    },
    correctGrammaticalCase: function (number, wordKey) {
        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
    },
    translate: function (number, withoutSuffix, key) {
        var wordKey = translator.words[key];
        if (key.length === 1) {
            return withoutSuffix ? wordKey[0] : wordKey[1];
        } else {
            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
        }
    }
};

var sr = moment.defineLocale('sr', {
    months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
    monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
    weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact : true,
    longDateFormat: {
        LT: 'H:mm',
        LTS : 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[danas u] LT',
        nextDay: '[sutra u] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[u] [nedelju] [u] LT';
                case 3:
                    return '[u] [sredu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
            }
        },
        lastDay  : '[juče u] LT',
        lastWeek : function () {
            var lastWeekDays = [
                '[prošle] [nedelje] [u] LT',
                '[prošlog] [ponedeljka] [u] LT',
                '[prošlog] [utorka] [u] LT',
                '[prošle] [srede] [u] LT',
                '[prošlog] [četvrtka] [u] LT',
                '[prošlog] [petka] [u] LT',
                '[prošle] [subote] [u] LT'
            ];
            return lastWeekDays[this.day()];
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'za %s',
        past   : 'pre %s',
        s      : 'nekoliko sekundi',
        m      : translator.translate,
        mm     : translator.translate,
        h      : translator.translate,
        hh     : translator.translate,
        d      : 'dan',
        dd     : translator.translate,
        M      : 'mesec',
        MM     : translator.translate,
        y      : 'godinu',
        yy     : translator.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return sr;

})));


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : siSwati [ss]
//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';



var ss = moment.defineLocale('ss', {
    months : "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
    monthsShort : 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
    weekdays : 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
    weekdaysShort : 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
    weekdaysMin : 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Namuhla nga] LT',
        nextDay : '[Kusasa nga] LT',
        nextWeek : 'dddd [nga] LT',
        lastDay : '[Itolo nga] LT',
        lastWeek : 'dddd [leliphelile] [nga] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'nga %s',
        past : 'wenteka nga %s',
        s : 'emizuzwana lomcane',
        m : 'umzuzu',
        mm : '%d emizuzu',
        h : 'lihora',
        hh : '%d emahora',
        d : 'lilanga',
        dd : '%d emalanga',
        M : 'inyanga',
        MM : '%d tinyanga',
        y : 'umnyaka',
        yy : '%d iminyaka'
    },
    meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'ekuseni';
        } else if (hours < 15) {
            return 'emini';
        } else if (hours < 19) {
            return 'entsambama';
        } else {
            return 'ebusuku';
        }
    },
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'ekuseni') {
            return hour;
        } else if (meridiem === 'emini') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
            if (hour === 0) {
                return 0;
            }
            return hour + 12;
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal : '%d',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return ss;

})));


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Swedish [sv]
//! author : Jens Alm : https://github.com/ulmus

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var sv = moment.defineLocale('sv', {
    months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
    weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
    weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
    weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY [kl.] HH:mm',
        LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
        lll : 'D MMM YYYY HH:mm',
        llll : 'ddd D MMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Idag] LT',
        nextDay: '[Imorgon] LT',
        lastDay: '[Igår] LT',
        nextWeek: '[På] dddd LT',
        lastWeek: '[I] dddd[s] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'om %s',
        past : 'för %s sedan',
        s : 'några sekunder',
        m : 'en minut',
        mm : '%d minuter',
        h : 'en timme',
        hh : '%d timmar',
        d : 'en dag',
        dd : '%d dagar',
        M : 'en månad',
        MM : '%d månader',
        y : 'ett år',
        yy : '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'e' :
            (b === 1) ? 'a' :
            (b === 2) ? 'a' :
            (b === 3) ? 'e' : 'e';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return sv;

})));


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Swahili [sw]
//! author : Fahad Kassim : https://github.com/fadsel

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var sw = moment.defineLocale('sw', {
    months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
    weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
    weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
    weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[leo saa] LT',
        nextDay : '[kesho saa] LT',
        nextWeek : '[wiki ijayo] dddd [saat] LT',
        lastDay : '[jana] LT',
        lastWeek : '[wiki iliyopita] dddd [saat] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s baadaye',
        past : 'tokea %s',
        s : 'hivi punde',
        m : 'dakika moja',
        mm : 'dakika %d',
        h : 'saa limoja',
        hh : 'masaa %d',
        d : 'siku moja',
        dd : 'masiku %d',
        M : 'mwezi mmoja',
        MM : 'miezi %d',
        y : 'mwaka mmoja',
        yy : 'miaka %d'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return sw;

})));


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tamil [ta]
//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '௧',
    '2': '௨',
    '3': '௩',
    '4': '௪',
    '5': '௫',
    '6': '௬',
    '7': '௭',
    '8': '௮',
    '9': '௯',
    '0': '௦'
};
var numberMap = {
    '௧': '1',
    '௨': '2',
    '௩': '3',
    '௪': '4',
    '௫': '5',
    '௬': '6',
    '௭': '7',
    '௮': '8',
    '௯': '9',
    '௦': '0'
};

var ta = moment.defineLocale('ta', {
    months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
    monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
    weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
    weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
    weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, HH:mm',
        LLLL : 'dddd, D MMMM YYYY, HH:mm'
    },
    calendar : {
        sameDay : '[இன்று] LT',
        nextDay : '[நாளை] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[நேற்று] LT',
        lastWeek : '[கடந்த வாரம்] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s இல்',
        past : '%s முன்',
        s : 'ஒரு சில விநாடிகள்',
        m : 'ஒரு நிமிடம்',
        mm : '%d நிமிடங்கள்',
        h : 'ஒரு மணி நேரம்',
        hh : '%d மணி நேரம்',
        d : 'ஒரு நாள்',
        dd : '%d நாட்கள்',
        M : 'ஒரு மாதம்',
        MM : '%d மாதங்கள்',
        y : 'ஒரு வருடம்',
        yy : '%d ஆண்டுகள்'
    },
    dayOfMonthOrdinalParse: /\d{1,2}வது/,
    ordinal : function (number) {
        return number + 'வது';
    },
    preparse: function (string) {
        return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    // refer http://ta.wikipedia.org/s/1er1
    meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
    meridiem : function (hour, minute, isLower) {
        if (hour < 2) {
            return ' யாமம்';
        } else if (hour < 6) {
            return ' வைகறை';  // வைகறை
        } else if (hour < 10) {
            return ' காலை'; // காலை
        } else if (hour < 14) {
            return ' நண்பகல்'; // நண்பகல்
        } else if (hour < 18) {
            return ' எற்பாடு'; // எற்பாடு
        } else if (hour < 22) {
            return ' மாலை'; // மாலை
        } else {
            return ' யாமம்';
        }
    },
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'யாமம்') {
            return hour < 2 ? hour : hour + 12;
        } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
            return hour;
        } else if (meridiem === 'நண்பகல்') {
            return hour >= 10 ? hour : hour + 12;
        } else {
            return hour + 12;
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return ta;

})));


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Telugu [te]
//! author : Krishna Chaitanya Thota : https://github.com/kcthota

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var te = moment.defineLocale('te', {
    months : 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
    monthsShort : 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
    monthsParseExact : true,
    weekdays : 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
    weekdaysShort : 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
    weekdaysMin : 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
    longDateFormat : {
        LT : 'A h:mm',
        LTS : 'A h:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm',
        LLLL : 'dddd, D MMMM YYYY, A h:mm'
    },
    calendar : {
        sameDay : '[నేడు] LT',
        nextDay : '[రేపు] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[నిన్న] LT',
        lastWeek : '[గత] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s లో',
        past : '%s క్రితం',
        s : 'కొన్ని క్షణాలు',
        m : 'ఒక నిమిషం',
        mm : '%d నిమిషాలు',
        h : 'ఒక గంట',
        hh : '%d గంటలు',
        d : 'ఒక రోజు',
        dd : '%d రోజులు',
        M : 'ఒక నెల',
        MM : '%d నెలలు',
        y : 'ఒక సంవత్సరం',
        yy : '%d సంవత్సరాలు'
    },
    dayOfMonthOrdinalParse : /\d{1,2}వ/,
    ordinal : '%dవ',
    meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'రాత్రి') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'ఉదయం') {
            return hour;
        } else if (meridiem === 'మధ్యాహ్నం') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'సాయంత్రం') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'రాత్రి';
        } else if (hour < 10) {
            return 'ఉదయం';
        } else if (hour < 17) {
            return 'మధ్యాహ్నం';
        } else if (hour < 20) {
            return 'సాయంత్రం';
        } else {
            return 'రాత్రి';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return te;

})));


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tetun Dili (East Timor) [tet]
//! author : Joshua Brooks : https://github.com/joshbrooks
//! author : Onorio De J. Afonso : https://github.com/marobo

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var tet = moment.defineLocale('tet', {
    months : 'Janeiru_Fevereiru_Marsu_Abril_Maiu_Juniu_Juliu_Augustu_Setembru_Outubru_Novembru_Dezembru'.split('_'),
    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Aug_Set_Out_Nov_Dez'.split('_'),
    weekdays : 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sexta_Sabadu'.split('_'),
    weekdaysShort : 'Dom_Seg_Ters_Kua_Kint_Sext_Sab'.split('_'),
    weekdaysMin : 'Do_Seg_Te_Ku_Ki_Sex_Sa'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Ohin iha] LT',
        nextDay: '[Aban iha] LT',
        nextWeek: 'dddd [iha] LT',
        lastDay: '[Horiseik iha] LT',
        lastWeek: 'dddd [semana kotuk] [iha] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'iha %s',
        past : '%s liuba',
        s : 'minutu balun',
        m : 'minutu ida',
        mm : 'minutus %d',
        h : 'horas ida',
        hh : 'horas %d',
        d : 'loron ida',
        dd : 'loron %d',
        M : 'fulan ida',
        MM : 'fulan %d',
        y : 'tinan ida',
        yy : 'tinan %d'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return tet;

})));


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Thai [th]
//! author : Kridsada Thanabulpong : https://github.com/sirn

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var th = moment.defineLocale('th', {
    months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
    monthsShort : 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
    monthsParseExact: true,
    weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
    weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
    weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY เวลา H:mm',
        LLLL : 'วันddddที่ D MMMM YYYY เวลา H:mm'
    },
    meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
    isPM: function (input) {
        return input === 'หลังเที่ยง';
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ก่อนเที่ยง';
        } else {
            return 'หลังเที่ยง';
        }
    },
    calendar : {
        sameDay : '[วันนี้ เวลา] LT',
        nextDay : '[พรุ่งนี้ เวลา] LT',
        nextWeek : 'dddd[หน้า เวลา] LT',
        lastDay : '[เมื่อวานนี้ เวลา] LT',
        lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'อีก %s',
        past : '%sที่แล้ว',
        s : 'ไม่กี่วินาที',
        m : '1 นาที',
        mm : '%d นาที',
        h : '1 ชั่วโมง',
        hh : '%d ชั่วโมง',
        d : '1 วัน',
        dd : '%d วัน',
        M : '1 เดือน',
        MM : '%d เดือน',
        y : '1 ปี',
        yy : '%d ปี'
    }
});

return th;

})));


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tagalog (Philippines) [tl-ph]
//! author : Dan Hagman : https://github.com/hagmandan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var tlPh = moment.defineLocale('tl-ph', {
    months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
    monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
    weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
    weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
    weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'MM/D/YYYY',
        LL : 'MMMM D, YYYY',
        LLL : 'MMMM D, YYYY HH:mm',
        LLLL : 'dddd, MMMM DD, YYYY HH:mm'
    },
    calendar : {
        sameDay: 'LT [ngayong araw]',
        nextDay: '[Bukas ng] LT',
        nextWeek: 'LT [sa susunod na] dddd',
        lastDay: 'LT [kahapon]',
        lastWeek: 'LT [noong nakaraang] dddd',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'sa loob ng %s',
        past : '%s ang nakalipas',
        s : 'ilang segundo',
        m : 'isang minuto',
        mm : '%d minuto',
        h : 'isang oras',
        hh : '%d oras',
        d : 'isang araw',
        dd : '%d araw',
        M : 'isang buwan',
        MM : '%d buwan',
        y : 'isang taon',
        yy : '%d taon'
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal : function (number) {
        return number;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return tlPh;

})));


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Klingon [tlh]
//! author : Dominika Kruk : https://github.com/amaranthrose

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

function translateFuture(output) {
    var time = output;
    time = (output.indexOf('jaj') !== -1) ?
    time.slice(0, -3) + 'leS' :
    (output.indexOf('jar') !== -1) ?
    time.slice(0, -3) + 'waQ' :
    (output.indexOf('DIS') !== -1) ?
    time.slice(0, -3) + 'nem' :
    time + ' pIq';
    return time;
}

function translatePast(output) {
    var time = output;
    time = (output.indexOf('jaj') !== -1) ?
    time.slice(0, -3) + 'Hu’' :
    (output.indexOf('jar') !== -1) ?
    time.slice(0, -3) + 'wen' :
    (output.indexOf('DIS') !== -1) ?
    time.slice(0, -3) + 'ben' :
    time + ' ret';
    return time;
}

function translate(number, withoutSuffix, string, isFuture) {
    var numberNoun = numberAsNoun(number);
    switch (string) {
        case 'mm':
            return numberNoun + ' tup';
        case 'hh':
            return numberNoun + ' rep';
        case 'dd':
            return numberNoun + ' jaj';
        case 'MM':
            return numberNoun + ' jar';
        case 'yy':
            return numberNoun + ' DIS';
    }
}

function numberAsNoun(number) {
    var hundred = Math.floor((number % 1000) / 100),
    ten = Math.floor((number % 100) / 10),
    one = number % 10,
    word = '';
    if (hundred > 0) {
        word += numbersNouns[hundred] + 'vatlh';
    }
    if (ten > 0) {
        word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
    }
    if (one > 0) {
        word += ((word !== '') ? ' ' : '') + numbersNouns[one];
    }
    return (word === '') ? 'pagh' : word;
}

var tlh = moment.defineLocale('tlh', {
    months : 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
    monthsShort : 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
    monthsParseExact : true,
    weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[DaHjaj] LT',
        nextDay: '[wa’leS] LT',
        nextWeek: 'LLL',
        lastDay: '[wa’Hu’] LT',
        lastWeek: 'LLL',
        sameElse: 'L'
    },
    relativeTime : {
        future : translateFuture,
        past : translatePast,
        s : 'puS lup',
        m : 'wa’ tup',
        mm : translate,
        h : 'wa’ rep',
        hh : translate,
        d : 'wa’ jaj',
        dd : translate,
        M : 'wa’ jar',
        MM : translate,
        y : 'wa’ DIS',
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return tlh;

})));


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Turkish [tr]
//! authors : Erhan Gundogan : https://github.com/erhangundogan,
//!           Burak Yiğit Kaya: https://github.com/BYK

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var suffixes = {
    1: '\'inci',
    5: '\'inci',
    8: '\'inci',
    70: '\'inci',
    80: '\'inci',
    2: '\'nci',
    7: '\'nci',
    20: '\'nci',
    50: '\'nci',
    3: '\'üncü',
    4: '\'üncü',
    100: '\'üncü',
    6: '\'ncı',
    9: '\'uncu',
    10: '\'uncu',
    30: '\'uncu',
    60: '\'ıncı',
    90: '\'ıncı'
};

var tr = moment.defineLocale('tr', {
    months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
    monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
    weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
    weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
    weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[bugün saat] LT',
        nextDay : '[yarın saat] LT',
        nextWeek : '[gelecek] dddd [saat] LT',
        lastDay : '[dün] LT',
        lastWeek : '[geçen] dddd [saat] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s sonra',
        past : '%s önce',
        s : 'birkaç saniye',
        m : 'bir dakika',
        mm : '%d dakika',
        h : 'bir saat',
        hh : '%d saat',
        d : 'bir gün',
        dd : '%d gün',
        M : 'bir ay',
        MM : '%d ay',
        y : 'bir yıl',
        yy : '%d yıl'
    },
    dayOfMonthOrdinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
    ordinal : function (number) {
        if (number === 0) {  // special case for zero
            return number + '\'ıncı';
        }
        var a = number % 10,
            b = number % 100 - a,
            c = number >= 100 ? 100 : null;
        return number + (suffixes[a] || suffixes[b] || suffixes[c]);
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return tr;

})));


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Talossan [tzl]
//! author : Robin van der Vliet : https://github.com/robin0van0der0v
//! author : Iustì Canun

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


// After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
// This is currently too difficult (maybe even impossible) to add.
var tzl = moment.defineLocale('tzl', {
    months : 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
    monthsShort : 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
    weekdays : 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
    weekdaysShort : 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
    weekdaysMin : 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM [dallas] YYYY',
        LLL : 'D. MMMM [dallas] YYYY HH.mm',
        LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
    },
    meridiemParse: /d\'o|d\'a/i,
    isPM : function (input) {
        return 'd\'o' === input.toLowerCase();
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'd\'o' : 'D\'O';
        } else {
            return isLower ? 'd\'a' : 'D\'A';
        }
    },
    calendar : {
        sameDay : '[oxhi à] LT',
        nextDay : '[demà à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[ieiri à] LT',
        lastWeek : '[sür el] dddd [lasteu à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'osprei %s',
        past : 'ja%s',
        s : processRelativeTime,
        m : processRelativeTime,
        mm : processRelativeTime,
        h : processRelativeTime,
        hh : processRelativeTime,
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        's': ['viensas secunds', '\'iensas secunds'],
        'm': ['\'n míut', '\'iens míut'],
        'mm': [number + ' míuts', '' + number + ' míuts'],
        'h': ['\'n þora', '\'iensa þora'],
        'hh': [number + ' þoras', '' + number + ' þoras'],
        'd': ['\'n ziua', '\'iensa ziua'],
        'dd': [number + ' ziuas', '' + number + ' ziuas'],
        'M': ['\'n mes', '\'iens mes'],
        'MM': [number + ' mesen', '' + number + ' mesen'],
        'y': ['\'n ar', '\'iens ar'],
        'yy': [number + ' ars', '' + number + ' ars']
    };
    return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
}

return tzl;

})));


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Central Atlas Tamazight Latin [tzm-latn]
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var tzmLatn = moment.defineLocale('tzm-latn', {
    months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
    monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
    weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
    weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
    weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[asdkh g] LT',
        nextDay: '[aska g] LT',
        nextWeek: 'dddd [g] LT',
        lastDay: '[assant g] LT',
        lastWeek: 'dddd [g] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'dadkh s yan %s',
        past : 'yan %s',
        s : 'imik',
        m : 'minuḍ',
        mm : '%d minuḍ',
        h : 'saɛa',
        hh : '%d tassaɛin',
        d : 'ass',
        dd : '%d ossan',
        M : 'ayowr',
        MM : '%d iyyirn',
        y : 'asgas',
        yy : '%d isgasn'
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return tzmLatn;

})));


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Central Atlas Tamazight [tzm]
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var tzm = moment.defineLocale('tzm', {
    months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
    monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
    weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS: 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
        nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
        nextWeek: 'dddd [ⴴ] LT',
        lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
        lastWeek: 'dddd [ⴴ] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
        past : 'ⵢⴰⵏ %s',
        s : 'ⵉⵎⵉⴽ',
        m : 'ⵎⵉⵏⵓⴺ',
        mm : '%d ⵎⵉⵏⵓⴺ',
        h : 'ⵙⴰⵄⴰ',
        hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
        d : 'ⴰⵙⵙ',
        dd : '%d oⵙⵙⴰⵏ',
        M : 'ⴰⵢoⵓⵔ',
        MM : '%d ⵉⵢⵢⵉⵔⵏ',
        y : 'ⴰⵙⴳⴰⵙ',
        yy : '%d ⵉⵙⴳⴰⵙⵏ'
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return tzm;

})));


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Ukrainian [uk]
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion Elensúle : https://github.com/Oire

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
        'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
        'dd': 'день_дні_днів',
        'MM': 'місяць_місяці_місяців',
        'yy': 'рік_роки_років'
    };
    if (key === 'm') {
        return withoutSuffix ? 'хвилина' : 'хвилину';
    }
    else if (key === 'h') {
        return withoutSuffix ? 'година' : 'годину';
    }
    else {
        return number + ' ' + plural(format[key], +number);
    }
}
function weekdaysCaseReplace(m, format) {
    var weekdays = {
        'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
        'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
        'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
    };

    if (!m) {
        return weekdays['nominative'];
    }

    var nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
        'accusative' :
        ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
            'genitive' :
            'nominative');
    return weekdays[nounCase][m.day()];
}
function processHoursFunction(str) {
    return function () {
        return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
    };
}

var uk = moment.defineLocale('uk', {
    months : {
        'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
        'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
    },
    monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
    weekdays : weekdaysCaseReplace,
    weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY р.',
        LLL : 'D MMMM YYYY р., HH:mm',
        LLLL : 'dddd, D MMMM YYYY р., HH:mm'
    },
    calendar : {
        sameDay: processHoursFunction('[Сьогодні '),
        nextDay: processHoursFunction('[Завтра '),
        lastDay: processHoursFunction('[Вчора '),
        nextWeek: processHoursFunction('[У] dddd ['),
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return processHoursFunction('[Минулої] dddd [').call(this);
                case 1:
                case 2:
                case 4:
                    return processHoursFunction('[Минулого] dddd [').call(this);
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'за %s',
        past : '%s тому',
        s : 'декілька секунд',
        m : relativeTimeWithPlural,
        mm : relativeTimeWithPlural,
        h : 'годину',
        hh : relativeTimeWithPlural,
        d : 'день',
        dd : relativeTimeWithPlural,
        M : 'місяць',
        MM : relativeTimeWithPlural,
        y : 'рік',
        yy : relativeTimeWithPlural
    },
    // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
    meridiemParse: /ночі|ранку|дня|вечора/,
    isPM: function (input) {
        return /^(дня|вечора)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ночі';
        } else if (hour < 12) {
            return 'ранку';
        } else if (hour < 17) {
            return 'дня';
        } else {
            return 'вечора';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
            case 'w':
            case 'W':
                return number + '-й';
            case 'D':
                return number + '-го';
            default:
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return uk;

})));


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Urdu [ur]
//! author : Sawood Alam : https://github.com/ibnesayeed
//! author : Zack : https://github.com/ZackVision

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = [
    'جنوری',
    'فروری',
    'مارچ',
    'اپریل',
    'مئی',
    'جون',
    'جولائی',
    'اگست',
    'ستمبر',
    'اکتوبر',
    'نومبر',
    'دسمبر'
];
var days = [
    'اتوار',
    'پیر',
    'منگل',
    'بدھ',
    'جمعرات',
    'جمعہ',
    'ہفتہ'
];

var ur = moment.defineLocale('ur', {
    months : months,
    monthsShort : months,
    weekdays : days,
    weekdaysShort : days,
    weekdaysMin : days,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd، D MMMM YYYY HH:mm'
    },
    meridiemParse: /صبح|شام/,
    isPM : function (input) {
        return 'شام' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'صبح';
        }
        return 'شام';
    },
    calendar : {
        sameDay : '[آج بوقت] LT',
        nextDay : '[کل بوقت] LT',
        nextWeek : 'dddd [بوقت] LT',
        lastDay : '[گذشتہ روز بوقت] LT',
        lastWeek : '[گذشتہ] dddd [بوقت] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s بعد',
        past : '%s قبل',
        s : 'چند سیکنڈ',
        m : 'ایک منٹ',
        mm : '%d منٹ',
        h : 'ایک گھنٹہ',
        hh : '%d گھنٹے',
        d : 'ایک دن',
        dd : '%d دن',
        M : 'ایک ماہ',
        MM : '%d ماہ',
        y : 'ایک سال',
        yy : '%d سال'
    },
    preparse: function (string) {
        return string.replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/,/g, '،');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return ur;

})));


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Uzbek Latin [uz-latn]
//! author : Rasulbek Mirzayev : github.com/Rasulbeeek

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var uzLatn = moment.defineLocale('uz-latn', {
    months : 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split('_'),
    monthsShort : 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
    weekdays : 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
    weekdaysShort : 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
    weekdaysMin : 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'D MMMM YYYY, dddd HH:mm'
    },
    calendar : {
        sameDay : '[Bugun soat] LT [da]',
        nextDay : '[Ertaga] LT [da]',
        nextWeek : 'dddd [kuni soat] LT [da]',
        lastDay : '[Kecha soat] LT [da]',
        lastWeek : '[O\'tgan] dddd [kuni soat] LT [da]',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'Yaqin %s ichida',
        past : 'Bir necha %s oldin',
        s : 'soniya',
        m : 'bir daqiqa',
        mm : '%d daqiqa',
        h : 'bir soat',
        hh : '%d soat',
        d : 'bir kun',
        dd : '%d kun',
        M : 'bir oy',
        MM : '%d oy',
        y : 'bir yil',
        yy : '%d yil'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return uzLatn;

})));


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Uzbek [uz]
//! author : Sardor Muminov : https://github.com/muminoff

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var uz = moment.defineLocale('uz', {
    months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
    monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
    weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
    weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
    weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'D MMMM YYYY, dddd HH:mm'
    },
    calendar : {
        sameDay : '[Бугун соат] LT [да]',
        nextDay : '[Эртага] LT [да]',
        nextWeek : 'dddd [куни соат] LT [да]',
        lastDay : '[Кеча соат] LT [да]',
        lastWeek : '[Утган] dddd [куни соат] LT [да]',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'Якин %s ичида',
        past : 'Бир неча %s олдин',
        s : 'фурсат',
        m : 'бир дакика',
        mm : '%d дакика',
        h : 'бир соат',
        hh : '%d соат',
        d : 'бир кун',
        dd : '%d кун',
        M : 'бир ой',
        MM : '%d ой',
        y : 'бир йил',
        yy : '%d йил'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 4th is the first week of the year.
    }
});

return uz;

})));


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Vietnamese [vi]
//! author : Bang Nguyen : https://github.com/bangnk

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var vi = moment.defineLocale('vi', {
    months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
    monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
    monthsParseExact : true,
    weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
    weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysParseExact : true,
    meridiemParse: /sa|ch/i,
    isPM : function (input) {
        return /^ch$/i.test(input);
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 12) {
            return isLower ? 'sa' : 'SA';
        } else {
            return isLower ? 'ch' : 'CH';
        }
    },
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM [năm] YYYY',
        LLL : 'D MMMM [năm] YYYY HH:mm',
        LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
        l : 'DD/M/YYYY',
        ll : 'D MMM YYYY',
        lll : 'D MMM YYYY HH:mm',
        llll : 'ddd, D MMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Hôm nay lúc] LT',
        nextDay: '[Ngày mai lúc] LT',
        nextWeek: 'dddd [tuần tới lúc] LT',
        lastDay: '[Hôm qua lúc] LT',
        lastWeek: 'dddd [tuần rồi lúc] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : '%s tới',
        past : '%s trước',
        s : 'vài giây',
        m : 'một phút',
        mm : '%d phút',
        h : 'một giờ',
        hh : '%d giờ',
        d : 'một ngày',
        dd : '%d ngày',
        M : 'một tháng',
        MM : '%d tháng',
        y : 'một năm',
        yy : '%d năm'
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal : function (number) {
        return number;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return vi;

})));


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Pseudo [x-pseudo]
//! author : Andrew Hood : https://github.com/andrewhood125

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var xPseudo = moment.defineLocale('x-pseudo', {
    months : 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
    monthsShort : 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
    monthsParseExact : true,
    weekdays : 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
    weekdaysShort : 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
    weekdaysMin : 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[T~ódá~ý át] LT',
        nextDay : '[T~ómó~rró~w át] LT',
        nextWeek : 'dddd [át] LT',
        lastDay : '[Ý~ést~érdá~ý át] LT',
        lastWeek : '[L~ást] dddd [át] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'í~ñ %s',
        past : '%s á~gó',
        s : 'á ~féw ~sécó~ñds',
        m : 'á ~míñ~úté',
        mm : '%d m~íñú~tés',
        h : 'á~ñ hó~úr',
        hh : '%d h~óúrs',
        d : 'á ~dáý',
        dd : '%d d~áýs',
        M : 'á ~móñ~th',
        MM : '%d m~óñt~hs',
        y : 'á ~ýéár',
        yy : '%d ý~éárs'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return xPseudo;

})));


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Yoruba Nigeria [yo]
//! author : Atolagbe Abisoye : https://github.com/andela-batolagbe

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var yo = moment.defineLocale('yo', {
    months : 'Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀'.split('_'),
    monthsShort : 'Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀'.split('_'),
    weekdays : 'Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta'.split('_'),
    weekdaysShort : 'Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá'.split('_'),
    weekdaysMin : 'Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Ònì ni] LT',
        nextDay : '[Ọ̀la ni] LT',
        nextWeek : 'dddd [Ọsẹ̀ tón\'bọ] [ni] LT',
        lastDay : '[Àna ni] LT',
        lastWeek : 'dddd [Ọsẹ̀ tólọ́] [ni] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'ní %s',
        past : '%s kọjá',
        s : 'ìsẹjú aayá die',
        m : 'ìsẹjú kan',
        mm : 'ìsẹjú %d',
        h : 'wákati kan',
        hh : 'wákati %d',
        d : 'ọjọ́ kan',
        dd : 'ọjọ́ %d',
        M : 'osù kan',
        MM : 'osù %d',
        y : 'ọdún kan',
        yy : 'ọdún %d'
    },
    dayOfMonthOrdinalParse : /ọjọ́\s\d{1,2}/,
    ordinal : 'ọjọ́ %d',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4 // The week that contains Jan 4th is the first week of the year.
    }
});

return yo;

})));


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chinese (China) [zh-cn]
//! author : suupic : https://github.com/suupic
//! author : Zeno Zeng : https://github.com/zenozeng

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var zhCn = moment.defineLocale('zh-cn', {
    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY年MMMD日',
        LL : 'YYYY年MMMD日',
        LLL : 'YYYY年MMMD日Ah点mm分',
        LLLL : 'YYYY年MMMD日ddddAh点mm分',
        l : 'YYYY年MMMD日',
        ll : 'YYYY年MMMD日',
        lll : 'YYYY年MMMD日 HH:mm',
        llll : 'YYYY年MMMD日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
                meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime : {
        future : '%s内',
        past : '%s前',
        s : '几秒',
        m : '1 分钟',
        mm : '%d 分钟',
        h : '1 小时',
        hh : '%d 小时',
        d : '1 天',
        dd : '%d 天',
        M : '1 个月',
        MM : '%d 个月',
        y : '1 年',
        yy : '%d 年'
    },
    week : {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return zhCn;

})));


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chinese (Hong Kong) [zh-hk]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris
//! author : Konstantin : https://github.com/skfd

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var zhHk = moment.defineLocale('zh-hk', {
    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY年MMMD日',
        LL : 'YYYY年MMMD日',
        LLL : 'YYYY年MMMD日 HH:mm',
        LLLL : 'YYYY年MMMD日dddd HH:mm',
        l : 'YYYY年MMMD日',
        ll : 'YYYY年MMMD日',
        lll : 'YYYY年MMMD日 HH:mm',
        llll : 'YYYY年MMMD日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
            return hour;
        } else if (meridiem === '中午') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd' :
            case 'D' :
            case 'DDD' :
                return number + '日';
            case 'M' :
                return number + '月';
            case 'w' :
            case 'W' :
                return number + '週';
            default :
                return number;
        }
    },
    relativeTime : {
        future : '%s內',
        past : '%s前',
        s : '幾秒',
        m : '1 分鐘',
        mm : '%d 分鐘',
        h : '1 小時',
        hh : '%d 小時',
        d : '1 天',
        dd : '%d 天',
        M : '1 個月',
        MM : '%d 個月',
        y : '1 年',
        yy : '%d 年'
    }
});

return zhHk;

})));


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chinese (Taiwan) [zh-tw]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var zhTw = moment.defineLocale('zh-tw', {
    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY年MMMD日',
        LL : 'YYYY年MMMD日',
        LLL : 'YYYY年MMMD日 HH:mm',
        LLLL : 'YYYY年MMMD日dddd HH:mm',
        l : 'YYYY年MMMD日',
        ll : 'YYYY年MMMD日',
        lll : 'YYYY年MMMD日 HH:mm',
        llll : 'YYYY年MMMD日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
            return hour;
        } else if (meridiem === '中午') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd' :
            case 'D' :
            case 'DDD' :
                return number + '日';
            case 'M' :
                return number + '月';
            case 'w' :
            case 'W' :
                return number + '週';
            default :
                return number;
        }
    },
    relativeTime : {
        future : '%s內',
        past : '%s前',
        s : '幾秒',
        m : '1 分鐘',
        mm : '%d 分鐘',
        h : '1 小時',
        hh : '%d 小時',
        d : '1 天',
        dd : '%d 天',
        M : '1 個月',
        MM : '%d 個月',
        y : '1 年',
        yy : '%d 年'
    }
});

return zhTw;

})));


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var touchStyles = {
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  cursor: 'pointer'
};

module.exports = touchStyles;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navConfig = exports.Header = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = __webpack_require__(4);

var _dgxFeatureFlags = __webpack_require__(18);

var _dgxFeatureFlags2 = _interopRequireDefault(_dgxFeatureFlags);

var _dgxSkipNavigationLink = __webpack_require__(177);

var _dgxSkipNavigationLink2 = _interopRequireDefault(_dgxSkipNavigationLink);

var _navConfig = __webpack_require__(171);

var _navConfig2 = _interopRequireDefault(_navConfig);

var _featureFlagConfig = __webpack_require__(170);

var _featureFlagConfig2 = _interopRequireDefault(_featureFlagConfig);

var _appConfig = __webpack_require__(7);

var _appConfig2 = _interopRequireDefault(_appConfig);

var _Logo = __webpack_require__(161);

var _Logo2 = _interopRequireDefault(_Logo);

var _DonateButton = __webpack_require__(14);

var _DonateButton2 = _interopRequireDefault(_DonateButton);

var _SimpleLink = __webpack_require__(159);

var _SimpleLink2 = _interopRequireDefault(_SimpleLink);

var _SubscribeButton = __webpack_require__(169);

var _SubscribeButton2 = _interopRequireDefault(_SubscribeButton);

var _MyNyplButton = __webpack_require__(164);

var _MyNyplButton2 = _interopRequireDefault(_MyNyplButton);

var _NavMenu = __webpack_require__(15);

var _NavMenu2 = _interopRequireDefault(_NavMenu);

var _MobileHeader = __webpack_require__(158);

var _MobileHeader2 = _interopRequireDefault(_MobileHeader);

var _GlobalAlerts = __webpack_require__(157);

var _GlobalAlerts2 = _interopRequireDefault(_GlobalAlerts);

var _FundraisingBanner = __webpack_require__(156);

var _FundraisingBanner2 = _interopRequireDefault(_FundraisingBanner);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _encoreCatalogLogOutTimer = __webpack_require__(172);

var _encoreCatalogLogOutTimer2 = _interopRequireDefault(_encoreCatalogLogOutTimer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // NPM Modules

// Feature FeatureFlags


// Nav Config


// NYPL Components

// Utility Library


var styles = {
  wrapper: {
    position: 'relative'
  },
  topButtons: {
    position: 'absolute',
    top: '20px',
    textTransform: 'uppercase',
    display: 'block'
  },
  locationsTopLink: {
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF',
    padding: '12px',
    verticalAlign: 'baseline'
  },
  libraryCardButton: {
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF',
    padding: '12px',
    verticalAlign: 'baseline'
  },
  subscribeButton: {
    display: 'inline-block',
    margin: '0px 10px 0px 0px',
    verticalAlign: 'baseline'
  },
  donateButton: {
    display: 'inline-block',
    padding: '10px 18px',
    margin: '0 5px 0 0',
    lineHeight: 'normal',
    verticalAlign: 'baseline'
  },
  shopLink: {
    color: '#000',
    backgroundColor: '#FFF',
    padding: '10px 15px',
    margin: '0 0 0 5px',
    verticalAlign: 'baseline'
  },
  mobileMyNypl: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '220px',
    minHeight: '130px',
    backgroundColor: '#1B7FA7',
    padding: '25px 30px'
  }
};

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    var _this$props = _this.props,
        patron = _this$props.patron,
        navData = _this$props.navData,
        _this$props$currentTi = _this$props.currentTime,
        currentTime = _this$props$currentTi === undefined ? Date.now() || undefined : _this$props$currentTi,
        _this$props$isTest = _this$props.isTest,
        isTest = _this$props$isTest === undefined ? false : _this$props$isTest;


    var patronNameObject = !(0, _underscore.isEmpty)(patron) && patron.names && patron.names.length ? _utils2.default.modelPatronName(patron.names[0]) : {};

    _this.state = (0, _underscore.extend)({
      navData: navData,
      loginCookieName: 'nyplIdentityPatron',
      loginCookieValue: null,
      patronName: patronNameObject.name || '',
      patronInitial: patronNameObject.initial || '',
      patronDataReceived: patron.loggedIn || false,
      isFeatureFlagsActivated: {},
      logOutUrl: '',
      currentTime: currentTime,
      isTest: isTest
    }, { featureFlagsStore: _dgxFeatureFlags2.default.store.getState() });
    return _this;
  }

  _createClass(Header, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Listen on FeatureFlags Store updates
      _dgxFeatureFlags2.default.store.listen(this.onFeatureFlagsChange.bind(this));
      // Set the log out link to state
      this.setLogOutLink(window.location.href);
      // Set the timer to log out the user from Encore and Catalog
      // (mainly for Encore while Catalog as a side effect)
      _encoreCatalogLogOutTimer2.default.setEncoreLoggedInTimer(window.location.host, this.state.currentTime, this.state.isTest);
      // Set nyplIdentityPatron cookie to the state.
      this.setLoginCookie(this.state.loginCookieName);
      // Set feature flag cookies to the state
      // We don't have any feature flags set in the config list at this moment though
      _utils2.default.checkFeatureFlagActivated(_featureFlagConfig2.default.featureFlagList, this.state.isFeatureFlagsActivated);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Listen on FeatureFlags Store updates
      _dgxFeatureFlags2.default.store.unlisten(this.onFeatureFlagsChange.bind(this));
      // Removing event listener to minimize garbage collection
    }
  }, {
    key: 'onFeatureFlagsChange',
    value: function onFeatureFlagsChange() {
      this.setState({ featureFlagsStore: _dgxFeatureFlags2.default.store.getState() });
    }

    /**
     * setLoginCookie()
     * Updates the state loginCookieValue property
     */

  }, {
    key: 'setLoginCookie',
    value: function setLoginCookie(cookie) {
      if (_utils2.default.hasCookie(cookie)) {
        var loginCookieValue = _utils2.default.getCookie(cookie);

        this.setState({ loginCookieValue: loginCookieValue });

        if (!this.state.patronDataReceived) {
          this.fetchPatronData(loginCookieValue);
        }
      } else {
        this.setState({ loginCookieValue: null });
      }
    }

    /**
     * setLogOutLink(location)
     * Generate the full log out url including the redirect URI, and update the state with it.
     * @param {location} - The URI for redirect request
     */

  }, {
    key: 'setLogOutLink',
    value: function setLogOutLink(location) {
      this.setState({ logOutUrl: _utils2.default.renderDynamicLogOutLink(location) });
    }

    /**
     * fetchPatronData(cookie)
     * Executes utils.getLoginData to fetch patron's data based on the cookie.
     * Updates the state with the results.
     * Also, pass this.setLoginCookie(), if cookie needs to be refreshed and set again.
     * @param {cookie} - The cookie returned from log in.
     */

  }, {
    key: 'fetchPatronData',
    value: function fetchPatronData(cookie) {
      var _this2 = this;

      _utils2.default.getLoginData(cookie, function (result) {
        if (result.data && result.data.data) {
          var patronNameObject = _utils2.default.modelPatronName(_utils2.default.extractPatronName(result.data));

          _this2.setState({
            patronName: patronNameObject.name,
            patronInitial: patronNameObject.initial,
            patronDataReceived: true
          });
        }
      }, _appConfig2.default.loginMyNyplLinks.tokenRefreshLink, function () {
        _this2.setLoginCookie(_this2.state.loginCookieName);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var headerClass = this.props.className;
      var skipNav = this.props.skipNav ? _react2.default.createElement(_dgxSkipNavigationLink2.default, this.props.skipNav) : '';
      var isLoggedIn = !!this.state.patronDataReceived;

      return _react2.default.createElement(
        'header',
        {
          id: this.props.id,
          className: headerClass
        },
        skipNav,
        _react2.default.createElement(_GlobalAlerts2.default, { className: headerClass + '-globalAlerts' }),
        _react2.default.createElement(
          'div',
          { className: headerClass + '-wrapper' },
          _react2.default.createElement(_MobileHeader2.default, {
            className: headerClass + '-mobile',
            locatorUrl: this.props.urlType === 'absolute' ? '//www.nypl.org/locations/map?nearme=true' : '/locations/map?nearme=true',
            nyplRootUrl: this.props.urlType === 'absolute' ? '//www.nypl.org' : '/',
            isLoggedIn: isLoggedIn,
            patronName: this.state.patronName,
            logOutLink: this.state.logOutUrl,
            navData: this.props.navData,
            urlType: this.props.urlType
          }),
          _react2.default.createElement(
            'div',
            {
              className: headerClass + '-topWrapper',
              style: styles.wrapper
            },
            _react2.default.createElement(_Logo2.default, {
              className: headerClass + '-logo',
              target: this.props.urlType === 'absolute' ? '//www.nypl.org' : '/'
            }),
            _react2.default.createElement(
              'nav',
              {
                className: headerClass + '-buttons',
                style: styles.topButtons,
                'aria-label': 'Header top links'
              },
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_MyNyplButton2.default, {
                    refId: 'desktopLogin',
                    isLoggedIn: isLoggedIn,
                    patronName: this.state.patronName,
                    logOutLink: this.state.logOutUrl,
                    gaAction: isLoggedIn ? 'My Account' : 'Log In'
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_SimpleLink2.default, {
                    label: 'Locations',
                    target: this.props.urlType === 'absolute' ? '//www.nypl.org/locations/map' : '/locations/map',
                    className: 'locationsTopLink',
                    id: 'locationsTopLink',
                    gaAction: 'Locations',
                    gaLabel: 'Header Top Links',
                    style: styles.locationsTopLink
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_SimpleLink2.default, {
                    label: 'Get a Library Card',
                    target: this.props.urlType === 'absolute' ? '//www.nypl.org/library-card' : '/library-card',
                    className: 'libraryCardButton',
                    id: 'libraryCardButton',
                    gaAction: 'Get a Library Card',
                    gaLabel: 'Header Top Links',
                    style: styles.libraryCardButton
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_SubscribeButton2.default, {
                    label: 'Get Email Updates',
                    lang: this.props.lang,
                    style: styles.subscribeButton
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_DonateButton2.default, {
                    id: 'donateButton',
                    lang: this.props.lang,
                    style: styles.donateButton,
                    gaLabel: 'Header Top Links'
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_SimpleLink2.default, {
                    label: 'Shop',
                    target: 'http://shop.nypl.org/?utm_campaign=NYPLHeaderButton&utm_' + 'source=nypl.org&utm_medium=referral',
                    className: 'shopTopLink',
                    id: 'shopTopLink',
                    gaAction: 'Shop',
                    gaLabel: 'Header Top Links',
                    style: styles.shopLink
                  })
                )
              )
            )
          ),
          _react2.default.createElement(_NavMenu2.default, {
            className: headerClass + '-navMenu',
            lang: this.props.lang,
            items: this.state.navData,
            urlType: this.props.urlType,
            isLoggedIn: isLoggedIn,
            patronName: this.state.patronName,
            logOutLink: this.state.logOutUrl
          })
        ),
        _dgxFeatureFlags2.default.store._isFeatureActive(_appConfig2.default.fundraising.experimentName) && _react2.default.createElement(_FundraisingBanner2.default, {
          hideBannerCookieName: 'closeFundraiserBanner',
          gaLabel: 'Header Fundraising Banner'
        })
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

Header.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  navData: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  skipNav: _propTypes2.default.shape(_dgxSkipNavigationLink2.default.propTypes),
  currentTime: _propTypes2.default.number,
  isTest: _propTypes2.default.bool,
  patron: _propTypes2.default.shape({
    names: _propTypes2.default.arrayOf(_propTypes2.default.string),
    loggedIn: _propTypes2.default.bool
  }),
  urlType: _propTypes2.default.string
};

Header.defaultProps = {
  lang: 'en',
  className: 'header',
  id: 'nyplHeader',
  skipNav: null,
  urlType: 'relative',
  patron: {}
};

exports.Header = Header;
exports.navConfig = _navConfig2.default;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(142);
var utils = __webpack_require__(6);
var dispatchRequest = __webpack_require__(141);
var InterceptorManager = __webpack_require__(140);
var isAbsoluteURL = __webpack_require__(148);
var combineURLs = __webpack_require__(146);
var bind = __webpack_require__(143);
var transformData = __webpack_require__(13);

function Axios(defaultConfig) {
  this.defaults = utils.merge({}, defaultConfig);
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Don't allow overriding defaults.withCredentials
  config.withCredentials = config.withCredentials || this.defaults.withCredentials;

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

var defaultInstance = new Axios(defaults);
var axios = module.exports = bind(Axios.prototype.request, defaultInstance);

axios.create = function create(defaultConfig) {
  return new Axios(defaultConfig);
};

// Expose defaults
axios.defaults = defaultInstance.defaults;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(151);

// Expose interceptors
axios.interceptors = defaultInstance.interceptors;

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
  axios[method] = bind(Axios.prototype[method], defaultInstance);
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
  axios[method] = bind(Axios.prototype[method], defaultInstance);
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/**
 * Dispatch a request to the server using whichever adapter
 * is supported by the current environment.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  return new Promise(function executor(resolve, reject) {
    try {
      var adapter;

      if (typeof config.adapter === 'function') {
        // For custom adapter support
        adapter = config.adapter;
      } else if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = __webpack_require__(12);
      } else if (typeof process !== 'undefined') {
        // For node use HTTP adapter
        adapter = __webpack_require__(12);
      }

      if (typeof adapter === 'function') {
        adapter(resolve, reject, config);
      }
    } catch (e) {
      reject(e);
    }
  });
};


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(181)))

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

module.exports = {
  transformRequest: [function transformResponseJSON(data, headers) {
    if (utils.isFormData(data)) {
      return data;
    }
    if (utils.isArrayBuffer(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
      // Set application/json if no Content-Type has been specified
      if (!utils.isUndefined(headers)) {
        utils.forEach(headers, function processContentTypeHeader(val, key) {
          if (key.toLowerCase() === 'content-type') {
            headers['Content-Type'] = val;
          }
        });

        if (utils.isUndefined(headers['Content-Type'])) {
          headers['Content-Type'] = 'application/json;charset=utf-8';
        }
      }
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponseJSON(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    },
    patch: utils.merge(DEFAULT_CONTENT_TYPE),
    post: utils.merge(DEFAULT_CONTENT_TYPE),
    put: utils.merge(DEFAULT_CONTENT_TYPE)
  },

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}
InvalidCharacterError.prototype = new Error;
InvalidCharacterError.prototype.code = 5;
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new InvalidCharacterError('INVALID_CHARACTER_ERR: DOM Exception 5');
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};



/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var accountConfig = {
  // the duration of time is in milliseconds
  patLoggedInCookieExpiredTime: 1800000
};

exports.default = accountConfig;
module.exports = exports["default"];

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertsBox = function AlertsBox(_ref) {
  var className = _ref.className,
      id = _ref.id,
      lang = _ref.lang,
      style = _ref.style,
      alerts = _ref.alerts;

  var alertItems = (0, _underscore.map)(alerts, function (item, index) {
    var alertDescription = item.attributes['alert-text'][lang];
    return _react2.default.createElement('div', {
      key: index,
      className: className + '-item',
      dangerouslySetInnerHTML: { __html: alertDescription.text }
    });
  });

  return _react2.default.createElement(
    'div',
    {
      className: className,
      id: id,
      style: style
    },
    alertItems
  );
};

AlertsBox.propTypes = {
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  lang: _propTypes2.default.string,
  style: _propTypes2.default.object,
  alerts: _propTypes2.default.array
};

AlertsBox.defaultProps = {
  lang: 'en',
  className: 'alertsBox',
  id: 'alertsBox'
};

exports.default = AlertsBox;
module.exports = exports['default'];

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _classnames = __webpack_require__(11);

var _classnames2 = _interopRequireDefault(_classnames);

var _underscore = __webpack_require__(4);

var _dgxSvgIcons = __webpack_require__(5);

var _appConfig = __webpack_require__(7);

var _appConfig2 = _interopRequireDefault(_appConfig);

var _SocialMediaLinksWidget = __webpack_require__(168);

var _SocialMediaLinksWidget2 = _interopRequireDefault(_SocialMediaLinksWidget);

var _SubscribeMessageBox = __webpack_require__(155);

var _SubscribeMessageBox2 = _interopRequireDefault(_SubscribeMessageBox);

var _DotsLoader = __webpack_require__(160);

var _DotsLoader2 = _interopRequireDefault(_DotsLoader);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  base: {
    backgroundColor: '#1B7FA7',
    padding: '0px',
    width: 'auto'
  },
  submitButton: {
    backgroundColor: '#1B7FA7',
    border: '2px solid #FFF',
    color: '#FFF',
    fontFamily: 'Kievit-Book',
    fontSize: '0.875em',
    height: '38px',
    margin: '60px 0 0 0',
    padding: '0 0 0 21px',
    lineHeight: 'normal',
    width: '100px'
  },
  tryAgainButton: {
    display: 'inline-block',
    border: '2px solid #fff',
    color: 'white',
    padding: '5px 15px 5px 5px',
    width: '90px',
    fontSize: '0.875em',
    backgroundColor: '#1B7FA7',
    fontFamily: 'Kievit-Book',
    marginTop: '25px'
  },
  privacyLink: {
    backgroundColor: '#1B7FA7',
    color: '#FFF',
    fontSize: '0.875em',
    fontWeight: '400',
    position: 'relative',
    textDecoration: 'underline'
  },
  scLink: {
    backgroundColor: '#1B7FA7',
    color: '#FFF',
    fontSize: '0.875em',
    fontWeight: '400',
    position: 'relative',
    textDecoration: 'underline'
  },
  emailFormLabel: {
    color: '#FFF',
    margin: '15px 0 0 0',
    display: 'inline-block'
  }
};

var EmailSubscription = function (_React$Component) {
  _inherits(EmailSubscription, _React$Component);

  function EmailSubscription(props) {
    _classCallCheck(this, EmailSubscription);

    var _this = _possibleConstructorReturn(this, (EmailSubscription.__proto__ || Object.getPrototypeOf(EmailSubscription)).call(this, props));

    _this.state = {
      formProcessing: false,
      formStatus: '',
      notValidEmail: false
    };

    _this.validateForm = _this.validateForm.bind(_this);
    _this.initForm = _this.initForm.bind(_this);
    return _this;
  }

  _createClass(EmailSubscription, [{
    key: 'initForm',
    value: function initForm(e) {
      e.preventDefault();
      this.setState({
        formProcessing: false,
        formStatus: ''
      });
    }

    // Store changes are funky, need to look into it
    /* _onChange () {
      this.setState({formStatus: HeaderStore.getSubscribeFormStatus()});
    } */

  }, {
    key: 'validateForm',
    value: function validateForm(e) {
      // Prevent re-direct, handle validation
      e.preventDefault();
      var userInput = _reactDom2.default.findDOMNode(this.refs.emailAddressField);

      if (!this.isValidEmail(userInput.value)) {
        userInput.value = '';
        userInput.focus();
        this.setState({
          notValidEmail: true
        });
      } else {
        this.setState({
          notValidEmail: false
        });

        // Send as a POST request
        this.addSubscriberToList(userInput.value, this.props.target, this.props.listId);
      }
    }
  }, {
    key: 'isValidEmail',
    value: function isValidEmail(value) {
      var emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
      if (!value) {
        return false;
      }
      return emailRegex.test(value);
    }
  }, {
    key: 'addSubscriberToList',
    value: function addSubscriberToList(userEmail, url, listid) {
      var _this2 = this;

      var postUrl = url + '/add-subscriber/' + listid;

      // Display loader while processing finalizes.
      this.setState({ formProcessing: true });

      _axios2.default.post(postUrl, {
        email: userEmail
      }).then(function (response) {
        _this2.setState({
          formStatus: response.data.responseStatus,
          formProcessing: false
        });
      }).catch(function (response) {
        _this2.setState({
          formStatus: response.data.responseStatus || response.statusText,
          formProcessing: false
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var status = this.state.formStatus;
      var isLoading = this.state.formProcessing;
      var notValidEmail = this.state.notValidEmail;
      var formClass = 'emailSubscribeForm';
      var emailAddressField = 'emailAddressField';
      var errorClass = (0, _classnames2.default)({ active: notValidEmail });
      var subscribeContent = void 0;

      if (!isLoading) {
        // The default view
        subscribeContent = _react2.default.createElement(
          'div',
          { role: 'dialog' },
          _react2.default.createElement(
            'div',
            { className: 'subscribeMessageBox ' + status, tabIndex: '0' },
            _react2.default.createElement('div', { className: 'subscribeMessageBox-eyebrow' }),
            _react2.default.createElement(
              'div',
              { className: 'subscribeMessageBox-title' },
              'Get the ',
              _react2.default.createElement(
                'span',
                { className: 'subscribeMessageBox-title-bestNYPL' },
                'best of NYPL'
              ),
              ' in your inbox'
            )
          ),
          _react2.default.createElement(
            'form',
            {
              id: 'emailSubscribeForm',
              className: formClass,
              action: this.props.target,
              method: this.props.form_method,
              name: this.props.form_name,
              onSubmit: this.validateForm,
              style: (0, _underscore.extend)(this.props.style, styles.base)
            },
            _react2.default.createElement(
              'div',
              { className: formClass + '-fields' },
              _react2.default.createElement(
                'label',
                {
                  className: formClass + '-label',
                  style: styles.emailFormLabel,
                  htmlFor: emailAddressField
                },
                'Email Address'
              ),
              _react2.default.createElement('input', {
                'aria-label': 'Enter your email address',
                className: formClass + '-input',
                type: 'email',
                name: 'Email Address',
                placeholder: this.props.placeholder,
                ref: emailAddressField,
                id: emailAddressField,
                required: true,
                'aria-required': 'true',
                autoComplete: 'off',
                autoFocus: true
              }),
              _react2.default.createElement(
                'div',
                { className: formClass + '-error ' + errorClass },
                _react2.default.createElement(_dgxSvgIcons.XIcon, { ariaHidden: true, focusable: false }),
                _react2.default.createElement(
                  'span',
                  null,
                  'Please enter a valid email address'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: formClass + '-submit' },
                _react2.default.createElement(_dgxSvgIcons.CheckSoloIcon, { ariaHidden: true, focusable: false }),
                _react2.default.createElement('input', {
                  'aria-label': 'Sign up',
                  type: 'submit',
                  name: 'submit',
                  value: 'SIGN UP',
                  style: styles.submitButton
                })
              )
            )
          )
        );

        if (status === 'success') {
          _utils2.default.trackHeader('Subscribe', 'Success');
          subscribeContent = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_SubscribeMessageBox2.default, {
              status: status,
              msg: 'Thank you for subscribing to our email updates.'
            }),
            _react2.default.createElement(
              'div',
              { className: this.props.className + '-newEmail' },
              _react2.default.createElement(
                'button',
                { onClick: this.initForm, style: styles.resubmitButton },
                'Enter another email address'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: this.props.className + '-followUs' },
              _react2.default.createElement(
                'p',
                null,
                'Follow us:'
              ),
              _react2.default.createElement(_SocialMediaLinksWidget2.default, {
                className: this.props.className + '-socialMediaLinksWidget',
                links: _appConfig2.default.socialMediaLinks,
                displayOnlyList: ['facebook', 'twitter']
              })
            )
          );
        }

        if (status === 'exists') {
          _utils2.default.trackHeader('Subscribe', 'Error -- already subscribed');
          subscribeContent = _react2.default.createElement(
            'div',
            { className: this.props.className + '-alreadySubscribed' },
            _react2.default.createElement(_SubscribeMessageBox2.default, {
              status: status,
              msg: 'Looks like you\'re already signed up!'
            }),
            _react2.default.createElement(
              'div',
              { className: this.props.className + '-newEmail' },
              _react2.default.createElement(
                'button',
                { style: styles.resubmitButton, onClick: this.initForm },
                'Enter a different email address'
              )
            )
          );
        }

        if (status === 'error' || status === 'Internal Server Error') {
          _utils2.default.trackHeader('Subscribe', 'Error');
          subscribeContent = _react2.default.createElement(
            'div',
            { className: this.props.className + '-misc-error' },
            _react2.default.createElement(
              'div',
              null,
              'Hmm...'
            ),
            _react2.default.createElement(
              'div',
              null,
              'Something isn\'t quite right.'
            ),
            _react2.default.createElement(
              'div',
              null,
              'Please try again.'
            ),
            _react2.default.createElement(
              'a',
              { href: '', onClick: this.initForm, style: styles.tryAgainButton },
              _react2.default.createElement(_dgxSvgIcons.LeftArrowIcon, { ariaHidden: true, focusable: false }),
              'TRY AGAIN'
            )
          );
        }

        // Always show the privacy link except in the loading phase.
        return _react2.default.createElement(
          'div',
          { className: this.props.className },
          subscribeContent,
          _react2.default.createElement(
            'a',
            {
              href: this.props.subCenterUrl,
              className: this.props.className + '-sc-link',
              style: styles.scLink,
              onClick: function onClick() {
                return _utils2.default.trackHeader('Subscribe', 'Subscription Center');
              }
            },
            'Subscription Center'
          ),
          _react2.default.createElement(
            'a',
            {
              href: this.props.policyUrl,
              className: this.props.className + '-pp-link',
              style: styles.privacyLink
            },
            'Privacy Policy'
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(_DotsLoader2.default, null)
      );
    }
  }]);

  return EmailSubscription;
}(_react2.default.Component);

EmailSubscription.propTypes = {
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  lang: _propTypes2.default.string,
  target: _propTypes2.default.string,
  form_name: _propTypes2.default.string,
  listId: _propTypes2.default.string,
  form_method: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  policyUrl: _propTypes2.default.string,
  subCenterUrl: _propTypes2.default.string,
  style: _propTypes2.default.object
};

EmailSubscription.defaultProps = {
  id: 'EmailSubscription',
  className: 'emailSubscription',
  lang: 'en',
  target: 'http://cl.exct.net/subscribe.aspx',
  form_name: 'subscribeForm',
  listId: '1061',
  form_method: 'POST',
  placeholder: 'Your email address',
  policyUrl: 'http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy',
  subCenterUrl: 'http://pages.email.nypl.org/page.aspx?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7'
};

exports.default = EmailSubscription;
module.exports = exports['default'];

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubscribeMessageBox = function SubscribeMessageBox(_ref) {
  var className = _ref.className,
      status = _ref.status,
      msg = _ref.msg;
  return _react2.default.createElement(
    'div',
    { className: className + ' ' + status },
    _react2.default.createElement('div', { className: className + '-eyebrow' }),
    _react2.default.createElement(
      'div',
      { className: className + '-title' },
      msg
    )
  );
};

SubscribeMessageBox.propTypes = {
  msg: _propTypes2.default.string,
  className: _propTypes2.default.string,
  status: _propTypes2.default.string
};

SubscribeMessageBox.defaultProps = {
  msg: 'Thank you for subscribing to our email updates.',
  className: 'subscribeMessageBox'
};

exports.default = SubscribeMessageBox;
module.exports = exports['default'];

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = __webpack_require__(4);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _appConfig = __webpack_require__(7);

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Fundraising configuration variables
var _config$fundraising = _appConfig2.default.fundraising,
    apiUrl = _config$fundraising.apiUrl,
    primaryBgImage = _config$fundraising.primaryBgImage,
    secondaryBgImage = _config$fundraising.secondaryBgImage,
    cookieExpInSeconds = _config$fundraising.cookieExpInSeconds;

var FundraisingBanner = function (_React$Component) {
  _inherits(FundraisingBanner, _React$Component);

  function FundraisingBanner(props) {
    _classCallCheck(this, FundraisingBanner);

    var _this = _possibleConstructorReturn(this, (FundraisingBanner.__proto__ || Object.getPrototypeOf(FundraisingBanner)).call(this, props));

    _this.state = {
      bannerData: props.bannerData,
      isBannerVisible: false
    };

    _this.closeFundraisingBanner = _this.closeFundraisingBanner.bind(_this);
    _this.fetchFundraisingData = _this.fetchFundraisingData.bind(_this);
    return _this;
  }

  _createClass(FundraisingBanner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Only fetch data if the cookie is not set or false
      if (_utils2.default.getCookie(this.props.hideBannerCookieName) !== 'true') {
        this.fetchFundraisingData(apiUrl, this.state.bannerData);
      }
    }

    /**
     * getBackgroundImageStyles(primaryImage, secondaryImage)
     * Assigns default background CSS styles and specific backgroundImage properties
     * if the `primaryImage` and `secondaryImage` paths are defined
     *
     * @param {string} primaryImage - The full path of the primary background image
     * @param {string} secondaryImage - The full path of the secondary background image
     */

  }, {
    key: 'getBackgroundImageStyles',
    value: function getBackgroundImageStyles(primaryImage, secondaryImage) {
      var styles = { backgroundColor: '#07818d' };

      if (!(0, _underscore.isEmpty)(primaryImage)) {
        if ((0, _underscore.isEmpty)(secondaryImage)) {
          styles.backgroundImage = 'url(' + primaryImage + '), url(' + primaryImage + ')';
          styles.backgroundRepeat = 'repeat-x, repeat-x';
          styles.backgroundPosition = '0 150%, 55% -110%';
        } else {
          styles.backgroundImage = 'url(' + primaryImage + '), url(' + primaryImage + '), url(' + secondaryImage + ')';
          styles.backgroundRepeat = 'repeat-x, repeat-x, repeat';
          styles.backgroundPosition = '0 150%, 55% -110%, 50% 50%';
        }
      }

      return styles;
    }

    /**
     * fetchFundraisingData(url, currentBannerData)
     * Performs a GET request to the fundraising API only if no data exists. Upon a successful GET
     * request, it will update the `isBannerVisible` boolean to true and populate the `bannerData`
     * object with the API data.
     *
     * @param {string} url - The API endpoint to fetch fundraising data
     * @param {object} currentBannerData - The object containing the fundraising data
     */

  }, {
    key: 'fetchFundraisingData',
    value: function fetchFundraisingData(url, currentBannerData) {
      var _this2 = this;

      if (!(0, _underscore.isEmpty)(url) && (0, _underscore.isEmpty)(currentBannerData)) {
        return _axios2.default.get(url).then(function (result) {
          if (result.data) {
            _this2.setState({ bannerData: result.data, isBannerVisible: true });
          } else {
            console.warn('Missing response from GET request: ' + url, result);
          }
        }).catch(function (error) {
          console.warn('Error on Axios GET request: ' + url);
          if (error instanceof Error) {
            console.warn(error.message);
          } else {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.warn(error.data);
            console.warn(error.status);
          }
        });
      }

      return null;
    }

    /**
     * closeFundraisingBanner()
     * Sets the `closeFundraisingBanner` cookie to expire in 24 hours and
     * updates the `isBannerVisible` boolean to false which will hide the banner.
     */

  }, {
    key: 'closeFundraisingBanner',
    value: function closeFundraisingBanner() {
      _utils2.default.setCookie(this.props.hideBannerCookieName, 'true', cookieExpInSeconds);
      this.setState({ isBannerVisible: false });
      // Fire the GA event only if the prop gaLabel is not empty
      if (!(0, _underscore.isEmpty)(this.props.gaLabel)) {
        _utils2.default.trackHeader('Close banner button clicked', this.props.gaLabel);
      }
    }

    /**
     * renderBannerImage(imageUrl)
     * Generates the DOM for the main fundraising image if the `imageUrl` parameter is not empty
     *
     * @param {string} imageUrl - The full path of the main fundraising image
     */

  }, {
    key: 'renderBannerImage',
    value: function renderBannerImage(imageUrl) {
      return !(0, _underscore.isEmpty)(imageUrl) ? _react2.default.createElement(
        'div',
        { className: this.props.className + '-imageWrapper' },
        _react2.default.createElement('img', { src: imageUrl, alt: '' })
      ) : null;
    }

    /**
     * renderBannerHeadline(headline)
     * Generates the DOM for the headline text if the `headline` parameter is not empty
     *
     * @param {string} headline - String representation of the headline text
     */

  }, {
    key: 'renderBannerHeadline',
    value: function renderBannerHeadline(headline) {
      return !(0, _underscore.isEmpty)(headline) ? _react2.default.createElement(
        'span',
        { className: this.props.className + '-headline' },
        headline
      ) : null;
    }

    /**
     * renderBannerDescription(desc)
     * Generates the DOM for the description text if the `desc` parameter is not empty
     *
     * @param {string} desc - String representation of the description text
     */

  }, {
    key: 'renderBannerDescription',
    value: function renderBannerDescription(desc) {
      return !(0, _underscore.isEmpty)(desc) ? _react2.default.createElement(
        'span',
        { className: this.props.className + '-description' },
        desc
      ) : null;
    }

    /**
     * renderCloseButton(closeText, ariaLabel)
     * Generates the DOM for the description text if the `desc` parameter is not empty
     *
     * @param {string} closeText - String of the close text button element (default: `Close`)
     * @param {string} ariaLabel - String of the aria-label property
     *  (default: `Close Fundraising banner`)
     */

  }, {
    key: 'renderCloseButton',
    value: function renderCloseButton() {
      var closeText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Close';
      var ariaLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Close Fundraising banner';

      return _react2.default.createElement(
        'button',
        {
          'aria-label': ariaLabel,
          className: this.props.className + '-closeButton',
          onClick: this.closeFundraisingBanner
        },
        closeText
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          bannerData = _state.bannerData,
          isBannerVisible = _state.isBannerVisible;


      return _react2.default.createElement(
        'div',
        {
          className: this.props.className + ' ' + (isBannerVisible ? 'show' : ''),
          id: this.props.id,
          style: this.getBackgroundImageStyles(primaryBgImage, secondaryBgImage),
          role: 'complementary'
        },
        !(0, _underscore.isEmpty)(bannerData) && _react2.default.createElement(
          'div',
          { className: this.props.className + '-wrapper' },
          _react2.default.createElement(
            'a',
            {
              onClick: function onClick() {
                !(0, _underscore.isEmpty)(_this3.props.gaLabel) && !(0, _underscore.isEmpty)(bannerData.url) ? _utils2.default.trackHeader(bannerData.url, _this3.props.gaLabel) : null;
              },
              href: !(0, _underscore.isEmpty)(bannerData.url) ? bannerData.url : '#'
            },
            this.renderBannerImage(bannerData.imageUrl),
            this.renderBannerHeadline(bannerData.title),
            this.renderBannerDescription(bannerData.description),
            _react2.default.createElement(
              'span',
              { className: this.props.className + '-button' },
              'Donate'
            )
          ),
          this.renderCloseButton()
        )
      );
    }
  }]);

  return FundraisingBanner;
}(_react2.default.Component);

FundraisingBanner.propTypes = {
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  bannerData: _propTypes2.default.object,
  gaLabel: _propTypes2.default.string,
  hideBannerCookieName: _propTypes2.default.string.isRequired
};

FundraisingBanner.defaultProps = {
  className: 'fundraisingBanner',
  id: 'fundraisingBanner',
  bannerData: {}
};

exports.default = FundraisingBanner;
module.exports = exports['default'];

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(11);

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _underscore = __webpack_require__(4);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _appConfig = __webpack_require__(7);

var _appConfig2 = _interopRequireDefault(_appConfig);

var _AlertsBox = __webpack_require__(153);

var _AlertsBox2 = _interopRequireDefault(_AlertsBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  backgroundColor: '#fee24a',
  width: '100%',
  margin: 0,
  padding: '15px 0',
  color: '#333333'
};

var GlobalAlerts = function (_React$Component) {
  _inherits(GlobalAlerts, _React$Component);

  function GlobalAlerts(props) {
    _classCallCheck(this, GlobalAlerts);

    var _this = _possibleConstructorReturn(this, (GlobalAlerts.__proto__ || Object.getPrototypeOf(GlobalAlerts)).call(this, props));

    _this.state = {
      globalAlerts: [],
      hideAlertsBox: false,
      animateAlertsBox: false
    };
    return _this;
  }

  _createClass(GlobalAlerts, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Fetch the Global Alerts via Client
      this.fetchGlobalAlerts();
    }

    /**
     * _closeAlertsBox()
     * updates both state properties
     * (animateAlertsBox & hideAlertsBox)
     * with a setTimeout to allow css transition.
     * NOTE: Disabled for now until further notice.
     */

  }, {
    key: 'closeAlertsBox',
    value: function closeAlertsBox() {
      var _this2 = this;

      this.setState({ animateAlertsBox: true });

      setTimeout(function () {
        _this2.setState({ hideAlertsBox: true });
      }, 400);
    }

    /**
     * _fetchGlobalAlerts()
     * using axios, fetch the alerts data
     * and assign to state globalAlerts property.
     */

  }, {
    key: 'fetchGlobalAlerts',
    value: function fetchGlobalAlerts() {
      var _this3 = this;

      _axios2.default.get(_appConfig2.default.alertsApiUrl).then(function (result) {
        if (result.data && result.data.data) {
          _this3.setState({ globalAlerts: result.data.data });
        }
      }).catch(function (response) {
        console.warn('Error on Axios GET request: ' + _appConfig2.default.alertsApiUrl);
        if (response instanceof Error) {
          console.warn(response.message);
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.warn(response.data);
          console.warn(response.status);
          console.warn(response.headers);
          console.warn(response.config);
        }
      });
    }

    /**
     * _filterCurrentClosingAlerts(data)
     * Returns a filtered array with current
     * closing alerts. If no data is passed,
     * an empty array will be returned.
     *
     * @param {Array} data
     * @return {Array} Alerts
     */

  }, {
    key: 'filterCurrentClosingAlerts',
    value: function filterCurrentClosingAlerts(data) {
      if (!data) {
        return [];
      }

      var today = (0, _moment2.default)();
      var sDate = void 0;
      var eDate = void 0;

      return (0, _underscore.filter)(data, function (elem) {
        if (elem.attributes) {
          if (elem.attributes['display-date-start'] && elem.attributes['display-date-end']) {
            sDate = (0, _moment2.default)(elem.attributes['display-date-start']);
            eDate = (0, _moment2.default)(elem.attributes['display-date-end']);

            if (sDate.valueOf() <= today.valueOf() && eDate.valueOf() >= today.valueOf()) {
              return elem;
            }
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var currentGlobalAlerts = this.filterCurrentClosingAlerts(this.state.globalAlerts);
      var classes = (0, _classnames2.default)({
        'animatedFast fadeOutUp': this.state.animateAlertsBox,
        hide: this.state.hideAlertsBox
      });

      return currentGlobalAlerts && currentGlobalAlerts.length ? _react2.default.createElement(
        'div',
        {
          className: this.props.className + ' ' + classes,
          id: this.props.id,
          style: styles,
          role: 'complementary'
        },
        _react2.default.createElement(_AlertsBox2.default, {
          alerts: currentGlobalAlerts,
          id: this.props.className + '-box',
          className: this.props.className + '-box'
        })
      ) : null;
    }
  }]);

  return GlobalAlerts;
}(_react2.default.Component);

GlobalAlerts.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  id: _propTypes2.default.string
};

GlobalAlerts.defaultProps = {
  lang: 'en',
  className: 'globalAlerts',
  id: 'globalAlerts'
};

exports.default = GlobalAlerts;
module.exports = exports['default'];

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTappable = __webpack_require__(187);

var _reactTappable2 = _interopRequireDefault(_reactTappable);

var _focusTrapReact = __webpack_require__(10);

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _dgxSvgIcons = __webpack_require__(5);

var _underscore = __webpack_require__(4);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _MobileMyNypl = __webpack_require__(162);

var _MobileMyNypl2 = _interopRequireDefault(_MobileMyNypl);

var _SearchBox = __webpack_require__(16);

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _NavMenu = __webpack_require__(15);

var _NavMenu2 = _interopRequireDefault(_NavMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// NYPL Components


var styles = {
  base: {
    position: 'relative',
    height: '60px',
    padding: 0,
    margin: 0
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    float: 'right',
    lineHeight: 'normal'
  },
  listItem: {
    display: 'inline-block',
    padding: 0,
    margin: '0 0 0 4px',
    lineHeight: 'normal'
  },
  mobileLogoLink: {
    color: '#000',
    backgroundColor: '#FFF',
    textDecoration: 'none',
    display: 'inline-block',
    height: 50,
    width: '50px',
    position: 'absolute',
    left: '10px',
    top: '8px',
    margin: 0,
    padding: 0,
    ':hover': {
      color: '#000'
    },
    ':visited': {
      color: '#000'
    }
  },
  locationsLink: {
    margin: 0,
    padding: '11px 13px',
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF'
  },
  myNyplButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeMyNyplButton: {
    color: '#FFF',
    backgroundColor: '#2B2B2B'
  },
  inactiveMyNyplButton: {
    color: '#000',
    backgroundColor: '#FFF'
  },
  searchButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeSearchButton: {
    color: '#FFF',
    backgroundColor: '#1B7FA7'
  },
  inactiveSearchButton: {
    color: '#000',
    backgroundColor: '#FFF'
  },
  menuButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeMenuButton: {
    color: '#FFF',
    backgroundColor: '#2B2B2B'
  },
  inactiveMenuButton: {
    color: '#000',
    backgroundColor: '#FFF'
  }
};

var MobileHeader = function (_React$Component) {
  _inherits(MobileHeader, _React$Component);

  function MobileHeader(props) {
    _classCallCheck(this, MobileHeader);

    var _this = _possibleConstructorReturn(this, (MobileHeader.__proto__ || Object.getPrototypeOf(MobileHeader)).call(this, props));

    _this.state = {
      activeButton: ''
    };

    _this.closeDropDown = _this.closeDropDown.bind(_this);
    return _this;
  }

  /**
   * toggleMobileActiveBtn(activeButton)
   * This function either activates or deactivates the state of the button that was clicked on,
   * to track the active state SCSS styles.
   *
   * @param {String} activeButton
   */


  _createClass(MobileHeader, [{
    key: 'toggleMobileActiveBtn',
    value: function toggleMobileActiveBtn(activeButton) {
      if (activeButton === 'clickSearch') {
        var searchActive = this.state.activeButton === 'search' ? '' : 'search';
        this.setState({ activeButton: searchActive });
      } else if (activeButton === 'mobileMenu') {
        var navMenuActive = this.state.activeButton === 'navMenu' ? '' : 'navMenu';
        this.setState({ activeButton: navMenuActive });
      } else if (activeButton === 'clickLogIn' || activeButton === 'clickMyAccount') {
        var menuActive = this.state.activeButton === 'myNypl' ? '' : 'myNypl';
        this.setState({ activeButton: menuActive });
      }

      _utils2.default.trackHeader('Click', 'Mobile ' + activeButton);
    }

    /**
     * closeDropDown()
     * This is necessary for the FocusTrap component to execute
     * the proper deactivateMethod for each dialog.
     */

  }, {
    key: 'closeDropDown',
    value: function closeDropDown(focusElem) {
      this.setState({ activeButton: '' });
      _reactDom2.default.findDOMNode(this.refs[focusElem]).focus();
    }

    /**
    * renderLogoLink()
    * Generates the DOM for the NYPL Logo Link.
    * Uses SVG LionLogo icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderLogoLink',
    value: function renderLogoLink() {
      return _react2.default.createElement(
        'a',
        {
          style: styles.mobileLogoLink,
          href: this.props.nyplRootUrl,
          'aria-label': this.props.alt
        },
        _react2.default.createElement(
          'span',
          { className: 'visuallyHidden' },
          this.props.alt
        ),
        _react2.default.createElement(_dgxSvgIcons.LionLogoIcon, {
          ariaHidden: true,
          className: this.props.className + '-logo',
          height: 30,
          width: 30,
          focusable: false
        })
      );
    }

    /**
    * renderMyNyplButton()
    * Generates the DOM for the MyNyplLogin button/dialog.
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderMyNyplButton',
    value: function renderMyNyplButton() {
      var _this2 = this;

      var myNyplClass = '';
      var gaAction = this.props.patronName ? 'MyAccount' : 'LogIn';
      var icon = _react2.default.createElement(_dgxSvgIcons.LoginIcon, { className: 'loginIcon', ariaHidden: true, focusable: false });
      if (this.props.patronName) {
        icon = _react2.default.createElement(_dgxSvgIcons.LoginIconSolid, {
          className: 'loginIcon-loggedIn animated fadeIn',
          ariaHidden: true,
          focusable: false
        });
      }
      var buttonStyles = styles.inactiveMyNyplButton;
      var buttonLabel = this.props.patronName ? 'My Account' : 'Log In';
      var active = this.state.activeButton === 'myNypl';

      if (active) {
        var _React$createElement;

        myNyplClass = 'active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, (_React$createElement = { ariaHidden: true, fill: '#FFF' }, _defineProperty(_React$createElement, 'ariaHidden', true), _defineProperty(_React$createElement, 'focusable', false), _React$createElement));
        buttonStyles = styles.activeMyNyplButton;
        buttonLabel = 'Close';
      }

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          _focusTrapReact2.default,
          {
            className: 'mobileMyNypl-wrapper',
            focusTrapOptions: {
              onDeactivate: function onDeactivate() {
                return _this2.closeDropDown('myNyplBtnFocus');
              },
              clickOutsideDeactivates: true
            },
            active: active
          },
          _react2.default.createElement(
            _reactTappable2.default,
            {
              className: this.props.className + '-myNyplButton',
              component: 'button',
              style: (0, _underscore.extend)(styles.myNyplButton, buttonStyles),
              onTap: function onTap() {
                return _this2.toggleMobileActiveBtn('click' + gaAction);
              },
              'aria-haspopup': 'true',
              'aria-expanded': active ? true : null,
              ref: 'myNyplBtnFocus'
            },
            _react2.default.createElement(
              'span',
              { className: 'visuallyHidden' },
              buttonLabel
            ),
            icon
          ),
          active && _react2.default.createElement(_MobileMyNypl2.default, {
            className: myNyplClass + ' mobileMyNypl',
            isLoggedIn: this.props.isLoggedIn,
            patronName: this.props.patronName,
            logOutLink: this.props.logOutLink
          })
        )
      );
    }

    /**
    * renderLocationsLink()
    * Generates the DOM for the Locations link.
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderLocationsLink',
    value: function renderLocationsLink() {
      var locatorUrl = this.props.locatorUrl || '//www.nypl.org/locations/map?nearme=true';

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          'a',
          {
            style: styles.locationsLink,
            href: locatorUrl,
            onClick: function onClick() {
              return _utils2.default.trackHeader('Click', 'Mobile Locations Button');
            },
            className: this.props.className + '-locator',
            'aria-label': 'NYPL Locations Near Me'
          },
          _react2.default.createElement(
            'span',
            { className: 'visuallyHidden' },
            'NYPL Locations Near Me'
          ),
          _react2.default.createElement(_dgxSvgIcons.LocatorIcon, { ariaHidden: true, fill: '#000', focusable: false })
        )
      );
    }

    /**
    * renderSearchButton()
    * Generates the DOM for the Search button/dialog.
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderSearchButton',
    value: function renderSearchButton() {
      var _this3 = this;

      var mobileSearchClass = '';
      var icon = _react2.default.createElement(_dgxSvgIcons.SearchIcon, { ariaHidden: true, fill: '#000', focusable: false });
      var buttonStyles = styles.inactiveSearchButton;
      var buttonLabel = 'Open Search';
      var active = this.state.activeButton === 'search';

      if (active) {
        mobileSearchClass = ' active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { ariaHidden: true, fill: '#FFF', focusable: false });
        buttonStyles = styles.activeSearchButton;
        buttonLabel = 'Close Search';
      }

      // The desired initialFocus selector only exists when active:
      var initialFocus = active ? '.' + this.props.className + '-searchForm-legend' : null;
      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          _focusTrapReact2.default,
          {
            className: this.props.className + '-searchDialog',
            focusTrapOptions: {
              onDeactivate: function onDeactivate() {
                return _this3.closeDropDown('searchBtnFocus');
              },
              initialFocus: initialFocus,
              clickOutsideDeactivates: true
            },
            active: active
          },
          _react2.default.createElement(
            _reactTappable2.default,
            {
              className: this.props.className + '-searchButton' + mobileSearchClass,
              component: 'button',
              style: (0, _underscore.extend)(styles.searchButton, buttonStyles),
              onTap: function onTap() {
                return _this3.toggleMobileActiveBtn('clickSearch');
              },
              'aria-haspopup': 'true',
              'aria-expanded': active ? true : null,
              ref: 'searchBtnFocus'
            },
            _react2.default.createElement(
              'span',
              { className: 'visuallyHidden' },
              buttonLabel
            ),
            icon
          ),
          active && _react2.default.createElement(_SearchBox2.default, {
            className: this.props.className + '-searchForm',
            type: 'mobile'
          })
        )
      );
    }

    /**
    * renderMenuButton()
    * Generates the DOM for the Menu button
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderMenuButton',
    value: function renderMenuButton() {
      var _this4 = this;

      var mobileMenuClass = '';
      var icon = _react2.default.createElement(_dgxSvgIcons.MenuIcon, { ariaHidden: true, fill: '#000', focusable: false });
      var buttonStyles = styles.inactiveMenuButton;
      var buttonLabel = 'Open Navigation';
      var dialogWindow = null;
      var active = this.state.activeButton === 'navMenu';

      if (active) {
        mobileMenuClass = ' active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { ariaHidden: true, fill: '#FFF', focusable: false });
        buttonStyles = styles.activeMenuButton;
        buttonLabel = 'Close Navigation';
        dialogWindow = _react2.default.createElement(_NavMenu2.default, {
          className: this.props.className + '-navMenu',
          lang: this.props.lang,
          items: this.props.navData,
          urlType: this.props.urlType,
          isLoggedIn: this.props.isLoggedIn,
          patronName: this.state.patronName,
          logOutLink: this.state.logOutUrl,
          mobileActive: active
        });
      }

      // The desired initialFocus selector only exists when active:
      var initialFocus = active ? 'ul.header-mobile-navMenu-list li:first-of-type a' : null;

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          _focusTrapReact2.default,
          {
            focusTrapOptions: {
              initialFocus: initialFocus,
              onDeactivate: function onDeactivate() {
                return _this4.closeDropDown('navMenuBtnFocus');
              },
              clickOutsideDeactivates: true
            },
            active: active
          },
          _react2.default.createElement(
            _reactTappable2.default,
            {
              className: this.props.className + '-menuButton' + mobileMenuClass,
              component: 'button',
              style: (0, _underscore.extend)(styles.menuButton, buttonStyles),
              onTap: function onTap() {
                return _this4.toggleMobileActiveBtn('mobileMenu');
              },
              'aria-haspopup': 'true',
              'aria-expanded': active ? true : null,
              ref: 'navMenuBtnFocus'
            },
            _react2.default.createElement(
              'span',
              { className: 'visuallyHidden' },
              buttonLabel
            ),
            icon
          ),
          _react2.default.createElement(
            'div',
            { className: 'header-mobile-wrapper' + mobileMenuClass },
            dialogWindow
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className, style: styles.base },
        this.renderLogoLink(),
        _react2.default.createElement(
          'ul',
          { style: styles.list },
          this.renderMyNyplButton(),
          this.renderLocationsLink(),
          this.renderSearchButton(),
          this.renderMenuButton()
        )
      );
    }
  }]);

  return MobileHeader;
}(_react2.default.Component);

MobileHeader.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  locatorUrl: _propTypes2.default.string.isRequired,
  nyplRootUrl: _propTypes2.default.string,
  alt: _propTypes2.default.string,
  isLoggedIn: _propTypes2.default.bool,
  patronName: _propTypes2.default.string,
  logOutLink: _propTypes2.default.string.isRequired,
  navData: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  urlType: _propTypes2.default.string.isRequired
};

MobileHeader.defaultProps = {
  lang: 'en',
  isLoggedIn: false,
  patronName: null,
  className: 'mobileHeader',
  nyplRootUrl: '/',
  alt: 'The New York Public Library'
};

exports.default = MobileHeader;
module.exports = exports['default'];

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleLink = function (_React$Component) {
  _inherits(SimpleLink, _React$Component);

  function SimpleLink(props) {
    _classCallCheck(this, SimpleLink);

    var _this = _possibleConstructorReturn(this, (SimpleLink.__proto__ || Object.getPrototypeOf(SimpleLink)).call(this, props));

    _this.handleOnClick = _this.handleOnClick.bind(_this);
    return _this;
  }

  _createClass(SimpleLink, [{
    key: 'handleOnClick',
    value: function handleOnClick() {
      _utils2.default.trackHeader(this.props.gaAction, this.props.gaLabel);
      this.props.onClick();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        {
          ref: this.props.ref,
          id: this.props.id,
          className: this.props.className,
          href: this.props.target,
          onClick: this.handleOnClick,
          style: this.props.style
        },
        this.props.label
      );
    }
  }]);

  return SimpleLink;
}(_react2.default.Component);

SimpleLink.propTypes = {
  id: _propTypes2.default.string,
  ref: _propTypes2.default.string,
  className: _propTypes2.default.string,
  lang: _propTypes2.default.string,
  style: _propTypes2.default.object,
  target: _propTypes2.default.string,
  label: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  gaAction: _propTypes2.default.string,
  gaLabel: _propTypes2.default.string
};

SimpleLink.defaultProps = {
  className: 'simpleLink',
  label: 'Link',
  lang: 'en',
  target: '#',
  onClick: function onClick() {}
};

exports.default = SimpleLink;
module.exports = exports['default'];

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  text: {
    display: 'inline-block',
    fontFamily: 'Kievit-Book, Helvetica, arial',
    color: '#FFF',
    fontSize: '20px',
    margin: '0 5px 0 0'
  },
  list: {
    position: 'relative',
    display: 'inline-block',
    listStyle: 'none',
    verticalAlign: '-1px',
    margin: 0,
    padding: 0,
    fontSize: 0
  },
  dots: {
    margin: 0,
    height: '3px',
    width: '3px',
    borderRadius: '100%',
    border: '2px solid white',
    display: 'inline-block'
  }
};

var DotsLoader = function DotsLoader(_ref) {
  var className = _ref.className,
      dots = _ref.dots;

  var renderDots = function renderDots(amount) {
    var dotsList = [];
    for (var i = 0; i < amount; i++) {
      dotsList.push(_react2.default.createElement('li', { key: i, style: styles.dots }));
    }
    return dotsList;
  };

  return _react2.default.createElement(
    'div',
    { className: className + '-wrapper' },
    _react2.default.createElement(
      'span',
      { style: styles.text },
      'Loading'
    ),
    _react2.default.createElement(
      'ul',
      { className: className, style: styles.list },
      renderDots(dots)
    )
  );
};

DotsLoader.propTypes = {
  className: _propTypes2.default.string,
  dots: _propTypes2.default.number
};

DotsLoader.defaultProps = {
  className: 'DotsLoader',
  dots: 3
};

exports.default = DotsLoader;
module.exports = exports['default'];

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dgxSvgIcons = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function Logo(props) {
  return _react2.default.createElement(
    'a',
    {
      id: props.id,
      className: props.className,
      href: props.target,
      onClick: function onClick() {
        return _utils2.default.trackHeader('Click Logo', '');
      },
      style: props.style
    },
    _react2.default.createElement(_dgxSvgIcons.LionLogoWithText, { focusable: false }),
    _react2.default.createElement(
      'span',
      { className: 'visuallyHidden' },
      props.alt
    )
  );
};

Logo.propTypes = {
  target: _propTypes2.default.string,
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  alt: _propTypes2.default.string,
  style: _propTypes2.default.object
};

Logo.defaultProps = {
  target: '/',
  id: 'Logo',
  className: 'Logo',
  alt: 'The New York Public Library'
};

exports.default = Logo;
module.exports = exports['default'];

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = __webpack_require__(4);

var _dgxSvgIcons = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _appConfig = __webpack_require__(7);

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Config and Utility


var styles = {
  base: {
    backgroundColor: '#2B2B2B',
    margin: 0
  },
  links: {
    display: 'flex',
    backgroundColor: '#E32B31',
    color: '#FFF',
    padding: 0,
    marginTop: '60px',
    minHeight: '100px',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal'
  },
  loggedInLinksMarginTop: {
    margin: '120px 0 0 0'
  },
  label: {
    fontSize: '14px',
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0'
  },
  wrapper: {
    width: '100%',
    display: 'block',
    margin: '0',
    padding: '1.75em 0'
  },
  notLoggedIn: {
    display: 'none'
  },
  logOutLink: {
    color: '#fff',
    display: 'block',
    flex: '1 100%',
    textAlign: 'center',
    padding: '35px',
    fontSize: '18px',
    textTransform: 'uppercase',
    textDecoration: 'underline'
  },
  researchLinkWrapper: {
    alignItems: 'center',
    borderLeft: 0,
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    padding: '1.56em 0 1.85em'
  },
  researchLinkLabel: {
    width: '125px'
  },
  catalogLinkWrapper: {
    borderRight: 0
  },
  catalogLinkLabel: {
    width: '102px'
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: 'rgba(255, 255, 255, 0.6)'
  }
};

var MobileMyNypl = function (_React$Component) {
  _inherits(MobileMyNypl, _React$Component);

  function MobileMyNypl() {
    _classCallCheck(this, MobileMyNypl);

    return _possibleConstructorReturn(this, (MobileMyNypl.__proto__ || Object.getPrototypeOf(MobileMyNypl)).apply(this, arguments));
  }

  _createClass(MobileMyNypl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.refs.loginGreeting) {
        _reactDom2.default.findDOMNode(this.refs.loginGreeting).focus();
      } else {
        _reactDom2.default.findDOMNode(this.refs.catalogLoginLink).focus();
      }
    }

    /**
     * renderLoginLinks()
     * Returns the href addresses for catalog and research catalog buttons
     * based on different conditions.
     */

  }, {
    key: 'renderLoginLinks',
    value: function renderLoginLinks() {
      if (this.props.isLoggedIn) {
        return {
          catalogLink: this.props.catalogLink,
          researchLink: this.props.researchLink
        };
      }

      return {
        catalogLink: this.props.loginCatalogLink,
        researchLink: this.props.loginResearchLink
      };
    }

    /**
     * renderLogOutLink()
     * Returns the log out button if the patron has been logged in.
     */

  }, {
    key: 'renderLogOutLink',
    value: function renderLogOutLink() {
      return this.props.isLoggedIn ? _react2.default.createElement(
        'a',
        {
          href: this.props.logOutLink,
          className: this.props.className + '-catalog-link',
          onClick: function onClick() {
            return _utils2.default.trackHeader('My Account', 'Log Out');
          },
          style: styles.logOutLink
        },
        'LOG OUT'
      ) : _react2.default.createElement('div', { style: styles.notLoggedIn });
    }

    /**
     * renderGreeting()
     * Returns the patron's name in the drop down menu if it exists.
     */

  }, {
    key: 'renderGreeting',
    value: function renderGreeting() {
      return this.props.patronName && this.props.isLoggedIn ? _react2.default.createElement(
        'div',
        { className: this.props.className + '-greeting', ref: 'loginGreeting', tabIndex: '0' },
        _react2.default.createElement(
          'p',
          { className: 'login-indication' },
          'You are logged in as:'
        ),
        _react2.default.createElement(
          'p',
          { className: 'login-name' },
          this.props.patronName
        )
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var catalogLinkClass = 'catalogLink';
      var researchLinkClass = 'researchLink';
      var catalogLink = this.renderLoginLinks().catalogLink;
      var researchLink = this.renderLoginLinks().researchLink;
      var catalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
      var researchCatalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE RESEARCH CATALOG' : 'LOG INTO THE RESEARCH CATALOG';
      var loggedInMarginTop = this.props.isLoggedIn ? styles.loggedInLinksMarginTop : null;
      var gaAction = this.props.isLoggedIn ? 'Mobile Go To' : 'Mobile Log In';

      return _react2.default.createElement(
        'div',
        {
          className: this.props.className,
          style: styles.base,
          role: 'dialog'
        },
        this.renderGreeting(),
        _react2.default.createElement(
          'a',
          {
            href: catalogLink,
            className: catalogLinkClass,
            style: (0, _underscore.extend)(styles.links, loggedInMarginTop),
            onClick: function onClick() {
              return _utils2.default.trackHeader(gaAction, 'Catalog');
            },
            ref: 'catalogLoginLink'
          },
          _react2.default.createElement(
            'span',
            {
              className: catalogLinkClass + '-wrapper',
              style: (0, _underscore.extend)(styles.wrapper, styles.catalogLinkWrapper)
            },
            _react2.default.createElement(_dgxSvgIcons.LoginIcon, { fill: '#fff', ariaHidden: true, focusable: false }),
            _react2.default.createElement(
              'span',
              {
                className: catalogLinkClass + '-label',
                style: (0, _underscore.extend)(styles.catalogLinkLabel, styles.label)
              },
              catalogLinkLabel
            )
          )
        ),
        _react2.default.createElement(
          'a',
          {
            href: researchLink,
            className: researchLinkClass,
            style: (0, _underscore.extend)(styles.links, loggedInMarginTop),
            onClick: function onClick() {
              return _utils2.default.trackHeader(gaAction, 'Research');
            }
          },
          _react2.default.createElement(
            'span',
            {
              className: researchLinkClass + '-wrapper',
              style: (0, _underscore.extend)(styles.wrapper, styles.researchLinkWrapper)
            },
            _react2.default.createElement(_dgxSvgIcons.BuildingIcon, { fill: '#fff', ariaHidden: true, focusable: false }),
            _react2.default.createElement(
              'span',
              {
                className: researchLinkClass + '-label',
                style: (0, _underscore.extend)(styles.researchLinkLabel, styles.label)
              },
              researchCatalogLinkLabel
            )
          )
        ),
        this.renderLogOutLink()
      );
    }
  }]);

  return MobileMyNypl;
}(_react2.default.Component);

MobileMyNypl.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  catalogLink: _propTypes2.default.string,
  researchLink: _propTypes2.default.string,
  loginCatalogLink: _propTypes2.default.string,
  loginResearchLink: _propTypes2.default.string,
  isLoggedIn: _propTypes2.default.bool,
  patronName: _propTypes2.default.string,
  logOutLink: _propTypes2.default.string
};

MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'mobileMyNypl',
  loginCatalogLink: _appConfig2.default.loginMyNyplLinks.catalog,
  loginResearchLink: _appConfig2.default.loginMyNyplLinks.research,
  catalogLink: _appConfig2.default.myNyplLinks.catalog,
  researchLink: _appConfig2.default.myNyplLinks.research,
  logOutLink: _appConfig2.default.loginMyNyplLinks.logOutLink,
  isLoggedIn: false,
  patronName: ''
};

exports.default = MobileMyNypl;
module.exports = exports['default'];

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _appConfig = __webpack_require__(7);

var _appConfig2 = _interopRequireDefault(_appConfig);

var _dgxSvgIcons = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Config and Utility Library


var styles = {
  logOutLink: {
    backgroundColor: '#FFF',
    border: '3px solid #FFF',
    borderRadius: '33px',
    bottom: '30px',
    color: '#1B7FA7',
    fontSize: '14px',
    fontWeight: '200',
    letterSpacing: '.03em',
    padding: '3px 20px',
    position: 'absolute',
    left: '30px'
  },
  loginButtons: {
    backgroundColor: '#1B7FA7',
    border: '2px solid #FFF',
    color: '#FFF',
    display: 'inline-block',
    fontFamily: 'Kievit-Book',
    fontSize: '14px',
    letterSpacing: '.03em',
    marginTop: '20px',
    padding: '9px 17px 7px'
  }
};

var MyNypl = function (_React$Component) {
  _inherits(MyNypl, _React$Component);

  function MyNypl() {
    _classCallCheck(this, MyNypl);

    return _possibleConstructorReturn(this, (MyNypl.__proto__ || Object.getPrototypeOf(MyNypl)).apply(this, arguments));
  }

  _createClass(MyNypl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.refs.patronGreetingWrapper) {
        _reactDom2.default.findDOMNode(this.refs.patronGreetingWrapper).focus();
      } else {
        this.refs.catalogLink.focus();
      }
    }

    /**
     * renderLoginLinks()
     * Returns the href addresses for catalog and research catalog buttons
     * based on different conditions.
     */

  }, {
    key: 'renderLoginLinks',
    value: function renderLoginLinks() {
      if (this.props.isLoggedIn) {
        return {
          catalogLink: this.props.catalogLink,
          researchLink: this.props.researchLink
        };
      }

      return {
        catalogLink: this.props.loginCatalogLink,
        researchLink: this.props.loginResearchLink
      };
    }

    /**
     * renderGreeting()
     * Returns the patron's name in the drop down menu if it exists.
     */

  }, {
    key: 'renderGreeting',
    value: function renderGreeting() {
      if (!this.props.patronName || !this.props.isLoggedIn) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { tabIndex: '0', className: 'patron-greeting-wrapper', ref: 'patronGreetingWrapper' },
        _react2.default.createElement(
          'p',
          { className: this.props.className + '-patron-greeting login-indication' },
          'You are logged in as:'
        ),
        _react2.default.createElement(
          'p',
          { className: this.props.className + '-patron-greeting login-name' },
          this.props.patronName
        )
      );
    }

    /**
     * renderLogOutLink()
     * Returns the log out button if the patron has been logged in.
     */

  }, {
    key: 'renderLogOutLink',
    value: function renderLogOutLink() {
      return this.props.isLoggedIn ? _react2.default.createElement(
        'a',
        {
          href: this.props.logOutLink,
          className: this.props.className + '-catalog-link',
          onClick: function onClick() {
            return _utils2.default.trackHeader('My Account', 'Log Out');
          },
          style: styles.logOutLink
        },
        _react2.default.createElement(_dgxSvgIcons.LogoutIcon, { className: 'logoutIcon', ariaHidden: true, focusable: false }),
        'LOG OUT'
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var catalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
      var researchCatalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE RESEARCH CATALOG' : 'LOG INTO THE RESEARCH CATALOG';
      var catalogLink = this.renderLoginLinks().catalogLink;
      var researchLink = this.renderLoginLinks().researchLink;
      var gaAction = this.props.isLoggedIn ? 'Go To' : 'Log In';

      return _react2.default.createElement(
        'div',
        { className: this.props.className, role: 'dialog' },
        this.renderGreeting(),
        _react2.default.createElement(
          'ul',
          { className: this.props.className + '-login-list' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              {
                ref: 'catalogLink',
                href: catalogLink,
                style: styles.loginButtons,
                className: this.props.className + '-catalog-btn',
                onClick: function onClick() {
                  return _utils2.default.trackHeader(gaAction, 'Catalog');
                }
              },
              _react2.default.createElement(_dgxSvgIcons.LoginIcon, { fill: '#fff', ariaHidden: true, focusable: false }),
              catalogLinkLabel
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              {
                href: researchLink,
                style: styles.loginButtons,
                className: this.props.className + '-research-btn',
                onClick: function onClick() {
                  return _utils2.default.trackHeader(gaAction, 'Research');
                }
              },
              _react2.default.createElement(_dgxSvgIcons.BuildingIcon, { ariaHidden: true, focusable: false }),
              researchCatalogLinkLabel
            )
          )
        ),
        this.renderLogOutLink()
      );
    }
  }]);

  return MyNypl;
}(_react2.default.Component);

MyNypl.propTypes = {
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  lang: _propTypes2.default.string,
  catalogLink: _propTypes2.default.string,
  researchLink: _propTypes2.default.string,
  loginCatalogLink: _propTypes2.default.string,
  loginResearchLink: _propTypes2.default.string,
  logOutLink: _propTypes2.default.string,
  isLoggedIn: _propTypes2.default.bool,
  patronName: _propTypes2.default.string
};

MyNypl.defaultProps = {
  className: 'myNypl',
  lang: 'en',
  loginCatalogLink: _appConfig2.default.loginMyNyplLinks.catalog,
  loginResearchLink: _appConfig2.default.loginMyNyplLinks.research,
  catalogLink: _appConfig2.default.myNyplLinks.catalog,
  researchLink: _appConfig2.default.myNyplLinks.research,
  logOutLink: _appConfig2.default.loginMyNyplLinks.logOutLink,
  isLoggedIn: false,
  patronName: ''
};

exports.default = MyNypl;
module.exports = exports['default'];

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = __webpack_require__(4);

var _focusTrapReact = __webpack_require__(10);

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _dgxSvgIcons = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _MyNypl = __webpack_require__(163);

var _MyNypl2 = _interopRequireDefault(_MyNypl);

var _appConfig = __webpack_require__(7);

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// GA Utilities

// Component Dependencies

// Configs


var styles = {
  base: {
    margin: '0px 10px 0px 0px',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'baseline',
    lineHeight: 'normal'
  },
  MyNyplButton: {
    display: 'inline',
    border: 'none',
    padding: '11px 10px 11px 12px',
    textTransform: 'uppercase',
    lineHeight: 'normal',
    verticalAlign: 'baseline'
  },
  MyNyplWrapper: {
    position: 'absolute',
    zIndex: 1000,
    left: '0',
    minWidth: '250px',
    backgroundColor: '#1B7FA7',
    padding: '25px 30px',
    marginTop: '10px'
  }
};

var MyNyplButton = function (_React$Component) {
  _inherits(MyNyplButton, _React$Component);

  function MyNyplButton(props) {
    _classCallCheck(this, MyNyplButton);

    var _this = _possibleConstructorReturn(this, (MyNyplButton.__proto__ || Object.getPrototypeOf(MyNyplButton)).call(this, props));

    _this.state = {
      visible: false
    };

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleOnClickOut = _this.handleOnClickOut.bind(_this);
    _this.handleEscKey = _this.handleEscKey.bind(_this);
    return _this;
  }

  _createClass(MyNyplButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleEscKey, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleEscKey, false);
    }

    /**
     * handleEscKey(e)
     * Triggers the clickOut method if the ESC keyboard key is pressed.
     */

  }, {
    key: 'handleEscKey',
    value: function handleEscKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        this.handleOnClickOut();
      }
    }

    /**
     * handleClick()
     * Toggles the visibility of the form. Sends an Action
     * that will dispatch an event to the Header Store.
     */

  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      // If javascript is enabled, clicking the button will open the dropdown menu instead of
      // going to the link
      e.preventDefault();
      var visibleState = this.state.visible ? 'Closed' : 'Open';
      this.setState({ visible: !this.state.visible });
      _utils2.default.trackHeader(this.props.gaAction, 'MyNyplButton - ' + visibleState);
    }

    /**
     * handleOnClickOut()
     * Handles closing the Subscribe form if it is
     * currently visible.
     */

  }, {
    key: 'handleOnClickOut',
    value: function handleOnClickOut() {
      if (this.state.visible) {
        _utils2.default.trackHeader(this.props.gaAction, 'MyNyplButton - Closed');
        this.setState({ visible: false });
      }
    }

    /**
     * renderMyNyplButton()
     * Returns MyNypl button and its icon based on the log in and the click status.
     */

  }, {
    key: 'renderMyNyplButton',
    value: function renderMyNyplButton() {
      var buttonClass = '';
      var icon = _react2.default.createElement(_dgxSvgIcons.GenericWedgeIcon, { className: 'dropDownIcon', ariaHidden: true, focusable: false });
      var myNyplButtonLabel = this.props.patronName ? 'My Account' : 'Log In';
      var labelColorClass = this.props.isLoggedIn ? ' loggedIn' : '';
      var loggedInFadeInAnimation = this.props.patronName ? ' animated fadeIn' : '';

      if (this.state.visible) {
        buttonClass = 'active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { className: 'dropDownIcon', ariaHidden: true, fill: '#fff', focusable: false });
        myNyplButtonLabel = 'Close';
      }

      return _react2.default.createElement(
        'a',
        {
          className: 'myNyplButton ' + buttonClass + labelColorClass + loggedInFadeInAnimation,
          onClick: this.handleClick,
          style: (0, _underscore.extend)(styles.MyNyplButton, this.props.style),
          href: this.props.target,
          role: 'button',
          'aria-haspopup': 'true',
          'aria-expanded': this.state.visible ? true : null
        },
        myNyplButtonLabel,
        icon
      );
    }
  }, {
    key: 'renderMyNyplDialog',
    value: function renderMyNyplDialog() {
      var boxHeight = this.props.isLoggedIn ? ' loggedInHeight' : null;
      return this.state.visible ? _react2.default.createElement(
        'div',
        {
          className: 'myNypl-wrapper active animatedFast fadeIn' + boxHeight,
          style: styles.MyNyplWrapper
        },
        _react2.default.createElement(_MyNypl2.default, {
          patronName: this.props.patronName,
          isLoggedIn: this.props.isLoggedIn,
          logOutLink: this.props.logOutLink
        })
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _focusTrapReact2.default,
        {
          focusTrapOptions: {
            onDeactivate: this.handleOnClickOut,
            clickOutsideDeactivates: true
          },
          active: this.state.visible,
          className: 'myNyplButton-wrapper',
          style: (0, _underscore.extend)(styles.base, this.props.style)
        },
        this.renderMyNyplButton(),
        this.renderMyNyplDialog()
      );
    }
  }]);

  return MyNyplButton;
}(_react2.default.Component);

MyNyplButton.propTypes = {
  lang: _propTypes2.default.string,
  style: _propTypes2.default.object,
  isLoggedIn: _propTypes2.default.bool,
  patronName: _propTypes2.default.string,
  logOutLink: _propTypes2.default.string,
  gaAction: _propTypes2.default.string,
  target: _propTypes2.default.string
};

MyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In',
  target: _appConfig2.default.myNyplLinks.catalog
};

exports.default = MyNyplButton;
module.exports = exports['default'];

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavMenuItem = function NavMenuItem(_ref) {
  var className = _ref.className,
      label = _ref.label,
      lang = _ref.lang,
      navId = _ref.navId,
      target = _ref.target,
      urlType = _ref.urlType;

  var convertUrlRelative = function convertUrlRelative(url) {
    if (typeof url !== 'string') {
      return '#';
    }
    var regex = new RegExp(/^http(s)?\:\/\/(www.)?nypl.org/i);
    // Test regex matching pattern
    return regex.test(url) ? url.replace(regex, '') : url;
  };

  return _react2.default.createElement(
    'li',
    {
      id: navId ? className + '-' + navId : className,
      className: className
    },
    _react2.default.createElement(
      'a',
      {
        href: urlType === 'absolute' ? target : convertUrlRelative(target),
        className: 'navMenuItem-link',
        id: navId ? 'navMenuItem-link-' + navId : 'navMenuItem-link',
        onClick: function onClick() {
          return _utils2.default.trackHeader('Go to...', '' + label[lang].text);
        }
      },
      label[lang].text
    )
  );
};
// Google Analytics Utility Library


NavMenuItem.propTypes = {
  className: _propTypes2.default.string,
  label: _propTypes2.default.object,
  lang: _propTypes2.default.string,
  navId: _propTypes2.default.string,
  target: _propTypes2.default.string,
  urlType: _propTypes2.default.string
};

NavMenuItem.defaultProps = {
  className: 'navMenuItem',
  lang: 'en',
  target: '#'
};

exports.default = NavMenuItem;
module.exports = exports['default'];

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = __webpack_require__(4);

var _dgxSvgIcons = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _DonateButton = __webpack_require__(14);

var _DonateButton2 = _interopRequireDefault(_DonateButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  base: {
    borderTop: '2px solid #363636',
    color: '#FFF',
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0
  },
  subscribeLinks: {
    display: 'inline-table',
    color: '#FFF',
    backgroundColor: '#2b2b2b',
    padding: 0,
    margin: '0 0 0 3px',
    width: '49%',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal'
  },
  galcLinks: {
    display: 'inline-table',
    color: '#FFF',
    backgroundColor: '#2B2B2B',
    padding: 0,
    margin: '0 0 0 3px',
    width: '49%',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal'
  },
  label: {
    fontSize: '16px',
    margin: '0 3px 0 5px',
    display: 'inline-block'
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    padding: '1.75em 0',
    width: '100%'
  },
  subscribeLinkWrapper: {
    borderLeft: '0'
  },
  libraryCardLinkWrapper: {
    borderRight: '1px solid #363636'
  },
  shopLinkWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: '#959595',
    backgroundColor: '#2B2B2B'
  },
  donateLink: {
    display: 'block',
    fontSize: '16px',
    lineHeight: 'normal',
    margin: '0 0 0 3px',
    padding: '1.75em 0',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '98.5%'
  },
  shopLink: {
    backgroundColor: '#2B2B2B',
    borderTop: '2px solid #363636',
    color: '#FFF',
    display: 'inline-table',
    lineHeight: 'normal',
    margin: '0 0 0 3px',
    padding: 0,
    textAlign: 'center',
    textDecoration: 'none'

  }
};
// Dependent NYPL React Component


var NavMenuMobileButtons = function NavMenuMobileButtons(_ref) {
  var className = _ref.className,
      libraryCardLink = _ref.libraryCardLink,
      subscribeLink = _ref.subscribeLink,
      shopLink = _ref.shopLink;

  var libraryCardClass = 'libraryCardLink';
  var subscribeLinkClass = 'subscribeLink';
  var shopLinkClass = 'shopLink';

  return _react2.default.createElement(
    'div',
    { className: className, style: styles.base },
    _react2.default.createElement(
      'a',
      {
        href: libraryCardLink,
        className: libraryCardClass,
        style: styles.galcLinks,
        onClick: function onClick() {
          return _utils2.default.trackHeader('Click', 'Mobile Bottom Buttons - Library Card');
        }
      },
      _react2.default.createElement(
        'span',
        {
          className: libraryCardClass + '-wrapper',
          style: (0, _underscore.extend)({}, styles.wrapper, styles.libraryCardLinkWrapper)
        },
        _react2.default.createElement(_dgxSvgIcons.LibraryCardIcon, { iconId: 'libraryCardSVG', ariaHidden: true, focusable: false }),
        _react2.default.createElement(
          'span',
          {
            className: libraryCardClass + '-label',
            style: (0, _underscore.extend)({}, styles.label)
          },
          'Get a Library Card'
        )
      )
    ),
    _react2.default.createElement(
      'a',
      {
        href: subscribeLink,
        className: subscribeLinkClass,
        style: styles.subscribeLinks,
        onClick: function onClick() {
          return _utils2.default.trackHeader('Click', 'Mobile Bottom Buttons - Email Updates');
        }
      },
      _react2.default.createElement(
        'span',
        {
          className: subscribeLinkClass + '-wrapper',
          style: (0, _underscore.extend)({}, styles.wrapper, styles.subscribeLinkWrapper)
        },
        _react2.default.createElement(_dgxSvgIcons.EnvelopeIcon, { iconId: 'envelopSVG', ariaHidden: true, focusable: false }),
        _react2.default.createElement(
          'span',
          {
            className: subscribeLinkClass + '-label',
            style: (0, _underscore.extend)({}, styles.label)
          },
          'Get Email Updates'
        )
      )
    ),
    _react2.default.createElement(
      'a',
      {
        href: shopLink,
        className: shopLinkClass,
        style: styles.shopLink,
        onClick: function onClick() {
          return _utils2.default.trackHeader('Click', 'Mobile Bottom Buttons - Shop NYPL');
        }
      },
      _react2.default.createElement(
        'span',
        {
          className: shopLinkClass + '-wrapper',
          style: (0, _underscore.extend)({}, styles.wrapper, styles.shopLinkWrapper)
        },
        _react2.default.createElement(_dgxSvgIcons.ShoppingBagIcon, { iconId: 'shoppingBagSVG', ariaHidden: true, focusable: false }),
        _react2.default.createElement(
          'span',
          {
            className: shopLinkClass + '-label',
            style: (0, _underscore.extend)(styles.shopLinkLabel, styles.label)
          },
          'Shop NYPL'
        )
      )
    ),
    _react2.default.createElement(_DonateButton2.default, {
      id: 'mobileNav-donateButton',
      className: 'donateLink',
      style: styles.donateLink,
      gaLabel: 'Mobile Buttons Donate'
    })
  );
};

NavMenuMobileButtons.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  libraryCardLink: _propTypes2.default.string,
  subscribeLink: _propTypes2.default.string,
  shopLink: _propTypes2.default.string
};

NavMenuMobileButtons.defaultProps = {
  lang: 'en',
  className: 'navMenuMobileButtons',
  libraryCardLink: '//www.nypl.org/library-card',
  subscribeLink: 'http://pages.email.nypl.org/page.aspx' + '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
  shopLink: 'http://shop.nypl.org/?utm_campaign=NYPLMobileHeaderButton&utm_source=nypl.org&utm_medium=referral'
};

exports.default = NavMenuMobileButtons;
module.exports = exports['default'];

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(11);

var _classnames2 = _interopRequireDefault(_classnames);

var _focusTrapReact = __webpack_require__(10);

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _dgxSvgIcons = __webpack_require__(5);

var _SearchBox = __webpack_require__(16);

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Import React libraries

// Import components

// GA Utility Library


var SearchButton = function (_React$Component) {
  _inherits(SearchButton, _React$Component);

  function SearchButton(props) {
    _classCallCheck(this, SearchButton);

    var _this = _possibleConstructorReturn(this, (SearchButton.__proto__ || Object.getPrototypeOf(SearchButton)).call(this, props));

    _this.state = { active: false };

    _this.handleOnClick = _this.handleOnClick.bind(_this);
    _this.handleOnClickOut = _this.handleOnClickOut.bind(_this);
    return _this;
  }

  /**
   * handleOnClick(e)
   * Handles the event when the Search button is clicked
   */


  _createClass(SearchButton, [{
    key: 'handleOnClick',
    value: function handleOnClick(e) {
      e.preventDefault();
      if (this.state.active) {
        this.handleOnClickOut();
      } else {
        this.setState({ active: true });
        // Fire GA event to track when the Search Menu is open
        _utils2.default.trackHeader('Search', 'Open Menu');
      }
    }

    /**
     * handleOnClickOut()
     * Handles closing SearchBox via click event
     */

  }, {
    key: 'handleOnClickOut',
    value: function handleOnClickOut() {
      var _this2 = this;

      // Update active state only if ACTIVE is true
      if (this.state.active) {
        setTimeout(function () {
          _this2.setState({ active: false });
          _utils2.default.trackHeader('Search', 'Close Menu');
        }, 200);
      }
    }

    /**
    * renderSearchButton()
    * Generates the button DOM element for the Desktop Search Button.
    * Uses SVG icon & label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderSearchButton',
    value: function renderSearchButton() {
      var _this3 = this;

      var classes = (0, _classnames2.default)({ active: this.state.active });

      var label = 'Search';
      var iconComponentType = _dgxSvgIcons.SearchIcon;
      // If active, change to "Close x" mode:
      if (this.state.active) {
        label = 'Close';
        iconComponentType = _dgxSvgIcons.XIcon;
      }
      var icon = _react2.default.createElement(iconComponentType, {
        className: this.props.className + '-searchButton-icon',
        ariaHidden: true,
        fill: '#FFF',
        width: '20',
        height: '20',
        focusable: false
      });

      return _react2.default.createElement(
        'button',
        {
          className: this.props.className + '-searchButton ' + classes,
          id: this.props.className + '-searchButton',
          name: 'Search Button',
          onClick: function onClick(e) {
            return _this3.handleOnClick(e);
          },
          'aria-haspopup': 'true',
          'aria-expanded': this.state.active ? true : null
        },
        _react2.default.createElement(
          'span',
          { className: this.props.className + '-searchButton-text' },
          label
        ),
        icon
      );
    }

    /**
    * renderSearchBox()
    * Generates the DOM element for the Desktop Search Box.
    * Verifies if isActive is TRUE and returns the proper DOM.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderSearchBox',
    value: function renderSearchBox() {
      return this.state.active ? _react2.default.createElement(
        'div',
        { className: this.props.className + '-desktopSearchBox animatedFast fadeIn' },
        _react2.default.createElement(_SearchBox2.default, { className: 'desktopSearch-form' })
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className + '-searchBox-wrapper' },
        _react2.default.createElement(
          _focusTrapReact2.default,
          {
            focusTrapOptions: {
              onDeactivate: this.handleOnClickOut,
              clickOutsideDeactivates: true
            },
            active: this.state.active
          },
          this.renderSearchButton(),
          this.renderSearchBox()
        )
      );
    }
  }]);

  return SearchButton;
}(_react2.default.Component);

SearchButton.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string
};

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

exports.default = SearchButton;
module.exports = exports['default'];

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = __webpack_require__(4);

var _dgxSvgIcons = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// GA Utility


var icons = {
  twitter: _react2.default.createElement(_dgxSvgIcons.TwitterIcon, { iconId: 'email-twitter', focusable: false }),
  facebook: _react2.default.createElement(_dgxSvgIcons.FaceBookIcon, { iconId: 'email-fb', focusable: false })
};

var SocialMediaLinksWidget = function (_React$Component) {
  _inherits(SocialMediaLinksWidget, _React$Component);

  function SocialMediaLinksWidget(props) {
    _classCallCheck(this, SocialMediaLinksWidget);

    var _this = _possibleConstructorReturn(this, (SocialMediaLinksWidget.__proto__ || Object.getPrototypeOf(SocialMediaLinksWidget)).call(this, props));

    _this.state = { linkClass: '' };

    _this.handleOnMouseLeave = _this.handleOnMouseLeave.bind(_this);
    _this.handleOnMouseEnter = _this.handleOnMouseEnter.bind(_this);
    _this.trackHeader = _utils2.default.trackHeader.bind(_this);
    return _this;
  }

  _createClass(SocialMediaLinksWidget, [{
    key: 'generateLinksToDisplay',
    value: function generateLinksToDisplay(list, displayOnlyList) {
      var _this2 = this;

      var socialLinksList = displayOnlyList && displayOnlyList.length ? (0, _underscore.pick)(list, displayOnlyList) : list;

      return (0, _underscore.map)(socialLinksList, function (item, key) {
        var hoverClass = _this2.state.linkClass === key ? 'animateHover fadeInSlow' : '';
        var icon = icons[key];

        return _react2.default.createElement(
          'li',
          { key: key, className: _this2.props.className + '-listItem' },
          _react2.default.createElement(
            'a',
            {
              href: item,
              onClick: function onClick() {
                return _this2.trackHeader('Click', 'Social Media - ' + key);
              },
              className: _this2.props.className + '-link ' + hoverClass,
              onMouseEnter: function onMouseEnter() {
                return _this2.handleOnMouseEnter(key);
              },
              onMouseLeave: _this2.handleOnMouseLeave
            },
            icon
          )
        );
      });
    }

    /**
     * _handleOnMouseEnter(key)
     * Updates the linkClass state
     * object property with the param key
     *
     * @param {String} key
     */

  }, {
    key: 'handleOnMouseEnter',
    value: function handleOnMouseEnter(key) {
      this.setState({ linkClass: key });
    }

    /**
     * _handleOnMouseLeave()
     * updates the linkClass state
     * object property to an empty string.
     *
     */

  }, {
    key: 'handleOnMouseLeave',
    value: function handleOnMouseLeave() {
      this.setState({ linkClass: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      var socialLinks = this.generateLinksToDisplay(this.props.links, this.props.displayOnlyList);

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'ul',
          { className: this.props.className + '-list' },
          socialLinks
        )
      );
    }
  }]);

  return SocialMediaLinksWidget;
}(_react2.default.Component);

SocialMediaLinksWidget.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  links: _propTypes2.default.object,
  displayOnlyList: _propTypes2.default.array
};

SocialMediaLinksWidget.defaultProps = {
  lang: 'en',
  className: 'socialMediaLinksWidget'
};

exports.default = SocialMediaLinksWidget;
module.exports = exports['default'];

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = __webpack_require__(4);

var _focusTrapReact = __webpack_require__(10);

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _dgxSvgIcons = __webpack_require__(5);

var _axios = __webpack_require__(8);

var _axios2 = _interopRequireDefault(_axios);

var _EmailSubscription = __webpack_require__(154);

var _EmailSubscription2 = _interopRequireDefault(_EmailSubscription);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Utilities


var styles = {
  base: {
    position: 'relative',
    lineHeight: '1px'
  },
  subscribeButton: {
    display: 'inline',
    padding: '11px 10px 11px 12px',
    verticalAlign: 'baseline'
  },
  subscribeLabel: {
    display: 'inline',
    verticalAlign: 'baseline'
  },
  EmailSubscribeForm: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '250px',
    minHeight: '210px',
    backgroundColor: '#1B7FA7',
    padding: '25px 30px',
    marginTop: '10px'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'block'
  }
};

var SubscribeButton = function (_React$Component) {
  _inherits(SubscribeButton, _React$Component);

  function SubscribeButton(props) {
    _classCallCheck(this, SubscribeButton);

    // subscribeFormVisible
    var _this = _possibleConstructorReturn(this, (SubscribeButton.__proto__ || Object.getPrototypeOf(SubscribeButton)).call(this, props));

    _this.state = {
      visible: false,
      target: _this.props.target
    };

    _this.handleOnClickOut = _this.handleOnClickOut.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleEscKey = _this.handleEscKey.bind(_this);
    return _this;
  }

  _createClass(SubscribeButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleEscKey, false);
      // Make an axios call to the mailinglist API server to check it th server is working.
      // And determine the behavior of subscribe button based on the status of the server.
      this.callMailinglistApi();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleEscKey, false);
    }

    /**
     * onChange()
     * Updates the state of the form based off the Header Store.
     */

  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState({ visible: !this.state.visible });
    }
  }, {
    key: 'handleEscKey',
    value: function handleEscKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        this.handleOnClickOut();
      }
    }

    /**
     * handleClick(e)
     * Toggles the visibility of the form. Sends an Action
     * that will dispatch an event to the Header Store.
     */

  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.state.target === '#') {
        e.preventDefault();
        var visibleState = this.state.visible ? 'Closed' : 'Open';
        this.setState({ visible: !this.state.visible });
        _utils2.default.trackHeader('Click', 'Subscribe - ' + visibleState);
      }
    }

    /**
     * handleOnClickOut()
     * Handles closing the Subscribe form if it is
     * currently visible.
     */

  }, {
    key: 'handleOnClickOut',
    value: function handleOnClickOut() {
      if (this.state.visible) {
        this.setState({ visible: false });
        _utils2.default.trackHeader('Click', 'Subscribe - Closed');
      }
    }

    /**
    * callMailinglistApi()
    * An axios call to the mailinglist API server. If the server works,
    * change the link of the button to '#' so it will open the subscribe box.
    * If the server doesn't work, the button will link to subscribe landing page
    * as a fallback.
    */

  }, {
    key: 'callMailinglistApi',
    value: function callMailinglistApi() {
      var _this2 = this;

      _axios2.default.get('https://mailinglistapi.nypl.org').then(function (response) {
        if (response.status === 200 && response.status < 300) {
          _this2.setState({ target: '#' });
        }
      }).catch(function (response) {
        console.warn('Error on Axios GET request: https://mailinglistapi.nypl.org');
        if (response instanceof Error) {
          console.warn(response.message);
        } else {
          console.warn('The Axios GET request has a status of: ' + response.status);
        }
      });
    }
  }, {
    key: 'renderEmailButton',
    value: function renderEmailButton() {
      var buttonClass = '';
      var icon = _react2.default.createElement(_dgxSvgIcons.GenericWedgeIcon, { className: 'dropDownIcon', ariaHidden: true, focusable: false });
      var label = this.props.label;

      if (this.state.visible) {
        buttonClass = 'active';
        label = 'Close';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { className: 'dropDownIcon', ariaHidden: true, fill: '#fff', focusable: false });
      }

      return _react2.default.createElement(
        'a',
        {
          id: 'subscribeButton',
          className: 'subscribeButton ' + buttonClass,
          href: this.state.target,
          onClick: this.handleClick,
          style: styles.subscribeButton,
          role: this.state.target === '#' ? 'button' : null,
          'aria-haspopup': 'true',
          'aria-expanded': this.state.visible ? true : null
        },
        _react2.default.createElement(
          'span',
          { style: styles.subscribeLabel },
          label
        ),
        icon
      );
    }
  }, {
    key: 'renderEmailDialog',
    value: function renderEmailDialog() {
      return this.state.visible ? _react2.default.createElement(
        'div',
        {
          className: 'emailSubscription-wrapper active animatedFast fadeIn',
          style: styles.EmailSubscribeForm
        },
        _react2.default.createElement(_EmailSubscription2.default, {
          listId: '1061',
          target: 'https://mailinglistapi.nypl.org'
        })
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      // The desired initialFocus selector only exists when modal visible:
      var initialFocus = this.state.visible ? '.subscribeMessageBox' : null;

      return _react2.default.createElement(
        _focusTrapReact2.default,
        {
          focusTrapOptions: {
            onDeactivate: this.handleOnClickOut,
            clickOutsideDeactivates: true,
            initialFocus: initialFocus
          },
          active: this.state.visible,
          className: 'subscribeButton-wrapper',
          style: (0, _underscore.extend)(styles.base, this.props.style)
        },
        this.renderEmailButton(),
        this.renderEmailDialog()
      );
    }
  }]);

  return SubscribeButton;
}(_react2.default.Component);

SubscribeButton.propTypes = {
  lang: _propTypes2.default.string,
  label: _propTypes2.default.string,
  target: _propTypes2.default.string,
  style: _propTypes2.default.object
};

SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: 'http://pages.email.nypl.org/page.aspx' + '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7'
};

exports.default = SubscribeButton;
module.exports = exports['default'];

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FeatureFlagConfig = {
  featureFlagList: []
};

exports.default = FeatureFlagConfig;
module.exports = exports["default"];

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var previous = [{
  id: 'c2793eb2-9ac2-4696-82f2-2730763a4f0d',
  slug: 'browse',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/browse'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Browse'
    }
  },
  sort: 0,
  subnav: [{
    id: '92cf9abd-5491-48f8-bed4-a4a5bb1381c3',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://browse.nypl.org/iii/encore/homepage'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Books/Music/Movies'
      }
    },
    sort: 0
  }, {
    id: '0aa57529-2883-4351-bb0e-639d9cdc4846',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/browse/recommendations'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Recommendations'
      }
    },
    sort: 1
  }, {
    id: '60a1ed93-dbb4-4b91-b370-59781998c5aa',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/blog'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Blog'
      }
    },
    sort: 2
  }, {
    id: '85e9c298-56c9-42af-922e-e72958fd105d',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/browse/public-projects'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Public Projects'
      }
    },
    sort: 3
  }, {
    id: '07c0268b-aecb-48a9-b1c1-05a244cb5865',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://shop.nypl.org'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Shop'
      }
    },
    sort: 4
  }]
}, {
  id: '73005d44-0754-4f16-bc51-4b3d0ca96e9c',
  slug: 'learn',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/learn'
    },
    es: {
      type: 'text-single',
      text: 'http://www.nypl.org/learn'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Learn'
    },
    es: {
      type: 'text-single',
      text: 'Aprender'
    }
  },
  sort: 1,
  subnav: [{
    id: '27843a66-82c0-4328-95af-4991ad6b084c',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/learn/kids'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Kids'
      }
    },
    sort: 0
  }, {
    id: '4ea49869-ec2c-4cc1-aad4-10b810ec1605',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/learn/teens'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Teens'
      }
    },
    sort: 1
  }, {
    id: '29feb93d-a219-4654-baf3-06f67e132f18',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/learn/parents'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Parents'
      }
    },
    sort: 2
  }, {
    id: '50159451-54ea-40ea-bae8-7c72b1d8e368',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/learn/teachers'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Teachers'
      }
    },
    sort: 3
  }, {
    id: 'f0ea8fad-c3b7-4c40-b00e-a39b527fadd6',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/learn/adults'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Adults'
      }
    },
    sort: 4
  }]
}, {
  id: '9c3b8da4-8114-4b7f-be5d-aa87257578db',
  slug: 'attend',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/attend'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Attend'
    }
  },
  sort: 2,
  subnav: [{
    id: '5752a16e-c1e0-4e18-b0e9-b51a51b3f6ed',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/events/calendar'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Events'
      }
    },
    sort: 0
  }, {
    id: '779c73fa-2545-4996-9dff-f8f9b7ab066e',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/attend/exhibitions'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Exhibitions'
      }
    },
    sort: 1
  }, {
    id: 'c17183a6-6cb8-476d-86da-9dc126ee5c67',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/events/tours'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Tours'
      }
    },
    sort: 2
  }]
}, {
  id: 'c1585704-8a24-40bc-8416-5ae579b047d9',
  slug: 'research',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/research'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Research'
    }
  },
  sort: 3,
  subnav: [{
    id: '30b7dfa2-9249-4d1f-9f5a-9fb64291372c',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/research/collections'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Collections'
      }
    },
    sort: 0
  }, {
    id: '0465eb1a-f318-4a9d-a404-4518a2a02d5c',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/research/information'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Information'
      }
    },
    sort: 1
  }, {
    id: 'adbfd5db-0a42-4833-9332-d6f0010c562e',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/research/services'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Services'
      }
    },
    sort: 2
  }]
}, {
  id: '1b4916f4-6723-44f0-bfae-112441527c4d',
  slug: 'find-us',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/locations/map'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Find Us'
    }
  },
  sort: 4,
  subnav: [{
    id: '3d84f682-eae2-405b-b83e-b9fe83e9173b',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/locations/list'
      },
      es: {
        type: 'text-single',
        text: 'http://www.nypl.org/locations/list'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'All Locations'
      },
      es: {
        type: 'text-single',
        text: 'Todas Las Ubicaciones'
      }
    },
    sort: 0
  }, {
    id: '24236d1b-4797-449e-86b0-3cee54491fc5',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/locations/map?libraries=research'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Research Libraries'
      }
    },
    sort: 1
  }]
}, {
  id: 'ca83f064-e0be-4c05-8df3-9fa3b5dd6009',
  slug: 'give',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/give'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Give'
    }
  },
  sort: 5,
  subnav: [{
    id: '42781b1a-4ead-4871-830d-abf2121853ab',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/support/donate'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Donate'
      }
    },
    sort: 0
  }, {
    id: 'aee33c2f-d3c3-484a-b037-a00ea0a3028a',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/help/about-nypl/volunteer-nypl'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Volunteer'
      }
    },
    sort: 1
  }]
}, {
  id: '4b439e81-48a0-4b0a-959f-ec9591addb3a',
  slug: 'get-help',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/get-help'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Get Help'
    }
  },
  sort: 6,
  subnav: [{
    id: '87d2e065-4c44-4c90-833d-cc87ddaf4b0b',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/get-help/how-to'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'How to ...'
      }
    },
    sort: 0
  }, {
    id: 'ef8ff633-1fea-4f16-a3f3-46d2621f0a22',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/ask-nypl'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Contact Us'
      }
    },
    sort: 1
  }]
}];

var current = [{
  id: '488afdf5-7a3c-4cee-8c89-1667be3032f7',
  slug: 'booksmusicdvds',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/books-music-movies'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Books/Music/Movies'
    }
  },
  sort: 100,
  subnav: [{
    id: '92cf9abd-5491-48f8-bed4-a4a5bb1381c3',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://browse.nypl.org/iii/encore/homepage'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Catalog'
      }
    },
    sort: 0
  }, {
    id: '07c0268b-aecb-48a9-b1c1-05a244cb5865',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'https://www.nypl.org/browse/new-arrivals/'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'New Arrivals'
      }
    },
    sort: 1
  }, {
    id: '3d84f682-eae2-405b-b83e-b9fe83e9173b',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/ask-nypl/ebookcentral'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'E-Book Central'
      }
    },
    sort: 2
  }, {
    id: '0aa57529-2883-4351-bb0e-639d9cdc4846',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/books-music-movies/recommendations'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Recommendations'
      }
    },
    sort: 3
  }]
}, {
  id: '4a8ee293-2e42-4f3f-8f62-8ab9d11a688a',
  slug: 'n-research',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/research'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Research'
    }
  },
  sort: 101,
  subnav: [{
    id: '30b7dfa2-9249-4d1f-9f5a-9fb64291372c',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/research/collections'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Collections'
      }
    },
    sort: 0
  }, {
    id: 'afbce233-780c-4737-a628-737308a2b466',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/locations/map?libraries=research'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Locations'
      }
    },
    sort: 1
  }, {
    id: 'a0fdc428-ae01-4686-bf42-87296370c537',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/research-divisions/'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Research Divisions'
      }
    },
    sort: 2
  }, {
    id: '0465eb1a-f318-4a9d-a404-4518a2a02d5c',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/research/support'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Support'
      }
    },
    sort: 3
  }, {
    id: 'adbfd5db-0a42-4833-9332-d6f0010c562e',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/research/services'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Services'
      }
    },
    sort: 4
  }]
}, {
  id: '17eb88cf-08cb-4b08-89bb-f835c3c032b1',
  slug: 'education',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/education'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Education'
    }
  },
  sort: 102,
  subnav: [{
    id: 'c7ef5508-765a-485e-bf19-50cdf4b40c6a',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/events/classes/calendar'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Upcoming Programs'
      }
    },
    sort: 0
  }, {
    id: 'f0ea8fad-c3b7-4c40-b00e-a39b527fadd6',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/education/adults'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Adults'
      }
    },
    sort: 1
  }, {
    id: '29feb93d-a219-4654-baf3-06f67e132f18',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/education/parents'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Parents & Caregivers'
      }
    },
    sort: 2
  }, {
    id: '50159451-54ea-40ea-bae8-7c72b1d8e368',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/education/educators'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Educators'
      }
    },
    sort: 3
  }, {
    id: '27843a66-82c0-4328-95af-4991ad6b084c',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/education/kids'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'For Kids'
      }
    },
    sort: 4
  }, {
    id: '4ea49869-ec2c-4cc1-aad4-10b810ec1605',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/education/teens'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'For Teens'
      }
    },
    sort: 5
  }]
}, {
  id: '1a56e236-b251-477c-b87c-9b6588aad6b8',
  slug: 'events',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/events'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Events'
    }
  },
  sort: 103,
  subnav: [{
    id: '5752a16e-c1e0-4e18-b0e9-b51a51b3f6ed',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/events/calendar'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Upcoming Events'
      }
    },
    sort: 0
  }, {
    id: '779c73fa-2545-4996-9dff-f8f9b7ab066e',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/events/exhibitions'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Exhibitions'
      }
    },
    sort: 1
  }, {
    id: '3de515ab-ac22-463b-acfa-d3420bead88e',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/events/author-talks-conversations'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Author Talks & Conversations'
      }
    },
    sort: 2
  }, {
    id: 'd95c17ce-e2b6-4969-a340-340c176aea8b',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/events/performing-arts-films'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Performing Arts & Films'
      }
    },
    sort: 3
  }]
}, {
  id: 'a77fd2d8-dc15-45b3-bee6-13e76375ffe8',
  slug: 'connect',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/connect'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Connect'
    }
  },
  sort: 104,
  subnav: [{
    id: 'd27cac01-7b22-4e53-a187-8664e8bfc02a',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://pages.email.nypl.org/page.aspx?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Get Email Updates'
      }
    },
    sort: 0
  }, {
    id: 'c908e86e-5e73-42e5-9f29-7a22c8bae1a8',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/blog'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Blog: Library Voices'
      }
    },
    sort: 1
  }, {
    id: '0694eefa-a59c-4786-a5c0-ffc22a72a3af',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://oralhistory.nypl.org'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Community Oral History'
      }
    },
    sort: 2
  }, {
    id: '60083fb4-e1ce-4c13-aa65-8abc4f67488f',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/connect/public-projects'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Public Projects'
      }
    },
    sort: 3
  }, {
    id: 'c1e766bb-294c-4de3-a5af-50489808b83f',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/connect/follow-us'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Follow Us'
      }
    },
    sort: 4
  }]
}, {
  id: '793f73d4-0ed8-458e-87de-896bee17043c',
  slug: 'n-give',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/give'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Give'
    }
  },
  sort: 105,
  subnav: [{
    id: '42781b1a-4ead-4871-830d-abf2121853ab',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/give/donate'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Donate'
      }
    },
    sort: 0
  }, {
    id: 'aee33c2f-d3c3-484a-b037-a00ea0a3028a',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/help/about-nypl/volunteer-nypl'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Volunteer'
      }
    },
    sort: 1
  }]
}, {
  id: 'ca639f96-6d00-4dd4-b0c4-33f1653f6b2c',
  slug: 'n-get-help',
  type: 'header-item',
  link: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'http://www.nypl.org/get-help'
    }
  },
  name: {
    type: 'text-group',
    en: {
      type: 'text-single',
      text: 'Get Help'
    }
  },
  sort: 106,
  subnav: [{
    id: '87d2e065-4c44-4c90-833d-cc87ddaf4b0b',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/get-help/using-library'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Using the Library'
      }
    },
    sort: 0
  }, {
    id: 'ef8ff633-1fea-4f16-a3f3-46d2621f0a22',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/get-help/contact-us'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Contact Us'
      }
    },
    sort: 1
  }, {
    id: 'd349aab7-061f-421f-bb5b-6530ce33e705',
    type: 'header-item',
    link: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'http://www.nypl.org/get-help/community-resources'
      }
    },
    name: {
      type: 'text-group',
      en: {
        type: 'text-single',
        text: 'Community Resources'
      }
    },
    sort: 2
  }]
}];

exports.default = {
  previous: previous,
  current: current
};
module.exports = exports['default'];

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _accountConfig = __webpack_require__(152);

var _accountConfig2 = _interopRequireDefault(_accountConfig);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EncoreCatalogLogOutTimer() {
  var _this = this;

  /**
   * setEncoreLoggedInTimer(currentLocationHost, currentTime, isTest)
   * This method is to set the timer to delete related cookies and completely log out from Encore
   * after its expiration time.
   * This is to keep the logged in status consistent with Encore server
   * so the patrons don’t have to log in when they are using non-account-required operations
   * such as searching items.
   * Unfortunately, the user will be logged out from Catalog as well, so we have to keep tracking
   * the users' activites on Catalog too. Also, we add Test Classic Catalog for QA use.
   * The default expiration time is 30 mins.
   * @param {object} - The current location's host
   * @param {number} - The milliseconds elapsed since January 1, 1970 from Date.now()
   * @param {boolean} - The flag to determine if the function is run for tests
   */
  this.setEncoreLoggedInTimer = function (currentLocationHost, currentTime) {
    var isTest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var domainsForExtendingLogIn = ['browse.nypl.org', // the domain of Encore's pages
    'catalog.nypl.org', // the domain of Research Catalog's pages
    'nypl-sierra-test.nypl.org'];
    var encoreLogInExpireDuration = _accountConfig2.default.patLoggedInCookieExpiredTime;
    var isOnValidDomain = domainsForExtendingLogIn.some(function (d) {
      return d === currentLocationHost;
    });
    var isLoggedIn = _utils2.default.hasCookie('PAT_LOGGED_IN');

    if (!isLoggedIn) {
      // Delete cookie "nyplIdentityPatron" to show Header logged out if cookie "PAT_LOGGED_IN"
      // does not exist
      if (_utils2.default.hasCookie('nyplIdentityPatron')) {
        _utils2.default.deleteCookie('nyplIdentityPatron');
      }

      // Delete cookie "VALID_DOMAIN_LAST_VISITED" which holds the last time the user visited
      // the valid domain if the cookie "PAT_LOGGED_IN" does not exist
      if (_utils2.default.hasCookie('VALID_DOMAIN_LAST_VISITED')) {
        _utils2.default.deleteCookie('VALID_DOMAIN_LAST_VISITED');
      }

      // Completely log out the user
      _this.loadLogoutIframe(isTest);
    } else {
      if (isOnValidDomain) {
        // Set the cookie "VALID_DOMAIN_LAST_VISITED" once the user visited Encore or Catalog
        _utils2.default.setCookie('VALID_DOMAIN_LAST_VISITED', currentTime);
        _this.logOutFromEncoreAndCatalogIn(encoreLogInExpireDuration, isTest);
      } else {
        var lastVisitedValidDomainTime = _utils2.default.getCookie('VALID_DOMAIN_LAST_VISITED');
        var timeTillLogOut = lastVisitedValidDomainTime ? encoreLogInExpireDuration - (currentTime - lastVisitedValidDomainTime) : undefined;

        _this.logOutFromEncoreAndCatalogIn(timeTillLogOut, isTest);
      }
    }
  };

  /**
   * logOutFromEncoreAndCatalogIn(time, isTest)
   * The timer to delete log in related cookies and call the method to completely log out from Encore
   * and Catalog. It is called by setEncoreLoggedInTimer.
   * @param {time} - The milliseconds for the timer to count down
   * @param {boolean} - The flag to determine if the function is run for tests
   */
  this.logOutFromEncoreAndCatalogIn = function (time, isTest) {
    var timeTillLogOut = time > 0 ? time : 0;

    // Only for testing. If the function is run for tests, set the timeout no longer than 2 seconds
    if (isTest && timeTillLogOut > 8000) {
      timeTillLogOut = 8000;
    }

    setTimeout(function () {
      _utils2.default.deleteCookie('PAT_LOGGED_IN');
      _utils2.default.deleteCookie('VALID_DOMAIN_LAST_VISITED');
      _utils2.default.deleteCookie('nyplIdentityPatron');
      _this.loadLogoutIframe(isTest);
    }, timeTillLogOut);
  };

  /**
   * loadLogoutIframe(isTest)
   * The function that loads a temporary iframe with the log out endpoint
   * to completely log out the user from Encore and Catalog. It then deletes the iframe right away.
   * The reason to use this way to load the endpoint is to bypass the CORS loading from the client
   * since III does not want to provide us a real log out API URI.
   * * @param {isTest} - If running this method for testing, delete the iframe right away
   */
  this.loadLogoutIframe = function (isTest) {
    var logoutIframe = document.createElement('iframe');

    var _document$getElements = document.getElementsByTagName('body'),
        _document$getElements2 = _slicedToArray(_document$getElements, 1),
        body = _document$getElements2[0];

    var iframeExistingTime = isTest ? 100 : 10000;

    logoutIframe.setAttribute(
    // The endpoint is the URL for logging out from Encore
    'src', 'https://browse.nypl.org/iii/encore/logoutFilterRedirect?suite=def');
    // Assigns the ID for CSS ussage
    logoutIframe.setAttribute('id', 'logoutIframe');
    body.appendChild(logoutIframe);
    setTimeout(function () {
      body.removeChild(logoutIframe);
    }, iframeExistingTime);
  };
}

exports.default = new EncoreCatalogLogOutTimer();
module.exports = exports['default'];

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(180);

var emptyObject = __webpack_require__(175);
var _invariant = __webpack_require__(176);

if (false) {
  var warning = require('fbjs/lib/warning');
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (false) {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context',
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */


  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {

    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @nosideeffects
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'

  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function (Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function (Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function (Constructor, childContextTypes) {
      if (false) {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
    },
    contextTypes: function (Constructor, contextTypes) {
      if (false) {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function (Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function (Constructor, propTypes) {
      if (false) {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function (Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function () {} };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
         false ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (false) {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
      }

      return;
    }

    _invariant(typeof spec !== 'function', 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');
    _invariant(!isValidElement(spec), 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.');

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name);

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (false) {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

      var isInherited = name in Constructor;
      _invariant(!isInherited, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (false) {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function (newThis) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
        } else if (!args.length) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedMixin = {
    componentDidMount: function () {
      this.__isMounted = true;
    },
    componentWillUnmount: function () {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {

    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function (newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function () {
      if (false) {
        process.env.NODE_ENV !== 'production' ? warning(this.__didWarnIsMounted, '%s: isMounted is deprecated. Instead, make sure to clean up ' + 'subscriptions and pending requests in componentWillUnmount to ' + 'prevent memory leaks.', this.constructor && this.constructor.displayName || this.name || 'Component') : void 0;
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function () {};
  _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (false) {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (false) {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedMixin);
    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (false) {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');

    if (false) {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var React = __webpack_require__(1);
var factory = __webpack_require__(173);

// Hack to grab NoopUpdateQueue from isomorphic React
var ReactNoopUpdateQueue = new React.Component().updater;

module.exports = factory(
  React.Component,
  React.isValidElement,
  ReactNoopUpdateQueue
);


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n(__webpack_require__(1)):"function"==typeof define&&define.amd?define(["react"],n):"object"==typeof exports?exports.dgxSkipNavigationLink=n(require("react")):e.dgxSkipNavigationLink=n(e.React)}(this,function(e){return function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){e.exports=t(6)},function(e,n){function t(){l&&f&&(l=!1,f.length?s=f.concat(s):p=-1,s.length&&r())}function r(){if(!l){var e=a(t);l=!0;for(var n=s.length;n;){for(f=s,s=[];++p<n;)f&&f[p].run();p=-1,n=s.length}f=null,l=!1,u(e)}}function o(e,n){this.fun=e,this.array=n}function i(){}var a,u,c=e.exports={};!function(){try{a=setTimeout}catch(e){a=function(){throw new Error("setTimeout is not defined")}}try{u=clearTimeout}catch(e){u=function(){throw new Error("clearTimeout is not defined")}}}();var f,s=[],l=!1,p=-1;c.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];s.push(new o(e,n)),1!==s.length||l||a(r,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=i,c.addListener=i,c.once=i,c.off=i,c.removeListener=i,c.removeAllListeners=i,c.emit=i,c.binding=function(e){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(e){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},function(e,n){"use strict";function t(e){return function(){return e}}var r=function(){};r.thatReturns=t,r.thatReturnsFalse=t(!1),r.thatReturnsTrue=t(!0),r.thatReturnsNull=t(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,n,t){(function(n){"use strict";function t(e,n,t,o,i,a,u,c){if(r(n),!e){var f;if(void 0===n)f=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var s=[t,o,i,a,u,c],l=0;f=new Error(n.replace(/%s/g,function(){return s[l++]})),f.name="Invariant Violation"}throw f.framesToPop=1,f}}var r=function(e){};"production"!==n.env.NODE_ENV&&(r=function(e){if(void 0===e)throw new Error("invariant requires an error message argument")}),e.exports=t}).call(n,t(1))},function(e,n){"use strict";var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=t},function(e,n,t){(function(n){"use strict";var r=t(2),o=r;"production"!==n.env.NODE_ENV&&!function(){var e=function(e){for(var n=arguments.length,t=Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];var o=0,i="Warning: "+e.replace(/%s/g,function(){return t[o++]});"undefined"!=typeof console&&console.error(i);try{throw new Error(i)}catch(a){}};o=function(n,t){if(void 0===t)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==t.indexOf("Failed Composite propType: ")&&!n){for(var r=arguments.length,o=Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];e.apply(void 0,[t].concat(o))}}}(),e.exports=o}).call(n,t(1))},function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var o=t(11),i=r(o),a=t(10),u=r(a),c=function(e){return e.target?i["default"].createElement("nav",{id:e.id,"aria-label":e.skipLabel},i["default"].createElement("ul",null,i["default"].createElement("li",null,i["default"].createElement("a",{href:"#"+e.target},e.linkText)),i["default"].createElement("li",null,i["default"].createElement("a",{href:e.a11yLink},e.a11yText)))):i["default"].createElement("span",null)};c.propTypes={id:u["default"].string,lang:u["default"].string,linkText:u["default"].string,target:u["default"].string.isRequired,a11yText:u["default"].string,a11yLink:u["default"].string,skipLabel:u["default"].string},c.defaultProps={id:"skip",lang:"en",linkText:"Skip to Main Content",a11yText:"Click to learn about accessibility at the Library",a11yLink:"//www.nypl.org/accessibility",skipLabel:"Skip Navigation"},n["default"]=c},function(e,n,t){(function(n){"use strict";function r(e,t,r,c,f){if("production"!==n.env.NODE_ENV)for(var s in e)if(e.hasOwnProperty(s)){var l;try{o("function"==typeof e[s],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",c||"React class",r,s),l=e[s](t,s,c,r,null,a)}catch(p){l=p}if(i(!l||l instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",c||"React class",r,s,typeof l),l instanceof Error&&!(l.message in u)){u[l.message]=!0;var d=f?f():"";i(!1,"Failed %s type: %s%s",r,l.message,null!=d?d:"")}}}if("production"!==n.env.NODE_ENV)var o=t(3),i=t(5),a=t(4),u={};e.exports=r}).call(n,t(1))},function(e,n,t){"use strict";var r=t(2),o=t(3),i=t(4);e.exports=function(){function e(e,n,t,r,a,u){u!==i&&o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function n(){return e}e.isRequired=e;var t={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n};return t.checkPropTypes=r,t.PropTypes=t,t}},function(e,n,t){(function(n){"use strict";var r=t(2),o=t(3),i=t(5),a=t(4),u=t(7);e.exports=function(e,t){function c(e){var n=e&&(P&&e[P]||e[_]);if("function"==typeof n)return n}function f(e,n){return e===n?0!==e||1/e===1/n:e!==e&&n!==n}function s(e){this.message=e,this.stack=""}function l(e){function r(r,f,l,p,d,y,v){if(p=p||j,y=y||l,v!==a)if(t)o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if("production"!==n.env.NODE_ENV&&"undefined"!=typeof console){var h=p+":"+l;!u[h]&&c<3&&(i(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",y,p),u[h]=!0,c++)}return null==f[l]?r?new s(null===f[l]?"The "+d+" `"+y+"` is marked as required "+("in `"+p+"`, but its value is `null`."):"The "+d+" `"+y+"` is marked as required in "+("`"+p+"`, but its value is `undefined`.")):null:e(f,l,p,d,y)}if("production"!==n.env.NODE_ENV)var u={},c=0;var f=r.bind(null,!1);return f.isRequired=r.bind(null,!0),f}function p(e){function n(n,t,r,o,i,a){var u=n[t],c=O(u);if(c!==e){var f=k(u);return new s("Invalid "+o+" `"+i+"` of type "+("`"+f+"` supplied to `"+r+"`, expected ")+("`"+e+"`."))}return null}return l(n)}function d(){return l(r.thatReturnsNull)}function y(e){function n(n,t,r,o,i){if("function"!=typeof e)return new s("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var u=n[t];if(!Array.isArray(u)){var c=O(u);return new s("Invalid "+o+" `"+i+"` of type "+("`"+c+"` supplied to `"+r+"`, expected an array."))}for(var f=0;f<u.length;f++){var l=e(u,f,r,o,i+"["+f+"]",a);if(l instanceof Error)return l}return null}return l(n)}function v(){function n(n,t,r,o,i){var a=n[t];if(!e(a)){var u=O(a);return new s("Invalid "+o+" `"+i+"` of type "+("`"+u+"` supplied to `"+r+"`, expected a single ReactElement."))}return null}return l(n)}function h(e){function n(n,t,r,o,i){if(!(n[t]instanceof e)){var a=e.name||j,u=R(n[t]);return new s("Invalid "+o+" `"+i+"` of type "+("`"+u+"` supplied to `"+r+"`, expected ")+("instance of `"+a+"`."))}return null}return l(n)}function m(e){function t(n,t,r,o,i){for(var a=n[t],u=0;u<e.length;u++)if(f(a,e[u]))return null;var c=JSON.stringify(e);return new s("Invalid "+o+" `"+i+"` of value `"+a+"` "+("supplied to `"+r+"`, expected one of "+c+"."))}return Array.isArray(e)?l(t):("production"!==n.env.NODE_ENV?i(!1,"Invalid argument supplied to oneOf, expected an instance of array."):void 0,r.thatReturnsNull)}function g(e){function n(n,t,r,o,i){if("function"!=typeof e)return new s("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var u=n[t],c=O(u);if("object"!==c)return new s("Invalid "+o+" `"+i+"` of type "+("`"+c+"` supplied to `"+r+"`, expected an object."));for(var f in u)if(u.hasOwnProperty(f)){var l=e(u,f,r,o,i+"."+f,a);if(l instanceof Error)return l}return null}return l(n)}function b(e){function t(n,t,r,o,i){for(var u=0;u<e.length;u++){var c=e[u];if(null==c(n,t,r,o,i,a))return null}return new s("Invalid "+o+" `"+i+"` supplied to "+("`"+r+"`."))}if(!Array.isArray(e))return"production"!==n.env.NODE_ENV?i(!1,"Invalid argument supplied to oneOfType, expected an instance of array."):void 0,r.thatReturnsNull;for(var o=0;o<e.length;o++){var u=e[o];if("function"!=typeof u)return i(!1,"Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.",N(u),o),r.thatReturnsNull}return l(t)}function x(){function e(e,n,t,r,o){return E(e[n])?null:new s("Invalid "+r+" `"+o+"` supplied to "+("`"+t+"`, expected a ReactNode."))}return l(e)}function w(e){function n(n,t,r,o,i){var u=n[t],c=O(u);if("object"!==c)return new s("Invalid "+o+" `"+i+"` of type `"+c+"` "+("supplied to `"+r+"`, expected `object`."));for(var f in e){var l=e[f];if(l){var p=l(u,f,r,o,i+"."+f,a);if(p)return p}}return null}return l(n)}function E(n){switch(typeof n){case"number":case"string":case"undefined":return!0;case"boolean":return!n;case"object":if(Array.isArray(n))return n.every(E);if(null===n||e(n))return!0;var t=c(n);if(!t)return!1;var r,o=t.call(n);if(t!==n.entries){for(;!(r=o.next()).done;)if(!E(r.value))return!1}else for(;!(r=o.next()).done;){var i=r.value;if(i&&!E(i[1]))return!1}return!0;default:return!1}}function T(e,n){return"symbol"===e||("Symbol"===n["@@toStringTag"]||"function"==typeof Symbol&&n instanceof Symbol)}function O(e){var n=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":T(n,e)?"symbol":n}function k(e){if("undefined"==typeof e||null===e)return""+e;var n=O(e);if("object"===n){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return n}function N(e){var n=k(e);switch(n){case"array":case"object":return"an "+n;case"boolean":case"date":case"regexp":return"a "+n;default:return n}}function R(e){return e.constructor&&e.constructor.name?e.constructor.name:j}var P="function"==typeof Symbol&&Symbol.iterator,_="@@iterator",j="<<anonymous>>",S={array:p("array"),bool:p("boolean"),func:p("function"),number:p("number"),object:p("object"),string:p("string"),symbol:p("symbol"),any:d(),arrayOf:y,element:v(),instanceOf:h,node:x(),objectOf:g,oneOf:m,oneOfType:b,shape:w};return s.prototype=Error.prototype,S.checkPropTypes=u,S.PropTypes=S,S}}).call(n,t(1))},function(e,n,t){(function(n){if("production"!==n.env.NODE_ENV){var r="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103,o=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r},i=!0;e.exports=t(9)(o,i)}else e.exports=t(8)()}).call(n,t(1))},function(n,t){n.exports=e}])});

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var tabbable = __webpack_require__(190);

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var tabbableNodes = [];
  var firstTabbableNode = null;
  var lastTabbableNode = null;
  var nodeFocusedBeforeActivation = null;
  var active = false;
  var paused = false;
  var tabEvent = null;

  var container = (typeof element === 'string')
    ? document.querySelector(element)
    : element;

  var config = userOptions || {};
  config.returnFocusOnDeactivate = (userOptions && userOptions.returnFocusOnDeactivate !== undefined)
    ? userOptions.returnFocusOnDeactivate
    : true;
  config.escapeDeactivates = (userOptions && userOptions.escapeDeactivates !== undefined)
    ? userOptions.escapeDeactivates
    : true;

  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause,
  };

  return trap;

  function activate(activateOptions) {
    if (active) return;

    var defaultedActivateOptions = {
      onActivate: (activateOptions && activateOptions.onActivate !== undefined)
        ? activateOptions.onActivate
        : config.onActivate,
    };

    active = true;
    paused = false;
    nodeFocusedBeforeActivation = document.activeElement;

    if (defaultedActivateOptions.onActivate) {
      defaultedActivateOptions.onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!active) return;

    var defaultedDeactivateOptions = {
      returnFocus: (deactivateOptions && deactivateOptions.returnFocus !== undefined)
        ? deactivateOptions.returnFocus
        : config.returnFocusOnDeactivate,
      onDeactivate: (deactivateOptions && deactivateOptions.onDeactivate !== undefined)
        ? deactivateOptions.onDeactivate
        : config.onDeactivate,
    };

    removeListeners();

    if (defaultedDeactivateOptions.onDeactivate) {
      defaultedDeactivateOptions.onDeactivate();
    }

    if (defaultedDeactivateOptions.returnFocus) {
      setTimeout(function () {
        tryFocus(nodeFocusedBeforeActivation);
      }, 0);
    }

    active = false;
    paused = false;
    return this;
  }

  function pause() {
    if (paused || !active) return;
    paused = true;
    removeListeners();
  }

  function unpause() {
    if (!paused || !active) return;
    paused = false;
    addListeners();
  }

  function addListeners() {
    if (!active) return;

    // There can be only one listening focus trap at a time
    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }
    listeningFocusTrap = trap;

    updateTabbableNodes();
    tryFocus(firstFocusNode());
    document.addEventListener('focus', checkFocus, true);
    document.addEventListener('click', checkClick, true);
    document.addEventListener('mousedown', checkPointerDown, true);
    document.addEventListener('touchstart', checkPointerDown, true);
    document.addEventListener('keydown', checkKey, true);

    return trap;
  }

  function removeListeners() {
    if (!active || listeningFocusTrap !== trap) return;

    document.removeEventListener('focus', checkFocus, true);
    document.removeEventListener('click', checkClick, true);
    document.removeEventListener('mousedown', checkPointerDown, true);
    document.removeEventListener('touchstart', checkPointerDown, true);
    document.removeEventListener('keydown', checkKey, true);

    listeningFocusTrap = null;

    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;
    if (!optionValue) {
      return null;
    }
    if (typeof optionValue === 'string') {
      node = document.querySelector(optionValue);
      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }
    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }
    return node;
  }

  function firstFocusNode() {
    var node;
    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(document.activeElement)) {
      node = document.activeElement;
    } else {
      node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('You can\'t have a focus-trap without at least one focusable element');
    }

    return node;
  }

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event
  function checkPointerDown(e) {
    if (config.clickOutsideDeactivates && !container.contains(e.target)) {
      deactivate({ returnFocus: false });
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function checkFocus(e) {
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    // Checking for a blur method here resolves a Firefox issue (#15)
    if (typeof e.target.blur === 'function') e.target.blur();

    if (tabEvent) {
      readjustFocus(tabEvent);
    }
  }

  function checkKey(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      handleTab(e);
    }

    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      deactivate();
    }
  }

  function handleTab(e) {
    updateTabbableNodes();

    if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
      return tabEvent = e;
    }

    e.preventDefault();
    var currentFocusIndex = tabbableNodes.indexOf(e.target);

    if (e.shiftKey) {
      if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
        return tryFocus(lastTabbableNode);
      }
      return tryFocus(tabbableNodes[currentFocusIndex - 1]);
    }

    if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

    tryFocus(tabbableNodes[currentFocusIndex + 1]);
  }

  function updateTabbableNodes() {
    tabbableNodes = tabbable(container);
    firstTabbableNode = tabbableNodes[0];
    lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
  }

  function readjustFocus(e) {
    if (e.shiftKey) return tryFocus(lastTabbableNode);

    tryFocus(firstTabbableNode);
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function tryFocus(node) {
  if (!node || !node.focus) return;
  if (node === document.activeElement)  return;

  node.focus();
  if (node.tagName.toLowerCase() === 'input') {
    node.select();
  }
}

module.exports = focusTrap;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 19,
	"./af.js": 19,
	"./ar": 26,
	"./ar-dz": 20,
	"./ar-dz.js": 20,
	"./ar-kw": 21,
	"./ar-kw.js": 21,
	"./ar-ly": 22,
	"./ar-ly.js": 22,
	"./ar-ma": 23,
	"./ar-ma.js": 23,
	"./ar-sa": 24,
	"./ar-sa.js": 24,
	"./ar-tn": 25,
	"./ar-tn.js": 25,
	"./ar.js": 26,
	"./az": 27,
	"./az.js": 27,
	"./be": 28,
	"./be.js": 28,
	"./bg": 29,
	"./bg.js": 29,
	"./bm": 30,
	"./bm.js": 30,
	"./bn": 31,
	"./bn.js": 31,
	"./bo": 32,
	"./bo.js": 32,
	"./br": 33,
	"./br.js": 33,
	"./bs": 34,
	"./bs.js": 34,
	"./ca": 35,
	"./ca.js": 35,
	"./cs": 36,
	"./cs.js": 36,
	"./cv": 37,
	"./cv.js": 37,
	"./cy": 38,
	"./cy.js": 38,
	"./da": 39,
	"./da.js": 39,
	"./de": 42,
	"./de-at": 40,
	"./de-at.js": 40,
	"./de-ch": 41,
	"./de-ch.js": 41,
	"./de.js": 42,
	"./dv": 43,
	"./dv.js": 43,
	"./el": 44,
	"./el.js": 44,
	"./en-au": 45,
	"./en-au.js": 45,
	"./en-ca": 46,
	"./en-ca.js": 46,
	"./en-gb": 47,
	"./en-gb.js": 47,
	"./en-ie": 48,
	"./en-ie.js": 48,
	"./en-nz": 49,
	"./en-nz.js": 49,
	"./eo": 50,
	"./eo.js": 50,
	"./es": 53,
	"./es-do": 51,
	"./es-do.js": 51,
	"./es-us": 52,
	"./es-us.js": 52,
	"./es.js": 53,
	"./et": 54,
	"./et.js": 54,
	"./eu": 55,
	"./eu.js": 55,
	"./fa": 56,
	"./fa.js": 56,
	"./fi": 57,
	"./fi.js": 57,
	"./fo": 58,
	"./fo.js": 58,
	"./fr": 61,
	"./fr-ca": 59,
	"./fr-ca.js": 59,
	"./fr-ch": 60,
	"./fr-ch.js": 60,
	"./fr.js": 61,
	"./fy": 62,
	"./fy.js": 62,
	"./gd": 63,
	"./gd.js": 63,
	"./gl": 64,
	"./gl.js": 64,
	"./gom-latn": 65,
	"./gom-latn.js": 65,
	"./gu": 66,
	"./gu.js": 66,
	"./he": 67,
	"./he.js": 67,
	"./hi": 68,
	"./hi.js": 68,
	"./hr": 69,
	"./hr.js": 69,
	"./hu": 70,
	"./hu.js": 70,
	"./hy-am": 71,
	"./hy-am.js": 71,
	"./id": 72,
	"./id.js": 72,
	"./is": 73,
	"./is.js": 73,
	"./it": 74,
	"./it.js": 74,
	"./ja": 75,
	"./ja.js": 75,
	"./jv": 76,
	"./jv.js": 76,
	"./ka": 77,
	"./ka.js": 77,
	"./kk": 78,
	"./kk.js": 78,
	"./km": 79,
	"./km.js": 79,
	"./kn": 80,
	"./kn.js": 80,
	"./ko": 81,
	"./ko.js": 81,
	"./ky": 82,
	"./ky.js": 82,
	"./lb": 83,
	"./lb.js": 83,
	"./lo": 84,
	"./lo.js": 84,
	"./lt": 85,
	"./lt.js": 85,
	"./lv": 86,
	"./lv.js": 86,
	"./me": 87,
	"./me.js": 87,
	"./mi": 88,
	"./mi.js": 88,
	"./mk": 89,
	"./mk.js": 89,
	"./ml": 90,
	"./ml.js": 90,
	"./mr": 91,
	"./mr.js": 91,
	"./ms": 93,
	"./ms-my": 92,
	"./ms-my.js": 92,
	"./ms.js": 93,
	"./my": 94,
	"./my.js": 94,
	"./nb": 95,
	"./nb.js": 95,
	"./ne": 96,
	"./ne.js": 96,
	"./nl": 98,
	"./nl-be": 97,
	"./nl-be.js": 97,
	"./nl.js": 98,
	"./nn": 99,
	"./nn.js": 99,
	"./pa-in": 100,
	"./pa-in.js": 100,
	"./pl": 101,
	"./pl.js": 101,
	"./pt": 103,
	"./pt-br": 102,
	"./pt-br.js": 102,
	"./pt.js": 103,
	"./ro": 104,
	"./ro.js": 104,
	"./ru": 105,
	"./ru.js": 105,
	"./sd": 106,
	"./sd.js": 106,
	"./se": 107,
	"./se.js": 107,
	"./si": 108,
	"./si.js": 108,
	"./sk": 109,
	"./sk.js": 109,
	"./sl": 110,
	"./sl.js": 110,
	"./sq": 111,
	"./sq.js": 111,
	"./sr": 113,
	"./sr-cyrl": 112,
	"./sr-cyrl.js": 112,
	"./sr.js": 113,
	"./ss": 114,
	"./ss.js": 114,
	"./sv": 115,
	"./sv.js": 115,
	"./sw": 116,
	"./sw.js": 116,
	"./ta": 117,
	"./ta.js": 117,
	"./te": 118,
	"./te.js": 118,
	"./tet": 119,
	"./tet.js": 119,
	"./th": 120,
	"./th.js": 120,
	"./tl-ph": 121,
	"./tl-ph.js": 121,
	"./tlh": 122,
	"./tlh.js": 122,
	"./tr": 123,
	"./tr.js": 123,
	"./tzl": 124,
	"./tzl.js": 124,
	"./tzm": 126,
	"./tzm-latn": 125,
	"./tzm-latn.js": 125,
	"./tzm.js": 126,
	"./uk": 127,
	"./uk.js": 127,
	"./ur": 128,
	"./ur.js": 128,
	"./uz": 130,
	"./uz-latn": 129,
	"./uz-latn.js": 129,
	"./uz.js": 130,
	"./vi": 131,
	"./vi.js": 131,
	"./x-pseudo": 132,
	"./x-pseudo.js": 132,
	"./yo": 133,
	"./yo.js": 133,
	"./zh-cn": 134,
	"./zh-cn.js": 134,
	"./zh-hk": 135,
	"./zh-hk.js": 135,
	"./zh-tw": 136,
	"./zh-tw.js": 136
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 179;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 181 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(184);
var invariant = __webpack_require__(185);
var ReactPropTypesSecret = __webpack_require__(183);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PropTypes = __webpack_require__(2);
var React = __webpack_require__(1);

function getPinchProps(touches) {
	return {
		touches: Array.prototype.map.call(touches, function copyTouch(touch) {
			return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
		}),
		center: { x: (touches[0].pageX + touches[1].pageX) / 2, y: (touches[0].pageY + touches[1].pageY) / 2 },
		angle: Math.atan() * (touches[1].pageY - touches[0].pageY) / (touches[1].pageX - touches[0].pageX) * 180 / Math.PI,
		distance: Math.sqrt(Math.pow(Math.abs(touches[1].pageX - touches[0].pageX), 2) + Math.pow(Math.abs(touches[1].pageY - touches[0].pageY), 2))
	};
}

var Mixin = {
	propTypes: {
		onPinchStart: PropTypes.func, // fires when a pinch gesture is started
		onPinchMove: PropTypes.func, // fires on every touch-move when a pinch action is active
		onPinchEnd: PropTypes.func // fires when a pinch action ends
	},

	onPinchStart: function onPinchStart(event) {
		// in case the two touches didn't start exactly at the same time
		if (this._initialTouch) {
			this.endTouch();
		}
		var touches = event.touches;
		this._initialPinch = getPinchProps(touches);
		this._initialPinch = _extends(this._initialPinch, {
			displacement: { x: 0, y: 0 },
			displacementVelocity: { x: 0, y: 0 },
			rotation: 0,
			rotationVelocity: 0,
			zoom: 1,
			zoomVelocity: 0,
			time: Date.now()
		});
		this._lastPinch = this._initialPinch;
		this.props.onPinchStart && this.props.onPinchStart(this._initialPinch, event);
	},

	onPinchMove: function onPinchMove(event) {
		if (this._initialTouch) {
			this.endTouch();
		}
		var touches = event.touches;
		if (touches.length !== 2) {
			return this.onPinchEnd(event); // bail out before disaster
		}

		var currentPinch = touches[0].identifier === this._initialPinch.touches[0].identifier && touches[1].identifier === this._initialPinch.touches[1].identifier ? getPinchProps(touches) // the touches are in the correct order
		: touches[1].identifier === this._initialPinch.touches[0].identifier && touches[0].identifier === this._initialPinch.touches[1].identifier ? getPinchProps(touches.reverse()) // the touches have somehow changed order
		: getPinchProps(touches); // something is wrong, but we still have two touch-points, so we try not to fail

		currentPinch.displacement = {
			x: currentPinch.center.x - this._initialPinch.center.x,
			y: currentPinch.center.y - this._initialPinch.center.y
		};

		currentPinch.time = Date.now();
		var timeSinceLastPinch = currentPinch.time - this._lastPinch.time;

		currentPinch.displacementVelocity = {
			x: (currentPinch.displacement.x - this._lastPinch.displacement.x) / timeSinceLastPinch,
			y: (currentPinch.displacement.y - this._lastPinch.displacement.y) / timeSinceLastPinch
		};

		currentPinch.rotation = currentPinch.angle - this._initialPinch.angle;
		currentPinch.rotationVelocity = currentPinch.rotation - this._lastPinch.rotation / timeSinceLastPinch;

		currentPinch.zoom = currentPinch.distance / this._initialPinch.distance;
		currentPinch.zoomVelocity = (currentPinch.zoom - this._lastPinch.zoom) / timeSinceLastPinch;

		this.props.onPinchMove && this.props.onPinchMove(currentPinch, event);

		this._lastPinch = currentPinch;
	},

	onPinchEnd: function onPinchEnd(event) {
		// TODO use helper to order touches by identifier and use actual values on touchEnd.
		var currentPinch = _extends({}, this._lastPinch);
		currentPinch.time = Date.now();

		if (currentPinch.time - this._lastPinch.time > 16) {
			currentPinch.displacementVelocity = 0;
			currentPinch.rotationVelocity = 0;
			currentPinch.zoomVelocity = 0;
		}

		this.props.onPinchEnd && this.props.onPinchEnd(currentPinch, event);

		this._initialPinch = this._lastPinch = null;

		// If one finger is still on screen, it should start a new touch event for swiping etc
		// But it should never fire an onTap or onPress event.
		// Since there is no support swipes yet, this should be disregarded for now
		// if (event.touches.length === 1) {
		// 	this.onTouchStart(event);
		// }
	}
};

module.exports = Mixin;

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var TappableMixin = __webpack_require__(188);
var PinchableMixin = __webpack_require__(186);
var getComponent = __webpack_require__(189);
var touchStyles = __webpack_require__(137);

var Component = getComponent([TappableMixin, PinchableMixin]);

module.exports = Component;
module.exports.touchStyles = touchStyles;
module.exports.Mixin = _extends({}, TappableMixin, {
  onPinchStart: PinchableMixin.onPinchStart,
  onPinchMove: PinchableMixin.onPinchMove,
  onPinchEnd: PinchableMixin.onPinchEnd
});

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PropTypes = __webpack_require__(2);
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(9);

var SPACE_KEY = 32;
var ENTER_KEY = 13;

function getTouchProps(touch) {
	if (!touch) return {};
	return {
		pageX: touch.pageX,
		pageY: touch.pageY,
		clientX: touch.clientX,
		clientY: touch.clientY
	};
}

var Mixin = {
	propTypes: {
		moveThreshold: PropTypes.number, // pixels to move before cancelling tap
		activeDelay: PropTypes.number, // ms to wait before adding the `-active` class
		pressDelay: PropTypes.number, // ms to wait before detecting a press
		pressMoveThreshold: PropTypes.number, // pixels to move before cancelling press
		preventDefault: PropTypes.bool, // whether to preventDefault on all events
		stopPropagation: PropTypes.bool, // whether to stopPropagation on all events

		onTap: PropTypes.func, // fires when a tap is detected
		onPress: PropTypes.func, // fires when a press is detected
		onTouchStart: PropTypes.func, // pass-through touch event
		onTouchMove: PropTypes.func, // pass-through touch event
		onTouchEnd: PropTypes.func, // pass-through touch event
		onMouseDown: PropTypes.func, // pass-through mouse event
		onMouseUp: PropTypes.func, // pass-through mouse event
		onMouseMove: PropTypes.func, // pass-through mouse event
		onMouseOut: PropTypes.func, // pass-through mouse event
		onKeyDown: PropTypes.func, // pass-through key event
		onKeyUp: PropTypes.func },

	// pass-through key event
	getDefaultProps: function getDefaultProps() {
		return {
			activeDelay: 0,
			moveThreshold: 100,
			pressDelay: 1000,
			pressMoveThreshold: 5
		};
	},

	getInitialState: function getInitialState() {
		return {
			isActive: false,
			touchActive: false,
			pinchActive: false
		};
	},

	componentWillUnmount: function componentWillUnmount() {
		this.cleanupScrollDetection();
		this.cancelPressDetection();
		this.clearActiveTimeout();
	},

	processEvent: function processEvent(event) {
		if (this.props.preventDefault) event.preventDefault();
		if (this.props.stopPropagation) event.stopPropagation();
	},

	onTouchStart: function onTouchStart(event) {
		if (this.props.onTouchStart && this.props.onTouchStart(event) === false) return;
		this.processEvent(event);
		window._blockMouseEvents = true;
		if (event.touches.length === 1) {
			this._initialTouch = this._lastTouch = getTouchProps(event.touches[0]);
			this.initScrollDetection();
			this.initPressDetection(event, this.endTouch);
			this.initTouchmoveDetection();
			if (this.props.activeDelay > 0) {
				this._activeTimeout = setTimeout(this.makeActive, this.props.activeDelay);
			} else {
				this.makeActive();
			}
		} else if (this.onPinchStart && (this.props.onPinchStart || this.props.onPinchMove || this.props.onPinchEnd) && event.touches.length === 2) {
			this.onPinchStart(event);
		}
	},

	makeActive: function makeActive() {
		if (!this.isMounted()) return;
		this.clearActiveTimeout();
		this.setState({
			isActive: true
		});
	},

	clearActiveTimeout: function clearActiveTimeout() {
		clearTimeout(this._activeTimeout);
		this._activeTimeout = false;
	},

	initScrollDetection: function initScrollDetection() {
		this._scrollPos = { top: 0, left: 0 };
		this._scrollParents = [];
		this._scrollParentPos = [];
		var node = ReactDOM.findDOMNode(this);

		while (node) {
			if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
				this._scrollParents.push(node);
				this._scrollParentPos.push(node.scrollTop + node.scrollLeft);
				this._scrollPos.top += node.scrollTop;
				this._scrollPos.left += node.scrollLeft;
			}

			node = node.parentNode;
		}
	},

	initTouchmoveDetection: function initTouchmoveDetection() {
		this._touchmoveTriggeredTimes = 0;
	},

	cancelTouchmoveDetection: function cancelTouchmoveDetection() {
		if (this._touchmoveDetectionTimeout) {
			clearTimeout(this._touchmoveDetectionTimeout);
			this._touchmoveDetectionTimeout = null;
			this._touchmoveTriggeredTimes = 0;
		}
	},

	calculateMovement: function calculateMovement(touch) {
		return {
			x: Math.abs(touch.clientX - this._initialTouch.clientX),
			y: Math.abs(touch.clientY - this._initialTouch.clientY)
		};
	},

	detectScroll: function detectScroll() {
		var currentScrollPos = { top: 0, left: 0 };
		for (var i = 0; i < this._scrollParents.length; i++) {
			currentScrollPos.top += this._scrollParents[i].scrollTop;
			currentScrollPos.left += this._scrollParents[i].scrollLeft;
		}
		return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
	},

	cleanupScrollDetection: function cleanupScrollDetection() {
		this._scrollParents = undefined;
		this._scrollPos = undefined;
	},

	initPressDetection: function initPressDetection(event, callback) {
		if (!this.props.onPress) return;

		// SyntheticEvent objects are pooled, so persist the event so it can be referenced asynchronously
		event.persist();

		this._pressTimeout = setTimeout((function () {
			this.props.onPress(event);
			callback();
		}).bind(this), this.props.pressDelay);
	},

	cancelPressDetection: function cancelPressDetection() {
		clearTimeout(this._pressTimeout);
	},

	onTouchMove: function onTouchMove(event) {
		if (this._initialTouch) {
			this.processEvent(event);

			if (this.detectScroll()) {
				return this.endTouch(event);
			} else {
				if (this._touchmoveTriggeredTimes++ === 0) {
					this._touchmoveDetectionTimeout = setTimeout((function () {
						if (this._touchmoveTriggeredTimes === 1) {
							this.endTouch(event);
						}
					}).bind(this), 64);
				}
			}

			this.props.onTouchMove && this.props.onTouchMove(event);
			this._lastTouch = getTouchProps(event.touches[0]);
			var movement = this.calculateMovement(this._lastTouch);
			if (movement.x > this.props.pressMoveThreshold || movement.y > this.props.pressMoveThreshold) {
				this.cancelPressDetection();
			}
			if (movement.x > this.props.moveThreshold || movement.y > this.props.moveThreshold) {
				if (this.state.isActive) {
					this.setState({
						isActive: false
					});
				} else if (this._activeTimeout) {
					this.clearActiveTimeout();
				}
			} else {
				if (!this.state.isActive && !this._activeTimeout) {
					this.setState({
						isActive: true
					});
				}
			}
		} else if (this._initialPinch && event.touches.length === 2 && this.onPinchMove) {
			this.onPinchMove(event);
			event.preventDefault();
		}
	},

	onTouchEnd: function onTouchEnd(event) {
		var _this = this;

		if (this._initialTouch) {
			this.processEvent(event);
			var afterEndTouch;
			var movement = this.calculateMovement(this._lastTouch);
			if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
				event.preventDefault();
				afterEndTouch = function () {
					var finalParentScrollPos = _this._scrollParents.map(function (node) {
						return node.scrollTop + node.scrollLeft;
					});
					var stoppedMomentumScroll = _this._scrollParentPos.some(function (end, i) {
						return end !== finalParentScrollPos[i];
					});
					if (!stoppedMomentumScroll) {
						_this.props.onTap(event);
					}
				};
			}
			this.endTouch(event, afterEndTouch);
		} else if (this.onPinchEnd && this._initialPinch && event.touches.length + event.changedTouches.length === 2) {
			this.onPinchEnd(event);
			event.preventDefault();
		}
	},

	endTouch: function endTouch(event, callback) {
		this.cancelTouchmoveDetection();
		this.cancelPressDetection();
		this.clearActiveTimeout();
		if (event && this.props.onTouchEnd) {
			this.props.onTouchEnd(event);
		}
		this._initialTouch = null;
		this._lastTouch = null;
		if (callback) {
			callback();
		}
		if (this.state.isActive) {
			this.setState({
				isActive: false
			});
		}
	},

	onMouseDown: function onMouseDown(event) {
		if (window._blockMouseEvents) {
			window._blockMouseEvents = false;
			return;
		}
		if (this.props.onMouseDown && this.props.onMouseDown(event) === false) return;
		this.processEvent(event);
		this.initPressDetection(event, this.endMouseEvent);
		this._mouseDown = true;
		this.setState({
			isActive: true
		});
	},

	onMouseMove: function onMouseMove(event) {
		if (window._blockMouseEvents || !this._mouseDown) return;
		this.processEvent(event);
		this.props.onMouseMove && this.props.onMouseMove(event);
	},

	onMouseUp: function onMouseUp(event) {
		if (window._blockMouseEvents || !this._mouseDown) return;
		this.processEvent(event);
		this.props.onMouseUp && this.props.onMouseUp(event);
		this.props.onTap && this.props.onTap(event);
		this.endMouseEvent();
	},

	onMouseOut: function onMouseOut(event) {
		if (window._blockMouseEvents || !this._mouseDown) return;
		this.processEvent(event);
		this.props.onMouseOut && this.props.onMouseOut(event);
		this.endMouseEvent();
	},

	endMouseEvent: function endMouseEvent() {
		this.cancelPressDetection();
		this._mouseDown = false;
		this.setState({
			isActive: false
		});
	},

	onKeyUp: function onKeyUp(event) {
		if (!this._keyDown) return;
		this.processEvent(event);
		this.props.onKeyUp && this.props.onKeyUp(event);
		this.props.onTap && this.props.onTap(event);
		this._keyDown = false;
		this.cancelPressDetection();
		this.setState({
			isActive: false
		});
	},

	onKeyDown: function onKeyDown(event) {
		if (this.props.onKeyDown && this.props.onKeyDown(event) === false) return;
		if (event.which !== SPACE_KEY && event.which !== ENTER_KEY) return;
		if (this._keyDown) return;
		this.initPressDetection(event, this.endKeyEvent);
		this.processEvent(event);
		this._keyDown = true;
		this.setState({
			isActive: true
		});
	},

	endKeyEvent: function endKeyEvent() {
		this.cancelPressDetection();
		this._keyDown = false;
		this.setState({
			isActive: false
		});
	},

	cancelTap: function cancelTap() {
		this.endTouch();
		this._mouseDown = false;
	},

	handlers: function handlers() {
		return {
			onTouchStart: this.onTouchStart,
			onTouchMove: this.onTouchMove,
			onTouchEnd: this.onTouchEnd,
			onMouseDown: this.onMouseDown,
			onMouseUp: this.onMouseUp,
			onMouseMove: this.onMouseMove,
			onMouseOut: this.onMouseOut,
			onKeyDown: this.onKeyDown,
			onKeyUp: this.onKeyUp
		};
	}
};

module.exports = Mixin;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createReactClass = __webpack_require__(174);
var PropTypes = __webpack_require__(2);
var React = __webpack_require__(1);
var touchStyles = __webpack_require__(137);

/**
 * Tappable Component
 * ==================
 */
module.exports = function (mixins) {
	return createReactClass({
		displayName: 'Tappable',

		mixins: mixins,

		propTypes: {
			component: PropTypes.any, // component to create
			className: PropTypes.string, // optional className
			classBase: PropTypes.string, // base for generated classNames
			classes: PropTypes.object, // object containing the active and inactive class names
			style: PropTypes.object, // additional style properties for the component
			disabled: PropTypes.bool // only applies to buttons
		},

		getDefaultProps: function getDefaultProps() {
			return {
				component: 'span',
				classBase: 'Tappable'
			};
		},

		render: function render() {
			var props = this.props;
			var className = props.classBase + (this.state.isActive ? '-active' : '-inactive');

			if (props.className) {
				className += ' ' + props.className;
			}

			if (props.classes) {
				className += ' ' + (this.state.isActive ? props.classes.active : props.classes.inactive);
			}

			var style = {};
			_extends(style, touchStyles, props.style);

			var newComponentProps = _extends({}, props, {
				style: style,
				className: className,
				disabled: props.disabled,
				handlers: this.handlers
			}, this.handlers());

			delete newComponentProps.activeDelay;
			delete newComponentProps.classBase;
			delete newComponentProps.classes;
			delete newComponentProps.handlers;
			delete newComponentProps.onTap;
			delete newComponentProps.onPress;
			delete newComponentProps.onPinchStart;
			delete newComponentProps.onPinchMove;
			delete newComponentProps.onPinchEnd;
			delete newComponentProps.moveThreshold;
			delete newComponentProps.pressDelay;
			delete newComponentProps.pressMoveThreshold;
			delete newComponentProps.preventDefault;
			delete newComponentProps.stopPropagation;
			delete newComponentProps.component;

			return React.createElement(props.component, newComponentProps, props.children);
		}
	});
};

/***/ }),
/* 190 */
/***/ (function(module, exports) {

module.exports = function(el, options) {
  options = options || {};

  var elementDocument = el.ownerDocument || el;
  var basicTabbables = [];
  var orderedTabbables = [];

  // A node is "available" if
  // - it's computed style
  var isUnavailable = createIsUnavailable(elementDocument);

  var candidateSelectors = [
    'input',
    'select',
    'a[href]',
    'textarea',
    'button',
    '[tabindex]',
  ];

  var candidates = el.querySelectorAll(candidateSelectors.join(','));

  if (options.includeContainer) {
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    if (
      candidateSelectors.some(function(candidateSelector) {
        return matches.call(el, candidateSelector);
      })
    ) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var candidate, candidateIndex;
  for (var i = 0, l = candidates.length; i < l; i++) {
    candidate = candidates[i];
    candidateIndex = parseInt(candidate.getAttribute('tabindex'), 10) || candidate.tabIndex;

    if (
      candidateIndex < 0
      || (candidate.tagName === 'INPUT' && candidate.type === 'hidden')
      || candidate.disabled
      || isUnavailable(candidate, elementDocument)
    ) {
      continue;
    }

    if (candidateIndex === 0) {
      basicTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        index: i,
        tabIndex: candidateIndex,
        node: candidate,
      });
    }
  }

  var tabbableNodes = orderedTabbables
    .sort(function(a, b) {
      return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
    })
    .map(function(a) {
      return a.node
    });

  Array.prototype.push.apply(tabbableNodes, basicTabbables);

  return tabbableNodes;
}

function createIsUnavailable(elementDocument) {
  // Node cache must be refreshed on every check, in case
  // the content of the element has changed
  var isOffCache = [];

  // "off" means `display: none;`, as opposed to "hidden",
  // which means `visibility: hidden;`. getComputedStyle
  // accurately reflects visiblity in context but not
  // "off" state, so we need to recursively check parents.

  function isOff(node, nodeComputedStyle) {
    if (node === elementDocument.documentElement) return false;

    // Find the cached node (Array.prototype.find not available in IE9)
    for (var i = 0, length = isOffCache.length; i < length; i++) {
      if (isOffCache[i][0] === node) return isOffCache[i][1];
    }

    nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

    var result = false;

    if (nodeComputedStyle.display === 'none') {
      result = true;
    } else if (node.parentNode) {
      result = isOff(node.parentNode);
    }

    isOffCache.push([node, result]);

    return result;
  }

  return function isUnavailable(node) {
    if (node === elementDocument.documentElement) return false;

    var computedStyle = elementDocument.defaultView.getComputedStyle(node);

    if (isOff(node, computedStyle)) return true;

    return computedStyle.visibility === 'hidden';
  }
}


/***/ }),
/* 191 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_192__;

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(138);


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.min.js.map