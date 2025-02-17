/**
 * Contaxy API
 * Functionality to create and manage projects, services, jobs, and files.
 *
 * The version of the OpenAPI document: 0.0.6
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The BodyIntrospectTokenAuthOauthIntrospectPost model module.
 * @module model/BodyIntrospectTokenAuthOauthIntrospectPost
 * @version 0.0.6
 */
class BodyIntrospectTokenAuthOauthIntrospectPost {
  /**
   * Constructs a new <code>BodyIntrospectTokenAuthOauthIntrospectPost</code>.
   * @alias module:model/BodyIntrospectTokenAuthOauthIntrospectPost
   * @param token {String} The token that should be instrospected.
   */
  constructor(token) {
    BodyIntrospectTokenAuthOauthIntrospectPost.initialize(this, token);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj, token) {
    obj['token'] = token;
  }

  /**
   * Constructs a <code>BodyIntrospectTokenAuthOauthIntrospectPost</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BodyIntrospectTokenAuthOauthIntrospectPost} obj Optional instance to populate.
   * @return {module:model/BodyIntrospectTokenAuthOauthIntrospectPost} The populated <code>BodyIntrospectTokenAuthOauthIntrospectPost</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new BodyIntrospectTokenAuthOauthIntrospectPost();

      if (data.hasOwnProperty('token')) {
        obj['token'] = ApiClient.convertToType(data['token'], 'String');
      }
      if (data.hasOwnProperty('token_type_hint')) {
        obj['token_type_hint'] = ApiClient.convertToType(
          data['token_type_hint'],
          'String'
        );
      }
    }
    return obj;
  }
}

/**
 * The token that should be instrospected.
 * @member {String} token
 */
BodyIntrospectTokenAuthOauthIntrospectPost.prototype['token'] = undefined;

/**
 * A hint about the type of the token submitted for introspection (e.g. `access_token`, `id_token` and `refresh_token`).
 * @member {String} token_type_hint
 */
BodyIntrospectTokenAuthOauthIntrospectPost.prototype[
  'token_type_hint'
] = undefined;

export default BodyIntrospectTokenAuthOauthIntrospectPost;
