import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
          
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Last Updated:</strong> December 22, 2024
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>1. Introduction</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p>Welcome to AYACHI Fantasy Sport, operated by <strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong> (CIN: U24110UP2020PTC135826). By using our platform, you agree to these Terms and Conditions.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>2. Eligibility</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p><strong>Age Requirement:</strong> Must be 18 years or older.</p>
                <p><strong>Geographic Restrictions:</strong> NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>3. Free to Play</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p>100% free platform. No real money, no entry fees, no prizes. Educational and entertainment purpose only.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>4. User Conduct</CardTitle></CardHeader>
              <CardContent>
                <p>Users must not engage in cheating, harassment, or illegal activities. Accounts violating terms will be terminated.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>5. Disclaimer</CardTitle></CardHeader>
              <CardContent>
                <p>Platform provided "AS IS". No warranties. No liability for indirect damages.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>6. Contact</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <p><strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong></p>
                <p>CIN: U24110UP2020PTC135826 | GST: 09AAUCA1674K1Z1 | PAN: AAUCA1674K</p>
                <p>Address: H. NO. 1/104, NEW JIA MAU, NEAR PARAG ATM, LUCKNOW, UP, 226001</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
