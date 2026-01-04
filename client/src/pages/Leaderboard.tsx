import { useEffect } from "react";
import { trpc } from "../lib/trpc";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Trophy, Medal, User } from "lucide-react";

export default function Leaderboard() {
  const { data: leaderboard, isLoading, refetch } = trpc.getGlobalLeaderboard.useQuery();

  // Auto-refresh leaderboard every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            <Trophy className="w-20 h-20 text-primary mx-auto mb-6 animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-black mb-4 gaming-gradient-text">
              GLOBAL LEADERBOARD
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              The Elite Champions of AYACHI Fantasy
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-r-4 border-r-transparent"></div>
              <p className="mt-4 text-primary font-bold animate-pulse">LOADING CHAMPIONS...</p>
            </div>
          ) : (
            <div className="gaming-card rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-widest text-muted-foreground">Rank</th>
                      <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-widest text-muted-foreground">Champion</th>
                      <th className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Total Points</th>
                      <th className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Battles Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leaderboard?.map((entry: any, index: number) => (
                      <tr key={entry.userId} className="hover:bg-white/5 transition-all duration-300 group">
                        <td className="px-8 py-6">
                          <div className="flex items-center">
                            {index === 0 && <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-yellow-500/20"><Trophy className="w-5 h-5 text-black" /></div>}
                            {index === 1 && <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-gray-300/20"><Medal className="w-5 h-5 text-black" /></div>}
                            {index === 2 && <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-amber-700/20"><Medal className="w-5 h-5 text-black" /></div>}
                            <span className={`font-black text-xl ${index < 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                              #{index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                              <User className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                              <span className="font-bold text-lg block group-hover:text-primary transition-colors">{entry.userName}</span>
                              <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">Elite Player</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="font-black text-2xl text-accent">
                            {parseFloat(entry.totalPoints).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="px-3 py-1 bg-white/5 rounded-full text-sm font-bold border border-white/10">
                            {entry.contestsJoined}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(!leaderboard || leaderboard.length === 0) && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                          No rankings available yet. Join a contest to start climbing!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
