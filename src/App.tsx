import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, type ReactNode } from "react";
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
import WhereShouldILive from "./pages/WhereShouldILive";
import AmIReadyToBuy from "./pages/AmIReadyToBuy";
import Tools from "./pages/Tools";
import Glossary from "./pages/Glossary";
import Disclosures from "./pages/Disclosures";
import Privacy from "./pages/Privacy";
import LifeEvent from "./pages/LifeEvent";
import BorrowAgainstPortfolio from "./pages/BorrowAgainstPortfolio";
import AliyaPlan from "./pages/AliyaPlan";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import MetaPixelTracker from "./components/MetaPixelTracker";

// Routes are wrapped by a router passed in: BrowserRouter on the client,
// StaticRouter during build-time prerendering (src/entry-server.tsx).
type RouterShell = (props: { children: ReactNode }) => JSX.Element;
const DefaultRouter: RouterShell = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

const App = ({ Router = DefaultRouter }: { Router?: RouterShell }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <ScrollToTop />
        <MetaPixelTracker />
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
          <Route path="/where-should-i-live" element={<WhereShouldILive />} />
          <Route path="/am-i-ready-to-buy" element={<AmIReadyToBuy />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/disclosures" element={<Disclosures />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/life-events/:slug" element={<LifeEvent />} />
          <Route path="/aliya-plan" element={<AliyaPlan />} />
          <Route path="/borrow-against-portfolio" element={<BorrowAgainstPortfolio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
// Force rebuild Tue Oct 21 10:08:57 EDT 2025
