import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Disclaimer & Compliance</h1>
          
          <Alert className="mb-8" variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>IMPORTANT:</strong> This is a FREE educational platform. NO REAL MONEY. NO PRIZES. NO FINANCIAL RISK.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>No Real Money Involvement</CardTitle></CardHeader>
              <CardContent><p>AYACHI is 100% free. No entry fees, no deposits, no withdrawals, no monetary prizes. Purely educational and entertainment.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Not Gambling</CardTitle></CardHeader>
              <CardContent><p>This is a skill-based educational platform, not gambling. No financial transactions occur.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>State Restrictions</CardTitle></CardHeader>
              <CardContent><p>NOT available in: Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, Sikkim. Residents of these states cannot use this platform.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Age Restriction</CardTitle></CardHeader>
              <CardContent><p>Only for users 18 years and above. Minors are strictly prohibited.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>No Warranty</CardTitle></CardHeader>
              <CardContent><p>Platform provided "AS IS" without warranties. We are not liable for service interruptions or errors.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Compliance</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <p>AYACHI HEALTHCARE PRIVATE LIMITED complies with Indian laws.</p>
                <p>CIN: U24110UP2020PTC135826 | GST: 09AAUCA1674K1Z1 | PAN: AAUCA1674K</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
