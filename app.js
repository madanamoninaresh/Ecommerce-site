// require("dotenv").config();
require("dotenv").config();

// require("dotenv").config();   // MUST BE THE FIRST LINE

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

const jwt = require('jsonwebtoken')
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index')
const expressSession = require('express-session')
const flash = require('connect-flash')
const setUser = require('./middlewares/setUser')

const db = require('./config/mongoose-connection');


// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const ownersRouter = require('./routes/ownersRouter');
// const usersRouter = require('./routes/usersRouter');
// const productsRouter = require('./routes/productsRouter');
// const indexRouter = require('./routes/index')
// const expressSession = require('express-session')
// const flash = require('connect-flash')

// require('dotenv').config();

// const db = require('./config/mongoose-connection')
// 
app.use(
    expressSession({
        resave : false,
        saveUninitialized : false,
        secret : process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))
app.use(setUser)
app.set('view engine','ejs')

// app.get("/test-cloudinary", async (req, res) => {
//   const cloudinary = require("./config/cloudinary");

//   try {
//     const result = await cloudinary.api.ping();
//     res.send("Cloudinary connected successfully!");
//   } catch (error) {
//     res.send("Cloudinary connection failed: " + error.message);
//   }
// });



app.get("/cloudinary-debug", (req, res) => {
  const cloudinary = require("./config/cloudinary");

  res.json({
    from_config_cloud_name: cloudinary.config().cloud_name,
    from_config_api_key: cloudinary.config().api_key,
    from_env_api_key: process.env.CLOUDINARY_API_KEY
  });
});


// app.get("/env-test", (req, res) => {
//   res.json({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
//   });
// });

const userModel = require("./models/user-model");

app.use((req, res, next) => {
  if (!req.user || !req.user.products) {
    res.locals.cartCount = 0;
    return next();
  }

  let count = 0;
  req.user.products.forEach(item => {
    if (item.quantity) count += item.quantity;
  });

  res.locals.cartCount = count;
  next();
});






app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/",indexRouter )


app.listen(3000)