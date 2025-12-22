import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="q1">
              <AccordionTrigger className="text-left">Is AYACHI really free?</AccordionTrigger>
              <AccordionContent>Yes! 100% free. No registration fees, no entry fees, no hidden charges. Completely free to play.</AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q2">
              <AccordionTrigger className="text-left">Is real money involved?</AccordionTrigger>
              <AccordionContent>No. Absolutely no real money is involved. No deposits, no withdrawals, no monetary prizes. Zero financial risk.</AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q3">
              <AccordionTrigger className="text-left">Who can play?</AccordionTrigger>
              <AccordionContent>Users must be 18+ years old and NOT residents of Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, or Sikkim.</AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q4">
              <AccordionTrigger className="text-left">Why these state restrictions?</AccordionTrigger>
              <AccordionContent>To comply with state-specific regulations regarding fantasy sports platforms.</AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q5">
              <AccordionTrigger className="text-left">What is the purpose of this platform?</AccordionTrigger>
              <AccordionContent>Educational and entertainment. To help cricket fans learn strategy, player analysis, and team management skills.</AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q6">
              <AccordionTrigger className="text-left">How do I create a team?</AccordionTrigger>
              <AccordionContent>Register → Go to Dashboard → Create Team → Select 11 players → Choose captain and vice-captain → Save team.</AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q7">
              <AccordionTrigger className="text-left">How is scoring calculated?</AccordionTrigger>
              <AccordionContent>Points based on player performance: runs, wickets, catches, etc. Captain gets 2x points, vice-captain gets 1.5x. See "How to Play" for details.</AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q8">
              <AccordionTrigger className="text-left">Can I edit my team after joining a contest?</AccordionTrigger>
              <AccordionContent>No. Once you join a contest, the team is locked. Create a new team for other contests.</AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q9">
              <AccordionTrigger className="text-left">Is my data safe?</AccordionTrigger>
              <AccordionContent>Yes. We use industry-standard security. Passwords are encrypted. See Privacy Policy for details.</AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="q10">
              <AccordionTrigger className="text-left">How do I contact support?</AccordionTrigger>
              <AccordionContent>Visit our Contact Us page for company details and address.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
