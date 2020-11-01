require("dotenv").config();
const moment = require("moment");
const express = require("express");
const port = 4000;
const app = express();
const slackNotification = require("./slackNotification");

// Use the shpify api node package as a wrapper around the API
const Shopify = require("shopify-api-node");

// Instantiate and provide credentials
const shopify = new Shopify({
  shopName: "akua-dev-store.myshopify.com",
  apiKey: process.env.SHOPIFY_API_KEY_PARTNER,
  password: process.env.SHOPIFY_API_PASSWORD_PARTNER,
});

// Configurate the route / shopify to return the orders
app.get("/shopify", async (req, res) => {
  // Orders placed the day before:
  const yesterdayStart = moment().subtract(1, "days").startOf("date");
  const yesterdayEnd = moment().subtract(1, "days").endOf("date");

  const ordersYesterday = await shopify.order.count({
    created_at_max: yesterdayEnd.format(),
    created_at_min: yesterdayStart.format(),
  });

  const ordersNotYetShipped = await shopify.order.count({
    fulfillment_status: "unshipped",
  });

  // fullfillment Events that happened yesterday

  // const ordersShippedYesterday = ordersYesterday.filter((order) => {
  //   if (fulfillment_status === "fulfilled") {
  //     return order;
  //   }
  // });

  const results = {
    ordersDayBefore: ordersYesterday,
    ordersNotYetShipped: ordersNotYetShipped,
    //ordersShippedYesterday: ordersShippedYesterday.length,
  };

  slackNotification(`
     Orders Created Yesterday: ${ordersYesterday}
     Orders not yet shipped: ${ordersNotYetShipped}
   
     `);

  // get order --> which orders have status fullfilment_completed

  res.json(results);
});

// Draft orders have no fulfillment status: "The Draft Order resource does not expose reserve inventory information."
// https://shopify.dev/docs/admin-api/rest/reference/orders/draftorder
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
