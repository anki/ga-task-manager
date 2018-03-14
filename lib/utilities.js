/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Modifications Copyright (C) 2017 Anki, Inc.
 */

/**
 * A small shim of Object.assign that aims for brevity over spec-compliant
 * handling all the edge cases.
 * @param {!Object} target The target object to assign to.
 * @param {...?Object} sources Additional objects who properties should be
 *     assigned to target. Non-objects are converted to objects.
 * @return {!Object} The modified target object.
 */
export const assign = Object.assign || function(target, ...sources) {
  for (let i = 0, len = sources.length; i < len; i++) {
    const source = Object(sources[i]);
    for (let key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};


/**
 * Capitalizes the first letter of a string.
 * @param {string} str The input string.
 * @return {string} The capitalized string
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
