# Pin-tweet

This is a cron job that moves your favourited tweets to your [pinboard account](https://pinboard.in/)

### Uses

    Nodejs v8.15.0

### Installation

   1. Generate your [Twitter API](https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens.html) and [Pinboard API](https://pinboard.in/settings/password) credentials.
   
   2. Create a `.env` file by referencing `.env.sample` file and paste in your keys.
   
   3. Install all the dependencies
   
   
    npm i
    
### Deployment

You can run the app using the pm2 or similar process manager for nodejs

     npm start
     
### Development

To develop the app locally,

    npm run dev  

You can check `postman/` for the exploring the APIs that this app uses.

### License

MIT
