import React from 'react'
import { FaEmber, FaFacebook, FaGithub, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa6'
import { TfiEmail } from 'react-icons/tfi'
import { Link } from 'react-router-dom'



const Footer = () => {
  return (
    <footer className="py-3" style={{backgroundColor:'#6050DC',color:'white'}}>
    <div className="container text-center">

        <div className="mb-2">
            <a href="#" className="text-white text-decoration-none mx-2">Home</a>
            <a href="https://apropos.onrender.com/" target='_blanc' className="text-white text-decoration-none mx-2">About</a>
            <Link to="/products/lenovo-P51s"><a href="#" target='_blanc' className="text-white text-decoration-none mx-2">Shop</a></Link>
            <a href="https://contact-wvsy.onrender.com" target='_blanc' className="text-white text-decoration-none mx-2">Contact</a>
        </div>
        <div className="mb-2">
            <a href="https://github.com/gci-yao" target='_blanc' className="text-white text-decoration-none mx-2"><FaGithub /></a>
            <a className="text-white text-decoration-none mx-2"
            href="https://wa.me/88650842" 
            target="_blank" 
            ><FaWhatsapp /></a>
            <a href="mailto:charlesyao1602@email.com" target='_blanc' className="text-white text-decoration-none mx-2"><TfiEmail /></a>
            <a href="https://www.tiktok.com/@jr27732" className="text-white text-decoration-none mx-2"><FaTiktok /></a>
            <a href="https://instagram.com/gci.jr" target='_blanc' className="text-white text-decoration-none mx-2"><FaInstagram /></a>
        </div>
        <p className="small sm-0 ">&copy; 2025 Bafa shoppit all droits reserved by charlesyao.ci</p>
    </div>    
    </footer>
  )
}

export default Footer