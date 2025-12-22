import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Shield, AlertTriangle, CheckCircle2, HelpCircle } from "lucide-react";

export default function ResponsibleGaming() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-center">Responsible Gaming</h1>
          </div>
          <p className="text-center text-muted-foreground mb-2">Last Updated: December 22, 2025</p>
          <p className="text-center text-lg mb-8">Play responsibly and enjoy fantasy cricket safely</p>

          <Alert className="mb-8">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>100% Free Platform:</strong> AYACHI is completely free with NO real money involved. However, responsible gaming practices are still important for your well-being.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Commitment to Responsible Gaming</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  At <strong>AYACHI Fantasy Sport</strong>, we are committed to providing a safe, educational, and enjoyable platform for all users. While our platform is 100% free with no financial risk, we recognize the importance of promoting healthy gaming habits and preventing excessive or compulsive behavior.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Age Verification & Restrictions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6">
                  <h4 className="font-bold text-xl mb-3">Strict Age Requirement: 18+ Only</h4>
                  <p className="text-lg">Our platform is exclusively for users aged 18 years and above. Minors are strictly prohibited from accessing or using AYACHI Fantasy Sport.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">State Restrictions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  AYACHI Fantasy Sport is <strong>NOT available</strong> in the following Indian states due to local regulations:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {["Andhra Pradesh", "Assam", "Odisha", "Telangana", "Nagaland", "Sikkim"].map(state => (
                    <div key={state} className="p-4 bg-destructive/10 border border-destructive rounded-lg text-center font-semibold">
                      {state}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Contact & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg"><strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong></p>
                <p><strong>CIN:</strong> U24110UP2020PTC135826</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
