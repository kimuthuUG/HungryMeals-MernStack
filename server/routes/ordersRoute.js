const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/orderModel')

const stripe = require("stripe")("sk_test_51FfQBPHdYSqFNE7IJEw81G8DKDo4N94EVn2rMf4RSZsipha3JhUtLCf4lwdl3YgswTcSfMhsrfuUHlr5Ekdds5h900pSVlOeSb")

router.post("/placeorder", async (req, res) => {

    const { token, subtotal, currentUser, cartItems } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: subtotal * 100,
            currency: 'LKR',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })

        if (payment) {

            const neworder = new Order({

                name: currentUser.name,
                email: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                orderAmount: subtotal,
                shippingAddress: {

                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip,

                },

                transactionId: payment.source.id

            })

            neworder.save()


            res.send('Order placed successfully')

        } else {

            res.send('Payment Failed')

        }
    } catch (error) {

        return res.status(400).json({ message: 'Something went wrong' });
    }

});

router.post("/getuserorders", async (req, res) => {

    const { userid } = req.body

    try {
        const orders = await Order.find({ userid: userid }).sort({_id : -1})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' })
    }
});

router.get("/getallorders", async (req, res) => {


    try {

        const orders = await Order.find()
        res.send(orders)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.delete("/delete/Order/:id", async (req, res) => {

    let OrderID = req.params.id;

    try {
        await Order.findByIdAndDelete(OrderID)

        res.send('Order Deleted Successfully')
    }

    catch (error) {


        return res.status(400).json({ message: error });
    }
});


module.exports = router