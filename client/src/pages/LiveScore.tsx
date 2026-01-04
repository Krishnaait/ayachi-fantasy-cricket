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
      <main className="flex-1 container py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Live Scorecard</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => refetch()} 
            disabled={isFetching}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Summary Card */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <div className="text-sm font-medium text-primary mb-2 uppercase tracking-widest">
              {match.matchType} • {match.venue}
            </div>
            <CardTitle className="text-2xl md:text-4xl">{match.name}</CardTitle>
            <div className="text-muted-foreground mt-2">{formatToIST(match.dateTimeGMT || match.date)}</div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-around items-center gap-8 py-8">
              {match.teams.map((teamName: string, idx: number) => {
                const teamScore = match.score?.find((s: any) => s.inning.toLowerCase().includes(teamName.toLowerCase()));
                return (
                  <div key={teamName} className="text-center">
                    <div className="text-4xl font-black mb-2">{teamName}</div>
                    {teamScore && (
                      <div className="text-2xl font-bold text-primary">
                        {teamScore.r}/{teamScore.w}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({teamScore.o} ov)
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-center pt-6 border-t border-primary/10">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold animate-pulse">
                {match.status}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Innings Tabs */}
        {innings.length > 0 ? (
          <Tabs defaultValue="inning-0" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              {innings.map((inning: any, idx: number) => (
                <TabsTrigger key={idx} value={`inning-${idx}`}>
                  {inning.inning}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {innings.map((inning: any, idx: number) => (
              <TabsContent key={idx} value={`inning-${idx}`} className="space-y-8">
                {/* Batting Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Batting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Batsman</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">R</TableHead>
                          <TableHead className="text-right">B</TableHead>
                          <TableHead className="text-right">4s</TableHead>
                          <TableHead className="text-right">6s</TableHead>
                          <TableHead className="text-right">SR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inning.batting.map((player: any, pIdx: number) => (
                          <TableRow key={pIdx}>
                            <TableCell className="font-medium">{player.batsman.name}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{player["dismissal-text"]}</TableCell>
                            <TableCell className="text-right font-bold">{player.r}</TableCell>
                            <TableCell className="text-right">{player.b}</TableCell>
                            <TableCell className="text-right">{player["4s"]}</TableCell>
                            <TableCell className="text-right">{player["6s"]}</TableCell>
                            <TableCell className="text-right">{player.sr}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Bowling Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-primary" />
                      Bowling
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bowler</TableHead>
                          <TableHead className="text-right">O</TableHead>
                          <TableHead className="text-right">M</TableHead>
                          <TableHead className="text-right">R</TableHead>
                          <TableHead className="text-right">W</TableHead>
                          <TableHead className="text-right">NB</TableHead>
                          <TableHead className="text-right">WD</TableHead>
                          <TableHead className="text-right">ECO</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inning.bowling.map((player: any, pIdx: number) => (
                          <TableRow key={pIdx}>
                            <TableCell className="font-medium">{player.bowler.name}</TableCell>
                            <TableCell className="text-right">{player.o}</TableCell>
                            <TableCell className="text-right">{player.m}</TableCell>
                            <TableCell className="text-right font-bold">{player.r}</TableCell>
                            <TableCell className="text-right font-bold text-primary">{player.w}</TableCell>
                            <TableCell className="text-right">{player.nb}</TableCell>
                            <TableCell className="text-right">{player.wd}</TableCell>
                            <TableCell className="text-right">{player.eco}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed border-border">
            <p className="text-muted-foreground">Detailed scorecard data is not yet available for this match.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
