import {inject} from 'aurelia-dependency-injection';
import extend from 'extend';
import {Storage} from './storage';
import {Popup} from './popup';
import {BaseConfig} from './baseConfig';

/**
 * Saml service class
 *
 * @export
 * @class Saml
 */
@inject(Storage, Popup, BaseConfig)
export class Saml {
    /**
     * Creates an instance of OAuth2.
     *
     * @param {Storage} storage The Storage instance
     * @param {Popup}   popup   The Popup instance
     * @param {Config}  config  The Config instance
     *
     * @memberOf Saml
     */
    constructor(storage: Storage, popup: Popup, config: BaseConfig) {
        this.storage      = storage;
        this.config       = config;
        this.popup        = popup;
        this.defaults     = {
            url                  : null,
            name                 : null,
            state                : null,
            scope                : null,
            scopeDelimiter       : null,
            redirectUri          : null,
            popupOptions         : null,
            authorizationEndpoint: null,
            responseParams       : null,
            requiredUrlParams    : null,
            optionalUrlParams    : null,
        };
    }

    /**
     * Open OAuth2 flow
     *
     * @param {{}} options  OAuth2 and dialog options
     * @param {{}} userData Extra data for the authentications server
     * @returns {Promise<any>} Authentication server response
     *
     * @memberOf Saml
     */
    open(options: {}, userData: {}): Promise<any> {
        const provider = extend(true, {}, this.defaults, options);
        const popup = this.popup.open(options.url, provider.name, provider.popupOptions);
        const openPopup = (this.config.platform === 'mobile')
            ? popup.eventListener(provider.redirectUri)
            : popup.pollPopup();

        return openPopup.then(qs => {
            return {
                "access_token": qs.access_token
            }
        })
    }
}
