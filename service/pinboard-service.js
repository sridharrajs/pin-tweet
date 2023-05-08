const axios = require('axios');

const { getTags } = require('./tagging-service');
const { removeTrackers } = require('../utils');

const { PINBOARD_API_TOKEN } = process.env;

const getAddBookmarkEndpoint = ({ articleUrl, title, entities }) => {
  const addBookmarkEndpoint = new URL('https://api.pinboard.in/v1/posts/add');
  addBookmarkEndpoint.searchParams.set('format', 'json')
  addBookmarkEndpoint.searchParams.set('auth_token', PINBOARD_API_TOKEN)
  addBookmarkEndpoint.searchParams.set('url', removeTrackers(articleUrl))
  addBookmarkEndpoint.searchParams.set('description', title)

  const tags = getTags({ articleUrl, title, entities });
  tags.length > 0 && addBookmarkEndpoint.searchParams.set('tags', tags);

  return addBookmarkEndpoint.toString();
}

/**
 * Ref https://pinboard.in/api#posts_add
 * @param articleUrl
 * @param title
 * @param entities
 * @returns {Promise<Response>}
 */

function addUrl({ articleUrl, title, entities }) {
  const addBookmarkEndpoint = getAddBookmarkEndpoint({ articleUrl, title, entities });

  return axios.post(addBookmarkEndpoint.toString()).then(res => {
    return { ...res.data, tags };
  });
}

module.exports = {
  addUrl,
  getAddBookmarkEndpoint
};
