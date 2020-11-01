var slack = require("slack");

const token = process.env.SLACK_BOT_TOKEN;
const Slack = require("slack");
const bot = new Slack({ token });

function sendMessage(message) {
  // logs {args:{hello:'world'}}
  slack.chat.postMessage({
    token,
    channel: "shop",
    text: message,
  });
}

module.exports = sendMessage;
