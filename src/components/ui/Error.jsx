import React from 'react'

const Error = ({error}) => {
  return (
    <div className="alert alert-danger my-5 text-center" role="alert">
        Error of loading page ,{error}.
    </div>
  )
}

export default Error