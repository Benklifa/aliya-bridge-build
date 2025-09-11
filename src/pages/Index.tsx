import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import DidYouKnowTicker from "@/components/DidYouKnowTicker";

import ServicesPreview from "@/components/ServicesPreview";
import CTAStrip from "@/components/CTAStrip";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <DidYouKnowTicker />
      
      <ServicesPreview />
      <CTAStrip />
    </Layout>
  );
};

export default Index;
