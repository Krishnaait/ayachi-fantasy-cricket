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
          <p className="text-center text-lg mb-8">Important legal disclaimers and limitations</p>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Please Read Carefully:</strong> This disclaimer outlines important limitations and clarifications about AYACHI Fantasy Sport platform.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">General Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  AYACHI Fantasy Sport is operated by <strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong>. This platform is provided for educational and entertainment purposes only.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950 border-2 border-green-500">
              <CardHeader>
                <CardTitle className="text-2xl text-green-700 dark:text-green-300">No Real Money Involvement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  AYACHI Fantasy Sport is a <strong>100% FREE platform</strong>. There are:
                </p>
                <ul className="space-y-2 text-lg ml-6">
                  <li className="list-disc">NO entry fees or deposits required</li>
                  <li className="list-disc">NO cash prizes or monetary rewards</li>
                  <li className="list-disc">NO financial transactions of any kind</li>
                  <li className="list-disc">NO gambling or betting involved</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg"><strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong></p>
                <p><strong>CIN:</strong> U24110UP2020PTC135826</p>
                <p><strong>Address:</strong> H. NO. 1/104, NEW JIA MAU, NEAR PARAG ATM, LUCKNOW, UP, 226001</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
