import React from 'react'
import Quote from '../components/AuthComponenet/Quote'
import Auth from '../components/AuthComponenet/Auth'

const Signin = () => {
  return (
    <div>
      <div>
        <Auth type='signin' />
      </div>
      <div>
        <Quote />
      </div>
    </div>
  )
}

export default Signin