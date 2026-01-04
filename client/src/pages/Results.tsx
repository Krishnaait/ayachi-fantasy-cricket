import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trophy, Award } from "lucide-react";
import { formatToIST } from "@/lib/utils";

export default function Results() {
  const { id } = useParams();
  const { data: match, isLoading: matchLoading } = trpc.matches.info.useQuery({ id: id! });
  const { data: scorecard, isLoading: scorecardLoading } = trpc.matches.scorecard.useQuery({ id: id! });

  if (matchLoading || scorecardLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-muted-foreground">Match results not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container py-12 px-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Match Results</h1>
        </div>

        {/* Match Header Card */}
        <Card className="mb-8 border-primary/20 overflow-hidden shadow-lg">
          <CardHeader className="bg-primary/5 text-center py-10">
            <div className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">
              {match.matchType} • {match.venue}
            </div>
            <CardTitle className="text-3xl md:text-5xl font-black mb-4">{match.name}</CardTitle>
            <div className="text-muted-foreground font-medium">{formatToIST(match.dateTimeGMT || match.date)}</div>
          </CardHeader>
          <CardContent className="py-12">
            <div className="flex flex-col md:flex-row justify-around items-center gap-12">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-muted mx-auto flex items-center justify-center text-3xl font-bold border-4 border-border overflow-hidden">
                  {match.teamInfo?.[0]?.img ? (
                    <img src={match.teamInfo[0].img} alt="" className="w-full h-full object-contain p-2" />
                  ) : (
                    match.teams[0]?.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="text-2xl font-bold">{match.teams[0]}</div>
                {match.score?.find((s: any) => s.inning.includes(match.teams[0])) && (
                  <div className="text-3xl font-black text-primary">
                    {match.score.find((s: any) => s.inning.includes(match.teams[0])).r}/
                    {match.score.find((s: any) => s.inning.includes(match.teams[0])).w}
                    <div className="text-sm text-muted-foreground font-normal">
                      ({match.score.find((s: any) => s.inning.includes(match.teams[0])).o} overs)
                    </div>
                  </div>
                )}
              </div>

              <div className="text-4xl font-black text-muted-foreground italic">VS</div>

              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-muted mx-auto flex items-center justify-center text-3xl font-bold border-4 border-border overflow-hidden">
                  {match.teamInfo?.[1]?.img ? (
                    <img src={match.teamInfo[1].img} alt="" className="w-full h-full object-contain p-2" />
                  ) : (
                    match.teams[1]?.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="text-2xl font-bold">{match.teams[1]}</div>
                {match.score?.find((s: any) => s.inning.includes(match.teams[1])) && (
                  <div className="text-3xl font-black text-primary">
                    {match.score.find((s: any) => s.inning.includes(match.teams[1])).r}/
                    {match.score.find((s: any) => s.inning.includes(match.teams[1])).w}
                    <div className="text-sm text-muted-foreground font-normal">
                      ({match.score.find((s: any) => s.inning.includes(match.teams[1])).o} overs)
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-green-500/10 text-green-600 border border-green-500/20">
                <Award className="h-6 w-6" />
                <span className="text-xl font-black uppercase tracking-tight">{match.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scorecard */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Detailed Scorecard
          </h2>
          
          {scorecard?.scorecard?.map((inning: any, idx: number) => (
            <Card key={idx} className="overflow-hidden border-gray-200 shadow-sm">
              <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
                <h3 className="font-bold text-lg">{inning.inning}</h3>
              </div>
              
              {/* Batting Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-600">Batter</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-600">Dismissal</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-600">R</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-600">B</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-600">4s</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-600">6s</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-600">SR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {inning.batting?.map((score: any, sIdx: number) => (
                      <tr key={sIdx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{score.batsman?.name}</td>
                        <td className="px-6 py-4 text-gray-500 italic">{score["dismissal-text"]}</td>
                        <td className="px-6 py-4 text-right font-bold">{score.r}</td>
                        <td className="px-6 py-4 text-right text-gray-600">{score.b}</td>
                        <td className="px-6 py-4 text-right text-gray-600">{score["4s"]}</td>
                        <td className="px-6 py-4 text-right text-gray-600">{score["6s"]}</td>
                        <td className="px-6 py-4 text-right text-gray-600">{score.sr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bowling Table */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <h4 className="font-bold text-gray-700">Bowling</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-600">Bowler</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-600">O</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-600">M</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-600">R</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-600">W</th>
                      <th className="px-6 py-3 text-right font-semibold text-gray-600">Eco</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {inning.bowling?.map((bowl: any, bIdx: number) => (
                      <tr key={bIdx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{bowl.bowler?.name}</td>
                        <td className="px-6 py-4 text-right">{bowl.o}</td>
                        <td className="px-6 py-4 text-right">{bowl.m}</td>
                        <td className="px-6 py-4 text-right">{bowl.r}</td>
                        <td className="px-6 py-4 text-right font-bold text-blue-600">{bowl.w}</td>
                        <td className="px-6 py-4 text-right">{bowl.eco}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
