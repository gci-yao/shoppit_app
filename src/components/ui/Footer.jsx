import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="py-3" style={{backgroundColor:'#6050DC',color:'white'}}>
    <div className="container text-center">

        <div className="mb-2">
            <a href="#" className="text-white text-decoration-none mx-2">Home</a>
            <a href="#" className="text-white text-decoration-none mx-2">About</a>
            <a href="#" className="text-white text-decoration-none mx-2">Shop</a>
            <a href="#" className="text-white text-decoration-none mx-2">Contact</a>
        </div>
        <div className="mb-2">
            <a href="#" className="text-white text-decoration-none mx-2"><FaFacebook /></a>
            <a href="#" className="text-white text-decoration-none mx-2"><FaTwitter /></a>
            <a href="#" className="text-white text-decoration-none mx-2"><FaInstagram /></a>
            <a className="text-white text-decoration-none mx-2"
            href="https://wa.me/+22588650842" 
            target="_blank" 
           
            ><FaWhatsapp /></a>
            <a href="#" className="text-white text-decoration-none mx-2"><FaTiktok /></a>
        </div>
        <p className="small sm-0 ">&copy; shoppit all droits reserved charles.yao.ci 2025</p>
    </div>    
    </footer>
  )
}

export default Footer