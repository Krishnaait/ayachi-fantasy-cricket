import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, User, Star, ShieldCheck, Info, CheckCircle2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function CreateTeam() {
  const { id: matchId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  
  const [teamName, setTeamName] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [captainId, setCaptainId] = useState<string>("");
  const [viceCaptainId, setViceCaptainId] = useState<string>("");

  // Fetch match info and squad
  const { data: match, isLoading: isMatchLoading } = trpc.matches.info.useQuery({ id: matchId! });
  const { data: squadData, isLoading: isSquadLoading } = trpc.matches.squad.useQuery({ id: matchId! });

  const createTeamMutation = trpc.teams.create.useMutation({
    onSuccess: () => {
      toast.success("Team created successfully!");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error("Failed to create team: " + error.message);
    },
  });

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  const isLoading = isMatchLoading || isSquadLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
            <p className="text-muted-foreground animate-pulse">Fetching real-time squad data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // The API returns the squad in a nested structure: Array of teams, each with a players array
  const players = Array.isArray(squadData) 
    ? squadData.flatMap((team: any) => team.players || []) 
    : [];
  const totalCredits = 100;
  const usedCredits = selectedPlayers.length * 9; // Mock credits since API doesn't provide them

  const togglePlayer = (player: any) => {
    if (selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      if (captainId === player.id) setCaptainId("");
      if (viceCaptainId === player.id) setViceCaptainId("");
    } else {
      if (selectedPlayers.length >= 11) {
        toast.error("You can only select 11 players");
        return;
      }
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlayers.length !== 11) {
      toast.error("Please select exactly 11 players");
      return;
    }
    if (!captainId || !viceCaptainId) {
      toast.error("Please select a Captain and Vice-Captain");
      return;
    }
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }

    createTeamMutation.mutate({
      teamName,
      matchId: matchId!,
      captainId,
      viceCaptainId,
      players: selectedPlayers.map(p => p.id),
      totalCreditsUsed: usedCredits.toString(),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 container py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Player Selection */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold">{match?.name}</h1>
                <p className="text-muted-foreground">{match?.venue}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium mb-1">Players: {selectedPlayers.length}/11</div>
                <Progress value={(selectedPlayers.length / 11) * 100} className="w-32 h-2" />
              </div>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Select Players</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {players.length > 0 ? (
                    players.map((player: any) => {
                      const isSelected = selectedPlayers.find(p => p.id === player.id);
                      return (
                        <div 
                          key={player.id} 
                          className={`flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors ${isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                          onClick={() => togglePlayer(player)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-background shadow-sm">
                                {player.playerImg ? (
                                  <img src={player.playerImg} alt={player.name} className="w-full h-full object-cover" />
                                ) : (
                                  <User className="h-6 w-6 text-muted-foreground" />
                                )}
                              </div>
                              {isSelected && (
                                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm">
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-sm md:text-base">{player.name}</div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px] py-0 h-4 uppercase font-bold bg-muted/50">
                                  {player.role || 'Player'}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground">{player.country}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 md:gap-8">
                            <div className="text-right hidden sm:block">
                              <div className="font-black text-primary">9.0</div>
                              <div className="text-[9px] text-muted-foreground uppercase font-bold">Credits</div>
                            </div>
                            <Button 
                              variant={isSelected ? "destructive" : "outline"} 
                              size="sm"
                              className={`w-20 font-bold transition-all ${isSelected ? 'shadow-inner' : 'shadow-sm hover:bg-primary hover:text-primary-foreground'}`}
                            >
                              {isSelected ? "Remove" : "Add"}
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-20 text-center space-y-4">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <Users className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg">Squad Not Available</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                          The official squad for this match hasn't been announced yet. Please check back closer to the match start time.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Team Preview & Settings */}
          <div className="w-full lg:w-96 space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Team Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Team Name</label>
                  <input 
                    className="w-full p-2 rounded-md border bg-background"
                    placeholder="My Dream Team"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Choose Captain (2x Points)</label>
                  <select 
                    className="w-full p-2 rounded-md border bg-background"
                    value={captainId}
                    onChange={(e) => setCaptainId(e.target.value)}
                  >
                    <option value="">Select Captain</option>
                    {selectedPlayers.map(p => (
                      <option key={p.id} value={p.id} disabled={p.id === viceCaptainId}>{p.name}</option>
                    ))}
                  </select>

                  <label className="text-sm font-medium">Choose Vice-Captain (1.5x Points)</label>
                  <select 
                    className="w-full p-2 rounded-md border bg-background"
                    value={viceCaptainId}
                    onChange={(e) => setViceCaptainId(e.target.value)}
                  >
                    <option value="">Select Vice-Captain</option>
                    {selectedPlayers.map(p => (
                      <option key={p.id} value={p.id} disabled={p.id === captainId}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Credits Used</span>
                    <span className="font-bold">{usedCredits}/100</span>
                  </div>
                  <Button 
                    className="w-full h-12 text-lg font-bold" 
                    disabled={selectedPlayers.length !== 11 || !captainId || !viceCaptainId || createTeamMutation.isPending}
                    onClick={handleSubmit}
                  >
                    {createTeamMutation.isPending ? <Loader2 className="animate-spin" /> : "Save Team"}
                  </Button>
                  <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                    <Info className="h-3 w-3" />
                    You can edit your team until the match starts.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Selected Players List */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Selected Players ({selectedPlayers.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {selectedPlayers.map(p => (
                  <div key={p.id} className="flex items-center justify-between text-xs p-2 bg-muted rounded">
                    <span className="font-medium">{p.name}</span>
                    <div className="flex gap-1">
                      {captainId === p.id && <Badge variant="default" className="h-4 px-1 text-[8px]">C</Badge>}
                      {viceCaptainId === p.id && <Badge variant="secondary" className="h-4 px-1 text-[8px]">VC</Badge>}
                    </div>
                  </div>
                ))}
                {selectedPlayers.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">No players selected yet</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
