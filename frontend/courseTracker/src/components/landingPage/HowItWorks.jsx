import React from "react";
import img1 from "@/assets/img4.png";

const HowItWorks = () => {
  return (
    <section className="max-w-6xl mx-auto pt-12 pb-20 sm:pt-20 sm:pb-40 px-4 lg:px-8 font-raleway ">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-112 w-md rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.35)_1px,transparent_1px)] bg-size-[22px_22px]" />
      <div className="text-center ">
        <h2 className="text-[30px] md:text-[55px] font-semibold">
          How It <span className="text-forestGreen">Works</span>
        </h2>
        <p className="text-[16px] pb-6 md:pb-12 text-center font-medium pt-2">
          Start in under a minute.
        </p>
      </div>

      <main className="flex flex-col items-center md:flex-row gap-4">
        <div className="flex-1">
          <img src={img1} alt="How it works" />
        </div>

        <div className="flex flex-col flex-1 items-center gap-4 sm:gap-6 ">
          <div className="bg-gray-100 shadow-card px-4 py-6 rounded-lg">
            <h2 className="font-semibold text-[17px] text-forestGreen pb-2">
              Step 1 — Add a course
            </h2>
            <p className="text-[15px] font-medium">
              Simply paste the course title and link, then choose a category to
              keep everything organized from the start.
            </p>
          </div>

          <div className="bg-gray-100 shadow-card px-4 py-6 rounded-lg">
            <h2 className="font-semibold text-[17px] text-forestGreen pb-2">
              Step 2 — Track your progress
            </h2>
            <p className="text-[15px] font-medium">
              Update your progress as you learn. Quick, simple, and designed to
              fit naturally into your study routine.
            </p>
          </div>

          <div className="bg-gray-100 shadow-card px-4 py-6 rounded-lg">
            <h2 className="font-semibold text-[17px] text-forestGreen pb-2">
              Step 3 — Complete and move forward
            </h2>
            <p className="text-[15px] font-medium">
              Mark courses as completed and watch your learning journey unfold.
              CourseTrack keeps you motivated and on track to achieve your
              goals.
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default HowItWorks;
