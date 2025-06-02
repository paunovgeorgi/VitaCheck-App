import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import Features from "./components/Features";
import HomeHeader from "./components/HomeHeader";
import HowItWorks from "./components/HowItWorks";
import PreviewApp from "./components/PreviewApp";
import Testimonials from "./components/Testimonials";


export default function Home() {


 

  return (
    <>
      <HomeHeader />
      <Benefits />
      <PreviewApp />
      <HowItWorks />
      <Testimonials />
      <Features />
      <CTA />
    </>
  );
}
