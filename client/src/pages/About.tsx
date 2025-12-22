import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Target, Eye, Shield, Users, TrendingUp, BookOpen, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About AYACHI</h1>
          <p className="text-xl text-center text-muted-foreground mb-12">
            India's Premier Free-to-Play Fantasy Cricket Platform
          </p>

          <div className="space-y-8">
            {/* Who We Are */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Users className="h-6 w-6 text-primary" />
                  Who We Are
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  AYACHI Fantasy Sport is a revolutionary 100% free-to-play fantasy cricket platform operated by <strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong>. We are committed to providing cricket enthusiasts across India with an engaging, educational, and entertaining platform to showcase their cricket knowledge and strategic thinking skills.
                </p>
                <p className="text-lg leading-relaxed">
                  Unlike traditional fantasy sports platforms, AYACHI operates on a completely free model with <strong>zero financial risk</strong>. There are no entry fees, no deposits, no withdrawals, and no monetary prizes. Our platform is designed purely for educational purposes and entertainment, allowing users to learn cricket strategy, player analysis, and team management without any financial burden.
                </p>
                <p className="text-lg leading-relaxed">
                  We believe that fantasy cricket should be accessible to everyone who loves the game. By removing the financial element, we create a safe, inclusive environment where users can focus on improving their cricket knowledge, competing with friends, and enjoying the thrill of building their dream teams.
                </p>
              </CardContent>
            </Card>

            {/* Our Mission */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="h-6 w-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Our mission is to democratize fantasy cricket by making it accessible, educational, and completely free for all cricket fans in India. We aim to:
                </p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Educate cricket enthusiasts</strong> about player performance analysis, match conditions, team strategies, and statistical insights that enhance their understanding of the game.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Provide a safe platform</strong> where users can enjoy fantasy cricket without any financial risk, gambling elements, or monetary transactions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Foster a community</strong> of cricket lovers who can compete, learn, and grow their cricket knowledge together in a friendly, supportive environment.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Promote skill-based gaming</strong> that rewards cricket knowledge, strategic thinking, and analytical abilities rather than luck or financial investment.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Our Vision */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Eye className="h-6 w-6 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  We envision AYACHI becoming India's most trusted and widely-used educational fantasy cricket platform, where millions of cricket fans can:
                </p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>Develop deep cricket insights and analytical skills that enhance their appreciation of the sport.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>Experience the excitement of fantasy cricket without any financial pressure or gambling concerns.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>Build a nationwide community of educated cricket enthusiasts who understand the game at a deeper level.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>Set the standard for responsible, educational, and ethical fantasy sports platforms in India.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Our Pillars */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Shield className="h-6 w-6 text-primary" />
                  Our Pillars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-primary">1. Education First</h3>
                    <p className="text-lg">Every feature is designed to teach users about cricket analytics, player performance metrics, match conditions, and strategic decision-making.</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-primary">2. Zero Financial Risk</h3>
                    <p className="text-lg">Completely free platform with no entry fees, deposits, or monetary prizes. Pure skill-based learning and entertainment.</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-primary">3. Responsible Gaming</h3>
                    <p className="text-lg">Strict age verification (18+), state compliance, and ethical practices that prioritize user safety and well-being.</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-primary">4. Transparency</h3>
                    <p className="text-lg">Clear rules, visible scoring systems, and complete transparency in how teams are evaluated and contests are conducted.</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-primary">5. Community Building</h3>
                    <p className="text-lg">Creating a supportive environment where cricket fans can connect, compete, and learn from each other.</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-primary">6. Legal Compliance</h3>
                    <p className="text-lg">Full adherence to Indian laws and regulations, with clear state restrictions and age requirements.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Do's and Don'ts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Do's and Don'ts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Do's */}
                  <div>
                    <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-6 w-6" />
                      DO's - Best Practices
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Research player form, pitch conditions, and team strategies before creating your team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Analyze historical performance data and head-to-head statistics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Balance your team with a mix of consistent performers and potential match-winners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Choose captain and vice-captain strategically based on match conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Learn from your team's performance and improve your strategy over time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Respect other users and maintain a positive community environment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Use the platform for educational purposes and skill development</span>
                      </li>
                    </ul>
                  </div>

                  {/* Don'ts */}
                  <div>
                    <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                      <XCircle className="h-6 w-6" />
                      DON'Ts - Prohibited Actions
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Do NOT use the platform if you are under 18 years of age</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Do NOT access if you are a resident of restricted states (AP, Assam, Odisha, Telangana, Nagaland, Sikkim)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Do NOT attempt to create multiple accounts or engage in fraudulent activities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Do NOT harass, abuse, or engage in unsportsmanlike conduct with other users</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Do NOT use bots, automated scripts, or unfair means to gain advantages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Do NOT share your account credentials or allow others to use your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Do NOT expect or demand monetary rewards - this is a free educational platform</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What Makes Us Different */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What Makes AYACHI Different?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  In a market filled with money-based fantasy platforms, AYACHI stands apart as a truly unique offering:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                    <h3 className="text-xl font-semibold mb-3 text-primary">100% Free Forever</h3>
                    <p>No hidden costs, no premium features, no paywalls. Everything is completely free for all users, always.</p>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Educational Focus</h3>
                    <p>Designed to teach cricket analytics, player evaluation, and strategic thinking rather than just entertainment.</p>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Zero Financial Risk</h3>
                    <p>No deposits, no losses, no financial stress. Pure skill-based gaming without gambling elements.</p>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Ethical & Responsible</h3>
                    <p>Strict age verification, state compliance, and transparent operations that prioritize user safety.</p>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Community-Driven</h3>
                    <p>Built for cricket fans, by cricket fans. A platform where knowledge and passion matter more than money.</p>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Transparent Operations</h3>
                    <p>Clear scoring rules, visible algorithms, and honest communication about how the platform works.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="h-6 w-6 text-primary" />
                  What You'll Learn with AYACHI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  AYACHI is more than just a fantasy cricket platform - it's a comprehensive cricket education experience. Here's what you'll master:
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg mb-2">Player Analysis & Evaluation</h4>
                    <p>Learn to assess player form, recent performance, historical statistics, and match-specific strengths. Understand how different players perform in various conditions and situations.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg mb-2">Match Conditions & Pitch Analysis</h4>
                    <p>Understand how pitch conditions, weather, venue history, and toss decisions impact match outcomes and player performance.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg mb-2">Team Composition Strategy</h4>
                    <p>Master the art of building balanced teams with the right mix of batsmen, bowlers, all-rounders, and wicket-keepers based on match requirements.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg mb-2">Captain & Vice-Captain Selection</h4>
                    <p>Learn strategic decision-making for choosing captain (2x points) and vice-captain (1.5x points) based on match-ups and conditions.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg mb-2">Statistical Analysis</h4>
                    <p>Develop skills in interpreting cricket statistics, trends, and data to make informed decisions rather than relying on gut feelings.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg mb-2">Risk Management</h4>
                    <p>Understand how to balance safe picks with differential choices, and when to take calculated risks in team selection.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg mb-2">Cricket Tactics & Strategy</h4>
                    <p>Gain deeper insights into cricket tactics, team strategies, and how different game situations unfold during matches.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>AYACHI Fantasy Sport</strong> is operated by AYACHI HEALTHCARE PRIVATE LIMITED, a registered Indian company committed to providing safe, educational, and entertaining fantasy sports experiences.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-primary">Legal Entity</h3>
                    <p className="text-lg"><strong>AYACHI HEALTHCARE PRIVATE LIMITED</strong></p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-primary">Corporate Identification Number (CIN)</h3>
                    <p className="text-lg font-mono">U24110UP2020PTC135826</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-primary">GST Number</h3>
                    <p className="text-lg font-mono">09AAUCA1674K1Z1</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-primary">PAN Card</h3>
                    <p className="text-lg font-mono">AAUCA1674K</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-primary">Registered Office Address</h3>
                  <p className="text-lg">
                    H. NO. 1/104, NEW JIA MAU,<br />
                    NEAR PARAG ATM,<br />
                    LUCKNOW, Uttar Pradesh<br />
                    PIN: 226001<br />
                    India
                  </p>
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Platform Compliance</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Fully compliant with Indian laws and regulations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Age restriction enforced: Only 18 years and above</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>State restrictions: NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>100% free platform with no real money involvement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Educational and skill-based gaming only</span>
                    </li>
                  </ul>
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
