require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');

const indexRoutesProduct = require('./routes/api/products');
const createRoutesProduct = require('./routes/api/products');
const indexRoutesCategory = require('./routes/api/categories');
const signInRoutes = require('./routes/api/auth');
const signUpRoutes = require('./routes/api/auth');
const verifyRoutes = require('./routes/api/auth');
const order = require('./routes/api/order');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', indexRoutesProduct);
app.use('/api', createRoutesProduct);
app.use('/api', indexRoutesCategory);
app.use('/api', signInRoutes);
app.use('/api', signUpRoutes);
app.use('/api', verifyRoutes);
app.use('/api', order);
app.listen(port, () => {
    console.log(`App running port ${port}`);
});