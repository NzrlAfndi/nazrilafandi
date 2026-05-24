import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsCounter from './components/StatsCounter';
import WhyChoose from './components/WhyChoose';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import Workflow from './components/Workflow';
import Testimoni from './components/Testimoni';
import ContactPerson from './components/ContactPerson';
import Footer from './components/Footer';
import PageTracker from './components/PageTracker';
import AboutUs from './components/AboutUs';

const LandingPage: React.FC = () => {
  return (
    // Satu latar tahoe-bg menyelimuti seluruh halaman
    <div className="font-sans text-gray-800 tahoe-bg min-h-screen scroll-smooth relative">
      {/* Fixed ambient orbs (behind everything) */}
      <div className="fixed top-[-120px] left-[-100px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-300/20 to-orange-400/15 blur-[100px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-orange-400/18 to-yellow-300/12 blur-[90px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber-200/12 to-transparent blur-[80px] pointer-events-none -z-10" />

      <PageTracker />
      <Navbar />
      <HeroSection />
      <StatsCounter />
      <AboutUs />
      <WhyChoose />
      <Services />
      <Pricing />
      <Portfolio />
      <Workflow />
      <Testimoni />
      <ContactPerson />
      <Footer />
    </div>
  );
};

export default LandingPage;