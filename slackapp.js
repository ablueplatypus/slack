require('dotenv').config()
const { App } = require('@slack/bolt');


const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

const Kusty = {
    token: process.env.KUSTOMER_API_TOKEN,
    uri: process.env.KUSTOMER_POST_URI
  }

/* Add functionality here */
const sendToKustomer = (body, token) => {
      return fetch(Kusty.uri, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: body && JSON.stringify(body)
        })
          .then(resp => resp.json())
  }

app.event('app_mention', ({ event, say }) => {
    console.log(event)
    try {
        sendToKustomer(event, Kusty)
        
      } catch (error) {
        console.log('something went wrong')
        console.error(error);
      }

  });


(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();