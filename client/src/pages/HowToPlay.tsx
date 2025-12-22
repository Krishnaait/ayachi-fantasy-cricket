import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Trophy, Target, TrendingUp, AlertTriangle, CheckCircle2, XCircle, Lightbulb } from "lucide-react";

export default function HowToPlay() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">How to Play AYACHI Fantasy Cricket</h1>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Master the art of fantasy cricket with our comprehensive guide
          </p>

          <Alert className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Remember:</strong> AYACHI is 100% FREE with NO REAL MONEY involved. Focus on learning and improving your cricket knowledge!
            </AlertDescription>
          </Alert>

          <div className="space-y-8">
            {/* Quick Start Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="h-6 w-6 text-primary" />
                  Quick Start Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Register Your Account</h3>
                      <p className="text-lg">Create a free account with your name, email, date of birth (must be 18+), and state. Verify you're not from restricted states (Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, Sikkim).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Browse Available Matches</h3>
                      <p className="text-lg">Go to your Dashboard to see upcoming cricket matches. Select a match you want to create a team for.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Create Your Dream Team</h3>
                      <p className="text-lg">Select 11 players from both teams within the 100-credit budget. Choose 1-4 wicket-keepers, 3-6 batsmen, 1-4 all-rounders, and 3-6 bowlers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Choose Captain & Vice-Captain</h3>
                      <p className="text-lg">Select one captain (gets 2x points) and one vice-captain (gets 1.5x points). This is crucial for maximizing your score!</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      5
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Join Contests</h3>
                      <p className="text-lg">Use your created team to join available contests. Compete with other users and track your team's performance.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      6
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Track Live Scores</h3>
                      <p className="text-lg">Watch your team's performance in real-time as the match progresses. Learn from the results to improve future teams.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scoring System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Trophy className="h-6 w-6 text-primary" />
                  Scoring System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Batting Points</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border p-3 text-left">Action</th>
                            <th className="border p-3 text-center">Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border p-3">Run scored</td><td className="border p-3 text-center">+1 point per run</td></tr>
                          <tr><td className="border p-3">Boundary (4s)</td><td className="border p-3 text-center">+1 bonus point</td></tr>
                          <tr><td className="border p-3">Six (6s)</td><td className="border p-3 text-center">+2 bonus points</td></tr>
                          <tr><td className="border p-3">Half-century (50 runs)</td><td className="border p-3 text-center">+8 bonus points</td></tr>
                          <tr><td className="border p-3">Century (100 runs)</td><td className="border p-3 text-center">+16 bonus points</td></tr>
                          <tr><td className="border p-3">Duck (out for 0)</td><td className="border p-3 text-center">-2 points</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Bowling Points</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border p-3 text-left">Action</th>
                            <th className="border p-3 text-center">Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border p-3">Wicket taken</td><td className="border p-3 text-center">+25 points</td></tr>
                          <tr><td className="border p-3">3 wickets bonus</td><td className="border p-3 text-center">+4 bonus points</td></tr>
                          <tr><td className="border p-3">4 wickets bonus</td><td className="border p-3 text-center">+8 bonus points</td></tr>
                          <tr><td className="border p-3">5 wickets bonus</td><td className="border p-3 text-center">+16 bonus points</td></tr>
                          <tr><td className="border p-3">Maiden over</td><td className="border p-3 text-center">+12 points</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Fielding Points</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border p-3 text-left">Action</th>
                            <th className="border p-3 text-center">Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border p-3">Catch taken</td><td className="border p-3 text-center">+8 points</td></tr>
                          <tr><td className="border p-3">3 catches bonus</td><td className="border p-3 text-center">+4 bonus points</td></tr>
                          <tr><td className="border p-3">Stumping</td><td className="border p-3 text-center">+12 points</td></tr>
                          <tr><td className="border p-3">Run out (direct)</td><td className="border p-3 text-center">+12 points</td></tr>
                          <tr><td className="border p-3">Run out (assist)</td><td className="border p-3 text-center">+6 points</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Pro Tip:</strong> Captain gets 2x points and Vice-Captain gets 1.5x points. Choose wisely!
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Tips & Strategies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Tips & Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Team Selection Tips</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Research player form:</strong> Check recent performances, not just overall statistics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Consider pitch conditions:</strong> Batting-friendly or bowling-friendly pitch?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Check head-to-head records:</strong> How do players perform against specific opponents?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Balance your team:</strong> Mix consistent performers with potential match-winners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Weather matters:</strong> Overcast conditions favor bowlers, sunny days favor batsmen</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Captain Selection Strategy</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Top-order batsmen:</strong> More chances to score, safer captain choices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>All-rounders:</strong> Can score with both bat and ball, high potential</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Strike bowlers:</strong> Risky but can deliver massive points with wickets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Match conditions:</strong> Choose captain based on pitch and weather</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Recent form:</strong> Hot streak players make excellent captain choices</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Advanced Strategies</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Differential picks:</strong> Choose less popular players to gain edge over competitors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Venue analysis:</strong> Some players excel at specific venues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Toss impact:</strong> Consider likely toss decisions and their impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Team news:</strong> Stay updated on injuries, team changes, and playing XI</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Match importance:</strong> Key players perform better in crucial matches</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Budget Management</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>100 credits total:</strong> Spend wisely across all 11 players</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Star players:</strong> Allocate budget for 2-3 premium players</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Value picks:</strong> Find underpriced players with high potential</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Balance is key:</strong> Don't overspend on batting or bowling alone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Bench strength:</strong> Even your 11th player should have playing potential</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Mistakes to Avoid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <XCircle className="h-6 w-6 text-destructive" />
                  Common Mistakes to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-destructive pl-4 py-2">
                    <h4 className="font-semibold text-lg mb-2">❌ Ignoring Recent Form</h4>
                    <p>Don't select players based only on reputation. Recent performance matters more than past glory.</p>
                  </div>
                  <div className="border-l-4 border-destructive pl-4 py-2">
                    <h4 className="font-semibold text-lg mb-2">❌ Unbalanced Team Composition</h4>
                    <p>Avoid loading up on batsmen or bowlers. A balanced team performs better across different match scenarios.</p>
                  </div>
                  <div className="border-l-4 border-destructive pl-4 py-2">
                    <h4 className="font-semibold text-lg mb-2">❌ Overlooking Match Conditions</h4>
                    <p>Pitch, weather, and venue characteristics significantly impact player performance. Don't ignore them.</p>
                  </div>
                  <div className="border-l-4 border-destructive pl-4 py-2">
                    <h4 className="font-semibold text-lg mb-2">❌ Poor Captain/Vice-Captain Choices</h4>
                    <p>These multipliers are crucial. Don't waste them on inconsistent or out-of-form players.</p>
                  </div>
                  <div className="border-l-4 border-destructive pl-4 py-2">
                    <h4 className="font-semibold text-lg mb-2">❌ Following the Crowd Blindly</h4>
                    <p>Popular picks aren't always the best. Do your own research and analysis.</p>
                  </div>
                  <div className="border-l-4 border-destructive pl-4 py-2">
                    <h4 className="font-semibold text-lg mb-2">❌ Neglecting All-Rounders</h4>
                    <p>All-rounders provide dual scoring opportunities. Include at least 1-2 quality all-rounders.</p>
                  </div>
                  <div className="border-l-4 border-destructive pl-4 py-2">
                    <h4 className="font-semibold text-lg mb-2">❌ Last-Minute Team Creation</h4>
                    <p>Rushed decisions lead to mistakes. Create your team with proper research and analysis.</p>
                  </div>
                  <div className="border-l-4 border-destructive pl-4 py-2">
                    <h4 className="font-semibold text-lg mb-2">❌ Not Learning from Past Teams</h4>
                    <p>Review your previous teams' performance. Understand what worked and what didn't.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Final Tips */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Remember: It's All About Learning!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  AYACHI is a <strong>free educational platform</strong> designed to help you develop cricket knowledge and analytical skills. There's no financial risk, so don't hesitate to experiment with different strategies and learn from every match.
                </p>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Analyze your team's performance after each match</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Learn from successful players in the community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Keep improving your cricket knowledge with each contest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Enjoy the process of becoming a better cricket analyst</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
