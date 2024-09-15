import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    email :"",
    password:"",
    confirmPassword:"",
    phoneNumber:""
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
  return (
    <form>
      <div className='h-screen w-11/12 mx-auto flex flex-col justify-center items-center  bg-gray-500'>

        <div className='w-[500px] h-[600px] bg-red-400 flex flex-col py-2 px-4  '>

           <h2 className='font-bold text-3xl text-gray-700 mb-2'> 
             Sign Up 
           </h2>
            <p className='text-left mb-5'> 
             Welcome To The Legacy Land Investment
            </p>

            <p>Create Your Accout here !!</p>


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
                    className=' rounded-[0.5rem]  w-full mb-2 p-[12px]  '
                />
            </label>
              {/* Password field  */}

              <div className='flex space-x-3'>
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
                      className=' rounded-[0.5rem] w-full p-[12px]  '
                  />
               </label>
               <label className='w-full relative'>
                  <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'> 
                  Confirm password <sup className='text-pink-200'>*</sup>
                  </p>
                  <input
                      required
                      type="password"
                      value={formData.confirmPassword}
                      name='confirmPassword'
                      placeholder='Enter Confirm password'
                      onChange={changeHandler}
                      className=' rounded-[0.5rem] w-full p-[12px]  '
                  />
                </label>
              </div>

              <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'> 
                Phone Number <sup className='text-pink-500'>*</sup>
                </p>
                <input
                    required
                    type='tel'
                    value={formData.phoneNumber}
                    name='phoneNumber'
                    placeholder='Enter Phone Number '
                    onChange={changeHandler}
                    className=' rounded-[0.5rem] w-full mb-2 p-[12px]  '
                />
            </label>

            {/*  terms and condition section  */}
            <label className='flex space-x-2 ' >
               
              <input
                type='checkbox'
                className='text-center'
                value={formData.checkbox}
                name='checkbox'
              />
              <p> Terms and condition </p>
            </label>


          {/* button  */}
          <button className='bg-yellow-500 rounded-[8px] font-medium  px-[12px] py-[8px] mt-6  '>
            Sign Up
          </button>

          
             <div className='flex w-full item-center my-4 gap-x-2'>
               <div className='bg-black h-[1px] w-full'></div>
               <p className='text-black leading-[1.375rem] font-bold my-[-10px]'>OR</p>
               <div  className='bg-black h-[1px] w-full'></div> 
             </div>

         

            <p>Already have an Accout?
                <button onClick={()=>navigate('/Login', { replace: true })}>
                  Login
                </button>
             </p>


            
           
        </div>
       


      </div>
    </form>
  )
}

export default SignUp