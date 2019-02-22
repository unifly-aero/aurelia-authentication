'use strict';

System.register(['extend', 'jwt-decode', 'aurelia-pal', 'aurelia-path', 'aurelia-logging', 'aurelia-dependency-injection', 'aurelia-metadata', 'aurelia-event-aggregator', 'aurelia-templating-resources', 'aurelia-api', 'aurelia-router', 'aurelia-fetch-client', './authFilterValueConverter', './authenticatedValueConverter', './authenticatedFilterValueConverter'], function (_export, _context) {
  "use strict";

  var extend, jwtDecode, PLATFORM, DOM, parseQueryString, join, buildQueryString, getLogger, inject, Container, deprecated, EventAggregator, BindingSignaler, Rest, Config, Redirect, HttpClient, AuthFilterValueConverter, AuthenticatedValueConverter, AuthenticatedFilterValueConverter, _dec, _class2, _dec2, _class3, _dec3, _class4, _dec4, _class5, _dec5, _class6, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class7, _desc, _value, _class8, _dec13, _dec14, _class9, _desc2, _value2, _class10, _dec15, _class12, _dec16, _class13, _dec17, _class14, _typeof, _createClass, Popup, buildPopupWindowOptions, parseUrl, logger, BaseConfig, Storage, AuthLock, OAuth1, OAuth2, Saml, Authentication, AuthService, AuthenticateStep, AuthorizeStep, FetchConfig;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  

  function randomState() {
    var rand = Math.random().toString(36).substr(2);

    return encodeURIComponent(rand);
  }

  function camelCase(name) {
    return name.replace(/([:\-_]+(.))/g, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    });
  }

  function getPayload(token) {
    var payload = null;

    try {
      payload = token ? jwtDecode(token) : null;
    } catch (_) {}

    return payload;
  }

  function configure(frameworkConfig, config) {
    if (!PLATFORM.location.origin) {
      PLATFORM.location.origin = PLATFORM.location.protocol + '//' + PLATFORM.location.hostname + (PLATFORM.location.port ? ':' + PLATFORM.location.port : '');
    }

    var baseConfig = frameworkConfig.container.get(BaseConfig);

    if (typeof config === 'function') {
      config(baseConfig);
    } else if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
      baseConfig.configure(config);
    }

    for (var _iterator = baseConfig.globalValueConverters, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var converter = _ref;

      frameworkConfig.globalResources(PLATFORM.moduleName('./' + converter));
      logger.info('Add globalResources value-converter: ' + converter);
    }
    var fetchConfig = frameworkConfig.container.get(FetchConfig);
    var clientConfig = frameworkConfig.container.get(Config);

    if (Array.isArray(baseConfig.configureEndpoints)) {
      baseConfig.configureEndpoints.forEach(function (endpointToPatch) {
        fetchConfig.configure(endpointToPatch);
      });
    }

    var client = void 0;

    if (baseConfig.endpoint !== null) {
      if (typeof baseConfig.endpoint === 'string') {
        var endpoint = clientConfig.getEndpoint(baseConfig.endpoint);

        if (!endpoint) {
          throw new Error('There is no \'' + (baseConfig.endpoint || 'default') + '\' endpoint registered.');
        }
        client = endpoint;
      } else if (baseConfig.endpoint instanceof HttpClient) {
        client = new Rest(baseConfig.endpoint);
      }
    }

    if (!(client instanceof Rest)) {
      client = new Rest(frameworkConfig.container.get(HttpClient));
    }

    baseConfig.client = client;
  }

  _export('configure', configure);

  return {
    setters: [function (_extend) {
      extend = _extend.default;
    }, function (_jwtDecode) {
      jwtDecode = _jwtDecode.default;
    }, function (_aureliaPal) {
      PLATFORM = _aureliaPal.PLATFORM;
      DOM = _aureliaPal.DOM;
    }, function (_aureliaPath) {
      parseQueryString = _aureliaPath.parseQueryString;
      join = _aureliaPath.join;
      buildQueryString = _aureliaPath.buildQueryString;
    }, function (_aureliaLogging) {
      getLogger = _aureliaLogging.getLogger;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
      Container = _aureliaDependencyInjection.Container;
    }, function (_aureliaMetadata) {
      deprecated = _aureliaMetadata.deprecated;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaTemplatingResources) {
      BindingSignaler = _aureliaTemplatingResources.BindingSignaler;
    }, function (_aureliaApi) {
      Rest = _aureliaApi.Rest;
      Config = _aureliaApi.Config;
    }, function (_aureliaRouter) {
      Redirect = _aureliaRouter.Redirect;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_authFilterValueConverter) {
      AuthFilterValueConverter = _authFilterValueConverter.AuthFilterValueConverter;
    }, function (_authenticatedValueConverter) {
      AuthenticatedValueConverter = _authenticatedValueConverter.AuthenticatedValueConverter;
    }, function (_authenticatedFilterValueConverter) {
      AuthenticatedFilterValueConverter = _authenticatedFilterValueConverter.AuthenticatedFilterValueConverter;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Popup', Popup = function () {
        function Popup() {
          

          this.popupWindow = null;
          this.polling = null;
          this.url = '';
        }

        Popup.prototype.open = function open(url, windowName, options) {
          this.url = url;
          var optionsString = buildPopupWindowOptions(options || {});

          this.popupWindow = PLATFORM.global.open(url, windowName, optionsString);

          if (this.popupWindow && this.popupWindow.focus) {
            this.popupWindow.focus();
          }

          return this;
        };

        Popup.prototype.eventListener = function eventListener(redirectUri) {
          var _this = this;

          return new Promise(function (resolve, reject) {
            _this.popupWindow.addEventListener('loadstart', function (event) {
              if (event.url.indexOf(redirectUri) !== 0) {
                return;
              }

              var parser = DOM.createElement('a');

              parser.href = event.url;

              if (parser.search || parser.hash) {
                var qs = parseUrl(parser);

                if (qs.error) {
                  reject({ error: qs.error });
                } else {
                  resolve(qs);
                }

                _this.popupWindow.close();
              }
            });

            _this.popupWindow.addEventListener('exit', function () {
              reject({ data: 'Provider Popup was closed' });
            });

            _this.popupWindow.addEventListener('loaderror', function () {
              reject({ data: 'Authorization Failed' });
            });
          });
        };

        Popup.prototype.pollPopup = function pollPopup(validateQs) {
          var _this2 = this;

          if (!validateQs) {
            validateQs = function validateQs() {
              return true;
            };
          }

          return new Promise(function (resolve, reject) {
            _this2.polling = PLATFORM.global.setInterval(function () {
              var errorData = void 0;

              try {
                if (_this2.popupWindow.location.host === PLATFORM.global.document.location.host && (_this2.popupWindow.location.search || _this2.popupWindow.location.hash)) {
                  var qs = parseUrl(_this2.popupWindow.location);
                  if (validateQs(qs)) {
                    if (qs.error) {
                      reject({ error: qs.error });
                    } else {
                      resolve(qs);
                    }

                    _this2.popupWindow.close();
                    PLATFORM.global.clearInterval(_this2.polling);
                  }
                }
              } catch (error) {
                errorData = error;
              }

              if (!_this2.popupWindow) {
                PLATFORM.global.clearInterval(_this2.polling);
                reject({
                  error: errorData,
                  data: 'Provider Popup Blocked'
                });
              } else if (_this2.popupWindow.closed) {
                PLATFORM.global.clearInterval(_this2.polling);
                reject({
                  error: errorData,
                  data: 'Problem poll popup'
                });
              }
            }, 35);
          });
        };

        return Popup;
      }());

      _export('Popup', Popup);

      buildPopupWindowOptions = function buildPopupWindowOptions(options) {
        var width = options.width || 500;
        var height = options.height || 500;

        var extended = extend({
          width: width,
          height: height,
          left: PLATFORM.global.screenX + (PLATFORM.global.outerWidth - width) / 2,
          top: PLATFORM.global.screenY + (PLATFORM.global.outerHeight - height) / 2.5
        }, options);

        var parts = [];

        Object.keys(extended).map(function (key) {
          return parts.push(key + '=' + extended[key]);
        });

        return parts.join(',');
      };

      parseUrl = function parseUrl(url) {
        var hash = url.hash.charAt(0) === '#' ? url.hash.substr(1) : url.hash;

        return extend(true, {}, parseQueryString(url.search), parseQueryString(hash));
      };

      _export('logger', logger = getLogger('aurelia-authentication'));

      _export('logger', logger);

      _export('BaseConfig', BaseConfig = function () {
        function BaseConfig() {
          

          this.client = null;
          this.endpoint = null;
          this.configureEndpoints = null;
          this.loginRedirect = '#/';
          this.logoutRedirect = '#/';
          this.loginRoute = '/login';
          this.loginOnSignup = true;
          this.signupRedirect = '#/login';
          this.expiredRedirect = '#/';
          this.storageChangedRedirect = '#/';
          this.baseUrl = '';
          this.loginUrl = '/auth/login';
          this.logoutUrl = null;
          this.logoutMethod = 'get';
          this.signupUrl = '/auth/signup';
          this.profileUrl = '/auth/me';
          this.profileMethod = 'put';
          this.unlinkUrl = '/auth/unlink/';
          this.unlinkMethod = 'get';
          this.refreshTokenUrl = null;
          this.authHeader = 'Authorization';
          this.authTokenType = 'Bearer';
          this.logoutOnInvalidToken = false;
          this.accessTokenProp = 'access_token';
          this.accessTokenName = 'token';
          this.accessTokenRoot = false;
          this.useRefreshToken = false;
          this.autoUpdateToken = true;
          this.clientId = false;
          this.clientSecret = null;
          this.refreshTokenProp = 'refresh_token';
          this.refreshTokenSubmitProp = 'refresh_token';
          this.keepOldResponseProperties = false;
          this.refreshTokenName = 'token';
          this.refreshTokenRoot = false;
          this.idTokenProp = 'id_token';
          this.idTokenName = 'token';
          this.idTokenRoot = false;
          this.httpInterceptor = true;
          this.withCredentials = true;
          this.platform = 'browser';
          this.storage = 'localStorage';
          this.storageKey = 'aurelia_authentication';
          this.storageChangedReload = false;
          this.getExpirationDateFromResponse = null;
          this.getAccessTokenFromResponse = null;
          this.getRefreshTokenFromResponse = null;
          this.globalValueConverters = ['authFilterValueConverter'];
          this.defaultHeadersForTokenRequests = {
            'Content-Type': 'application/json'
          };
          this.providers = {
            facebook: {
              name: 'facebook',
              url: '/auth/facebook',
              authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
              redirectUri: PLATFORM.location.origin + '/',
              requiredUrlParams: ['display', 'scope'],
              scope: ['email'],
              scopeDelimiter: ',',
              display: 'popup',
              oauthType: '2.0',
              popupOptions: { width: 580, height: 400 }
            },
            google: {
              name: 'google',
              url: '/auth/google',
              authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
              redirectUri: PLATFORM.location.origin,
              requiredUrlParams: ['scope'],
              optionalUrlParams: ['display', 'state'],
              scope: ['profile', 'email'],
              scopePrefix: 'openid',
              scopeDelimiter: ' ',
              display: 'popup',
              oauthType: '2.0',
              popupOptions: { width: 452, height: 633 },
              state: randomState
            },
            github: {
              name: 'github',
              url: '/auth/github',
              authorizationEndpoint: 'https://github.com/login/oauth/authorize',
              redirectUri: PLATFORM.location.origin,
              optionalUrlParams: ['scope'],
              scope: ['user:email'],
              scopeDelimiter: ' ',
              oauthType: '2.0',
              popupOptions: { width: 1020, height: 618 }
            },
            instagram: {
              name: 'instagram',
              url: '/auth/instagram',
              authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
              redirectUri: PLATFORM.location.origin,
              requiredUrlParams: ['scope'],
              scope: ['basic'],
              scopeDelimiter: '+',
              oauthType: '2.0'
            },
            linkedin: {
              name: 'linkedin',
              url: '/auth/linkedin',
              authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
              redirectUri: PLATFORM.location.origin,
              requiredUrlParams: ['state'],
              scope: ['r_emailaddress'],
              scopeDelimiter: ' ',
              state: 'STATE',
              oauthType: '2.0',
              popupOptions: { width: 527, height: 582 }
            },
            twitter: {
              name: 'twitter',
              url: '/auth/twitter',
              authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
              redirectUri: PLATFORM.location.origin,
              oauthType: '1.0',
              popupOptions: { width: 495, height: 645 }
            },
            twitch: {
              name: 'twitch',
              url: '/auth/twitch',
              authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
              redirectUri: PLATFORM.location.origin,
              requiredUrlParams: ['scope'],
              scope: ['user_read'],
              scopeDelimiter: ' ',
              display: 'popup',
              oauthType: '2.0',
              popupOptions: { width: 500, height: 560 }
            },
            live: {
              name: 'live',
              url: '/auth/live',
              authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
              redirectUri: PLATFORM.location.origin,
              requiredUrlParams: ['display', 'scope'],
              scope: ['wl.emails'],
              scopeDelimiter: ' ',
              display: 'popup',
              oauthType: '2.0',
              popupOptions: { width: 500, height: 560 }
            },
            yahoo: {
              name: 'yahoo',
              url: '/auth/yahoo',
              authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
              redirectUri: PLATFORM.location.origin,
              scope: [],
              scopeDelimiter: ',',
              oauthType: '2.0',
              popupOptions: { width: 559, height: 519 }
            },
            bitbucket: {
              name: 'bitbucket',
              url: '/auth/bitbucket',
              authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
              redirectUri: PLATFORM.location.origin + '/',
              requiredUrlParams: ['scope'],
              scope: ['email'],
              scopeDelimiter: ' ',
              oauthType: '2.0',
              popupOptions: { width: 1028, height: 529 }
            },
            azure_ad: {
              name: 'azure_ad',
              url: '/auth/azure_ad',
              authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
              redirectUri: window.location.origin,
              logoutEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/logout',
              postLogoutRedirectUri: window.location.origin,
              requiredUrlParams: ['scope'],
              scope: ['user.read'],
              scopeDelimiter: ' ',
              oauthType: '2.0'
            },
            auth0: {
              name: 'auth0',
              oauthType: 'auth0-lock',
              clientId: 'your_client_id',
              clientDomain: 'your_domain_url',
              display: 'popup',
              lockOptions: {},
              responseType: 'token',
              state: randomState
            }
          };
          this._authToken = 'Bearer';
          this._responseTokenProp = 'access_token';
          this._tokenName = 'token';
          this._tokenRoot = false;
          this._tokenPrefix = 'aurelia';
          this._logoutOnInvalidtoken = false;
        }

        BaseConfig.prototype.joinBase = function joinBase(url) {
          return join(this.baseUrl, url);
        };

        BaseConfig.prototype.configure = function configure(incoming) {
          for (var key in incoming) {
            if (incoming.hasOwnProperty(key)) {
              var value = incoming[key];

              if (value !== undefined) {
                if (Array.isArray(value) || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || value === null) {
                  this[key] = value;
                } else {
                  extend(true, this[key], value);
                }
              }
            }
          }
        };

        BaseConfig.prototype.getOptionsForTokenRequests = function getOptionsForTokenRequests() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          return extend(true, {}, { headers: this.defaultHeadersForTokenRequests }, options);
        };

        _createClass(BaseConfig, [{
          key: 'authToken',
          set: function set(authToken) {
            logger.warn('BaseConfig.authToken is deprecated. Use BaseConfig.authTokenType instead.');
            this._authTokenType = authToken;
            this.authTokenType = authToken;

            return authToken;
          },
          get: function get() {
            return this._authTokenType;
          }
        }, {
          key: 'responseTokenProp',
          set: function set(responseTokenProp) {
            logger.warn('BaseConfig.responseTokenProp is deprecated. Use BaseConfig.accessTokenProp instead.');
            this._responseTokenProp = responseTokenProp;
            this.accessTokenProp = responseTokenProp;

            return responseTokenProp;
          },
          get: function get() {
            return this._responseTokenProp;
          }
        }, {
          key: 'tokenRoot',
          set: function set(tokenRoot) {
            logger.warn('BaseConfig.tokenRoot is deprecated. Use BaseConfig.accessTokenRoot instead.');
            this._tokenRoot = tokenRoot;
            this.accessTokenRoot = tokenRoot;

            return tokenRoot;
          },
          get: function get() {
            return this._tokenRoot;
          }
        }, {
          key: 'tokenName',
          set: function set(tokenName) {
            logger.warn('BaseConfig.tokenName is deprecated. Use BaseConfig.accessTokenName instead.');
            this._tokenName = tokenName;
            this.accessTokenName = tokenName;

            return tokenName;
          },
          get: function get() {
            return this._tokenName;
          }
        }, {
          key: 'tokenPrefix',
          set: function set(tokenPrefix) {
            logger.warn('BaseConfig.tokenPrefix is obsolete. Use BaseConfig.storageKey instead.');
            this._tokenPrefix = tokenPrefix;

            return tokenPrefix;
          },
          get: function get() {
            return this._tokenPrefix || 'aurelia';
          }
        }, {
          key: 'current',
          get: function get() {
            logger.warn('Getter BaseConfig.current is deprecated. Use BaseConfig directly instead.');

            return this;
          },
          set: function set(_) {
            throw new Error('Setter BaseConfig.current has been removed. Use BaseConfig directly instead.');
          }
        }, {
          key: '_current',
          get: function get() {
            logger.warn('Getter BaseConfig._current is deprecated. Use BaseConfig directly instead.');

            return this;
          },
          set: function set(_) {
            throw new Error('Setter BaseConfig._current has been removed. Use BaseConfig directly instead.');
          }
        }, {
          key: 'logoutOnInvalidtoken',
          set: function set(logoutOnInvalidtoken) {
            logger.warn('BaseConfig.logoutOnInvalidtoken is obsolete. Use BaseConfig.logoutOnInvalidToken instead.');
            this._logoutOnInvalidtoken = logoutOnInvalidtoken;
            this.logoutOnInvalidToken = logoutOnInvalidtoken;

            return logoutOnInvalidtoken;
          },
          get: function get() {
            return this._logoutOnInvalidtoken;
          }
        }]);

        return BaseConfig;
      }());

      _export('BaseConfig', BaseConfig);

      _export('Storage', Storage = (_dec = inject(BaseConfig), _dec(_class2 = function () {
        function Storage(config) {
          

          this.config = config;
        }

        Storage.prototype.get = function get(key) {
          return PLATFORM.global[this.config.storage].getItem(key);
        };

        Storage.prototype.set = function set(key, value) {
          PLATFORM.global[this.config.storage].setItem(key, value);
        };

        Storage.prototype.remove = function remove(key) {
          PLATFORM.global[this.config.storage].removeItem(key);
        };

        return Storage;
      }()) || _class2));

      _export('Storage', Storage);

      _export('AuthLock', AuthLock = (_dec2 = inject(Storage, BaseConfig), _dec2(_class3 = function () {
        function AuthLock(storage, config) {
          

          this.storage = storage;
          this.config = config;
          this.defaults = {
            name: null,
            state: null,
            scope: null,
            scopeDelimiter: ' ',
            redirectUri: null,
            clientId: null,
            clientDomain: null,
            display: 'popup',
            lockOptions: {},
            popupOptions: null,
            responseType: 'token'
          };
        }

        AuthLock.prototype.open = function open(options, userData) {
          var _this3 = this;

          if (typeof PLATFORM.global.Auth0Lock !== 'function') {
            throw new Error('Auth0Lock was not found in global scope. Please load it before using this provider.');
          }
          var provider = extend(true, {}, this.defaults, options);
          var stateName = provider.name + '_state';

          if (typeof provider.state === 'function') {
            this.storage.set(stateName, provider.state());
          } else if (typeof provider.state === 'string') {
            this.storage.set(stateName, provider.state);
          }

          var opts = {
            auth: {
              params: {}
            }
          };

          if (Array.isArray(provider.scope) && provider.scope.length) {
            opts.auth.params.scope = provider.scope.join(provider.scopeDelimiter);
          }
          if (provider.state) {
            opts.auth.params.state = this.storage.get(provider.name + '_state');
          }
          if (provider.display === 'popup') {
            opts.auth.redirect = false;
          } else if (typeof provider.redirectUri === 'string') {
            opts.auth.redirect = true;
            opts.auth.redirectUrl = provider.redirectUri;
          }
          if (_typeof(provider.popupOptions) === 'object') {
            opts.popupOptions = provider.popupOptions;
          }
          if (typeof provider.responseType === 'string') {
            opts.auth.responseType = provider.responseType;
          }
          var lockOptions = extend(true, {}, provider.lockOptions, opts);

          this.lock = this.lock || new PLATFORM.global.Auth0Lock(provider.clientId, provider.clientDomain, lockOptions);

          var openPopup = new Promise(function (resolve, reject) {
            _this3.lock.on('authenticated', function (authResponse) {
              if (!lockOptions.auth.redirect) {
                _this3.lock.hide();
              }
              resolve({
                access_token: authResponse.accessToken,
                id_token: authResponse.idToken
              });
            });
            _this3.lock.on('unrecoverable_error', function (err) {
              if (!lockOptions.auth.redirect) {
                _this3.lock.hide();
              }
              reject(err);
            });
            _this3.lock.show();
          });

          return openPopup.then(function (lockResponse) {
            if (provider.responseType === 'token' || provider.responseType === 'id_token%20token' || provider.responseType === 'token%20id_token' || provider.responseType === 'token id_token') {
              return lockResponse;
            }

            throw new Error('Only `token` responseType is supported');
          });
        };

        return AuthLock;
      }()) || _class3));

      _export('AuthLock', AuthLock);

      _export('OAuth1', OAuth1 = (_dec3 = inject(Storage, Popup, BaseConfig), _dec3(_class4 = function () {
        function OAuth1(storage, popup, config) {
          

          this.storage = storage;
          this.config = config;
          this.popup = popup;
          this.defaults = {
            url: null,
            name: null,
            popupOptions: null,
            redirectUri: null,
            authorizationEndpoint: null
          };
        }

        OAuth1.prototype.open = function open(options, userData) {
          var _this4 = this;

          var provider = extend(true, {}, this.defaults, options);
          var serverUrl = this.config.joinBase(provider.url);

          if (this.config.platform !== 'mobile') {
            this.popup = this.popup.open('', provider.name, provider.popupOptions);
          }

          return this.config.client.post(serverUrl).then(function (response) {
            var url = provider.authorizationEndpoint + '?' + buildQueryString(response);

            if (_this4.config.platform === 'mobile') {
              _this4.popup = _this4.popup.open(url, provider.name, provider.popupOptions);
            } else {
              _this4.popup.popupWindow.location = url;
            }

            var popupListener = _this4.config.platform === 'mobile' ? _this4.popup.eventListener(provider.redirectUri) : _this4.popup.pollPopup();

            return popupListener.then(function (result) {
              return _this4.exchangeForToken(result, userData, provider);
            });
          });
        };

        OAuth1.prototype.exchangeForToken = function exchangeForToken(oauthData, userData, provider) {
          var data = extend(true, {}, userData, oauthData);
          var serverUrl = this.config.joinBase(provider.url);
          var credentials = this.config.withCredentials ? 'include' : 'same-origin';

          return this.config.client.post(serverUrl, data, { credentials: credentials });
        };

        return OAuth1;
      }()) || _class4));

      _export('OAuth1', OAuth1);

      _export('OAuth2', OAuth2 = (_dec4 = inject(Storage, Popup, BaseConfig), _dec4(_class5 = function () {
        function OAuth2(storage, popup, config) {
          

          this.storage = storage;
          this.config = config;
          this.popup = popup;
          this.defaults = {
            url: null,
            name: null,
            state: null,
            scope: null,
            scopeDelimiter: null,
            redirectUri: null,
            popupOptions: null,
            authorizationEndpoint: null,
            responseParams: null,
            requiredUrlParams: null,
            optionalUrlParams: null,
            defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
            responseType: 'code'
          };
        }

        OAuth2.prototype.open = function open(options, userData) {
          var _this5 = this;

          var provider = extend(true, {}, this.defaults, options);
          var stateName = provider.name + '_state';

          if (typeof provider.state === 'function') {
            this.storage.set(stateName, provider.state());
          } else if (typeof provider.state === 'string') {
            this.storage.set(stateName, provider.state);
          }

          var url = provider.authorizationEndpoint + '?' + buildQueryString(this.buildQuery(provider));
          var popup = this.popup.open(url, provider.name, provider.popupOptions);
          var openPopup = this.config.platform === 'mobile' ? popup.eventListener(provider.redirectUri) : popup.pollPopup();

          return openPopup.then(function (oauthData) {
            if (provider.responseType === 'token' || provider.responseType === 'id_token token' || provider.responseType === 'token id_token') {
              return oauthData;
            }
            if (oauthData.state && oauthData.state !== _this5.storage.get(stateName)) {
              return Promise.reject('OAuth 2.0 state parameter mismatch.');
            }

            return _this5.exchangeForToken(oauthData, userData, provider);
          });
        };

        OAuth2.prototype.exchangeForToken = function exchangeForToken(oauthData, userData, provider) {
          var data = extend(true, {}, userData, {
            clientId: provider.clientId,
            redirectUri: provider.redirectUri
          }, oauthData);

          var serverUrl = this.config.joinBase(provider.url);
          var credentials = this.config.withCredentials ? 'include' : 'same-origin';

          return this.config.client.post(serverUrl, data, { credentials: credentials });
        };

        OAuth2.prototype.buildQuery = function buildQuery(provider) {
          var _this6 = this;

          var query = {};
          var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];

          urlParams.forEach(function (params) {
            (provider[params] || []).forEach(function (paramName) {
              var camelizedName = camelCase(paramName);
              var paramValue = typeof provider[paramName] === 'function' ? provider[paramName]() : provider[camelizedName];

              if (paramName === 'state') {
                paramValue = encodeURIComponent(_this6.storage.get(provider.name + '_state'));
              }

              if (paramName === 'scope' && Array.isArray(paramValue)) {
                paramValue = paramValue.join(provider.scopeDelimiter);

                if (provider.scopePrefix) {
                  paramValue = provider.scopePrefix + provider.scopeDelimiter + paramValue;
                }
              }

              query[paramName] = paramValue;
            });
          });

          return query;
        };

        OAuth2.prototype.close = function close(options) {
          var provider = extend(true, {}, this.defaults, options);
          var url = provider.logoutEndpoint + '?' + buildQueryString(this.buildLogoutQuery(provider));
          var popup = this.popup.open(url, provider.name, provider.popupOptions);
          var openPopup = this.config.platform === 'mobile' ? popup.eventListener(provider.postLogoutRedirectUri) : popup.pollPopup();

          return openPopup;
        };

        OAuth2.prototype.buildLogoutQuery = function buildLogoutQuery(provider) {
          var query = {};
          var authResponse = this.storage.get(this.config.storageKey);

          if (provider.postLogoutRedirectUri) {
            query.post_logout_redirect_uri = provider.postLogoutRedirectUri;
          }
          if (this.storage.get(provider.name + '_state')) {
            query.state = this.storage.get(provider.name + '_state');
          }
          if (JSON.parse(authResponse).id_token) {
            query.id_token_hint = JSON.parse(authResponse).id_token;
          }

          return query;
        };

        return OAuth2;
      }()) || _class5));

      _export('OAuth2', OAuth2);

      _export('Saml', Saml = (_dec5 = inject(Storage, Popup, BaseConfig), _dec5(_class6 = function () {
        function Saml(storage, popup, config) {
          

          this.storage = storage;
          this.config = config;
          this.popup = popup;
          this.defaults = {
            url: null,
            name: null,
            state: null,
            scope: null,
            scopeDelimiter: null,
            redirectUri: null,
            popupOptions: null,
            authorizationEndpoint: null,
            responseParams: null,
            requiredUrlParams: null,
            optionalUrlParams: null
          };
        }

        Saml.prototype.open = function open(options, userData) {
          var provider = extend(true, {}, this.defaults, options);
          var popup = this.popup.open(options.url, provider.name, provider.popupOptions);
          var openPopup = this.config.platform === 'mobile' ? popup.eventListener(provider.redirectUri) : popup.pollPopup(function (qs) {
            return qs.access_token != null;
          });

          return openPopup.then(function (qs) {
            return {
              "access_token": qs.access_token
            };
          });
        };

        return Saml;
      }()) || _class6));

      _export('Saml', Saml);

      _export('Authentication', Authentication = (_dec6 = inject(Storage, BaseConfig, OAuth1, OAuth2, AuthLock, Saml), _dec7 = deprecated({ message: 'Use baseConfig.loginRoute instead.' }), _dec8 = deprecated({ message: 'Use baseConfig.loginRedirect instead.' }), _dec9 = deprecated({ message: 'Use baseConfig.joinBase(baseConfig.loginUrl) instead.' }), _dec10 = deprecated({ message: 'Use baseConfig.joinBase(baseConfig.signupUrl) instead.' }), _dec11 = deprecated({ message: 'Use baseConfig.joinBase(baseConfig.profileUrl) instead.' }), _dec12 = deprecated({ message: 'Use .getAccessToken() instead.' }), _dec6(_class7 = (_class8 = function () {
        function Authentication(storage, config, oAuth1, oAuth2, auth0Lock, saml) {
          

          this.storage = storage;
          this.config = config;
          this.oAuth1 = oAuth1;
          this.oAuth2 = oAuth2;
          this.auth0Lock = auth0Lock;
          this.saml = saml;
          this.updateTokenCallstack = [];
          this.accessToken = null;
          this.refreshToken = null;
          this.idToken = null;
          this.payload = null;
          this.exp = null;
          this.responseAnalyzed = false;
        }

        Authentication.prototype.getLoginRoute = function getLoginRoute() {
          return this.config.loginRoute;
        };

        Authentication.prototype.getLoginRedirect = function getLoginRedirect() {
          return this.config.loginRedirect;
        };

        Authentication.prototype.getLoginUrl = function getLoginUrl() {
          return this.Config.joinBase(this.config.loginUrl);
        };

        Authentication.prototype.getSignupUrl = function getSignupUrl() {
          return this.Config.joinBase(this.config.signupUrl);
        };

        Authentication.prototype.getProfileUrl = function getProfileUrl() {
          return this.Config.joinBase(this.config.profileUrl);
        };

        Authentication.prototype.getToken = function getToken() {
          return this.getAccessToken();
        };

        Authentication.prototype.getResponseObject = function getResponseObject() {
          return JSON.parse(this.storage.get(this.config.storageKey));
        };

        Authentication.prototype.setResponseObject = function setResponseObject(response) {
          if (response) {
            if (this.config.keepOldResponseProperties) {
              var oldResponse = this.getResponseObject();

              response = Object.assign({}, oldResponse, response);
            }
            this.getDataFromResponse(response);
            this.storage.set(this.config.storageKey, JSON.stringify(response));

            return;
          }
          this.accessToken = null;
          this.refreshToken = null;
          this.idToken = null;
          this.payload = null;
          this.exp = null;
          this.responseAnalyzed = false;

          this.storage.remove(this.config.storageKey);
        };

        Authentication.prototype.getAccessToken = function getAccessToken() {
          if (!this.responseAnalyzed) this.getDataFromResponse(this.getResponseObject());

          return this.accessToken;
        };

        Authentication.prototype.getRefreshToken = function getRefreshToken() {
          if (!this.responseAnalyzed) this.getDataFromResponse(this.getResponseObject());

          return this.refreshToken;
        };

        Authentication.prototype.getIdToken = function getIdToken() {
          if (!this.responseAnalyzed) this.getDataFromResponse(this.getResponseObject());

          return this.idToken;
        };

        Authentication.prototype.getPayload = function getPayload() {
          if (!this.responseAnalyzed) this.getDataFromResponse(this.getResponseObject());

          return this.payload;
        };

        Authentication.prototype.getIdPayload = function getIdPayload() {
          if (!this.responseAnalyzed) this.getDataFromResponse(this.getResponseObject());

          return this.idPayload;
        };

        Authentication.prototype.getExp = function getExp() {
          if (!this.responseAnalyzed) this.getDataFromResponse(this.getResponseObject());

          return this.exp;
        };

        Authentication.prototype.getTtl = function getTtl() {
          var exp = this.getExp();

          return Number.isNaN(exp) ? NaN : exp - Math.round(new Date().getTime() / 1000);
        };

        Authentication.prototype.isTokenExpired = function isTokenExpired() {
          var timeLeft = this.getTtl();

          return Number.isNaN(timeLeft) ? undefined : timeLeft < 0;
        };

        Authentication.prototype.isAuthenticated = function isAuthenticated() {
          return !!this.getAccessToken() && !this.isTokenExpired();
        };

        Authentication.prototype.getDataFromResponse = function getDataFromResponse(response) {
          var config = this.config;

          this.accessToken = typeof this.config.getAccessTokenFromResponse === 'function' ? this.config.getAccessTokenFromResponse(response) : this.getTokenFromResponse(response, config.accessTokenProp, config.accessTokenName, config.accessTokenRoot);

          this.refreshToken = null;
          if (config.useRefreshToken) {
            try {
              this.refreshToken = typeof this.config.getRefreshTokenFromResponse === 'function' ? this.config.getRefreshTokenFromResponse(response) : this.getTokenFromResponse(response, config.refreshTokenProp, config.refreshTokenName, config.refreshTokenRoot);
            } catch (e) {
              this.refreshToken = null;

              logger.warn('useRefreshToken is set, but could not extract a refresh token');
            }
          }

          this.idToken = null;
          try {
            this.idToken = this.getTokenFromResponse(response, config.idTokenProp, config.idTokenName, config.idTokenRoot);
          } catch (e) {
            this.idToken = null;
          }

          this.payload = getPayload(this.accessToken);
          this.idPayload = getPayload(this.idToken);

          this.exp = parseInt(typeof this.config.getExpirationDateFromResponse === 'function' ? this.config.getExpirationDateFromResponse(response) : this.payload && this.payload.exp, 10) || NaN;

          this.responseAnalyzed = true;

          return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            idToken: this.idToken,
            payload: this.payload,
            exp: this.exp
          };
        };

        Authentication.prototype.getTokenFromResponse = function getTokenFromResponse(response, tokenProp, tokenName, tokenRoot) {
          if (!response) return undefined;

          var responseTokenProp = tokenProp.split('.').reduce(function (o, x) {
            return o[x];
          }, response);

          if (typeof responseTokenProp === 'string') {
            return responseTokenProp;
          }

          if ((typeof responseTokenProp === 'undefined' ? 'undefined' : _typeof(responseTokenProp)) === 'object') {
            var tokenRootData = tokenRoot && tokenRoot.split('.').reduce(function (o, x) {
              return o[x];
            }, responseTokenProp);
            var _token = tokenRootData ? tokenRootData[tokenName] : responseTokenProp[tokenName];

            if (!_token) {
              var error = new Error('Token not found in response');

              error.responseObject = response;
              throw error;
            }

            return _token;
          }

          var token = response[tokenName] === undefined ? null : response[tokenName];

          if (!token) {
            var _error = new Error('Token not found in response');

            _error.responseObject = response;
            throw _error;
          }

          return token;
        };

        Authentication.prototype.toUpdateTokenCallstack = function toUpdateTokenCallstack() {
          var _this7 = this;

          return new Promise(function (resolve) {
            return _this7.updateTokenCallstack.push(resolve);
          });
        };

        Authentication.prototype.resolveUpdateTokenCallstack = function resolveUpdateTokenCallstack(response) {
          this.updateTokenCallstack.map(function (resolve) {
            return resolve(response);
          });
          this.updateTokenCallstack = [];
        };

        Authentication.prototype.authenticate = function authenticate(name) {
          var userData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var oauthType = this.config.providers[name].type;

          if (oauthType) {
            logger.warn('DEPRECATED: Setting provider.type is deprecated and replaced by provider.oauthType');
          } else {
            oauthType = this.config.providers[name].oauthType;
          }

          var providerLogin = void 0;

          if (oauthType === 'auth0-lock') {
            providerLogin = this.auth0Lock;
          } else if (oauthType === 'saml') {
            providerLogin = this.saml;
          } else {
            providerLogin = oauthType === '1.0' ? this.oAuth1 : this.oAuth2;
          }
          return providerLogin.open(this.config.providers[name], userData);
        };

        Authentication.prototype.logout = function logout(name) {
          var rtnValue = Promise.resolve('Not Applicable');

          if (this.config.providers[name].oauthType !== '2.0' || !this.config.providers[name].logoutEndpoint) {
            return rtnValue;
          }

          return this.oAuth2.close(this.config.providers[name]);
        };

        Authentication.prototype.redirect = function redirect(redirectUrl, defaultRedirectUrl, query) {
          if (redirectUrl === true) {
            logger.warn('DEPRECATED: Setting redirectUrl === true to actually *not redirect* is deprecated. Set redirectUrl === \'\' instead.');

            return;
          }

          if (redirectUrl === false) {
            logger.warn('BREAKING CHANGE: Setting redirectUrl === false to actually *do redirect* is deprecated. Set redirectUrl to undefined or null to use the defaultRedirectUrl if so desired.');
          }

          if (redirectUrl === 0) {
            logger.warn('BREAKING CHANGE: Setting redirectUrl === 0 is deprecated. Set redirectUrl to \'\' instead.');

            return;
          }

          if (redirectUrl === '') {
            return;
          }

          if (typeof redirectUrl === 'string') {
            PLATFORM.location.href = encodeURI(redirectUrl + (query ? '?' + buildQueryString(query) : ''));
          } else if (defaultRedirectUrl) {
            PLATFORM.location.href = defaultRedirectUrl + (query ? '?' + buildQueryString(query) : '');
          }
        };

        _createClass(Authentication, [{
          key: 'responseObject',
          get: function get() {
            logger.warn('Getter Authentication.responseObject is deprecated. Use Authentication.getResponseObject() instead.');

            return this.getResponseObject();
          },
          set: function set(response) {
            logger.warn('Setter Authentication.responseObject is deprecated. Use AuthServive.setResponseObject(response) instead.');
            this.setResponseObject(response);
          }
        }, {
          key: 'hasDataStored',
          get: function get() {
            logger.warn('Authentication.hasDataStored is deprecated. Use Authentication.responseAnalyzed instead.');

            return this.responseAnalyzed;
          }
        }]);

        return Authentication;
      }(), (_applyDecoratedDescriptor(_class8.prototype, 'getLoginRoute', [_dec7], Object.getOwnPropertyDescriptor(_class8.prototype, 'getLoginRoute'), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, 'getLoginRedirect', [_dec8], Object.getOwnPropertyDescriptor(_class8.prototype, 'getLoginRedirect'), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, 'getLoginUrl', [_dec9], Object.getOwnPropertyDescriptor(_class8.prototype, 'getLoginUrl'), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, 'getSignupUrl', [_dec10], Object.getOwnPropertyDescriptor(_class8.prototype, 'getSignupUrl'), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, 'getProfileUrl', [_dec11], Object.getOwnPropertyDescriptor(_class8.prototype, 'getProfileUrl'), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, 'getToken', [_dec12], Object.getOwnPropertyDescriptor(_class8.prototype, 'getToken'), _class8.prototype)), _class8)) || _class7));

      _export('Authentication', Authentication);

      _export('AuthService', AuthService = (_dec13 = inject(Authentication, BaseConfig, BindingSignaler, EventAggregator), _dec14 = deprecated({ message: 'Use .getAccessToken() instead.' }), _dec13(_class9 = (_class10 = function () {
        function AuthService(authentication, config, bindingSignaler, eventAggregator) {
          var _this8 = this;

          

          this.authenticated = false;
          this.timeoutID = 0;

          this.storageEventHandler = function (event) {
            if (event.key !== _this8.config.storageKey || event.newValue === event.oldValue) {
              return;
            }

            if (event.newValue && _this8.config.autoUpdateToken && _this8.authentication.getAccessToken() && _this8.authentication.getRefreshToken()) {
              _this8.updateAuthenticated();

              return;
            }

            logger.info('Stored token changed event');

            if (event.newValue) {
              _this8.authentication.storage.set(_this8.config.storageKey, event.newValue);
            } else {
              _this8.authentication.storage.remove(_this8.config.storageKey);
            }

            var wasAuthenticated = _this8.authenticated;

            _this8.authentication.responseAnalyzed = false;
            _this8.updateAuthenticated();

            if (wasAuthenticated === _this8.authenticated) {
              return;
            }

            if (_this8.config.storageChangedRedirect) {
              PLATFORM.location.href = _this8.config.storageChangedRedirect;
            }

            if (_this8.config.storageChangedReload) {
              PLATFORM.location.reload();
            }
          };

          this.authentication = authentication;
          this.config = config;
          this.bindingSignaler = bindingSignaler;
          this.eventAggregator = eventAggregator;

          var oldStorageKey = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
          var oldToken = authentication.storage.get(oldStorageKey);

          if (oldToken) {
            logger.info('Found token with deprecated format in storage. Converting it to new format. No further action required.');
            var fakeOldResponse = {};

            fakeOldResponse[config.accessTokenProp] = oldToken;
            this.setResponseObject(fakeOldResponse);
            authentication.storage.remove(oldStorageKey);
          }

          this.setResponseObject(this.authentication.getResponseObject());

          PLATFORM.addEventListener('storage', this.storageEventHandler);
        }

        AuthService.prototype.setTimeout = function setTimeout(ttl) {
          var _this9 = this;

          var maxTimeout = 2147483647;
          if (ttl > maxTimeout) {
            ttl = maxTimeout;
            logger.warn('Token timeout limited to ', maxTimeout, ' ms (ca 24.85d).');
          }

          this.clearTimeout();

          var expiredTokenHandler = function expiredTokenHandler() {
            if (_this9.config.autoUpdateToken && _this9.authentication.getAccessToken() && _this9.authentication.getRefreshToken()) {
              _this9.updateToken().catch(function (error) {
                return logger.warn(error.message);
              });

              return;
            }

            _this9.setResponseObject(null);

            if (_this9.config.expiredRedirect) {
              PLATFORM.location.assign(_this9.config.expiredRedirect);
            }
          };

          this.timeoutID = PLATFORM.global.setTimeout(expiredTokenHandler, ttl);
          PLATFORM.addEventListener('focus', function () {
            if (_this9.isTokenExpired()) {
              expiredTokenHandler();
            }
          });
        };

        AuthService.prototype.clearTimeout = function clearTimeout() {
          if (this.timeoutID) {
            PLATFORM.global.clearTimeout(this.timeoutID);
          }
          this.timeoutID = 0;
        };

        AuthService.prototype.setResponseObject = function setResponseObject(response) {
          this.authentication.setResponseObject(response);

          this.updateAuthenticated();
        };

        AuthService.prototype.updateAuthenticated = function updateAuthenticated() {
          this.clearTimeout();

          var wasAuthenticated = this.authenticated;

          this.authenticated = this.authentication.isAuthenticated();

          if (this.authenticated && !Number.isNaN(this.authentication.exp)) {
            this.setTimeout(this.getTtl() * 1000);
          }

          if (wasAuthenticated !== this.authenticated) {
            this.bindingSignaler.signal('authentication-change');
            this.eventAggregator.publish('authentication-change', this.authenticated);

            logger.info('Authorization changed to: ' + this.authenticated);
          }
        };

        AuthService.prototype.getMe = function getMe(criteriaOrId) {
          if (typeof criteriaOrId === 'string' || typeof criteriaOrId === 'number') {
            criteriaOrId = { id: criteriaOrId };
          }

          return this.client.find(this.config.joinBase(this.config.profileUrl), criteriaOrId);
        };

        AuthService.prototype.updateMe = function updateMe(body, criteriaOrId) {
          if (typeof criteriaOrId === 'string' || typeof criteriaOrId === 'number') {
            criteriaOrId = { id: criteriaOrId };
          }
          if (this.config.profileMethod === 'put') {
            return this.client.update(this.config.joinBase(this.config.profileUrl), criteriaOrId, body);
          }

          return this.client.patch(this.config.joinBase(this.config.profileUrl), criteriaOrId, body);
        };

        AuthService.prototype.getAccessToken = function getAccessToken() {
          return this.authentication.getAccessToken();
        };

        AuthService.prototype.getCurrentToken = function getCurrentToken() {
          return this.getAccessToken();
        };

        AuthService.prototype.getRefreshToken = function getRefreshToken() {
          return this.authentication.getRefreshToken();
        };

        AuthService.prototype.getIdToken = function getIdToken() {
          return this.authentication.getIdToken();
        };

        AuthService.prototype.isAuthenticated = function isAuthenticated(callback) {
          var _this10 = this;

          this.authentication.responseAnalyzed = false;

          var authenticated = this.authentication.isAuthenticated();

          if (!authenticated && this.config.autoUpdateToken && this.authentication.getAccessToken() && this.authentication.getRefreshToken()) {
            this.updateToken().then(function () {
              if (typeof callback === 'function') {
                callback(_this10.authenticated);
              }
            }).catch(function (error) {
              return logger.warn(error.message);
            });

            authenticated = true;
          } else if (typeof callback === 'function') {
            PLATFORM.global.setTimeout(function () {
              try {
                callback(authenticated);
              } catch (error) {
                logger.warn(error.message);
              }
            }, 1);
          }

          return authenticated;
        };

        AuthService.prototype.getExp = function getExp() {
          return this.authentication.getExp();
        };

        AuthService.prototype.getTtl = function getTtl() {
          return this.authentication.getTtl();
        };

        AuthService.prototype.isTokenExpired = function isTokenExpired() {
          return this.authentication.isTokenExpired();
        };

        AuthService.prototype.getTokenPayload = function getTokenPayload() {
          return this.authentication.getPayload();
        };

        AuthService.prototype.getIdTokenPayload = function getIdTokenPayload() {
          return this.authentication.getIdPayload();
        };

        AuthService.prototype.updateToken = function updateToken() {
          var _this11 = this;

          if (!this.authentication.getRefreshToken()) {
            return Promise.reject(new Error('refreshToken not set'));
          }

          if (this.authentication.updateTokenCallstack.length === 0) {
            var content = {
              grant_type: 'refresh_token'
            };

            if (this.config.clientId) {
              content.client_id = this.config.clientId;
            }
            if (this.config.clientSecret) {
              content.client_secret = this.config.clientSecret;
            }

            content[this.config.refreshTokenSubmitProp] = this.authentication.getRefreshToken();

            this.client.post(this.config.joinBase(this.config.refreshTokenUrl ? this.config.refreshTokenUrl : this.config.loginUrl), content, this.config.getOptionsForTokenRequests()).then(function (response) {
              _this11.setResponseObject(response);
              if (_this11.getAccessToken()) {
                _this11.authentication.resolveUpdateTokenCallstack(_this11.isAuthenticated());
              } else {
                _this11.setResponseObject(null);

                if (_this11.config.expiredRedirect) {
                  PLATFORM.location.assign(_this11.config.expiredRedirect);
                }
                _this11.authentication.resolveUpdateTokenCallstack(Promise.reject(new Error('accessToken not found in refreshToken response')));
              }
            }).catch(function (error) {
              _this11.setResponseObject(null);

              if (_this11.config.expiredRedirect) {
                PLATFORM.location.assign(_this11.config.expiredRedirect);
              }
              _this11.authentication.resolveUpdateTokenCallstack(Promise.reject(error));
            });
          }

          return this.authentication.toUpdateTokenCallstack();
        };

        AuthService.prototype.signup = function signup(displayNameOrCredentials, emailOrOptions, passwordOrRedirectUri, options, redirectUri) {
          var _this12 = this;

          var normalized = {};

          if ((typeof displayNameOrCredentials === 'undefined' ? 'undefined' : _typeof(displayNameOrCredentials)) === 'object') {
            normalized.credentials = displayNameOrCredentials;
            normalized.options = emailOrOptions;
            normalized.redirectUri = passwordOrRedirectUri;
          } else {
            normalized.credentials = {
              'displayName': displayNameOrCredentials,
              'email': emailOrOptions,
              'password': passwordOrRedirectUri
            };
            normalized.options = options;
            normalized.redirectUri = redirectUri;
          }

          return this.client.post(this.config.joinBase(this.config.signupUrl), normalized.credentials, normalized.options).then(function (response) {
            if (_this12.config.loginOnSignup) {
              _this12.setResponseObject(response);
            }
            _this12.authentication.redirect(normalized.redirectUri, _this12.config.signupRedirect);

            return response;
          });
        };

        AuthService.prototype.login = function login(emailOrCredentials, passwordOrOptions, optionsOrRedirectUri, redirectUri) {
          var _this13 = this;

          var normalized = {};

          if ((typeof emailOrCredentials === 'undefined' ? 'undefined' : _typeof(emailOrCredentials)) === 'object') {
            normalized.credentials = emailOrCredentials;
            normalized.options = this.config.getOptionsForTokenRequests(passwordOrOptions);
            normalized.redirectUri = optionsOrRedirectUri;
          } else if (typeof emailOrCredentials === 'string') {
            normalized.credentials = {
              'email': emailOrCredentials,
              'password': passwordOrOptions
            };
            normalized.options = this.config.getOptionsForTokenRequests(optionsOrRedirectUri);
            normalized.redirectUri = redirectUri;
          }

          if (this.config.clientId) {
            normalized.credentials.client_id = this.config.clientId;
          }

          if (this.config.clientSecret) {
            normalized.credentials.client_secret = this.config.clientSecret;
          }

          return this.client.post(this.config.joinBase(this.config.loginUrl), normalized.credentials, normalized.options).then(function (response) {
            _this13.setResponseObject(response);

            _this13.authentication.redirect(normalized.redirectUri, _this13.config.loginRedirect);

            return response;
          });
        };

        AuthService.prototype.logout = function logout(redirectUri, query, name) {
          var _this14 = this;

          var localLogout = function localLogout(response) {
            return new Promise(function (resolve) {
              _this14.setResponseObject(null);

              _this14.authentication.redirect(redirectUri, _this14.config.logoutRedirect, query);

              if (typeof _this14.onLogout === 'function') {
                _this14.onLogout(response);
              }
              resolve(response);
            });
          };

          if (name) {
            if (this.config.providers[name].logoutEndpoint) {
              return this.authentication.logout(name).then(function (logoutResponse) {
                var stateValue = _this14.authentication.storage.get(name + '_state');

                if (logoutResponse.state !== stateValue) {
                  return Promise.reject('OAuth2 response state value differs');
                }

                return localLogout(logoutResponse);
              });
            }
          } else {
            return this.config.logoutUrl ? this.client.request(this.config.logoutMethod, this.config.joinBase(this.config.logoutUrl)).then(localLogout).catch(localLogout) : localLogout();
          }
        };

        AuthService.prototype.authenticate = function authenticate(name, redirectUri, userData) {
          var _this15 = this;

          return this.authentication.authenticate(name, userData).then(function (response) {
            _this15.setResponseObject(response);

            _this15.authentication.redirect(redirectUri, _this15.config.loginRedirect);

            return response;
          });
        };

        AuthService.prototype.unlink = function unlink(name, redirectUri) {
          var _this16 = this;

          var unlinkUrl = this.config.joinBase(this.config.unlinkUrl) + name;

          return this.client.request(this.config.unlinkMethod, unlinkUrl).then(function (response) {
            _this16.authentication.redirect(redirectUri);

            return response;
          });
        };

        _createClass(AuthService, [{
          key: 'client',
          get: function get() {
            return this.config.client;
          }
        }, {
          key: 'auth',
          get: function get() {
            logger.warn('AuthService.auth is deprecated. Use .authentication instead.');

            return this.authentication;
          }
        }]);

        return AuthService;
      }(), (_applyDecoratedDescriptor(_class10.prototype, 'getCurrentToken', [_dec14], Object.getOwnPropertyDescriptor(_class10.prototype, 'getCurrentToken'), _class10.prototype)), _class10)) || _class9));

      _export('AuthService', AuthService);

      _export('AuthenticateStep', AuthenticateStep = (_dec15 = inject(AuthService), _dec15(_class12 = function () {
        function AuthenticateStep(authService) {
          

          this.authService = authService;
        }

        AuthenticateStep.prototype.run = function run(routingContext, next) {
          var isLoggedIn = this.authService.authenticated;
          var loginRoute = this.authService.config.loginRoute;

          if (routingContext.getAllInstructions().some(function (route) {
            return route.config.auth === true;
          })) {
            if (!isLoggedIn) {
              return next.cancel(new Redirect(loginRoute));
            }
          } else if (isLoggedIn && routingContext.getAllInstructions().some(function (route) {
            return route.fragment === loginRoute;
          })) {
            return next.cancel(new Redirect(this.authService.config.loginRedirect));
          }

          return next();
        };

        return AuthenticateStep;
      }()) || _class12));

      _export('AuthenticateStep', AuthenticateStep);

      _export('AuthorizeStep', AuthorizeStep = (_dec16 = inject(AuthService), _dec16(_class13 = function () {
        function AuthorizeStep(authService) {
          

          logger.warn('AuthorizeStep is deprecated. Use AuthenticateStep instead.');

          this.authService = authService;
        }

        AuthorizeStep.prototype.run = function run(routingContext, next) {
          var isLoggedIn = this.authService.isAuthenticated();
          var loginRoute = this.authService.config.loginRoute;

          if (routingContext.getAllInstructions().some(function (route) {
            return route.config.auth;
          })) {
            if (!isLoggedIn) {
              return next.cancel(new Redirect(loginRoute));
            }
          } else if (isLoggedIn && routingContext.getAllInstructions().some(function (route) {
            return route.fragment === loginRoute;
          })) {
            return next.cancel(new Redirect(this.authService.config.loginRedirect));
          }

          return next();
        };

        return AuthorizeStep;
      }()) || _class13));

      _export('AuthorizeStep', AuthorizeStep);

      _export('FetchConfig', FetchConfig = (_dec17 = inject(HttpClient, Config, AuthService, BaseConfig), _dec17(_class14 = function () {
        function FetchConfig(httpClient, clientConfig, authService, config) {
          

          this.httpClient = httpClient;
          this.clientConfig = clientConfig;
          this.authService = authService;
          this.config = config;
        }

        FetchConfig.prototype.configure = function configure(client) {
          var _this17 = this;

          if (Array.isArray(client)) {
            var configuredClients = [];

            client.forEach(function (toConfigure) {
              configuredClients.push(_this17.configure(toConfigure));
            });

            return configuredClients;
          }

          if (typeof client === 'string') {
            var endpoint = this.clientConfig.getEndpoint(client);

            if (!endpoint) {
              throw new Error('There is no \'' + (client || 'default') + '\' endpoint registered.');
            }
            client = endpoint.client;
          } else if (client instanceof Rest) {
            client = client.client;
          } else if (!(client instanceof HttpClient)) {
            client = this.httpClient;
          }

          client.interceptors.push(this.interceptor);

          return client;
        };

        _createClass(FetchConfig, [{
          key: 'interceptor',
          get: function get() {
            var _this18 = this;

            return {
              request: function (_request) {
                function request(_x3) {
                  return _request.apply(this, arguments);
                }

                request.toString = function () {
                  return _request.toString();
                };

                return request;
              }(function (request) {
                if (!_this18.config.httpInterceptor || !_this18.authService.isAuthenticated()) {
                  return request;
                }
                var token = _this18.authService.getAccessToken();

                if (_this18.config.authTokenType) {
                  token = _this18.config.authTokenType + ' ' + token;
                }

                request.headers.set(_this18.config.authHeader, token);

                return request;
              }),
              response: function (_response) {
                function response(_x4, _x5) {
                  return _response.apply(this, arguments);
                }

                response.toString = function () {
                  return _response.toString();
                };

                return response;
              }(function (response, request) {
                return new Promise(function (resolve, reject) {
                  if (response.ok) {
                    return resolve(response);
                  }

                  if (response.status !== 401) {
                    return resolve(response);
                  }

                  if (!_this18.authService.authenticated) {
                    return reject(response);
                  }

                  if (_this18.config.httpInterceptor && _this18.config.logoutOnInvalidToken && !_this18.authService.isTokenExpired()) {
                    return reject(_this18.authService.logout());
                  }

                  if (!_this18.config.httpInterceptor || !_this18.authService.isTokenExpired()) {
                    return resolve(response);
                  }

                  if (!_this18.config.useRefreshToken || !_this18.authService.getRefreshToken()) {
                    return resolve(response);
                  }

                  resolve(_this18.authService.updateToken().then(function () {
                    var token = _this18.authService.getAccessToken();

                    if (_this18.config.authTokenType) {
                      token = _this18.config.authTokenType + ' ' + token;
                    }

                    request.headers.set(_this18.config.authHeader, token);

                    return _this18.httpClient.fetch(request).then(resolve);
                  }));
                });
              })
            };
          }
        }]);

        return FetchConfig;
      }()) || _class14));

      _export('FetchConfig', FetchConfig);
    }
  };
});