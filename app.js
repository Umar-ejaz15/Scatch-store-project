const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose-connection.js');

const indexRouter = require('./routes/indexRoute.js');
const ownersRouter = require('./routes/ownerRoutes.js');
const usersRouter = require('./routes/userRoutes.js');
const productsRouter = require('./routes/productRoutes');

// const session = require('express-session');
// const flash = require('connect-flash');

require('dotenv').config();


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     // secret: process.env.EXPRESS_SESSION_SECRET,
// }));
// app.use(flash());

app.use("/", indexRouter);
app.use('/users', usersRouter);
app.use('/owner', ownersRouter);
app.use('/products', productsRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});