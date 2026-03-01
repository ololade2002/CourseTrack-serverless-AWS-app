import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Cta from "./Cta";
import Social from "./Social";
import Navbar from "./Navbar";


const Home = () => {
  return (
    <div className="relative overflow-hidden isolate pt-12 lg:pt-24 ">
      <Navbar/>
      <Hero />
      <Social/>
      <Features />
      <HowItWorks/>
      <Cta/>
    </div>
  );
};

export default Home;
