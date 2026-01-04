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

  // Auto-refresh live matches every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 15000);
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container py-12 px-4 max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Cricket Matches</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Browse all live, upcoming, and completed matches. Join contests and track real-time scores.
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2 shadow-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <input 
                type="date" 
                className="outline-none text-sm font-medium"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            {selectedDate && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedDate("")}
                className="text-xs"
              >
                Clear Filter
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="live" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white border shadow-sm p-1 h-14 rounded-2xl">
              <TabsTrigger value="live" className="rounded-xl px-8 data-[state=active]:bg-red-600 data-[state=active]:text-white flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                Live
                {liveMatches.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-bold">
                    {liveMatches.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="rounded-xl px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-xl px-8 data-[state=active]:bg-gray-900 data-[state=active]:text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="live" className="mt-0">
            {liveMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {liveMatches.map((match) => (
                  <MatchCard key={match.id} match={match} type="live" />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
                <PlayCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">No Live Matches</h3>
                <p className="text-gray-500">There are no matches currently in progress.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0">
            {upcomingMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingMatches.map((match) => (
                  <MatchCard key={match.id} match={match} type="upcoming" />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">No Upcoming Matches</h3>
                <p className="text-gray-500">Check back later for future match schedules.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            {completedMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedMatches.map((match) => (
                  <MatchCard key={match.id} match={match} type="completed" />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
                <CheckCircle2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">No Completed Matches</h3>
                <p className="text-gray-500">Results for recent matches will appear here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
