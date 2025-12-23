import React from 'react';
import AboutSection from '../components/AboutSection';
import ContactForm from '../components/ContactForm';
import CTABanner from '../components/CTABanner';
import Equipment from '../components/Equipment';
import FleetEvidence from '../components/FleetEvidence';
import Hero from '../components/Hero';
import Lanes from '../components/Lanes';
import Services from '../components/Services';
import TrustMarquee from '../components/TrustMarquee';
import TrustStrip from '../components/TrustStrip';


const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <TrustMarquee />
            <Equipment />
            <AboutSection />
            <Lanes />
            <FleetEvidence />
            <TrustStrip />
            <Services />
            <ContactForm />
            <CTABanner />
            
        </>
    );
};

export default HomePage;
