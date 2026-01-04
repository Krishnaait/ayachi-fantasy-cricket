import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatToIST } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function LiveScore() {
  const { id } = useParams();
  
  // Fetch basic match info
  const { data: match, isLoading: isMatchLoading } = trpc.matches.info.useQuery({ id: id! }, {
    refetchInterval: 15000,
  });

  // Fetch detailed fantasy scorecard
  const { data: scorecardData, isLoading: isScorecardLoading, refetch, isFetching } = trpc.matches.scorecard.useQuery({ id: id! }, {
    refetchInterval: 15000,
  });

  const isLoading = isMatchLoading || isScorecardLoading;

  if (isLoading) {
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
          <p className="text-xl text-muted-foreground">Match not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const innings = scorecardData?.scorecard || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-full"></div>
            <h1 className="text-4xl md:text-5xl font-black gaming-gradient-text tracking-tighter uppercase">
              Battle Report
            </h1>
          </div>
          <Button 
            onClick={() => refetch()} 
            disabled={isFetching}
            className="gaming-button bg-card/50 backdrop-blur-md border border-white/10 px-8 h-14 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3"
          >
            <RefreshCw className={`h-4 w-4 text-primary ${isFetching ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {/* Summary Card */}
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
            {match.teams.map((teamName: string, idx: number) => {
              const teamScore = match.score?.find((s: any) => s.inning.toLowerCase().includes(teamName.toLowerCase()));
              return (
                <div key={teamName} className={`text-center ${idx === 1 ? 'md:order-3' : 'md:order-1'}`}>
                  <div className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter">{teamName}</div>
                  {teamScore ? (
                    <div className="space-y-1">
                      <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter">
                        {teamScore.r}/{teamScore.w}
                      </div>
                      <div className="text-sm font-black text-muted-foreground uppercase tracking-widest">
                        {teamScore.o} Overs
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground font-black uppercase tracking-widest text-xs">Yet to Bat</div>
                  )}
                </div>
              );
            })}
            <div className="md:order-2 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-black text-muted-foreground/50">VS</span>
              </div>
              <div className="px-6 py-2 rounded-xl bg-red-600/20 border border-red-600/30 text-red-500 font-black uppercase tracking-widest text-[10px] animate-pulse">
                {match.status}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Innings Tabs */}
        {innings.length > 0 ? (
          <Tabs defaultValue="inning-0" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-card/50 backdrop-blur-md border border-white/10 p-1.5 h-16 rounded-2xl shadow-2xl">
                {innings.map((inning: any, idx: number) => (
                  <TabsTrigger 
                    key={idx} 
                    value={`inning-${idx}`}
                    className="rounded-xl px-10 h-full data-[state=active]:bg-primary data-[state=active]:text-black font-black uppercase tracking-widest text-xs transition-all duration-300"
                  >
                    {inning.inning}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {innings.map((inning: any, idx: number) => (
              <TabsContent key={idx} value={`inning-${idx}`} className="space-y-12 outline-none">
                {/* Batting Table */}
                <div className="gaming-card rounded-3xl overflow-hidden">
                  <div className="bg-white/5 px-8 py-6 border-b border-white/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter">Batting Performance</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/5 hover:bg-transparent">
                          <TableHead className="px-8 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground">Batsman</TableHead>
                          <TableHead className="px-8 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground">Status</TableHead>
                          <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">R</TableHead>
                          <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">B</TableHead>
                          <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">4s</TableHead>
                          <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">6s</TableHead>
                          <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">SR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inning.batting.map((player: any, pIdx: number) => (
                          <TableRow key={pIdx} className="border-white/5 hover:bg-white/5 transition-colors">
                            <TableCell className="px-8 py-6 font-black text-lg">{player.batsman.name}</TableCell>
                            <TableCell className="px-8 py-6 text-muted-foreground text-xs font-bold uppercase tracking-wider">{player["dismissal-text"]}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-black text-2xl text-primary">{player.r}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-bold text-muted-foreground">{player.b}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-bold">{player["4s"]}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-bold">{player["6s"]}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-black text-accent">{player.sr}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Bowling Table */}
                <div className="gaming-card rounded-3xl overflow-hidden">
                  <div className="bg-white/5 px-8 py-6 border-b border-white/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <RefreshCw className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter">Bowling Arsenal</h3>
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
                          <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">NB</TableHead>
                          <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">WD</TableHead>
                          <TableHead className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">ECO</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inning.bowling.map((player: any, pIdx: number) => (
                          <TableRow key={pIdx} className="border-white/5 hover:bg-white/5 transition-colors">
                            <TableCell className="px-8 py-6 font-black text-lg">{player.bowler.name}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-bold">{player.o}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-bold">{player.m}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-black text-xl">{player.r}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-black text-3xl text-primary">{player.w}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-bold text-muted-foreground">{player.nb}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-bold text-muted-foreground">{player.wd}</TableCell>
                            <TableCell className="px-8 py-6 text-right font-black text-accent">{player.eco}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-32 gaming-card rounded-3xl border-dashed border-white/10">
            <RefreshCw className="h-20 w-20 text-muted-foreground/20 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">Scorecard Pending</h3>
            <p className="text-muted-foreground font-medium">Detailed data will be available as the match progresses.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
