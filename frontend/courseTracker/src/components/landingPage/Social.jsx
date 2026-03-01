import React from "react";
import { IoLogoYoutube } from "react-icons/io5";
import { SiCoursera } from "react-icons/si";
import { SiUdemy } from "react-icons/si";
import learn from "@/assets/img5.png";

const Social = () => {
  return (
    <section className=" ">
      <main className=" max-w-6xl mx-auto px-4 lg:px-8 py-12 sm:py-20 font-raleway">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-4 justify-center">
          <div className="flex-1">
            <img src={learn} alt="Built for how people actually learn" />
          </div>

          <div className="flex-1">
            <div>
              <h2 className="text-[30px] md:leading-19 md:text-[55px] pb-6 sm:pb-8 text-center md:text-left font-semibold">
                Built for how people{" "}
                <span className="text-forestGreen">actually learn.</span>
              </h2>
              <p className="text-[16px] pb-8 sm:pb-10 text-justify sm:text-center md:text-left font-medium pt-2">
                CourseTrack keeps your learning plan simple, organized, and easy to follow. 
                It brings everything into one clear space so you always know what you&apos;re working on, what you&apos;ve completed, and what comes next.
              </p>
            </div>

            <div className="flex flex-col justify-between smx:flex-row gap-4">
              <div className="flex flex-row  gap-2 w-full mx-auto justify-center smx:w-54 items-center bg-gray-100 shadow-card px-6  py-3 rounded-xl">
                <IoLogoYoutube className="text-red-600" />
                <h3 className="text-[16px] font-medium">YouTube Channel</h3>
              </div>
              <div className="flex flex-row gap-2 w-full mx-auto justify-center smx:w-54 items-center bg-gray-100  shadow-card px-6  py-3 rounded-xl">
                <SiCoursera className="text-blue-600" />
                <h3 className="text-[16px] font-medium">Coursera Courses</h3>
              </div>
              <div className="flex flex-row  gap-2 w-full mx-auto justify-center smx:w-54 items-center bg-gray-100 shadow-card px-6  py-3 rounded-xl">
                <SiUdemy className="text-orange-600" />
                <h3 className="text-[16px] font-medium">Udemy Courses</h3>
              </div>
              
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Social;

