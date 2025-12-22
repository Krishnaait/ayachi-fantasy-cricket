import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Trophy, Users, Plus } from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const { data: teams } = trpc.teams.myTeams.useQuery(undefined, { enabled: isAuthenticated });
  const { data: entries } = trpc.contests.myEntries.useQuery(undefined, { enabled: isAuthenticated });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [loading, isAuthenticated, setLocation]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}!</h1>
            <p className="text-muted-foreground">Manage your teams and track your performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  My Teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{teams?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Teams Created</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Contests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{entries?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Contests Joined</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/create-team">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Team
                  </Button>
                </Link>
                <Link href="/contests">
                  <Button variant="outline" className="w-full">
                    View Contests
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>My Teams</CardTitle>
                <CardDescription>Your created fantasy cricket teams</CardDescription>
              </CardHeader>
              <CardContent>
                {teams && teams.length > 0 ? (
                  <div className="space-y-4">
                    {teams.map((team: any) => (
                      <div key={team.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold">{team.teamName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Captain: {team.captain} | Vice-Captain: {team.viceCaptain}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't created any teams yet</p>
                    <Link href="/create-team">
                      <Button>Create Your First Team</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Contest Entries</CardTitle>
                <CardDescription>Contests you've joined</CardDescription>
              </CardHeader>
              <CardContent>
                {entries && entries.length > 0 ? (
                  <div className="space-y-4">
                    {entries.map((entry: any) => (
                      <div key={entry.id} className="border rounded-lg p-4">
                        <p className="font-semibold">Contest #{entry.contestId}</p>
                        <p className="text-sm text-muted-foreground">
                          Points: {entry.points} | Rank: {entry.rank || "TBD"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't joined any contests yet</p>
                    <Link href="/contests">
                      <Button>Browse Contests</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
