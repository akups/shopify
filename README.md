### Shopify API node.js wrapper

1. I created an account on Shopify and configured a simple shop
2. I created a node js project using express and the shopify node wrapper
3. I configured a route that calls the Shopify API and returns the orders
4. At point 4 I got stuck as draft orders don't have any `fullfillment status`, to create real orders I would have to buy a Shopify plan

If the `fullfilment_status` was present, this is how I would have proceeded:

- how many orders were placed in the shop the day before,
- how many orders were shipped the day before and
- how many orders have not yet been sent in total.
