import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Lock, Eye, UserCheck, Database, AlertTriangle } from "lucide-react";

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
          <p className="text-center text-muted-foreground mb-2">Last Updated: December 22, 2025</p>
          <p className="text-center text-lg mb-8">Your privacy is important to us</p>

          <Alert className="mb-8">
            <Lock className="h-4 w-4" />
            <AlertDescription>
              <strong>Your Data Security:</strong> We are committed to protecting your personal information in accordance with applicable Indian laws.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  This Privacy Policy describes how <strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong> collects, uses, stores, and protects your personal information when you use the AYACHI Fantasy Sport platform.
                </p>
              </CardContent>
            </Card>

            {/* Additional sections truncated for brevity */}
            
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  For privacy-related questions, please contact us:
                </p>
                <div className="space-y-2 text-lg">
                  <p><strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong></p>
                  <p><strong>CIN:</strong> U24110UP2020PTC135826</p>
                  <p><strong>Address:</strong> H. NO. 1/104, NEW JIA MAU, NEAR PARAG ATM, LUCKNOW, UP, 226001</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
