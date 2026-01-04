import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, MapPin, Trophy, Clock } from "lucide-react";
import { formatToIST } from "@/lib/utils";

interface MatchCardProps {
  match: {
    id: string;
    name: string;
    matchType: string;
    status: string;
    venue: string;
    date: string;
    dateTimeGMT: string;
    teams: string[];
    teamInfo?: { name: string; shortname: string; img: string }[];
    matchStarted: boolean;
    matchEnded: boolean;
  };
  type: "live" | "upcoming" | "completed";
}

export default function MatchCard({ match, type }: MatchCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (type !== 'upcoming') return;

    const calculateTimeLeft = () => {
      const targetDate = new Date(match.dateTimeGMT || match.date).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft("Started");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      if (days > 0) {
        setTimeLeft(`Starts in ${days} day${days > 1 ? 's' : ''}`);
      } else {
        setTimeLeft(`Starts in ${hours}h ${minutes}m`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [match.dateTimeGMT, match.date, type]);

  const team1 = match.teamInfo?.[0] || { 
    name: match.teams?.[0] || "TBC", 
    shortname: (match.teams?.[0] || "TBC").substring(0, 3).toUpperCase(), 
    img: "" 
  };
  const team2 = match.teamInfo?.[1] || { 
    name: match.teams?.[1] || "TBC", 
    shortname: (match.teams?.[1] || "TBC").substring(0, 3).toUpperCase(), 
    img: "" 
  }; return (
    <Card className="gaming-card overflow-hidden group">
      <CardHeader className="bg-white/5 pb-3 border-b border-white/5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
            {match.matchType}
          </span>
          <span className={`text-[10px] font-black px-3 py-1 rounded-lg border ${
            type === 'live' ? 'bg-red-500/20 text-red-500 border-red-500/30 animate-pulse' : 
            type === 'upcoming' ? 'bg-accent/20 text-accent border-accent/30' : 
            'bg-white/5 text-muted-foreground border-white/10'
          }`}>
            {type === 'live' ? '● LIVE BATTLE' : type.toUpperCase()}
          </span>
        </div>
        <CardTitle className="text-base mt-3 line-clamp-1 font-black tracking-tight group-hover:text-primary transition-colors">{match.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-8 space-y-8">
        <div className="flex justify-between items-center gap-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-white/5 italic -z-0">VS</div>
          <div className="flex flex-col items-center flex-1 text-center space-y-3 z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500 shadow-2xl">
              {team1.img ? (
                <img src={team1.img} alt={team1.name} className="w-12 h-12 object-contain" />
              ) : (
                <span className="font-black text-xl text-primary">{team1.shortname}</span>
              )}
            </div>
            <span className="text-[10px] font-black line-clamp-1 uppercase tracking-widest text-muted-foreground">{team1.name}</span>
          </div>
          
          <div className="flex flex-col items-center px-2 z-10">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-xs font-black text-primary italic">VS</span>
            </div>
          </div>

          <div className="flex flex-col items-center flex-1 text-center space-y-3 z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500 shadow-2xl">
              {team2.img ? (
                <img src={team2.img} alt={team2.name} className="w-12 h-12 object-contain" />
              ) : (
                <span className="font-black text-xl text-primary">{team2.shortname}</span>
              )}
            </div>
            <span className="text-[10px] font-black line-clamp-1 uppercase tracking-widest text-muted-foreground">{team2.name}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border/50">
          {type === 'upcoming' && timeLeft && (
            <div className="flex items-center gap-2 text-xs font-bold text-green-600 mb-1">
              <Clock className="h-3 w-3" />
              <span>{timeLeft}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatToIST(match.dateTimeGMT || match.date)}</span>
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

        <div className="pt-4">
          {type === 'upcoming' ? (
            <Link href={`/create-team/${match.id}`}>
              <Button className="w-full gaming-button font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-black" size="lg">
                CREATE TEAM
              </Button>
            </Link>
          ) : type === 'live' ? (
            <Link href={`/live-score/${match.id}`}>
              <Button className="w-full gaming-button font-black uppercase tracking-widest border-2 border-primary/50 text-primary hover:bg-primary/10" variant="outline" size="lg">
                LIVE SCORE
              </Button>
            </Link>
          ) : (
            <Link href={`/results/${match.id}`}>
              <Button className="w-full gaming-button font-black uppercase tracking-widest border-2 border-white/10 text-white hover:bg-white/5" variant="outline" size="lg">
                RESULTS
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
