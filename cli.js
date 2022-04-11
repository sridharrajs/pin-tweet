const dotenv = require('dotenv').config();
const environment = require('./bin/assert-env');

const pinboardService = require('./service/pinboard-service');
const crawlerService = require('./service/crawler-service');

environment.assertAll({ dotenv, services: ['pinboard'] });

const urls = [
];

for (let articleUrl of urls) {
    crawlerService.fetchTitle(articleUrl).then((title) => {
        return pinboardService.addUrl({ articleUrl, title })
    }).then(info => {
        console.log('Success', info);
    }).catch(err => {
        console.log('Error', {
            status: err.status,
            statusText: err.statusText
        });
    });
}
