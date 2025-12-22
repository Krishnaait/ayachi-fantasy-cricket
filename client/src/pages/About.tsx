import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">About AYACHI</h1>
          <Card className="mb-8">
            <CardHeader><CardTitle>Who We Are</CardTitle></CardHeader>
            <CardContent><p>AYACHI Fantasy Sport is a 100% free-to-play fantasy cricket platform by AYACHI HEALTHCARE PRIVATE LIMITED. Educational and skill-based gaming with no financial risk.</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Company Info</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p><strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong></p>
              <p>CIN: U24110UP2020PTC135826 | GST: 09AAUCA1674K1Z1 | PAN: AAUCA1674K</p>
              <p>Address: H. NO. 1/104, NEW JIA MAU, NEAR PARAG ATM, LUCKNOW, UP, 226001</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
