const { text: textRules } = require('../rules.json');

function getTags({ articleUrl, title, entities }) {
  const tags = [];

  for (const [word, tag] of Object.entries(textRules)) {
    const isUrlMatching = new RegExp(word, 'gi').test(articleUrl);
    const isTitleMatching = new RegExp(word, 'gi').test(title);
    if (isTitleMatching || isUrlMatching) {
      tags.push(tag);
    }
  }

  if (entities && entities.urls) {
    // url rules based on the media url that the tweet has
    for (const url of entities.urls) {
      const { expanded_url: linkURL } = url;
      for (const [word, tag] of Object.entries(textRules)) {
        if (new RegExp(word, 'gi').test(linkURL)) {
          tags.push(tag);
        }
      }
    }
  }

  console.log(tags);

  return tags;
}

module.exports = { getTags }