import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { formatToIST } from "@/lib/utils";

interface MatchCardProps {
  match: {
    id: string;
    name: string;
    matchType: string;
    status: string;
    venue: string;
    date: string;
    teams: string[];
    teamInfo?: { name: string; shortname: string; img: string }[];
    matchStarted: boolean;
    matchEnded: boolean;
  };
  type: "live" | "upcoming" | "completed";
}

export default function MatchCard({ match, type }: MatchCardProps) {
  const team1 = match.teamInfo?.[0] || { name: match.teams[0], shortname: match.teams[0]?.substring(0, 3).toUpperCase(), img: "" };
  const team2 = match.teamInfo?.[1] || { name: match.teams[1], shortname: match.teams[1]?.substring(0, 3).toUpperCase(), img: "" };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="bg-muted/30 pb-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            {match.matchType}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            type === 'live' ? 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse' : 
            type === 'upcoming' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
            'bg-muted text-muted-foreground border-border'
          }`}>
            {type === 'live' ? '● LIVE' : type.toUpperCase()}
          </span>
        </div>
        <CardTitle className="text-base mt-2 line-clamp-1 font-bold">{match.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col items-center flex-1 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-muted/50 border border-border flex items-center justify-center overflow-hidden shadow-inner">
              {team1.img ? (
                <img src={team1.img} alt={team1.name} className="w-10 h-10 object-contain" />
              ) : (
                <span className="font-bold text-lg text-muted-foreground">{team1.shortname}</span>
              )}
            </div>
            <span className="text-xs font-bold line-clamp-1 uppercase tracking-tight">{team1.name}</span>
          </div>
          
          <div className="flex flex-col items-center px-2">
            <div className="text-xs font-black text-primary/40 italic">VS</div>
          </div>

          <div className="flex flex-col items-center flex-1 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-muted/50 border border-border flex items-center justify-center overflow-hidden shadow-inner">
              {team2.img ? (
                <img src={team2.img} alt={team2.name} className="w-10 h-10 object-contain" />
              ) : (
                <span className="font-bold text-lg text-muted-foreground">{team2.shortname}</span>
              )}
            </div>
            <span className="text-xs font-bold line-clamp-1 uppercase tracking-tight">{team2.name}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatToIST(match.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{match.venue}</span>
          </div>
          {type === 'completed' && (
            <div className="flex items-center gap-2 text-xs font-medium text-primary">
              <Trophy className="h-3 w-3" />
              <span>{match.status}</span>
            </div>
          )}
        </div>

        <div className="pt-2">
          {type === 'upcoming' ? (
            <Link href={`/create-team/${match.id}`}>
              <Button className="w-full" size="sm">Create Team</Button>
            </Link>
          ) : type === 'live' ? (
            <Link href={`/live-score/${match.id}`}>
              <Button className="w-full" variant="outline" size="sm">View Live Score</Button>
            </Link>
          ) : (
            <Link href={`/results/${match.id}`}>
              <Button className="w-full" variant="ghost" size="sm">View Results</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
