"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetadataApi = exports.MetadataApiFactory = exports.MetadataApiFp = exports.MetadataApiAxiosParamCreator = exports.RequiredError = exports.BaseAPI = exports.COLLECTION_FORMATS = void 0;

var url = _interopRequireWildcard(require("url"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BASE_PATH = 'http://localhost:8080'.replace(/\/+$/, '');
/**
 *
 * @export
 */

var COLLECTION_FORMATS = {
  csv: ',',
  ssv: ' ',
  tsv: '\t',
  pipes: '|'
};
/**
 *
 * @export
 * @interface RequestArgs
 */

exports.COLLECTION_FORMATS = COLLECTION_FORMATS;

/**
 *
 * @export
 * @class BaseAPI
 */
var BaseAPI = function BaseAPI(configuration) {
  var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : BASE_PATH;

  _classCallCheck(this, BaseAPI);

  this.basePath = basePath;

  _defineProperty(this, "configuration", void 0);

  if (configuration) {
    this.configuration = configuration;
    this.basePath = configuration.basePath || this.basePath;
  }
};
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */


exports.BaseAPI = BaseAPI;

var RequiredError =
/*#__PURE__*/
function (_Error) {
  _inherits(RequiredError, _Error);

  function RequiredError(field, msg) {
    var _this;

    _classCallCheck(this, RequiredError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RequiredError).call(this, msg));
    _this.field = field;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "name", 'RequiredError');

    return _this;
  }

  return RequiredError;
}(_wrapNativeSuper(Error));
/**
 *
 * @export
 * @interface APIError
 */


exports.RequiredError = RequiredError;

/**
 * MetadataApi - axios parameter creator
 * @export
 */
var MetadataApiAxiosParamCreator = function MetadataApiAxiosParamCreator(configuration) {
  return {
    /**
     * Returns some basic details about the box.
     * @summary GetBoxInfo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBoxInfo: function getBoxInfo() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var localVarPath = "/info";
      var localVarUrlObj = url.parse(localVarPath, true);
      var baseOptions;

      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      var localVarRequestOptions = Object.assign({
        method: 'GET'
      }, baseOptions, options);
      var localVarHeaderParameter = {};
      var localVarQueryParameter = {};

      if (configuration && configuration.userAgent) {
        localVarHeaderParameter['User-Agent'] = configuration.userAgent;
      } else {
        localVarHeaderParameter['User-Agent'] = 'classificationbox-SDK/js/1.0.1';
      } // authentication basicAuth required
      // http basic authentication required


      if (configuration && (configuration.username || configuration.password)) {
        localVarHeaderParameter['Authorization'] = 'Basic ' + btoa(configuration.username + ':' + configuration.password);
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query); // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943

      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
/**
 * MetadataApi - functional programming interface
 * @export
 */


exports.MetadataApiAxiosParamCreator = MetadataApiAxiosParamCreator;

var MetadataApiFp = function MetadataApiFp(configuration) {
  return {
    /**
     * Returns some basic details about the box.
     * @summary GetBoxInfo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBoxInfo: function getBoxInfo(options) {
      var localVarAxiosArgs = MetadataApiAxiosParamCreator(configuration).getBoxInfo(options);
      return function () {
        var basePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : BASE_PATH;
        var axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {
          url: basePath + localVarAxiosArgs.url
        });
        return _axios.default.request(axiosRequestArgs);
      };
    }
  };
};
/**
 * MetadataApi - factory interface
 * @export
 */


exports.MetadataApiFp = MetadataApiFp;

var MetadataApiFactory = function MetadataApiFactory(configuration, basePath) {
  return {
    /**
     * Returns some basic details about the box.
     * @summary GetBoxInfo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBoxInfo: function getBoxInfo(options) {
      return MetadataApiFp(configuration).getBoxInfo(options)(basePath);
    }
  };
};
/**
 * MetadataApi - interface
 * @export
 * @interface MetadataApi
 */


exports.MetadataApiFactory = MetadataApiFactory;

/**
 * MetadataApi - object-oriented interface
 * @export
 * @class MetadataApi
 * @extends {BaseAPI}
 */
var MetadataApi =
/*#__PURE__*/
function (_BaseAPI) {
  _inherits(MetadataApi, _BaseAPI);

  function MetadataApi() {
    _classCallCheck(this, MetadataApi);

    return _possibleConstructorReturn(this, _getPrototypeOf(MetadataApi).apply(this, arguments));
  }

  _createClass(MetadataApi, [{
    key: "getBoxInfo",

    /**
     * Returns some basic details about the box.
     * @summary GetBoxInfo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MetadataApi
     */
    value: function getBoxInfo(options) {
      return MetadataApiFp(this.configuration).getBoxInfo(options)(this.basePath);
    }
  }]);

  return MetadataApi;
}(BaseAPI);

exports.MetadataApi = MetadataApi;