import React from 'react'
import bgroundImage from "../assesst/bg-section1.jpg"
import Ladki from "../assesst/ladki.png"
import privacy from "../assesst/privacy.png"
import verified from "../assesst/verified.png"
import bestmatches from "../assesst/best-matches.png"
import { GoArrowRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Confess = () => {
  return (
    <div className=' h-[40rem] flex justify-center items-center  sm:justify-between py-5 px-2' style={{backgroundImage:`url(${bgroundImage})`}}>
      
      <div className=" bottom-1 ml-[2rem]">
        <p className="text-[4rem] font-bold text-sky-700">
          New Places,
        </p>

        <p className="text-[4rem] font-bold text-sky-700">
          Unforgettable Dating.
        </p>
        <p className="text-[2rem] text-red-500 font-thin">
          Confess your Crush Anonomously...
        </p>
        <Link to='/dashboard'>
        <button className="text-[2rem] bg-red-400 text-white rounded p-2">
            <div className='flex items-baseline'>
         <p>Confess Anonymously</p>
          <GoArrowRight />
          </div>
        </button>
        </Link>
      </div>
      <div className="ladki mt-[6.5rem]">
        <img src={Ladki} alt=""  className="hidden md:block overflow-hidden"/>
      </div>
      <div className="section1-props ">
        <img src={privacy} alt=""  />
        <img src={verified} alt=""  />
        <img src={bestmatches} alt=""  />
      </div>
    </div>
  )
}

export default Confess
