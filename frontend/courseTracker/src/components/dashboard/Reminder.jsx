
import { Video } from 'lucide-react'

const Reminder = () => {

  return (
    <section className='bg-[#ffffff] font-raleway  col-span-12 smx:col-span-6 mdd:col-span-6 lg:col-span-3 xl:col-span-3 px-4 py-4 rounded-xl '>
        <div>
             <h4 className="pb-8 font-raleway text-[18px] font-semibold">Reminders</h4>
             <div className='flex justify-center flex-col'>
             <h2 className='text-[25px] text-emerald-900 leading-7 pt-2 font-semibold'>Meeting with Arc Company</h2>
             <p className='text-[#091401] text-[14px] pt-2 font-poppins  pb-5'>Time: 2:00pm - 4:00pm</p>
             <button className='flex flex-row gap-2 hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 text-white bg-linear-to-br  from-[#0F5132] from-55% to-[#25a163] rounded-full items-center justify-center mx-auto py-3 w-full text-center'>
                <Video/>
                <span>Start Meeting</span>
            </button>

             </div>
             
        </div>
    </section>
  )
}

export default Reminder