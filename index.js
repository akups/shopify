require("dotenv").config();
const express = require("express");
const port = 4000;
const app = express();

// Use the shpify api node package as a wrapper around the API
const Shopify = require("shopify-api-node");

// Instantiate and provide credentials
const shopify = new Shopify({
  shopName: "akuas-ecke.myshopify.com",
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_PASSWORD,
});

// Configurate the route / shopify to return the orders
app.get("/shopify", async (req, res) => {
  const orders = await shopify.draftOrder.list({ limit: 5 });

  // Orders placed the day before:

  const ordersDayBefore = orders.filter((order) => {
    const oderDate = new Date(order.completed_at);
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    if (
      oderDate.setHours(0, 0, 0, 0) - yesterday.setHours(0, 0, 0, 0) >= 0 &&
      today.setHours(0, 0, 0, 0) - oderDate.setHours(0, 0, 0, 0) >= 0
    ) {
      //first date is in future, or it is today
      return true;
    }
  });

  console.log("orders", orders);
  res.json(ordersDayBefore);
});

// Draft orders have no fulfillment status: "The Draft Order resource does not expose reserve inventory information."
// https://shopify.dev/docs/admin-api/rest/reference/orders/draftorder
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
