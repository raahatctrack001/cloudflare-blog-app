import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { SignupUserSchema } from '@raahatctrack001/common'

const Auth = ({type}: {type: "signin"|"signup"}) => {
  const [formData, setFormData] = useState<SignupUserSchema>({
    username: "",
    email: "",
    password: ""
  })
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void=>{
    setFormData({...formData, [e.target.id]: e.target.value});
  } 

  return (
    <div className='w-full max-w-lg'> 
        <h1 className='font-bold text-3xl'> {type === "signin" ? "Welcome Back!" : "Create Account"} </h1>
        <div className='text-sm'>
            { type === "signup" ? 
                <div className='flex gap-2'> <p>Already have an account? </p> <Link to={'/sign-in'} className='text-blue-600 font-bold italic'> Sign In </Link> </div>: 
                <div className='flex gap-2'> <p>Doesn't have an account? </p> <Link to={'/sign-up'} className='text-blue-600 font-bold italic'> Sign Up </Link> </div> 
            } 
        </div>
        <div className=''>
            <LabelledInput id='username' label='Username' placeholder='username' onChange={handleInputChange}/>
            <LabelledInput id='email' label='Email' placeholder='name@company.com' onChange={handleInputChange}/>
            <LabelledInput id='password' label='Password' type="password" placeholder='***********' onChange={handleInputChange}/>
        </div>
    </div>
  )
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e:ChangeEvent<HTMLInputElement>)=>void,
    id: string,
    type?: string,
}

function LabelledInput({label, placeholder, onChange, type, id}: LabelledInputType){
    return <div className='my-2 border-2 p-1 rounded-lg'>
        <p className='font-semibold text-lg'> { label } </p>
        <input 
            className=' py-2 px-1 w-full'
            type={ type||"text" }
            placeholder={ placeholder }
            onChange={ onChange }
            id={ id }
            required           
        />
    </div>
}

export default Auth