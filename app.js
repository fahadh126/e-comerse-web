const express = require('express');
const app =express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors =require('cors');

require ('dotenv/config');


app.use(cors());
app.options('*',cors())

//middleware
app.use(bodyParser.json());
app.use (morgan('tiny'));

//Routers
const categoriesRoutes =require('./routers/categories');
const  productsRouters= require ('./routers/products');
const usersRouters = require ('./routers/users');
const ordersRouters = require ('./routers/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`,categoriesRoutes);
app.use(`${api}/products`,productsRouters);
app.use(`${api}/users`,usersRouters);
app.use(`${api}/orders`,ordersRouters);

//database connection
 mongoose.connect(process.env.CONNECTION_STRING)
 .then(()=>{
    console.log('database connection is ready...');
 })
 .catch((err)=>{
    console.log(err);
 });



//server
 app.listen(3000, ()=>{
    console.log('server runs in http://localhost:3000');
 })