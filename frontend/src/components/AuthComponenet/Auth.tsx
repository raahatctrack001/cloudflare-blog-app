import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { SignupUserSchema } from '@raahatctrack001/common'
import LabelledInput from '../UtilityComponents/LabelledInput'

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
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold text-3xl'> {type === "signin" ? "Welcome Back!" : "Create Account"} </h1>
            <div className='text-sm'>
                { type === "signup" ? 
                    <div className='flex gap-2'> <p>Already have an account? </p> <Link to={'/sign-in'} className='text-blue-600 font-bold italic'> Sign In </Link> </div>: 
                    <div className='flex gap-2'> <p>Doesn't have an account? </p> <Link to={'/sign-up'} className='text-blue-600 font-bold italic'> Sign Up </Link> </div> 
                } 
            </div>
        </div>
        <div className=''>
            <LabelledInput id='username' label='Username' placeholder='username' onChange={handleInputChange}/>
            <LabelledInput id='email' label='Email' placeholder='name@company.com' onChange={handleInputChange}/>
            <LabelledInput id='password' label='Password' type="password" placeholder='***********' onChange={handleInputChange}/>
        </div>

        <button className='border-2 w-full p-2 bg-gray-400 rounded-lg hover:bg-gray-200'> {type === 'signin' ? "Sign In" : "Sign Up"} </button>
    </div>
  )
}





export default Auth