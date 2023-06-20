import { combineReducers } from 'redux'

import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllPizzasReducer } from './reducers/pizzaReducers'
import { cartReducer } from './reducers/cartReducer'
import { loginUserReducer, registerUserReducer ,addCustomerReducer } from './reducers/userReducer'
import { adminloginReducer} from './reducers/adminReducer'
import { feedbackReducer } from './reducers/feedbackReducer'
import { placeOrderReducer, getUserOrdersReducer } from './reducers/orderReducer'

const finalReducer = combineReducers({

    getAllPizzasReducer: getAllPizzasReducer,
    cartReducer: cartReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    adminloginReducer: adminloginReducer,
    placeOrderReducer: placeOrderReducer , 
    feedbackReducer : feedbackReducer,
    getUserOrdersReducer : getUserOrdersReducer,
    addCustomerReducer : addCustomerReducer
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

const currentAdmin = localStorage.getItem('currentAdmin') ? JSON.parse(localStorage.getItem('currentAdmin')) : null

const currentNotifications = localStorage.getItem('currentNotifications') ? JSON.parse(localStorage.getItem('currentNotifications')) : null




const initialState = {
    cartReducer: {
        cartItems: cartItems
    },
    loginUserReducer: {
        currentUser: currentUser,
        currentNotifications: currentNotifications,
        
    },
    adminloginReducer: {
        currentAdmin: currentAdmin,
        currentNotifications: currentNotifications,
        
    }
   
}

const composeEnhancers = composeWithDevTools({})
const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))


export default store