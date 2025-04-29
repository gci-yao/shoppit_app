import React from 'react'
import styles from './UserInfo.module.css'
import pic from "../../assets/pic.png"
import { useNavigate } from 'react-router-dom'

const UserInfo = ({userinfo}) => {
    const navigate = useNavigate();
  return (
    <div className="row mb-4">
        <div className={`col-md-3 py-3 card ${styles.textCenter}`}>
            <img
            src={pic} 
            alt="User Profile"
            className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`} 
            />
            <h4>{userinfo.username}</h4>
            <p className="text-muted">{userinfo.email}</p>
            <button onClick={() => navigate("/edit-profile")} className="btn mt-2" style={{backgroundColor:'#6050DC', color:'white'}}>Edit Profile</button>
        </div>
        <div className="col-md-9">
            <div className="card">
                <div className="card-header" style={{backgroundColor:'#6050DC',color:'white'}}>
                    <h5>Account Overview</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            
                            <p>
                                <strong>Full Name : </strong> {`${userinfo.first_name} ${userinfo.last_name}`}
                            </p>
                            <p>
                                <strong>Email : </strong>{userinfo.email}
                            </p>
                            <p>
                                <strong>Phone : </strong>{userinfo.phone}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                <strong>City : </strong>{userinfo.city}
                            </p>
                            <p>
                                <strong>Country : </strong>{userinfo.state}
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserInfo