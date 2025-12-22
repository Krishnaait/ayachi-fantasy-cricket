import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Info } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-center">Privacy Policy</h1>
          </div>
          <p className="text-center text-muted-foreground mb-8">Last Updated: December 22, 2025</p>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Card><CardHeader><CardTitle className="text-2xl">1. Information We Collect</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">We collect information you provide directly when registering: full name, email address, date of birth, state of residence, and password. We also collect information automatically through your use of the Platform, including IP address, browser type, device information, and usage patterns.</p><p className="text-lg">We collect contest participation data, team creation history, and interaction with Platform features. This helps us improve services, verify eligibility, and ensure compliance with age and geographic restrictions. All data collection is limited to what is necessary for Platform functionality.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">2. How We Use Your Information</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">We use your information to: create and manage your account; verify your age and location eligibility; provide Platform services and features; communicate important updates; improve user experience; ensure Platform security; comply with legal obligations; and prevent fraud and abuse.</p><p className="text-lg">We do NOT use your information for monetary transactions (as this is a free platform), sell your data to third parties for marketing, or share your personal information except as described in this policy. Your data is used solely to enhance your experience on our educational fantasy cricket platform.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">3. Data Storage and Security</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Your password is encrypted using secure hashing algorithms. We use SSL/TLS encryption for data transmission and store data on secure servers with restricted access.</p><p className="text-lg">While we take reasonable precautions, no internet transmission is 100% secure. You are responsible for maintaining the confidentiality of your account credentials. We recommend using a strong, unique password and never sharing your login information with others.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">4. Cookies and Tracking</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">We use cookies and similar tracking technologies to enhance your experience, maintain your login session, remember your preferences, and analyze Platform usage. Cookies are small text files stored on your device that help us recognize you on return visits.</p><p className="text-lg">You can control cookie settings through your browser preferences. However, disabling cookies may limit your ability to use certain Platform features. We use both session cookies (deleted when you close your browser) and persistent cookies (remain until deleted or expired).</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">5. Third-Party Services</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">We may use third-party services for analytics, hosting, and Platform functionality. These service providers have access to your information only to perform specific tasks on our behalf and are obligated to protect your data and not use it for other purposes.</p><p className="text-lg">Our Platform may contain links to external websites. We are not responsible for the privacy practices of third-party sites. We encourage you to review the privacy policies of any external sites you visit through our Platform.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">6. Data Sharing and Disclosure</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">We do NOT sell, rent, or trade your personal information to third parties. We may share your information only in the following limited circumstances: with service providers who assist in Platform operations; when required by law or legal process; to protect our rights, property, or safety; with your explicit consent; or in connection with a business transfer or merger.</p><p className="text-lg">Any data sharing is done with strict confidentiality agreements and security measures in place. We ensure that third parties receiving your data comply with applicable data protection laws and use the information only for specified purposes.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">7. Your Privacy Rights</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">You have the right to: access your personal information; request correction of inaccurate data; request deletion of your account and data; opt-out of marketing communications; withdraw consent for data processing; and receive a copy of your data in a portable format.</p><p className="text-lg">To exercise these rights, contact us using the information provided below. We will respond to your request within 30 days. Note that certain information may be retained as required by law or for legitimate business purposes even after account deletion.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">8. Data Retention</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">We retain your personal information for as long as your account is active or as needed to provide services. After account termination, we may retain certain information for legal compliance, dispute resolution, fraud prevention, and enforcement of our Terms & Conditions.</p><p className="text-lg">Anonymized or aggregated data may be retained indefinitely for analytical purposes. You can request deletion of your account and associated data at any time, subject to our legal obligations to retain certain records.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">9. Children's Privacy</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">AYACHI Fantasy Sport is NOT intended for individuals under 18 years of age. We do not knowingly collect personal information from minors. If we discover that we have inadvertently collected information from someone under 18, we will immediately delete that information.</p><p className="text-lg">Parents or guardians who believe their child has provided personal information to us should contact us immediately. We take age verification seriously and implement measures to prevent underage registration.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">10. Changes to Privacy Policy</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or business operations. We will notify you of material changes by updating the "Last Updated" date and may provide additional notice through email or Platform notifications.</p><p className="text-lg">Your continued use of the Platform after changes constitutes acceptance of the updated Privacy Policy. We encourage you to review this policy regularly to stay informed about how we protect your information.</p></CardContent></Card>

            <Card className="bg-primary/5"><CardHeader><CardTitle className="text-2xl">Contact Us</CardTitle></CardHeader><CardContent><p className="text-lg mb-4">For privacy-related questions or to exercise your rights:</p><div className="space-y-2"><p><strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong></p><p><strong>Address:</strong> H. NO. 1/104, NEW JIA MAU, NEAR PARAG ATM, LUCKNOW, Uttar Pradesh, 226001</p><p><strong>CIN:</strong> U24110UP2020PTC135826</p></div></CardContent></Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
