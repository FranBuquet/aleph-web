import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import NoApp from "@/components/NoApp";
import Audiences from "@/components/Audiences";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <NoApp />
      <Audiences />
      <Features />
      <HowItWorks />
      <FinalCTA />
    </>
  );
}
