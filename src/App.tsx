import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Framework from "./pages/Framework";
import FrameworkAlign from "./pages/FrameworkAlign";
import FrameworkLive from "./pages/FrameworkLive";
import FrameworkInvest from "./pages/FrameworkInvest";
import FrameworkYrusha from "./pages/FrameworkYrusha";
import FrameworkAdapt from "./pages/FrameworkAdapt";
import About from "./pages/About";
import Services from "./pages/Services";
import Events from "./pages/Events";
import News from "./pages/News";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import ReadinessScore from "./pages/ReadinessScore";
import RealEstateReadinessParent from "./pages/RealEstateReadinessParent";
import WhereShouldILive from "./pages/WhereShouldILive";
import AmIReadyToBuy from "./pages/AmIReadyToBuy";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/framework" element={<Framework />} />
          <Route path="/framework/a" element={<FrameworkAlign />} />
          <Route path="/framework/l" element={<FrameworkLive />} />
          <Route path="/framework/i" element={<FrameworkInvest />} />
          <Route path="/framework/y" element={<FrameworkYrusha />} />
          <Route path="/framework/adapt" element={<FrameworkAdapt />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/readiness" element={<ReadinessScore />} />
          <Route path="/real-estate-readiness" element={<RealEstateReadinessParent />} />
          <Route path="/where-should-i-live" element={<WhereShouldILive />} />
          <Route path="/am-i-ready-to-buy" element={<AmIReadyToBuy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
// Force rebuild Tue Oct 21 10:08:57 EDT 2025
