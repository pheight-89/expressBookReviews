const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
const secretKey = '1k73JushBN18kls';

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))


app.use("/customer/auth/*", function auth(req,res,next){
const token = req.session.authorization?.accessToken;
    
    if (token) {
      // Verify JWT token
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "token expired. please login again." }); 
        } else {
          req.username = decoded.data;
          next();
        }
      });
    } else {
      res.sendStatus(403); 
    }
});

 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
