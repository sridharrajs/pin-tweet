'use strict';

const chalk = require('chalk');

const ATTRIBUTES = [
  'TWITTER_CONSUMER_KEY',
  'TWITTER_CONSUMER_SECRET',
  'TWITTER_ACCESS_TOKEN_KEY',
  'TWITTER_ACCESS_TOKEN_KEY_SECRET',
  'TWITTER_SCREEN_NAME'
];

function checkBootSettings(dotenv) {
  if (dotenv.error) {
    console.trace(chalk.red('.env file is missing'));
    process.exit(0);
  }

  for (let attribute of ATTRIBUTES) {
    if (!process.env[attribute]) {
      console.log(`Please set value for ${chalk.red(attribute)}`);
      process.exit(0);
    }
  }
}

module.exports = {
  checkBootSettings
};
