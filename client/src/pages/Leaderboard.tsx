import { useQuery } from "@tanstack/react-query";
import { trpc } from "../lib/trpc";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Trophy, Medal, User } from "lucide-react";

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = trpc.getGlobalLeaderboard.useQuery();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Global Leaderboard</h1>
            <p className="text-gray-600">Top performers across all contests</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Total Points</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Contests Won</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leaderboard?.map((entry: any, index: number) => (
                    <tr key={entry.userId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {index === 0 && <Medal className="w-5 h-5 text-yellow-500 mr-2" />}
                          {index === 1 && <Medal className="w-5 h-5 text-gray-400 mr-2" />}
                          {index === 2 && <Medal className="w-5 h-5 text-amber-600 mr-2" />}
                          <span className={`font-bold ${index < 3 ? 'text-lg' : 'text-gray-600'}`}>
                            #{index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{entry.userName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-blue-600">
                        {parseFloat(entry.totalPoints).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600">
                        {entry.contestsJoined}
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
