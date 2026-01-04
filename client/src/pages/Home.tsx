import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MatchCard from "@/components/MatchCard";
import { Trophy, Users, Shield, BookOpen, Target, Zap, Heart, CheckCircle2, Award, Lock, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { data: matches, isLoading } = trpc.matches.list.useQuery(undefined, {
    refetchInterval: 15000,
  });

  // Filter matches based on real-time status and date
  const now = new Date();
  
  const todayStr = now.toISOString().split('T')[0];
  
  const liveMatches = matches?.filter(m => {
    // A match is truly live if it has started, not ended, and is from today or later
    return m.matchStarted && !m.matchEnded && m.date >= todayStr;
  }) || [];

  const upcomingMatches = matches?.filter(m => {
    // Upcoming matches are those that haven't started yet and are from today or later
    return !m.matchStarted && m.date >= todayStr;
  }) || [];

  const completedMatches = matches?.filter(m => {
    // Completed matches are those that have ended OR are stale live matches from the past
    return m.matchEnded || (m.matchStarted && m.date < todayStr);
  }) || [];
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-2">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                100% Free to Play Cricket Fantasy
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Welcome to <span className="text-primary">AYACHI</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                The ultimate skill-based platform for cricket enthusiasts.
              </p>
              <p className="text-lg text-muted-foreground">
                Build your dream cricket team, compete in contests, and showcase your cricket knowledge. 
                No real money involved - pure skill-based gaming for education and entertainment!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg" className="text-lg px-8 h-14">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/how-to-play">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                    How to Play
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-8 pt-8 border-t">
                <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm p-3 rounded-xl border border-border">
                  <img src="/icon_18plus.png" alt="18+" className="h-10 w-10 object-contain" />
                  <span className="font-medium">18+ Only</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm p-3 rounded-xl border border-border">
                  <img src="/icon_safe_secure.png" alt="Safe & Secure" className="h-10 w-10 object-contain" />
                  <span className="font-medium">Safe & Secure</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm p-3 rounded-xl border border-border">
                  <img src="/icon_educational.png" alt="Educational" className="h-10 w-10 object-contain" />
                  <span className="font-medium">Educational</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl"></div>
              <img 
                src="/hero_image.png" 
                alt="Cricket Fantasy" 
                className="relative rounded-2xl shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Matches Sections */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Fetching real-time matches...</p>
            </div>
          ) : (
            <div className="space-y-20">
              {/* Live Matches */}
              {liveMatches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                      <h2 className="text-3xl font-bold">Live Matches</h2>
                    </div>
                    <Link href="/matches">
                      <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5">
                        View All
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveMatches.map(match => (
                      <MatchCard key={match.id} match={match} type="live" />
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Matches */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-bold">Upcoming Matches</h2>
                  </div>
                  <Link href="/matches">
                    <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5">
                      View All
                    </Button>
                  </Link>
                </div>
                {upcomingMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingMatches.slice(0, 6).map(match => (
                      <MatchCard key={match.id} match={match} type="upcoming" />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-10">No upcoming matches scheduled.</p>
                )}
              </div>

              {/* Completed Matches */}
              {completedMatches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-primary" />
                      <h2 className="text-3xl font-bold">Recent Results</h2>
                    </div>
                    <Link href="/matches">
                      <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5">
                        View All
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedMatches.slice(0, 3).map(match => (
                      <MatchCard key={match.id} match={match} type="completed" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">OUR GOALS</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At AYACHI, our mission is to revolutionize fantasy cricket by creating a completely free, educational, 
              and skill-based platform that empowers cricket enthusiasts to deepen their understanding of the game 
              without any financial risk.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We believe that fantasy sports should be accessible to everyone, regardless of their economic background. 
              By eliminating real money transactions, we focus purely on the joy of cricket, strategic thinking, and 
              community engagement.
            </p>
            <p className="text-lg text-muted-foreground">
              Our platform serves as a learning tool for aspiring cricket analysts, team managers, and fans who want 
              to test their cricket knowledge in a safe, supportive, and competitive environment.
            </p>
          </div>
        </div>
      </section>

	      {/* Why Choose Us */}
	      <section className="py-20 px-4">
	        <div className="container">
	          <div className="text-center mb-12">
	            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AYACHI?</h2>
	            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
	              Experience the best free-to-play fantasy cricket platform designed for learning and fun
	            </p>
	          </div>
	          
	          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
	            <Card>
	              <CardHeader>
	                <Shield className="h-12 w-12 text-primary mb-4" />
	                <CardTitle>100% Free</CardTitle>
	                <CardDescription>
	                  No real money, no financial risk. Play purely for fun and learning.
	                </CardDescription>
	              </CardHeader>
	            </Card>
	            
	            <Card>
	              <CardHeader>
	                <Trophy className="h-12 w-12 text-primary mb-4" />
	                <CardTitle>Skill-Based</CardTitle>
	                <CardDescription>
	                  Test your cricket knowledge and analytical skills against others.
	                </CardDescription>
	              </CardHeader>
	            </Card>
	            
	            <Card>
	              <CardHeader>
	                <Users className="h-12 w-12 text-primary mb-4" />
	                <CardTitle>Community Focus</CardTitle>
	                <CardDescription>
	                  Join a growing community of passionate cricket fans and competitors.
	                </CardDescription>
	              </CardHeader>
	            </Card>
	          </div>
	        </div>
	      </section>
	
	      {/* The AYACHI Experience */}
	      <section className="py-20 px-4 bg-muted/50">
	        <div className="container">
	          <div className="text-center mb-12">
	            <h2 className="text-3xl md:text-4xl font-bold mb-4">The AYACHI Experience</h2>
	            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
	              From building your team to competing for the top spot, see what makes AYACHI unique.
	            </p>
	          </div>
	          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
	            <Card className="overflow-hidden">
	              <img 
	                src="/team_selection.png" 
	                alt="Team Selection" 
	                className="w-full h-auto object-cover"
	              />
	              <CardHeader>
	                <CardTitle>Build Your Dream Team</CardTitle>
	                <CardDescription>
	                  Use your 100 credits wisely to select the best 11 players and assign your Captain and Vice-Captain.
	                </CardDescription>
	              </CardHeader>
	            </Card>
	            <Card className="overflow-hidden">
	              <img 
	                src="/prize_pool.png" 
	                alt="Compete for the Prize Pool" 
	                className="w-full h-auto object-cover"
	              />
	              <CardHeader>
	                <CardTitle>Compete for the Top Spot</CardTitle>
	                <CardDescription>
	                  Join free contests and climb the leaderboard to prove your fantasy cricket expertise.
	                </CardDescription>
	              </CardHeader>
	            </Card>
	          </div>
	        </div>
	      </section>
	
	      {/* Learn Without Financial Risk */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Learn Without Financial Risk</h2>
              <p className="text-lg text-muted-foreground mb-4">
                AYACHI is designed to be a completely risk-free environment where you can learn, experiment, and 
                grow your cricket knowledge without worrying about losing money.
              </p>
              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Zero Financial Investment</h3>
                    <p className="text-muted-foreground">
                      Create unlimited teams and join contests without spending a single rupee
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Safe Learning Environment</h3>
                    <p className="text-muted-foreground">
                      Experiment with different strategies and team combinations risk-free
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Educational Focus</h3>
                    <p className="text-muted-foreground">
                      Improve your cricket analysis skills and understanding of player performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">No Hidden Costs</h3>
                    <p className="text-muted-foreground">
                      Completely transparent platform with no premium features or paywalls
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <Lock className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold">100% Free Forever</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Unlimited team creation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Join all contests for free</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Access to all features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>No credit card required</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>No advertisements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for an amazing fantasy cricket experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Trophy className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Create Teams</CardTitle>
              </CardHeader>
              <CardContent>
                Build your dream cricket team with your favorite players and strategic combinations
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Join Contests</CardTitle>
              </CardHeader>
              <CardContent>
                Participate in various contests and compete with cricket enthusiasts nationwide
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Live Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                Track your team performance with real-time updates during live matches
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Player Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                Access comprehensive player stats and performance history for informed decisions
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                Detailed guides, tips, and strategies to improve your fantasy cricket skills
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                Your data is protected with industry-standard security measures
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Fair Play Commitment */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Fair Play Commitment</h2>
              <p className="text-lg text-muted-foreground">
                Integrity and fairness are the foundations of AYACHI
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Zero Tolerance Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  We maintain a strict zero-tolerance policy against cheating, collusion, bot usage, 
                  and any form of unfair advantage. Every user is monitored to ensure fair play.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Transparent Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  All contest rules, scoring systems, and platform policies are clearly documented 
                  and accessible to every user. No hidden clauses or surprise changes.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Equal Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  Every player has equal access to all features, player statistics, and contest 
                  information. No premium advantages or paid benefits.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Community Reporting</CardTitle>
                </CardHeader>
                <CardContent>
                  Users can report suspicious activities, and our team investigates every complaint 
                  thoroughly with appropriate actions taken against violators.
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/fair-play">
                <Button variant="outline" size="lg">Read Our Fair Play Policy</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Integrity */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparency & Integrity</h2>
              <p className="text-lg text-muted-foreground">
                Building trust through complete transparency in everything we do
              </p>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Open Scoring System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Our scoring system is completely transparent and publicly documented. Every point 
                  awarded is based on official match statistics from verified sources. You can see 
                  exactly how your team's score is calculated in real-time.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Clear Contest Rules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Every contest clearly displays its rules, eligibility criteria, and scoring methodology 
                  before you join. No surprises, no hidden terms - what you see is what you get.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Data Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  We are committed to protecting your personal information. Our privacy policy clearly 
                  outlines what data we collect, how we use it, and how we protect it. We never sell 
                  your data to third parties.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Verified Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  AYACHI is operated by AYACHI HEALTHCARE PRIVATE LIMITED, a legally registered company 
                  in India. Our CIN, GST, PAN, and complete address are publicly displayed on our website 
                  for your verification and trust.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play Preview */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Play</h2>
            <p className="text-lg text-muted-foreground">Get started in 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p className="text-muted-foreground">
                Create your free account in minutes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Team</h3>
              <p className="text-muted-foreground">
                Select players and create your dream team
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Compete</h3>
              <p className="text-muted-foreground">
                Join contests and track your performance
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/how-to-play">
              <Button size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions about AYACHI
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Is AYACHI really 100% free to play?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! AYACHI is completely free. There are no entry fees, no premium features, 
                  no hidden costs, and no in-app purchases. You can create unlimited teams and 
                  join all contests without spending a single rupee.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Do I need to be 18+ to play?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you must be 18 years or older to register and play on AYACHI. We verify 
                  age during registration through date of birth verification to ensure compliance 
                  with legal requirements.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Which states are restricted from using AYACHI?
                </AccordionTrigger>
                <AccordionContent>
                  AYACHI is NOT available in the following states: Andhra Pradesh, Assam, Odisha, 
                  Telangana, Nagaland, and Sikkim. Users from these states cannot register or 
                  participate on our platform due to local regulations.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  How is AYACHI different from other fantasy cricket platforms?
                </AccordionTrigger>
                <AccordionContent>
                  Unlike other platforms, AYACHI is 100% free with no real money involved. We focus 
                  purely on education and skill development. There are no cash prizes, no deposits, 
                  and no financial risks - just pure cricket knowledge and fun competition.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  How do I create a team?
                </AccordionTrigger>
                <AccordionContent>
                  After logging in, go to the Dashboard and click "Create Team". Select players 
                  from the available match, choose your captain and vice-captain, and submit your 
                  team. You can create multiple teams for the same match to try different strategies.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  How is scoring calculated?
                </AccordionTrigger>
                <AccordionContent>
                  Scoring is based on real match performance - runs, wickets, catches, run-outs, etc. 
                  Each action has predefined points. Your captain gets 2x points and vice-captain gets 
                  1.5x points. Visit our "How to Play" page for the complete scoring system.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">
                  Is my personal data safe?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security very seriously. We use industry-standard encryption 
                  and security measures to protect your personal information. We never sell your 
                  data to third parties. Read our Privacy Policy for complete details.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left">
                  Can I edit my team after creating it?
                </AccordionTrigger>
                <AccordionContent>
                  You can edit your team until the match starts or the contest deadline (whichever 
                  is earlier). Once the deadline passes, teams are locked and cannot be modified 
                  to ensure fair play for all participants.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="text-center mt-8">
              <Link href="/faq">
                <Button variant="outline">View All FAQs</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Fantasy Cricket Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of cricket enthusiasts on AYACHI today!
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Register Now - It's Free!
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
