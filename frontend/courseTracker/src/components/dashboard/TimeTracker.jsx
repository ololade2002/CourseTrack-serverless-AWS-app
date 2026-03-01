import React from 'react'
import timeBg from '../../assets/img13.jpg'
import { Pause, Play } from 'lucide-react'

const TimeTracker = () => {
  return (
    <section className='col-span-12 lg:col-span-3 '>
      <div className='relative overflow-hidden  rounded-xl font-raleway text-white'>
         <img src={timeBg}  className="absolute inset-0 w-full object-cover" alt="background"/>

         <div className="relative z-10 px-4 py-5">
          <h4 className=" font-raleway text-[18px] font-semibold ">Time Tracker</h4>
          <h2 className='text-[40px] py-4 font-semibold font-inter text-center'>01:24:08</h2>
          <div className='flex flex-row items-center justify-center gap-3'>
            <div className='p-3 rounded-full bg-white w-fit'>
              <Pause className='text-black'/>
            </div>
            <div className='p-3 rounded-full bg-red-500 w-fit'>
              <Play/>
            </div>
          </div>

         </div>

      </div>
    </section>
  )
}

export default TimeTracker