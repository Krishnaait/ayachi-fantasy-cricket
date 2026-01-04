import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trophy, Award } from "lucide-react";
import { formatToIST } from "@/lib/utils";

export default function Results() {
  const { id } = useParams();
  const { data: match, isLoading } = trpc.matches.info.useQuery({ id: id! });

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
          <p className="text-xl text-muted-foreground">Match results not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 px-4">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Match Results</h1>
        </div>

        <Card className="mb-8 border-primary/20 overflow-hidden">
          <CardHeader className="bg-primary/5 text-center py-10">
            <div className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">
              {match.matchType} • {match.venue}
            </div>
            <CardTitle className="text-3xl md:text-5xl font-black mb-4">{match.name}</CardTitle>
            <div className="text-muted-foreground font-medium">{formatToIST(match.date)}</div>
          </CardHeader>
          <CardContent className="py-12">
            <div className="flex flex-col md:flex-row justify-around items-center gap-12">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-muted mx-auto flex items-center justify-center text-3xl font-bold border-4 border-border">
                  {match.teams[0]?.substring(0, 2).toUpperCase()}
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
                <div className="w-24 h-24 rounded-full bg-muted mx-auto flex items-center justify-center text-3xl font-bold border-4 border-border">
                  {match.teams[1]?.substring(0, 2).toUpperCase()}
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

        {/* Fantasy Points Summary would go here */}
      </main>
      <Footer />
    </div>
  );
}
