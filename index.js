'use strict';

const CronJob = require('cron').CronJob;
const dotenv = require('dotenv').config();
const timeUtils = require('./utils/time-utils');

const environment = require('./bin/assert-env');

environment.assertAll({ dotenv, services: ['twitter', 'pinboard', 'telegram'] });

const twitterService = require('./service/twitter-service');
const pinboardService = require('./service/pinboard-service');
const telegramService = require('./service/telegram-bot-service');

function processTweet(tweet) {
  return pinboardService.addUrl(tweet).then(() => {
    return twitterService.destroyLikes(tweet.id);
  });
}

// to work around SSL issues in some environment.
// https://stackoverflow.com/questions/51995925/node-fetch-request-fails-on-server-unable-to-get-local-issuer-certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

new CronJob('0 */1 * * * *', () => { // runs at 1st second of every minute

  twitterService.listLikes().then(tweets => {
    return Promise.all(tweets.map(tweet => processTweet(tweet)));
  }).then((tweets) => {
    console.log(`Completed posting ${tweets.length} tweets at ${timeUtils.getHumanReadableTime()}`);
  }).catch(err => {
    console.log('Error', err);
  });

  console.log('Polling Twitter => ', timeUtils.getHumanReadableTime());

}, null, true);

telegramService.listen();