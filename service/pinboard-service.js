'use strict';

const fetch = require("node-fetch");

const { PINBOARD_API_TOKEN } = process.env;
const rules = require('../rules.json');

const textRules = rules.text;
const urlRules = rules.urls;

function getTags({ title, entities }) {
  const tags = [];

  const text = title.toLowerCase();
  // text rules based on the content
  for (const word of Object.keys(textRules)) {
    if (text.includes(word)) {
      tags.push(textRules[word]);
    }
  }

  const urls = entities && entities.urls;
  // url rules based on the media url that the tweet has
  for (const url of urls) {
    const { display_url: displayUrl } = url;
    for (const urlRule of Object.keys(urlRules)) {
      if (displayUrl.includes(urlRule)) {
        tags.push(urlRules[urlRule]);
      }
    }
  }

  return tags;
}

/**
 * Ref https://pinboard.in/api#posts_add
 * @param articleUrl
 * @param title
 * @param entities
 * @returns {Promise<Response>}
 */

function addUrl({ articleUrl, title, entities }) {
  const queryParams = [
    'format=json',
    `auth_token=${PINBOARD_API_TOKEN}`,
    `url=${articleUrl}`,
    `description=${title}`,
    `tags=${getTags({ title, entities })}`
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
