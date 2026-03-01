import Hero from "../../components/home/Hero";
import AboutCards from "../../components/home/AboutCards";
import Services from "../../components/home/Services";
import WorksPreview from "../../components/home/WorkPreview";
import Testimonials from "../../components/home/Testimonial";
import CTASection from "../../components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutCards />
      <Services />
      <WorksPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
