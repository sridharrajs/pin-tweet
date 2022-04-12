const request = require('request');
const cheerio = require('cheerio');

/**
 * Attempts to fetch title of a page,
 * incase of failure uses URL of the page to
 * be the title
 * @param {*} url 
 * @returns 
 */
function fetchTitle(url) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (error || response.statusCode !== 200) {
                return resolve(encodeURI(url));
            }

            var $ = cheerio.load(body);

            // if the title doesnt exist use URL
            title = resolve($("head > title").text().trim() || url);

            // for cases if the title has unescapeable characters
            // we can use encode URL
            return encodeURI(fetchTitle);
        });
    });
}

module.exports = { fetchTitle };