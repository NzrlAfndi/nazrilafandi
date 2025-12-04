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
import WhatsAppFloat from './components/WhatsappFloat';
import AboutUs from './components/AboutUs';

const LandingPage: React.FC = () => {
  return (
    <div className="font-sans text-gray-800 bg-orange-50 scroll-smooth">
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
      <WhatsAppFloat />
    </div>
  );
};

export default LandingPage;