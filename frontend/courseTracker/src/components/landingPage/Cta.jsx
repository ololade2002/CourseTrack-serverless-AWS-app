import backgroundImage from "@/assets/img6.png";
import logo from "@/assets/logo.png";

const Cta = () => {
  return (
    <section className="relative font-raleway min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 text-center flex flex-col items-center gap-8">
        <div>
          <h2 className="text-[30px] md:text-[60px] font-semibold leading-tight">
            {" "}
            Start tracking today. Finish more courses this month.{" "}
          </h2>
          <p className="text-[15px] sm:text-[16px] font-medium pt-3 max-w-xl mx-auto">
            {" "}
            Join thousands of learners who are already using CourseTrack to stay
            organized and motivated.
          </p>
        </div>

        <a
          href="#login"
          className="px-8 py-4 text-[16px] font-medium text-white bg-forestGreen rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 transition"
        >
          Get Started free
        </a>

        <div className="absolute bottom-3">
          <img
            className="h-8  md:h-9 w-auto"
            src={logo}
            alt="CourseTrack Logo"
          />
        </div>
      </div>
    </section>
  );
};

export default Cta;
