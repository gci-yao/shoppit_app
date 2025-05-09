import React from 'react'
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <header className="py-3 my-5 " style={{backgroundColor:'#6052DC'}}>
        <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h1 className="display-4 text-white text-bold fw-bold">Page Not Found</h1>
                <p className="lead  fw-normal text-warning text-bold text-white-75 mb-4">The page you tried accessing does not exist.</p>
                <Link to="/" className="btn btn-light bg-light btn-lg rounded px-4 py-2">Back Home</Link>
            </div>
        </div>
    </header>
  )
}

export default NotFoundPage