import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <AlertTriangle className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-center">Disclaimer</h1>
          </div>
          <p className="text-center text-lg text-muted-foreground mb-8">Important information about AYACHI Fantasy Sport</p>

          <Alert className="mb-8 border-amber-500 bg-amber-50 dark:bg-amber-950">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-900 dark:text-amber-100">
              <strong>Critical Notice:</strong> Please read this disclaimer carefully. It contains important information about the nature and limitations of our platform.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Card><CardHeader><CardTitle className="text-2xl">1. No Real Money Involvement</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">AYACHI Fantasy Sport is a 100% FREE platform. There are absolutely NO entry fees, NO deposits, NO withdrawals, NO cash prizes, NO monetary rewards, and NO financial transactions of any kind. This is NOT a gambling platform, betting site, or real-money gaming service.</p><p className="text-lg">Users participate purely for educational purposes, entertainment, and to improve their cricket knowledge and analytical skills. There is ZERO financial risk because there is ZERO financial involvement. Any representation or expectation of monetary gain from this platform is entirely unfounded and contrary to our core operating principles.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">2. Educational and Entertainment Purpose Only</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">AYACHI Fantasy Sport is designed exclusively for educational and entertainment purposes. The platform helps users learn about cricket statistics, player performance analysis, strategic thinking, and team management in a risk-free environment. It is not intended as a professional service, investment opportunity, or source of income.</p><p className="text-lg">Any skills or knowledge gained through the platform should be viewed as personal development and recreational learning. We make no claims that participation will lead to professional opportunities, career advancement, or any tangible benefits beyond entertainment and education.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">3. Age and Geographic Restrictions</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">AYACHI Fantasy Sport is available ONLY to individuals who are 18 years of age or older. The platform is NOT available to residents of the following Indian states: Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. These restrictions are absolute and non-negotiable.</p><p className="text-lg">Users are solely responsible for ensuring they meet eligibility requirements. Providing false information about age or location is a violation of our Terms & Conditions and may result in immediate account termination and potential legal consequences. We implement verification measures but cannot guarantee detection of all violations.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">4. No Warranties or Guarantees</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">The platform is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We do not guarantee that the platform will be uninterrupted, error-free, secure, or free from viruses or other harmful components. We make no warranties regarding the accuracy, reliability, or completeness of any content, data, or information provided.</p><p className="text-lg">We disclaim all warranties including but not limited to merchantability, fitness for a particular purpose, and non-infringement. Your use of the platform is at your own risk. We are not responsible for any technical issues, data loss, or interruptions in service.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">5. Third-Party Content and Links</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">Our platform may contain links to third-party websites, display cricket statistics from external sources, or reference information from various providers. We are not responsible for the content, accuracy, privacy practices, or availability of third-party sites or services. Inclusion of links does not imply endorsement.</p><p className="text-lg">Cricket statistics, player information, and match data are obtained from publicly available sources and third-party providers. While we strive for accuracy, we cannot guarantee that all information is current, complete, or error-free. Users should verify critical information from official sources.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">6. Limitation of Liability</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">TO THE MAXIMUM EXTENT PERMITTED BY LAW, AYACHI HEALTHCARE PRIVATE LIMITED, its directors, officers, employees, and affiliates SHALL NOT BE LIABLE for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the platform, even if advised of the possibility of such damages.</p><p className="text-lg">This includes but is not limited to damages for loss of profits, data, goodwill, or other intangible losses. Since our platform involves no financial transactions, users have no financial exposure. However, we are not liable for time invested, disappointment with contest outcomes, or any other non-financial impacts.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">7. User Responsibility</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">Users are solely responsible for their actions on the platform, including team selections, contest participation, and all account activity. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must ensure your use complies with all applicable laws and regulations.</p><p className="text-lg">Users are responsible for their own internet connectivity, device compatibility, and any costs associated with accessing the platform. We are not responsible for issues arising from inadequate internet service, incompatible devices, or user error.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">8. No Professional Advice</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">Nothing on AYACHI Fantasy Sport constitutes professional advice of any kind. The platform does not provide legal, financial, medical, or other professional counsel. Any information, tips, strategies, or suggestions provided are for entertainment and educational purposes only and should not be relied upon for making important decisions.</p><p className="text-lg">Users should consult appropriate professionals for advice specific to their circumstances. We are not responsible for any decisions made based on information obtained through the platform.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">9. Changes and Availability</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">We reserve the right to modify, suspend, or discontinue any aspect of the platform at any time without prior notice. We may change features, add or remove contests, update scoring systems, or alter any other element of the service. We are not obligated to maintain the platform indefinitely.</p><p className="text-lg">The platform may be unavailable due to maintenance, technical issues, or other reasons beyond our control. We are not liable for any inconvenience, loss of access, or inability to participate in contests due to platform unavailability.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">10. Indemnification</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">You agree to indemnify, defend, and hold harmless AYACHI HEALTHCARE PRIVATE LIMITED, its directors, officers, employees, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the platform, violation of these terms, or infringement of any rights of another party.</p><p className="text-lg">This indemnification obligation survives termination of your account and your use of the platform. You acknowledge that you are solely responsible for your conduct and any consequences thereof.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">11. Governing Law and Jurisdiction</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">This disclaimer and all aspects of your use of the platform are governed by the laws of India, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts in Lucknow, Uttar Pradesh, India.</p><p className="text-lg">If any provision of this disclaimer is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. Our failure to enforce any right or provision shall not constitute a waiver of such right or provision.</p></CardContent></Card>

            <Card className="bg-primary/5"><CardHeader><CardTitle className="text-2xl">Contact Information</CardTitle></CardHeader><CardContent><p className="text-lg mb-4">For questions about this disclaimer:</p><div className="space-y-2"><p><strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong></p><p><strong>CIN:</strong> U24110UP2020PTC135826</p><p><strong>Address:</strong> H. NO. 1/104, NEW JIA MAU, NEAR PARAG ATM, LUCKNOW, Uttar Pradesh, 226001</p><p><strong>GST:</strong> 09AAUCA1674K1Z1</p><p><strong>PAN:</strong> AAUCA1674K</p></div></CardContent></Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
