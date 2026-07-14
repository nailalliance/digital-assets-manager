(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bootstrap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap.js */ "./assets/bootstrap.js");
/* harmony import */ var _components_copy_to_clipboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/copy_to_clipboard.js */ "./assets/components/copy_to_clipboard.js");
/* harmony import */ var _components_copy_to_clipboard_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_copy_to_clipboard_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/app.css */ "./assets/styles/app.css");


/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */


// console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

/***/ }),

/***/ "./assets/bootstrap.js":
/*!*****************************!*\
  !*** ./assets/bootstrap.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   app: () => (/* binding */ app)
/* harmony export */ });
/* harmony import */ var _symfony_stimulus_bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @symfony/stimulus-bridge */ "./node_modules/@symfony/stimulus-bridge/dist/index.js");


// Registers Stimulus controllers from controllers.json and in the controllers/ directory
var app = (0,_symfony_stimulus_bridge__WEBPACK_IMPORTED_MODULE_0__.startStimulusApp)(__webpack_require__("./assets/controllers sync recursive ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js! \\.[jt]sx?$"));
// register any custom, 3rd party controllers here
// app.register('some_controller_name', SomeImportedController);

/***/ }),

/***/ "./assets/components/copy_to_clipboard.js":
/*!************************************************!*\
  !*** ./assets/components/copy_to_clipboard.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
__webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
__webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
__webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
__webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
__webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
__webpack_require__(/*! core-js/modules/es.map.js */ "./node_modules/core-js/modules/es.map.js");
__webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
__webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
__webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
__webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
__webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
__webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
__webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DEFAULT_BUTTON_LABEL = 'Copy to clipboard';
var COPIED_BUTTON_LABEL = 'Copied to clipboard';
var FEEDBACK_DURATION_MS = 1200;
var CopyToClipboard = /*#__PURE__*/function (_HTMLElement) {
  "use strict";

  function CopyToClipboard() {
    var _this;
    _classCallCheck(this, CopyToClipboard);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, CopyToClipboard, [].concat(args));
    _defineProperty(_this, "button", null);
    _defineProperty(_this, "feedbackTimeout", null);
    _defineProperty(_this, "handleClick", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
        var target, text, _navigator$clipboard, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              event.preventDefault();
              target = _this.resolveTarget();
              if (target) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              text = _this.resolveText(target);
              if (!(text === '')) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              _this.highlightTarget(target);
              _context.p = 3;
              if (!((_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText)) {
                _context.n = 5;
                break;
              }
              _context.n = 4;
              return navigator.clipboard.writeText(text);
            case 4:
              _context.n = 6;
              break;
            case 5:
              _this.fallbackCopy(target, text);
            case 6:
              _this.showCopiedFeedback();
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t = _context.v;
              _this.fallbackCopy(target, text);
              _this.showCopiedFeedback();
            case 8:
              return _context.a(2);
          }
        }, _callee, null, [[3, 7]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    return _this;
  }
  _inherits(CopyToClipboard, _HTMLElement);
  return _createClass(CopyToClipboard, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$button;
      this.ensureButton();
      (_this$button = this.button) === null || _this$button === void 0 || _this$button.addEventListener('click', this.handleClick);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this$button2;
      (_this$button2 = this.button) === null || _this$button2 === void 0 || _this$button2.removeEventListener('click', this.handleClick);
      if (this.feedbackTimeout) {
        clearTimeout(this.feedbackTimeout);
      }
    }
  }, {
    key: "ensureButton",
    value: function ensureButton() {
      this.button = this.querySelector('button');
      if (this.button) {
        return;
      }
      this.innerHTML = "\n            <button\n                type=\"button\"\n                class=\"inline-flex items-center justify-center text-gray-500 transition-colors duration-150 hover:text-gray-700 focus:outline-none\"\n                aria-label=\"".concat(DEFAULT_BUTTON_LABEL, "\"\n                title=\"").concat(DEFAULT_BUTTON_LABEL, "\"\n            >\n                <svg class=\"h-5 w-5 pointer-events-none\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" aria-hidden=\"true\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z\"></path>\n                </svg>\n            </button>\n        ");
      this.button = this.querySelector('button');
    }
  }, {
    key: "resolveTarget",
    value: function resolveTarget() {
      var _this$parentElement$q, _this$parentElement;
      var targetId = this.getAttribute('for');
      if (targetId) {
        return document.getElementById(targetId);
      }
      var targetSelector = this.getAttribute('target');
      if (targetSelector) {
        var _this$closest$querySe, _this$closest;
        return (_this$closest$querySe = (_this$closest = this.closest('[data-copy-scope]')) === null || _this$closest === void 0 ? void 0 : _this$closest.querySelector(targetSelector)) !== null && _this$closest$querySe !== void 0 ? _this$closest$querySe : document.querySelector(targetSelector);
      }
      var previousElement = this.previousElementSibling;
      if (previousElement instanceof HTMLInputElement || previousElement instanceof HTMLTextAreaElement) {
        return previousElement;
      }
      return (_this$parentElement$q = (_this$parentElement = this.parentElement) === null || _this$parentElement === void 0 ? void 0 : _this$parentElement.querySelector('input, textarea, [data-copy-source]')) !== null && _this$parentElement$q !== void 0 ? _this$parentElement$q : null;
    }
  }, {
    key: "resolveText",
    value: function resolveText(target) {
      var _ref2, _target$getAttribute, _target$textContent;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        return target.value;
      }
      return (_ref2 = (_target$getAttribute = target.getAttribute('data-copy-source')) !== null && _target$getAttribute !== void 0 ? _target$getAttribute : (_target$textContent = target.textContent) === null || _target$textContent === void 0 ? void 0 : _target$textContent.trim()) !== null && _ref2 !== void 0 ? _ref2 : '';
    }
  }, {
    key: "highlightTarget",
    value: function highlightTarget(target) {
      var _this2 = this;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        target.focus({
          preventScroll: true
        });
        target.select();
        target.setSelectionRange(0, target.value.length);
      } else {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(target);
        selection === null || selection === void 0 || selection.removeAllRanges();
        selection === null || selection === void 0 || selection.addRange(range);
      }
      target.classList.add('ring-2', 'ring-violet-300', 'bg-violet-50');
      if (this.feedbackTimeout) {
        clearTimeout(this.feedbackTimeout);
      }
      this.feedbackTimeout = setTimeout(function () {
        target.classList.remove('ring-2', 'ring-violet-300', 'bg-violet-50');
        _this2.resetButtonFeedback();
      }, FEEDBACK_DURATION_MS);
    }
  }, {
    key: "showCopiedFeedback",
    value: function showCopiedFeedback() {
      if (!this.button) {
        return;
      }
      this.button.setAttribute('aria-label', COPIED_BUTTON_LABEL);
      this.button.setAttribute('title', COPIED_BUTTON_LABEL);
      this.button.classList.add('text-violet-600');
    }
  }, {
    key: "resetButtonFeedback",
    value: function resetButtonFeedback() {
      if (!this.button) {
        return;
      }
      this.button.setAttribute('aria-label', DEFAULT_BUTTON_LABEL);
      this.button.setAttribute('title', DEFAULT_BUTTON_LABEL);
      this.button.classList.remove('text-violet-600');
    }
  }, {
    key: "fallbackCopy",
    value: function fallbackCopy(target, text) {
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        document.execCommand('copy');
        return;
      }
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', 'readonly');
      textarea.className = 'sr-only';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
if (!customElements.get('copy-to-clipboard')) {
  customElements.define('copy-to-clipboard', CopyToClipboard);
}

/***/ }),

/***/ "./assets/controllers sync recursive ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js! \\.[jt]sx?$":
/*!****************************************************************************************************************!*\
  !*** ./assets/controllers/ sync ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js! \.[jt]sx?$ ***!
  \****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./accordion_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/accordion_controller.js",
	"./add_all_to_bag_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/add_all_to_bag_controller.js",
	"./board_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/board_controller.js",
	"./brand_filter_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/brand_filter_controller.js",
	"./csrf_protection_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/csrf_protection_controller.js",
	"./direct_share_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/direct_share_controller.js",
	"./dropdown_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/dropdown_controller.js",
	"./filter_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/filter_controller.js",
	"./filter_form_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/filter_form_controller.js",
	"./hello_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/hello_controller.js",
	"./home_dashboard_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/home_dashboard_controller.js",
	"./home_filter_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/home_filter_controller.js",
	"./list_item_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/list_item_controller.js",
	"./permalink_generator_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/permalink_generator_controller.js",
	"./quick_look_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/quick_look_controller.js",
	"./search_asset_list_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/search_asset_list_controller.js",
	"./searchable_filter_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/searchable_filter_controller.js",
	"./share_link_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/share_link_controller.js",
	"./tag_input_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/tag_input_controller.js",
	"./thumbnail_preview_controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/thumbnail_preview_controller.js",
	"./tus-upload-controller.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/tus-upload-controller.js",
	"./upload_metadata.js": "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/upload_metadata.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./assets/controllers sync recursive ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js! \\.[jt]sx?$";

/***/ }),

/***/ "./assets/controllers/upload_metadata.js":
/*!***********************************************!*\
  !*** ./assets/controllers/upload_metadata.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTusUploadMetadata: () => (/* binding */ createTusUploadMetadata)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_date_now_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.date.now.js */ "./node_modules/core-js/modules/es.date.now.js");
/* harmony import */ var core_js_modules_es_date_now_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_now_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_global_this_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.global-this.js */ "./node_modules/core-js/modules/es.global-this.js");
/* harmony import */ var core_js_modules_es_global_this_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_global_this_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_10__);











function generateUploadKey() {
  var _globalThis$crypto;
  if ((_globalThis$crypto = globalThis.crypto) !== null && _globalThis$crypto !== void 0 && _globalThis$crypto.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return "upload-".concat(Date.now(), "-").concat(Math.random().toString(16).slice(2));
}
function getSafeExtension(filename) {
  var match = filename.match(/\.([A-Za-z0-9]{1,20})$/);
  if (!match) {
    return '';
  }
  return ".".concat(match[1].toLowerCase());
}
function createTusUploadMetadata(file) {
  var shareToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var expectedFileCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var uploadKey = generateUploadKey();
  var metadata = {
    filename: "".concat(uploadKey).concat(getSafeExtension(file.name)),
    original_filename: file.name,
    filetype: file.type || 'application/octet-stream'
  };
  if (shareToken) {
    metadata.share_token = shareToken;
  }
  if (typeof expectedFileCount === 'number' && expectedFileCount > 0) {
    metadata.share_expected_count = String(expectedFileCount);
  }
  return {
    uploadKey: uploadKey,
    metadata: metadata
  };
}

/***/ }),

/***/ "./assets/styles/app.css":
/*!*******************************!*\
  !*** ./assets/styles/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/dist/webpack/loader.js!./assets/controllers.json":
/*!************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/dist/webpack/loader.js!./assets/controllers.json ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _symfony_ux_turbo_dist_turbo_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @symfony/ux-turbo/dist/turbo_controller.js */ "./vendor/symfony/ux-turbo/assets/dist/turbo_controller.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'symfony--ux-turbo--turbo-core': _symfony_ux_turbo_dist_turbo_controller_js__WEBPACK_IMPORTED_MODULE_0__["default"],
});

/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/accordion_controller.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/accordion_controller.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");



















function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "toggle",
    value: function toggle() {
      this.contentTarget.classList.toggle('hidden');
      this.iconTarget.classList.toggle('rotate-90');
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__.Controller);
_defineProperty(_default, "targets", ["content", "icon"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/add_all_to_bag_controller.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/add_all_to_bag_controller.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/esnext.iterator.map.js */ "./node_modules/core-js/modules/esnext.iterator.map.js");
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
























function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "addAll",
    value: function addAll(event) {
      // Find all asset cards within the main content area
      var assetElements = document.querySelectorAll('[data-asset-id]');

      // Extract the ID from each element's dataset
      var assetIds = Array.from(assetElements).map(function (el) {
        return el.dataset.assetId;
      });
      if (assetIds.length > 0) {
        // Join the IDs into a comma-separated string and set the hidden input's value
        this.idsInputTarget.value = assetIds.join(',');
      } else {
        // If no assets are found, prevent the form from submitting
        event.preventDefault();
        alert('There are no assets on the page to add.');
      }
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_24__.Controller);
_defineProperty(_default, "targets", ["idsInput"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/board_controller.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/board_controller.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_date_to_json_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.date.to-json.js */ "./node_modules/core-js/modules/es.date.to-json.js");
/* harmony import */ var core_js_modules_es_date_to_json_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_json_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.json.stringify.js */ "./node_modules/core-js/modules/es.json.stringify.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_map_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.map.js */ "./node_modules/core-js/modules/es.map.js");
/* harmony import */ var core_js_modules_es_map_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_map_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_math_hypot_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.math.hypot.js */ "./node_modules/core-js/modules/es.math.hypot.js");
/* harmony import */ var core_js_modules_es_math_hypot_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_math_hypot_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.object.define-properties.js */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var core_js_modules_es_parse_float_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");
/* harmony import */ var core_js_modules_es_parse_float_js__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_float_js__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var core_js_modules_esnext_iterator_filter_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! core-js/modules/esnext.iterator.filter.js */ "./node_modules/core-js/modules/esnext.iterator.filter.js");
/* harmony import */ var core_js_modules_esnext_iterator_filter_js__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_filter_js__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_41__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_42__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
/* harmony import */ var interactjs__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! interactjs */ "./node_modules/interactjs/dist/interact.min.js");
/* harmony import */ var interactjs__WEBPACK_IMPORTED_MODULE_44___default = /*#__PURE__*/__webpack_require__.n(interactjs__WEBPACK_IMPORTED_MODULE_44__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }











































function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "connect",
    value:
    // --- 1. LIFECYCLE & INITIALIZATION --- //

    function connect() {
      var _this = this;
      this.boardItems = new Map();
      this.activeTool = 'select';
      this.pan = {
        x: 0,
        y: 0
      };
      this.zoom = 1;
      this.isPanning = false;
      this.panStart = {
        x: 0,
        y: 0
      };
      this.isSaving = false;
      this.selectedItemId = null;
      this.zCounter = 0;
      this.isDrawingLine = false;
      this.lineStartPoint = null;
      this.tempLine = null;

      // Bind global listeners
      this.boundHandleKeyDown = this.handleKeyDown.bind(this);
      this.boundHandleKeyUp = this.handleKeyUp.bind(this);
      document.addEventListener('keydown', this.boundHandleKeyDown);
      document.addEventListener('keyup', this.boundHandleKeyUp);

      // Bind viewport listeners
      this.viewportTarget.addEventListener('mousedown', this.handleMouseDown.bind(this));
      this.viewportTarget.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.viewportTarget.addEventListener('mouseup', this.handleMouseUp.bind(this));

      // Bind UI element listeners
      this.assetSearchTarget.addEventListener('input', this.searchAssets.bind(this));
      this.saveBtnTarget.addEventListener('click', function () {
        return _this.saveBoardState(false);
      });
      this.initAssetPanelAndDropzone();
      this.loadBoardState();
      this.autoSaveInterval = setInterval(function () {
        return _this.saveBoardState(true);
      }, 30000);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      clearInterval(this.autoSaveInterval);
      document.removeEventListener('keydown', this.boundHandleKeyDown);
      document.removeEventListener('keyup', this.boundHandleKeyUp);
    }

    // --- 2. SELECTION & DELETION --- //
  }, {
    key: "selectItem",
    value: function selectItem(element) {
      if (!element) return;
      this.deselectAll();
      this.selectedItemId = element.dataset.itemId;
      element.classList.add('selected');
      this.contextToolbarTarget.classList.remove('hidden');
      if (element.classList.contains('board-item-text')) {
        this.textContextToolbarTarget.classList.remove('hidden');
        this.updateTextToolbarState();
      }
    }
  }, {
    key: "deselectAll",
    value: function deselectAll() {
      if (this.selectedItemId) {
        var previouslySelected = this.element.querySelector("[data-item-id=\"".concat(this.selectedItemId, "\"]"));
        if (previouslySelected) previouslySelected.classList.remove('selected');
      }
      this.selectedItemId = null;
      this.contextToolbarTarget.classList.add('hidden');
      this.textContextToolbarTarget.classList.add('hidden');
    }
  }, {
    key: "deleteSelectedItem",
    value: function deleteSelectedItem() {
      if (!this.selectedItemId) return;
      var itemElement = this.element.querySelector("[data-item-id=\"".concat(this.selectedItemId, "\"]"));
      if (itemElement) itemElement.remove();
      this.boardItems["delete"](this.selectedItemId);
      this.deselectAll();
    }

    // --- 3. TOOLING & CANVAS INTERACTION --- //
  }, {
    key: "activateTool",
    value: function activateTool(event) {
      this.activeTool = event.currentTarget.dataset.tool;
      document.querySelectorAll('.board-tool').forEach(function (el) {
        return el.classList.remove('active');
      });
      event.currentTarget.classList.add('active');
      this.viewportTarget.style.cursor = this.activeTool === 'select' ? 'default' : 'crosshair';
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if ((event.key === 'Delete' || event.key === 'Backspace') && this.selectedItemId) {
        if (document.activeElement.getAttribute('contenteditable') !== 'true') {
          event.preventDefault();
          this.deleteSelectedItem();
        }
      }
      if (event.metaKey || event.ctrlKey) {
        if (event.key === '=') {
          event.preventDefault();
          this.zoomIn();
        }
        if (event.key === '-') {
          event.preventDefault();
          this.zoomOut();
        }
      }
      if (event.code === 'Space' && !this.isPanning) {
        event.preventDefault();
        this.isPanning = true;
        this.viewportTarget.style.cursor = 'grabbing';
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      if (event.code === 'Space') {
        this.isPanning = false;
        this.viewportTarget.style.cursor = 'default';
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      var isLineTool = this.activeTool === 'line' || this.activeTool === 'arrow';
      if (isLineTool && event.target === this.viewportTarget) {
        this.isDrawingLine = true;
        this.lineStartPoint = this.getCanvasCoordinates(event.clientX, event.clientY);
        this.tempLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.tempLine.setAttribute('stroke', '#3b82f6');
        this.tempLine.setAttribute('stroke-width', '2');
        this.tempLine.setAttribute('stroke-dasharray', '5,5');
        this.svgCanvasTarget.appendChild(this.tempLine);
      } else {
        var canPan = this.isPanning || event.button === 1 || this.activeTool === 'select' && event.target === this.viewportTarget;
        if (canPan) {
          this.isPanning = true;
          this.viewportTarget.style.cursor = 'grabbing';
          this.panStart = {
            x: event.clientX,
            y: event.clientY
          };
          this.deselectAll();
        }
      }
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      if (this.isDrawingLine) {
        var currentPos = this.getCanvasCoordinates(event.clientX, event.clientY);
        this.tempLine.setAttribute('x1', this.lineStartPoint.x);
        this.tempLine.setAttribute('y1', this.lineStartPoint.y);
        this.tempLine.setAttribute('x2', currentPos.x);
        this.tempLine.setAttribute('y2', currentPos.y);
      } else if (this.isPanning) {
        this.pan.x += event.clientX - this.panStart.x;
        this.pan.y += event.clientY - this.panStart.y;
        this.panStart = {
          x: event.clientX,
          y: event.clientY
        };
        this.updateCanvasTransform();
      }
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(event) {
      if (this.isDrawingLine) {
        var endPoint = this.getCanvasCoordinates(event.clientX, event.clientY);
        var distance = Math.hypot(endPoint.x - this.lineStartPoint.x, endPoint.y - this.lineStartPoint.y);
        if (distance > 10) this.addLineItemToBoard(this.lineStartPoint, endPoint, this.activeTool);
        this.isDrawingLine = false;
        if (this.tempLine) this.tempLine.remove();
        this.tempLine = null;
      } else if (this.isPanning) {
        this.isPanning = false;
        this.viewportTarget.style.cursor = 'default';
      } else if (event.target === this.viewportTarget) {
        var pos = this.getCanvasCoordinates(event.clientX, event.clientY);
        if (this.activeTool === 'text') this.addTextItemToBoard(pos.x, pos.y);else if (this.activeTool === 'group') this.addGroupItemToBoard(pos.x, pos.y);
      }
    }

    // --- 4. PAN & ZOOM --- //
  }, {
    key: "getCanvasCoordinates",
    value: function getCanvasCoordinates(clientX, clientY) {
      var viewportRect = this.viewportTarget.getBoundingClientRect();
      var x = (clientX - viewportRect.left - this.pan.x) / this.zoom;
      var y = (clientY - viewportRect.top - this.pan.y) / this.zoom;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "handleZoom",
    value: function handleZoom(event) {
      event.preventDefault();
      var scaleAmount = event.deltaY > 0 ? -0.1 : 0.1;
      var newZoom = Math.max(0.1, Math.min(3, this.zoom + scaleAmount));
      var viewportRect = this.viewportTarget.getBoundingClientRect();
      var cursorX = event.clientX - viewportRect.left;
      var cursorY = event.clientY - viewportRect.top;
      this.pan.x = cursorX - (cursorX - this.pan.x) / this.zoom * newZoom;
      this.pan.y = cursorY - (cursorY - this.pan.y) / this.zoom * newZoom;
      this.zoom = newZoom;
      this.updateCanvasTransform();
    }
  }, {
    key: "zoomIn",
    value: function zoomIn() {
      this.zoom = Math.min(3, this.zoom + 0.2);
      this.updateCanvasTransform();
    }
  }, {
    key: "zoomOut",
    value: function zoomOut() {
      this.zoom = Math.max(0.1, this.zoom - 0.2);
      this.updateCanvasTransform();
    }
  }, {
    key: "updateCanvasTransform",
    value: function updateCanvasTransform() {
      var transform = "translate(".concat(this.pan.x, "px, ").concat(this.pan.y, "px) scale(").concat(this.zoom, ")");
      this.canvasTarget.style.transform = transform;
      this.svgCanvasTarget.style.transform = transform;
      if (this.hasZoomValueTarget) {
        this.zoomValueTarget.textContent = "".concat(Math.round(this.zoom * 100), "%");
      }
    }
  }, {
    key: "frameContent",
    value: function frameContent() {
      if (this.boardItems.size === 0) {
        this.pan = {
          x: this.viewportTarget.clientWidth / 2,
          y: this.viewportTarget.clientHeight / 2
        };
        this.zoom = 1;
        this.updateCanvasTransform();
        return;
      }
      var minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
      this.boardItems.forEach(function (item) {
        minX = Math.min(minX, item.x);
        minY = Math.min(minY, item.y);
        maxX = Math.max(maxX, item.x + item.width);
        maxY = Math.max(maxY, item.y + item.height);
      });
      var contentWidth = maxX - minX;
      var contentHeight = maxY - minY;
      var padding = 100;
      var xZoom = this.viewportTarget.clientWidth / (contentWidth + padding * 2);
      var yZoom = this.viewportTarget.clientHeight / (contentHeight + padding * 2);
      this.zoom = Math.min(xZoom, yZoom, 1);
      var contentCenterX = minX + contentWidth / 2;
      var contentCenterY = minY + contentHeight / 2;
      this.pan.x = this.viewportTarget.clientWidth / 2 - contentCenterX * this.zoom;
      this.pan.y = this.viewportTarget.clientHeight / 2 - contentCenterY * this.zoom;
      this.updateCanvasTransform();
    }

    // --- 5. LAYERING --- //
  }, {
    key: "_getSortedItemsByZIndex",
    value: function _getSortedItemsByZIndex() {
      return Array.from(this.boardItems.values()).sort(function (a, b) {
        return a.zIndex - b.zIndex;
      });
    }
  }, {
    key: "bringToFront",
    value: function bringToFront() {
      if (!this.selectedItemId) return;
      var item = this.boardItems.get(this.selectedItemId);
      this.zCounter += 1;
      item.zIndex = this.zCounter;
      this.element.querySelector("[data-item-id=\"".concat(this.selectedItemId, "\"]")).style.zIndex = item.zIndex;
    }
  }, {
    key: "sendToBack",
    value: function sendToBack() {
      if (!this.selectedItemId) return;
      var sortedItems = this._getSortedItemsByZIndex();
      var minZ = sortedItems.length > 0 ? sortedItems[0].zIndex : 0;
      var item = this.boardItems.get(this.selectedItemId);
      item.zIndex = minZ - 1;
      this.element.querySelector("[data-item-id=\"".concat(this.selectedItemId, "\"]")).style.zIndex = item.zIndex;
    }
  }, {
    key: "bringForward",
    value: function bringForward() {
      var _this2 = this;
      if (!this.selectedItemId) return;
      var sortedItems = this._getSortedItemsByZIndex();
      var currentIndex = sortedItems.findIndex(function (i) {
        return i.id == _this2.selectedItemId;
      });
      if (currentIndex < sortedItems.length - 1) {
        var currentItem = sortedItems[currentIndex];
        var nextItem = sortedItems[currentIndex + 1];
        var _ref = [nextItem.zIndex, currentItem.zIndex];
        currentItem.zIndex = _ref[0];
        nextItem.zIndex = _ref[1];
        this.element.querySelector("[data-item-id=\"".concat(currentItem.id, "\"]")).style.zIndex = currentItem.zIndex;
        this.element.querySelector("[data-item-id=\"".concat(nextItem.id, "\"]")).style.zIndex = nextItem.zIndex;
      }
    }
  }, {
    key: "sendBackward",
    value: function sendBackward() {
      var _this3 = this;
      if (!this.selectedItemId) return;
      var sortedItems = this._getSortedItemsByZIndex();
      var currentIndex = sortedItems.findIndex(function (i) {
        return i.id == _this3.selectedItemId;
      });
      if (currentIndex > 0) {
        var currentItem = sortedItems[currentIndex];
        var prevItem = sortedItems[currentIndex - 1];
        var _ref2 = [prevItem.zIndex, currentItem.zIndex];
        currentItem.zIndex = _ref2[0];
        prevItem.zIndex = _ref2[1];
        this.element.querySelector("[data-item-id=\"".concat(currentItem.id, "\"]")).style.zIndex = currentItem.zIndex;
        this.element.querySelector("[data-item-id=\"".concat(prevItem.id, "\"]")).style.zIndex = prevItem.zIndex;
      }
    }

    // --- 6. TEXT STYLING --- //
  }, {
    key: "updateTextToolbarState",
    value: function updateTextToolbarState() {
      if (!this.selectedItemId) return;
      var item = this.boardItems.get(this.selectedItemId);
      if (!item || item.type !== 'text') return;
      var styles = item.content;
      this.fontFamilySelectTarget.value = styles.fontFamily || 'Helvetica, sans-serif';
      this.fontSizeInputTarget.value = styles.fontSize || 16;
      this.colorInputTarget.value = styles.color || '#000000';
      this.backgroundColorInputTarget.value = styles.backgroundColor || '#ffffff';
      this.borderColorInputTarget.value = styles.borderColor || '#000000';
      this.boldButtonTarget.classList.toggle('bg-gray-300', styles.fontWeight === 'bold');
      this.italicButtonTarget.classList.toggle('bg-gray-300', styles.fontStyle === 'italic');
    }
  }, {
    key: "changeTextStyle",
    value: function changeTextStyle(event) {
      if (!this.selectedItemId) return;
      var item = this.boardItems.get(this.selectedItemId);
      if (!item || item.type !== 'text') return;
      var target = event.currentTarget;
      var property = target.dataset.styleProperty;
      var value = target.dataset.styleValue || target.value;
      if (property === 'fontSize') {
        value = parseInt(value, 10);
      }
      item.content[property] = value;
      this.applyTextStyles(this.element.querySelector("[data-item-id=\"".concat(this.selectedItemId, "\"]")), item.content);
      this.updateTextToolbarState();
    }
  }, {
    key: "toggleTextStyle",
    value: function toggleTextStyle(event) {
      if (!this.selectedItemId) return;
      var item = this.boardItems.get(this.selectedItemId);
      if (!item || item.type !== 'text') return;
      var property = event.currentTarget.dataset.styleProperty;
      var activeValue = event.currentTarget.dataset.styleValue;
      var defaultValue = property === 'fontWeight' ? 'normal' : 'normal';
      item.content[property] = item.content[property] === activeValue ? defaultValue : activeValue;
      this.applyTextStyles(this.element.querySelector("[data-item-id=\"".concat(this.selectedItemId, "\"]")), item.content);
      this.updateTextToolbarState();
    }
  }, {
    key: "applyTextStyles",
    value: function applyTextStyles(element, styles) {
      element.style.fontFamily = styles.fontFamily || 'Helvetica, sans-serif';
      element.style.fontSize = "".concat(styles.fontSize || 16, "px");
      element.style.fontWeight = styles.fontWeight || 'normal';
      element.style.fontStyle = styles.fontStyle || 'normal';
      element.style.textAlign = styles.textAlign || 'left';
      element.style.color = styles.color || '#000000';
      element.style.backgroundColor = styles.backgroundColor || '#ffffff';
      element.style.borderColor = styles.borderColor || '#000000';
      element.style.borderWidth = styles.borderColor ? '1px' : '0';
    }

    // --- 7. ITEM CREATION & INTERACTION SETUP --- //
  }, {
    key: "_addItemToBoard",
    value: function _addItemToBoard(element, itemData) {
      var _this4 = this;
      if (typeof itemData.zIndex === 'undefined' || itemData.zIndex === null) {
        this.zCounter += 1;
        itemData.zIndex = this.zCounter;
      }
      element.style.zIndex = itemData.zIndex;
      this.canvasTarget.appendChild(element);
      if (itemData.type === 'line' || itemData.type === 'arrow') {
        this.makeLineInteractive(element);
      } else {
        this.makeItemInteractive(element);
      }
      this.boardItems.set(String(itemData.id), itemData);
      element.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        _this4.selectItem(element);
      });
      this.selectItem(element);
    }
  }, {
    key: "addAssetToBoard",
    value: function addAssetToBoard(assetId, thumbnailUrl, x, y) {
      var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 200;
      var height = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 200;
      var itemId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var zIndex = arguments.length > 7 ? arguments[7] : undefined;
      var finalItemId = itemId ? String(itemId) : "item-".concat((0,uuid__WEBPACK_IMPORTED_MODULE_45__["default"])());
      var boardItemEl = document.createElement('div');
      boardItemEl.classList.add('board-item', 'board-item-asset', 'absolute', 'p-1', 'bg-white', 'shadow-lg', 'box-border');
      boardItemEl.style.left = '0px';
      boardItemEl.style.top = '0px';
      boardItemEl.style.width = "".concat(width, "px");
      boardItemEl.style.height = "".concat(height, "px");
      boardItemEl.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
      boardItemEl.dataset.itemId = finalItemId;
      boardItemEl.setAttribute('data-x', x);
      boardItemEl.setAttribute('data-y', y);
      boardItemEl.innerHTML = "\n            <div class=\"asset-image-container w-full h-full\">\n                <img src=\"".concat(thumbnailUrl, "\" class=\"w-full h-full object-contain pointer-events-none\">\n            </div>\n            <div class=\"asset-button-ribbon\">\n                <button data-action=\"click->board#downloadAsset\" data-asset-id=\"").concat(assetId, "\" title=\"Download\" class=\"text-gray-500\">\n                    <svg class=\"h-6 w-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4\"></path></svg>\n                </button>\n                <button data-action=\"click->board#addToDownloadList\" data-asset-id=\"").concat(assetId, "\" title=\"Add to Download List\" class=\"text-gray-500\">\n                    <svg class=\"h-6 w-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z\"></path></svg>\n                </button>\n            </div>\n        ");
      var newContent = {
        assetId: assetId,
        thumbnailUrl: thumbnailUrl
      };
      var newItem = {
        id: finalItemId,
        type: 'asset',
        content: newContent,
        x: x,
        y: y,
        width: width,
        height: height,
        zIndex: zIndex
      };
      this._addItemToBoard(boardItemEl, newItem);
    }
  }, {
    key: "addGroupItemToBoard",
    value: function addGroupItemToBoard(x, y) {
      var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
      var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 250;
      var itemId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var content = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var zIndex = arguments.length > 6 ? arguments[6] : undefined;
      var finalItemId = itemId ? String(itemId) : "item-".concat((0,uuid__WEBPACK_IMPORTED_MODULE_45__["default"])());
      var groupEl = document.createElement('div');
      groupEl.classList.add('board-item', 'board-item-group', 'absolute');
      groupEl.style.left = '0px';
      groupEl.style.top = '0px';
      groupEl.style.width = "".concat(width, "px");
      groupEl.style.height = "".concat(height, "px");
      groupEl.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
      groupEl.dataset.itemId = finalItemId;
      groupEl.setAttribute('data-x', x);
      groupEl.setAttribute('data-y', y);
      var newItem = {
        id: finalItemId,
        type: 'group',
        content: content,
        x: x,
        y: y,
        width: width,
        height: height,
        zIndex: zIndex
      };
      this._addItemToBoard(groupEl, newItem);
    }
  }, {
    key: "addTextItemToBoard",
    value: function addTextItemToBoard(x, y) {
      var _this5 = this;
      var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
      var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
      var itemId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var content = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var zIndex = arguments.length > 6 ? arguments[6] : undefined;
      var finalItemId = itemId ? String(itemId) : "item-".concat((0,uuid__WEBPACK_IMPORTED_MODULE_45__["default"])());
      var textEl = document.createElement('div');
      textEl.classList.add('board-item', 'board-item-text', 'absolute');
      textEl.style.left = '0px';
      textEl.style.top = '0px';
      textEl.style.width = "".concat(width, "px");
      textEl.style.height = "".concat(height, "px");
      textEl.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
      textEl.dataset.itemId = finalItemId;
      textEl.setAttribute('data-x', x);
      textEl.setAttribute('data-y', y);
      textEl.setAttribute('contenteditable', 'true');
      var defaultStyles = {
        text: 'Type here...',
        fontFamily: 'Helvetica, sans-serif',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#000000',
        backgroundColor: '#ffffff',
        borderColor: '#d1d5db'
      };
      var newContent = _objectSpread(_objectSpread({}, defaultStyles), content);
      textEl.innerText = newContent.text;
      this.applyTextStyles(textEl, newContent);
      textEl.addEventListener('input', function () {
        var item = _this5.boardItems.get(finalItemId);
        if (item) item.content.text = textEl.innerText;
      });
      var newItem = {
        id: finalItemId,
        type: 'text',
        content: newContent,
        x: x,
        y: y,
        width: width,
        height: height,
        zIndex: zIndex
      };
      this._addItemToBoard(textEl, newItem);
      if (!itemId) textEl.focus();
    }
  }, {
    key: "addLineItemToBoard",
    value: function addLineItemToBoard(start, end, type) {
      var itemId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var content = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var zIndex = arguments.length > 5 ? arguments[5] : undefined;
      var finalItemId = itemId ? String(itemId) : "item-".concat((0,uuid__WEBPACK_IMPORTED_MODULE_45__["default"])());
      var newContent = _objectSpread({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y
      }, content);
      var svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgEl.classList.add('board-item', 'board-item-line');
      svgEl.dataset.itemId = finalItemId;
      var _this$getLineBounding = this.getLineBoundingBox(newContent),
        x = _this$getLineBounding.x,
        y = _this$getLineBounding.y,
        width = _this$getLineBounding.width,
        height = _this$getLineBounding.height;
      var newItem = {
        id: finalItemId,
        type: type,
        content: newContent,
        x: x,
        y: y,
        width: width,
        height: height,
        zIndex: zIndex
      };
      this.buildLineElement(svgEl, newItem);
      this._addItemToBoard(svgEl, newItem);
    }
  }, {
    key: "makeItemInteractive",
    value: function makeItemInteractive(element) {
      var _this6 = this;
      var resizableOptions = {
        edges: {
          left: true,
          right: true,
          bottom: true,
          top: true
        },
        listeners: {
          move: function move(event) {
            var target = event.target;
            var x = parseFloat(target.getAttribute('data-x')) || 0;
            var y = parseFloat(target.getAttribute('data-y')) || 0;
            target.style.width = "".concat(event.rect.width / _this6.zoom, "px");
            target.style.height = "".concat(event.rect.height / _this6.zoom, "px");
            x += event.deltaRect.left / _this6.zoom;
            y += event.deltaRect.top / _this6.zoom;
            target.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }
        }
      };
      if (element.classList.contains('board-item-asset')) {
        resizableOptions.modifiers = [interactjs__WEBPACK_IMPORTED_MODULE_44___default().modifiers.restrictSize({
          min: {
            width: 150,
            height: 150
          }
        })];
      }
      interactjs__WEBPACK_IMPORTED_MODULE_44___default()(element).draggable({
        inertia: true,
        listeners: {
          start: function start(event) {
            var target = event.target;
            event.interaction.startPos = {
              x: parseFloat(target.getAttribute('data-x')) || 0,
              y: parseFloat(target.getAttribute('data-y')) || 0
            };
          },
          move: function move(event) {
            var target = event.target;
            var startPos = event.interaction.startPos;
            var newX = startPos.x + (event.pageX - event.x0) / _this6.zoom;
            var newY = startPos.y + (event.pageY - event.y0) / _this6.zoom;
            target.style.transform = "translate(".concat(newX, "px, ").concat(newY, "px)");
            target.setAttribute('data-x', newX);
            target.setAttribute('data-y', newY);
          }
        }
      }).resizable({
        edges: {
          left: true,
          right: true,
          bottom: true,
          top: true
        },
        listeners: {
          move: function move(event) {
            var target = event.target;
            var x = parseFloat(target.getAttribute('data-x')) || 0;
            var y = parseFloat(target.getAttribute('data-y')) || 0;
            target.style.width = "".concat(event.rect.width / _this6.zoom, "px");
            target.style.height = "".concat(event.rect.height / _this6.zoom, "px");
            x += event.deltaRect.left / _this6.zoom;
            y += event.deltaRect.top / _this6.zoom;
            target.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }
        }
      }).on('dragend resizeend', function (event) {
        var target = event.target;
        var itemId = target.dataset.itemId;
        var item = _this6.boardItems.get(itemId);
        if (item) {
          item.x = parseFloat(target.getAttribute('data-x'));
          item.y = parseFloat(target.getAttribute('data-y'));
          item.width = parseFloat(target.style.width);
          item.height = parseFloat(target.style.height);
        }
        if (event.interaction) event.interaction.startPos = null;
      });
    }
  }, {
    key: "makeLineInteractive",
    value: function makeLineInteractive(svgEl) {
      var _this7 = this;
      var itemId = svgEl.dataset.itemId;
      var startHandle = svgEl.querySelector('.start-handle');
      var endHandle = svgEl.querySelector('.end-handle');
      interactjs__WEBPACK_IMPORTED_MODULE_44___default()(svgEl).draggable({
        allowFrom: '.hitbox-line',
        listeners: {
          start: function start(event) {
            var item = _this7.boardItems.get(itemId);
            if (!item) return;
            event.interaction.startPos = {
              x: item.x,
              y: item.y
            };
          },
          move: function move(event) {
            var newX = event.interaction.startPos.x + (event.pageX - event.x0) / _this7.zoom;
            var newY = event.interaction.startPos.y + (event.pageY - event.y0) / _this7.zoom;
            event.target.style.transform = "translate(".concat(newX, "px, ").concat(newY, "px");
            event.target.setAttribute('data-x', newX);
            event.target.setAttribute('data-y', newY);
          },
          end: function end(event) {
            var item = _this7.boardItems.get(itemId);
            if (!item) return;
            var oldX = item.x;
            var oldY = item.y;
            var newX = parseFloat(event.target.getAttribute('data-x'));
            var newY = parseFloat(event.target.getAttribute('data-y'));
            var dx = newX - oldX;
            var dy = newY - oldY;
            item.content.x1 += dx;
            item.content.y1 += dy;
            item.content.x2 += dx;
            item.content.y2 += dy;
            var _this7$getLineBoundin = _this7.getLineBoundingBox(item.content),
              x = _this7$getLineBoundin.x,
              y = _this7$getLineBoundin.y,
              width = _this7$getLineBoundin.width,
              height = _this7$getLineBoundin.height;
            item.x = x;
            item.y = y;
            item.width = width;
            item.height = height;
            event.interaction.startPos = null;
          }
        }
      });
      interactjs__WEBPACK_IMPORTED_MODULE_44___default()(startHandle).draggable({
        listeners: {
          move: function move(event) {
            var item = _this7.boardItems.get(itemId);
            if (!item) return;
            item.content.x1 += event.dx / _this7.zoom;
            item.content.y1 += event.dy / _this7.zoom;
            _this7.updateLineElement(svgEl, item);
          }
        }
      });
      interactjs__WEBPACK_IMPORTED_MODULE_44___default()(endHandle).draggable({
        listeners: {
          move: function move(event) {
            var item = _this7.boardItems.get(itemId);
            if (!item) return;
            item.content.x2 += event.dx / _this7.zoom;
            item.content.y2 += event.dy / _this7.zoom;
            _this7.updateLineElement(svgEl, item);
          }
        }
      });
    }

    // --- 8. ASSET CARD ACTIONS (New) --- //
  }, {
    key: "downloadAsset",
    value: function downloadAsset(event) {
      event.stopPropagation();
      var assetId = event.currentTarget.dataset.assetId;
      window.open("/asset/".concat(assetId, "/download"), '_blank');
    }
  }, {
    key: "addToDownloadList",
    value: function addToDownloadList(event) {
      event.stopPropagation();
      var button = event.currentTarget;
      var assetId = button.dataset.assetId;
      button.disabled = true;
      fetch("/download-list/add/".concat(assetId), {
        method: 'POST'
      }).then(function (response) {
        if (response.ok) {
          button.innerHTML = 'Added!';
          setTimeout(function () {
            // Revert back to plus icon after a delay
            button.innerHTML = '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            button.disabled = false;
          }, 2000);
        } else {
          button.innerHTML = 'Error';
          button.disabled = false;
        }
      });
    }

    // --- 9. HELPER FUNCTIONS --- //
  }, {
    key: "getLineBoundingBox",
    value: function getLineBoundingBox(content) {
      var x = Math.min(content.x1, content.x2);
      var y = Math.min(content.y1, content.y2);
      var width = Math.abs(content.x1 - content.x2);
      var height = Math.abs(content.y1 - content.y2);
      return {
        x: x,
        y: y,
        width: width,
        height: height
      };
    }
  }, {
    key: "buildLineElement",
    value: function buildLineElement(svgEl, item) {
      var _this$getLineBounding2 = this.getLineBoundingBox(item.content),
        x = _this$getLineBounding2.x,
        y = _this$getLineBounding2.y;
      svgEl.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
      svgEl.setAttribute('data-x', x);
      svgEl.setAttribute('data-y', y);
      var relX1 = item.content.x1 - x;
      var relY1 = item.content.y1 - y;
      var relX2 = item.content.x2 - x;
      var relY2 = item.content.y2 - y;
      svgEl.innerHTML = "\n            <line class=\"hitbox-line\" x1=\"".concat(relX1, "\" y1=\"").concat(relY1, "\" x2=\"").concat(relX2, "\" y2=\"").concat(relY2, "\" stroke=\"transparent\" stroke-width=\"15\"></line>\n            <line class=\"visual-line\" x1=\"").concat(relX1, "\" y1=\"").concat(relY1, "\" x2=\"").concat(relX2, "\" y2=\"").concat(relY2, "\" stroke=\"black\" stroke-width=\"2\" ").concat(item.type === 'arrow' ? 'marker-end="url(#arrowhead)"' : '', "></line>\n            <circle class=\"line-handle start-handle\" cx=\"").concat(relX1, "\" cy=\"").concat(relY1, "\" r=\"5\"></circle>\n            <circle class=\"line-handle end-handle\" cx=\"").concat(relX2, "\" cy=\"").concat(relY2, "\" r=\"5\"></circle>\n        ");
    }
  }, {
    key: "updateLineElement",
    value: function updateLineElement(svgEl, item) {
      var _this$getLineBounding3 = this.getLineBoundingBox(item.content),
        x = _this$getLineBounding3.x,
        y = _this$getLineBounding3.y;
      item.x = x;
      item.y = y;
      svgEl.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
      svgEl.setAttribute('data-x', x);
      svgEl.setAttribute('data-y', y);
      var relX1 = item.content.x1 - x;
      var relY1 = item.content.y1 - y;
      var relX2 = item.content.x2 - x;
      var relY2 = item.content.y2 - y;
      svgEl.querySelector('.hitbox-line').setAttribute('x1', relX1);
      svgEl.querySelector('.hitbox-line').setAttribute('y1', relY1);
      svgEl.querySelector('.hitbox-line').setAttribute('x2', relX2);
      svgEl.querySelector('.hitbox-line').setAttribute('y2', relY2);
      svgEl.querySelector('.visual-line').setAttribute('x1', relX1);
      svgEl.querySelector('.visual-line').setAttribute('y1', relY1);
      svgEl.querySelector('.visual-line').setAttribute('x2', relX2);
      svgEl.querySelector('.visual-line').setAttribute('y2', relY2);
      svgEl.querySelector('.start-handle').setAttribute('cx', relX1);
      svgEl.querySelector('.start-handle').setAttribute('cy', relY1);
      svgEl.querySelector('.end-handle').setAttribute('cx', relX2);
      svgEl.querySelector('.end-handle').setAttribute('cy', relY2);
    }

    // --- 10. STATE MANAGEMENT & API --- //
  }, {
    key: "loadBoardState",
    value: function () {
      var _loadBoardState = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this8 = this;
        var response, items, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return fetch("/boards/".concat(this.boardIdValue, "/items"));
            case 1:
              response = _context.v;
              if (response.ok) {
                _context.n = 2;
                break;
              }
              throw new Error("Network response was not ok: ".concat(response.statusText));
            case 2:
              _context.n = 3;
              return response.json();
            case 3:
              items = _context.v;
              this.canvasTarget.innerHTML = '';
              this.boardItems.clear();
              this.zCounter = 0;
              items.forEach(function (item) {
                try {
                  _this8.createItemFromData(item);
                  if (item.zIndex > _this8.zCounter) _this8.zCounter = item.zIndex;
                } catch (e) {
                  console.error('Failed to render a board item:', {
                    item: item,
                    error: e
                  });
                }
              });
              this.deselectAll();
              this.frameContent();
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.error("Fatal error loading board state:", _t);
              this.canvasTarget.innerHTML = "<div class=\"p-4 text-red-600 bg-red-100 border border-red-400 rounded\">Could not load board.</div>";
            case 5:
              return _context.a(2);
          }
        }, _callee, this, [[0, 4]]);
      }));
      function loadBoardState() {
        return _loadBoardState.apply(this, arguments);
      }
      return loadBoardState;
    }()
  }, {
    key: "saveBoardState",
    value: function () {
      var _saveBoardState = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this9 = this;
        var isAutoSave,
          payload,
          response,
          serverItems,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              isAutoSave = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
              if (!this.isSaving) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              this.isSaving = true;
              if (!isAutoSave) {
                this.saveBtnTarget.textContent = 'Saving...';
                this.saveBtnTarget.disabled = true;
              }
              payload = Array.from(this.boardItems.values());
              _context2.p = 2;
              _context2.n = 3;
              return fetch("/boards/".concat(this.boardIdValue, "/save"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                  items: payload
                })
              });
            case 3:
              response = _context2.v;
              if (response.ok) {
                _context2.n = 4;
                break;
              }
              throw new Error('Failed to save board');
            case 4:
              _context2.n = 5;
              return response.json();
            case 5:
              serverItems = _context2.v;
              this._syncStateFromServer(serverItems);
              if (!isAutoSave) {
                this.saveBtnTarget.textContent = 'Saved!';
                setTimeout(function () {
                  _this9.saveBtnTarget.textContent = 'Save';
                  _this9.saveBtnTarget.disabled = false;
                }, 1500);
              }
              _context2.n = 7;
              break;
            case 6:
              _context2.p = 6;
              _t2 = _context2.v;
              console.error('Save error:', _t2);
              if (!isAutoSave) {
                this.saveBtnTarget.textContent = 'Save Failed';
                setTimeout(function () {
                  _this9.saveBtnTarget.textContent = 'Save';
                  _this9.saveBtnTarget.disabled = false;
                }, 2000);
              }
            case 7:
              _context2.p = 7;
              this.isSaving = false;
              return _context2.f(7);
            case 8:
              return _context2.a(2);
          }
        }, _callee2, this, [[2, 6, 7, 8]]);
      }));
      function saveBoardState() {
        return _saveBoardState.apply(this, arguments);
      }
      return saveBoardState;
    }()
  }, {
    key: "_syncStateFromServer",
    value: function _syncStateFromServer(serverItems) {
      var _this0 = this;
      var newBoardItems = new Map();
      serverItems.forEach(function (serverItem) {
        var serverId = String(serverItem.id);
        var localItem;
        if (serverItem.tempId && _this0.boardItems.has(serverItem.tempId)) {
          localItem = _this0.boardItems.get(serverItem.tempId);
          localItem.id = serverId;
        } else {
          localItem = _this0.boardItems.get(serverId);
        }
        if (localItem) {
          localItem.zIndex = serverItem.zIndex;
          newBoardItems.set(serverId, localItem);
        } else {
          var newItemData = _objectSpread(_objectSpread({}, serverItem), {}, {
            id: serverId,
            x: serverItem.pos_x,
            y: serverItem.pos_y
          });
          newBoardItems.set(serverId, newItemData);
        }
      });
      this.boardItems = newBoardItems;
      this.canvasTarget.querySelectorAll('.board-item').forEach(function (element) {
        if (!_this0.boardItems.has(element.dataset.itemId)) element.remove();
      });
      this.boardItems.forEach(function (item) {
        var element = _this0.canvasTarget.querySelector("[data-item-id=\"".concat(item.id, "\"]"));
        if (!element) {
          _this0.createItemFromData(item);
        } else {
          element.style.zIndex = item.zIndex;
          var domItem = _this0.boardItems.get(element.dataset.itemId);
          if (domItem) {
            element.style.transform = "translate(".concat(domItem.x, "px, ").concat(domItem.y, "px)");
          }
        }
      });
    }
  }, {
    key: "createItemFromData",
    value: function createItemFromData(itemData) {
      var _itemData$pos_x, _itemData$pos_y;
      var x = (_itemData$pos_x = itemData.pos_x) !== null && _itemData$pos_x !== void 0 ? _itemData$pos_x : itemData.x;
      var y = (_itemData$pos_y = itemData.pos_y) !== null && _itemData$pos_y !== void 0 ? _itemData$pos_y : itemData.y;
      if (itemData.type === 'line' || itemData.type === 'arrow') {
        this.addLineItemToBoard({
          x: itemData.content.x1,
          y: itemData.content.y1
        }, {
          x: itemData.content.x2,
          y: itemData.content.y2
        }, itemData.type, itemData.id, itemData.content, itemData.zIndex);
      } else if (itemData.type === 'asset') {
        this.addAssetToBoard(itemData.content.assetId, itemData.content.thumbnailUrl, x, y, itemData.width, itemData.height, itemData.id, itemData.zIndex);
      } else if (itemData.type === 'text') {
        this.addTextItemToBoard(x, y, itemData.width, itemData.height, itemData.id, itemData.content, itemData.zIndex);
      } else if (itemData.type === 'group') {
        this.addGroupItemToBoard(x, y, itemData.width, itemData.height, itemData.id, itemData.content, itemData.zIndex);
      }
    }
  }, {
    key: "searchAssets",
    value: function () {
      var _searchAssets = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(event) {
        var _this1 = this;
        var query;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              query = event.target.value;
              if (!(query.length < 2)) {
                _context3.n = 1;
                break;
              }
              this.assetListTarget.innerHTML = '';
              return _context3.a(2);
            case 1:
              fetch("/boards/assets/search?q=".concat(query)).then(function (response) {
                return response.json();
              }).then(function (assets) {
                _this1.assetListTarget.innerHTML = '';
                assets.forEach(function (asset) {
                  var assetElement = _this1.createAssetElement(asset);
                  _this1.assetListTarget.appendChild(assetElement);
                });
              });
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function searchAssets(_x) {
        return _searchAssets.apply(this, arguments);
      }
      return searchAssets;
    }()
  }, {
    key: "createAssetElement",
    value: function createAssetElement(asset) {
      var assetElement = document.createElement('div');
      assetElement.classList.add('p-2', 'border-b', 'cursor-move', 'asset-item', 'flex', 'items-center');
      assetElement.dataset.assetId = asset.id;
      assetElement.dataset.assetName = asset.name;
      assetElement.dataset.assetThumbnail = asset.thumbnail_path;
      assetElement.innerHTML = "\n            <img src=\"".concat(asset.thumbnail_path, "\" alt=\"").concat(asset.name, "\" class=\"w-12 h-12 object-cover inline-block mr-3 pointer-events-none\">\n            <span class=\"text-sm pointer-events-none\">").concat(asset.name, "</span>\n        ");
      return assetElement;
    }
  }, {
    key: "initAssetPanelAndDropzone",
    value: function initAssetPanelAndDropzone() {
      var _this10 = this;
      interactjs__WEBPACK_IMPORTED_MODULE_44___default()('#asset-list .asset-item').draggable({
        inertia: true,
        listeners: {
          start: function start(event) {
            var original = event.target;
            var clone = original.cloneNode(true);
            clone.classList.add('dragging-clone');
            document.body.appendChild(clone);
            event.interaction.clone = clone;
            var rect = original.getBoundingClientRect();
            clone.style.left = "".concat(rect.left, "px");
            clone.style.top = "".concat(rect.top, "px");
          },
          move: function move(event) {
            var clone = event.interaction.clone;
            var x = (parseFloat(clone.getAttribute('data-x')) || 0) + event.dx;
            var y = (parseFloat(clone.getAttribute('data-y')) || 0) + event.dy;
            clone.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
            clone.setAttribute('data-x', x);
            clone.setAttribute('data-y', y);
          },
          end: function end(event) {
            event.interaction.clone.remove();
          }
        }
      });
      interactjs__WEBPACK_IMPORTED_MODULE_44___default()(this.viewportTarget).dropzone({
        accept: '.asset-item',
        ondrop: function ondrop(event) {
          var droppedElement = event.relatedTarget;
          var viewportRect = _this10.viewportTarget.getBoundingClientRect();
          var dropX_viewport = event.dragEvent.client.x - viewportRect.left;
          var dropY_viewport = event.dragEvent.client.y - viewportRect.top;
          var dropX_canvas = (dropX_viewport - _this10.pan.x) / _this10.zoom;
          var dropY_canvas = (dropY_viewport - _this10.pan.y) / _this10.zoom;
          var assetId = droppedElement.dataset.assetId;
          var assetThumbnail = droppedElement.dataset.assetThumbnail;
          _this10.addAssetToBoard(assetId, assetThumbnail, dropX_canvas, dropY_canvas);
        }
      });
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_43__.Controller);
_defineProperty(_default, "targets", ["canvas", "svgCanvas", "viewport", "assetSearch", "assetList", "saveBtn", "zoomValue", "contextToolbar", "textContextToolbar", "fontFamilySelect", "fontSizeInput", "boldButton", "italicButton", "colorInput", "backgroundColorInput", "borderColorInput"]);
_defineProperty(_default, "values", {
  boardId: Number
});


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/brand_filter_controller.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/brand_filter_controller.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }























function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "filter",
    value: function filter(event) {
      var parentId = event.currentTarget.value;
      var checkboxes = this.brandListTarget.querySelectorAll('div.form-check');
      checkboxes.forEach(function (checkboxDiv) {
        var input = checkboxDiv.querySelector('input[type="checkbox"]');

        // Show the checkbox if "All" is selected or if its parent ID matches
        if (parentId === "" || input.dataset.parentId === parentId) {
          checkboxDiv.style.display = 'block';
        } else {
          checkboxDiv.style.display = 'none';
        }
      });
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_23__.Controller);
_defineProperty(_default, "targets", ["brandList"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/csrf_protection_controller.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/csrf_protection_controller.js ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ controller)
/* harmony export */ });
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");

const controller = class extends _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__.Controller {
    constructor(context) {
        super(context);
        this.__stimulusLazyController = true;
    }
    initialize() {
        if (this.application.controllers.find((controller) => {
            return controller.identifier === this.identifier && controller.__stimulusLazyController;
        })) {
            return;
        }
        Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_core-js_modules_es_array-buffer_constructor_js-node_modules_core-js_modu-cebe39"), __webpack_require__.e("assets_controllers_csrf_protection_controller_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./assets/controllers/csrf_protection_controller.js */ "./assets/controllers/csrf_protection_controller.js")).then((controller) => {
            this.application.register(this.identifier, controller.default);
        });
    }
};


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/direct_share_controller.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/direct_share_controller.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.reduce.js */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_date_to_json_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.date.to-json.js */ "./node_modules/core-js/modules/es.date.to-json.js");
/* harmony import */ var core_js_modules_es_date_to_json_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_json_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.json.stringify.js */ "./node_modules/core-js/modules/es.json.stringify.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! core-js/modules/es.regexp.test.js */ "./node_modules/core-js/modules/es.regexp.test.js");
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var core_js_modules_esnext_iterator_reduce_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! core-js/modules/esnext.iterator.reduce.js */ "./node_modules/core-js/modules/esnext.iterator.reduce.js");
/* harmony import */ var core_js_modules_esnext_iterator_reduce_js__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_reduce_js__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
/* harmony import */ var tus_js_client__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! tus-js-client */ "./node_modules/tus-js-client/lib.esm/browser/index.js");
/* harmony import */ var _upload_metadata__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./upload_metadata */ "./assets/controllers/upload_metadata.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }








































function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    var _this;
    _classCallCheck(this, _default);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, _default, [].concat(args));
    _defineProperty(_this, "pollingInterval", null);
    _defineProperty(_this, "selectedFiles", []);
    return _this;
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "connect",
    value: function connect() {
      var _this2 = this;
      this.dropzoneTarget.addEventListener('click', function () {
        return _this2.fileInputTarget.click();
      });
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
      }
    }
  }, {
    key: "dragover",
    value: function dragover(event) {
      event.preventDefault();
      this.dropzoneTarget.classList.add('border-violet-500', 'bg-gray-50');
    }
  }, {
    key: "dragleave",
    value: function dragleave(event) {
      event.preventDefault();
      this.dropzoneTarget.classList.remove('border-violet-500', 'bg-gray-50');
    }
  }, {
    key: "drop",
    value: function drop(event) {
      event.preventDefault();
      this.fileInputTarget.files = event.dataTransfer.files;
      this.dragleave(event);
      this.filesSelected();
    }
  }, {
    key: "filesSelected",
    value: function filesSelected() {
      this.selectedFiles = Array.from(this.fileInputTarget.files);
      if (this.selectedFiles.length > 0) {
        var totalBytes = this.selectedFiles.reduce(function (sum, file) {
          return sum + file.size;
        }, 0);
        var label = this.selectedFiles.length === 1 ? 'file' : 'files';
        this.fileSummaryTarget.textContent = "".concat(this.selectedFiles.length, " ").concat(label, " selected (").concat(this.formatFileSize(totalBytes), ")");
        this.renderSelectedFiles();
        this.submitButtonTarget.disabled = false;
      } else {
        this.fileSummaryTarget.textContent = 'No files selected';
        this.fileListTarget.innerHTML = '';
        this.submitButtonTarget.disabled = true;
      }
    }
  }, {
    key: "upload",
    value: function () {
      var _upload = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
        var _yield$this$createSha, shareToken, totalBytes, completedBytes, _iterator, _step, _step$value, index, file, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              event.preventDefault();
              if (!(this.selectedFiles.length === 0)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              this.resultContainerTarget.classList.add('hidden');
              this.submitButtonTarget.disabled = true;
              this.fileInputTarget.disabled = true;
              this.dropzoneTarget.style.pointerEvents = 'none';
              this.progressContainerTarget.classList.remove('hidden');
              this.progressBarTarget.style.width = '0%';
              this.progressTextTarget.textContent = 'Preparing upload...';
              _context.p = 2;
              _context.n = 3;
              return this.createShareSession();
            case 3:
              _yield$this$createSha = _context.v;
              shareToken = _yield$this$createSha.token;
              totalBytes = this.selectedFiles.reduce(function (sum, file) {
                return sum + file.size;
              }, 0);
              completedBytes = 0;
              _iterator = _createForOfIteratorHelper(this.selectedFiles.entries());
              _context.p = 4;
              _iterator.s();
            case 5:
              if ((_step = _iterator.n()).done) {
                _context.n = 8;
                break;
              }
              _step$value = _slicedToArray(_step.value, 2), index = _step$value[0], file = _step$value[1];
              this.updateFileStatus(index, 'Uploading...', 'text-violet-600');
              _context.n = 6;
              return this.uploadSingleFile(file, index, shareToken, completedBytes, totalBytes);
            case 6:
              completedBytes += file.size;
              this.updateFileStatus(index, 'Uploaded', 'text-green-600');
            case 7:
              _context.n = 5;
              break;
            case 8:
              _context.n = 10;
              break;
            case 9:
              _context.p = 9;
              _t = _context.v;
              _iterator.e(_t);
            case 10:
              _context.p = 10;
              _iterator.f();
              return _context.f(10);
            case 11:
              this.progressBarTarget.style.width = '100%';
              this.progressTextTarget.textContent = 'Uploads finished. Finalizing share...';
              this.startPolling(shareToken, this.selectedFiles.length);
              _context.n = 13;
              break;
            case 12:
              _context.p = 12;
              _t2 = _context.v;
              this.progressTextTarget.textContent = 'Upload failed.';
              alert("Upload failed: ".concat(_t2));
              this.submitButtonTarget.disabled = false;
              this.fileInputTarget.disabled = false;
              this.dropzoneTarget.style.pointerEvents = 'auto';
            case 13:
              return _context.a(2);
          }
        }, _callee, this, [[4, 9, 10, 11], [2, 12]]);
      }));
      function upload(_x) {
        return _upload.apply(this, arguments);
      }
      return upload;
    }()
  }, {
    key: "createShareSession",
    value: function () {
      var _createShareSession = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var response;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return fetch('/admin/direct-share/session', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  expectedFileCount: this.selectedFiles.length
                })
              });
            case 1:
              response = _context2.v;
              if (response.ok) {
                _context2.n = 2;
                break;
              }
              throw new Error('Unable to create share session.');
            case 2:
              return _context2.a(2, response.json());
          }
        }, _callee2, this);
      }));
      function createShareSession() {
        return _createShareSession.apply(this, arguments);
      }
      return createShareSession;
    }()
  }, {
    key: "uploadSingleFile",
    value: function uploadSingleFile(file, index, shareToken, completedBytes, totalBytes) {
      var _this3 = this;
      var _createTusUploadMetad = (0,_upload_metadata__WEBPACK_IMPORTED_MODULE_42__.createTusUploadMetadata)(file, shareToken, this.selectedFiles.length),
        uploadKey = _createTusUploadMetad.uploadKey,
        metadata = _createTusUploadMetad.metadata;
      return new Promise(function (resolve, reject) {
        var upload = new tus_js_client__WEBPACK_IMPORTED_MODULE_41__.Upload(file, {
          endpoint: '/admin/direct-share/upload/',
          chunkSize: 100 * 1024 * 1024,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          headers: {
            'Upload-Key': uploadKey,
            'X-UPLOAD-AUTH': _this3.authTokenValue
          },
          metadata: metadata,
          onProgress: function onProgress(bytesUploaded) {
            var overallUploaded = completedBytes + bytesUploaded;
            var percentage = totalBytes > 0 ? (overallUploaded / totalBytes * 100).toFixed(2) : '0.00';
            var filePercentage = file.size > 0 ? (bytesUploaded / file.size * 100).toFixed(2) : '0.00';
            _this3.progressBarTarget.style.width = "".concat(percentage, "%");
            _this3.progressTextTarget.textContent = "Uploading file ".concat(index + 1, " of ").concat(_this3.selectedFiles.length, " (").concat(percentage, "%)");
            _this3.updateFileStatus(index, "".concat(filePercentage, "%"), 'text-violet-600');
          },
          onSuccess: function onSuccess() {
            return resolve();
          },
          onError: function onError(error) {
            _this3.updateFileStatus(index, 'Failed', 'text-red-600');
            reject(error);
          }
        });
        upload.start();
      });
    }
  }, {
    key: "startPolling",
    value: function startPolling(token, expectedCount) {
      var _this4 = this;
      var pollCount = 0;
      var maxPolls = 300;
      this.pollingInterval = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var response, _data$processedCount, data, _data, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (!(pollCount >= maxPolls)) {
                _context3.n = 1;
                break;
              }
              clearInterval(_this4.pollingInterval);
              alert("File processing is taking longer than expected. Please try again later.");
              return _context3.a(2);
            case 1:
              _context3.p = 1;
              _context3.n = 2;
              return fetch("/admin/direct-share/status/".concat(encodeURIComponent(token), "?expected=").concat(expectedCount));
            case 2:
              response = _context3.v;
              if (!(response.status === 202)) {
                _context3.n = 4;
                break;
              }
              _context3.n = 3;
              return response.json();
            case 3:
              data = _context3.v;
              _this4.progressTextTarget.textContent = "Finalizing share... ".concat((_data$processedCount = data.processedCount) !== null && _data$processedCount !== void 0 ? _data$processedCount : 0, " of ").concat(expectedCount, " files ready");
            case 4:
              if (!(response.status === 200)) {
                _context3.n = 6;
                break;
              }
              _context3.n = 5;
              return response.json();
            case 5:
              _data = _context3.v;
              if (_data.status === 'complete') {
                clearInterval(_this4.pollingInterval);
                _this4.progressContainerTarget.classList.add('hidden');
                _this4.urlInputTarget.value = _data.url;
                _this4.resultContainerTarget.classList.remove('hidden');
                _this4.fileInputTarget.disabled = false;
                _this4.dropzoneTarget.style.pointerEvents = 'auto';
              }
            case 6:
              _context3.n = 8;
              break;
            case 7:
              _context3.p = 7;
              _t3 = _context3.v;
              clearInterval(_this4.pollingInterval);
              alert("An error occurred while checking the file status.");
            case 8:
              pollCount++;
            case 9:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 7]]);
      })), 2000); // Check every 2 seconds
    }
  }, {
    key: "renderSelectedFiles",
    value: function renderSelectedFiles() {
      var _this5 = this;
      this.fileListTarget.innerHTML = '';
      this.selectedFiles.forEach(function (file, index) {
        var item = document.createElement('li');
        item.className = 'flex items-center justify-between gap-4 rounded-md bg-gray-50 px-3 py-2';
        item.dataset.index = String(index);
        var name = document.createElement('span');
        name.className = 'truncate text-sm text-gray-700';
        name.textContent = "".concat(file.name, " (").concat(_this5.formatFileSize(file.size), ")");
        var status = document.createElement('span');
        status.className = 'text-xs text-gray-500';
        status.dataset.role = 'status';
        status.textContent = 'Pending';
        item.append(name, status);
        _this5.fileListTarget.appendChild(item);
      });
    }
  }, {
    key: "updateFileStatus",
    value: function updateFileStatus(index, text, className) {
      var status = this.fileListTarget.querySelector("[data-index=\"".concat(index, "\"] [data-role=\"status\"]"));
      if (!status) {
        return;
      }
      status.className = "text-xs ".concat(className);
      status.textContent = text;
    }
  }, {
    key: "formatFileSize",
    value: function formatFileSize(bytes) {
      if (bytes === 0) {
        return '0 B';
      }
      var units = ['B', 'KB', 'MB', 'GB', 'TB'];
      var exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
      var size = bytes / Math.pow(1024, exponent);
      return "".concat(size.toFixed(exponent === 0 ? 0 : 2), " ").concat(units[exponent]);
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_40__.Controller);
_defineProperty(_default, "targets", ["fileInput", "dropzone", "fileSummary", "fileList", "submitButton", "progressContainer", "progressBar", "progressText", "resultContainer", "urlInput"]);
_defineProperty(_default, "values", {
  authToken: String
});


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/dropdown_controller.js":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/dropdown_controller.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }



















function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/**
 * A simple dropdown controller that toggles a menu's visibility.
 * It also closes the menu if the user clicks outside of it.
 */
var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "connect",
    value:
    // This method is called when the controller is connected to the DOM.
    function connect() {
      // Bind the `this.close` method to the current instance of the controller.
      // This is necessary so that when `close` is called from the window event,
      // `this` correctly refers to the controller instance.
      this.close = this.close.bind(this);
    }

    /**
     * Toggles the visibility of the dropdown menu.
     */
  }, {
    key: "toggle",
    value: function toggle() {
      this.menuTarget.classList.toggle('hidden');

      // If the menu is now visible, listen for clicks on the window to close it.
      // If it's hidden, stop listening.
      if (!this.menuTarget.classList.contains('hidden')) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }

    /**
     * Closes the dropdown menu if the click is outside of the controller's element.
     * @param {MouseEvent} event
     */
  }, {
    key: "close",
    value: function close(event) {
      // Check if the click happened inside the dropdown's parent element.
      // The `this.element` refers to the div with `data-controller="dropdown"`.
      if (!this.element.contains(event.target)) {
        this.menuTarget.classList.add('hidden');
        window.removeEventListener('click', this.close);
      }
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__.Controller);
// The "menu" is the element that will be shown or hidden.
_defineProperty(_default, "targets", ["menu"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/filter_controller.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/filter_controller.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }



















function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "toggle",
    value: function toggle(event) {
      var parentElement = event.currentTarget;
      var childrenContainer = parentElement.nextElementSibling;
      var icon = parentElement.querySelector('svg');
      if (childrenContainer && childrenContainer.classList.contains('sub-brands')) {
        childrenContainer.classList.toggle('hidden');
        icon.classList.toggle('rotate-90');
      }
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__.Controller);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/filter_form_controller.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/filter_form_controller.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }



















function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


/**
 * This controller automatically submits the form it is attached to
 * whenever an element with a data-action triggers it.
 */
var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "submit",
    value: function submit() {
      this.element.requestSubmit();
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__.Controller);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/hello_controller.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/hello_controller.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }



















function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


/*
 * This is an example Stimulus controller!
 *
 * Any element with a data-controller="hello" attribute will cause
 * this controller to be executed. The name "hello" comes from the filename:
 * hello_controller.js -> "hello"
 *
 * Delete this file or adapt it for your use!
 */
var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "connect",
    value: function connect() {
      this.element.textContent = 'Hello Stimulus! Edit me in assets/controllers/hello_controller.js';
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__.Controller);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/home_dashboard_controller.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/home_dashboard_controller.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
























function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "selectBrand",
    value: function () {
      var _selectBrand = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
        var clickedButton, brandId, response, data;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              clickedButton = event.currentTarget;
              brandId = clickedButton.dataset.brandId; // Toggle active button styles
              this.brandButtonTargets.forEach(function (button) {
                button.classList.remove('bg-violet-600', 'text-white');
                button.classList.add('bg-white', 'text-gray-700');
              });
              clickedButton.classList.add('bg-violet-600', 'text-white');
              clickedButton.classList.remove('bg-white', 'text-gray-700');

              // Show loading state
              this.brandsContainerTarget.innerHTML = '';
              this.recentAssetsContainerTarget.innerHTML = '<p class="text-center">Loading...</p>';
              this.collectionsContainerTarget.innerHTML = '';
              this.categoriesContainerTarget.innerHTML = '';

              // Fetch and render the new content
              _context.n = 1;
              return fetch("/home/brand-content/".concat(brandId));
            case 1:
              response = _context.v;
              _context.n = 2;
              return response.json();
            case 2:
              data = _context.v;
              this.brandsContainerTarget.innerHTML = data.brands;
              this.recentAssetsContainerTarget.innerHTML = data.recentAssets;
              this.collectionsContainerTarget.innerHTML = data.collections;
              this.categoriesContainerTarget.innerHTML = data.categories;
            case 3:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function selectBrand(_x) {
        return _selectBrand.apply(this, arguments);
      }
      return selectBrand;
    }()
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_24__.Controller);
_defineProperty(_default, "targets", ["brandButton", "brandsContainer", "recentAssetsContainer", "collectionsContainer", "categoriesContainer"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/home_filter_controller.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/home_filter_controller.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/es.regexp.test.js */ "./node_modules/core-js/modules/es.regexp.test.js");
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

































function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "filter",
    value: function () {
      var _filter = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
        var clickedButton, brandId, _yield$Promise$all, _yield$Promise$all2, categoriesResponse, collectionsResponse, categoriesData, collectionsData;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              clickedButton = event.currentTarget;
              brandId = clickedButton.dataset.brandId; // Visually toggle the active state of the buttons
              this.brandContainerTarget.querySelectorAll('button').forEach(function (button) {
                if (button === clickedButton) {
                  button.classList.add('bg-violet-50', 'text-violet-700');
                } else {
                  button.classList.remove('bg-violet-50', 'text-violet-700');
                }
              });
              if (brandId) {
                _context.n = 1;
                break;
              }
              this.categoryContainerTarget.innerHTML = '';
              this.collectionContainerTarget.innerHTML = '';
              return _context.a(2);
            case 1:
              _context.n = 2;
              return Promise.all([fetch("/filters/categories-for-brand/".concat(brandId)), fetch("/filters/collections-for-brand/".concat(brandId))]);
            case 2:
              _yield$Promise$all = _context.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              categoriesResponse = _yield$Promise$all2[0];
              collectionsResponse = _yield$Promise$all2[1];
              _context.n = 3;
              return categoriesResponse.json();
            case 3:
              categoriesData = _context.v;
              _context.n = 4;
              return collectionsResponse.json();
            case 4:
              collectionsData = _context.v;
              this.categoryContainerTarget.innerHTML = categoriesData.content;
              this.collectionContainerTarget.innerHTML = collectionsData.content;
            case 5:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function filter(_x) {
        return _filter.apply(this, arguments);
      }
      return filter;
    }()
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_33__.Controller);
_defineProperty(_default, "targets", ["brandContainer", "categoryContainer", "collectionContainer"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/list_item_controller.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/list_item_controller.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");



















function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "toggleEdit",
    value: function toggleEdit(event) {
      event.preventDefault();
      this.nameDisplayTarget.classList.add('hidden');
      this.nameFormTarget.classList.remove('hidden');
      this.nameFormTarget.querySelector('input').focus();
    }
  }, {
    key: "toggleExpirationEdit",
    value: function toggleExpirationEdit(event) {
      event.preventDefault();
      this.expirationDisplayTarget.classList.add('hidden');
      this.expirationFormTarget.classList.remove('hidden');
      this.expirationFormTarget.querySelector('input').focus();
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__.Controller);
_defineProperty(_default, "targets", ["nameDisplay", "nameForm", "expirationDisplay", "expirationForm"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/permalink_generator_controller.js":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/permalink_generator_controller.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_last_index_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.last-index-of.js */ "./node_modules/core-js/modules/es.array.last-index-of.js");
/* harmony import */ var core_js_modules_es_array_last_index_of_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_last_index_of_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_esnext_iterator_find_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! core-js/modules/esnext.iterator.find.js */ "./node_modules/core-js/modules/esnext.iterator.find.js");
/* harmony import */ var core_js_modules_esnext_iterator_find_js__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_find_js__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


































function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    var _this;
    _classCallCheck(this, _default);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, _default, [].concat(args));
    _defineProperty(_this, "generatedLinks", []);
    _defineProperty(_this, "generatedToken", null);
    return _this;
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "openModal",
    value: function openModal() {
      this.modalTarget.classList.remove('hidden');
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.modalTarget.classList.add('hidden');
    }
  }, {
    key: "generate",
    value: function () {
      var _generate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
        var _this2 = this;
        var width, height, padding, extension, imageAssets, sharedToken, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              event.preventDefault();
              this.generatedLinks = [];
              width = this.widthInputTarget.value;
              height = this.heightInputTarget.value;
              padding = Number(this.paddingInputTarget.value || 0);
              extension = this.extensionInputTarget.value;
              if (!(!width || !height)) {
                _context.n = 1;
                break;
              }
              alert('Please enter both width and height.');
              return _context.a(2);
            case 1:
              imageAssets = Array.from(this.element.querySelectorAll('[data-image-asset="true"]'));
              if (!(imageAssets.length === 0)) {
                _context.n = 2;
                break;
              }
              alert('No compatible assets are available for web links.');
              return _context.a(2);
            case 2:
              _context.p = 2;
              _context.n = 3;
              return this.resolveShareToken(imageAssets);
            case 3:
              sharedToken = _context.v;
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.error(_t);
              alert(_t instanceof Error ? _t.message : 'Could not generate web links.');
              return _context.a(2);
            case 5:
              imageAssets.forEach(function (assetElement) {
                var _assetElement$dataset = assetElement.dataset,
                  assetId = _assetElement$dataset.assetId,
                  filename = _assetElement$dataset.filename,
                  sku = _assetElement$dataset.sku,
                  assetName = _assetElement$dataset.assetName;
                var token = assetElement.dataset.token || sharedToken;
                var permalinkContainer = assetElement.querySelector('.permalink-container');
                var extensionIndex = filename.lastIndexOf('.');
                var cleanFilename = extensionIndex > 0 ? filename.substring(0, extensionIndex) : filename;
                var inputId = "permalink-".concat(assetId, "-").concat(width, "x").concat(height, "-").concat(padding, "-").concat(extension);
                if (!token || !permalinkContainer) {
                  return;
                }
                assetElement.dataset.token = token;
                var relativeUrl = "/share/".concat(token, "/image/").concat(assetId, "/").concat(width, "x").concat(height, "/");
                if (padding > 0) {
                  relativeUrl += "".concat(padding, "/");
                }
                relativeUrl += "".concat(cleanFilename, ".").concat(extension);
                var fullUrl = _this2.baseUrlValue + relativeUrl;
                _this2.generatedLinks.push({
                  sku: sku || '',
                  name: assetName || '',
                  webLinkUrl: fullUrl
                });
                var wrapper = document.createElement('div');
                wrapper.className = 'relative flex items-center mt-2';
                var input = document.createElement('input');
                input.type = 'text';
                input.id = inputId;
                input.readOnly = true;
                input.value = fullUrl;
                input.className = 'w-full bg-gray-100 border-gray-300 rounded-md p-2 pr-10 text-xs transition-colors duration-200';
                var copyButton = document.createElement('copy-to-clipboard');
                copyButton.setAttribute('for', inputId);
                copyButton.className = 'absolute inset-y-0 right-0 pr-3 flex items-center';
                var openLink = document.createElement('a');
                openLink.href = fullUrl;
                openLink.target = '_blank';
                openLink.rel = 'noopener noreferrer';
                openLink.className = 'inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 mt-2';
                openLink.textContent = 'Open Web Link';
                wrapper.append(input, copyButton);
                permalinkContainer.replaceChildren(wrapper, openLink);
              });
              if (!(this.generatedLinks.length > 0)) {
                _context.n = 6;
                break;
              }
              this.csvButtonContainerTarget.classList.remove('hidden');
              this.closeModal();
              return _context.a(2);
            case 6:
              alert('No compatible assets are available for web links.');
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[2, 4]]);
      }));
      function generate(_x) {
        return _generate.apply(this, arguments);
      }
      return generate;
    }()
  }, {
    key: "downloadCsv",
    value: function downloadCsv() {
      if (this.generatedLinks.length === 0) {
        alert('Please generate links first.');
        return;
      }
      var csvContent = "data:text/csv;charset=utf-8,";
      // Add headers
      csvContent += "sku,name,webLinkUrl\r\n";

      // Add rows
      this.generatedLinks.forEach(function (row) {
        var sku = "\"".concat(row.sku.replace(/"/g, '""'), "\"");
        var name = "\"".concat(row.name.replace(/"/g, '""'), "\"");
        var url = "\"".concat(row.webLinkUrl.replace(/"/g, '""'), "\"");
        csvContent += [sku, name, url].join(",") + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "weblinks.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, {
    key: "resolveShareToken",
    value: function () {
      var _resolveShareToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(imageAssets) {
        var _imageAssets$find,
          _this3 = this;
        var existingToken, response, data, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              existingToken = (_imageAssets$find = imageAssets.find(function (assetElement) {
                return assetElement.dataset.token;
              })) === null || _imageAssets$find === void 0 ? void 0 : _imageAssets$find.dataset.token;
              if (!existingToken) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, existingToken);
            case 1:
              if (!this.generatedToken) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, this.generatedToken);
            case 2:
              if (this.hasShareEndpointValue) {
                _context2.n = 3;
                break;
              }
              throw new Error('Could not determine a share token for these assets.');
            case 3:
              _context2.n = 4;
              return fetch(this.shareEndpointValue, {
                method: 'POST',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest'
                },
                body: new FormData()
              });
            case 4:
              response = _context2.v;
              data = {};
              _context2.p = 5;
              _context2.n = 6;
              return response.json();
            case 6:
              data = _context2.v;
              _context2.n = 8;
              break;
            case 7:
              _context2.p = 7;
              _t2 = _context2.v;
              console.error(_t2);
            case 8:
              if (!(!response.ok || !data.token)) {
                _context2.n = 9;
                break;
              }
              throw new Error(data.error || 'Could not create a share link for these assets.');
            case 9:
              this.generatedToken = data.token;
              imageAssets.forEach(function (assetElement) {
                assetElement.dataset.token = _this3.generatedToken;
              });
              return _context2.a(2, this.generatedToken);
          }
        }, _callee2, this, [[5, 7]]);
      }));
      function resolveShareToken(_x2) {
        return _resolveShareToken.apply(this, arguments);
      }
      return resolveShareToken;
    }()
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_34__.Controller);
_defineProperty(_default, "targets", ["modal", "widthInput", "heightInput", "paddingInput", "extensionInput", "csvButtonContainer"]);
_defineProperty(_default, "values", {
  baseUrl: String,
  shareEndpoint: String
});


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/quick_look_controller.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/quick_look_controller.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_reflect_get_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.reflect.get.js */ "./node_modules/core-js/modules/es.reflect.get.js");
/* harmony import */ var core_js_modules_es_reflect_get_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_get_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_reflect_to_string_tag_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.reflect.to-string-tag.js */ "./node_modules/core-js/modules/es.reflect.to-string-tag.js");
/* harmony import */ var core_js_modules_es_reflect_to_string_tag_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_to_string_tag_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }























function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "connect",
    value: function connect() {
      _superPropGet(_default, "connect", this, 3)([]);
      this.dialogTarget.addEventListener('close', this.onDialogClose.bind(this));
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      _superPropGet(_default, "disconnect", this, 3)([]);
    }
  }, {
    key: "open",
    value: function () {
      var _open = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
        var url, response, html;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              event.preventDefault();
              url = event.currentTarget.href;
              if (url) {
                _context.n = 1;
                break;
              }
              console.error('No URL provided');
              return _context.a(2);
            case 1:
              _context.n = 2;
              return fetch(url);
            case 2:
              response = _context.v;
              _context.n = 3;
              return response.text();
            case 3:
              html = _context.v;
              this.contentTarget.innerHTML = html;
              this.dialogTarget.showModal();
            case 4:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function open(_x) {
        return _open.apply(this, arguments);
      }
      return open;
    }()
  }, {
    key: "close",
    value: function close() {
      this.dialogTarget.close();
    }
  }, {
    key: "onDialogClose",
    value: function onDialogClose() {
      this.contentTarget.innerHTML = '';
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_23__.Controller);
_defineProperty(_default, "targets", ["dialog", "content"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/search_asset_list_controller.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/search_asset_list_controller.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }




















function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "submitForm",
    value: function () {
      var _submitForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
        var addButton, headerDownloadBagLink, formData, response, responseData, headerDownloadBagCounter;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              event.preventDefault();
              addButton = event.currentTarget.querySelector("button");
              headerDownloadBagLink = document.getElementById("header-download-bag-link");
              formData = new FormData(event.currentTarget);
              _context.n = 1;
              return fetch(event.currentTarget.action, {
                method: "POST",
                body: formData
              });
            case 1:
              response = _context.v;
              if (!(response.status === 200)) {
                _context.n = 3;
                break;
              }
              _context.n = 2;
              return response.json();
            case 2:
              responseData = _context.v;
              headerDownloadBagCounter = headerDownloadBagLink.querySelector('span');
              if (headerDownloadBagCounter !== null) {
                headerDownloadBagCounter = headerDownloadBagLink.querySelector('span');
                headerDownloadBagCounter.innerText = responseData.downloadCount;
              } else {
                headerDownloadBagCounter = document.createElement('span');
                headerDownloadBagCounter.classList.add('absolute', '-top-2', '-right-4', 'inline-flex', 'items-center', 'justify-center', 'px-2', 'py-1', 'text-xs', 'font-bold', 'leading-none', 'text-red-100', 'bg-red-600', 'rounded-full');
                headerDownloadBagCounter.innerText = responseData.downloadCount;
                headerDownloadBagLink.appendChild(headerDownloadBagCounter);
              }
              addButton.innerHTML = "<svg fill=\"#000000\" class=\"h-6 w-6\" viewBox=\"0 0 1920 1920\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M1827.701 303.065 698.835 1431.801 92.299 825.266 0 917.564 698.835 1616.4 1919.869 395.234z\" fill-rule=\"evenodd\"/>\n            </svg>";
            case 3:
              return _context.a(2);
          }
        }, _callee);
      }));
      function submitForm(_x) {
        return _submitForm.apply(this, arguments);
      }
      return submitForm;
    }()
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_20__.Controller);
_defineProperty(_default, "targets", ["addToBagForm"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/searchable_filter_controller.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/searchable_filter_controller.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

























function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "filter",
    value: function filter() {
      var query = this.inputTarget.value.toLowerCase();
      this.itemTargets.forEach(function (item) {
        var label = item.querySelector('label').textContent.toLowerCase();
        if (label.includes(query)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_25__.Controller);
_defineProperty(_default, "targets", ["input", "item"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/share_link_controller.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/share_link_controller.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }






















function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    var _this;
    _classCallCheck(this, _default);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, _default, [].concat(args));
    _defineProperty(_this, "copyFeedbackTimeout", null);
    return _this;
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "generate",
    value: function () {
      var _generate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
        var form, formData, response, data, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              event.preventDefault();
              // const button = event.currentTarget;
              // button.disabled = true;
              // button.textContent = 'Generating...';
              form = event.currentTarget.closest('form');
              formData = new FormData(form);
              formData.append('listName', this.nameInputTarget.value);
              _context.p = 1;
              _context.n = 2;
              return fetch('/download-list/share', {
                method: 'POST',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData
              });
            case 2:
              response = _context.v;
              _context.n = 3;
              return response.json();
            case 3:
              data = _context.v;
              if (response.status === 200) {
                this.urlInputTarget.value = data.url;
                this.generateFormTarget.classList.add('hidden');
                this.confirmationTarget.classList.remove('hidden');
              } else {
                alert(data.error || 'An unknown error occurred.');
              }
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.log(_t);
              alert('Could not connect to the server.');
            case 5:
              _context.p = 5;
              return _context.f(5);
            case 6:
              return _context.a(2);
          }
        }, _callee, this, [[1, 4, 5, 6]]);
      }));
      function generate(_x) {
        return _generate.apply(this, arguments);
      }
      return generate;
    }()
  }, {
    key: "openShareModal",
    value: function openShareModal(event) {
      event.preventDefault();
      this.modalTarget.classList.remove('hidden');
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.nameInputTarget.value = "";
      this.modalTarget.classList.add('hidden');
      this.generateFormTarget.classList.remove('hidden');
      this.confirmationTarget.classList.add('hidden');
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.copyFeedbackTimeout) {
        clearTimeout(this.copyFeedbackTimeout);
      }
    }
  }, {
    key: "copyToClipboard",
    value: function () {
      var _copyToClipboard = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _navigator$clipboard;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this.highlightUrlInput();
              if (!((_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText)) {
                _context2.n = 2;
                break;
              }
              _context2.n = 1;
              return navigator.clipboard.writeText(this.urlInputTarget.value);
            case 1:
              return _context2.a(2);
            case 2:
              document.execCommand('copy');
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function copyToClipboard() {
        return _copyToClipboard.apply(this, arguments);
      }
      return copyToClipboard;
    }()
  }, {
    key: "highlightUrlInput",
    value: function highlightUrlInput() {
      var _this2 = this;
      this.urlInputTarget.focus({
        preventScroll: true
      });
      this.urlInputTarget.select();
      this.urlInputTarget.setSelectionRange(0, this.urlInputTarget.value.length);
      this.urlInputTarget.classList.add('ring-2', 'ring-violet-300', 'bg-violet-50');
      if (this.copyFeedbackTimeout) {
        clearTimeout(this.copyFeedbackTimeout);
      }
      this.copyFeedbackTimeout = setTimeout(function () {
        _this2.urlInputTarget.classList.remove('ring-2', 'ring-violet-300', 'bg-violet-50');
      }, 1200);
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_22__.Controller);
_defineProperty(_default, "targets", ["modal", "urlInput", "nameInput", "generateForm", "confirmation"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/tag_input_controller.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/tag_input_controller.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_esnext_iterator_filter_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/esnext.iterator.filter.js */ "./node_modules/core-js/modules/esnext.iterator.filter.js");
/* harmony import */ var core_js_modules_esnext_iterator_filter_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_filter_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/esnext.iterator.map.js */ "./node_modules/core-js/modules/esnext.iterator.map.js");
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }





























function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "connect",
    value: function connect() {
      var _this = this;
      this.containerTarget.addEventListener('click', function () {
        _this.inputTarget.focus();
      });
      this.renderTags();
    }
  }, {
    key: "renderTags",
    value: function renderTags() {
      var _this2 = this;
      // Clear existing tags except for the input itself
      this.containerTarget.querySelectorAll('.tag-item').forEach(function (el) {
        return el.remove();
      });
      var values = this.inputTarget.value.split(',').map(function (v) {
        return v.trim();
      }).filter(function (v) {
        return v !== '';
      });
      values.forEach(function (value) {
        _this2.containerTarget.insertBefore(_this2.createTagElement(value), _this2.inputTarget);
      });
    }
  }, {
    key: "createTagElement",
    value: function createTagElement(value) {
      var _this3 = this;
      var tag = document.createElement('span');
      tag.setAttribute('class', 'tag-item flex items-center bg-violet-100 text-violet-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full');
      tag.textContent = value;
      var removeBtn = document.createElement('button');
      removeBtn.setAttribute('class', 'ml-2 text-violet-600 hover:text-violet-800');
      removeBtn.innerHTML = '&times;';
      removeBtn.type = 'button'; // Prevent form submission
      removeBtn.addEventListener('click', function (e) {
        return _this3.removeTag(e);
      });
      tag.appendChild(removeBtn);
      return tag;
    }
  }, {
    key: "removeTag",
    value: function removeTag(event) {
      var tagText = event.currentTarget.parentElement.firstChild.textContent.trim();
      var currentValues = this.inputTarget.value.split(',').map(function (v) {
        return v.trim();
      });
      var newValues = currentValues.filter(function (v) {
        return v !== tagText;
      });
      this.inputTarget.value = newValues.join(', ');
      this.renderTags();
    }
  }, {
    key: "handleInput",
    value: function handleInput(event) {
      if (event.key === ',' || event.key === 'Enter') {
        event.preventDefault();
        this.renderTags();
      }
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_29__.Controller);
_defineProperty(_default, "targets", ["input", "container"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/thumbnail_preview_controller.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/thumbnail_preview_controller.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");



















function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/**
 * Creates a client-side preview of an image selected in a file input.
 */
var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    _classCallCheck(this, _default);
    return _callSuper(this, _default, arguments);
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "updatePreview",
    value:
    // This action is called when the file input changes
    function updatePreview() {
      var _this = this;
      var file = this.inputTarget.files[0];
      if (file) {
        // Create a temporary URL for the selected file
        var reader = new FileReader();
        reader.onload = function (event) {
          // Set the 'src' of the <img> target to the temporary URL
          _this.previewTarget.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__.Controller);
// Define the elements this controller will interact with
_defineProperty(_default, "targets", ["input", "preview"]);


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/tus-upload-controller.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/tus-upload-controller.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
/* harmony import */ var tus_js_client__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! tus-js-client */ "./node_modules/tus-js-client/lib.esm/browser/index.js");
/* harmony import */ var _upload_metadata__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./upload_metadata */ "./assets/controllers/upload_metadata.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
























function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    var _this;
    _classCallCheck(this, _default);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, _default, [].concat(args));
    _defineProperty(_this, "pollingInterval", null);
    return _this;
  }
  _inherits(_default, _Controller);
  return _createClass(_default, [{
    key: "connect",
    value: function connect() {
      var _this2 = this;
      this.dropzoneTarget.addEventListener('click', function () {
        return _this2.fileInputTarget.click();
      });
    }
  }, {
    key: "dragover",
    value: function dragover(event) {
      event.preventDefault();
      this.dropzoneTarget.classList.add('border-violet-500', 'bg-gray-50');
    }
  }, {
    key: "dragleave",
    value: function dragleave(event) {
      event.preventDefault();
      this.dropzoneTarget.classList.remove('border-violet-500', 'bg-gray-50');
    }
  }, {
    key: "drop",
    value: function drop(event) {
      event.preventDefault();
      this.fileInputTarget.files = event.dataTransfer.files;
      this.dragleave(event);
      this.fileInputTarget.dispatchEvent(new Event('change'));
    }
  }, {
    key: "fileSelected",
    value: function fileSelected() {
      if (this.fileInputTarget.files.length > 0) {
        var file = this.fileInputTarget.files[0];
        this.fileNameDisplayTarget.textContent = "".concat(file.name, " (").concat((file.size / 1024 / 1024).toFixed(2), " MB)");
        this.submitButtonTarget.disabled = false;
        this.hideError();
      } else {
        this.fileNameDisplayTarget.textContent = 'No file selected';
        this.submitButtonTarget.disabled = true;
      }
    }
  }, {
    key: "upload",
    value: function upload(event) {
      var _this3 = this;
      event.preventDefault();
      var file = this.fileInputTarget.files[0];
      if (!file) {
        this.showError("Please select a file first.");
        return;
      }
      var _createTusUploadMetad = (0,_upload_metadata__WEBPACK_IMPORTED_MODULE_26__.createTusUploadMetadata)(file),
        uploadKey = _createTusUploadMetad.uploadKey,
        metadata = _createTusUploadMetad.metadata;
      this.hideError();
      this.submitButtonTarget.disabled = true;
      this.fileInputTarget.disabled = true;
      this.dropzoneTarget.style.pointerEvents = 'none';

      // Make the progress container visible BEFORE trying to access its children
      this.progressContainerTarget.classList.remove('hidden');
      this.progressBarTarget.style.width = '0%';
      this.progressTextTarget.textContent = '0%';
      var assetId = null;
      var endpoint = this.assetIdValue ? "/admin/assets/".concat(this.assetIdValue, "/upload/") : "/admin/assets/upload/";
      var upload = new tus_js_client__WEBPACK_IMPORTED_MODULE_25__.Upload(file, {
        endpoint: endpoint,
        chunkSize: 100 * 1024 * 1024,
        // 100 MB
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
          'Upload-Key': uploadKey,
          'X-UPLOAD-AUTH': this.authTokenValue
        },
        metadata: metadata,
        onAfterResponse: function onAfterResponse(req, res) {
          var id = res.getHeader('X-Asset-Id');
          if (id) {
            assetId = id;
          }
        },
        onError: function onError(error) {
          _this3.showError("Upload failed: ".concat(error));
          _this3.submitButtonTarget.disabled = false;
          _this3.fileInputTarget.disabled = false;
          _this3.dropzoneTarget.style.pointerEvents = 'auto';
        },
        onProgress: function onProgress(bytesUploaded, bytesTotal) {
          var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
          _this3.progressBarTarget.style.width = "".concat(percentage, "%");
          _this3.progressTextTarget.textContent = "".concat(percentage, "%");
        },
        onSuccess: function onSuccess() {
          if (_this3.assetIdValue) {
            _this3.progressTextTarget.textContent = "Upload complete! Refreshing...";
            setTimeout(function () {
              return window.location.reload();
            }, 1500);
          } else {
            _this3.progressTextTarget.textContent = "Upload complete! Processing...";
            var _uploadKey = upload.url.split('/').pop();
            _this3.startPolling(_uploadKey);
          }
        }
      });
      upload.start();
    }
  }, {
    key: "startPolling",
    value: function startPolling(uploadKey) {
      var _this4 = this;
      var pollCount = 0;
      var maxPolls = 10 * 60; // stop after 10 minutes

      this.pollingInterval = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var response, data, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!(pollCount >= maxPolls)) {
                _context.n = 1;
                break;
              }
              clearInterval(_this4.pollingInterval);
              _this4.showError("File processing is taking too long.");
              return _context.a(2);
            case 1:
              _context.p = 1;
              _context.n = 2;
              return fetch("/admin/upload/status/".concat(uploadKey));
            case 2:
              response = _context.v;
              console.log(response.status);
              if (!(response.status === 200)) {
                _context.n = 4;
                break;
              }
              _context.n = 3;
              return response.json();
            case 3:
              data = _context.v;
              if (data.status === 'complete') {
                clearInterval(_this4.pollingInterval);
                _this4.progressTextTarget.textContent = "Processing complete! Redirecting...";
                window.location.href = data.editUrl;
              }
            case 4:
              _context.n = 6;
              break;
            case 5:
              _context.p = 5;
              _t = _context.v;
              clearInterval(_this4.pollingInterval);
              console.error(_t);
              _this4.showError("An error occurred while checking the file status.");
            case 6:
              pollCount++;
            case 7:
              return _context.a(2);
          }
        }, _callee, null, [[1, 5]]);
      })), 2000);
    }
  }, {
    key: "showError",
    value: function showError(message) {
      this.errorMessageTarget.textContent = message;
      this.errorMessageTarget.classList.remove('hidden');
    }
  }, {
    key: "hideError",
    value: function hideError() {
      this.errorMessageTarget.textContent = '';
      this.errorMessageTarget.classList.add('hidden');
    }
  }]);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_24__.Controller);
// We'll use a specific container for the progress elements
_defineProperty(_default, "targets", ["fileInput", "progressContainer",
// The parent div for the progress bar
"progressBar",
// The visual bar itself
"progressText",
// The text element for the percentage
"submitButton", "errorMessage", "dropzone", "fileNameDisplay"]);
_defineProperty(_default, "values", {
  assetId: Number,
  authToken: String
});


/***/ }),

/***/ "./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/upload_metadata.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@symfony/stimulus-bridge/lazy-controller-loader.js!./assets/controllers/upload_metadata.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTusUploadMetadata: () => (/* binding */ createTusUploadMetadata)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_date_now_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.date.now.js */ "./node_modules/core-js/modules/es.date.now.js");
/* harmony import */ var core_js_modules_es_date_now_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_now_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_global_this_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.global-this.js */ "./node_modules/core-js/modules/es.global-this.js");
/* harmony import */ var core_js_modules_es_global_this_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_global_this_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_10__);











function generateUploadKey() {
  var _globalThis$crypto;
  if ((_globalThis$crypto = globalThis.crypto) !== null && _globalThis$crypto !== void 0 && _globalThis$crypto.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return "upload-".concat(Date.now(), "-").concat(Math.random().toString(16).slice(2));
}
function getSafeExtension(filename) {
  var match = filename.match(/\.([A-Za-z0-9]{1,20})$/);
  if (!match) {
    return '';
  }
  return ".".concat(match[1].toLowerCase());
}
function createTusUploadMetadata(file) {
  var shareToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var expectedFileCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var uploadKey = generateUploadKey();
  var metadata = {
    filename: "".concat(uploadKey).concat(getSafeExtension(file.name)),
    original_filename: file.name,
    filetype: file.type || 'application/octet-stream'
  };
  if (shareToken) {
    metadata.share_token = shareToken;
  }
  if (typeof expectedFileCount === 'number' && expectedFileCount > 0) {
    metadata.share_expected_count = String(expectedFileCount);
  }
  return {
    uploadKey: uploadKey,
    metadata: metadata
  };
}

/***/ }),

/***/ "./vendor/symfony/ux-turbo/assets/dist/turbo_controller.js":
/*!*****************************************************************!*\
  !*** ./vendor/symfony/ux-turbo/assets/dist/turbo_controller.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ turbo_controller_default)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_proto_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.proto.js */ "./node_modules/core-js/modules/es.object.proto.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
/* harmony import */ var _hotwired_turbo__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @hotwired/turbo */ "./node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }



















function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// src/turbo_controller.ts


var turbo_controller_default = /*#__PURE__*/function (_Controller) {
  function turbo_controller_default() {
    _classCallCheck(this, turbo_controller_default);
    return _callSuper(this, turbo_controller_default, arguments);
  }
  _inherits(turbo_controller_default, _Controller);
  return _createClass(turbo_controller_default);
}(_hotwired_stimulus__WEBPACK_IMPORTED_MODULE_19__.Controller);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_hotwired_turbo_dist_turbo_es2017-esm_js-node_modules_symfony_stimulus-br-50b7f9"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFDN0Q7RUFFQSxPQUFPO0lBQ0hDLFNBQVMsRUFBVEEsU0FBUztJQUNUQyxRQUFRLEVBQVJBO0VBQ0osQ0FBQztBQUNMLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0F3QnRDQTtBQUNnRDtBQUN2QjtBQUN6QixJQUFJeWtCLHdCQUF3QiwwQkFBQWhrQixXQUFBO0VBQUEsU0FBQWdrQix5QkFBQTtJQUFBNXRCLGVBQUEsT0FBQTR0Qix3QkFBQTtJQUFBLE9BQUF2dEIsVUFBQSxPQUFBdXRCLHdCQUFBLEVBQUFodUIsU0FBQTtFQUFBO0VBQUFtQixTQUFBLENBQUE2c0Isd0JBQUEsRUFBQWhrQixXQUFBO0VBQUEsT0FBQXhKLFlBQUEsQ0FBQXd0Qix3QkFBQTtBQUFBLEVBQWlCbGtCLDJEQUFVLENBQ3REIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYm9vdHN0cmFwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jb21wb25lbnRzL2NvcHlfdG9fY2xpcGJvYXJkLmpzIiwid2VicGFjazovLy8gXFwuW2p0XXN4Iiwid2VicGFjazovLy8uL2Fzc2V0cy9jb250cm9sbGVycy91cGxvYWRfbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9hcHAuY3NzPzZiZTYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2NvbnRyb2xsZXJzLmpzb24iLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2NvbnRyb2xsZXJzL2FjY29yZGlvbl9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jb250cm9sbGVycy9hZGRfYWxsX3RvX2JhZ19jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jb250cm9sbGVycy9ib2FyZF9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jb250cm9sbGVycy9icmFuZF9maWx0ZXJfY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvY29udHJvbGxlcnMvY3NyZl9wcm90ZWN0aW9uX2NvbnRyb2xsZXIuanM/NWIwMyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvY29udHJvbGxlcnMvZGlyZWN0X3NoYXJlX2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2NvbnRyb2xsZXJzL2Ryb3Bkb3duX2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2NvbnRyb2xsZXJzL2ZpbHRlcl9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jb250cm9sbGVycy9maWx0ZXJfZm9ybV9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jb250cm9sbGVycy9oZWxsb19jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jb250cm9sbGVycy9ob21lX2Rhc2hib2FyZF9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jb250cm9sbGVycy9ob21lX2ZpbHRlcl9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jb250cm9sbGVycy9saXN0X2l0ZW1fY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvY29udHJvbGxlcnMvcGVybWFsaW5rX2dlbmVyYXRvcl9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jb250cm9sbGVycy9xdWlja19sb29rX2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2NvbnRyb2xsZXJzL3NlYXJjaF9hc3NldF9saXN0X2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2NvbnRyb2xsZXJzL3NlYXJjaGFibGVfZmlsdGVyX2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2NvbnRyb2xsZXJzL3NoYXJlX2xpbmtfY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvY29udHJvbGxlcnMvdGFnX2lucHV0X2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2NvbnRyb2xsZXJzL3RodW1ibmFpbF9wcmV2aWV3X2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2NvbnRyb2xsZXJzL3R1cy11cGxvYWQtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ltZm9ueS91eC10dXJiby9hc3NldHMvZGlzdC90dXJib19jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9ib290c3RyYXAuanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvY29weV90b19jbGlwYm9hcmQuanMnO1xuLypcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcbiAqXG4gKiBUaGlzIGZpbGUgd2lsbCBiZSBpbmNsdWRlZCBvbnRvIHRoZSBwYWdlIHZpYSB0aGUgaW1wb3J0bWFwKCkgVHdpZyBmdW5jdGlvbixcbiAqIHdoaWNoIHNob3VsZCBhbHJlYWR5IGJlIGluIHlvdXIgYmFzZS5odG1sLnR3aWcuXG4gKi9cbmltcG9ydCAnLi9zdHlsZXMvYXBwLmNzcyc7XG5cbi8vIGNvbnNvbGUubG9nKCdUaGlzIGxvZyBjb21lcyBmcm9tIGFzc2V0cy9hcHAuanMgLSB3ZWxjb21lIHRvIEFzc2V0TWFwcGVyISDwn46JJyk7XG4iLCJpbXBvcnQgeyBzdGFydFN0aW11bHVzQXBwIH0gZnJvbSAnQHN5bWZvbnkvc3RpbXVsdXMtYnJpZGdlJztcblxuLy8gUmVnaXN0ZXJzIFN0aW11bHVzIGNvbnRyb2xsZXJzIGZyb20gY29udHJvbGxlcnMuanNvbiBhbmQgaW4gdGhlIGNvbnRyb2xsZXJzLyBkaXJlY3RvcnlcbmV4cG9ydCBjb25zdCBhcHAgPSBzdGFydFN0aW11bHVzQXBwKHJlcXVpcmUuY29udGV4dChcbiAgICAnQHN5bWZvbnkvc3RpbXVsdXMtYnJpZGdlL2xhenktY29udHJvbGxlci1sb2FkZXIhLi9jb250cm9sbGVycycsXG4gICAgdHJ1ZSxcbiAgICAvXFwuW2p0XXN4PyQvXG4pKTtcbi8vIHJlZ2lzdGVyIGFueSBjdXN0b20sIDNyZCBwYXJ0eSBjb250cm9sbGVycyBoZXJlXG4vLyBhcHAucmVnaXN0ZXIoJ3NvbWVfY29udHJvbGxlcl9uYW1lJywgU29tZUltcG9ydGVkQ29udHJvbGxlcik7XG4iLCJjb25zdCBERUZBVUxUX0JVVFRPTl9MQUJFTCA9ICdDb3B5IHRvIGNsaXBib2FyZCc7XG5jb25zdCBDT1BJRURfQlVUVE9OX0xBQkVMID0gJ0NvcGllZCB0byBjbGlwYm9hcmQnO1xuY29uc3QgRkVFREJBQ0tfRFVSQVRJT05fTVMgPSAxMjAwO1xuXG5jbGFzcyBDb3B5VG9DbGlwYm9hcmQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgYnV0dG9uID0gbnVsbDtcbiAgICBmZWVkYmFja1RpbWVvdXQgPSBudWxsO1xuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlQnV0dG9uKCk7XG4gICAgICAgIHRoaXMuYnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbj8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcblxuICAgICAgICBpZiAodGhpcy5mZWVkYmFja1RpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZlZWRiYWNrVGltZW91dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbnN1cmVCdXR0b24oKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcblxuICAgICAgICBpZiAodGhpcy5idXR0b24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtZ3JheS01MDAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMTUwIGhvdmVyOnRleHQtZ3JheS03MDAgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiJHtERUZBVUxUX0JVVFRPTl9MQUJFTH1cIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiJHtERUZBVUxUX0JVVFRPTl9MQUJFTH1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJoLTUgdy01IHBvaW50ZXItZXZlbnRzLW5vbmVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIGQ9XCJNOCAxNkg2YTIgMiAwIDAxLTItMlY2YTIgMiAwIDAxMi0yaDhhMiAyIDAgMDEyIDJ2Mm0tNiAxMmg4YTIgMiAwIDAwMi0ydi04YTIgMiAwIDAwLTItMmgtOGEyIDIgMCAwMC0yIDJ2OGEyIDIgMCAwMDIgMnpcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgYDtcblxuICAgICAgICB0aGlzLmJ1dHRvbiA9IHRoaXMucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSBhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnJlc29sdmVUYXJnZXQoKTtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLnJlc29sdmVUZXh0KHRhcmdldCk7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaWdobGlnaHRUYXJnZXQodGFyZ2V0KTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5jbGlwYm9hcmQ/LndyaXRlVGV4dCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZhbGxiYWNrQ29weSh0YXJnZXQsIHRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNob3dDb3BpZWRGZWVkYmFjaygpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5mYWxsYmFja0NvcHkodGFyZ2V0LCB0ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvcGllZEZlZWRiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVzb2x2ZVRhcmdldCgpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZm9yJyk7XG4gICAgICAgIGlmICh0YXJnZXRJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhcmdldFNlbGVjdG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpO1xuICAgICAgICBpZiAodGFyZ2V0U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3Nlc3QoJ1tkYXRhLWNvcHktc2NvcGVdJyk/LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0U2VsZWN0b3IpID8/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0U2VsZWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJldmlvdXNFbGVtZW50ID0gdGhpcy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICBpZiAocHJldmlvdXNFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fCBwcmV2aW91c0VsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhLCBbZGF0YS1jb3B5LXNvdXJjZV0nKSA/PyBudWxsO1xuICAgIH1cblxuICAgIHJlc29sdmVUZXh0KHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fCB0YXJnZXQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0LnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29weS1zb3VyY2UnKSA/PyB0YXJnZXQudGV4dENvbnRlbnQ/LnRyaW0oKSA/PyAnJztcbiAgICB9XG5cbiAgICBoaWdobGlnaHRUYXJnZXQodGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8IHRhcmdldCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgICAgICAgICB0YXJnZXQuc2VsZWN0KCk7XG4gICAgICAgICAgICB0YXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgdGFyZ2V0LnZhbHVlLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGFyZ2V0KTtcbiAgICAgICAgICAgIHNlbGVjdGlvbj8ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICBzZWxlY3Rpb24/LmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdyaW5nLTInLCAncmluZy12aW9sZXQtMzAwJywgJ2JnLXZpb2xldC01MCcpO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZWRiYWNrVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZmVlZGJhY2tUaW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmVlZGJhY2tUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgncmluZy0yJywgJ3JpbmctdmlvbGV0LTMwMCcsICdiZy12aW9sZXQtNTAnKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRCdXR0b25GZWVkYmFjaygpO1xuICAgICAgICB9LCBGRUVEQkFDS19EVVJBVElPTl9NUyk7XG4gICAgfVxuXG4gICAgc2hvd0NvcGllZEZlZWRiYWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuYnV0dG9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBDT1BJRURfQlVUVE9OX0xBQkVMKTtcbiAgICAgICAgdGhpcy5idXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIENPUElFRF9CVVRUT05fTEFCRUwpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LXZpb2xldC02MDAnKTtcbiAgICB9XG5cbiAgICByZXNldEJ1dHRvbkZlZWRiYWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuYnV0dG9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBERUZBVUxUX0JVVFRPTl9MQUJFTCk7XG4gICAgICAgIHRoaXMuYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBERUZBVUxUX0JVVFRPTl9MQUJFTCk7XG4gICAgICAgIHRoaXMuYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtdmlvbGV0LTYwMCcpO1xuICAgIH1cblxuICAgIGZhbGxiYWNrQ29weSh0YXJnZXQsIHRleHQpIHtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHwgdGFyZ2V0IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSB0ZXh0O1xuICAgICAgICB0ZXh0YXJlYS5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJ3JlYWRvbmx5Jyk7XG4gICAgICAgIHRleHRhcmVhLmNsYXNzTmFtZSA9ICdzci1vbmx5JztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0YXJlYSk7XG4gICAgICAgIHRleHRhcmVhLnNlbGVjdCgpO1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRhcmVhKTtcbiAgICB9XG59XG5cbmlmICghY3VzdG9tRWxlbWVudHMuZ2V0KCdjb3B5LXRvLWNsaXBib2FyZCcpKSB7XG4gICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb3B5LXRvLWNsaXBib2FyZCcsIENvcHlUb0NsaXBib2FyZCk7XG59XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWNjb3JkaW9uX2NvbnRyb2xsZXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9Ac3ltZm9ueS9zdGltdWx1cy1icmlkZ2UvbGF6eS1jb250cm9sbGVyLWxvYWRlci5qcyEuL2Fzc2V0cy9jb250cm9sbGVycy9hY2NvcmRpb25fY29udHJvbGxlci5qc1wiLFxuXHRcIi4vYWRkX2FsbF90b19iYWdfY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL2FkZF9hbGxfdG9fYmFnX2NvbnRyb2xsZXIuanNcIixcblx0XCIuL2JvYXJkX2NvbnRyb2xsZXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9Ac3ltZm9ueS9zdGltdWx1cy1icmlkZ2UvbGF6eS1jb250cm9sbGVyLWxvYWRlci5qcyEuL2Fzc2V0cy9jb250cm9sbGVycy9ib2FyZF9jb250cm9sbGVyLmpzXCIsXG5cdFwiLi9icmFuZF9maWx0ZXJfY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL2JyYW5kX2ZpbHRlcl9jb250cm9sbGVyLmpzXCIsXG5cdFwiLi9jc3JmX3Byb3RlY3Rpb25fY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL2NzcmZfcHJvdGVjdGlvbl9jb250cm9sbGVyLmpzXCIsXG5cdFwiLi9kaXJlY3Rfc2hhcmVfY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL2RpcmVjdF9zaGFyZV9jb250cm9sbGVyLmpzXCIsXG5cdFwiLi9kcm9wZG93bl9jb250cm9sbGVyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvQHN5bWZvbnkvc3RpbXVsdXMtYnJpZGdlL2xhenktY29udHJvbGxlci1sb2FkZXIuanMhLi9hc3NldHMvY29udHJvbGxlcnMvZHJvcGRvd25fY29udHJvbGxlci5qc1wiLFxuXHRcIi4vZmlsdGVyX2NvbnRyb2xsZXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9Ac3ltZm9ueS9zdGltdWx1cy1icmlkZ2UvbGF6eS1jb250cm9sbGVyLWxvYWRlci5qcyEuL2Fzc2V0cy9jb250cm9sbGVycy9maWx0ZXJfY29udHJvbGxlci5qc1wiLFxuXHRcIi4vZmlsdGVyX2Zvcm1fY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL2ZpbHRlcl9mb3JtX2NvbnRyb2xsZXIuanNcIixcblx0XCIuL2hlbGxvX2NvbnRyb2xsZXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9Ac3ltZm9ueS9zdGltdWx1cy1icmlkZ2UvbGF6eS1jb250cm9sbGVyLWxvYWRlci5qcyEuL2Fzc2V0cy9jb250cm9sbGVycy9oZWxsb19jb250cm9sbGVyLmpzXCIsXG5cdFwiLi9ob21lX2Rhc2hib2FyZF9jb250cm9sbGVyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvQHN5bWZvbnkvc3RpbXVsdXMtYnJpZGdlL2xhenktY29udHJvbGxlci1sb2FkZXIuanMhLi9hc3NldHMvY29udHJvbGxlcnMvaG9tZV9kYXNoYm9hcmRfY29udHJvbGxlci5qc1wiLFxuXHRcIi4vaG9tZV9maWx0ZXJfY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL2hvbWVfZmlsdGVyX2NvbnRyb2xsZXIuanNcIixcblx0XCIuL2xpc3RfaXRlbV9jb250cm9sbGVyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvQHN5bWZvbnkvc3RpbXVsdXMtYnJpZGdlL2xhenktY29udHJvbGxlci1sb2FkZXIuanMhLi9hc3NldHMvY29udHJvbGxlcnMvbGlzdF9pdGVtX2NvbnRyb2xsZXIuanNcIixcblx0XCIuL3Blcm1hbGlua19nZW5lcmF0b3JfY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL3Blcm1hbGlua19nZW5lcmF0b3JfY29udHJvbGxlci5qc1wiLFxuXHRcIi4vcXVpY2tfbG9va19jb250cm9sbGVyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvQHN5bWZvbnkvc3RpbXVsdXMtYnJpZGdlL2xhenktY29udHJvbGxlci1sb2FkZXIuanMhLi9hc3NldHMvY29udHJvbGxlcnMvcXVpY2tfbG9va19jb250cm9sbGVyLmpzXCIsXG5cdFwiLi9zZWFyY2hfYXNzZXRfbGlzdF9jb250cm9sbGVyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvQHN5bWZvbnkvc3RpbXVsdXMtYnJpZGdlL2xhenktY29udHJvbGxlci1sb2FkZXIuanMhLi9hc3NldHMvY29udHJvbGxlcnMvc2VhcmNoX2Fzc2V0X2xpc3RfY29udHJvbGxlci5qc1wiLFxuXHRcIi4vc2VhcmNoYWJsZV9maWx0ZXJfY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL3NlYXJjaGFibGVfZmlsdGVyX2NvbnRyb2xsZXIuanNcIixcblx0XCIuL3NoYXJlX2xpbmtfY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL3NoYXJlX2xpbmtfY29udHJvbGxlci5qc1wiLFxuXHRcIi4vdGFnX2lucHV0X2NvbnRyb2xsZXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9Ac3ltZm9ueS9zdGltdWx1cy1icmlkZ2UvbGF6eS1jb250cm9sbGVyLWxvYWRlci5qcyEuL2Fzc2V0cy9jb250cm9sbGVycy90YWdfaW5wdXRfY29udHJvbGxlci5qc1wiLFxuXHRcIi4vdGh1bWJuYWlsX3ByZXZpZXdfY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL3RodW1ibmFpbF9wcmV2aWV3X2NvbnRyb2xsZXIuanNcIixcblx0XCIuL3R1cy11cGxvYWQtY29udHJvbGxlci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzIS4vYXNzZXRzL2NvbnRyb2xsZXJzL3R1cy11cGxvYWQtY29udHJvbGxlci5qc1wiLFxuXHRcIi4vdXBsb2FkX21ldGFkYXRhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvQHN5bWZvbnkvc3RpbXVsdXMtYnJpZGdlL2xhenktY29udHJvbGxlci1sb2FkZXIuanMhLi9hc3NldHMvY29udHJvbGxlcnMvdXBsb2FkX21ldGFkYXRhLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vYXNzZXRzL2NvbnRyb2xsZXJzIHN5bmMgcmVjdXJzaXZlIC4vbm9kZV9tb2R1bGVzL0BzeW1mb255L3N0aW11bHVzLWJyaWRnZS9sYXp5LWNvbnRyb2xsZXItbG9hZGVyLmpzISBcXFxcLltqdF1zeD8kXCI7IiwiZnVuY3Rpb24gZ2VuZXJhdGVVcGxvYWRLZXkoKSB7XG4gICAgaWYgKGdsb2JhbFRoaXMuY3J5cHRvPy5yYW5kb21VVUlEKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGB1cGxvYWQtJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnNsaWNlKDIpfWA7XG59XG5cbmZ1bmN0aW9uIGdldFNhZmVFeHRlbnNpb24oZmlsZW5hbWUpIHtcbiAgICBjb25zdCBtYXRjaCA9IGZpbGVuYW1lLm1hdGNoKC9cXC4oW0EtWmEtejAtOV17MSwyMH0pJC8pO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAuJHttYXRjaFsxXS50b0xvd2VyQ2FzZSgpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUdXNVcGxvYWRNZXRhZGF0YShmaWxlLCBzaGFyZVRva2VuID0gbnVsbCwgZXhwZWN0ZWRGaWxlQ291bnQgPSBudWxsKSB7XG4gICAgY29uc3QgdXBsb2FkS2V5ID0gZ2VuZXJhdGVVcGxvYWRLZXkoKTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IHtcbiAgICAgICAgZmlsZW5hbWU6IGAke3VwbG9hZEtleX0ke2dldFNhZmVFeHRlbnNpb24oZmlsZS5uYW1lKX1gLFxuICAgICAgICBvcmlnaW5hbF9maWxlbmFtZTogZmlsZS5uYW1lLFxuICAgICAgICBmaWxldHlwZTogZmlsZS50eXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgIH07XG5cbiAgICBpZiAoc2hhcmVUb2tlbikge1xuICAgICAgICBtZXRhZGF0YS5zaGFyZV90b2tlbiA9IHNoYXJlVG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBleHBlY3RlZEZpbGVDb3VudCA9PT0gJ251bWJlcicgJiYgZXhwZWN0ZWRGaWxlQ291bnQgPiAwKSB7XG4gICAgICAgIG1ldGFkYXRhLnNoYXJlX2V4cGVjdGVkX2NvdW50ID0gU3RyaW5nKGV4cGVjdGVkRmlsZUNvdW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB1cGxvYWRLZXksXG4gICAgICAgIG1ldGFkYXRhLFxuICAgIH07XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgY29udHJvbGxlcl8wIGZyb20gJ0BzeW1mb255L3V4LXR1cmJvL2Rpc3QvdHVyYm9fY29udHJvbGxlci5qcyc7XG5leHBvcnQgZGVmYXVsdCB7XG4gICdzeW1mb255LS11eC10dXJiby0tdHVyYm8tY29yZSc6IGNvbnRyb2xsZXJfMCxcbn07IiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJ0Bob3R3aXJlZC9zdGltdWx1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgc3RhdGljIHRhcmdldHMgPSBbXCJjb250ZW50XCIsIFwiaWNvblwiXTtcblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50VGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLmljb25UYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgncm90YXRlLTkwJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJ0Bob3R3aXJlZC9zdGltdWx1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgc3RhdGljIHRhcmdldHMgPSBbXCJpZHNJbnB1dFwiXTtcblxuICAgIGFkZEFsbChldmVudCkge1xuICAgICAgICAvLyBGaW5kIGFsbCBhc3NldCBjYXJkcyB3aXRoaW4gdGhlIG1haW4gY29udGVudCBhcmVhXG4gICAgICAgIGNvbnN0IGFzc2V0RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hc3NldC1pZF0nKTtcblxuICAgICAgICAvLyBFeHRyYWN0IHRoZSBJRCBmcm9tIGVhY2ggZWxlbWVudCdzIGRhdGFzZXRcbiAgICAgICAgY29uc3QgYXNzZXRJZHMgPSBBcnJheS5mcm9tKGFzc2V0RWxlbWVudHMpLm1hcChlbCA9PiBlbC5kYXRhc2V0LmFzc2V0SWQpO1xuXG4gICAgICAgIGlmIChhc3NldElkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBKb2luIHRoZSBJRHMgaW50byBhIGNvbW1hLXNlcGFyYXRlZCBzdHJpbmcgYW5kIHNldCB0aGUgaGlkZGVuIGlucHV0J3MgdmFsdWVcbiAgICAgICAgICAgIHRoaXMuaWRzSW5wdXRUYXJnZXQudmFsdWUgPSBhc3NldElkcy5qb2luKCcsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBubyBhc3NldHMgYXJlIGZvdW5kLCBwcmV2ZW50IHRoZSBmb3JtIGZyb20gc3VibWl0dGluZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGFsZXJ0KCdUaGVyZSBhcmUgbm8gYXNzZXRzIG9uIHRoZSBwYWdlIHRvIGFkZC4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICdAaG90d2lyZWQvc3RpbXVsdXMnO1xuaW1wb3J0IGludGVyYWN0IGZyb20gJ2ludGVyYWN0anMnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgc3RhdGljIHRhcmdldHMgPSBbXG4gICAgICAgIFwiY2FudmFzXCIsIFwic3ZnQ2FudmFzXCIsIFwidmlld3BvcnRcIiwgXCJhc3NldFNlYXJjaFwiLCBcImFzc2V0TGlzdFwiLCBcInNhdmVCdG5cIixcbiAgICAgICAgXCJ6b29tVmFsdWVcIiwgXCJjb250ZXh0VG9vbGJhclwiLCBcInRleHRDb250ZXh0VG9vbGJhclwiLCBcImZvbnRGYW1pbHlTZWxlY3RcIixcbiAgICAgICAgXCJmb250U2l6ZUlucHV0XCIsIFwiYm9sZEJ1dHRvblwiLCBcIml0YWxpY0J1dHRvblwiLCBcImNvbG9ySW5wdXRcIixcbiAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JJbnB1dFwiLCBcImJvcmRlckNvbG9ySW5wdXRcIlxuICAgIF07XG4gICAgc3RhdGljIHZhbHVlcyA9IHsgYm9hcmRJZDogTnVtYmVyIH07XG5cbiAgICAvLyAtLS0gMS4gTElGRUNZQ0xFICYgSU5JVElBTElaQVRJT04gLS0tIC8vXG5cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLmJvYXJkSXRlbXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlVG9vbCA9ICdzZWxlY3QnO1xuICAgICAgICB0aGlzLnBhbiA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICB0aGlzLnpvb20gPSAxO1xuICAgICAgICB0aGlzLmlzUGFubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhblN0YXJ0ID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgIHRoaXMuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1JZCA9IG51bGw7XG4gICAgICAgIHRoaXMuekNvdW50ZXIgPSAwO1xuXG4gICAgICAgIHRoaXMuaXNEcmF3aW5nTGluZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpbmVTdGFydFBvaW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy50ZW1wTGluZSA9IG51bGw7XG5cbiAgICAgICAgLy8gQmluZCBnbG9iYWwgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuYm91bmRIYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYm91bmRIYW5kbGVLZXlVcCA9IHRoaXMuaGFuZGxlS2V5VXAuYmluZCh0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRIYW5kbGVLZXlEb3duKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmJvdW5kSGFuZGxlS2V5VXApO1xuXG4gICAgICAgIC8vIEJpbmQgdmlld3BvcnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMudmlld3BvcnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudmlld3BvcnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudmlld3BvcnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBCaW5kIFVJIGVsZW1lbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuYXNzZXRTZWFyY2hUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLnNlYXJjaEFzc2V0cy5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zYXZlQnRuVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zYXZlQm9hcmRTdGF0ZShmYWxzZSkpO1xuXG4gICAgICAgIHRoaXMuaW5pdEFzc2V0UGFuZWxBbmREcm9wem9uZSgpO1xuICAgICAgICB0aGlzLmxvYWRCb2FyZFN0YXRlKCk7XG5cbiAgICAgICAgdGhpcy5hdXRvU2F2ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5zYXZlQm9hcmRTdGF0ZSh0cnVlKSwgMzAwMDApO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvU2F2ZUludGVydmFsKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRIYW5kbGVLZXlEb3duKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmJvdW5kSGFuZGxlS2V5VXApO1xuICAgIH1cblxuICAgIC8vIC0tLSAyLiBTRUxFQ1RJT04gJiBERUxFVElPTiAtLS0gLy9cblxuICAgIHNlbGVjdEl0ZW0oZWxlbWVudCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcbiAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtSWQgPSBlbGVtZW50LmRhdGFzZXQuaXRlbUlkO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0VG9vbGJhclRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2JvYXJkLWl0ZW0tdGV4dCcpKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRDb250ZXh0VG9vbGJhclRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dFRvb2xiYXJTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbUlkKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c2x5U2VsZWN0ZWQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaXRlbS1pZD1cIiR7dGhpcy5zZWxlY3RlZEl0ZW1JZH1cIl1gKTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91c2x5U2VsZWN0ZWQpIHByZXZpb3VzbHlTZWxlY3RlZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtSWQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHRUb29sYmFyVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLnRleHRDb250ZXh0VG9vbGJhclRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBkZWxldGVTZWxlY3RlZEl0ZW0oKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZEl0ZW1JZCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBpdGVtRWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pdGVtLWlkPVwiJHt0aGlzLnNlbGVjdGVkSXRlbUlkfVwiXWApO1xuICAgICAgICBpZiAoaXRlbUVsZW1lbnQpIGl0ZW1FbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmJvYXJkSXRlbXMuZGVsZXRlKHRoaXMuc2VsZWN0ZWRJdGVtSWQpO1xuICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tIDMuIFRPT0xJTkcgJiBDQU5WQVMgSU5URVJBQ1RJT04gLS0tIC8vXG5cbiAgICBhY3RpdmF0ZVRvb2woZXZlbnQpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUb29sID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnRvb2w7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC10b29sJykuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHRoaXMudmlld3BvcnRUYXJnZXQuc3R5bGUuY3Vyc29yID0gdGhpcy5hY3RpdmVUb29sID09PSAnc2VsZWN0JyA/ICdkZWZhdWx0JyA6ICdjcm9zc2hhaXInO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKChldmVudC5rZXkgPT09ICdEZWxldGUnIHx8IGV2ZW50LmtleSA9PT0gJ0JhY2tzcGFjZScpICYmIHRoaXMuc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJykgIT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVTZWxlY3RlZEl0ZW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnPScpIHsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgdGhpcy56b29tSW4oKTsgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJy0nKSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IHRoaXMuem9vbU91dCgpOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09ICdTcGFjZScgJiYgIXRoaXMuaXNQYW5uaW5nKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5pc1Bhbm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy52aWV3cG9ydFRhcmdldC5zdHlsZS5jdXJzb3IgPSAnZ3JhYmJpbmcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09ICdTcGFjZScpIHtcbiAgICAgICAgICAgIHRoaXMuaXNQYW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0VGFyZ2V0LnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU1vdXNlRG93bihldmVudCkge1xuICAgICAgICBjb25zdCBpc0xpbmVUb29sID0gdGhpcy5hY3RpdmVUb29sID09PSAnbGluZScgfHwgdGhpcy5hY3RpdmVUb29sID09PSAnYXJyb3cnO1xuICAgICAgICBpZiAoaXNMaW5lVG9vbCAmJiBldmVudC50YXJnZXQgPT09IHRoaXMudmlld3BvcnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNEcmF3aW5nTGluZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxpbmVTdGFydFBvaW50ID0gdGhpcy5nZXRDYW52YXNDb29yZGluYXRlcyhldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgICAgICAgIHRoaXMudGVtcExpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2xpbmUnKTtcbiAgICAgICAgICAgIHRoaXMudGVtcExpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnIzNiODJmNicpO1xuICAgICAgICAgICAgdGhpcy50ZW1wTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJyk7XG4gICAgICAgICAgICB0aGlzLnRlbXBMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScsICc1LDUnKTtcbiAgICAgICAgICAgIHRoaXMuc3ZnQ2FudmFzVGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMudGVtcExpbmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY2FuUGFuID0gdGhpcy5pc1Bhbm5pbmcgfHwgZXZlbnQuYnV0dG9uID09PSAxIHx8ICh0aGlzLmFjdGl2ZVRvb2wgPT09ICdzZWxlY3QnICYmIGV2ZW50LnRhcmdldCA9PT0gdGhpcy52aWV3cG9ydFRhcmdldCk7XG4gICAgICAgICAgICBpZiAoY2FuUGFuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1Bhbm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld3BvcnRUYXJnZXQuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJztcbiAgICAgICAgICAgICAgICB0aGlzLnBhblN0YXJ0ID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH07XG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRHJhd2luZ0xpbmUpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3MgPSB0aGlzLmdldENhbnZhc0Nvb3JkaW5hdGVzKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgdGhpcy50ZW1wTGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgdGhpcy5saW5lU3RhcnRQb2ludC54KTtcbiAgICAgICAgICAgIHRoaXMudGVtcExpbmUuc2V0QXR0cmlidXRlKCd5MScsIHRoaXMubGluZVN0YXJ0UG9pbnQueSk7XG4gICAgICAgICAgICB0aGlzLnRlbXBMaW5lLnNldEF0dHJpYnV0ZSgneDInLCBjdXJyZW50UG9zLngpO1xuICAgICAgICAgICAgdGhpcy50ZW1wTGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgY3VycmVudFBvcy55KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUGFubmluZykge1xuICAgICAgICAgICAgdGhpcy5wYW4ueCArPSBldmVudC5jbGllbnRYIC0gdGhpcy5wYW5TdGFydC54O1xuICAgICAgICAgICAgdGhpcy5wYW4ueSArPSBldmVudC5jbGllbnRZIC0gdGhpcy5wYW5TdGFydC55O1xuICAgICAgICAgICAgdGhpcy5wYW5TdGFydCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW52YXNUcmFuc2Zvcm0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU1vdXNlVXAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmF3aW5nTGluZSkge1xuICAgICAgICAgICAgY29uc3QgZW5kUG9pbnQgPSB0aGlzLmdldENhbnZhc0Nvb3JkaW5hdGVzKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLmh5cG90KGVuZFBvaW50LnggLSB0aGlzLmxpbmVTdGFydFBvaW50LngsIGVuZFBvaW50LnkgLSB0aGlzLmxpbmVTdGFydFBvaW50LnkpO1xuICAgICAgICAgICAgaWYgKGRpc3RhbmNlID4gMTApIHRoaXMuYWRkTGluZUl0ZW1Ub0JvYXJkKHRoaXMubGluZVN0YXJ0UG9pbnQsIGVuZFBvaW50LCB0aGlzLmFjdGl2ZVRvb2wpO1xuICAgICAgICAgICAgdGhpcy5pc0RyYXdpbmdMaW5lID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy50ZW1wTGluZSkgdGhpcy50ZW1wTGluZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMudGVtcExpbmUgPSBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNQYW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmlzUGFubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy52aWV3cG9ydFRhcmdldC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLnZpZXdwb3J0VGFyZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSB0aGlzLmdldENhbnZhc0Nvb3JkaW5hdGVzKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlVG9vbCA9PT0gJ3RleHQnKSB0aGlzLmFkZFRleHRJdGVtVG9Cb2FyZChwb3MueCwgcG9zLnkpO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5hY3RpdmVUb29sID09PSAnZ3JvdXAnKSB0aGlzLmFkZEdyb3VwSXRlbVRvQm9hcmQocG9zLngsIHBvcy55KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC0tLSA0LiBQQU4gJiBaT09NIC0tLSAvL1xuXG4gICAgZ2V0Q2FudmFzQ29vcmRpbmF0ZXMoY2xpZW50WCwgY2xpZW50WSkge1xuICAgICAgICBjb25zdCB2aWV3cG9ydFJlY3QgPSB0aGlzLnZpZXdwb3J0VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB4ID0gKGNsaWVudFggLSB2aWV3cG9ydFJlY3QubGVmdCAtIHRoaXMucGFuLngpIC8gdGhpcy56b29tO1xuICAgICAgICBjb25zdCB5ID0gKGNsaWVudFkgLSB2aWV3cG9ydFJlY3QudG9wIC0gdGhpcy5wYW4ueSkgLyB0aGlzLnpvb207XG4gICAgICAgIHJldHVybiB7IHgsIHkgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVab29tKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHNjYWxlQW1vdW50ID0gZXZlbnQuZGVsdGFZID4gMCA/IC0wLjEgOiAwLjE7XG4gICAgICAgIGNvbnN0IG5ld1pvb20gPSBNYXRoLm1heCgwLjEsIE1hdGgubWluKDMsIHRoaXMuem9vbSArIHNjYWxlQW1vdW50KSk7XG4gICAgICAgIGNvbnN0IHZpZXdwb3J0UmVjdCA9IHRoaXMudmlld3BvcnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGN1cnNvclggPSBldmVudC5jbGllbnRYIC0gdmlld3BvcnRSZWN0LmxlZnQ7XG4gICAgICAgIGNvbnN0IGN1cnNvclkgPSBldmVudC5jbGllbnRZIC0gdmlld3BvcnRSZWN0LnRvcDtcbiAgICAgICAgdGhpcy5wYW4ueCA9IGN1cnNvclggLSAoKGN1cnNvclggLSB0aGlzLnBhbi54KSAvIHRoaXMuem9vbSkgKiBuZXdab29tO1xuICAgICAgICB0aGlzLnBhbi55ID0gY3Vyc29yWSAtICgoY3Vyc29yWSAtIHRoaXMucGFuLnkpIC8gdGhpcy56b29tKSAqIG5ld1pvb207XG4gICAgICAgIHRoaXMuem9vbSA9IG5ld1pvb207XG4gICAgICAgIHRoaXMudXBkYXRlQ2FudmFzVHJhbnNmb3JtKCk7XG4gICAgfVxuXG4gICAgem9vbUluKCkge1xuICAgICAgICB0aGlzLnpvb20gPSBNYXRoLm1pbigzLCB0aGlzLnpvb20gKyAwLjIpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhc1RyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHpvb21PdXQoKSB7XG4gICAgICAgIHRoaXMuem9vbSA9IE1hdGgubWF4KDAuMSwgdGhpcy56b29tIC0gMC4yKTtcbiAgICAgICAgdGhpcy51cGRhdGVDYW52YXNUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDYW52YXNUcmFuc2Zvcm0oKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLnBhbi54fXB4LCAke3RoaXMucGFuLnl9cHgpIHNjYWxlKCR7dGhpcy56b29tfSlgO1xuICAgICAgICB0aGlzLmNhbnZhc1RhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgICAgIHRoaXMuc3ZnQ2FudmFzVGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICAgICAgaWYgKHRoaXMuaGFzWm9vbVZhbHVlVGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnpvb21WYWx1ZVRhcmdldC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQodGhpcy56b29tICogMTAwKX0lYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZyYW1lQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRJdGVtcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhbiA9IHsgeDogdGhpcy52aWV3cG9ydFRhcmdldC5jbGllbnRXaWR0aCAvIDIsIHk6IHRoaXMudmlld3BvcnRUYXJnZXQuY2xpZW50SGVpZ2h0IC8gMiB9O1xuICAgICAgICAgICAgdGhpcy56b29tID0gMTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FudmFzVHJhbnNmb3JtKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1pblggPSBJbmZpbml0eSwgbWluWSA9IEluZmluaXR5LCBtYXhYID0gLUluZmluaXR5LCBtYXhZID0gLUluZmluaXR5O1xuICAgICAgICB0aGlzLmJvYXJkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCBpdGVtLngpO1xuICAgICAgICAgICAgbWluWSA9IE1hdGgubWluKG1pblksIGl0ZW0ueSk7XG4gICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgaXRlbS54ICsgaXRlbS53aWR0aCk7XG4gICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSwgaXRlbS55ICsgaXRlbS5oZWlnaHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgY29udGVudFdpZHRoID0gbWF4WCAtIG1pblg7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSBtYXhZIC0gbWluWTtcbiAgICAgICAgY29uc3QgcGFkZGluZyA9IDEwMDtcbiAgICAgICAgY29uc3QgeFpvb20gPSB0aGlzLnZpZXdwb3J0VGFyZ2V0LmNsaWVudFdpZHRoIC8gKGNvbnRlbnRXaWR0aCArIHBhZGRpbmcgKiAyKTtcbiAgICAgICAgY29uc3QgeVpvb20gPSB0aGlzLnZpZXdwb3J0VGFyZ2V0LmNsaWVudEhlaWdodCAvIChjb250ZW50SGVpZ2h0ICsgcGFkZGluZyAqIDIpO1xuICAgICAgICB0aGlzLnpvb20gPSBNYXRoLm1pbih4Wm9vbSwgeVpvb20sIDEpO1xuICAgICAgICBjb25zdCBjb250ZW50Q2VudGVyWCA9IG1pblggKyBjb250ZW50V2lkdGggLyAyO1xuICAgICAgICBjb25zdCBjb250ZW50Q2VudGVyWSA9IG1pblkgKyBjb250ZW50SGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy5wYW4ueCA9ICh0aGlzLnZpZXdwb3J0VGFyZ2V0LmNsaWVudFdpZHRoIC8gMikgLSAoY29udGVudENlbnRlclggKiB0aGlzLnpvb20pO1xuICAgICAgICB0aGlzLnBhbi55ID0gKHRoaXMudmlld3BvcnRUYXJnZXQuY2xpZW50SGVpZ2h0IC8gMikgLSAoY29udGVudENlbnRlclkgKiB0aGlzLnpvb20pO1xuICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhc1RyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8vIC0tLSA1LiBMQVlFUklORyAtLS0gLy9cblxuICAgIF9nZXRTb3J0ZWRJdGVtc0J5WkluZGV4KCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmJvYXJkSXRlbXMudmFsdWVzKCkpLnNvcnQoKGEsIGIpID0+IGEuekluZGV4IC0gYi56SW5kZXgpO1xuICAgIH1cblxuICAgIGJyaW5nVG9Gcm9udCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkSXRlbUlkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmJvYXJkSXRlbXMuZ2V0KHRoaXMuc2VsZWN0ZWRJdGVtSWQpO1xuICAgICAgICB0aGlzLnpDb3VudGVyICs9IDE7XG4gICAgICAgIGl0ZW0uekluZGV4ID0gdGhpcy56Q291bnRlcjtcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWl0ZW0taWQ9XCIke3RoaXMuc2VsZWN0ZWRJdGVtSWR9XCJdYCkuc3R5bGUuekluZGV4ID0gaXRlbS56SW5kZXg7XG4gICAgfVxuXG4gICAgc2VuZFRvQmFjaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkSXRlbUlkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHNvcnRlZEl0ZW1zID0gdGhpcy5fZ2V0U29ydGVkSXRlbXNCeVpJbmRleCgpO1xuICAgICAgICBjb25zdCBtaW5aID0gc29ydGVkSXRlbXMubGVuZ3RoID4gMCA/IHNvcnRlZEl0ZW1zWzBdLnpJbmRleCA6IDA7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmJvYXJkSXRlbXMuZ2V0KHRoaXMuc2VsZWN0ZWRJdGVtSWQpO1xuICAgICAgICBpdGVtLnpJbmRleCA9IG1pblogLSAxO1xuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaXRlbS1pZD1cIiR7dGhpcy5zZWxlY3RlZEl0ZW1JZH1cIl1gKS5zdHlsZS56SW5kZXggPSBpdGVtLnpJbmRleDtcbiAgICB9XG5cbiAgICBicmluZ0ZvcndhcmQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZEl0ZW1JZCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBzb3J0ZWRJdGVtcyA9IHRoaXMuX2dldFNvcnRlZEl0ZW1zQnlaSW5kZXgoKTtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gc29ydGVkSXRlbXMuZmluZEluZGV4KGkgPT4gaS5pZCA9PSB0aGlzLnNlbGVjdGVkSXRlbUlkKTtcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA8IHNvcnRlZEl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gc29ydGVkSXRlbXNbY3VycmVudEluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRJdGVtID0gc29ydGVkSXRlbXNbY3VycmVudEluZGV4ICsgMV07XG4gICAgICAgICAgICBbY3VycmVudEl0ZW0uekluZGV4LCBuZXh0SXRlbS56SW5kZXhdID0gW25leHRJdGVtLnpJbmRleCwgY3VycmVudEl0ZW0uekluZGV4XTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pdGVtLWlkPVwiJHtjdXJyZW50SXRlbS5pZH1cIl1gKS5zdHlsZS56SW5kZXggPSBjdXJyZW50SXRlbS56SW5kZXg7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaXRlbS1pZD1cIiR7bmV4dEl0ZW0uaWR9XCJdYCkuc3R5bGUuekluZGV4ID0gbmV4dEl0ZW0uekluZGV4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VuZEJhY2t3YXJkKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRJdGVtSWQpIHJldHVybjtcbiAgICAgICAgY29uc3Qgc29ydGVkSXRlbXMgPSB0aGlzLl9nZXRTb3J0ZWRJdGVtc0J5WkluZGV4KCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHNvcnRlZEl0ZW1zLmZpbmRJbmRleChpID0+IGkuaWQgPT0gdGhpcy5zZWxlY3RlZEl0ZW1JZCk7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SXRlbSA9IHNvcnRlZEl0ZW1zW2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBwcmV2SXRlbSA9IHNvcnRlZEl0ZW1zW2N1cnJlbnRJbmRleCAtIDFdO1xuICAgICAgICAgICAgW2N1cnJlbnRJdGVtLnpJbmRleCwgcHJldkl0ZW0uekluZGV4XSA9IFtwcmV2SXRlbS56SW5kZXgsIGN1cnJlbnRJdGVtLnpJbmRleF07XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaXRlbS1pZD1cIiR7Y3VycmVudEl0ZW0uaWR9XCJdYCkuc3R5bGUuekluZGV4ID0gY3VycmVudEl0ZW0uekluZGV4O1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWl0ZW0taWQ9XCIke3ByZXZJdGVtLmlkfVwiXWApLnN0eWxlLnpJbmRleCA9IHByZXZJdGVtLnpJbmRleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIC0tLSA2LiBURVhUIFNUWUxJTkcgLS0tIC8vXG5cbiAgICB1cGRhdGVUZXh0VG9vbGJhclN0YXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRJdGVtSWQpIHJldHVybjtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYm9hcmRJdGVtcy5nZXQodGhpcy5zZWxlY3RlZEl0ZW1JZCk7XG4gICAgICAgIGlmICghaXRlbSB8fCBpdGVtLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuO1xuICAgICAgICBjb25zdCBzdHlsZXMgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgIHRoaXMuZm9udEZhbWlseVNlbGVjdFRhcmdldC52YWx1ZSA9IHN0eWxlcy5mb250RmFtaWx5IHx8ICdIZWx2ZXRpY2EsIHNhbnMtc2VyaWYnO1xuICAgICAgICB0aGlzLmZvbnRTaXplSW5wdXRUYXJnZXQudmFsdWUgPSBzdHlsZXMuZm9udFNpemUgfHwgMTY7XG4gICAgICAgIHRoaXMuY29sb3JJbnB1dFRhcmdldC52YWx1ZSA9IHN0eWxlcy5jb2xvciB8fCAnIzAwMDAwMCc7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9ySW5wdXRUYXJnZXQudmFsdWUgPSBzdHlsZXMuYmFja2dyb3VuZENvbG9yIHx8ICcjZmZmZmZmJztcbiAgICAgICAgdGhpcy5ib3JkZXJDb2xvcklucHV0VGFyZ2V0LnZhbHVlID0gc3R5bGVzLmJvcmRlckNvbG9yIHx8ICcjMDAwMDAwJztcbiAgICAgICAgdGhpcy5ib2xkQnV0dG9uVGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2JnLWdyYXktMzAwJywgc3R5bGVzLmZvbnRXZWlnaHQgPT09ICdib2xkJyk7XG4gICAgICAgIHRoaXMuaXRhbGljQnV0dG9uVGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2JnLWdyYXktMzAwJywgc3R5bGVzLmZvbnRTdHlsZSA9PT0gJ2l0YWxpYycpO1xuICAgIH1cblxuICAgIGNoYW5nZVRleHRTdHlsZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRJdGVtSWQpIHJldHVybjtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYm9hcmRJdGVtcy5nZXQodGhpcy5zZWxlY3RlZEl0ZW1JZCk7XG4gICAgICAgIGlmICghaXRlbSB8fCBpdGVtLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gdGFyZ2V0LmRhdGFzZXQuc3R5bGVQcm9wZXJ0eTtcblxuICAgICAgICBsZXQgdmFsdWUgPSB0YXJnZXQuZGF0YXNldC5zdHlsZVZhbHVlIHx8IHRhcmdldC52YWx1ZTtcblxuICAgICAgICBpZiAocHJvcGVydHkgPT09ICdmb250U2l6ZScpIHtcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uY29udGVudFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5hcHBseVRleHRTdHlsZXModGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWl0ZW0taWQ9XCIke3RoaXMuc2VsZWN0ZWRJdGVtSWR9XCJdYCksIGl0ZW0uY29udGVudCk7XG4gICAgICAgIHRoaXMudXBkYXRlVGV4dFRvb2xiYXJTdGF0ZSgpO1xuICAgIH1cblxuICAgIHRvZ2dsZVRleHRTdHlsZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRJdGVtSWQpIHJldHVybjtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYm9hcmRJdGVtcy5nZXQodGhpcy5zZWxlY3RlZEl0ZW1JZCk7XG4gICAgICAgIGlmICghaXRlbSB8fCBpdGVtLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zdHlsZVByb3BlcnR5O1xuICAgICAgICBjb25zdCBhY3RpdmVWYWx1ZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zdHlsZVZhbHVlO1xuICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBwcm9wZXJ0eSA9PT0gJ2ZvbnRXZWlnaHQnID8gJ25vcm1hbCcgOiAnbm9ybWFsJztcbiAgICAgICAgaXRlbS5jb250ZW50W3Byb3BlcnR5XSA9IGl0ZW0uY29udGVudFtwcm9wZXJ0eV0gPT09IGFjdGl2ZVZhbHVlID8gZGVmYXVsdFZhbHVlIDogYWN0aXZlVmFsdWU7XG4gICAgICAgIHRoaXMuYXBwbHlUZXh0U3R5bGVzKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pdGVtLWlkPVwiJHt0aGlzLnNlbGVjdGVkSXRlbUlkfVwiXWApLCBpdGVtLmNvbnRlbnQpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRleHRUb29sYmFyU3RhdGUoKTtcbiAgICB9XG5cbiAgICBhcHBseVRleHRTdHlsZXMoZWxlbWVudCwgc3R5bGVzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZm9udEZhbWlseSA9IHN0eWxlcy5mb250RmFtaWx5IHx8ICdIZWx2ZXRpY2EsIHNhbnMtc2VyaWYnO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmZvbnRTaXplID0gYCR7c3R5bGVzLmZvbnRTaXplIHx8IDE2fXB4YDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gc3R5bGVzLmZvbnRXZWlnaHQgfHwgJ25vcm1hbCc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZm9udFN0eWxlID0gc3R5bGVzLmZvbnRTdHlsZSB8fCAnbm9ybWFsJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS50ZXh0QWxpZ24gPSBzdHlsZXMudGV4dEFsaWduIHx8ICdsZWZ0JztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IHN0eWxlcy5jb2xvciB8fCAnIzAwMDAwMCc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc3R5bGVzLmJhY2tncm91bmRDb2xvciB8fCAnI2ZmZmZmZic7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBzdHlsZXMuYm9yZGVyQ29sb3IgfHwgJyMwMDAwMDAnO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmJvcmRlcldpZHRoID0gc3R5bGVzLmJvcmRlckNvbG9yID8gJzFweCcgOiAnMCc7XG4gICAgfVxuXG4gICAgLy8gLS0tIDcuIElURU0gQ1JFQVRJT04gJiBJTlRFUkFDVElPTiBTRVRVUCAtLS0gLy9cblxuICAgIF9hZGRJdGVtVG9Cb2FyZChlbGVtZW50LCBpdGVtRGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1EYXRhLnpJbmRleCA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbURhdGEuekluZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnpDb3VudGVyICs9IDE7XG4gICAgICAgICAgICBpdGVtRGF0YS56SW5kZXggPSB0aGlzLnpDb3VudGVyO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuekluZGV4ID0gaXRlbURhdGEuekluZGV4O1xuICAgICAgICB0aGlzLmNhbnZhc1RhcmdldC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgaWYgKGl0ZW1EYXRhLnR5cGUgPT09ICdsaW5lJyB8fCBpdGVtRGF0YS50eXBlID09PSAnYXJyb3cnKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2VMaW5lSW50ZXJhY3RpdmUoZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1ha2VJdGVtSW50ZXJhY3RpdmUoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ib2FyZEl0ZW1zLnNldChTdHJpbmcoaXRlbURhdGEuaWQpLCBpdGVtRGF0YSk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oZWxlbWVudCk7XG4gICAgfVxuXG4gICAgYWRkQXNzZXRUb0JvYXJkKGFzc2V0SWQsIHRodW1ibmFpbFVybCwgeCwgeSwgd2lkdGggPSAyMDAsIGhlaWdodCA9IDIwMCwgaXRlbUlkID0gbnVsbCwgekluZGV4KSB7XG4gICAgICAgIGNvbnN0IGZpbmFsSXRlbUlkID0gaXRlbUlkID8gU3RyaW5nKGl0ZW1JZCkgOiBgaXRlbS0ke3V1aWR2NCgpfWA7XG4gICAgICAgIGNvbnN0IGJvYXJkSXRlbUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJvYXJkSXRlbUVsLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLWl0ZW0nLCAnYm9hcmQtaXRlbS1hc3NldCcsICdhYnNvbHV0ZScsICdwLTEnLCAnYmctd2hpdGUnLCAnc2hhZG93LWxnJywgJ2JveC1ib3JkZXInKTtcbiAgICAgICAgYm9hcmRJdGVtRWwuc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgICAgICBib2FyZEl0ZW1FbC5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgICAgYm9hcmRJdGVtRWwuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgICAgIGJvYXJkSXRlbUVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gICAgICAgIGJvYXJkSXRlbUVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgYm9hcmRJdGVtRWwuZGF0YXNldC5pdGVtSWQgPSBmaW5hbEl0ZW1JZDtcbiAgICAgICAgYm9hcmRJdGVtRWwuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCB4KTtcbiAgICAgICAgYm9hcmRJdGVtRWwuc2V0QXR0cmlidXRlKCdkYXRhLXknLCB5KTtcbiAgICAgICAgYm9hcmRJdGVtRWwuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFzc2V0LWltYWdlLWNvbnRhaW5lciB3LWZ1bGwgaC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3RodW1ibmFpbFVybH1cIiBjbGFzcz1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvbnRhaW4gcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXNzZXQtYnV0dG9uLXJpYmJvblwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1hY3Rpb249XCJjbGljay0+Ym9hcmQjZG93bmxvYWRBc3NldFwiIGRhdGEtYXNzZXQtaWQ9XCIke2Fzc2V0SWR9XCIgdGl0bGU9XCJEb3dubG9hZFwiIGNsYXNzPVwidGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaC02IHctNlwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTQgMTZ2MWEzIDMgMCAwMDMgM2gxMGEzIDMgMCAwMDMtM3YtMW0tNC00bC00IDRtMCAwbC00LTRtNCA0VjRcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWFjdGlvbj1cImNsaWNrLT5ib2FyZCNhZGRUb0Rvd25sb2FkTGlzdFwiIGRhdGEtYXNzZXQtaWQ9XCIke2Fzc2V0SWR9XCIgdGl0bGU9XCJBZGQgdG8gRG93bmxvYWQgTGlzdFwiIGNsYXNzPVwidGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaC02IHctNlwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTEyIDl2M20wIDB2M20wLTNoM20tMyAwSDltMTIgMGE5IDkgMCAxMS0xOCAwIDkgOSAwIDAxMTggMHpcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgICAgY29uc3QgbmV3Q29udGVudCA9IHsgYXNzZXRJZCwgdGh1bWJuYWlsVXJsIH07XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSB7IGlkOiBmaW5hbEl0ZW1JZCwgdHlwZTogJ2Fzc2V0JywgY29udGVudDogbmV3Q29udGVudCwgeCwgeSwgd2lkdGgsIGhlaWdodCwgekluZGV4IH07XG4gICAgICAgIHRoaXMuX2FkZEl0ZW1Ub0JvYXJkKGJvYXJkSXRlbUVsLCBuZXdJdGVtKTtcbiAgICB9XG5cbiAgICBhZGRHcm91cEl0ZW1Ub0JvYXJkKHgsIHksIHdpZHRoID0gMzAwLCBoZWlnaHQgPSAyNTAsIGl0ZW1JZCA9IG51bGwsIGNvbnRlbnQgPSB7fSwgekluZGV4KSB7XG4gICAgICAgIGNvbnN0IGZpbmFsSXRlbUlkID0gaXRlbUlkID8gU3RyaW5nKGl0ZW1JZCkgOiBgaXRlbS0ke3V1aWR2NCgpfWA7XG4gICAgICAgIGNvbnN0IGdyb3VwRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JvdXBFbC5jbGFzc0xpc3QuYWRkKCdib2FyZC1pdGVtJywgJ2JvYXJkLWl0ZW0tZ3JvdXAnLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgZ3JvdXBFbC5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgICAgIGdyb3VwRWwuc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgIGdyb3VwRWwuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgICAgIGdyb3VwRWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICAgICAgZ3JvdXBFbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgIGdyb3VwRWwuZGF0YXNldC5pdGVtSWQgPSBmaW5hbEl0ZW1JZDtcbiAgICAgICAgZ3JvdXBFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIHgpO1xuICAgICAgICBncm91cEVsLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgeSk7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSB7IGlkOiBmaW5hbEl0ZW1JZCwgdHlwZTogJ2dyb3VwJywgY29udGVudCwgeCwgeSwgd2lkdGgsIGhlaWdodCwgekluZGV4IH07XG4gICAgICAgIHRoaXMuX2FkZEl0ZW1Ub0JvYXJkKGdyb3VwRWwsIG5ld0l0ZW0pO1xuICAgIH1cblxuICAgIGFkZFRleHRJdGVtVG9Cb2FyZCh4LCB5LCB3aWR0aCA9IDIwMCwgaGVpZ2h0ID0gNTAsIGl0ZW1JZCA9IG51bGwsIGNvbnRlbnQgPSB7fSwgekluZGV4KSB7XG4gICAgICAgIGNvbnN0IGZpbmFsSXRlbUlkID0gaXRlbUlkID8gU3RyaW5nKGl0ZW1JZCkgOiBgaXRlbS0ke3V1aWR2NCgpfWA7XG4gICAgICAgIGNvbnN0IHRleHRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0ZXh0RWwuY2xhc3NMaXN0LmFkZCgnYm9hcmQtaXRlbScsICdib2FyZC1pdGVtLXRleHQnLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgdGV4dEVsLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAgICAgdGV4dEVsLnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgICAgICB0ZXh0RWwuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgICAgIHRleHRFbC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICAgICAgICB0ZXh0RWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICB0ZXh0RWwuZGF0YXNldC5pdGVtSWQgPSBmaW5hbEl0ZW1JZDtcbiAgICAgICAgdGV4dEVsLnNldEF0dHJpYnV0ZSgnZGF0YS14JywgeCk7XG4gICAgICAgIHRleHRFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIHkpO1xuICAgICAgICB0ZXh0RWwuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0geyB0ZXh0OiAnVHlwZSBoZXJlLi4uJywgZm9udEZhbWlseTogJ0hlbHZldGljYSwgc2Fucy1zZXJpZicsIGZvbnRTaXplOiAxNiwgZm9udFdlaWdodDogJ25vcm1hbCcsIGZvbnRTdHlsZTogJ25vcm1hbCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyMwMDAwMDAnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJywgYm9yZGVyQ29sb3I6ICcjZDFkNWRiJyB9O1xuICAgICAgICBjb25zdCBuZXdDb250ZW50ID0geyAuLi5kZWZhdWx0U3R5bGVzLCAuLi5jb250ZW50IH07XG4gICAgICAgIHRleHRFbC5pbm5lclRleHQgPSBuZXdDb250ZW50LnRleHQ7XG4gICAgICAgIHRoaXMuYXBwbHlUZXh0U3R5bGVzKHRleHRFbCwgbmV3Q29udGVudCk7XG4gICAgICAgIHRleHRFbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmJvYXJkSXRlbXMuZ2V0KGZpbmFsSXRlbUlkKTtcbiAgICAgICAgICAgIGlmIChpdGVtKSBpdGVtLmNvbnRlbnQudGV4dCA9IHRleHRFbC5pbm5lclRleHQ7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuZXdJdGVtID0geyBpZDogZmluYWxJdGVtSWQsIHR5cGU6ICd0ZXh0JywgY29udGVudDogbmV3Q29udGVudCwgeCwgeSwgd2lkdGgsIGhlaWdodCwgekluZGV4IH07XG4gICAgICAgIHRoaXMuX2FkZEl0ZW1Ub0JvYXJkKHRleHRFbCwgbmV3SXRlbSk7XG4gICAgICAgIGlmICghaXRlbUlkKSB0ZXh0RWwuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBhZGRMaW5lSXRlbVRvQm9hcmQoc3RhcnQsIGVuZCwgdHlwZSwgaXRlbUlkID0gbnVsbCwgY29udGVudCA9IHt9LCB6SW5kZXgpIHtcbiAgICAgICAgY29uc3QgZmluYWxJdGVtSWQgPSBpdGVtSWQgPyBTdHJpbmcoaXRlbUlkKSA6IGBpdGVtLSR7dXVpZHY0KCl9YDtcbiAgICAgICAgY29uc3QgbmV3Q29udGVudCA9IHsgeDE6IHN0YXJ0LngsIHkxOiBzdGFydC55LCB4MjogZW5kLngsIHkyOiBlbmQueSwgLi4uY29udGVudCB9O1xuICAgICAgICBjb25zdCBzdmdFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJyk7XG4gICAgICAgIHN2Z0VsLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLWl0ZW0nLCAnYm9hcmQtaXRlbS1saW5lJyk7XG4gICAgICAgIHN2Z0VsLmRhdGFzZXQuaXRlbUlkID0gZmluYWxJdGVtSWQ7XG4gICAgICAgIGNvbnN0IHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5nZXRMaW5lQm91bmRpbmdCb3gobmV3Q29udGVudCk7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSB7IGlkOiBmaW5hbEl0ZW1JZCwgdHlwZSwgY29udGVudDogbmV3Q29udGVudCwgeCwgeSwgd2lkdGgsIGhlaWdodCwgekluZGV4IH07XG4gICAgICAgIHRoaXMuYnVpbGRMaW5lRWxlbWVudChzdmdFbCwgbmV3SXRlbSk7XG4gICAgICAgIHRoaXMuX2FkZEl0ZW1Ub0JvYXJkKHN2Z0VsLCBuZXdJdGVtKTtcbiAgICB9XG5cbiAgICBtYWtlSXRlbUludGVyYWN0aXZlKGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgcmVzaXphYmxlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGVkZ2VzOiB7IGxlZnQ6IHRydWUsIHJpZ2h0OiB0cnVlLCBib3R0b206IHRydWUsIHRvcDogdHJ1ZSB9LFxuICAgICAgICAgICAgbGlzdGVuZXJzOiB7XG4gICAgICAgICAgICAgICAgbW92ZTogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpKSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS15JykpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zdHlsZS53aWR0aCA9IGAke2V2ZW50LnJlY3Qud2lkdGggLyB0aGlzLnpvb219cHhgO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7ZXZlbnQucmVjdC5oZWlnaHQgLyB0aGlzLnpvb219cHhgO1xuICAgICAgICAgICAgICAgICAgICB4ICs9IGV2ZW50LmRlbHRhUmVjdC5sZWZ0IC8gdGhpcy56b29tO1xuICAgICAgICAgICAgICAgICAgICB5ICs9IGV2ZW50LmRlbHRhUmVjdC50b3AgLyB0aGlzLnpvb207XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIHgpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXknLCB5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdib2FyZC1pdGVtLWFzc2V0JykpIHtcbiAgICAgICAgICAgIHJlc2l6YWJsZU9wdGlvbnMubW9kaWZpZXJzID0gW1xuICAgICAgICAgICAgICAgIGludGVyYWN0Lm1vZGlmaWVycy5yZXN0cmljdFNpemUoe1xuICAgICAgICAgICAgICAgICAgICBtaW46IHsgd2lkdGg6IDE1MCwgaGVpZ2h0OiAxNTAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaW50ZXJhY3QoZWxlbWVudCkuZHJhZ2dhYmxlKHsgaW5lcnRpYTogdHJ1ZSwgbGlzdGVuZXJzOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmludGVyYWN0aW9uLnN0YXJ0UG9zID0geyB4OiBwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpKSB8fCAwLCB5OiBwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpKSB8fCAwIH07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb3ZlOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydFBvcyA9IGV2ZW50LmludGVyYWN0aW9uLnN0YXJ0UG9zO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdYID0gc3RhcnRQb3MueCArIChldmVudC5wYWdlWCAtIGV2ZW50LngwKSAvIHRoaXMuem9vbTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3WSA9IHN0YXJ0UG9zLnkgKyAoZXZlbnQucGFnZVkgLSBldmVudC55MCkgLyB0aGlzLnpvb207XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7bmV3WH1weCwgJHtuZXdZfXB4KWA7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIG5ld1gpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXknLCBuZXdZKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfX0pLnJlc2l6YWJsZSh7IGVkZ2VzOiB7IGxlZnQ6IHRydWUsIHJpZ2h0OiB0cnVlLCBib3R0b206IHRydWUsIHRvcDogdHJ1ZSB9LCBsaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgICAgICBtb3ZlOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS14JykpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gcGFyc2VGbG9hdCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSkgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gYCR7ZXZlbnQucmVjdC53aWR0aCAvIHRoaXMuem9vbX1weGA7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBgJHtldmVudC5yZWN0LmhlaWdodCAvIHRoaXMuem9vbX1weGA7XG4gICAgICAgICAgICAgICAgICAgIHggKz0gZXZlbnQuZGVsdGFSZWN0LmxlZnQgLyB0aGlzLnpvb207XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gZXZlbnQuZGVsdGFSZWN0LnRvcCAvIHRoaXMuem9vbTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS14JywgeCk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19KS5vbignZHJhZ2VuZCByZXNpemVlbmQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9IHRhcmdldC5kYXRhc2V0Lml0ZW1JZDtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmJvYXJkSXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ueCA9IHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS14JykpO1xuICAgICAgICAgICAgICAgIGl0ZW0ueSA9IHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS15JykpO1xuICAgICAgICAgICAgICAgIGl0ZW0ud2lkdGggPSBwYXJzZUZsb2F0KHRhcmdldC5zdHlsZS53aWR0aCk7XG4gICAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSBwYXJzZUZsb2F0KHRhcmdldC5zdHlsZS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LmludGVyYWN0aW9uKSBldmVudC5pbnRlcmFjdGlvbi5zdGFydFBvcyA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VMaW5lSW50ZXJhY3RpdmUoc3ZnRWwpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gc3ZnRWwuZGF0YXNldC5pdGVtSWQ7XG4gICAgICAgIGNvbnN0IHN0YXJ0SGFuZGxlID0gc3ZnRWwucXVlcnlTZWxlY3RvcignLnN0YXJ0LWhhbmRsZScpO1xuICAgICAgICBjb25zdCBlbmRIYW5kbGUgPSBzdmdFbC5xdWVyeVNlbGVjdG9yKCcuZW5kLWhhbmRsZScpO1xuXG4gICAgICAgIGludGVyYWN0KHN2Z0VsKS5kcmFnZ2FibGUoe1xuICAgICAgICAgICAgYWxsb3dGcm9tOiAnLmhpdGJveC1saW5lJyxcbiAgICAgICAgICAgIGxpc3RlbmVyczoge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYm9hcmRJdGVtcy5nZXQoaXRlbUlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmludGVyYWN0aW9uLnN0YXJ0UG9zID0geyB4OiBpdGVtLngsIHk6IGl0ZW0ueSB9O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW92ZTogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ggPSBldmVudC5pbnRlcmFjdGlvbi5zdGFydFBvcy54ICsgKGV2ZW50LnBhZ2VYIC0gZXZlbnQueDApIC8gdGhpcy56b29tO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdZID0gZXZlbnQuaW50ZXJhY3Rpb24uc3RhcnRQb3MueSArIChldmVudC5wYWdlWSAtIGV2ZW50LnkwKSAvIHRoaXMuem9vbTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtuZXdYfXB4LCAke25ld1l9cHhgO1xuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCBuZXdYKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS15JywgbmV3WSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5ib2FyZEl0ZW1zLmdldChpdGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRYID0gaXRlbS54O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRZID0gaXRlbS55O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdYID0gcGFyc2VGbG9hdChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1kgPSBwYXJzZUZsb2F0KGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkeCA9IG5ld1ggLSBvbGRYO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkeSA9IG5ld1kgLSBvbGRZO1xuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29udGVudC54MSArPSBkeDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb250ZW50LnkxICs9IGR5O1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbnRlbnQueDIgKz0gZHg7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29udGVudC55MiArPSBkeTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSB0aGlzLmdldExpbmVCb3VuZGluZ0JveChpdGVtLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnggPSB4O1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnkgPSB5O1xuICAgICAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmludGVyYWN0aW9uLnN0YXJ0UG9zID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGludGVyYWN0KHN0YXJ0SGFuZGxlKS5kcmFnZ2FibGUoe1xuICAgICAgICAgICAgbGlzdGVuZXJzOiB7XG4gICAgICAgICAgICAgICAgbW92ZTogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmJvYXJkSXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29udGVudC54MSArPSBldmVudC5keCAvIHRoaXMuem9vbTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb250ZW50LnkxICs9IGV2ZW50LmR5IC8gdGhpcy56b29tO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxpbmVFbGVtZW50KHN2Z0VsLCBpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGludGVyYWN0KGVuZEhhbmRsZSkuZHJhZ2dhYmxlKHtcbiAgICAgICAgICAgIGxpc3RlbmVyczoge1xuICAgICAgICAgICAgICAgIG1vdmU6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5ib2FyZEl0ZW1zLmdldChpdGVtSWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbnRlbnQueDIgKz0gZXZlbnQuZHggLyB0aGlzLnpvb207XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29udGVudC55MiArPSBldmVudC5keSAvIHRoaXMuem9vbTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMaW5lRWxlbWVudChzdmdFbCwgaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAtLS0gOC4gQVNTRVQgQ0FSRCBBQ1RJT05TIChOZXcpIC0tLSAvL1xuXG4gICAgZG93bmxvYWRBc3NldChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgY29uc3QgYXNzZXRJZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5hc3NldElkO1xuICAgICAgICB3aW5kb3cub3BlbihgL2Fzc2V0LyR7YXNzZXRJZH0vZG93bmxvYWRgLCAnX2JsYW5rJyk7XG4gICAgfVxuXG4gICAgYWRkVG9Eb3dubG9hZExpc3QoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IGFzc2V0SWQgPSBidXR0b24uZGF0YXNldC5hc3NldElkO1xuXG4gICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICAgICAgZmV0Y2goYC9kb3dubG9hZC1saXN0L2FkZC8ke2Fzc2V0SWR9YCwgeyBtZXRob2Q6ICdQT1NUJyB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gJ0FkZGVkISc7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV2ZXJ0IGJhY2sgdG8gcGx1cyBpY29uIGFmdGVyIGEgZGVsYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnPHN2ZyBjbGFzcz1cImgtNiB3LTZcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0xMiA5djNtMCAwdjNtMC0zaDNtLTMgMEg5bTEyIDBhOSA5IDAgMTEtMTggMCA5IDkgMCAwMTE4IDB6XCI+PC9wYXRoPjwvc3ZnPic7XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9ICdFcnJvcic7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIC0tLSA5LiBIRUxQRVIgRlVOQ1RJT05TIC0tLSAvL1xuXG4gICAgZ2V0TGluZUJvdW5kaW5nQm94KGNvbnRlbnQpIHtcbiAgICAgICAgY29uc3QgeCA9IE1hdGgubWluKGNvbnRlbnQueDEsIGNvbnRlbnQueDIpO1xuICAgICAgICBjb25zdCB5ID0gTWF0aC5taW4oY29udGVudC55MSwgY29udGVudC55Mik7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5hYnMoY29udGVudC54MSAtIGNvbnRlbnQueDIpO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBNYXRoLmFicyhjb250ZW50LnkxIC0gY29udGVudC55Mik7XG4gICAgICAgIHJldHVybiB7IHgsIHksIHdpZHRoLCBoZWlnaHQgfTtcbiAgICB9XG5cbiAgICBidWlsZExpbmVFbGVtZW50KHN2Z0VsLCBpdGVtKSB7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5nZXRMaW5lQm91bmRpbmdCb3goaXRlbS5jb250ZW50KTtcbiAgICAgICAgc3ZnRWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICBzdmdFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIHgpO1xuICAgICAgICBzdmdFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIHkpO1xuICAgICAgICBjb25zdCByZWxYMSA9IGl0ZW0uY29udGVudC54MSAtIHg7XG4gICAgICAgIGNvbnN0IHJlbFkxID0gaXRlbS5jb250ZW50LnkxIC0geTtcbiAgICAgICAgY29uc3QgcmVsWDIgPSBpdGVtLmNvbnRlbnQueDIgLSB4O1xuICAgICAgICBjb25zdCByZWxZMiA9IGl0ZW0uY29udGVudC55MiAtIHk7XG4gICAgICAgIHN2Z0VsLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxsaW5lIGNsYXNzPVwiaGl0Ym94LWxpbmVcIiB4MT1cIiR7cmVsWDF9XCIgeTE9XCIke3JlbFkxfVwiIHgyPVwiJHtyZWxYMn1cIiB5Mj1cIiR7cmVsWTJ9XCIgc3Ryb2tlPVwidHJhbnNwYXJlbnRcIiBzdHJva2Utd2lkdGg9XCIxNVwiPjwvbGluZT5cbiAgICAgICAgICAgIDxsaW5lIGNsYXNzPVwidmlzdWFsLWxpbmVcIiB4MT1cIiR7cmVsWDF9XCIgeTE9XCIke3JlbFkxfVwiIHgyPVwiJHtyZWxYMn1cIiB5Mj1cIiR7cmVsWTJ9XCIgc3Ryb2tlPVwiYmxhY2tcIiBzdHJva2Utd2lkdGg9XCIyXCIgJHtpdGVtLnR5cGUgPT09ICdhcnJvdycgPyAnbWFya2VyLWVuZD1cInVybCgjYXJyb3doZWFkKVwiJyA6ICcnfT48L2xpbmU+XG4gICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVwibGluZS1oYW5kbGUgc3RhcnQtaGFuZGxlXCIgY3g9XCIke3JlbFgxfVwiIGN5PVwiJHtyZWxZMX1cIiByPVwiNVwiPjwvY2lyY2xlPlxuICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz1cImxpbmUtaGFuZGxlIGVuZC1oYW5kbGVcIiBjeD1cIiR7cmVsWDJ9XCIgY3k9XCIke3JlbFkyfVwiIHI9XCI1XCI+PC9jaXJjbGU+XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgdXBkYXRlTGluZUVsZW1lbnQoc3ZnRWwsIGl0ZW0pIHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLmdldExpbmVCb3VuZGluZ0JveChpdGVtLmNvbnRlbnQpO1xuICAgICAgICBpdGVtLnggPSB4OyBpdGVtLnkgPSB5O1xuICAgICAgICBzdmdFbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgIHN2Z0VsLnNldEF0dHJpYnV0ZSgnZGF0YS14JywgeCk7XG4gICAgICAgIHN2Z0VsLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgeSk7XG4gICAgICAgIGNvbnN0IHJlbFgxID0gaXRlbS5jb250ZW50LngxIC0geDtcbiAgICAgICAgY29uc3QgcmVsWTEgPSBpdGVtLmNvbnRlbnQueTEgLSB5O1xuICAgICAgICBjb25zdCByZWxYMiA9IGl0ZW0uY29udGVudC54MiAtIHg7XG4gICAgICAgIGNvbnN0IHJlbFkyID0gaXRlbS5jb250ZW50LnkyIC0geTtcbiAgICAgICAgc3ZnRWwucXVlcnlTZWxlY3RvcignLmhpdGJveC1saW5lJykuc2V0QXR0cmlidXRlKCd4MScsIHJlbFgxKTtcbiAgICAgICAgc3ZnRWwucXVlcnlTZWxlY3RvcignLmhpdGJveC1saW5lJykuc2V0QXR0cmlidXRlKCd5MScsIHJlbFkxKTtcbiAgICAgICAgc3ZnRWwucXVlcnlTZWxlY3RvcignLmhpdGJveC1saW5lJykuc2V0QXR0cmlidXRlKCd4MicsIHJlbFgyKTtcbiAgICAgICAgc3ZnRWwucXVlcnlTZWxlY3RvcignLmhpdGJveC1saW5lJykuc2V0QXR0cmlidXRlKCd5MicsIHJlbFkyKTtcbiAgICAgICAgc3ZnRWwucXVlcnlTZWxlY3RvcignLnZpc3VhbC1saW5lJykuc2V0QXR0cmlidXRlKCd4MScsIHJlbFgxKTtcbiAgICAgICAgc3ZnRWwucXVlcnlTZWxlY3RvcignLnZpc3VhbC1saW5lJykuc2V0QXR0cmlidXRlKCd5MScsIHJlbFkxKTtcbiAgICAgICAgc3ZnRWwucXVlcnlTZWxlY3RvcignLnZpc3VhbC1saW5lJykuc2V0QXR0cmlidXRlKCd4MicsIHJlbFgyKTtcbiAgICAgICAgc3ZnRWwucXVlcnlTZWxlY3RvcignLnZpc3VhbC1saW5lJykuc2V0QXR0cmlidXRlKCd5MicsIHJlbFkyKTtcbiAgICAgICAgc3ZnRWwucXVlcnlTZWxlY3RvcignLnN0YXJ0LWhhbmRsZScpLnNldEF0dHJpYnV0ZSgnY3gnLCByZWxYMSk7XG4gICAgICAgIHN2Z0VsLnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1oYW5kbGUnKS5zZXRBdHRyaWJ1dGUoJ2N5JywgcmVsWTEpO1xuICAgICAgICBzdmdFbC5xdWVyeVNlbGVjdG9yKCcuZW5kLWhhbmRsZScpLnNldEF0dHJpYnV0ZSgnY3gnLCByZWxYMik7XG4gICAgICAgIHN2Z0VsLnF1ZXJ5U2VsZWN0b3IoJy5lbmQtaGFuZGxlJykuc2V0QXR0cmlidXRlKCdjeScsIHJlbFkyKTtcbiAgICB9XG5cbiAgICAvLyAtLS0gMTAuIFNUQVRFIE1BTkFHRU1FTlQgJiBBUEkgLS0tIC8vXG5cbiAgICBhc3luYyBsb2FkQm9hcmRTdGF0ZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9ib2FyZHMvJHt0aGlzLmJvYXJkSWRWYWx1ZX0vaXRlbXNgKTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgTmV0d29yayByZXNwb25zZSB3YXMgbm90IG9rOiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzVGFyZ2V0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5ib2FyZEl0ZW1zLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLnpDb3VudGVyID0gMDtcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVJdGVtRnJvbURhdGEoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnpJbmRleCA+IHRoaXMuekNvdW50ZXIpIHRoaXMuekNvdW50ZXIgPSBpdGVtLnpJbmRleDtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byByZW5kZXIgYSBib2FyZCBpdGVtOicsIHsgaXRlbSwgZXJyb3I6IGUgfSk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgdGhpcy5mcmFtZUNvbnRlbnQoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYXRhbCBlcnJvciBsb2FkaW5nIGJvYXJkIHN0YXRlOlwiLCBlcnJvcik7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc1RhcmdldC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cInAtNCB0ZXh0LXJlZC02MDAgYmctcmVkLTEwMCBib3JkZXIgYm9yZGVyLXJlZC00MDAgcm91bmRlZFwiPkNvdWxkIG5vdCBsb2FkIGJvYXJkLjwvZGl2PmA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzYXZlQm9hcmRTdGF0ZShpc0F1dG9TYXZlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTYXZpbmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IHRydWU7XG4gICAgICAgIGlmICghaXNBdXRvU2F2ZSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlQnRuVGFyZ2V0LnRleHRDb250ZW50ID0gJ1NhdmluZy4uLic7XG4gICAgICAgICAgICB0aGlzLnNhdmVCdG5UYXJnZXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBBcnJheS5mcm9tKHRoaXMuYm9hcmRJdGVtcy52YWx1ZXMoKSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYm9hcmRzLyR7dGhpcy5ib2FyZElkVmFsdWV9L3NhdmVgLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGl0ZW1zOiBwYXlsb2FkIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHNhdmUgYm9hcmQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlckl0ZW1zID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgdGhpcy5fc3luY1N0YXRlRnJvbVNlcnZlcihzZXJ2ZXJJdGVtcyk7XG4gICAgICAgICAgICBpZiAoIWlzQXV0b1NhdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVCdG5UYXJnZXQudGV4dENvbnRlbnQgPSAnU2F2ZWQhJztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlQnRuVGFyZ2V0LnRleHRDb250ZW50ID0gJ1NhdmUnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVCdG5UYXJnZXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCAxNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NhdmUgZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgICAgaWYgKCFpc0F1dG9TYXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlQnRuVGFyZ2V0LnRleHRDb250ZW50ID0gJ1NhdmUgRmFpbGVkJztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlQnRuVGFyZ2V0LnRleHRDb250ZW50ID0gJ1NhdmUnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVCdG5UYXJnZXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zeW5jU3RhdGVGcm9tU2VydmVyKHNlcnZlckl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IG5ld0JvYXJkSXRlbXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHNlcnZlckl0ZW1zLmZvckVhY2goc2VydmVySXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXJJZCA9IFN0cmluZyhzZXJ2ZXJJdGVtLmlkKTtcbiAgICAgICAgICAgIGxldCBsb2NhbEl0ZW07XG4gICAgICAgICAgICBpZiAoc2VydmVySXRlbS50ZW1wSWQgJiYgdGhpcy5ib2FyZEl0ZW1zLmhhcyhzZXJ2ZXJJdGVtLnRlbXBJZCkpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEl0ZW0gPSB0aGlzLmJvYXJkSXRlbXMuZ2V0KHNlcnZlckl0ZW0udGVtcElkKTtcbiAgICAgICAgICAgICAgICBsb2NhbEl0ZW0uaWQgPSBzZXJ2ZXJJZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9jYWxJdGVtID0gdGhpcy5ib2FyZEl0ZW1zLmdldChzZXJ2ZXJJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobG9jYWxJdGVtKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxJdGVtLnpJbmRleCA9IHNlcnZlckl0ZW0uekluZGV4O1xuICAgICAgICAgICAgICAgIG5ld0JvYXJkSXRlbXMuc2V0KHNlcnZlcklkLCBsb2NhbEl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJdGVtRGF0YSA9IHsgLi4uc2VydmVySXRlbSwgaWQ6IHNlcnZlcklkLCB4OiBzZXJ2ZXJJdGVtLnBvc194LCB5OiBzZXJ2ZXJJdGVtLnBvc195IH07XG4gICAgICAgICAgICAgICAgbmV3Qm9hcmRJdGVtcy5zZXQoc2VydmVySWQsIG5ld0l0ZW1EYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYm9hcmRJdGVtcyA9IG5ld0JvYXJkSXRlbXM7XG4gICAgICAgIHRoaXMuY2FudmFzVGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1pdGVtJykuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ib2FyZEl0ZW1zLmhhcyhlbGVtZW50LmRhdGFzZXQuaXRlbUlkKSkgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYm9hcmRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmNhbnZhc1RhcmdldC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pdGVtLWlkPVwiJHtpdGVtLmlkfVwiXWApO1xuICAgICAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVJdGVtRnJvbURhdGEoaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuekluZGV4ID0gaXRlbS56SW5kZXg7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9tSXRlbSA9IHRoaXMuYm9hcmRJdGVtcy5nZXQoZWxlbWVudC5kYXRhc2V0Lml0ZW1JZCk7XG4gICAgICAgICAgICAgICAgaWYgKGRvbUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7ZG9tSXRlbS54fXB4LCAke2RvbUl0ZW0ueX1weClgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlSXRlbUZyb21EYXRhKGl0ZW1EYXRhKSB7XG4gICAgICAgIGNvbnN0IHggPSBpdGVtRGF0YS5wb3NfeCA/PyBpdGVtRGF0YS54O1xuICAgICAgICBjb25zdCB5ID0gaXRlbURhdGEucG9zX3kgPz8gaXRlbURhdGEueTtcblxuICAgICAgICBpZiAoaXRlbURhdGEudHlwZSA9PT0gJ2xpbmUnIHx8IGl0ZW1EYXRhLnR5cGUgPT09ICdhcnJvdycpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTGluZUl0ZW1Ub0JvYXJkKHt4OiBpdGVtRGF0YS5jb250ZW50LngxLCB5OiBpdGVtRGF0YS5jb250ZW50LnkxfSwge3g6IGl0ZW1EYXRhLmNvbnRlbnQueDIsIHk6IGl0ZW1EYXRhLmNvbnRlbnQueTJ9LCBpdGVtRGF0YS50eXBlLCBpdGVtRGF0YS5pZCwgaXRlbURhdGEuY29udGVudCwgaXRlbURhdGEuekluZGV4KTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtRGF0YS50eXBlID09PSAnYXNzZXQnKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEFzc2V0VG9Cb2FyZChpdGVtRGF0YS5jb250ZW50LmFzc2V0SWQsIGl0ZW1EYXRhLmNvbnRlbnQudGh1bWJuYWlsVXJsLCB4LCB5LCBpdGVtRGF0YS53aWR0aCwgaXRlbURhdGEuaGVpZ2h0LCBpdGVtRGF0YS5pZCwgaXRlbURhdGEuekluZGV4KTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtRGF0YS50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkVGV4dEl0ZW1Ub0JvYXJkKHgsIHksIGl0ZW1EYXRhLndpZHRoLCBpdGVtRGF0YS5oZWlnaHQsIGl0ZW1EYXRhLmlkLCBpdGVtRGF0YS5jb250ZW50LCBpdGVtRGF0YS56SW5kZXgpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1EYXRhLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkR3JvdXBJdGVtVG9Cb2FyZCh4LCB5LCBpdGVtRGF0YS53aWR0aCwgaXRlbURhdGEuaGVpZ2h0LCBpdGVtRGF0YS5pZCwgaXRlbURhdGEuY29udGVudCwgaXRlbURhdGEuekluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNlYXJjaEFzc2V0cyhldmVudCkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZXRMaXN0VGFyZ2V0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZldGNoKGAvYm9hcmRzL2Fzc2V0cy9zZWFyY2g/cT0ke3F1ZXJ5fWApXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihhc3NldHMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRMaXN0VGFyZ2V0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGFzc2V0cy5mb3JFYWNoKGFzc2V0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzZXRFbGVtZW50ID0gdGhpcy5jcmVhdGVBc3NldEVsZW1lbnQoYXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2V0TGlzdFRhcmdldC5hcHBlbmRDaGlsZChhc3NldEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlQXNzZXRFbGVtZW50KGFzc2V0KSB7XG4gICAgICAgIGNvbnN0IGFzc2V0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhc3NldEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncC0yJywgJ2JvcmRlci1iJywgJ2N1cnNvci1tb3ZlJywgJ2Fzc2V0LWl0ZW0nLCAnZmxleCcsICdpdGVtcy1jZW50ZXInKTtcbiAgICAgICAgYXNzZXRFbGVtZW50LmRhdGFzZXQuYXNzZXRJZCA9IGFzc2V0LmlkO1xuICAgICAgICBhc3NldEVsZW1lbnQuZGF0YXNldC5hc3NldE5hbWUgPSBhc3NldC5uYW1lO1xuICAgICAgICBhc3NldEVsZW1lbnQuZGF0YXNldC5hc3NldFRodW1ibmFpbCA9IGFzc2V0LnRodW1ibmFpbF9wYXRoO1xuICAgICAgICBhc3NldEVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGltZyBzcmM9XCIke2Fzc2V0LnRodW1ibmFpbF9wYXRofVwiIGFsdD1cIiR7YXNzZXQubmFtZX1cIiBjbGFzcz1cInctMTIgaC0xMiBvYmplY3QtY292ZXIgaW5saW5lLWJsb2NrIG1yLTMgcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXNtIHBvaW50ZXItZXZlbnRzLW5vbmVcIj4ke2Fzc2V0Lm5hbWV9PC9zcGFuPlxuICAgICAgICBgO1xuICAgICAgICByZXR1cm4gYXNzZXRFbGVtZW50O1xuICAgIH1cblxuICAgIGluaXRBc3NldFBhbmVsQW5kRHJvcHpvbmUoKSB7XG4gICAgICAgIGludGVyYWN0KCcjYXNzZXQtbGlzdCAuYXNzZXQtaXRlbScpLmRyYWdnYWJsZSh7IGluZXJ0aWE6IHRydWUsIGxpc3RlbmVyczoge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWwgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gb3JpZ2luYWwuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZy1jbG9uZScpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuaW50ZXJhY3Rpb24uY2xvbmUgPSBjbG9uZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IG9yaWdpbmFsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICBjbG9uZS5zdHlsZS5sZWZ0ID0gYCR7cmVjdC5sZWZ0fXB4YDtcbiAgICAgICAgICAgICAgICAgICAgY2xvbmUuc3R5bGUudG9wID0gYCR7cmVjdC50b3B9cHhgO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW92ZTogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gZXZlbnQuaW50ZXJhY3Rpb24uY2xvbmU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSAocGFyc2VGbG9hdChjbG9uZS5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpKSB8fCAwKSArIGV2ZW50LmR4O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gKHBhcnNlRmxvYXQoY2xvbmUuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSkgfHwgMCkgKyBldmVudC5keTtcbiAgICAgICAgICAgICAgICAgICAgY2xvbmUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgICAgICAgICAgICAgICAgICBjbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIHgpO1xuICAgICAgICAgICAgICAgICAgICBjbG9uZS5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIHkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuaW50ZXJhY3Rpb24uY2xvbmUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX0pO1xuICAgICAgICBpbnRlcmFjdCh0aGlzLnZpZXdwb3J0VGFyZ2V0KS5kcm9wem9uZSh7IGFjY2VwdDogJy5hc3NldC1pdGVtJywgb25kcm9wOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkcm9wcGVkRWxlbWVudCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld3BvcnRSZWN0ID0gdGhpcy52aWV3cG9ydFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkcm9wWF92aWV3cG9ydCA9IGV2ZW50LmRyYWdFdmVudC5jbGllbnQueCAtIHZpZXdwb3J0UmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGRyb3BZX3ZpZXdwb3J0ID0gZXZlbnQuZHJhZ0V2ZW50LmNsaWVudC55IC0gdmlld3BvcnRSZWN0LnRvcDtcbiAgICAgICAgICAgICAgICBjb25zdCBkcm9wWF9jYW52YXMgPSAoZHJvcFhfdmlld3BvcnQgLSB0aGlzLnBhbi54KSAvIHRoaXMuem9vbTtcbiAgICAgICAgICAgICAgICBjb25zdCBkcm9wWV9jYW52YXMgPSAoZHJvcFlfdmlld3BvcnQgLSB0aGlzLnBhbi55KSAvIHRoaXMuem9vbTtcbiAgICAgICAgICAgICAgICBjb25zdCBhc3NldElkID0gZHJvcHBlZEVsZW1lbnQuZGF0YXNldC5hc3NldElkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFzc2V0VGh1bWJuYWlsID0gZHJvcHBlZEVsZW1lbnQuZGF0YXNldC5hc3NldFRodW1ibmFpbDtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEFzc2V0VG9Cb2FyZChhc3NldElkLCBhc3NldFRodW1ibmFpbCwgZHJvcFhfY2FudmFzLCBkcm9wWV9jYW52YXMpO1xuICAgICAgICAgICAgfX0pO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJ0Bob3R3aXJlZC9zdGltdWx1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgc3RhdGljIHRhcmdldHMgPSBbXCJicmFuZExpc3RcIl07XG5cbiAgICBmaWx0ZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcGFyZW50SWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgICAgICBjb25zdCBjaGVja2JveGVzID0gdGhpcy5icmFuZExpc3RUYXJnZXQucXVlcnlTZWxlY3RvckFsbCgnZGl2LmZvcm0tY2hlY2snKTtcblxuICAgICAgICBjaGVja2JveGVzLmZvckVhY2goKGNoZWNrYm94RGl2KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGNoZWNrYm94RGl2LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuXG4gICAgICAgICAgICAvLyBTaG93IHRoZSBjaGVja2JveCBpZiBcIkFsbFwiIGlzIHNlbGVjdGVkIG9yIGlmIGl0cyBwYXJlbnQgSUQgbWF0Y2hlc1xuICAgICAgICAgICAgaWYgKHBhcmVudElkID09PSBcIlwiIHx8IGlucHV0LmRhdGFzZXQucGFyZW50SWQgPT09IHBhcmVudElkKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tib3hEaXYuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94RGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICdAaG90d2lyZWQvc3RpbXVsdXMnO1xuY29uc3QgY29udHJvbGxlciA9IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy5fX3N0aW11bHVzTGF6eUNvbnRyb2xsZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICBpZiAodGhpcy5hcHBsaWNhdGlvbi5jb250cm9sbGVycy5maW5kKChjb250cm9sbGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29udHJvbGxlci5pZGVudGlmaWVyID09PSB0aGlzLmlkZW50aWZpZXIgJiYgY29udHJvbGxlci5fX3N0aW11bHVzTGF6eUNvbnRyb2xsZXI7XG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaW1wb3J0KCcvVXNlcnMvYXJ0My9EZXZlbG9wZXIvZGlnaXRhbC1hc3NldHMtbWFuYWdlci9hc3NldHMvY29udHJvbGxlcnMvY3NyZl9wcm90ZWN0aW9uX2NvbnRyb2xsZXIuanMnKS50aGVuKChjb250cm9sbGVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLnJlZ2lzdGVyKHRoaXMuaWRlbnRpZmllciwgY29udHJvbGxlci5kZWZhdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmV4cG9ydCB7IGNvbnRyb2xsZXIgYXMgZGVmYXVsdCB9OyIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICdAaG90d2lyZWQvc3RpbXVsdXMnO1xuaW1wb3J0ICogYXMgdHVzIGZyb20gJ3R1cy1qcy1jbGllbnQnO1xuaW1wb3J0IHsgY3JlYXRlVHVzVXBsb2FkTWV0YWRhdGEgfSBmcm9tICcuL3VwbG9hZF9tZXRhZGF0YSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgc3RhdGljIHRhcmdldHMgPSBbXG4gICAgICAgIFwiZmlsZUlucHV0XCIsIFwiZHJvcHpvbmVcIiwgXCJmaWxlU3VtbWFyeVwiLCBcImZpbGVMaXN0XCIsIFwic3VibWl0QnV0dG9uXCIsXG4gICAgICAgIFwicHJvZ3Jlc3NDb250YWluZXJcIiwgXCJwcm9ncmVzc0JhclwiLCBcInByb2dyZXNzVGV4dFwiLCBcInJlc3VsdENvbnRhaW5lclwiLCBcInVybElucHV0XCJcbiAgICBdO1xuXG4gICAgc3RhdGljIHZhbHVlcyA9IHtcbiAgICAgICAgYXV0aFRva2VuOiBTdHJpbmcsXG4gICAgfTtcblxuICAgIHBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XG4gICAgc2VsZWN0ZWRGaWxlcyA9IFtdO1xuXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5kcm9wem9uZVRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuZmlsZUlucHV0VGFyZ2V0LmNsaWNrKCkpO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLnBvbGxpbmdJbnRlcnZhbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnBvbGxpbmdJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmFnb3ZlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmRyb3B6b25lVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2JvcmRlci12aW9sZXQtNTAwJywgJ2JnLWdyYXktNTAnKTtcbiAgICB9XG5cbiAgICBkcmFnbGVhdmUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5kcm9wem9uZVRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdib3JkZXItdmlvbGV0LTUwMCcsICdiZy1ncmF5LTUwJyk7XG4gICAgfVxuXG4gICAgZHJvcChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmZpbGVJbnB1dFRhcmdldC5maWxlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICAgICAgdGhpcy5kcmFnbGVhdmUoZXZlbnQpO1xuICAgICAgICB0aGlzLmZpbGVzU2VsZWN0ZWQoKTtcbiAgICB9XG5cbiAgICBmaWxlc1NlbGVjdGVkKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBBcnJheS5mcm9tKHRoaXMuZmlsZUlucHV0VGFyZ2V0LmZpbGVzKTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsQnl0ZXMgPSB0aGlzLnNlbGVjdGVkRmlsZXMucmVkdWNlKChzdW0sIGZpbGUpID0+IHN1bSArIGZpbGUuc2l6ZSwgMCk7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGggPT09IDEgPyAnZmlsZScgOiAnZmlsZXMnO1xuXG4gICAgICAgICAgICB0aGlzLmZpbGVTdW1tYXJ5VGFyZ2V0LnRleHRDb250ZW50ID0gYCR7dGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aH0gJHtsYWJlbH0gc2VsZWN0ZWQgKCR7dGhpcy5mb3JtYXRGaWxlU2l6ZSh0b3RhbEJ5dGVzKX0pYDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU2VsZWN0ZWRGaWxlcygpO1xuICAgICAgICAgICAgdGhpcy5zdWJtaXRCdXR0b25UYXJnZXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZVN1bW1hcnlUYXJnZXQudGV4dENvbnRlbnQgPSAnTm8gZmlsZXMgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgdGhpcy5maWxlTGlzdFRhcmdldC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc3VibWl0QnV0dG9uVGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHVwbG9hZChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXN1bHRDb250YWluZXJUYXJnZXQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uVGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5maWxlSW5wdXRUYXJnZXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyb3B6b25lVGFyZ2V0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDb250YWluZXJUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJUYXJnZXQuc3R5bGUud2lkdGggPSAnMCUnO1xuICAgICAgICB0aGlzLnByb2dyZXNzVGV4dFRhcmdldC50ZXh0Q29udGVudCA9ICdQcmVwYXJpbmcgdXBsb2FkLi4uJztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyB0b2tlbjogc2hhcmVUb2tlbiB9ID0gYXdhaXQgdGhpcy5jcmVhdGVTaGFyZVNlc3Npb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsQnl0ZXMgPSB0aGlzLnNlbGVjdGVkRmlsZXMucmVkdWNlKChzdW0sIGZpbGUpID0+IHN1bSArIGZpbGUuc2l6ZSwgMCk7XG4gICAgICAgICAgICBsZXQgY29tcGxldGVkQnl0ZXMgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtpbmRleCwgZmlsZV0gb2YgdGhpcy5zZWxlY3RlZEZpbGVzLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsZVN0YXR1cyhpbmRleCwgJ1VwbG9hZGluZy4uLicsICd0ZXh0LXZpb2xldC02MDAnKTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMudXBsb2FkU2luZ2xlRmlsZShmaWxlLCBpbmRleCwgc2hhcmVUb2tlbiwgY29tcGxldGVkQnl0ZXMsIHRvdGFsQnl0ZXMpO1xuXG4gICAgICAgICAgICAgICAgY29tcGxldGVkQnl0ZXMgKz0gZmlsZS5zaXplO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsZVN0YXR1cyhpbmRleCwgJ1VwbG9hZGVkJywgJ3RleHQtZ3JlZW4tNjAwJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJUYXJnZXQuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzVGV4dFRhcmdldC50ZXh0Q29udGVudCA9ICdVcGxvYWRzIGZpbmlzaGVkLiBGaW5hbGl6aW5nIHNoYXJlLi4uJztcbiAgICAgICAgICAgIHRoaXMuc3RhcnRQb2xsaW5nKHNoYXJlVG9rZW4sIHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1RleHRUYXJnZXQudGV4dENvbnRlbnQgPSAnVXBsb2FkIGZhaWxlZC4nO1xuICAgICAgICAgICAgYWxlcnQoYFVwbG9hZCBmYWlsZWQ6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvblRhcmdldC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5maWxlSW5wdXRUYXJnZXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZHJvcHpvbmVUYXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNyZWF0ZVNoYXJlU2Vzc2lvbigpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FkbWluL2RpcmVjdC1zaGFyZS9zZXNzaW9uJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZEZpbGVDb3VudDogdGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBjcmVhdGUgc2hhcmUgc2Vzc2lvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfVxuXG4gICAgdXBsb2FkU2luZ2xlRmlsZShmaWxlLCBpbmRleCwgc2hhcmVUb2tlbiwgY29tcGxldGVkQnl0ZXMsIHRvdGFsQnl0ZXMpIHtcbiAgICAgICAgY29uc3QgeyB1cGxvYWRLZXksIG1ldGFkYXRhIH0gPSBjcmVhdGVUdXNVcGxvYWRNZXRhZGF0YShmaWxlLCBzaGFyZVRva2VuLCB0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXBsb2FkID0gbmV3IHR1cy5VcGxvYWQoZmlsZSwge1xuICAgICAgICAgICAgICAgIGVuZHBvaW50OiAnL2FkbWluL2RpcmVjdC1zaGFyZS91cGxvYWQvJyxcbiAgICAgICAgICAgICAgICBjaHVua1NpemU6IDEwMCAqIDEwMjQgKiAxMDI0LFxuICAgICAgICAgICAgICAgIHJldHJ5RGVsYXlzOiBbMCwgMzAwMCwgNTAwMCwgMTAwMDAsIDIwMDAwXSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdVcGxvYWQtS2V5JzogdXBsb2FkS2V5LFxuICAgICAgICAgICAgICAgICAgICAnWC1VUExPQUQtQVVUSCc6IHRoaXMuYXV0aFRva2VuVmFsdWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YSxcbiAgICAgICAgICAgICAgICBvblByb2dyZXNzOiAoYnl0ZXNVcGxvYWRlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdmVyYWxsVXBsb2FkZWQgPSBjb21wbGV0ZWRCeXRlcyArIGJ5dGVzVXBsb2FkZWQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSB0b3RhbEJ5dGVzID4gMCA/IChvdmVyYWxsVXBsb2FkZWQgLyB0b3RhbEJ5dGVzICogMTAwKS50b0ZpeGVkKDIpIDogJzAuMDAnO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlUGVyY2VudGFnZSA9IGZpbGUuc2l6ZSA+IDAgPyAoYnl0ZXNVcGxvYWRlZCAvIGZpbGUuc2l6ZSAqIDEwMCkudG9GaXhlZCgyKSA6ICcwLjAwJztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyVGFyZ2V0LnN0eWxlLndpZHRoID0gYCR7cGVyY2VudGFnZX0lYDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1RleHRUYXJnZXQudGV4dENvbnRlbnQgPSBgVXBsb2FkaW5nIGZpbGUgJHtpbmRleCArIDF9IG9mICR7dGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aH0gKCR7cGVyY2VudGFnZX0lKWA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsZVN0YXR1cyhpbmRleCwgYCR7ZmlsZVBlcmNlbnRhZ2V9JWAsICd0ZXh0LXZpb2xldC02MDAnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogKCkgPT4gcmVzb2x2ZSgpLFxuICAgICAgICAgICAgICAgIG9uRXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbGVTdGF0dXMoaW5kZXgsICdGYWlsZWQnLCAndGV4dC1yZWQtNjAwJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHVwbG9hZC5zdGFydCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydFBvbGxpbmcodG9rZW4sIGV4cGVjdGVkQ291bnQpIHtcbiAgICAgICAgbGV0IHBvbGxDb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IG1heFBvbGxzID0gMzAwO1xuXG4gICAgICAgIHRoaXMucG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBvbGxDb3VudCA+PSBtYXhQb2xscykge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wb2xsaW5nSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmlsZSBwcm9jZXNzaW5nIGlzIHRha2luZyBsb25nZXIgdGhhbiBleHBlY3RlZC4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hZG1pbi9kaXJlY3Qtc2hhcmUvc3RhdHVzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KHRva2VuKX0/ZXhwZWN0ZWQ9JHtleHBlY3RlZENvdW50fWApO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NUZXh0VGFyZ2V0LnRleHRDb250ZW50ID0gYEZpbmFsaXppbmcgc2hhcmUuLi4gJHtkYXRhLnByb2Nlc3NlZENvdW50ID8/IDB9IG9mICR7ZXhwZWN0ZWRDb3VudH0gZmlsZXMgcmVhZHlgO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wb2xsaW5nSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0NvbnRhaW5lclRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXJsSW5wdXRUYXJnZXQudmFsdWUgPSBkYXRhLnVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0Q29udGFpbmVyVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlSW5wdXRUYXJnZXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcHpvbmVUYXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnBvbGxpbmdJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBjaGVja2luZyB0aGUgZmlsZSBzdGF0dXMuXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb2xsQ291bnQrKztcbiAgICAgICAgfSwgMjAwMCk7IC8vIENoZWNrIGV2ZXJ5IDIgc2Vjb25kc1xuICAgIH1cblxuICAgIHJlbmRlclNlbGVjdGVkRmlsZXMoKSB7XG4gICAgICAgIHRoaXMuZmlsZUxpc3RUYXJnZXQuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzLmZvckVhY2goKGZpbGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NOYW1lID0gJ2ZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCByb3VuZGVkLW1kIGJnLWdyYXktNTAgcHgtMyBweS0yJztcbiAgICAgICAgICAgIGl0ZW0uZGF0YXNldC5pbmRleCA9IFN0cmluZyhpbmRleCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBuYW1lLmNsYXNzTmFtZSA9ICd0cnVuY2F0ZSB0ZXh0LXNtIHRleHQtZ3JheS03MDAnO1xuICAgICAgICAgICAgbmFtZS50ZXh0Q29udGVudCA9IGAke2ZpbGUubmFtZX0gKCR7dGhpcy5mb3JtYXRGaWxlU2l6ZShmaWxlLnNpemUpfSlgO1xuXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzdGF0dXMuY2xhc3NOYW1lID0gJ3RleHQteHMgdGV4dC1ncmF5LTUwMCc7XG4gICAgICAgICAgICBzdGF0dXMuZGF0YXNldC5yb2xlID0gJ3N0YXR1cyc7XG4gICAgICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnUGVuZGluZyc7XG5cbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKG5hbWUsIHN0YXR1cyk7XG4gICAgICAgICAgICB0aGlzLmZpbGVMaXN0VGFyZ2V0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVGaWxlU3RhdHVzKGluZGV4LCB0ZXh0LCBjbGFzc05hbWUpIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gdGhpcy5maWxlTGlzdFRhcmdldC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pbmRleD1cIiR7aW5kZXh9XCJdIFtkYXRhLXJvbGU9XCJzdGF0dXNcIl1gKTtcblxuICAgICAgICBpZiAoIXN0YXR1cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdHVzLmNsYXNzTmFtZSA9IGB0ZXh0LXhzICR7Y2xhc3NOYW1lfWA7XG4gICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgfVxuXG4gICAgZm9ybWF0RmlsZVNpemUoYnl0ZXMpIHtcbiAgICAgICAgaWYgKGJ5dGVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJzAgQic7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1bml0cyA9IFsnQicsICdLQicsICdNQicsICdHQicsICdUQiddO1xuICAgICAgICBjb25zdCBleHBvbmVudCA9IE1hdGgubWluKE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coMTAyNCkpLCB1bml0cy5sZW5ndGggLSAxKTtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGJ5dGVzIC8gKDEwMjQgKiogZXhwb25lbnQpO1xuXG4gICAgICAgIHJldHVybiBgJHtzaXplLnRvRml4ZWQoZXhwb25lbnQgPT09IDAgPyAwIDogMil9ICR7dW5pdHNbZXhwb25lbnRdfWA7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJ0Bob3R3aXJlZC9zdGltdWx1cyc7XG5cbi8qKlxuICogQSBzaW1wbGUgZHJvcGRvd24gY29udHJvbGxlciB0aGF0IHRvZ2dsZXMgYSBtZW51J3MgdmlzaWJpbGl0eS5cbiAqIEl0IGFsc28gY2xvc2VzIHRoZSBtZW51IGlmIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbnRyb2xsZXIge1xuICAgIC8vIFRoZSBcIm1lbnVcIiBpcyB0aGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgc2hvd24gb3IgaGlkZGVuLlxuICAgIHN0YXRpYyB0YXJnZXRzID0gW1wibWVudVwiXTtcblxuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aGVuIHRoZSBjb250cm9sbGVyIGlzIGNvbm5lY3RlZCB0byB0aGUgRE9NLlxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIC8vIEJpbmQgdGhlIGB0aGlzLmNsb3NlYCBtZXRob2QgdG8gdGhlIGN1cnJlbnQgaW5zdGFuY2Ugb2YgdGhlIGNvbnRyb2xsZXIuXG4gICAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IHNvIHRoYXQgd2hlbiBgY2xvc2VgIGlzIGNhbGxlZCBmcm9tIHRoZSB3aW5kb3cgZXZlbnQsXG4gICAgICAgIC8vIGB0aGlzYCBjb3JyZWN0bHkgcmVmZXJzIHRvIHRoZSBjb250cm9sbGVyIGluc3RhbmNlLlxuICAgICAgICB0aGlzLmNsb3NlID0gdGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGRyb3Bkb3duIG1lbnUuXG4gICAgICovXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLm1lbnVUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG5cbiAgICAgICAgLy8gSWYgdGhlIG1lbnUgaXMgbm93IHZpc2libGUsIGxpc3RlbiBmb3IgY2xpY2tzIG9uIHRoZSB3aW5kb3cgdG8gY2xvc2UgaXQuXG4gICAgICAgIC8vIElmIGl0J3MgaGlkZGVuLCBzdG9wIGxpc3RlbmluZy5cbiAgICAgICAgaWYgKCF0aGlzLm1lbnVUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgZHJvcGRvd24gbWVudSBpZiB0aGUgY2xpY2sgaXMgb3V0c2lkZSBvZiB0aGUgY29udHJvbGxlcidzIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIGNsb3NlKGV2ZW50KSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjbGljayBoYXBwZW5lZCBpbnNpZGUgdGhlIGRyb3Bkb3duJ3MgcGFyZW50IGVsZW1lbnQuXG4gICAgICAgIC8vIFRoZSBgdGhpcy5lbGVtZW50YCByZWZlcnMgdG8gdGhlIGRpdiB3aXRoIGBkYXRhLWNvbnRyb2xsZXI9XCJkcm9wZG93blwiYC5cbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5tZW51VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnQGhvdHdpcmVkL3N0aW11bHVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgICB0b2dnbGUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuQ29udGFpbmVyID0gcGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvbnN0IGljb24gPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuXG4gICAgICAgIGlmIChjaGlsZHJlbkNvbnRhaW5lciAmJiBjaGlsZHJlbkNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Yi1icmFuZHMnKSkge1xuICAgICAgICAgICAgY2hpbGRyZW5Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICBpY29uLmNsYXNzTGlzdC50b2dnbGUoJ3JvdGF0ZS05MCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJ0Bob3R3aXJlZC9zdGltdWx1cyc7XG5cbi8qKlxuICogVGhpcyBjb250cm9sbGVyIGF1dG9tYXRpY2FsbHkgc3VibWl0cyB0aGUgZm9ybSBpdCBpcyBhdHRhY2hlZCB0b1xuICogd2hlbmV2ZXIgYW4gZWxlbWVudCB3aXRoIGEgZGF0YS1hY3Rpb24gdHJpZ2dlcnMgaXQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgc3VibWl0KCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVxdWVzdFN1Ym1pdCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICdAaG90d2lyZWQvc3RpbXVsdXMnO1xuXG4vKlxuICogVGhpcyBpcyBhbiBleGFtcGxlIFN0aW11bHVzIGNvbnRyb2xsZXIhXG4gKlxuICogQW55IGVsZW1lbnQgd2l0aCBhIGRhdGEtY29udHJvbGxlcj1cImhlbGxvXCIgYXR0cmlidXRlIHdpbGwgY2F1c2VcbiAqIHRoaXMgY29udHJvbGxlciB0byBiZSBleGVjdXRlZC4gVGhlIG5hbWUgXCJoZWxsb1wiIGNvbWVzIGZyb20gdGhlIGZpbGVuYW1lOlxuICogaGVsbG9fY29udHJvbGxlci5qcyAtPiBcImhlbGxvXCJcbiAqXG4gKiBEZWxldGUgdGhpcyBmaWxlIG9yIGFkYXB0IGl0IGZvciB5b3VyIHVzZSFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQudGV4dENvbnRlbnQgPSAnSGVsbG8gU3RpbXVsdXMhIEVkaXQgbWUgaW4gYXNzZXRzL2NvbnRyb2xsZXJzL2hlbGxvX2NvbnRyb2xsZXIuanMnO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICdAaG90d2lyZWQvc3RpbXVsdXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbnRyb2xsZXIge1xuICAgIHN0YXRpYyB0YXJnZXRzID0gW1wiYnJhbmRCdXR0b25cIiwgXCJicmFuZHNDb250YWluZXJcIiwgXCJyZWNlbnRBc3NldHNDb250YWluZXJcIiwgXCJjb2xsZWN0aW9uc0NvbnRhaW5lclwiLCBcImNhdGVnb3JpZXNDb250YWluZXJcIl07XG5cbiAgICBhc3luYyBzZWxlY3RCcmFuZChldmVudCkge1xuICAgICAgICBjb25zdCBjbGlja2VkQnV0dG9uID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgY29uc3QgYnJhbmRJZCA9IGNsaWNrZWRCdXR0b24uZGF0YXNldC5icmFuZElkO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBhY3RpdmUgYnV0dG9uIHN0eWxlc1xuICAgICAgICB0aGlzLmJyYW5kQnV0dG9uVGFyZ2V0cy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYmctdmlvbGV0LTYwMCcsICd0ZXh0LXdoaXRlJyk7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYmctd2hpdGUnLCAndGV4dC1ncmF5LTcwMCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2xpY2tlZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdiZy12aW9sZXQtNjAwJywgJ3RleHQtd2hpdGUnKTtcbiAgICAgICAgY2xpY2tlZEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdiZy13aGl0ZScsICd0ZXh0LWdyYXktNzAwJyk7XG5cbiAgICAgICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgICAgIHRoaXMuYnJhbmRzQ29udGFpbmVyVGFyZ2V0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLnJlY2VudEFzc2V0c0NvbnRhaW5lclRhcmdldC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPkxvYWRpbmcuLi48L3A+JztcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uc0NvbnRhaW5lclRhcmdldC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzQ29udGFpbmVyVGFyZ2V0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIC8vIEZldGNoIGFuZCByZW5kZXIgdGhlIG5ldyBjb250ZW50XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9ob21lL2JyYW5kLWNvbnRlbnQvJHticmFuZElkfWApO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgICAgIHRoaXMuYnJhbmRzQ29udGFpbmVyVGFyZ2V0LmlubmVySFRNTCA9IGRhdGEuYnJhbmRzO1xuICAgICAgICB0aGlzLnJlY2VudEFzc2V0c0NvbnRhaW5lclRhcmdldC5pbm5lckhUTUwgPSBkYXRhLnJlY2VudEFzc2V0cztcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uc0NvbnRhaW5lclRhcmdldC5pbm5lckhUTUwgPSBkYXRhLmNvbGxlY3Rpb25zO1xuICAgICAgICB0aGlzLmNhdGVnb3JpZXNDb250YWluZXJUYXJnZXQuaW5uZXJIVE1MID0gZGF0YS5jYXRlZ29yaWVzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICdAaG90d2lyZWQvc3RpbXVsdXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbnRyb2xsZXIge1xuICAgIHN0YXRpYyB0YXJnZXRzID0gW1wiYnJhbmRDb250YWluZXJcIiwgXCJjYXRlZ29yeUNvbnRhaW5lclwiLCBcImNvbGxlY3Rpb25Db250YWluZXJcIl07XG5cbiAgICBhc3luYyBmaWx0ZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgY2xpY2tlZEJ1dHRvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IGJyYW5kSWQgPSBjbGlja2VkQnV0dG9uLmRhdGFzZXQuYnJhbmRJZDtcblxuICAgICAgICAvLyBWaXN1YWxseSB0b2dnbGUgdGhlIGFjdGl2ZSBzdGF0ZSBvZiB0aGUgYnV0dG9uc1xuICAgICAgICB0aGlzLmJyYW5kQ29udGFpbmVyVGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgICAgIGlmIChidXR0b24gPT09IGNsaWNrZWRCdXR0b24pIHtcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYmctdmlvbGV0LTUwJywgJ3RleHQtdmlvbGV0LTcwMCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYmctdmlvbGV0LTUwJywgJ3RleHQtdmlvbGV0LTcwMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWJyYW5kSWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlDb250YWluZXJUYXJnZXQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25Db250YWluZXJUYXJnZXQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGZXRjaCBib3RoIGNhdGVnb3JpZXMgYW5kIGNvbGxlY3Rpb25zIGluIHBhcmFsbGVsXG4gICAgICAgIGNvbnN0IFtjYXRlZ29yaWVzUmVzcG9uc2UsIGNvbGxlY3Rpb25zUmVzcG9uc2VdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2goYC9maWx0ZXJzL2NhdGVnb3JpZXMtZm9yLWJyYW5kLyR7YnJhbmRJZH1gKSxcbiAgICAgICAgICAgIGZldGNoKGAvZmlsdGVycy9jb2xsZWN0aW9ucy1mb3ItYnJhbmQvJHticmFuZElkfWApXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGNvbnN0IGNhdGVnb3JpZXNEYXRhID0gYXdhaXQgY2F0ZWdvcmllc1Jlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbnNEYXRhID0gYXdhaXQgY29sbGVjdGlvbnNSZXNwb25zZS5qc29uKCk7XG5cbiAgICAgICAgdGhpcy5jYXRlZ29yeUNvbnRhaW5lclRhcmdldC5pbm5lckhUTUwgPSBjYXRlZ29yaWVzRGF0YS5jb250ZW50O1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25Db250YWluZXJUYXJnZXQuaW5uZXJIVE1MID0gY29sbGVjdGlvbnNEYXRhLmNvbnRlbnQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJ0Bob3R3aXJlZC9zdGltdWx1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgc3RhdGljIHRhcmdldHMgPSBbXCJuYW1lRGlzcGxheVwiLCBcIm5hbWVGb3JtXCIsIFwiZXhwaXJhdGlvbkRpc3BsYXlcIiwgXCJleHBpcmF0aW9uRm9ybVwiXTtcblxuICAgIHRvZ2dsZUVkaXQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5uYW1lRGlzcGxheVRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5uYW1lRm9ybVRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5uYW1lRm9ybVRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRXhwaXJhdGlvbkVkaXQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5leHBpcmF0aW9uRGlzcGxheVRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5leHBpcmF0aW9uRm9ybVRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5leHBpcmF0aW9uRm9ybVRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmZvY3VzKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJ0Bob3R3aXJlZC9zdGltdWx1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgc3RhdGljIHRhcmdldHMgPSBbXCJtb2RhbFwiLCBcIndpZHRoSW5wdXRcIiwgXCJoZWlnaHRJbnB1dFwiLCBcInBhZGRpbmdJbnB1dFwiLCBcImV4dGVuc2lvbklucHV0XCIsIFwiY3N2QnV0dG9uQ29udGFpbmVyXCJdO1xuICAgIHN0YXRpYyB2YWx1ZXMgPSB7XG4gICAgICAgIGJhc2VVcmw6IFN0cmluZyxcbiAgICAgICAgc2hhcmVFbmRwb2ludDogU3RyaW5nLFxuICAgIH1cblxuICAgIGdlbmVyYXRlZExpbmtzID0gW107XG4gICAgZ2VuZXJhdGVkVG9rZW4gPSBudWxsO1xuXG4gICAgb3Blbk1vZGFsKCkge1xuICAgICAgICB0aGlzLm1vZGFsVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIGNsb3NlTW9kYWwoKSB7XG4gICAgICAgIHRoaXMubW9kYWxUYXJnZXQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2VuZXJhdGUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlZExpbmtzID0gW107XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy53aWR0aElucHV0VGFyZ2V0LnZhbHVlO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmhlaWdodElucHV0VGFyZ2V0LnZhbHVlO1xuICAgICAgICBjb25zdCBwYWRkaW5nID0gTnVtYmVyKHRoaXMucGFkZGluZ0lucHV0VGFyZ2V0LnZhbHVlIHx8IDApO1xuICAgICAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLmV4dGVuc2lvbklucHV0VGFyZ2V0LnZhbHVlO1xuXG4gICAgICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkge1xuICAgICAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBib3RoIHdpZHRoIGFuZCBoZWlnaHQuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbWFnZUFzc2V0cyA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWltYWdlLWFzc2V0PVwidHJ1ZVwiXScpKTtcblxuICAgICAgICBpZiAoaW1hZ2VBc3NldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhbGVydCgnTm8gY29tcGF0aWJsZSBhc3NldHMgYXJlIGF2YWlsYWJsZSBmb3Igd2ViIGxpbmtzLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNoYXJlZFRva2VuO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzaGFyZWRUb2tlbiA9IGF3YWl0IHRoaXMucmVzb2x2ZVNoYXJlVG9rZW4oaW1hZ2VBc3NldHMpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBhbGVydChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdDb3VsZCBub3QgZ2VuZXJhdGUgd2ViIGxpbmtzLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaW1hZ2VBc3NldHMuZm9yRWFjaChhc3NldEVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBhc3NldElkLCBmaWxlbmFtZSwgc2t1LCBhc3NldE5hbWUgfSA9IGFzc2V0RWxlbWVudC5kYXRhc2V0O1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBhc3NldEVsZW1lbnQuZGF0YXNldC50b2tlbiB8fCBzaGFyZWRUb2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHBlcm1hbGlua0NvbnRhaW5lciA9IGFzc2V0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucGVybWFsaW5rLWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uSW5kZXggPSBmaWxlbmFtZS5sYXN0SW5kZXhPZignLicpO1xuICAgICAgICAgICAgY29uc3QgY2xlYW5GaWxlbmFtZSA9IGV4dGVuc2lvbkluZGV4ID4gMCA/IGZpbGVuYW1lLnN1YnN0cmluZygwLCBleHRlbnNpb25JbmRleCkgOiBmaWxlbmFtZTtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0SWQgPSBgcGVybWFsaW5rLSR7YXNzZXRJZH0tJHt3aWR0aH14JHtoZWlnaHR9LSR7cGFkZGluZ30tJHtleHRlbnNpb259YDtcblxuICAgICAgICAgICAgaWYgKCF0b2tlbiB8fCAhcGVybWFsaW5rQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhc3NldEVsZW1lbnQuZGF0YXNldC50b2tlbiA9IHRva2VuO1xuXG4gICAgICAgICAgICBsZXQgcmVsYXRpdmVVcmwgPSBgL3NoYXJlLyR7dG9rZW59L2ltYWdlLyR7YXNzZXRJZH0vJHt3aWR0aH14JHtoZWlnaHR9L2A7XG4gICAgICAgICAgICBpZiAocGFkZGluZyA+IDApIHtcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCArPSBgJHtwYWRkaW5nfS9gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVsYXRpdmVVcmwgKz0gYCR7Y2xlYW5GaWxlbmFtZX0uJHtleHRlbnNpb259YDtcblxuICAgICAgICAgICAgY29uc3QgZnVsbFVybCA9IHRoaXMuYmFzZVVybFZhbHVlICsgcmVsYXRpdmVVcmw7XG5cbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVkTGlua3MucHVzaCh7XG4gICAgICAgICAgICAgICAgc2t1OiBza3UgfHwgJycsXG4gICAgICAgICAgICAgICAgbmFtZTogYXNzZXROYW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgIHdlYkxpbmtVcmw6IGZ1bGxVcmxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICdyZWxhdGl2ZSBmbGV4IGl0ZW1zLWNlbnRlciBtdC0yJztcblxuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIGlucHV0LmlkID0gaW5wdXRJZDtcbiAgICAgICAgICAgIGlucHV0LnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gZnVsbFVybDtcbiAgICAgICAgICAgIGlucHV0LmNsYXNzTmFtZSA9ICd3LWZ1bGwgYmctZ3JheS0xMDAgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbWQgcC0yIHByLTEwIHRleHQteHMgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwJztcblxuICAgICAgICAgICAgY29uc3QgY29weUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvcHktdG8tY2xpcGJvYXJkJyk7XG4gICAgICAgICAgICBjb3B5QnV0dG9uLnNldEF0dHJpYnV0ZSgnZm9yJywgaW5wdXRJZCk7XG4gICAgICAgICAgICBjb3B5QnV0dG9uLmNsYXNzTmFtZSA9ICdhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBwci0zIGZsZXggaXRlbXMtY2VudGVyJztcblxuICAgICAgICAgICAgY29uc3Qgb3BlbkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBvcGVuTGluay5ocmVmID0gZnVsbFVybDtcbiAgICAgICAgICAgIG9wZW5MaW5rLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgICAgICAgICAgb3BlbkxpbmsucmVsID0gJ25vb3BlbmVyIG5vcmVmZXJyZXInO1xuICAgICAgICAgICAgb3BlbkxpbmsuY2xhc3NOYW1lID0gJ2lubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0zIHB5LTEgYm9yZGVyIGJvcmRlci10cmFuc3BhcmVudCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbWQgdGV4dC13aGl0ZSBiZy1ncmVlbi02MDAgaG92ZXI6YmctZ3JlZW4tNzAwIG10LTInO1xuICAgICAgICAgICAgb3BlbkxpbmsudGV4dENvbnRlbnQgPSAnT3BlbiBXZWIgTGluayc7XG5cbiAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kKGlucHV0LCBjb3B5QnV0dG9uKTtcbiAgICAgICAgICAgIHBlcm1hbGlua0NvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4od3JhcHBlciwgb3BlbkxpbmspO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5nZW5lcmF0ZWRMaW5rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmNzdkJ1dHRvbkNvbnRhaW5lclRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYWxlcnQoJ05vIGNvbXBhdGlibGUgYXNzZXRzIGFyZSBhdmFpbGFibGUgZm9yIHdlYiBsaW5rcy4nKTtcbiAgICB9XG5cbiAgICBkb3dubG9hZENzdigpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdGVkTGlua3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhbGVydCgnUGxlYXNlIGdlbmVyYXRlIGxpbmtzIGZpcnN0LicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNzdkNvbnRlbnQgPSBcImRhdGE6dGV4dC9jc3Y7Y2hhcnNldD11dGYtOCxcIjtcbiAgICAgICAgLy8gQWRkIGhlYWRlcnNcbiAgICAgICAgY3N2Q29udGVudCArPSBcInNrdSxuYW1lLHdlYkxpbmtVcmxcXHJcXG5cIjtcblxuICAgICAgICAvLyBBZGQgcm93c1xuICAgICAgICB0aGlzLmdlbmVyYXRlZExpbmtzLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNrdSA9IGBcIiR7cm93LnNrdS5yZXBsYWNlKC9cIi9nLCAnXCJcIicpfVwiYDtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgXCIke3Jvdy5uYW1lLnJlcGxhY2UoL1wiL2csICdcIlwiJyl9XCJgO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gYFwiJHtyb3cud2ViTGlua1VybC5yZXBsYWNlKC9cIi9nLCAnXCJcIicpfVwiYDtcbiAgICAgICAgICAgIGNzdkNvbnRlbnQgKz0gW3NrdSwgbmFtZSwgdXJsXS5qb2luKFwiLFwiKSArIFwiXFxyXFxuXCI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGVuY29kZWRVcmkpO1xuICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsIFwid2VibGlua3MuY3N2XCIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuXG4gICAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICB9XG5cbiAgICBhc3luYyByZXNvbHZlU2hhcmVUb2tlbihpbWFnZUFzc2V0cykge1xuICAgICAgICBjb25zdCBleGlzdGluZ1Rva2VuID0gaW1hZ2VBc3NldHMuZmluZChhc3NldEVsZW1lbnQgPT4gYXNzZXRFbGVtZW50LmRhdGFzZXQudG9rZW4pPy5kYXRhc2V0LnRva2VuO1xuXG4gICAgICAgIGlmIChleGlzdGluZ1Rva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdUb2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdlbmVyYXRlZFRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZWRUb2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5oYXNTaGFyZUVuZHBvaW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGRldGVybWluZSBhIHNoYXJlIHRva2VuIGZvciB0aGVzZSBhc3NldHMuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMuc2hhcmVFbmRwb2ludFZhbHVlLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBuZXcgRm9ybURhdGEoKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5vayB8fCAhZGF0YS50b2tlbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEuZXJyb3IgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgYSBzaGFyZSBsaW5rIGZvciB0aGVzZSBhc3NldHMuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdlbmVyYXRlZFRva2VuID0gZGF0YS50b2tlbjtcblxuICAgICAgICBpbWFnZUFzc2V0cy5mb3JFYWNoKGFzc2V0RWxlbWVudCA9PiB7XG4gICAgICAgICAgICBhc3NldEVsZW1lbnQuZGF0YXNldC50b2tlbiA9IHRoaXMuZ2VuZXJhdGVkVG9rZW47XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlZFRva2VuO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tIFwiQGhvdHdpcmVkL3N0aW11bHVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgc3RhdGljIHRhcmdldHMgPSBbXCJkaWFsb2dcIiwgXCJjb250ZW50XCJdO1xuXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgc3VwZXIuY29ubmVjdCgpO1xuICAgICAgICB0aGlzLmRpYWxvZ1RhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMub25EaWFsb2dDbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBzdXBlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgYXN5bmMgb3BlbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHVybCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuaHJlZjtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIFVSTCBwcm92aWRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgICAgICBjb25zdCBodG1sID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICB0aGlzLmNvbnRlbnRUYXJnZXQuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICB0aGlzLmRpYWxvZ1RhcmdldC5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dUYXJnZXQuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBvbkRpYWxvZ0Nsb3NlKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRUYXJnZXQuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCJAaG90d2lyZWQvc3RpbXVsdXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgICBzdGF0aWMgdGFyZ2V0cyA9IFtcImFkZFRvQmFnRm9ybVwiXTtcblxuICAgIGFzeW5jIHN1Ym1pdEZvcm0oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZXZlbnQuY3VycmVudFRhcmdldC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25zdCBoZWFkZXJEb3dubG9hZEJhZ0xpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlci1kb3dubG9hZC1iYWctbGlua1wiKTtcblxuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShldmVudC5jdXJyZW50VGFyZ2V0KVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZXZlbnQuY3VycmVudFRhcmdldC5hY3Rpb24sIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBib2R5OiBmb3JtRGF0YVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgbGV0IGhlYWRlckRvd25sb2FkQmFnQ291bnRlciA9IGhlYWRlckRvd25sb2FkQmFnTGluay5xdWVyeVNlbGVjdG9yKCdzcGFuJylcbiAgICAgICAgICAgIGlmIChoZWFkZXJEb3dubG9hZEJhZ0NvdW50ZXIgIT09IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaGVhZGVyRG93bmxvYWRCYWdDb3VudGVyID0gaGVhZGVyRG93bmxvYWRCYWdMaW5rLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJEb3dubG9hZEJhZ0NvdW50ZXIuaW5uZXJUZXh0ID0gcmVzcG9uc2VEYXRhLmRvd25sb2FkQ291bnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhlYWRlckRvd25sb2FkQmFnQ291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJEb3dubG9hZEJhZ0NvdW50ZXIuY2xhc3NMaXN0LmFkZCgnYWJzb2x1dGUnLCAnLXRvcC0yJywgJy1yaWdodC00JywgJ2lubGluZS1mbGV4JywgJ2l0ZW1zLWNlbnRlcicsICdqdXN0aWZ5LWNlbnRlcicsICdweC0yJywgJ3B5LTEnLCAndGV4dC14cycsICdmb250LWJvbGQnLCAnbGVhZGluZy1ub25lJywgJ3RleHQtcmVkLTEwMCcsICdiZy1yZWQtNjAwJywgJ3JvdW5kZWQtZnVsbCcpO1xuICAgICAgICAgICAgICAgIGhlYWRlckRvd25sb2FkQmFnQ291bnRlci5pbm5lclRleHQgPSByZXNwb25zZURhdGEuZG93bmxvYWRDb3VudDtcbiAgICAgICAgICAgICAgICBoZWFkZXJEb3dubG9hZEJhZ0xpbmsuYXBwZW5kQ2hpbGQoaGVhZGVyRG93bmxvYWRCYWdDb3VudGVyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkQnV0dG9uLmlubmVySFRNTCA9IGA8c3ZnIGZpbGw9XCIjMDAwMDAwXCIgY2xhc3M9XCJoLTYgdy02XCIgdmlld0JveD1cIjAgMCAxOTIwIDE5MjBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xODI3LjcwMSAzMDMuMDY1IDY5OC44MzUgMTQzMS44MDEgOTIuMjk5IDgyNS4yNjYgMCA5MTcuNTY0IDY5OC44MzUgMTYxNi40IDE5MTkuODY5IDM5NS4yMzR6XCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiLz5cbiAgICAgICAgICAgIDwvc3ZnPmBcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICdAaG90d2lyZWQvc3RpbXVsdXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbnRyb2xsZXIge1xuICAgIHN0YXRpYyB0YXJnZXRzID0gW1wiaW5wdXRcIiwgXCJpdGVtXCJdO1xuXG4gICAgZmlsdGVyKCkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuaW5wdXRUYXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5pdGVtVGFyZ2V0cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJykudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChsYWJlbC5pbmNsdWRlcyhxdWVyeSkpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnQGhvdHdpcmVkL3N0aW11bHVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgICBzdGF0aWMgdGFyZ2V0cyA9IFtcIm1vZGFsXCIsIFwidXJsSW5wdXRcIiwgXCJuYW1lSW5wdXRcIiwgXCJnZW5lcmF0ZUZvcm1cIiwgXCJjb25maXJtYXRpb25cIl07XG4gICAgY29weUZlZWRiYWNrVGltZW91dCA9IG51bGw7XG5cbiAgICBhc3luYyBnZW5lcmF0ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBjb25zdCBidXR0b24gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICAvLyBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAvLyBidXR0b24udGV4dENvbnRlbnQgPSAnR2VuZXJhdGluZy4uLic7XG5cbiAgICAgICAgY29uc3QgZm9ybSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuY2xvc2VzdCgnZm9ybScpXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbGlzdE5hbWUnLCB0aGlzLm5hbWVJbnB1dFRhcmdldC52YWx1ZSlcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2Rvd25sb2FkLWxpc3Qvc2hhcmUnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cmxJbnB1dFRhcmdldC52YWx1ZSA9IGRhdGEudXJsO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGb3JtVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3IgfHwgJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIGFsZXJ0KCdDb3VsZCBub3QgY29ubmVjdCB0byB0aGUgc2VydmVyLicpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgLy8gYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBidXR0b24udGV4dENvbnRlbnQgPSAnR2VuZXJhdGUgU2hhcmUgTGluayc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuU2hhcmVNb2RhbChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLm1vZGFsVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgfVxuXG4gICAgY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5uYW1lSW5wdXRUYXJnZXQudmFsdWUgPSBcIlwiXG4gICAgICAgIHRoaXMubW9kYWxUYXJnZXQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVGb3JtVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLmNvbmZpcm1hdGlvblRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvcHlGZWVkYmFja1RpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNvcHlGZWVkYmFja1RpbWVvdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY29weVRvQ2xpcGJvYXJkKCkge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodFVybElucHV0KCk7XG5cbiAgICAgICAgaWYgKG5hdmlnYXRvci5jbGlwYm9hcmQ/LndyaXRlVGV4dCkge1xuICAgICAgICAgICAgYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGhpcy51cmxJbnB1dFRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgIH1cblxuICAgIGhpZ2hsaWdodFVybElucHV0KCkge1xuICAgICAgICB0aGlzLnVybElucHV0VGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy51cmxJbnB1dFRhcmdldC5zZWxlY3QoKTtcbiAgICAgICAgdGhpcy51cmxJbnB1dFRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0aGlzLnVybElucHV0VGFyZ2V0LnZhbHVlLmxlbmd0aCk7XG4gICAgICAgIHRoaXMudXJsSW5wdXRUYXJnZXQuY2xhc3NMaXN0LmFkZCgncmluZy0yJywgJ3JpbmctdmlvbGV0LTMwMCcsICdiZy12aW9sZXQtNTAnKTtcblxuICAgICAgICBpZiAodGhpcy5jb3B5RmVlZGJhY2tUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jb3B5RmVlZGJhY2tUaW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29weUZlZWRiYWNrVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cmxJbnB1dFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdyaW5nLTInLCAncmluZy12aW9sZXQtMzAwJywgJ2JnLXZpb2xldC01MCcpO1xuICAgICAgICB9LCAxMjAwKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnQGhvdHdpcmVkL3N0aW11bHVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgICBzdGF0aWMgdGFyZ2V0cyA9IFtcImlucHV0XCIsIFwiY29udGFpbmVyXCJdO1xuXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlucHV0VGFyZ2V0LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlclRhZ3MoKTtcbiAgICB9XG5cbiAgICByZW5kZXJUYWdzKCkge1xuICAgICAgICAvLyBDbGVhciBleGlzdGluZyB0YWdzIGV4Y2VwdCBmb3IgdGhlIGlucHV0IGl0c2VsZlxuICAgICAgICB0aGlzLmNvbnRhaW5lclRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKCcudGFnLWl0ZW0nKS5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcblxuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmlucHV0VGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAuc3BsaXQoJywnKVxuICAgICAgICAgICAgLm1hcCh2ID0+IHYudHJpbSgpKVxuICAgICAgICAgICAgLmZpbHRlcih2ID0+IHYgIT09ICcnKTtcblxuICAgICAgICB2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lclRhcmdldC5pbnNlcnRCZWZvcmUodGhpcy5jcmVhdGVUYWdFbGVtZW50KHZhbHVlKSwgdGhpcy5pbnB1dFRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVRhZ0VsZW1lbnQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICB0YWcuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0YWctaXRlbSBmbGV4IGl0ZW1zLWNlbnRlciBiZy12aW9sZXQtMTAwIHRleHQtdmlvbGV0LTgwMCB0ZXh0LXNtIGZvbnQtbWVkaXVtIG1yLTIgbWItMiBweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCcpO1xuICAgICAgICB0YWcudGV4dENvbnRlbnQgPSB2YWx1ZTtcblxuICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgcmVtb3ZlQnRuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWwtMiB0ZXh0LXZpb2xldC02MDAgaG92ZXI6dGV4dC12aW9sZXQtODAwJyk7XG4gICAgICAgIHJlbW92ZUJ0bi5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XG4gICAgICAgIHJlbW92ZUJ0bi50eXBlID0gJ2J1dHRvbic7IC8vIFByZXZlbnQgZm9ybSBzdWJtaXNzaW9uXG4gICAgICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnJlbW92ZVRhZyhlKSk7XG5cbiAgICAgICAgdGFnLmFwcGVuZENoaWxkKHJlbW92ZUJ0bik7XG4gICAgICAgIHJldHVybiB0YWc7XG4gICAgfVxuXG4gICAgcmVtb3ZlVGFnKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhZ1RleHQgPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuZmlyc3RDaGlsZC50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZXMgPSB0aGlzLmlucHV0VGFyZ2V0LnZhbHVlLnNwbGl0KCcsJykubWFwKHYgPT4gdi50cmltKCkpO1xuICAgICAgICBjb25zdCBuZXdWYWx1ZXMgPSBjdXJyZW50VmFsdWVzLmZpbHRlcih2ID0+IHYgIT09IHRhZ1RleHQpO1xuXG4gICAgICAgIHRoaXMuaW5wdXRUYXJnZXQudmFsdWUgPSBuZXdWYWx1ZXMuam9pbignLCAnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUYWdzKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJywnIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGFncygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJ0Bob3R3aXJlZC9zdGltdWx1cyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsaWVudC1zaWRlIHByZXZpZXcgb2YgYW4gaW1hZ2Ugc2VsZWN0ZWQgaW4gYSBmaWxlIGlucHV0LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbnRyb2xsZXIge1xuICAgIC8vIERlZmluZSB0aGUgZWxlbWVudHMgdGhpcyBjb250cm9sbGVyIHdpbGwgaW50ZXJhY3Qgd2l0aFxuICAgIHN0YXRpYyB0YXJnZXRzID0gW1wiaW5wdXRcIiwgXCJwcmV2aWV3XCJdO1xuXG4gICAgLy8gVGhpcyBhY3Rpb24gaXMgY2FsbGVkIHdoZW4gdGhlIGZpbGUgaW5wdXQgY2hhbmdlc1xuICAgIHVwZGF0ZVByZXZpZXcoKSB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLmlucHV0VGFyZ2V0LmZpbGVzWzBdO1xuXG4gICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSB0ZW1wb3JhcnkgVVJMIGZvciB0aGUgc2VsZWN0ZWQgZmlsZVxuICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlICdzcmMnIG9mIHRoZSA8aW1nPiB0YXJnZXQgdG8gdGhlIHRlbXBvcmFyeSBVUkxcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdUYXJnZXQuc3JjID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICdAaG90d2lyZWQvc3RpbXVsdXMnO1xuaW1wb3J0ICogYXMgdHVzIGZyb20gJ3R1cy1qcy1jbGllbnQnO1xuaW1wb3J0IHsgY3JlYXRlVHVzVXBsb2FkTWV0YWRhdGEgfSBmcm9tICcuL3VwbG9hZF9tZXRhZGF0YSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gICAgLy8gV2UnbGwgdXNlIGEgc3BlY2lmaWMgY29udGFpbmVyIGZvciB0aGUgcHJvZ3Jlc3MgZWxlbWVudHNcbiAgICBzdGF0aWMgdGFyZ2V0cyA9IFtcbiAgICAgICAgXCJmaWxlSW5wdXRcIixcbiAgICAgICAgXCJwcm9ncmVzc0NvbnRhaW5lclwiLCAvLyBUaGUgcGFyZW50IGRpdiBmb3IgdGhlIHByb2dyZXNzIGJhclxuICAgICAgICBcInByb2dyZXNzQmFyXCIsICAgICAgIC8vIFRoZSB2aXN1YWwgYmFyIGl0c2VsZlxuICAgICAgICBcInByb2dyZXNzVGV4dFwiLCAgICAgIC8vIFRoZSB0ZXh0IGVsZW1lbnQgZm9yIHRoZSBwZXJjZW50YWdlXG4gICAgICAgIFwic3VibWl0QnV0dG9uXCIsXG4gICAgICAgIFwiZXJyb3JNZXNzYWdlXCIsXG4gICAgICAgIFwiZHJvcHpvbmVcIixcbiAgICAgICAgXCJmaWxlTmFtZURpc3BsYXlcIlxuICAgIF07XG5cbiAgICBzdGF0aWMgdmFsdWVzID0ge1xuICAgICAgICBhc3NldElkOiBOdW1iZXIsXG4gICAgICAgIGF1dGhUb2tlbjogU3RyaW5nLFxuICAgIH07XG5cbiAgICBwb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xuXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5kcm9wem9uZVRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuZmlsZUlucHV0VGFyZ2V0LmNsaWNrKCkpO1xuICAgIH1cblxuICAgIGRyYWdvdmVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZHJvcHpvbmVUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYm9yZGVyLXZpb2xldC01MDAnLCAnYmctZ3JheS01MCcpO1xuICAgIH1cblxuICAgIGRyYWdsZWF2ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmRyb3B6b25lVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2JvcmRlci12aW9sZXQtNTAwJywgJ2JnLWdyYXktNTAnKTtcbiAgICB9XG5cbiAgICBkcm9wKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZmlsZUlucHV0VGFyZ2V0LmZpbGVzID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgICAgICB0aGlzLmRyYWdsZWF2ZShldmVudCk7XG4gICAgICAgIHRoaXMuZmlsZUlucHV0VGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XG4gICAgfVxuXG4gICAgZmlsZVNlbGVjdGVkKCkge1xuICAgICAgICBpZiAodGhpcy5maWxlSW5wdXRUYXJnZXQuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuZmlsZUlucHV0VGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICAgICAgdGhpcy5maWxlTmFtZURpc3BsYXlUYXJnZXQudGV4dENvbnRlbnQgPSBgJHtmaWxlLm5hbWV9ICgkeyhmaWxlLnNpemUgLyAxMDI0IC8gMTAyNCkudG9GaXhlZCgyKX0gTUIpYDtcbiAgICAgICAgICAgIHRoaXMuc3VibWl0QnV0dG9uVGFyZ2V0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmhpZGVFcnJvcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWxlTmFtZURpc3BsYXlUYXJnZXQudGV4dENvbnRlbnQgPSAnTm8gZmlsZSBzZWxlY3RlZCc7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvblRhcmdldC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGxvYWQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5maWxlSW5wdXRUYXJnZXQuZmlsZXNbMF07XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoXCJQbGVhc2Ugc2VsZWN0IGEgZmlsZSBmaXJzdC5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHVwbG9hZEtleSwgbWV0YWRhdGEgfSA9IGNyZWF0ZVR1c1VwbG9hZE1ldGFkYXRhKGZpbGUpO1xuXG4gICAgICAgIHRoaXMuaGlkZUVycm9yKCk7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uVGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5maWxlSW5wdXRUYXJnZXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyb3B6b25lVGFyZ2V0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgLy8gTWFrZSB0aGUgcHJvZ3Jlc3MgY29udGFpbmVyIHZpc2libGUgQkVGT1JFIHRyeWluZyB0byBhY2Nlc3MgaXRzIGNoaWxkcmVuXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDb250YWluZXJUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJUYXJnZXQuc3R5bGUud2lkdGggPSAnMCUnO1xuICAgICAgICB0aGlzLnByb2dyZXNzVGV4dFRhcmdldC50ZXh0Q29udGVudCA9ICcwJSc7XG5cbiAgICAgICAgbGV0IGFzc2V0SWQgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5hc3NldElkVmFsdWVcbiAgICAgICAgICAgID8gYC9hZG1pbi9hc3NldHMvJHt0aGlzLmFzc2V0SWRWYWx1ZX0vdXBsb2FkL2BcbiAgICAgICAgICAgIDogYC9hZG1pbi9hc3NldHMvdXBsb2FkL2A7XG5cbiAgICAgICAgY29uc3QgdXBsb2FkID0gbmV3IHR1cy5VcGxvYWQoZmlsZSwge1xuICAgICAgICAgICAgZW5kcG9pbnQ6IGVuZHBvaW50LFxuICAgICAgICAgICAgY2h1bmtTaXplOiAxMDAqMTAyNCoxMDI0LCAvLyAxMDAgTUJcbiAgICAgICAgICAgIHJldHJ5RGVsYXlzOiBbMCwgMzAwMCwgNTAwMCwgMTAwMDAsIDIwMDAwXSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnVXBsb2FkLUtleSc6IHVwbG9hZEtleSxcbiAgICAgICAgICAgICAgICAnWC1VUExPQUQtQVVUSCc6IHRoaXMuYXV0aFRva2VuVmFsdWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgICAgICBvbkFmdGVyUmVzcG9uc2U6IChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gcmVzLmdldEhlYWRlcignWC1Bc3NldC1JZCcpO1xuICAgICAgICAgICAgICAgIGlmIChpZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2V0SWQgPSBpZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvcihgVXBsb2FkIGZhaWxlZDogJHtlcnJvcn1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvblRhcmdldC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZUlucHV0VGFyZ2V0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wem9uZVRhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3M6IChieXRlc1VwbG9hZGVkLCBieXRlc1RvdGFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChieXRlc1VwbG9hZGVkIC8gYnl0ZXNUb3RhbCAqIDEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyVGFyZ2V0LnN0eWxlLndpZHRoID0gYCR7cGVyY2VudGFnZX0lYDtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzVGV4dFRhcmdldC50ZXh0Q29udGVudCA9IGAke3BlcmNlbnRhZ2V9JWA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXNzZXRJZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NUZXh0VGFyZ2V0LnRleHRDb250ZW50ID0gXCJVcGxvYWQgY29tcGxldGUhIFJlZnJlc2hpbmcuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCksIDE1MDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NUZXh0VGFyZ2V0LnRleHRDb250ZW50ID0gXCJVcGxvYWQgY29tcGxldGUhIFByb2Nlc3NpbmcuLi5cIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkS2V5ID0gdXBsb2FkLnVybC5zcGxpdCgnLycpLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9sbGluZyh1cGxvYWRLZXkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB1cGxvYWQuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBzdGFydFBvbGxpbmcgKHVwbG9hZEtleSlcbiAgICB7XG4gICAgICAgIGxldCBwb2xsQ291bnQgPSAwO1xuICAgICAgICBjb25zdCBtYXhQb2xscyA9IDEwICogNjA7IC8vIHN0b3AgYWZ0ZXIgMTAgbWludXRlc1xuXG4gICAgICAgIHRoaXMucG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBvbGxDb3VudCA+PSBtYXhQb2xscylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMucG9sbGluZ0ludGVydmFsKVxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKFwiRmlsZSBwcm9jZXNzaW5nIGlzIHRha2luZyB0b28gbG9uZy5cIilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FkbWluL3VwbG9hZC9zdGF0dXMvJHt1cGxvYWRLZXl9YCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzKVxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2NvbXBsZXRlJylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnBvbGxpbmdJbnRlcnZhbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NUZXh0VGFyZ2V0LnRleHRDb250ZW50ID0gXCJQcm9jZXNzaW5nIGNvbXBsZXRlISBSZWRpcmVjdGluZy4uLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRhdGEuZWRpdFVybDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMucG9sbGluZ0ludGVydmFsKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvcihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGNoZWNraW5nIHRoZSBmaWxlIHN0YXR1cy5cIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9sbENvdW50Kys7XG4gICAgICAgIH0sIDJfMDAwKVxuXG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2VUYXJnZXQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZVRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBoaWRlRXJyb3IoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlVGFyZ2V0LnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlVGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH1cbn1cbiIsIi8vIHNyYy90dXJib19jb250cm9sbGVyLnRzXG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIkBob3R3aXJlZC9zdGltdWx1c1wiO1xuaW1wb3J0IFwiQGhvdHdpcmVkL3R1cmJvXCI7XG52YXIgdHVyYm9fY29udHJvbGxlcl9kZWZhdWx0ID0gY2xhc3MgZXh0ZW5kcyBDb250cm9sbGVyIHtcbn07XG5leHBvcnQge1xuICB0dXJib19jb250cm9sbGVyX2RlZmF1bHQgYXMgZGVmYXVsdFxufTtcbiJdLCJuYW1lcyI6WyJzdGFydFN0aW11bHVzQXBwIiwiYXBwIiwicmVxdWlyZSIsImNvbnRleHQiLCJlIiwidCIsInIiLCJTeW1ib2wiLCJuIiwiaXRlcmF0b3IiLCJvIiwidG9TdHJpbmdUYWciLCJpIiwiYyIsInByb3RvdHlwZSIsIkdlbmVyYXRvciIsInUiLCJPYmplY3QiLCJjcmVhdGUiLCJfcmVnZW5lcmF0b3JEZWZpbmUyIiwiZiIsInAiLCJ5IiwiRyIsInYiLCJhIiwiZCIsImJpbmQiLCJsZW5ndGgiLCJsIiwiVHlwZUVycm9yIiwiY2FsbCIsImRvbmUiLCJ2YWx1ZSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGlzcGxheU5hbWUiLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwiX3RvUHJvcGVydHlLZXkiLCJrZXkiLCJfY3JlYXRlQ2xhc3MiLCJfY2FsbFN1cGVyIiwiX2dldFByb3RvdHlwZU9mIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0IiwiUmVmbGVjdCIsImNvbnN0cnVjdCIsImNvbnN0cnVjdG9yIiwiX3R5cGVvZiIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJSZWZlcmVuY2VFcnJvciIsIl9pbmhlcml0cyIsIl9zZXRQcm90b3R5cGVPZiIsIl93cmFwTmF0aXZlU3VwZXIiLCJNYXAiLCJfaXNOYXRpdmVGdW5jdGlvbiIsImhhcyIsImdldCIsInNldCIsIldyYXBwZXIiLCJfY29uc3RydWN0IiwicHVzaCIsIkJvb2xlYW4iLCJ2YWx1ZU9mIiwiRnVuY3Rpb24iLCJ0b1N0cmluZyIsImluZGV4T2YiLCJfZGVmaW5lUHJvcGVydHkiLCJfdG9QcmltaXRpdmUiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsIkRFRkFVTFRfQlVUVE9OX0xBQkVMIiwiQ09QSUVEX0JVVFRPTl9MQUJFTCIsIkZFRURCQUNLX0RVUkFUSU9OX01TIiwiQ29weVRvQ2xpcGJvYXJkIiwiX0hUTUxFbGVtZW50IiwiX3RoaXMiLCJfbGVuIiwiYXJncyIsIkFycmF5IiwiX2tleSIsImNvbmNhdCIsIl9yZWYiLCJfY2FsbGVlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ0ZXh0IiwiX25hdmlnYXRvciRjbGlwYm9hcmQiLCJfdCIsIl9jb250ZXh0IiwicHJldmVudERlZmF1bHQiLCJyZXNvbHZlVGFyZ2V0IiwicmVzb2x2ZVRleHQiLCJoaWdobGlnaHRUYXJnZXQiLCJuYXZpZ2F0b3IiLCJjbGlwYm9hcmQiLCJ3cml0ZVRleHQiLCJmYWxsYmFja0NvcHkiLCJzaG93Q29waWVkRmVlZGJhY2siLCJfeCIsImNvbm5lY3RlZENhbGxiYWNrIiwiX3RoaXMkYnV0dG9uIiwiZW5zdXJlQnV0dG9uIiwiYnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsaWNrIiwiZGlzY29ubmVjdGVkQ2FsbGJhY2siLCJfdGhpcyRidXR0b24yIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImZlZWRiYWNrVGltZW91dCIsImNsZWFyVGltZW91dCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJfdGhpcyRwYXJlbnRFbGVtZW50JHEiLCJfdGhpcyRwYXJlbnRFbGVtZW50IiwidGFyZ2V0SWQiLCJnZXRBdHRyaWJ1dGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidGFyZ2V0U2VsZWN0b3IiLCJfdGhpcyRjbG9zZXN0JHF1ZXJ5U2UiLCJfdGhpcyRjbG9zZXN0IiwiY2xvc2VzdCIsInByZXZpb3VzRWxlbWVudCIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJIVE1MSW5wdXRFbGVtZW50IiwiSFRNTFRleHRBcmVhRWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJfcmVmMiIsIl90YXJnZXQkZ2V0QXR0cmlidXRlIiwiX3RhcmdldCR0ZXh0Q29udGVudCIsInRleHRDb250ZW50IiwidHJpbSIsIl90aGlzMiIsImZvY3VzIiwicHJldmVudFNjcm9sbCIsInNlbGVjdCIsInNldFNlbGVjdGlvblJhbmdlIiwic2VsZWN0aW9uIiwid2luZG93IiwiZ2V0U2VsZWN0aW9uIiwicmFuZ2UiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGVDb250ZW50cyIsInJlbW92ZUFsbFJhbmdlcyIsImFkZFJhbmdlIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0VGltZW91dCIsInJlbW92ZSIsInJlc2V0QnV0dG9uRmVlZGJhY2siLCJzZXRBdHRyaWJ1dGUiLCJleGVjQ29tbWFuZCIsInRleHRhcmVhIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwiSFRNTEVsZW1lbnQiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsImdlbmVyYXRlVXBsb2FkS2V5IiwiX2dsb2JhbFRoaXMkY3J5cHRvIiwiZ2xvYmFsVGhpcyIsImNyeXB0byIsInJhbmRvbVVVSUQiLCJEYXRlIiwibm93IiwiTWF0aCIsInJhbmRvbSIsInNsaWNlIiwiZ2V0U2FmZUV4dGVuc2lvbiIsImZpbGVuYW1lIiwibWF0Y2giLCJ0b0xvd2VyQ2FzZSIsImNyZWF0ZVR1c1VwbG9hZE1ldGFkYXRhIiwiZmlsZSIsInNoYXJlVG9rZW4iLCJ1bmRlZmluZWQiLCJleHBlY3RlZEZpbGVDb3VudCIsInVwbG9hZEtleSIsIm1ldGFkYXRhIiwibmFtZSIsIm9yaWdpbmFsX2ZpbGVuYW1lIiwiZmlsZXR5cGUiLCJ0eXBlIiwic2hhcmVfdG9rZW4iLCJzaGFyZV9leHBlY3RlZF9jb3VudCIsIkNvbnRyb2xsZXIiLCJfZGVmYXVsdCIsIl9Db250cm9sbGVyIiwidG9nZ2xlIiwiY29udGVudFRhcmdldCIsImljb25UYXJnZXQiLCJkZWZhdWx0IiwiYWRkQWxsIiwiYXNzZXRFbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhc3NldElkcyIsImZyb20iLCJtYXAiLCJlbCIsImRhdGFzZXQiLCJhc3NldElkIiwiaWRzSW5wdXRUYXJnZXQiLCJqb2luIiwiYWxlcnQiLCJvd25LZXlzIiwia2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImZpbHRlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIl9vYmplY3RTcHJlYWQiLCJmb3JFYWNoIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJpbnRlcmFjdCIsInY0IiwidXVpZHY0IiwiY29ubmVjdCIsImJvYXJkSXRlbXMiLCJhY3RpdmVUb29sIiwicGFuIiwieCIsInpvb20iLCJpc1Bhbm5pbmciLCJwYW5TdGFydCIsImlzU2F2aW5nIiwic2VsZWN0ZWRJdGVtSWQiLCJ6Q291bnRlciIsImlzRHJhd2luZ0xpbmUiLCJsaW5lU3RhcnRQb2ludCIsInRlbXBMaW5lIiwiYm91bmRIYW5kbGVLZXlEb3duIiwiaGFuZGxlS2V5RG93biIsImJvdW5kSGFuZGxlS2V5VXAiLCJoYW5kbGVLZXlVcCIsInZpZXdwb3J0VGFyZ2V0IiwiaGFuZGxlTW91c2VEb3duIiwiaGFuZGxlTW91c2VNb3ZlIiwiaGFuZGxlTW91c2VVcCIsImFzc2V0U2VhcmNoVGFyZ2V0Iiwic2VhcmNoQXNzZXRzIiwic2F2ZUJ0blRhcmdldCIsInNhdmVCb2FyZFN0YXRlIiwiaW5pdEFzc2V0UGFuZWxBbmREcm9wem9uZSIsImxvYWRCb2FyZFN0YXRlIiwiYXV0b1NhdmVJbnRlcnZhbCIsInNldEludGVydmFsIiwiZGlzY29ubmVjdCIsImNsZWFySW50ZXJ2YWwiLCJzZWxlY3RJdGVtIiwiZWxlbWVudCIsImRlc2VsZWN0QWxsIiwiaXRlbUlkIiwiY29udGV4dFRvb2xiYXJUYXJnZXQiLCJjb250YWlucyIsInRleHRDb250ZXh0VG9vbGJhclRhcmdldCIsInVwZGF0ZVRleHRUb29sYmFyU3RhdGUiLCJwcmV2aW91c2x5U2VsZWN0ZWQiLCJkZWxldGVTZWxlY3RlZEl0ZW0iLCJpdGVtRWxlbWVudCIsImFjdGl2YXRlVG9vbCIsImN1cnJlbnRUYXJnZXQiLCJ0b29sIiwic3R5bGUiLCJjdXJzb3IiLCJhY3RpdmVFbGVtZW50IiwibWV0YUtleSIsImN0cmxLZXkiLCJ6b29tSW4iLCJ6b29tT3V0IiwiY29kZSIsImlzTGluZVRvb2wiLCJnZXRDYW52YXNDb29yZGluYXRlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiY3JlYXRlRWxlbWVudE5TIiwic3ZnQ2FudmFzVGFyZ2V0IiwiY2FuUGFuIiwiY3VycmVudFBvcyIsInVwZGF0ZUNhbnZhc1RyYW5zZm9ybSIsImVuZFBvaW50IiwiZGlzdGFuY2UiLCJoeXBvdCIsImFkZExpbmVJdGVtVG9Cb2FyZCIsInBvcyIsImFkZFRleHRJdGVtVG9Cb2FyZCIsImFkZEdyb3VwSXRlbVRvQm9hcmQiLCJ2aWV3cG9ydFJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwidG9wIiwiaGFuZGxlWm9vbSIsInNjYWxlQW1vdW50IiwiZGVsdGFZIiwibmV3Wm9vbSIsIm1heCIsIm1pbiIsImN1cnNvclgiLCJjdXJzb3JZIiwidHJhbnNmb3JtIiwiY2FudmFzVGFyZ2V0IiwiaGFzWm9vbVZhbHVlVGFyZ2V0Iiwiem9vbVZhbHVlVGFyZ2V0Iiwicm91bmQiLCJmcmFtZUNvbnRlbnQiLCJzaXplIiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJtaW5YIiwiSW5maW5pdHkiLCJtaW5ZIiwibWF4WCIsIm1heFkiLCJpdGVtIiwid2lkdGgiLCJoZWlnaHQiLCJjb250ZW50V2lkdGgiLCJjb250ZW50SGVpZ2h0IiwicGFkZGluZyIsInhab29tIiwieVpvb20iLCJjb250ZW50Q2VudGVyWCIsImNvbnRlbnRDZW50ZXJZIiwiX2dldFNvcnRlZEl0ZW1zQnlaSW5kZXgiLCJ2YWx1ZXMiLCJzb3J0IiwiYiIsInpJbmRleCIsImJyaW5nVG9Gcm9udCIsInNlbmRUb0JhY2siLCJzb3J0ZWRJdGVtcyIsIm1pbloiLCJicmluZ0ZvcndhcmQiLCJjdXJyZW50SW5kZXgiLCJmaW5kSW5kZXgiLCJpZCIsImN1cnJlbnRJdGVtIiwibmV4dEl0ZW0iLCJzZW5kQmFja3dhcmQiLCJfdGhpczMiLCJwcmV2SXRlbSIsInN0eWxlcyIsImNvbnRlbnQiLCJmb250RmFtaWx5U2VsZWN0VGFyZ2V0IiwiZm9udEZhbWlseSIsImZvbnRTaXplSW5wdXRUYXJnZXQiLCJmb250U2l6ZSIsImNvbG9ySW5wdXRUYXJnZXQiLCJjb2xvciIsImJhY2tncm91bmRDb2xvcklucHV0VGFyZ2V0IiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3JJbnB1dFRhcmdldCIsImJvcmRlckNvbG9yIiwiYm9sZEJ1dHRvblRhcmdldCIsImZvbnRXZWlnaHQiLCJpdGFsaWNCdXR0b25UYXJnZXQiLCJmb250U3R5bGUiLCJjaGFuZ2VUZXh0U3R5bGUiLCJwcm9wZXJ0eSIsInN0eWxlUHJvcGVydHkiLCJzdHlsZVZhbHVlIiwicGFyc2VJbnQiLCJhcHBseVRleHRTdHlsZXMiLCJ0b2dnbGVUZXh0U3R5bGUiLCJhY3RpdmVWYWx1ZSIsImRlZmF1bHRWYWx1ZSIsInRleHRBbGlnbiIsImJvcmRlcldpZHRoIiwiX2FkZEl0ZW1Ub0JvYXJkIiwiaXRlbURhdGEiLCJfdGhpczQiLCJtYWtlTGluZUludGVyYWN0aXZlIiwibWFrZUl0ZW1JbnRlcmFjdGl2ZSIsInN0b3BQcm9wYWdhdGlvbiIsImFkZEFzc2V0VG9Cb2FyZCIsInRodW1ibmFpbFVybCIsImZpbmFsSXRlbUlkIiwiYm9hcmRJdGVtRWwiLCJuZXdDb250ZW50IiwibmV3SXRlbSIsImdyb3VwRWwiLCJfdGhpczUiLCJ0ZXh0RWwiLCJkZWZhdWx0U3R5bGVzIiwiaW5uZXJUZXh0Iiwic3RhcnQiLCJlbmQiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInN2Z0VsIiwiX3RoaXMkZ2V0TGluZUJvdW5kaW5nIiwiZ2V0TGluZUJvdW5kaW5nQm94IiwiYnVpbGRMaW5lRWxlbWVudCIsIl90aGlzNiIsInJlc2l6YWJsZU9wdGlvbnMiLCJlZGdlcyIsInJpZ2h0IiwiYm90dG9tIiwibGlzdGVuZXJzIiwibW92ZSIsInBhcnNlRmxvYXQiLCJyZWN0IiwiZGVsdGFSZWN0IiwibW9kaWZpZXJzIiwicmVzdHJpY3RTaXplIiwiZHJhZ2dhYmxlIiwiaW5lcnRpYSIsImludGVyYWN0aW9uIiwic3RhcnRQb3MiLCJuZXdYIiwicGFnZVgiLCJ4MCIsIm5ld1kiLCJwYWdlWSIsInkwIiwicmVzaXphYmxlIiwib24iLCJfdGhpczciLCJzdGFydEhhbmRsZSIsImVuZEhhbmRsZSIsImFsbG93RnJvbSIsIm9sZFgiLCJvbGRZIiwiZHgiLCJkeSIsIl90aGlzNyRnZXRMaW5lQm91bmRpbiIsInVwZGF0ZUxpbmVFbGVtZW50IiwiZG93bmxvYWRBc3NldCIsIm9wZW4iLCJhZGRUb0Rvd25sb2FkTGlzdCIsImRpc2FibGVkIiwiZmV0Y2giLCJtZXRob2QiLCJyZXNwb25zZSIsIm9rIiwiYWJzIiwiX3RoaXMkZ2V0TGluZUJvdW5kaW5nMiIsInJlbFgxIiwicmVsWTEiLCJyZWxYMiIsInJlbFkyIiwiX3RoaXMkZ2V0TGluZUJvdW5kaW5nMyIsIl9sb2FkQm9hcmRTdGF0ZSIsIl90aGlzOCIsIml0ZW1zIiwiYm9hcmRJZFZhbHVlIiwiRXJyb3IiLCJzdGF0dXNUZXh0IiwianNvbiIsImNsZWFyIiwiY3JlYXRlSXRlbUZyb21EYXRhIiwiY29uc29sZSIsImVycm9yIiwiX3NhdmVCb2FyZFN0YXRlIiwiX2NhbGxlZTIiLCJfdGhpczkiLCJpc0F1dG9TYXZlIiwicGF5bG9hZCIsInNlcnZlckl0ZW1zIiwiX2FyZ3MyIiwiX3QyIiwiX2NvbnRleHQyIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJfc3luY1N0YXRlRnJvbVNlcnZlciIsIl90aGlzMCIsIm5ld0JvYXJkSXRlbXMiLCJzZXJ2ZXJJdGVtIiwic2VydmVySWQiLCJsb2NhbEl0ZW0iLCJ0ZW1wSWQiLCJuZXdJdGVtRGF0YSIsInBvc194IiwicG9zX3kiLCJkb21JdGVtIiwiX2l0ZW1EYXRhJHBvc194IiwiX2l0ZW1EYXRhJHBvc195IiwiX3NlYXJjaEFzc2V0cyIsIl9jYWxsZWUzIiwiX3RoaXMxIiwicXVlcnkiLCJfY29udGV4dDMiLCJhc3NldExpc3RUYXJnZXQiLCJhc3NldHMiLCJhc3NldCIsImFzc2V0RWxlbWVudCIsImNyZWF0ZUFzc2V0RWxlbWVudCIsImFzc2V0TmFtZSIsImFzc2V0VGh1bWJuYWlsIiwidGh1bWJuYWlsX3BhdGgiLCJfdGhpczEwIiwib3JpZ2luYWwiLCJjbG9uZSIsImNsb25lTm9kZSIsImRyb3B6b25lIiwiYWNjZXB0Iiwib25kcm9wIiwiZHJvcHBlZEVsZW1lbnQiLCJyZWxhdGVkVGFyZ2V0IiwiZHJvcFhfdmlld3BvcnQiLCJkcmFnRXZlbnQiLCJjbGllbnQiLCJkcm9wWV92aWV3cG9ydCIsImRyb3BYX2NhbnZhcyIsImRyb3BZX2NhbnZhcyIsImJvYXJkSWQiLCJwYXJlbnRJZCIsImNoZWNrYm94ZXMiLCJicmFuZExpc3RUYXJnZXQiLCJjaGVja2JveERpdiIsImlucHV0IiwiZGlzcGxheSIsIl9zbGljZWRUb0FycmF5IiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIm5leHQiLCJpc0FycmF5IiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfbiIsIkYiLCJzIiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0ZXN0IiwidHVzIiwiZHJvcHpvbmVUYXJnZXQiLCJmaWxlSW5wdXRUYXJnZXQiLCJjbGljayIsInBvbGxpbmdJbnRlcnZhbCIsImRyYWdvdmVyIiwiZHJhZ2xlYXZlIiwiZHJvcCIsImZpbGVzIiwiZGF0YVRyYW5zZmVyIiwiZmlsZXNTZWxlY3RlZCIsInNlbGVjdGVkRmlsZXMiLCJ0b3RhbEJ5dGVzIiwicmVkdWNlIiwic3VtIiwibGFiZWwiLCJmaWxlU3VtbWFyeVRhcmdldCIsImZvcm1hdEZpbGVTaXplIiwicmVuZGVyU2VsZWN0ZWRGaWxlcyIsInN1Ym1pdEJ1dHRvblRhcmdldCIsImZpbGVMaXN0VGFyZ2V0IiwiX3VwbG9hZCIsIl95aWVsZCR0aGlzJGNyZWF0ZVNoYSIsImNvbXBsZXRlZEJ5dGVzIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfc3RlcCR2YWx1ZSIsImluZGV4IiwicmVzdWx0Q29udGFpbmVyVGFyZ2V0IiwicG9pbnRlckV2ZW50cyIsInByb2dyZXNzQ29udGFpbmVyVGFyZ2V0IiwicHJvZ3Jlc3NCYXJUYXJnZXQiLCJwcm9ncmVzc1RleHRUYXJnZXQiLCJjcmVhdGVTaGFyZVNlc3Npb24iLCJ0b2tlbiIsImVudHJpZXMiLCJ1cGRhdGVGaWxlU3RhdHVzIiwidXBsb2FkU2luZ2xlRmlsZSIsInN0YXJ0UG9sbGluZyIsInVwbG9hZCIsIl9jcmVhdGVTaGFyZVNlc3Npb24iLCJfY3JlYXRlVHVzVXBsb2FkTWV0YWQiLCJyZWplY3QiLCJVcGxvYWQiLCJlbmRwb2ludCIsImNodW5rU2l6ZSIsInJldHJ5RGVsYXlzIiwiYXV0aFRva2VuVmFsdWUiLCJvblByb2dyZXNzIiwiYnl0ZXNVcGxvYWRlZCIsIm92ZXJhbGxVcGxvYWRlZCIsInBlcmNlbnRhZ2UiLCJ0b0ZpeGVkIiwiZmlsZVBlcmNlbnRhZ2UiLCJvblN1Y2Nlc3MiLCJvbkVycm9yIiwiZXhwZWN0ZWRDb3VudCIsInBvbGxDb3VudCIsIm1heFBvbGxzIiwiX2RhdGEkcHJvY2Vzc2VkQ291bnQiLCJkYXRhIiwiX2RhdGEiLCJfdDMiLCJlbmNvZGVVUklDb21wb25lbnQiLCJzdGF0dXMiLCJwcm9jZXNzZWRDb3VudCIsInVybElucHV0VGFyZ2V0IiwidXJsIiwicm9sZSIsImFwcGVuZCIsImJ5dGVzIiwidW5pdHMiLCJleHBvbmVudCIsImZsb29yIiwibG9nIiwicG93IiwiYXV0aFRva2VuIiwiY2xvc2UiLCJtZW51VGFyZ2V0IiwiY2hpbGRyZW5Db250YWluZXIiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJpY29uIiwic3VibWl0IiwicmVxdWVzdFN1Ym1pdCIsIl9zZWxlY3RCcmFuZCIsImNsaWNrZWRCdXR0b24iLCJicmFuZElkIiwiYnJhbmRCdXR0b25UYXJnZXRzIiwiYnJhbmRzQ29udGFpbmVyVGFyZ2V0IiwicmVjZW50QXNzZXRzQ29udGFpbmVyVGFyZ2V0IiwiY29sbGVjdGlvbnNDb250YWluZXJUYXJnZXQiLCJjYXRlZ29yaWVzQ29udGFpbmVyVGFyZ2V0IiwiYnJhbmRzIiwicmVjZW50QXNzZXRzIiwiY29sbGVjdGlvbnMiLCJjYXRlZ29yaWVzIiwic2VsZWN0QnJhbmQiLCJfZmlsdGVyIiwiX3lpZWxkJFByb21pc2UkYWxsIiwiX3lpZWxkJFByb21pc2UkYWxsMiIsImNhdGVnb3JpZXNSZXNwb25zZSIsImNvbGxlY3Rpb25zUmVzcG9uc2UiLCJjYXRlZ29yaWVzRGF0YSIsImNvbGxlY3Rpb25zRGF0YSIsImJyYW5kQ29udGFpbmVyVGFyZ2V0IiwiY2F0ZWdvcnlDb250YWluZXJUYXJnZXQiLCJjb2xsZWN0aW9uQ29udGFpbmVyVGFyZ2V0IiwiYWxsIiwidG9nZ2xlRWRpdCIsIm5hbWVEaXNwbGF5VGFyZ2V0IiwibmFtZUZvcm1UYXJnZXQiLCJ0b2dnbGVFeHBpcmF0aW9uRWRpdCIsImV4cGlyYXRpb25EaXNwbGF5VGFyZ2V0IiwiZXhwaXJhdGlvbkZvcm1UYXJnZXQiLCJvcGVuTW9kYWwiLCJtb2RhbFRhcmdldCIsImNsb3NlTW9kYWwiLCJfZ2VuZXJhdGUiLCJleHRlbnNpb24iLCJpbWFnZUFzc2V0cyIsInNoYXJlZFRva2VuIiwiZ2VuZXJhdGVkTGlua3MiLCJ3aWR0aElucHV0VGFyZ2V0IiwiaGVpZ2h0SW5wdXRUYXJnZXQiLCJwYWRkaW5nSW5wdXRUYXJnZXQiLCJleHRlbnNpb25JbnB1dFRhcmdldCIsInJlc29sdmVTaGFyZVRva2VuIiwibWVzc2FnZSIsIl9hc3NldEVsZW1lbnQkZGF0YXNldCIsInNrdSIsInBlcm1hbGlua0NvbnRhaW5lciIsImV4dGVuc2lvbkluZGV4IiwibGFzdEluZGV4T2YiLCJjbGVhbkZpbGVuYW1lIiwic3Vic3RyaW5nIiwiaW5wdXRJZCIsInJlbGF0aXZlVXJsIiwiZnVsbFVybCIsImJhc2VVcmxWYWx1ZSIsIndlYkxpbmtVcmwiLCJ3cmFwcGVyIiwicmVhZE9ubHkiLCJjb3B5QnV0dG9uIiwib3BlbkxpbmsiLCJocmVmIiwicmVsIiwicmVwbGFjZUNoaWxkcmVuIiwiY3N2QnV0dG9uQ29udGFpbmVyVGFyZ2V0IiwiZ2VuZXJhdGUiLCJkb3dubG9hZENzdiIsImNzdkNvbnRlbnQiLCJyb3ciLCJyZXBsYWNlIiwiZW5jb2RlZFVyaSIsImVuY29kZVVSSSIsImxpbmsiLCJfcmVzb2x2ZVNoYXJlVG9rZW4iLCJfaW1hZ2VBc3NldHMkZmluZCIsImV4aXN0aW5nVG9rZW4iLCJmaW5kIiwiZ2VuZXJhdGVkVG9rZW4iLCJoYXNTaGFyZUVuZHBvaW50VmFsdWUiLCJzaGFyZUVuZHBvaW50VmFsdWUiLCJGb3JtRGF0YSIsIl94MiIsImJhc2VVcmwiLCJzaGFyZUVuZHBvaW50IiwiX3N1cGVyUHJvcEdldCIsIl9nZXQiLCJfc3VwZXJQcm9wQmFzZSIsImhhc093blByb3BlcnR5IiwiZGlhbG9nVGFyZ2V0Iiwib25EaWFsb2dDbG9zZSIsIl9vcGVuIiwiaHRtbCIsInNob3dNb2RhbCIsIl9zdWJtaXRGb3JtIiwiYWRkQnV0dG9uIiwiaGVhZGVyRG93bmxvYWRCYWdMaW5rIiwiZm9ybURhdGEiLCJyZXNwb25zZURhdGEiLCJoZWFkZXJEb3dubG9hZEJhZ0NvdW50ZXIiLCJhY3Rpb24iLCJkb3dubG9hZENvdW50Iiwic3VibWl0Rm9ybSIsImlucHV0VGFyZ2V0IiwiaXRlbVRhcmdldHMiLCJpbmNsdWRlcyIsImZvcm0iLCJuYW1lSW5wdXRUYXJnZXQiLCJnZW5lcmF0ZUZvcm1UYXJnZXQiLCJjb25maXJtYXRpb25UYXJnZXQiLCJvcGVuU2hhcmVNb2RhbCIsImNvcHlGZWVkYmFja1RpbWVvdXQiLCJfY29weVRvQ2xpcGJvYXJkIiwiaGlnaGxpZ2h0VXJsSW5wdXQiLCJjb3B5VG9DbGlwYm9hcmQiLCJjb250YWluZXJUYXJnZXQiLCJyZW5kZXJUYWdzIiwic3BsaXQiLCJpbnNlcnRCZWZvcmUiLCJjcmVhdGVUYWdFbGVtZW50IiwidGFnIiwicmVtb3ZlQnRuIiwicmVtb3ZlVGFnIiwidGFnVGV4dCIsImZpcnN0Q2hpbGQiLCJjdXJyZW50VmFsdWVzIiwibmV3VmFsdWVzIiwiaGFuZGxlSW5wdXQiLCJ1cGRhdGVQcmV2aWV3IiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsInByZXZpZXdUYXJnZXQiLCJzcmMiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwiX3JlYWRPbmx5RXJyb3IiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJmaWxlU2VsZWN0ZWQiLCJmaWxlTmFtZURpc3BsYXlUYXJnZXQiLCJoaWRlRXJyb3IiLCJzaG93RXJyb3IiLCJhc3NldElkVmFsdWUiLCJvbkFmdGVyUmVzcG9uc2UiLCJyZXEiLCJyZXMiLCJnZXRIZWFkZXIiLCJieXRlc1RvdGFsIiwibG9jYXRpb24iLCJyZWxvYWQiLCJwb3AiLCJlZGl0VXJsIiwiZXJyb3JNZXNzYWdlVGFyZ2V0IiwidHVyYm9fY29udHJvbGxlcl9kZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==