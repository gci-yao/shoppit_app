import React from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { Link} from 'react-router-dom'
import styles from './NavBar.module.css'
import NavBarLink from './NavBarLink'
import { TfiLinux } from "react-icons/tfi";
import { RiComputerFill } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";
import { SiPrestashop } from "react-icons/si";


const NavBar = ({numCartItems}) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 ${styles.stickyNavbar}`}>
    <div className="container " style={{marginRight:"45px"}} >
        <Link className="navbar-brand text-decoration-none text-primary fw-bold text-uppercase" to="/"><SiPrestashop /> BAFA SHOPPIT</Link>
        <div className="collapse navbar-collapse" id="navbarContent">
          <NavBarLink />
        </div>
        <button
        className="navbar-toggle"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
          <span className="navbar-toggle-icon"><RiComputerFill /></span>
        </button>
        <Link to="/cart" className={`'btn btn-dark ms-5  rounded-pill position-relative ${styles.responsiveCart}'`}>
          {numCartItems == 0 || <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
            style={{fontSize:'0.85rem', padding:'0.5em 0.65em',backgroundColor:'#6050DC',marginRight:"0px"}}
          >
            {numCartItems}
          </span>}
          <h5><FaCartArrowDown /></h5>
          
        </Link>
    </div>
    </nav>
  )
}

export default NavBar