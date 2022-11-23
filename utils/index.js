const timeUtils = require('./time-utils');
const urlUtils = require('./url-utils');
const textUtils = require('./text-utils');

module.exports = {
  ...timeUtils,
  ...urlUtils,
  ...textUtils,
};