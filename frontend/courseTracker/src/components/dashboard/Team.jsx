import React from 'react'
import { Plus, PlusCircle } from 'lucide-react'
import { AvatarGroupCountDashboard } from './AvatarGroupCount'

const Team = () => {
  return (
    <section className='bg-[#ffffff] col-span-12 smx:col-span-6 mdd:col-span-6 lg:col-span-4 xl:col-span-3 rounded-xl px-4 py-4'>
      <div className='flex flex-row justify-between items-center'>
        <h4 className="pb-4 font-raleway text-[18px] font-semibold">Your Team</h4>
        <PlusCircle/>
      </div>

      <div className='flex flex-col gap-4 items-center justify-center'>
        <AvatarGroupCountDashboard/>
        <h2 className='text-black font-semibold'>No team members</h2>
        <p className='text-center'>Invite your team to learn and stay accountable together.</p>
        <button className='flex flex-row gap-2 hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 bg-linear-to-br  from-[#0F5132] from-55% to-[#25a163] py-3 px-4 rounded-full text-white'>
          <Plus/>
          <p>Invite Members</p>
        </button>
      </div>
    </section>
  )
}

export default Team