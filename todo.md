# AYACHI Fantasy Cricket - Development Roadmap

## Phase 1: Authentication & Database Fixes [IN PROGRESS]
- [x] Update database schema to match PDF requirements (Teams, TeamPlayers, Contests, ContestEntries).
- [x] Fix `db.ts` to handle new schema and player mapping.
- [x] Update `routers.ts` for team creation with credits and IDs.
- [ ] Fix login/register session persistence (Cookie synchronization).
- [ ] Implement `db-init` endpoint to automate table creation/updates.

## Phase 2: API Integration (CricketData.org)
- [ ] Create `server/lib/cricketApi.ts` for centralized API calls.
- [ ] Implement `getMatches` to fetch real-time data (Live, Upcoming, Completed).
- [ ] Implement `getSquad` to fetch authentic player lists for specific matches.
- [ ] Implement `getScorecard` for live score updates and point calculation.
- [ ] Securely store and use provided API credentials.

## Phase 3: Core Features (Based on PDF)
- [ ] **Homepage**:
    - [ ] Implement `LiveMatchesSection` with real-time data.
    - [ ] Implement `UpcomingMatchesSection` with real-time data.
    - [ ] Implement `CompletedMatchesSection` with real-time data.
- [ ] **Team Creation**:
    - [ ] Implement 11-player selection logic.
    - [ ] Implement role constraints (WK, BAT, AR, BOWL).
    - [ ] Implement 100-credit budget validation.
    - [ ] Implement Captain (2x) and Vice-Captain (1.5x) selection.
- [ ] **Contest System**:
    - [ ] Implement `ContestList` and `JoinContest` logic.
    - [ ] Implement `ContestSeeding` for new matches.
    - [ ] Implement `ContestSync` cron job for status updates and point calculation.

## Phase 4: UI/UX & Informational Pages
- [ ] Update Header/Footer with all missing links.
- [ ] Implement/Update: About, How to Play, FAQ, Contact, Terms, Privacy, Fair Play, Responsible Gaming.
- [ ] Ensure consistent dark theme and mobile responsiveness.
- [ ] Remove all remaining mock data references.

## Phase 5: Deployment & Verification
- [ ] Run production build (`pnpm build`).
- [ ] Verify database connection on Railway.
- [ ] Perform end-to-end testing (Register -> Create Team -> Join Contest -> View Live Score).
- [ ] Commit all changes to GitHub and verify deployment.
