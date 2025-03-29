const express = require("express");
const axios = require('axios');
const cors = require('cors');
const env = require('dotenv').config();
const app = express();
const routes = require('./routes/PhisingUrlRoutes');
const ratelimiter = require('express-rate-limit');

const port = process.env.PORT || 5000;


const limiter = ratelimiter({

  windowMs: 15 * 60 * 1000, 
  // 15 mins
  max: 100,
  message: "too Many Request, please try agin later."

});

app.use(limiter);
app.set('trust proxy',1);

app.use(express.json());
app.use(cors());
app.use(routes)



app.listen(port,()=>{
  console.log(`${port} is running`);
  
})



