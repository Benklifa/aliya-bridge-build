import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import PageMeta from "@/components/PageMeta";
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
import AliyaProjectPlanning from "./pages/AliyaProjectPlanning";
import Tools from "./pages/Tools";
import Glossary from "./pages/Glossary";
import RiskProfile from "./pages/RiskProfile";
import Disclosures from "./pages/Disclosures";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const Root = () => {
  const { pathname } = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Site-level fallback so any route without its own <PageMeta> still
            ships real tags instead of a bare <head>. Every routed page below
            renders its own <PageMeta>, which — per react-helmet-async's
            render-order merge — overrides this one for that page. */}
        <PageMeta
          title="Aliya Financial - Planning for Life's Major Transitions, Wherever They Take You"
          description="Aliya Financial: planning for life's major transitions, wherever they take you. Financial and retirement planning for relocation, career change, and cross-border transitions — including specialized U.S.-Israel Aliyah planning."
          path={pathname}
        />
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      { path: "framework", element: <Framework /> },
      { path: "framework/a", element: <FrameworkAlign /> },
      { path: "framework/l", element: <FrameworkLive /> },
      { path: "framework/i", element: <FrameworkInvest /> },
      { path: "framework/y", element: <FrameworkYrusha /> },
      { path: "framework/adapt", element: <FrameworkAdapt /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "events", element: <Events /> },
      { path: "news", element: <News /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ /> },
      // Kept live but unlinked while comparing against /risk-profile — see Layout.tsx nav/footer
      { path: "readiness", element: <ReadinessScore /> },
      { path: "risk-profile", element: <RiskProfile /> },
      { path: "aliya-project-planning", element: <AliyaProjectPlanning /> },
      { path: "tools", element: <Tools /> },
      { path: "glossary", element: <Glossary /> },
      { path: "disclosures", element: <Disclosures /> },
      // "404" is a real static path so the build emits dist/404.html, which
      // Vercel serves (with a 404 status) for any unknown URL once the SPA
      // catch-all rewrite is gone. The "*" route covers client-side navigation.
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
