import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-center">Frequently Asked Questions</h1>
          </div>
          <p className="text-center text-lg mb-12">Find answers to common questions about AYACHI Fantasy Sport</p>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">General Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="q1">
                    <AccordionTrigger className="text-lg font-semibold">What is AYACHI Fantasy Sport?</AccordionTrigger>
                    <AccordionContent className="text-base">
                      AYACHI Fantasy Sport is a 100% free-to-play fantasy cricket platform operated by AYACHI HEALTHCARE PRIVATE LIMITED. It's designed for educational purposes and skill-based gaming with no real money involvement.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q2">
                    <AccordionTrigger className="text-lg font-semibold">Is AYACHI really free?</AccordionTrigger>
                    <AccordionContent className="text-base">
                      Yes! AYACHI is completely free. There are no entry fees, no deposits, no withdrawals, and no monetary prizes. You will never be asked to pay anything.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q3">
                    <AccordionTrigger className="text-lg font-semibold">Who can use AYACHI?</AccordionTrigger>
                    <AccordionContent className="text-base">
                      Users must be 18 years or older and NOT residents of Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, or Sikkim.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Account & Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="a1">
                    <AccordionTrigger className="text-lg font-semibold">How do I create an account?</AccordionTrigger>
                    <AccordionContent className="text-base">
                      Click the "Register" button, provide your name, email, date of birth, state, and create a password. Verify your email to activate your account.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="a2">
                    <AccordionTrigger className="text-lg font-semibold">Can I have multiple accounts?</AccordionTrigger>
                    <AccordionContent className="text-base">
                      No. Each user is allowed only ONE account. Creating multiple accounts is strictly prohibited and will result in account termination.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Still Have Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">If you couldn't find the answer you're looking for, please contact us:</p>
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
