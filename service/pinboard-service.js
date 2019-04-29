'use strict';

const fetch = require("node-fetch");
const PINBOARD_API_TOKEN = process.env.PINBOARD_API_TOKEN;

/**
 * Ref https://pinboard.in/api#posts_add
 * @param articleUrl
 * @param title
 * @returns {Promise<Response>}
 */

function addUrl({ articleUrl, title }) {
  return fetch(`https://api.pinboard.in/v1/posts/add?auth_token=${PINBOARD_API_TOKEN}&format=json&url=${encodeURI(articleUrl)}&description=${title}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });
}

module.exports = {
  addUrl
};
