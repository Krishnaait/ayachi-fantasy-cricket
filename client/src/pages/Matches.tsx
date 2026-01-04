import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import MatchCard from "@/components/MatchCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Calendar, PlayCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Matches() {
  const { data: matches, isLoading, refetch } = trpc.matches.list.useQuery(undefined, {
    refetchInterval: 15000,
  });
  const [activeTab, setActiveTab] = useState("live");
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-refresh matches every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const filteredMatches = matches?.filter(m => {
    if (!selectedDate) return true;
    // The API provides m.date in YYYY-MM-DD format
    return m.date === selectedDate;
  }) || [];

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const jan1_2026 = "2026-01-01";
  
  const liveMatches = filteredMatches.filter(m => m.matchStarted && !m.matchEnded && m.date >= todayStr);
  const upcomingMatches = filteredMatches.filter(m => !m.matchStarted && m.date >= todayStr);
  const completedMatches = filteredMatches.filter(m => (m.matchEnded || (m.matchStarted && m.date < todayStr)) && m.date >= jan1_2026);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 px-4 max-w-7xl">
        <div className="mb-16 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 gaming-gradient-text tracking-tighter">
            CRICKET ARENA
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-10">
            Dominate the field. Join live battles, track upcoming clashes, and review your victories.
          </p>
          
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center gap-3 bg-card/50 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 shadow-xl">
              <Calendar className="h-5 w-5 text-primary" />
              <input 
                type="date" 
                className="bg-transparent outline-none text-sm font-black uppercase tracking-widest text-foreground"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            {selectedDate && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedDate("")}
                className="text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/10"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="live" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-16">
            <TabsList className="bg-card/50 backdrop-blur-md border border-white/10 p-1.5 h-16 rounded-2xl shadow-2xl">
              <TabsTrigger value="live" className="rounded-xl px-10 h-full data-[state=active]:bg-red-600 data-[state=active]:text-white font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all duration-300">
                <div className="h-2 w-2 rounded-full bg-current animate-pulse"></div>
                Live
                {liveMatches.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-black">
                    {liveMatches.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="rounded-xl px-10 h-full data-[state=active]:bg-primary data-[state=active]:text-black font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all duration-300">
                <Calendar className="h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-xl px-10 h-full data-[state=active]:bg-white data-[state=active]:text-black font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all duration-300">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="live" className="mt-0 outline-none">
            {liveMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {liveMatches.map((match) => (
                  <MatchCard key={match.id} match={match} type="live" />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 gaming-card rounded-3xl border-dashed border-white/10">
                <PlayCircle className="h-20 w-20 text-muted-foreground/20 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">No Live Battles</h3>
                <p className="text-muted-foreground font-medium">The arena is quiet... for now. Check upcoming matches!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0 outline-none">
            {upcomingMatches.length > 0 ? (
              <div className="space-y-20">
                {Object.entries(
                  upcomingMatches.reduce((acc, match) => {
                    const date = match.date;
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(match);
                    return acc;
                  }, {} as Record<string, any[]>)
                ).sort(([dateA], [dateB]) => dateA.localeCompare(dateB)).map(([date, dateMatches]) => (
                  <div key={date} className="space-y-8">
                    <div className="flex items-center gap-6">
                      <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-6 py-2 rounded-full border border-primary/20 whitespace-nowrap">
                        {new Date(date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {dateMatches.map((match) => (
                        <MatchCard key={match.id} match={match} type="upcoming" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 gaming-card rounded-3xl border-dashed border-white/10">
                <Calendar className="h-20 w-20 text-muted-foreground/20 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">No Upcoming Clashes</h3>
                <p className="text-muted-foreground font-medium">Stay tuned for the next round of matches.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-0 outline-none">
            {completedMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedMatches.map((match) => (
                  <MatchCard key={match.id} match={match} type="completed" />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 gaming-card rounded-3xl border-dashed border-white/10">
                <CheckCircle2 className="h-20 w-20 text-muted-foreground/20 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">No Recent Results</h3>
                <p className="text-muted-foreground font-medium">Match outcomes will be recorded here once they conclude.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
