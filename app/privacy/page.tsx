import { createMetadata } from "@/lib/seo"
import { LegalPage } from "@/components/shared/legal-page"
import { siteConfig } from "@/src/config/site"

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "How Urban Growlyst collects, uses and protects your information.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="At Urban Growlyst (https://urbangrowlyst.com), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website or use our services. By using our website or services, you agree to this Privacy Policy."
      sections={[
        { heading: "1. Information We Collect", body: "1.1 Personal information. When you register, book a demo, contact us or make a purchase, we may collect your name, email address, phone number, business name and details about your business (such as type and number of branches), and payment-related details used only for payment verification. We do not store card details. 1.2 Non-personal information. We may automatically collect your IP address, browser type and version, device information, pages visited, time spent on the website and referring URLs. This is used for analytics, security and improving the website." },
        { heading: "2. How We Use Your Information", body: "We use your information to: provide and deliver our products and services; respond to enquiries, demo requests and support requests; verify payments, including manual payments (UPI or bank transfer); contact you by phone, email or WhatsApp about your enquiry or service; improve website functionality and user experience; send service updates or promotional messages (you may opt out at any time); and prevent fraud, abuse and unauthorised access." },
        { heading: "3. Manual Payments", body: "If you pay manually, we may collect payment reference details or screenshots solely to verify the payment. This information is not shared publicly and is kept only as long as needed for accounting, legal or dispute-resolution purposes." },
        { heading: "4. Cookies and Tracking", body: "We use cookies and similar technologies to understand user behaviour, improve site performance and measure marketing effectiveness. You can disable cookies in your browser settings, but some features may not work properly." },
        { heading: "5. Sharing of Information", body: "We do not sell, trade or rent your personal information. We may share it only: with trusted service providers (such as hosting, payment gateways, analytics and form-handling tools) strictly to deliver our services; to comply with legal obligations or law enforcement requests; and to protect our rights, property or safety." },
        { heading: "6. Data Security", body: "We use reasonable administrative, technical and security measures to protect your information. However, no online system is completely secure, and we cannot guarantee absolute security." },
        { heading: "7. Our Platform and Third-Party Links", body: "This website links to our platform website, which is also owned and operated by Urban Growlyst. When you log in there to use our dashboard or loyalty program, the information you enter is collected and protected by us under the same standards described in this policy. Our website may also link to third-party websites or tools. We are not responsible for their privacy practices or content, and we encourage you to read their policies." },
        { heading: "10. Changes to This Policy", body: "We may update this Privacy Policy at any time. Changes take effect when posted on this page, and continued use of the website means you accept the updated policy." },
        { heading: "11. Contact Us and Grievances", body: `For questions, requests or complaints about this policy or your data: Grievance contact: Urban Growlyst Support Team. Email: ${siteConfig.email}. Phone / WhatsApp: ${siteConfig.phoneDisplay}. Website: ${siteConfig.url}.` },
      ]}
    />
  )
}
