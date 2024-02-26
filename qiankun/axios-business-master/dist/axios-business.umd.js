(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
    typeof define === 'function' && define.amd ? define(['exports', 'axios'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['axios-business'] = {}, global.axios));
}(this, (function (exports, axios) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

    /**
     * 判断对象
     * @param o
     * @returns
     */
    function isObj(o) {
      return Object.prototype.toString.call(o) === "[object Object]";
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * 错误处理
     * @param error
     * @returns
     */

    function rejectedHandler(error) {
      return Promise.reject(error);
    }
    /**
     * 预处理AxiosRequestConfig
     * 处理rest API，将API中的参数替换为实际值
     *
     * @param config
     * @returns
     */


    function parseRestParam(config) {
      var _a = config.url,
          url = _a === void 0 ? "" : _a,
          _b = config.params,
          params = _b === void 0 ? {} : _b,
          _c = config.data,
          data = _c === void 0 ? {} : _c,
          method = config.method;

      if (FormData && data instanceof FormData) {
        return config;
      }

      var tmpParams = __assign(__assign({}, params), data);

      config.url = url.replace(/:([^/\d]+)/g, function (sub, $0) {
        var v = tmpParams[$0];
        Reflect.deleteProperty(tmpParams, $0);
        return v;
      });

      if (method === "get") {
        config.params = __assign({}, tmpParams);
        config.data = {};
      } else {
        config.params = {};
        config.data = __assign({}, tmpParams);
      }

      return config;
    }
    /**
     * 预处理AxiosResponse
     *
     * @param response
     * @returns
     */


    function parseToJSON(response) {
      var responseType = response.config.responseType,
          data = response.data;

      if (responseType === "json") {
        return data;
      }

      return response;
    }

    var ins = null;
    /**
     * 获取Axios实例
     * @param config
     * @returns
     */

    function getInstance(config) {
      if (ins !== null) {
        return ins;
      }

      var cfg = {
        baseURL: "",
        timeout: config.timeout || 10000,
        headers: {
          "Content-Type": "application/json"
        },
        responseType: "json"
      };
      ins = axios__default['default'].create(cfg);
      return ins;
    }
    /**
     * 导出一个实例
     *
     * @param config
     * @returns
     */


    function axiosext (config) {
      var _a, _b;

      var instance = getInstance(config);
      var before = (_a = config.interceptor) === null || _a === void 0 ? void 0 : _a.request;

      if (typeof before === "function") {
        instance.interceptors.request.use(before, rejectedHandler);
      }

      var after = (_b = config.interceptor) === null || _b === void 0 ? void 0 : _b.response;

      if (typeof after === "function") {
        instance.interceptors.response.use(after, rejectedHandler);
      }

      instance.interceptors.request.use(parseRestParam, rejectedHandler);
      instance.interceptors.response.use(parseToJSON, rejectedHandler);
      return {
        instance: instance,
        head: function (url, params, config) {
          return instance.head(url, __assign({
            params: params
          }, config));
        },
        post: function (url, data, config) {
          return instance.post(url, data, config);
        },
        delete: function (url, data, config) {
          return instance.delete(url, __assign({
            data: data
          }, config));
        },
        put: function (url, data, config) {
          return instance.put(url, data, config);
        },
        get: function (url, params, config) {
          return instance.get(url, __assign({
            params: params
          }, config));
        },
        patch: function (url, data, config) {
          return instance.patch(url, data, config);
        },
        blob: function (url, params, config) {
          return instance.get(url, __assign(__assign({
            params: params
          }, config), {
            responseType: "blob"
          }));
        }
      };
    }

    var axiosExtInstance = null;

    function parseModule(apiModules) {
      if (!isObj(apiModules)) return {};
      var apis = {};
      Object.keys(apiModules).forEach(function (moduleName) {
        apis[moduleName] = {};
        var module = apiModules[moduleName];
        Object.keys(module).forEach(function (funcName) {
          var _a = module[funcName],
              url = _a.url,
              method = _a.method;
          var me = (method || "").toLowerCase();
          var httpMethod = axiosExtInstance[me];

          if (httpMethod) {
            apis[moduleName][funcName] = httpMethod.bind(null, url);
          }
        });
      });
      return apis;
    }

    function createApis(config) {
      axiosExtInstance = axiosExtInstance || axiosext(config);
      return parseModule(config.modules);
    }

    exports.createApis = createApis;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=axios-business.umd.js.map
