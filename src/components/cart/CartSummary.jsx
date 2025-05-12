import React from 'react'
import {Link} from 'react-router-dom'

const CartSummary = ({cartTotal, tax}) => {

    const subTotal = parseFloat(cartTotal).toFixed(2)
    const cartTax = parseFloat(tax).toFixed(2)
    const total = (parseFloat(cartTotal) + parseFloat(tax)).toFixed(2)

  return (
    <div className="col-md-4 align-self-start">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <hr />
                <div className="d-flex justify-content-between">
                    
                    <span>SubTotal : </span>
                    <span className='text-dark text-bold'>{`${subTotal} Fcfa`}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span >Tax : </span>
                    <span className='text-danger'>{`${cartTax} Fcfa`}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <span>Total to pay : </span>
                    <strong className="text-success text-bold">{`${total} Fcfa`}</strong>
                </div>
                <Link to='/checkout'>
                    <button
                    className="btn btn-primary w-100"
                    style={{backgroundColor:'#6050DC'}}
                    >
                        Proced to Checkout
                    </button>
                </Link>
            </div>
        </div>

    </div>
  )
}

export default CartSummary