/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let storedTransformPropertyName_;

/**
 * Remap touch events to pointer events, if the browser doesn't support touch events.
 * @param {string} eventName The requested event name.
 * @param {Object} globalObj The global object, useful for testing (defaults to window).
 * @return {string} The remapped event name.
 */
function remapEvent(eventName, globalObj = window) {
  if (!('ontouchstart' in globalObj.document)) {
    switch (eventName) {
      case 'touchstart':
        return 'pointerdown';
      case 'touchmove':
        return 'pointermove';
      case 'touchend':
        return 'pointerup';
      default:
        return eventName;
    }
  }

  return eventName;
}

/**
 * Choose the correct transform property to use on the current browser.
 * @param {Object} globalObj The global object, useful for testing (defaults to window).
 * @return {string} The transform property name.
 */
function getTransformPropertyName(globalObj = window) {
  if (storedTransformPropertyName_ === undefined || globalObj !== window) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = ('transform' in el.style ? 'transform' : '-webkit-transform');

    if (globalObj === window) {
      storedTransformPropertyName_ = transformPropertyName;
    }
    return transformPropertyName;
  }

  return storedTransformPropertyName_;
}

/**
 * Determine whether the current browser supports CSS properties.
 * @param {Object} globalObj The global object, useful for testing (defaults to window).
 * @return {boolean} Whether the current browser supports CSS properties.
 */
function supportsCssCustomProperties(globalObj = window) {
  return globalObj.CSS.supports('(--color: red)');
}

export {remapEvent, getTransformPropertyName, supportsCssCustomProperties};
