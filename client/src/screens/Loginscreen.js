import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from "../actions/userActions"
import Error from "../components/Error";
import Loading from "../components/Loading";
import { setNotification } from "../actions/notificationAction";



export default function Loginscreen() {


    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const loginstate = useSelector(state => state.loginUserReducer)
    const { loading, error } = loginstate
    const dispatch = useDispatch()


    useEffect(() => {

        if (localStorage.getItem('currentUser')) {
            window.location.href = '/'
        }
    })


    function login() {

        const user = { email, password }
        dispatch(loginUser(user),setNotification())
        dispatch(setNotification())
        
    }


    return (

        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className='row justify-content-center'>
                <div className="col-md-5 mt-5 text-start shadow p-3 mb-5 bg-white rounded">
                    <h2 className="text-center m-4" style={{ fontSize: '35px' }}>Login</h2>

                    {loading && (<Loading />)}
                    {error && (<Error error='Invalid Credentials' />)}


                    <div>

                        <input

                            required
                            type="email"
                            placeholder="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => { setemail(e.target.value) }}

                        />
                        <input

                            required
                            type="password"
                            placeholder="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => { setpassword(e.target.value) }}

                        />


                        <button onClick={login} className="btn mt-3 mb-3 " >LOGIN</button>
                        <br />
                        <a style={{ color: 'black' }} className='text-start' href="/register">Click Here To Register</a>
                        <br/><a style={{ color: 'black' }} className='text-start' href="/admin/login"> Admin Login</a>
                    </div>

                </div>

            </div>
            <br/>
            
        </div>
    )
}