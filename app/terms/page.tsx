import { createMetadata } from "@/lib/seo"
import { LegalPage } from "@/components/shared/legal-page"
import { siteConfig } from "@/src/config/site"

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "The terms that apply when you use Urban Growlyst.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="Last updated: 13 November 2026. Welcome to Urban Growlyst (https://urbangrowlyst.com). These Terms govern your access to and use of our website and services. By using our website or making a purchase, you agree to these Terms. If you do not agree, please do not use our services."
      sections={[
        { heading: "1. About Our Services", body: "Urban Growlyst provides AI-powered review tools for businesses, including customized AI review pages and AI-assisted replies to Google reviews, along with a customer loyalty program. Some of these services are delivered through our platform website, which is also owned and operated by Urban Growlyst and requires login. Our services are provided under these Terms, our Refund & Cancellation Policy and other policies published on our websites." },
        { heading: "2. Eligibility", body: "By using our website or services, you confirm that you are at least 18 years old or legally able to enter a binding agreement under Indian law, and that the information you provide is accurate and complete." },
        { heading: "3. Pricing and Payments", body: "3.1 Payment modes. We accept online payments (cards, UPI, net banking, wallets) and manual payments such as UPI or bank transfer, as communicated by our team. 3.2 Manual payments. Confirmation may take additional time. Services or access are provided only after payment is verified, and you are responsible for sharing correct payment proof. 3.3 Taxes. Prices are exclusive of applicable taxes (such as GST) unless stated otherwise. Applicable taxes are borne by the customer." },
        { heading: "4. Refunds and Cancellations", body: "All sales are final and non-refundable, as set out in our Refund & Cancellation Policy, except where required by applicable law." },
        { heading: "5. Service Delivery", body: "Access to our services is usually delivered electronically. Timelines may vary depending on the service. Delays caused by incomplete or incorrect information or by customer non-responsiveness are not our responsibility." },
        { heading: "6. User Responsibilities", body: "You agree: not to misuse, copy, resell, reverse-engineer or redistribute our products or services; not to use our services for illegal, abusive, fraudulent or unethical purposes; not to post fake or misleading reviews using our tools; and to keep your login credentials and account details confidential." },
        { heading: "7. Intellectual Property", body: "All content on this website, including text, graphics, logos, software, designs and trademarks, belongs to Urban Growlyst unless stated otherwise. You may not copy, reproduce, modify, distribute or exploit it without our written permission." },
        { heading: "8. Third-Party Tools and Services", body: "Our services may rely on third-party platforms such as Google, WhatsApp, hosting providers and payment gateways. We are not responsible for downtime, policy changes or issues caused by those third parties." },
        { heading: "9. Limitation of Liability", body: "To the maximum extent permitted by law, Urban Growlyst is not liable for indirect, incidental, special or consequential damages. We do not guarantee specific business results, rankings, reviews, leads or revenue. Services are provided “as is” and “as available”." },
        { heading: "10. Termination of Access", body: "We may suspend or terminate access without prior notice if these Terms are violated, if payment disputes or chargebacks are raised, or if the services are misused. No refunds are given in such cases." },
        { heading: "11. Changes to These Terms", body: "We may update these Terms at any time. Continued use of the website or services after changes means you accept the updated Terms." },
        { heading: "12. Governing Law", body: "These Terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts in Mumbai, India." },
        { heading: "13. Contact", body: `Email: ${siteConfig.email}. Phone / WhatsApp: ${siteConfig.phoneDisplay}. Website: ${siteConfig.url}.` },
      ]}
    />
  )
}
