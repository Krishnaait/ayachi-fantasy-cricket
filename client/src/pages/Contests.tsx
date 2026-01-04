import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Trophy, Users, Clock } from "lucide-react";

export default function Contests() {
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const { data: contests, isLoading } = trpc.contests.list.useQuery();
  const { data: matches } = trpc.matches.list.useQuery();
  const { data: myTeams } = trpc.teams.myTeams.useQuery(undefined, { enabled: isAuthenticated });
  
  const joinContestMutation = trpc.contests.join.useMutation({
    onSuccess: () => {
      toast.success("Successfully joined contest!");
      utils.contests.list.invalidate();
      utils.contests.myEntries.invalidate();
    },
    onError: (error) => {
      toast.error("Failed to join contest: " + error.message);
    },
  });

  const handleJoinContest = (contestId: number) => {
    if (!isAuthenticated) {
      toast.error("Please login to join contests");
      return;
    }
    if (!myTeams || myTeams.length === 0) {
      toast.error("Please create a team first");
      return;
    }
    joinContestMutation.mutate({ contestId, teamId: myTeams[0].id });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold mb-8">Available Contests</h1>
          {isLoading ? (
            <p>Loading contests...</p>
          ) : contests && contests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contests.map((contest: any) => (
                <Card key={contest.id} className="overflow-hidden border-primary/20">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      {contest.name}
                    </CardTitle>
                    <CardDescription className="font-medium text-primary/80">
                      {matches?.find(m => m.id === contest.matchId)?.name || "Loading match info..."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Prize Pool</div>
                        <div className="text-lg font-black text-primary">FREE</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Entry Fee</div>
                        <div className="text-lg font-black text-green-600">FREE</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{contest.currentEntries} joined</span>
                        <span className="text-muted-foreground">{contest.maxEntries - contest.currentEntries} left</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500" 
                          style={{ width: `${(contest.currentEntries / contest.maxEntries) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Max {contest.maxEntries} teams
                      </span>
                      <span className="flex items-center gap-1 uppercase font-bold text-primary/60">
                        <Clock className="h-3 w-3" />
                        {contest.status}
                      </span>
                    </div>

                    <Button 
                      className="w-full font-bold py-6" 
                      onClick={() => handleJoinContest(contest.id)}
                      disabled={contest.status !== "upcoming" || !isAuthenticated || contest.currentEntries >= contest.maxEntries}
                    >
                      {isAuthenticated ? "JOIN NOW" : "LOGIN TO JOIN"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No contests available at the moment</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
