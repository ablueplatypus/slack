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
const sendToKustomer = (body, token) => {
    console.log(body)
      return fetch('https://api.kustomerapp.com/v1/hooks/form/622fb8c637c9d9f46c7389d6/0c0bc9c9b450764228dc68364d70592979d4d67a78f16f163037cf32decf3f65', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: body && JSON.stringify(body)
        })
          .then(resp => resp.json())
  }

app.event('app_mention', ({ event, say }) => {
    console.log(event)

    
  });



(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();