'use strict';

const { promisify } = require('util');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_KEY_SECRET,
});

const SCREEN_NAME = process.env.TWITTER_SCREEN_NAME;

/**
 * API for Twitter service
 * listLikes = https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list
 * listLikes = https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-favorites-destroy
 */

function listLikes() {
  return promisify(client.get.bind(client))('favorites/list', {
    screen_name: SCREEN_NAME,
    tweet_mode: 'extended',
    count: 5 // 20 can be the MAX
  }).then(tweets => {
    return tweets.map(tweet => {
      return {
        id: tweet.id_str,
        title: tweet.full_text,
        articleUrl: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
      }
    });
  });
}


function destroyLikes(id) {
  return promisify(client.post.bind(client))('favorites/destroy', {
    id: `${id}`
  });
}

module.exports = {
  listLikes,
  destroyLikes
};
