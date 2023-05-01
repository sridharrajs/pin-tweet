'use strict';

const CronJob = require('cron').CronJob;
const dotenv = require('dotenv').config();

const { stripHTML, getHumanReadableTime } = require('./utils');
const environment = require('./bin/assert-env');

environment.assertAll({ dotenv, services: ['twitter', 'pinboard', 'telegram'] });

const pinboardService = require('./service/pinboard-service');
const twitterService = require('./service/twitter-service');
const telegramService = require('./service/telegram-bot-service');
const { fetchBookmark, unBookmark } = require('./service/mastodon-service');

function processTweet(tweet) {
  return pinboardService.addUrl(tweet).then(() => {
    return twitterService.destroyLikes(tweet.id);
  });
}

function pinTweets() {
  twitterService.listLikes().then(tweets => {
    return Promise.all(tweets.map(tweet => processTweet(tweet)));
  }).then((tweets) => {
    console.log(`Completed posting ${tweets.length} tweets at ${getHumanReadableTime()}`);
  }).catch(err => {
    console.log('Error', err);
  });
}

async function pinToots() {
  const { data: bookmarks } = await fetchBookmark()
  console.log(`Total bookmark fetched ${bookmarks.length}`);

  for (const bookmark of bookmarks) {
    const { id, content, url: articleUrl } = bookmark;
    const title = stripHTML(content);

    pinboardService.addUrl({
      articleUrl, title
    }).then(() => {
      unBookmark(id)
    }).catch(e => {
      console.error(e, {
        articleUrl, title
      });
    })

  }
}

// to work around SSL issues in some environment.
// https://stackoverflow.com/questions/51995925/node-fetch-request-fails-on-server-unable-to-get-local-issuer-certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// runs once every 30 minutes
new CronJob('*/30 * * * * *', () => {

  pinTweets();
  pinToots();

  console.log('Polling at => ', getHumanReadableTime());

}, null, true);

telegramService.listen();