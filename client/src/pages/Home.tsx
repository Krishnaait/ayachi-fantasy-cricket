import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trophy, Users, Shield, BookOpen, Target, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Welcome to <span className="text-primary">AYACHI</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Fantasy Sport - 100% Free to Play Cricket Fantasy Platform
              </p>
              <p className="text-lg">
                Build your dream cricket team, compete in contests, and showcase your cricket knowledge. 
                No real money involved - pure skill-based gaming for education and entertainment!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg" className="text-lg px-8">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/how-to-play">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    How to Play
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/hero.png" 
                alt="Cricket Fantasy" 
                className="rounded-lg shadow-2xl"
              />
            </div>
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
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Educational</CardTitle>
                <CardDescription>
                  Learn cricket strategies, player analysis, and team management skills.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Skill-Based</CardTitle>
                <CardDescription>
                  Test your cricket knowledge and compete with other enthusiasts.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Trophy className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Create Teams</CardTitle>
              </CardHeader>
              <CardContent>
                Build your dream cricket team with your favorite players
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Join Contests</CardTitle>
              </CardHeader>
              <CardContent>
                Participate in various contests and compete with others
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Live Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                Track your team performance with real-time updates
              </CardContent>
            </Card>
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
