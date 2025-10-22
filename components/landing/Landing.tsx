import HeroSection from './HeroSection'
import BenefitsSection from './BenefitsSection'
import HowItWorkSection from './HowItWorkSection'
import CalculatorSection from './CalculatorSection'
import RequirementsSection from './RequirementsSection'
import CtaFinalSection from './CtaFinalSection'
import FooterSection from './FooterSection'
import WhatsAppButton from './WhatsAppButton'

const LandingPage = () => {
  return (
    <div className='min-h-screen '>
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* How It Works */}
      <HowItWorkSection />

      {/* Calculator */}
      <CalculatorSection />

      {/* Requirements */}
      <RequirementsSection />

      {/* CTA Final */}
      <CtaFinalSection />

      {/* Footer */}
      <FooterSection />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}

export default LandingPage
