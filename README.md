### Shopify API node.js wrapper

1. I created an account on Shopify and configured a simple shop
2. I created a node js project using express and the shopify node wrapper
3. I configured a route that calls the Shopify API and returns the orders
4. At point 4 I got stuck as draft orders don't have any `fullfillment status`, to create real orders I would have to buy a Shopify plan
5. I created a shopify partner account which gives me access to developmet shops in which I can have oreders without choosing a plan
6. I thus created a index_partner.js where I answer the fulfillment questions I couldn't initially tackle
7. I created a slcak app and created anew channel within where I am able to send the results of my work
8. As there is no possibility to edit the date of a created order the dates were all today thus no querying could be performed on orders performed yesterday as there were none
9. I was able to get some from my own shop because I had created it the day before

The `fullfilment_status`

I used:

- [https://www.npmjs.com/package/slack](slack.js)
- [https://www.npmjs.com/package/shopify-api-node](shopify.js)
