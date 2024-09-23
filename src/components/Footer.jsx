import React from 'react'
import facebook from "../assets/social-icon/facebook-icon.svg";
import instagram from "../assets/social-icon/instagram-icon.svg";
import linkden from "../assets/social-icon/linkedin-icon.svg";
import twitter from "../assets/social-icon/twitter-icon.svg";


const Footer = () => {

  return (
    <div className='w-11/12 mx-auto bg-red-600 h-screen'>
      <div className='w-[70%] mx-auto bg-yellow-500'>

          {/* path wala div */}
        <div className=' w-full flex justify-center items-center gap-x-4 '>
          <a href='#project'> project</a>
          <a href='#question'>Question</a>
          <a href='#about'>About us </a>
        </div>

        <div className='flex w-full items-center justify-around'>
          <a href='#'>
          <img src={facebook}></img>
          </a>

          <a href='#'>
          <img src={linkden} height={20} width={25} />
          </a>

          <a href='#'>
          <img src={instagram} />
          </a>
          <a href='#'>
          <img src={twitter}/>
          </a>
          <a href='#'>
            <img src=''/>
            YouTube
          </a>
        
        </div>

          {/* some text wala div  */}

          <div>
            lorem 30 

          </div>

          {/* last div  */}

          <div className='flex space-x-4'>
            <p>
               <span> logo takaycha ahe </span>exapmle23@gmail.com 
            </p>
            <p>
               <span>call cha  logo takaycha ahe </span> 983423XXXX
            </p>
            <p>
               <span> Home cha  logo takaycha ahe </span>address
            </p>
          </div>
      </div>
      
    </div>
  )
}

export default Footer;
