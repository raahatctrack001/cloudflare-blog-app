import React from 'react'
import Auth from '../components/AuthComponenet/Auth'
import Quote from '../components/AuthComponenet/Quote'



const Signin = () => {
  return (
    <div className='flex'>
      <div className='w-full h-screen  flex justify-center items-center'>
        <Auth type='signin'/>
      </div>
      <div className='bg-gray-200  w-full h-screen hidden lg:flex justify-center items-center px-5'>
        <Quote />
      </div>
    </div>
  )
}

export default Signin