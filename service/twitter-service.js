'use strict';

const { TwitterApi } = require('twitter-api-v2');

const {
  TWITTER_ID,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_KEY_SECRET,
} = process.env;

const client = new TwitterApi({
  appKey: TWITTER_CONSUMER_KEY,
  appSecret: TWITTER_CONSUMER_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN_KEY,
  accessSecret: TWITTER_ACCESS_TOKEN_KEY_SECRET,
});

function listLikes() {
  return client.v2.get(`users/${TWITTER_ID}/liked_tweets`, {
    expansions: ['referenced_tweets.id.author_id'],
    'user.fields': ['username', 'description', 'name'],
  }).then((tweets) => {
    const { data = [], includes: { users: authors = [] } = {} } = tweets;
    return data?.map(tweet => {
      const { id, author_id: authorId, text } = tweet;
      const authorUserName = authors.find(user => user.id === authorId)?.username ?? 'twitter';
      return {
        id,
        title: text,
        articleUrl: `https://twitter.com/${authorUserName}/status/${id}`,
        entities: tweet.entities,
        tweetBy: authorUserName,
      }
    })
  }).catch(err => {
    console.error('Error in twitter-service:listLikes()', err);
    return [];
  });
}``

function destroyLikes(id) {
  return client.v2.unlike(TWITTER_ID, id).catch(err => {
    console.error('Error in twitter-service:destroyLikes()', err);
  })
}

module.exports = {
  listLikes,
  destroyLikes
};
