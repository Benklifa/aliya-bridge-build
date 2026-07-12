import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import TwoDoorModule from "@/components/TwoDoorModule";
import DidYouKnowTicker from "@/components/DidYouKnowTicker";

import ServicesPreview from "@/components/ServicesPreview";
import CTAStrip from "@/components/CTAStrip";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <TwoDoorModule />
      <DidYouKnowTicker />
      
      <ServicesPreview />
      <CTAStrip />
    </Layout>
  );
};

export default Index;
