import { z } from "zod";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { systemRouter } from "./_core/systemRouter";
import { dbInitRouter } from "./routers/db-init";
import * as db from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  db: dbInitRouter,
  
  auth: router({
    // Register new user
    register: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string().optional(),
        dateOfBirth: z.string(), // ISO date string
        state: z.string().min(2),
      }))
      .mutation(async ({ input }) => {
        const dateOfBirth = new Date(input.dateOfBirth);
        const result = await db.createUser({
          ...input,
          dateOfBirth,
        });
        return result;
      }),

    // Login user
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const result = await db.loginUser(input.email, input.password);
        if (result.success && result.user) {
          // Store user ID in session
          ctx.res.cookie("ayachi_user_id", result.user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          });
        }
        return result;
      }),

    // Get current user
    me: publicProcedure.query(async ({ ctx }) => {
      const userId = ctx.req.cookies?.ayachi_user_id;
      if (!userId) return null;
      
      const user = await db.getUserById(parseInt(userId));
      return user || null;
    }),

    // Logout
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie("ayachi_user_id");
      return { success: true };
    }),

    // Request password reset
    requestReset: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const result = await db.generateResetToken(input.email);
        // In production, send email with reset link
        // For now, return token (remove in production)
        return result;
      }),

    // Reset password
    resetPassword: publicProcedure
      .input(z.object({
        token: z.string(),
        newPassword: z.string().min(6),
      }))
      .mutation(async ({ input }) => {
        return await db.resetPassword(input.token, input.newPassword);
      }),
  }),

  // Team management
  teams: router({
    // Create team
    create: protectedProcedure
      .input(z.object({
        teamName: z.string().min(3),
        captainId: z.string(),
        viceCaptainId: z.string(),
        players: z.array(z.string()),
        matchId: z.string(),
        totalCreditsUsed: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const userId = parseInt(ctx.req.cookies?.ayachi_user_id || "0");
        if (!userId) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return await db.createTeam({ ...input, userId });
      }),

    // Get user teams
    myTeams: protectedProcedure.query(async ({ ctx }) => {
      const userId = parseInt(ctx.req.cookies?.ayachi_user_id || "0");
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await db.getUserTeams(userId);
    }),
  }),

  // Match management
  matches: router({
    list: publicProcedure.query(async () => {
      const { getCurrentMatches, getMatchesList } = await import("./lib/cricketApi");
      
      // Fetch current matches (Live + Recent)
      const current = await getCurrentMatches();
      
      // Fetch multiple pages of matches to find upcoming ones
      // We scan up to 4 pages (100 matches) to ensure we find future fixtures
      const pages = [0, 25, 50, 75];
      const matchesLists = await Promise.all(pages.map(offset => getMatchesList(offset)));
      
      // Merge all matches and remove duplicates
      const allMatches = [...current];
      const existingIds = new Set(allMatches.map(m => m.id));
      
      for (const list of matchesLists) {
        for (const match of list) {
          if (!existingIds.has(match.id)) {
            allMatches.push(match);
            existingIds.add(match.id);
          }
        }
      }
      
      // Sort matches: Live first, then Upcoming (by date), then Completed
      return allMatches.sort((a, b) => {
        // Live matches first
        if (a.matchStarted && !a.matchEnded) return -1;
        if (b.matchStarted && !b.matchEnded) return 1;
        
        // Upcoming matches next (sorted by date)
        if (!a.matchStarted && !b.matchStarted) {
          return new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime();
        }
        if (!a.matchStarted) return -1;
        if (!b.matchStarted) return 1;
        
        // Completed matches last
        return new Date(b.dateTimeGMT).getTime() - new Date(a.dateTimeGMT).getTime();
      });
    }),
    all: publicProcedure
      .input(z.object({ offset: z.number().default(0) }))
      .query(async ({ input }) => {
        const { getMatchesList } = await import("./lib/cricketApi");
        return await getMatchesList(input.offset);
      }),
    info: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const { getMatchInfo } = await import("./lib/cricketApi");
        return await getMatchInfo(input.id);
      }),
    squad: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const { getFantasySquad } = await import("./lib/cricketApi");
        return await getFantasySquad(input.id);
      }),
    scorecard: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const { getFantasyScorecard } = await import("./lib/cricketApi");
        return await getFantasyScorecard(input.id);
      }),
    points: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const { getFantasyMatchPoints } = await import("./lib/cricketApi");
        return await getFantasyMatchPoints(input.id);
      }),
  }),

  // Series management
  series: router({
    list: publicProcedure
      .input(z.object({ offset: z.number().default(0) }))
      .query(async ({ input }) => {
        const { getSeriesList } = await import("./lib/cricketApi");
        return await getSeriesList(input.offset);
      }),
    points: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const { getSeriesPointTable } = await import("./lib/cricketApi");
        return await getSeriesPointTable(input.id);
      }),
  }),

  // Player management
  players: router({
    list: publicProcedure
      .input(z.object({ offset: z.number().default(0) }))
      .query(async ({ input }) => {
        const { getPlayersList } = await import("./lib/cricketApi");
        return await getPlayersList(input.offset);
      }),
    info: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const { getPlayerInfo } = await import("./lib/cricketApi");
        return await getPlayerInfo(input.id);
      }),
  }),

  // Contest management
  contests: router({
    // Get all active contests
    list: publicProcedure.query(async () => {
      const contests = await db.getActiveContests();
      console.log(`Fetched ${contests.length} active contests`);
      return contests;
    }),

    // Join contest
    join: protectedProcedure
      .input(z.object({
        contestId: z.number(),
        teamId: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        const userId = parseInt(ctx.req.cookies?.ayachi_user_id || "0");
        if (!userId) throw new Error("Unauthorized");
        return await db.joinContest(userId, input.contestId, input.teamId);
      }),

    // Get user contest entries
    myEntries: protectedProcedure.query(async ({ ctx }) => {
      const userId = parseInt(ctx.req.cookies?.ayachi_user_id || "0");
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await db.getUserContestEntries(userId);
    }),
  }),
});

export type AppRouter = typeof appRouter;
