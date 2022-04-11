'use strict';

const fetch = require("node-fetch");

const {
  text: textRules,
  urls: urlRules,
  screen_name: screenNameRules
} = require('../rules.json');

const { PINBOARD_API_TOKEN } = process.env;

function getTags({ title, entities, tweetBy }) {
  const tags = [];

  const text = title.toLowerCase();
  // text rules based on the content
  for (const word of Object.keys(textRules)) {
    if (text.includes(word)) {
      tags.push(textRules[word]);
    }
  }

  if (entities && entities.urls) {
    // url rules based on the media url that the tweet has
    for (const url of entities.urls) {
      const { display_url: displayUrl } = url;
      for (const urlRule of Object.keys(urlRules)) {
        if (displayUrl.includes(urlRule)) {
          tags.push(urlRules[urlRule]);
        }
      }
    }
  }

  if (Object.keys(screenNameRules).includes(tweetBy)) {
    tags.push(screenNameRules[tweetBy]);
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

function addUrl({ articleUrl, title, entities, tweetBy }) {
  const queryParams = [
    'format=json',
    `auth_token=${PINBOARD_API_TOKEN}`,
    `url=${articleUrl}`,
    `description=${title}`,
    `tags=${getTags({ title, entities, tweetBy })}`
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
