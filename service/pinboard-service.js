const axios = require('axios');

const { getTags } = require('./tagging-service');

const { PINBOARD_API_TOKEN } = process.env;


/**
 * Ref https://pinboard.in/api#posts_add
 * @param articleUrl
 * @param title
 * @param entities
 * @returns {Promise<Response>}
 */

function addUrl({ articleUrl, title, entities }) {
  const tags = getTags({ articleUrl, title, entities });
  const queryParams = [
    'format=json',
    `auth_token=${PINBOARD_API_TOKEN}`,
    `url=${encodeURI(articleUrl)}`,
    `description=${encodeURIComponent(title)}`,
    (tags.length > 0 ? `tags=${tags}` : [])
  ];

  return axios.post(`https://api.pinboard.in/v1/posts/add?${queryParams.join('&')}`).then(res => {
    return { ...res.data, tags };
  });
}

module.exports = {
  addUrl
};
