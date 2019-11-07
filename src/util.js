/** K.Arthur 4/18/2019 */

/**
 * execute function ignoring error, because of defect of javascript, you often
 * not sure whether callback is function, instead of throw error, protective code
 * may be better choice
 * @param callback
 * @return {*}
 * @private
 */
function _safe(callback) {
  try {
    return callback();
  } catch (error) {
    return null;
  }
}

/**
 * use for series execution
 * @param rest
 * @return {function(*): *}
 * @private
 */
function _pipe(...rest) {
  return data => {
    for (let idx = 0; idx < rest.length; idx++) {
      data = _safe(() => rest[idx][0](data));
    }
    return data;
  };
}

/**
 * use for mocking random fail, it's useful when you want to simulate
 * real network http request
 * @param failPercent
 * @return {boolean}
 * @private
 */
function _rand(failPercent) {
  return Math.random() < failPercent / 100;
}

export default {
  _safe,
  _pipe,
  _rand
};
