import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatToIST } from "@/lib/utils";

export default function LiveScore() {
  const { id } = useParams();
  const { data: match, isLoading, refetch, isFetching } = trpc.matches.info.useQuery({ id: id! }, {
    refetchInterval: 15000, // Auto-refresh every 15 seconds
  });

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

        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <div className="text-sm font-medium text-primary mb-2 uppercase tracking-widest">
              {match.matchType} • {match.venue}
            </div>
            <CardTitle className="text-2xl md:text-4xl">{match.name}</CardTitle>
            <div className="text-muted-foreground mt-2">{formatToIST(match.date)}</div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-around items-center gap-8 py-8">
              <div className="text-center">
                <div className="text-4xl font-black mb-2">{match.teams[0]}</div>
                {match.score?.find((s: any) => s.inning.includes(match.teams[0])) && (
                  <div className="text-2xl font-bold text-primary">
                    {match.score.find((s: any) => s.inning.includes(match.teams[0])).r}/
                    {match.score.find((s: any) => s.inning.includes(match.teams[0])).w}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({match.score.find((s: any) => s.inning.includes(match.teams[0])).o} ov)
                    </span>
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold text-muted-foreground italic">VS</div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">{match.teams[1]}</div>
                {match.score?.find((s: any) => s.inning.includes(match.teams[1])) && (
                  <div className="text-2xl font-bold text-primary">
                    {match.score.find((s: any) => s.inning.includes(match.teams[1])).r}/
                    {match.score.find((s: any) => s.inning.includes(match.teams[1])).w}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({match.score.find((s: any) => s.inning.includes(match.teams[1])).o} ov)
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center pt-6 border-t border-primary/10">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold animate-pulse">
                {match.status}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scorecard would go here - using match.score data */}
      </main>
      <Footer />
    </div>
  );
}
