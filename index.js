'use strict';

const dotenv = require('dotenv').config();

const {
  TWITTER_SCREEN_NAME,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_KEY_SECRET
} = process.env;

const assertUtils = require('./utils/assert-utils');
assertUtils.checkBootSettings(dotenv);

const timeUtils = require('./utils/time-utils');

const CronJob = require('cron').CronJob;

const twitterService = require('./service/twitter-service');
const pinboardService = require('./service/pinboard-service');

function processTweet(tweet) {
  return pinboardService.addUrl(tweet).then(() => {
    return twitterService.destroyLikes(tweet.id);
  });
}

new CronJob('0 */1 * * * *', () => { // runs at 1st second of every minute

  twitterService.listLikes().then(tweets => {
    return Promise.all(tweets.map(tweet => processTweet(tweet)));
  }).then(() => {
    console.log(`Completed posting all tweets at ${timeUtils.getHumanReadableTime()}`);
  }).catch(err => {
    console.log('Error', err);
  });

}, null, true);
