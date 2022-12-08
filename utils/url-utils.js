const normalizeUrl = require('normalize-url');

const { trackers = [] } = require('../rules.json');

function removeTrackers(url) {
  return normalizeUrl(url, {
    stripHash: true,
    removeQueryParameters: trackers
  });
}

module.exports = {
  removeTrackers,
};