var request = require('request');
var cheerio = require('cheerio');

function fetchTitle(url) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {

            if (error || response.statusCode !== 200) {
                return resolve('title is missing');
            }
            var $ = cheerio.load(body);
            return resolve($("head > title").text().trim());
        });
    });
}

module.exports = { fetchTitle };