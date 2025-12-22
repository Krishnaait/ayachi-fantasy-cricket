import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

export default function ResponsibleGaming() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Responsible Gaming</h1>
          
          <Alert className="mb-8">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              AYACHI is 100% FREE with NO REAL MONEY involved. However, we promote responsible gaming practices.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Age Restriction</CardTitle></CardHeader>
              <CardContent><p>Only users 18 years and above can participate. We verify age during registration.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>State Compliance</CardTitle></CardHeader>
              <CardContent><p>Service NOT available in: Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, Sikkim.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Educational Purpose</CardTitle></CardHeader>
              <CardContent><p>Platform designed for learning cricket strategy and skill development, not gambling.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Play Responsibly</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Set time limits for platform usage</li>
                  <li>Take regular breaks</li>
                  <li>Remember it's for entertainment and learning</li>
                  <li>Don't let it interfere with daily responsibilities</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
