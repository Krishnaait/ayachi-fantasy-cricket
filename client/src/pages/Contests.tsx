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
                <Card key={contest.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      {contest.contestName}
                    </CardTitle>
                    <CardDescription>Match ID: {contest.matchId}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {contest.filledSpots}/{contest.totalSpots}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {contest.status}
                      </span>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => handleJoinContest(contest.id)}
                      disabled={contest.status !== "upcoming" || !isAuthenticated}
                    >
                      {isAuthenticated ? "Join Contest" : "Login to Join"}
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
