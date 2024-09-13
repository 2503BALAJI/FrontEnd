import React from 'react'
import { useState } from 'react'
import house from '../assets/Images/house.webp'
const Login = () => {
  const [formData,setFormData] = useState({
    Email :"",
    Password:""
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
      <div className='flex '>
        <div>
          <input
            type="email"
            placeholder="Enter Your Email "
            name="Email"
            required
            onChange={changeHandler}
            value={formData.Email}
          />
          <input
            type="password"
            placeholder="Enter Your Password "
            name="Password"
  
            onChange={changeHandler}
            value={formData.Password}
          />

          {/* button  */}
          <button>
            Sign In
          </button>
        </div>
        

        <div>
          <img src={house} height={500} width={450}/>
        </div>


      </div>
    </form>
  )
}

export default Login