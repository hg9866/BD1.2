let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors());


let taxRate = 5; 
let discountPercentage = 10; 
let loyaltyRate = 2; 

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let totalCartPrice = newItemPrice + cartTotal;

  res.send(totalCartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  let totalCartvalue = cartTotal;

  if (isMember === true) {
    
    totalCartValue = cartTotal - (cartTotal * discountPercentage) / 100;
    
  }

  res.send(totalCartValue.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  let result = (cartTotal * taxRate) / 100;
  res.send(result.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  let result = 0;
  if (shippingMethod === 'express') {
    result = distance / 100;
  } else if (shippingMethod === 'standard') {
    result = distance / 50;
  }

  res.send(result.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;

  res.send(loyaltyPoints.toString());
});


let PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});

