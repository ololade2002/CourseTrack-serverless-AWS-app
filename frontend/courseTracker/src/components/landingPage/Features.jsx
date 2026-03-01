import { featuresData } from "@/data/data";

const Features = () => {
  return (
    <section className="font-raleway  ">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-112 w-md rounded-full bg-emerald-500/10 blur-3xl" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.35)_1px,transparent_1px)] bg-size-[22px_22px]" />

      <div className="max-w-6xl mx-auto px-4 pt-8 pb-12 sm:py-20 lg:px-8">
        <div className="text-center">
          <h2 className="text-[30px] md:text-[55px] font-semibold">
            Everything you need to{" "}
            <span className="text-forestGreen">stay consistent</span>
          </h2>
          <p className="text-[15px] sm:text-[16px] w-full sm:w-9/12 mx-auto pb-8 pt-6 sm:pb-12 text-justify sm:text-center font-medium ">
            CourseTrack keeps your learning plan simple, structured, and easy to
            follow. Instead of juggling links, notes, and half-finished courses,
            you get a clear system that shows your progress, keeps you
            consistent, and helps you move forward with confidence.
          </p>
        </div>

        <div className="max-w-6xl mx-auto  lg:px-8 grid gap-4 sm:gap-5 md:grid-cols-1 lg:grid-cols-3 items- font-raleway justify-between">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-100 px-4 py-4 rounded-lg shadow-card flex flex-row w-full items-center md:items-start gap-4">
              <div className="bg-forestGreen p-2.5 rounded-lg">
                <feature.icon className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-[17px] text-forestGreen font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-[15px] font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
