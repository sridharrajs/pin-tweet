const { getAddBookmarkEndpoint } = require('./pinboard-service')
const { removeTrackers } = require('../utils')

jest.mock('../utils')

const articleURL = 'https://example.org';
const entities = [];

describe('getAddBookmarkEndpoint()', () => {
  it('should return full URL for happy path', () => {
    const title = 'sample';
    removeTrackers.mockReturnValueOnce(articleURL)
    const addBookmarkEndpoint = getAddBookmarkEndpoint({ articleURL, title, entities })
    const encodedURIArticleURL = encodeURIComponent(articleURL)
    expect(addBookmarkEndpoint).toEqual(`https://api.pinboard.in/v1/posts/add?format=json&auth_token=PINBOARD_TOKEN_HERE&url=${encodedURIArticleURL}&description=${title}`);
  })
  it('should return URL with tags if applicable', () => {
    removeTrackers.mockReturnValueOnce(articleURL)
    const title = 'some javascript article'
    const addBookmarkEndpoint = getAddBookmarkEndpoint({ articleURL, title, entities })
    const queryParams = [
      'format=json',
      `auth_token=PINBOARD_TOKEN_HERE`,
      `url=${encodeURIComponent(articleURL)}`,
      `description=some+javascript+article`,
      `tags=js`
    ]
    expect(addBookmarkEndpoint).toEqual(`https://api.pinboard.in/v1/posts/add?${queryParams.join('&')}`);
  })
});