import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 px-4 max-w-7xl">
        <div className="flex items-center gap-4 mb-12 relative">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-full"></div>
          <Trophy className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-black gaming-gradient-text tracking-tighter uppercase">
            Victory Archives
          </h1>
        </div>

        {/* Match Header Card */}
        <div className="gaming-card rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">
              {match.matchType} • {match.venue}
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 uppercase">{match.name}</h2>
            <div className="text-muted-foreground font-bold uppercase tracking-widest text-xs">{formatToIST(match.dateTimeGMT || match.date)}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12 py-12 border-y border-white/5">
            <div className="text-center space-y-6">
              <div className="w-28 h-28 rounded-3xl bg-white/5 mx-auto flex items-center justify-center text-4xl font-black border border-white/10 overflow-hidden shadow-2xl group-hover:scale-110 transition-transform">
                {match.teamInfo?.[0]?.img ? (
                  <img src={match.teamInfo[0].img} alt="" className="w-full h-full object-contain p-4" />
                ) : (
                  <span className="text-primary">{match.teams[0]?.substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div className="text-2xl font-black uppercase tracking-tighter">{match.teams[0]}</div>
              {match.score?.find((s: any) => s.inning.includes(match.teams[0])) && (
                <div className="space-y-1">
                  <div className="text-4xl font-black text-primary tracking-tighter">
                    {match.score.find((s: any) => s.inning.includes(match.teams[0])).r}/
                    {match.score.find((s: any) => s.inning.includes(match.teams[0])).w}
                  </div>
                  <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                    {match.score.find((s: any) => s.inning.includes(match.teams[0])).o} Overs
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <span className="text-3xl font-black text-muted-foreground/30 italic">VS</span>
              </div>
              <div className="px-8 py-3 rounded-2xl bg-accent/20 border border-accent/30 text-accent font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(var(--accent),0.2)]">
                {match.status}
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="w-28 h-28 rounded-3xl bg-white/5 mx-auto flex items-center justify-center text-4xl font-black border border-white/10 overflow-hidden shadow-2xl group-hover:scale-110 transition-transform">
                {match.teamInfo?.[1]?.img ? (
                  <img src={match.teamInfo[1].img} alt="" className="w-full h-full object-contain p-4" />
                ) : (
                  <span className="text-primary">{match.teams[1]?.substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div className="text-2xl font-black uppercase tracking-tighter">{match.teams[1]}</div>
              {match.score?.find((s: any) => s.inning.includes(match.teams[1])) && (
                <div className="space-y-1">
                  <div className="text-4xl font-black text-primary tracking-tighter">
                    {match.score.find((s: any) => s.inning.includes(match.teams[1])).r}/
                    {match.score.find((s: any) => s.inning.includes(match.teams[1])).w}
                  </div>
                  <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                    {match.score.find((s: any) => s.inning.includes(match.teams[1])).o} Overs
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Scorecard */}
        <div className="space-y-12">
          <div className="flex items-center gap-4">
            <Award className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-black uppercase tracking-tighter">Detailed Scorecard</h2>
          </div>
          
          {scorecard?.scorecard?.map((inning: any, idx: number) => (
            <div key={idx} className="gaming-card rounded-3xl overflow-hidden">
              <div className="bg-white/5 px-8 py-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tighter text-primary">{inning.inning}</h3>
              </div>
              
              {/* Batting Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="px-8 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground">Batter</TableHead>
                      <TableHead className="px-8 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground">Dismissal</TableHead>
                      <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">R</TableHead>
                      <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">B</TableHead>
                      <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">4s</TableHead>
                      <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">6s</TableHead>
                      <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">SR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inning.batting?.map((score: any, sIdx: number) => (
                      <TableRow key={sIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="px-8 py-6 font-black text-lg">{score.batsman?.name}</TableCell>
                        <TableCell className="px-8 py-6 text-muted-foreground text-xs font-bold uppercase tracking-wider italic">{score["dismissal-text"]}</TableCell>
                        <TableCell className="px-8 py-6 text-right font-black text-2xl text-primary">{score.r}</TableCell>
                        <TableCell className="px-8 py-6 text-right font-bold text-muted-foreground">{score.b}</TableCell>
                        <TableCell className="px-8 py-6 text-right font-bold">{score["4s"]}</TableCell>
                        <TableCell className="px-8 py-6 text-right font-bold">{score["6s"]}</TableCell>
                        <TableCell className="px-8 py-6 text-right font-black text-accent">{score.sr}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Bowling Table */}
              <div className="bg-white/5 px-8 py-4 border-y border-white/10">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent">Bowling Arsenal</h4>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="px-8 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground">Bowler</TableHead>
                      <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">O</TableHead>
                      <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">M</TableHead>
                      <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">R</TableHead>
                      <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">W</TableHead>
                      <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Eco</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inning.bowling?.map((bowl: any, bIdx: number) => (
                      <TableRow key={bIdx} className="hover:bg-white/5 transition-colors">
                        <TableCell className="px-8 py-6 font-black text-lg">{bowl.bowler?.name}</TableCell>
                        <TableCell className="px-8 py-6 text-right font-bold">{bowl.o}</TableCell>
                        <TableCell className="px-8 py-6 text-right font-bold">{bowl.m}</TableCell>
                        <TableCell className="px-8 py-6 text-right font-black text-xl">{bowl.r}</TableCell>
                        <TableCell className="px-8 py-6 text-right font-black text-3xl text-primary">{bowl.w}</TableCell>
                        <TableCell className="px-8 py-6 text-right font-black text-accent">{bowl.eco}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
