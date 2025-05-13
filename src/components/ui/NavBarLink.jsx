
import { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { CiLogin } from "react-icons/ci";
import { MdOutlineSaveAs } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { SiKingstontechnology } from "react-icons/si";
import { FaEllo } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";



const NavBarLink = () => {


  const {isAuthenticated,setIsAuthenticated, username} = useContext(AuthContext)
  
  function logout(){
    localStorage.removeItem("access")
    setIsAuthenticated(false)
    toast.success("Deconnected with success !")
  }
  
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {isAuthenticated ?
        
            <>

                <li className="nav-item">
                    <NavLink 
                    to="/profile"
                    className={({isActive}) =>
                        isActive ? "nav-link text-success active fw-semibold" : "nav-link fw-semibold"
                    }end
                    >
                       <FaLocationDot /> {`${username} logged `}<FaEllo />
                    </NavLink>
                </li>
                <li className="nav-item" onClick={logout}>
                    <NavLink 
                    to="/"
                    className={({isActive}) =>
                        isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
                    }end
                    >
                        <RiLogoutCircleLine /> Logout
                    </NavLink>
                </li>
            </> 
                :
            <>
                <li className="nav-item">
                    <NavLink 
                    to="/login"
                    className={({isActive}) =>
                        isActive ? "nav-link active  fw-semibold" : "nav-link fw-semibold"
                    }end
                    >
                      <CiLogin />  Login
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                    to="/register"
                    className={({isActive}) =>
                        isActive ? "nav-link active fw-semibold" : "nav-link fw-semibold"
                    }end
                    >
                       <MdOutlineSaveAs />  Register
                    </NavLink>
                </li>
            </>

        }
        
    </ul>
  )
}

export default NavBarLink