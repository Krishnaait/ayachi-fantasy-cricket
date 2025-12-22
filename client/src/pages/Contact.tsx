import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <div className="grid gap-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Address</CardTitle></CardHeader>
              <CardContent><p>H. NO. 1/104, NEW JIA MAU, NEAR PARAG ATM, LUCKNOW, Uttar Pradesh, 226001</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Company Details</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                <p><strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong></p>
                <p>CIN: U24110UP2020PTC135826</p>
                <p>GST: 09AAUCA1674K1Z1</p>
                <p>PAN: AAUCA1674K</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
