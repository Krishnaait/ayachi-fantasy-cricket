import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, MapPin, Trophy } from "lucide-react";

interface MatchCardProps {
  match: {
    id: string;
    name: string;
    matchType: string;
    status: string;
    venue: string;
    date: string;
    teams: string[];
    matchStarted: boolean;
    matchEnded: boolean;
  };
  type: "live" | "upcoming" | "completed";
}

export default function MatchCard({ match, type }: MatchCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-primary/20">
      <CardHeader className="bg-muted/50 pb-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
            {match.matchType}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded ${
            type === 'live' ? 'bg-red-500/10 text-red-500 animate-pulse' : 
            type === 'upcoming' ? 'bg-blue-500/10 text-blue-500' : 
            'bg-gray-500/10 text-gray-500'
          }`}>
            {type === 'live' ? '● LIVE' : type.toUpperCase()}
          </span>
        </div>
        <CardTitle className="text-lg mt-2 line-clamp-1">{match.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col items-center flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2 font-bold text-lg">
              {match.teams[0]?.substring(0, 2).toUpperCase()}
            </div>
            <span className="text-sm font-semibold line-clamp-1">{match.teams[0]}</span>
          </div>
          <div className="text-xl font-bold text-muted-foreground">VS</div>
          <div className="flex flex-col items-center flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2 font-bold text-lg">
              {match.teams[1]?.substring(0, 2).toUpperCase()}
            </div>
            <span className="text-sm font-semibold line-clamp-1">{match.teams[1]}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(match.date).toLocaleDateString()}</span>
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
            <Link href={`/dashboard/matches/${match.id}/create-team`}>
              <Button className="w-full" size="sm">Create Team</Button>
            </Link>
          ) : type === 'live' ? (
            <Link href={`/dashboard/live-scores/${match.id}`}>
              <Button className="w-full" variant="outline" size="sm">View Live Score</Button>
            </Link>
          ) : (
            <Link href={`/dashboard/matches/${match.id}/results`}>
              <Button className="w-full" variant="ghost" size="sm">View Results</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
