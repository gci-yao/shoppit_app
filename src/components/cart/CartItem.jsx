import React, { useState } from 'react'
import api, { BASE_URL } from '../../api'
import { BsTranslate } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { TbShoppingBagEdit } from "react-icons/tb";
import { MdRemoveShoppingCart } from "react-icons/md";

const CartItem = ({item, setCartTotal,setCartItems, cartitems, setNumCartItems}) => {

  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading]  = useState(false)

  const itemData = {quantity:quantity, item_id:item.id}
  const itemID = {item_id:item.id}
  function deleteCartItem(){
    const confirmDelete = window.confirm("Are you want to delete this cartitem ?")
    if(confirmDelete){
      api.post("delete_cartitem/", itemID)
      .then(res =>{
        console.log(res.data)
        setCartItems(cartitems.filter(cartitem=>cartitem.id != item.id))
        setCartTotal(cartitems.filter((cartitem)=>cartitem.id === item.id ? res.data.data : cartitem)
        .reduce((acc, curr) => acc + curr.total, 0))
      
        setNumCartItems(cartitems.filter((cartitem) => cartitem.id === item.id ? res.data.data:cartitem)
        .reduce((acc, curr)=> acc + curr.quantity, 0))
        toast.success("cartitem deleted with success !")
      })
      .catch(err=>{
        console.log(err.message)
      })
    }
  }


  function updateCartItem(){
    setLoading(true)
    api.patch("update_quantity/", itemData)
    .then(res=>{
      setLoading(false)
      toast.success("CartItem updated successfully !")
      console.log(res.data)
      setCartTotal(cartitems.map((cartitem)=>cartitem.id === item.id ? res.data.data : cartitem)
      .reduce((acc, curr) => acc + curr.total, 0))
      
      setNumCartItems(cartitems.map((cartitem) => cartitem.id === item.id ? res.data.data:cartitem)
      .reduce((acc, curr)=> acc + curr.quantity, 0))
    
    })
    .catch(err =>{
      setLoading(false)
      console.log(err.message)
    })
  }




  return (
    <div className="col-md-12">
        {/* cart item */}
        <div 
        className="cart-item d-flex align-items-center mb-3 p-3"
        style={{backgroundColor:'#f8f9fa', borderRadius:'8px'}}
        >
            <img 
            src={`${BASE_URL}${item.product.image}`}
            alt="Product Image"
            className="img-fluid"
            style={{width:'80px', height:'80px', objectFit:'cover', borderRadius:'5px',transform:'translate(-10px)'}} 
            />
            <div className="mb-3 flex-grow-1">
                <h5 className="mb-1 ">{item.product.name}</h5>
                <p className="mb-0 text-muted">{`${item.product.price} Fcfa`}</p>
            </div>
            <div className="d-flex align-items-center">
                <input 
                type="number"
                className="form-control me-3"
                min="1"
                onChange={(e) =>setQuantity(e.target.value)}
                value={quantity}
                style={{width:'70px'}} 
                />
                <button
                onClick={updateCartItem}  disabled={loading}
                className="btn btn-sm mx-2" style={{backgroundColor:"#4b3bcb", color:"white", maxWidth:"50%"}}>
                 {loading ? "Updating":<TbShoppingBagEdit />}
                </button>
                <button onDoubleClick={deleteCartItem} className="btn btn-danger btn-sn" style={{maxWidth:'50%'}}><MdRemoveShoppingCart /></button>
            </div>
        </div>
        {/* add more cart items here */}
    </div>
  )
}

export default CartItem