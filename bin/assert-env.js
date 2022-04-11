'use strict';

const chalk = require('chalk');
const fs = require('fs');

const ATTRIBUTES = {
  twitter: [
    'TWITTER_CONSUMER_KEY',
    'TWITTER_CONSUMER_SECRET',
    'TWITTER_ACCESS_TOKEN_KEY',
    'TWITTER_ACCESS_TOKEN_KEY_SECRET',
    'TWITTER_SCREEN_NAME',
  ],
  pinboard: ['PINBOARD_API_TOKEN'],
};

function assertTokens(services) {
  const requiredAttributes = services.flatMap(service => ATTRIBUTES[service]);
  
  for (let attribute of requiredAttributes) {
    if (!process.env[attribute]) {
      console.log(`Please set value for ${chalk.red(attribute)}`);
      process.exit(0);
    }
  }

}

function assertRule() {
  if (!fs.existsSync('./rules.json')) {
    console.log(chalk.red('Rules are not defined!, please set rules.json based on rules.sample.json'));
    process.exit(0);
  }
}

function assertEnv(dotenv) {
  if (dotenv.error) {
    console.trace(chalk.red('.env file is missing'));
    process.exit(0);
  }
}

function assertAll({ dotenv, services = [] }) {
  assertEnv(dotenv);
  assertRule();
  assertTokens(services);
}

module.exports = {
  assertAll,
  assertEnv,
  assertTokens,
  assertRule
};
