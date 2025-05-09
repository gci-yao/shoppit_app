import { useParams } from "react-router-dom"
import ProductPagePlaceHolder from "./ProductPagePlaceHolder"
import RelatedProducts from "./RelatedProducts"
import {toast} from 'react-toastify'
import { useEffect, useState } from "react"
import api from "../../api"
import { BASE_URL } from '../../api'

const ProductPage = ({setNumCartItems}) => {
    const {slug} = useParams()
    const [product,setProduct] = useState({})
    const [similarProducts,setSimilarProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const cart_code = localStorage.getItem("cart_code")
    const [inCart, setInCart] = useState(false)


    const newItem = {cart_code : cart_code, product_id:product.id}


    useEffect(function(){
        if (product.id){
            api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
            .then(res =>{
                console.log(res.data)
                setInCart(res.data.product_in_cart)
            })
            .catch(err =>{
               console.log(err.message)
            })
        }
        
    },[cart_code,product.id])

    function add_item(){
        api.post("add_item/", newItem)
        .then(res => {
            console.log(res.data)
            setInCart(true)
            setNumCartItems(curr => curr + 1)
            toast.success("Product added to cart with successfully")
        })
        .catch(err => {
            console.log(err.message)
        })
    }


    useEffect(function(){
        setLoading(true)
        api.get(`product_detail/${slug}`)
        .then(res =>{
            console.log(res.data)
            setProduct(res.data)
            setSimilarProducts(res.data.similar_products)
            setLoading(false)
        })
        .catch(err =>{
            console.log(err.message)
            setLoading(false)
        })
    },[slug])

    if(loading){
        return <ProductPagePlaceHolder />
    }


  return (
    <div className="">
        
        <section className="py-3">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img 
                        src={`${BASE_URL}${product.image}`}
                        alt="..." 
                        className="card-img-top mb-5 mb-md-0"

                        />
                    </div>
                    <div className="col-md-6">
                        <div className="small mb-1">SKU: BST-498</div>
                        <h1 className="display-5 fw-bolder">{product.name}</h1>
                        <div className="fs-5 mb-5">
                            {/* <span className="text-decoration-line-through">$45.00</span> */}
                            <span className="text-decoration">{`${product.price} Fcfa`}</span>
                        </div>
                        <p className="lead">
                            {product.description}
                        </p>
                            
                        <div className="d-flex">
                            {/* <input 
                            className="form-control text-center me-3"
                            id="inputQuantity"
                            type="number" 
                            value="1"
                            style={{maxWidth:'5rem'}}
                            /> */}
                            <button
                            className="btn btn-outline-dark flex-shrink-0"
                            type="button"
                            onClick={add_item}
                            disabled={inCart}
                            >
                                <i className="bi-cart-fill me-1"></i>
                                {inCart ? "Product added to cart" : "Add to cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <RelatedProducts products = {similarProducts} />
    </div>
  )
}

export default ProductPage