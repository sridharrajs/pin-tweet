'use strict';

const fetch = require("node-fetch");

const { PINBOARD_API_TOKEN } = process.env;
const rules = require('../rules.json');


function getTags(description) {
  const tags = [];
  const text = description.toLowerCase();
  for (const word of Object.keys(rules)) {
    if (text.includes(word)) {
      tags.push(rules[text]);
    }
  }
  return tags;
}

/**
 * Ref https://pinboard.in/api#posts_add
 * @param articleUrl
 * @param title
 * @returns {Promise<Response>}
 */

function addUrl({ articleUrl, title }) {
  const queryParams = [
    'format=json',
    `auth_token=${PINBOARD_API_TOKEN}`,
    `url=${articleUrl}`,
    `description=${title}`,
    `tags=${getTags(title)}`
  ];
  return fetch(encodeURI(`https://api.pinboard.in/v1/posts/add?${queryParams.join('&')}`), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

module.exports = {
  addUrl
};
