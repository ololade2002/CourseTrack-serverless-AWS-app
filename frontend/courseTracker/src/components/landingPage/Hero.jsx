import hero from "../../assets/heroImg.png";

const Hero = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 relative">
      <main className="flex flex-col gap-9 font-raleway justify-center items-center pt-16 pb-12 sm:pb-20">
        <div>
          <div className="bg-white shadow-card bg-linear-to-b from-emerald-50 via-green-50 to-green-50 sm:bg-[#eff0f3] px-2 md:px-8 py-2 w-fit mx-auto rounded-full">
            <p className="font-semibold text-forestGreen text-[14px] md:text-[16px]">
              CourseTrack{" "}
              <span className="font-normal text-black  ">
                • Simple learning progress tracker
              </span>{" "}
            </p>
          </div>

          <div className=" w-full text-center lg:w-9/12  mx-auto">
            <h2 className="text-[30px] pt-4  pb-4 lg:text-[70px] font-bold font-inter lg:leading-23  ">
              Finish more courses. Build more consistency.{" "}
            </h2>
            <p className="pb-4 sm:pb-8 text-[15px] smx:text-[17px] leading-7 w-full sm:w-10/12 mx-auto text-center font-medium">
              {" "}
              CourseTrack helps you keep all your courses in one place, track
              your progress quickly, and stay consistent so your learning keeps
              moving forward.{" "}
            </p>
          </div>

          <div className="flex flex-row items-center gap-4 justify-center  ">
            <a
              href="#"
              id="#login"
              className="w-44 text-center py-3 text-[16px] font-medium text-white bg-forestGreen rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 "
            >
              Get Started free{" "}
            </a>
          </div>
        </div>

        <div className=" rounded-lg shadow-card">
          <img className="rounded-lg" src={hero} alt="Hero Image" />
        </div>
      </main>
    </section>
  );
};

export default Hero;
