const {Order} = require ('../models/order');
const {OrderItem} = require('../models/order-item');
const express = require('express');
const router = express.Router();

router.get(`/`,async (req,res)=>{
    const orderList = await Order.find();

    if (!orderList){
        res.status(500).json({success:false});
        
    }
    res.send(orderList)
})

router.post('/', async (req,res)=>{
     
    const orderItemsIds = req.body.orderItems.map( async orderItem =>{
        let newOrderItem = new OrderItem({
             quantity : orderItem.quantity,
             product : orderItem.product
        })
        newOrderItem = await newOrderItem.save()

        return newOrderItem._id;
    })
        let order = new Order ({
        orderItems : orderItemsIds,
        shippingAddress1 : req.body.shippingAddress,
        shippingAddress2 : req.body.shippingAddress2,
        city : req.body.city,
        zip : req.body.zip,
        country :req.body.country,
        phone : req.body.phone,
        status : req.body.status,
        totalPrice : req.body.totalPrice,
        user : req.body.user,
    })
    order = await order.save();
    
    if(!order){
        return res.status(400).send('order cannot be created')
    }
    console.log(order);

})
module.exports= router;