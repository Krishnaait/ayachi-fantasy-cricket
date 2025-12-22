import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>1. Information Collection</CardTitle></CardHeader>
              <CardContent><p>We collect name, email, date of birth, state, and phone (optional) during registration. Usage data is collected for platform improvement.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>2. Data Usage</CardTitle></CardHeader>
              <CardContent><p>Data used for account management, age verification, state compliance, and platform improvement. No selling of personal data.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>3. Data Security</CardTitle></CardHeader>
              <CardContent><p>We implement industry-standard security measures. Passwords are encrypted. However, no system is 100% secure.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>4. Your Rights</CardTitle></CardHeader>
              <CardContent><p>You can access, update, or delete your data. Contact us for data requests.</p></CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
