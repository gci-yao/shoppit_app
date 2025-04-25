import React from 'react'
import styles from './PaymentSection.module.css'
import api from '../../api'
import Spinner from '../ui/Spinner'
import { LuMicrowave } from "react-icons/lu";
import { ImPaypal } from "react-icons/im";

import {useState} from 'react'

const PaymentSection = () => {

  const cart_code = localStorage.getItem("cart_code")
  const [loading, setLoading] = useState(false)

  function makePayment(){
    setLoading(true)
    api.post("initiate_payment/",{ cart_code: cart_code })
    .then(res =>{
        console.log(res.data)
        window.location.href = res.data.data.link
        setLoading(false)
    })
    .catch(err =>{
        console.log(err.message)
        setLoading(false)
    })
  }
  function paypalPayment(){
    setLoading(true)
    api.post("initiate_paypal_payment/",{ cart_code: cart_code })
    .then(res =>{
        console.log(res.data)
        setLoading(false)
        if(res.data.approval_url){
          window.location.href = res.data.approval_url
        }
    })
    .catch(err =>{
        console.log(err.message)
        setLoading(false)
    })
  }

  if(loading){
    return <Spinner laoding={loading} />
  }


  return (
    <div className="col-md-4">
        <div className={`card ${styles.card}`}>
            <div className="card-header" style={{backgroundColor:'#6050DC',color:'white'}}>
                <h5>Payment Options</h5>
            </div>
            <div className="card-body">
                {/* paypal button  */}
                <button onClick={paypalPayment} className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} id="paypal-button">
                    <ImPaypal />    Pay with PayPal
                </button>
                {/* flutterwave button  */}
                <button onClick={makePayment} className={`btn btn-warning w-100 mb-3 ${styles.flutterwaveButton}`} id="flutterwave-button">
                    <LuMicrowave /> Pay with Flutterwave
                </button>
            </div>
        </div>
    </div>
  )
}

export default PaymentSection