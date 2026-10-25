import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BackToTop from "@/components/BackToTop";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/Services"));
const Products = lazy(() => import("./pages/Products"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AlbumPage = lazy(() => import("./pages/AlbumPage"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DomotiquePage = lazy(() => import("./pages/Domotique"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));
const CGV = lazy(() => import("./pages/CGV"));
const AltisDownload = lazy(() => import("./pages/AltisDownload"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen" translate="no">
          <a
            href="#contenu-principal"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-5 focus:py-2 focus:text-primary-foreground"
          >
            Aller au contenu principal
          </a>
          <Navbar />
          <main id="contenu-principal">
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/produits" element={<Products />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/blog/albums/:slug" element={<AlbumPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/domotique" element={<DomotiquePage />} />
                <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
                <Route path="/cgv" element={<CGV />} />
                <Route path="/altis-download" element={<AltisDownload />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
