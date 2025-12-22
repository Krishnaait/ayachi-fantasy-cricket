import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Scale } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Scale className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-center">Terms & Conditions</h1>
          </div>
          <p className="text-center text-muted-foreground mb-2">Last Updated: December 22, 2025</p>

          <Alert className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> By using AYACHI Fantasy Sport, you agree to these Terms & Conditions.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Card><CardHeader><CardTitle className="text-2xl">1. Definitions</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">For purposes of these Terms, the following definitions apply: "Platform" refers to AYACHI Fantasy Sport website and services. "Company" refers to AYACHI HEALTHCARE PRIVATE LIMITED (CIN: U24110UP2020PTC135826). "User" refers to any individual accessing or using the Platform. "Account" means your registered user profile. "Contest" refers to fantasy cricket competitions hosted on the Platform.</p><p className="text-lg">These definitions help clarify the relationship between all parties and ensure mutual understanding of rights and obligations throughout these Terms.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">2. Acceptance of Terms</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">These Terms constitute a legally binding agreement between you and AYACHI HEALTHCARE PRIVATE LIMITED. By creating an account, accessing, or using any part of the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, Responsible Gaming Policy, and all other policies referenced herein.</p><p className="text-lg">If you do not agree with any provision of these Terms, you must immediately cease using the Platform. Your continued use after any modifications constitutes acceptance of the updated Terms. We reserve the right to modify these Terms at any time, and it is your responsibility to review them periodically.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">3. Eligibility</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">To use AYACHI Fantasy Sport, you must be at least 18 years of age at the time of registration. You must NOT be a resident of the following Indian states: Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, or Sikkim. You must have the legal capacity to enter into binding contracts under applicable law.</p><p className="text-lg">You must provide accurate, current, and complete information during registration. We reserve the right to verify your age and location at any time. Failure to meet these eligibility requirements or providing false information will result in immediate account termination without notice.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">4. Account Registration</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">To access certain features, you must create an account by providing your full name, email address, date of birth, state of residence, and a secure password. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p><p className="text-lg">Each user is permitted only ONE account. Creating multiple accounts, using fake identities, or sharing your account with others is strictly prohibited. You must immediately notify us of any unauthorized use of your account. We will not be liable for any loss arising from unauthorized account access due to your failure to protect your credentials.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">5. Platform Usage Rules</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">You agree to use the Platform only for lawful purposes and in accordance with these Terms. You must not use the Platform in any way that violates applicable laws or regulations, infringes on the rights of others, or could damage, disable, or impair the Platform's functionality.</p><p className="text-lg">You are responsible for ensuring that your use of the Platform complies with all applicable local, state, national, and international laws. Any violation of these usage rules may result in immediate termination of your account and potential legal action.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">6. Free-to-Play Model</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">AYACHI Fantasy Sport is a 100% FREE platform. There are NO entry fees, NO deposits, NO withdrawals, NO cash prizes, and NO monetary rewards of any kind. This is NOT a gambling platform. No real money is involved in any aspect of the service.</p><p className="text-lg">The Platform is designed purely for educational purposes and entertainment. Users participate to learn cricket analytics and improve strategic thinking without any financial risk or reward. By using this Platform, you acknowledge and accept that there is absolutely no financial element involved.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">7. Intellectual Property</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">All content, features, functionality, design, graphics, logos, text, images, software, and materials on the Platform are the exclusive property of AYACHI HEALTHCARE PRIVATE LIMITED or our licensors and are protected by Indian and international copyright, trademark, and other intellectual property laws.</p><p className="text-lg">We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for personal, non-commercial purposes only. You may not copy, modify, distribute, sell, or create derivative works from our content without explicit written permission.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">8. User Conduct</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">You agree to conduct yourself in a respectful, ethical, and lawful manner while using the Platform. You must treat other users, staff, and all individuals with respect and courtesy. Harassment, abuse, hate speech, or threatening behavior of any kind is strictly prohibited.</p><p className="text-lg">You must not engage in any activity that could harm the Platform's reputation, interfere with other users' enjoyment, or compromise the integrity of contests. Professional and sportsmanlike conduct is expected at all times.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">9. Prohibited Activities</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">The following activities are strictly prohibited: creating multiple accounts; using bots, scripts, or automated tools; manipulating contests or engaging in fraud; harassing or threatening other users; using the Platform for illegal purposes; attempting to hack or compromise Platform security; sharing account credentials; engaging in commercial activities without permission.</p><p className="text-lg">Violation of these prohibitions will result in immediate account suspension or termination, potential legal action, and reporting to appropriate authorities. We have zero tolerance for fraudulent or abusive behavior.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">10. Termination</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">We may terminate or suspend your access to the Platform immediately, without prior notice or liability, for any reason including but not limited to breach of these Terms, fraudulent activity, or behavior deemed harmful to the Platform or other users. Upon termination, your right to use the Platform will immediately cease.</p><p className="text-lg">You may terminate your account at any time by contacting us. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">11. Limitation of Liability</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">TO THE MAXIMUM EXTENT PERMITTED BY LAW, AYACHI HEALTHCARE PRIVATE LIMITED SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM. This includes but is not limited to loss of profits, data, or business opportunities.</p><p className="text-lg">The Platform is provided "AS IS" without warranties of any kind. We do not guarantee uninterrupted, error-free, or secure service. Since this is a free platform with no financial transactions, you acknowledge that you have no financial risk exposure from using our services.</p></CardContent></Card>

            <Card><CardHeader><CardTitle className="text-2xl">12. Governing Law</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-lg">These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law provisions. Any disputes arising out of or relating to these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts located in Lucknow, Uttar Pradesh, India.</p><p className="text-lg">In the event of any dispute, you agree to first attempt to resolve the matter informally by contacting us. If the dispute cannot be resolved within 30 days, either party may pursue formal legal remedies in the designated jurisdiction.</p></CardContent></Card>

            <Card className="bg-primary/5"><CardHeader><CardTitle className="text-2xl">Contact Information</CardTitle></CardHeader><CardContent><p className="text-lg mb-4">For questions regarding these Terms:</p><div className="space-y-2"><p><strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong></p><p><strong>CIN:</strong> U24110UP2020PTC135826</p><p><strong>Address:</strong> H. NO. 1/104, NEW JIA MAU, NEAR PARAG ATM, LUCKNOW, Uttar Pradesh, 226001</p><p><strong>GST:</strong> 09AAUCA1674K1Z1</p><p><strong>PAN:</strong> AAUCA1674K</p></div></CardContent></Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
