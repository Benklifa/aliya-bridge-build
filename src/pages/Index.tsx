import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import DidYouKnowTicker from "@/components/DidYouKnowTicker";
import HomeServices from "@/components/HomeServices";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <DidYouKnowTicker />
      <HomeServices />
    </Layout>
  );
};

export default Index;
