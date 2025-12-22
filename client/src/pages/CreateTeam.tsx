import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function CreateTeam() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [teamName, setTeamName] = useState("");
  const [captain, setCaptain] = useState("");
  const [viceCaptain, setViceCaptain] = useState("");
  const [players, setPlayers] = useState<string[]>(["", "", "", "", "", "", "", "", "", "", ""]);

  const createTeamMutation = trpc.teams.create.useMutation({
    onSuccess: () => {
      toast.success("Team created successfully!");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error("Failed to create team: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filledPlayers = players.filter(p => p.trim() !== "");
    if (filledPlayers.length < 11) {
      toast.error("Please select all 11 players");
      return;
    }
    createTeamMutation.mutate({
      teamName,
      captain,
      viceCaptain,
      players: filledPlayers,
    });
  };

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Create Your Team</h1>
          <Card>
            <CardHeader>
              <CardTitle>Team Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name *</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="captain">Captain *</Label>
                    <Input
                      id="captain"
                      value={captain}
                      onChange={(e) => setCaptain(e.target.value)}
                      placeholder="Select captain"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="viceCaptain">Vice Captain *</Label>
                    <Input
                      id="viceCaptain"
                      value={viceCaptain}
                      onChange={(e) => setViceCaptain(e.target.value)}
                      placeholder="Select vice captain"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Select 11 Players *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {players.map((player, index) => (
                      <Input
                        key={index}
                        value={player}
                        onChange={(e) => {
                          const newPlayers = [...players];
                          newPlayers[index] = e.target.value;
                          setPlayers(newPlayers);
                        }}
                        placeholder={`Player ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={createTeamMutation.isPending}>
                  {createTeamMutation.isPending ? "Creating..." : "Create Team"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
