const axios = require('axios')

const { MASTODON_HOST, MASTODON_ACCESS_TOKEN } = process.env

function fetchBookmark() {
  return axios({
    url: `${MASTODON_HOST}/api/v1/bookmarks`,
    params: {
      limit: 5,
    },
    method: 'GET',
    headers: {
      Authorization: `Bearer ${MASTODON_ACCESS_TOKEN}`,
      'accept-encoding': null
    }
  });
}

function unBookmark(id) {
  return axios({
    url: `${MASTODON_HOST}/api/v1/statuses/${id}/unbookmark`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MASTODON_ACCESS_TOKEN}`,
      'accept-encoding': null
    }
  });
}

module.exports = {
  unBookmark,
  fetchBookmark
}