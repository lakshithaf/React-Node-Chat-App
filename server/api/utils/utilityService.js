"use strict";
/**
 * Cheack the prameters are empty or null
 * @returns boolean return value
 */

module.exports = {
  checkParams: params => {
    let paramsArray = [];
    Object.keys(params).forEach(data => {
      paramsArray = [...paramsArray, params[data]];
    });
    return !paramsArray.every(checkData => !checkData);
  }
};
