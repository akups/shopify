require("dotenv").config();
const moment = require("moment");
const express = require("express");
const port = 3030;
const app = express();

// Use the shpify api node package as a wrapper around the API
const Shopify = require("shopify-api-node");

// Instantiate and provide credentials
const shopify = new Shopify({
  shopName: "akuas-ecke.myshopify.com",
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_PASSWORD,
});

shopify.on("callLimits", (limits) => console.log(limits));

// Configurate the route / shopify to return the orders
app.get("/shopify", async (req, res) => {
  const orders = await shopify.draftOrder.list({ limit: 5 });

  // Orders placed the day before:
  const yesterdayStart = moment().subtract(1, "days").startOf("date");
  const yesterdayEnd = moment().subtract(1, "days").endOf("date");

  const ordersDayBefore = orders.filter((order) => {
    const oderDate = moment(order.created_at);

    if (yesterdayStart < oderDate && yesterdayEnd > oderDate) {
      //first date is in future, or it is today
      return true;
    }
    return false;
  }).length;

  console.log("orders", orders);
  res.json({ ordersDayBefore });
});

// Draft orders have no fulfillment status: "The Draft Order resource does not expose reserve inventory information."
// https://shopify.dev/docs/admin-api/rest/reference/orders/draftorder
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
