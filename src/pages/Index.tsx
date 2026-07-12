import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import TwoDoorModule from "@/components/TwoDoorModule";
import DidYouKnowTicker from "@/components/DidYouKnowTicker";

import ServicesPreview from "@/components/ServicesPreview";
import LeadMagnetCapture from "@/components/LeadMagnetCapture";
import CTAStrip from "@/components/CTAStrip";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <TwoDoorModule />
      <DidYouKnowTicker />
      
      <ServicesPreview />
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <LeadMagnetCapture source="homepage" />
        </div>
      </section>
      <CTAStrip />
    </Layout>
  );
};

export default Index;
