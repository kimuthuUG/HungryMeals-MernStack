import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "../actions/cartAction";
import { deleteFromCart } from "../actions/cartAction";
import Checkout from "../components/Checkout";

export default function Cartscreen() {

    const cartstate = useSelector(state => state.cartReducer)
    const cartItems = cartstate.cartItems
    var subtotal = cartItems.reduce((x, item) => x + item.price, 0)
    const dispatch = useDispatch()

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            
                <div className="row justify-content-center">

                    <div className="col-md-6">

                        <h2 style={{ fontSize: '40px' }}>My Cart</h2>

                        {cartItems.map(item => {


                            return <div className="flex-container m-5">

                                <div className='text-start m-1 w-100'>

                                    <h1>{item.name} [{item.varient}]</h1>
                                    <h1>Price : {item.quantity}*{item.prices[0][item.varient]} = {item.price}</h1>
                                    <h1 className="d-inline"> Quantity : </h1>
                                    <i className="fa fa-plus" type="button" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity + 1, item.varient)) }} ></i>
                                    <b>{item.quantity}</b>
                                    <i className="fa fa-minus" type="button" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity - 1, item.varient)) }} ></i>
                                    <hr />
                                </div>

                                <div className='m-1 w-100'>


                                    <img src={item.image} style={{ height: '80px', height: '80px' }} />



                                </div>

                                <div className='m-2 w-100'>

                                    <i className="fa fa-trash mt-4" type="button" aria-hidden="true" onClick={() => dispatch(deleteFromCart(item))}></i>

                                </div>





                            </div>

                        })}



                    </div>

                    <div className="col-md-4 text-end">

                        <h2 style={{ fontsize: '45px' }}>SubTotal : {subtotal} /- </h2>
                        <Checkout subtotal={subtotal} />
                    </div>

                </div>

            </div>


    
    )




}