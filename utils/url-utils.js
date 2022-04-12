const normalizeUrl = require('normalize-url');

function removeTrackers(url) {
    return normalizeUrl(url, {
        stripHash: true,
        removeQueryParameters: [
            'ref',
            'utm_campaign',
            'utm_medium',
            'utm_source'
        ]
    });
}

module.exports = {
    removeTrackers,
};