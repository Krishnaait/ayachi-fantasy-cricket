import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HowToPlay() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">How to Play AYACHI Fantasy Cricket</h1>
          
          <Card className="mb-8">
            <CardHeader><CardTitle>Quick Start Guide</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><h3 className="font-semibold text-lg mb-2">Step 1: Register</h3><p>Create your free account. Must be 18+ and not from restricted states.</p></div>
              <div><h3 className="font-semibold text-lg mb-2">Step 2: Create Team</h3><p>Select 11 players. Choose captain (2x points) and vice-captain (1.5x points).</p></div>
              <div><h3 className="font-semibold text-lg mb-2">Step 3: Join Contests</h3><p>Enter contests and compete.</p></div>
              <div><h3 className="font-semibold text-lg mb-2">Step 4: Track Performance</h3><p>Watch live scores.</p></div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader><CardTitle>Scoring System</CardTitle></CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="batting">
                  <AccordionTrigger>Batting Points</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Run: +1 | Boundary: +1 | Six: +2</li>
                      <li>Half-century: +8 | Century: +16</li>
                      <li>Duck: -2</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bowling">
                  <AccordionTrigger>Bowling Points</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Wicket: +25 | 3 wickets: +8 bonus</li>
                      <li>5 wickets: +16 bonus | Maiden: +12</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="fielding">
                  <AccordionTrigger>Fielding Points</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Catch: +8 | Stumping: +12 | Run out: +6</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
