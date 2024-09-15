import React from 'react'
import { useState } from 'react'
import house from '../assets/Images/house.webp'
import { NavLink, useNavigate } from 'react-router-dom'
import ForgottPass from './ForgotPass'
import SignUp from './SignUp'

const Login = () => {

  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    email :"",
    password:""
  })

  console.log(formData );

  function submitHandler(event){
    event.preventDefault();
    event.target.value
    console.log(event)

  }

  function changeHandler(event){
    setFormData((prevData)=>({
      ...prevData,
      [event.target.name]:event.target.value
    }))
    //setFormData([event.target.name]= event.target.value)


  }

  // w-11/12 max-w-[1160px] bg-black
  return (
    <form>
      <div className='h-screen w-11/12 mx-auto flex flex-col justify-center items-center  bg-gray-500'>

        <div className='w-[500px] h-[600px] bg-red-400 flex flex-col py-2 px-4  '>

           <h2 className='font-bold text-3xl text-gray-700 mb-2'> 
             Sign in 
           </h2>
            <p className='text-left mb-5'> 
             Welcome To The Legacy Land Investment
            </p>


            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'> 
                Email Address <sup className='text-pink-500'>*</sup>
                </p>
                <input
                    required
                    type='email'
                    value={formData.email}
                    name='email'
                    placeholder='Enter Email-address '
                    onChange={changeHandler}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full mb-2 p-[12px]  '
                />
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'> 
                password <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type="password"
                    value={formData.password}
                    name='password'
                    placeholder='Enter password'
                    onChange={changeHandler}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  '
                />
             </label>

              {/* Forgot password page */}
              <span   >
                <NavLink to="/forgotPass"
                className="text-blue-600">
                  Forgot password?
                </NavLink>
              </span>
             

          {/* button  */}
          <button className='bg-yellow-500 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6  '>
            Sign In
          </button>

          
             <div className='flex w-full item-center my-4 gap-x-2'>
               <div className='bg-black h-[1px] w-full'></div>
               <p className='text-black leading-[1.375rem] font-bold my-[-10px]'>OR</p>
               <div  className='bg-black h-[1px] w-full'></div> 
             </div>

            {/* forgott page link  */}

            <p>Don't have accout ? 
             {/* <NavLink to="SignUp"> Register</NavLink> */}
             <button onClick={()=>navigate('/SignUp')}>
               Register
              </button>
            </p>

        </div>
       


      </div>
    </form>
  )
}

export default Login