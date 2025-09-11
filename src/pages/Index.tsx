import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import DidYouKnowTicker from "@/components/DidYouKnowTicker";

import ServicesPreview from "@/components/ServicesPreview";
import SocialProof from "@/components/SocialProof";
import CTAStrip from "@/components/CTAStrip";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <DidYouKnowTicker />
      
      <ServicesPreview />
      <SocialProof />
      <CTAStrip />
    </Layout>
  );
};

export default Index;
