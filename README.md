# Pin-tweet

This is a cron job that moves your favourited tweets to your [pinboard account](https://pinboard.in/)

### Uses

    Nodejs v8.15.0

### Installation

   1. Generate your [Twitter API](https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens.html) and [Pinboard API](https://pinboard.in/settings/password) credentials.
   
   2. Create a `.env` file by referencing `.env.sample` file and paste in your keys.
   
   3. Install all the dependencies
   
   
    npm i
    
### Development

Create a new `rules.json` based on `rules.sample.json`. 

    cp rules.sample.json rules.json
    
Add rules based on your needs. Once that is done, you can start the app.


To develop the app locally,

    npm run dev  
    
To run the app as application without wanting to reload any dev changes,

    npm run start    

### Deployment

If you want to deploy using [`pm2`](https://pm2.keymetrics.io/),

    npm run deploy

If you want to deploy using any other node process managers, please modify the `deploy` script.

## Others

You can check `postman/` for the exploring the APIs that this app uses.


### License

MIT
