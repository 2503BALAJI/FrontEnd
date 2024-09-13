import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex justify-around bg-slate-400 p-4'>

        {/* Logo takaycha aahe yethe  */}
       <div>
         <img src='' alt='Logo_img'/>
        </div>
 
        <div className='space-x-4'>

            <NavLink to="About">
            About
            </NavLink>

            <NavLink to="contact">
                Contact
            </NavLink>

            <NavLink to="Project">
                Projects
            </NavLink>

        </div>
      
    </div>
  )
}

export default Home