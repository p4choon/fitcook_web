const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51N85E6JqMocsCimAxipwRWmw8qizKxZ1XNMPGBQTCj1XkCPyeYc1HvngpMQmK76gcJZaLvFHDF83DlVa0tzOweIb00pPlaK7pI"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let arrayItems = [];
  items.forEach((item) => {
    arrayItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: arrayItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
