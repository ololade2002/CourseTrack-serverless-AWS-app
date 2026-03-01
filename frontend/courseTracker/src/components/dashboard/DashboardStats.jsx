import React, { useState } from "react";
import { Plus, FolderInput, ArrowUpRight } from "lucide-react";
import { cardsData } from "@/data/data";
import PostCourses from "./PostCourses";

const DashboardStats = () => {

    const [active, setActive] = useState(cardsData[0].id);
  return (
    <section className="px-4 pb-4 font-raleway overflow-x-hidden">


      <main className="  flex flex-col gap-4 lg:flex-row justify-between items-start lg:items-center">
        <div className="flex flex-col items-start  gap-1">
          <h2 className="text-[26px] font-semibold">Dashboard</h2>
          <p className="text-[16px] font-medium text-gray-500">
            Plan, prioritize and accomplish your courses with ease.
          </p>
        </div>

        <div className="flex flex-row gap-2">
         <PostCourses/>

          <button className="flex flex-row items-center py-3 px-6 hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 outline-2 outline-forestGreen justify-center text-[14px] gap-2 text-forestGreen  rounded-full font-medium">
            <FolderInput className="hidden xs:flex" />
            <span className="font-semibold ">Import Data</span>
          </button>
        </div>

      </main>

      <main className="grid items-center grid-cols-1  xl:grid-cols-4 gap-4 mt-6">
        {cardsData.map((card) => (
          <div key={card.id} onClick={() => setActive(card.id)} className={`cardPreview rounded-lg shadow-card p-4 cursor-pointer transition-all duration-300
              ${
                active === card.id
                  ? "bg-linear-to-bl  from-[#0F5132] via-[#16643E] to-[#26a164] text-white"
                  : "bg-white text-black hover:shadow-lg"
              }`}>

            <div className="flex flex-row justify-between font-raleway items-center">
              <h2 className="font-medium text-[18px]">{card.text}</h2>
              <div className={` p-2 rounded-full w-fit ${ active === card.id ? " text-black bg-white " : "outline-black outline-2"}  `}>
                <ArrowUpRight />
              </div>
            </div>

            <div className="py-2">
              <h1 className="font-semibold text-[40px] font-inter">{card.number}</h1>
            </div>

            <div className={`flex flex-row gap-2  ${active === card.id ? "text-white" : "text-forestGreen" }`}>
              <card.icon />
              <p className="font-medium">{card.subText}</p>
            </div>
          </div>
        ))}

      </main>

    </section>
  )
}

export default DashboardStats