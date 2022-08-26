require('dotenv').config()
const { App } = require('@slack/bolt');


const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

const Kusty = {
    token: process.env.KUSTOMER_API_TOKEN
  }

/* Add functionality here */
app.event('app_mention', ({ event, say }) => {
    console.log(event)

    
  });


(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();