require("dotenv").config();
const express = require("express");
const port = 4000;
const app = express();

const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: "akuas-ecke.myshopify.com",
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_PASSWORD,
});

app.get("/shopify", (req, res) => {
  res.json(shopify);
});

// shopify.draftOrder
//   .list({ limit: 5 })
//   .then((orders) => console.log(orders))
//   .catch((err) => console.error(err));

// shopify.fulfillmentOrder.get(705088127157).then((f) => console.log(f));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
