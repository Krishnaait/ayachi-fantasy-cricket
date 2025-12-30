# AYACHI Fantasy Cricket - Comprehensive Audit & Roadmap

## 1. Critical Authentication & Access Issues
- [ ] **Fix Login Failure**: Investigate why users cannot log in despite correct credentials. (Likely session/cookie sync issue between frontend and backend).
- [ ] **Session Persistence**: Ensure the `ayachi_user_id` cookie is correctly set, sent with every request, and persisted across browser restarts.
- [ ] **Protected Routes**: Verify that `/dashboard`, `/create-team`, and `/contests` (join action) correctly redirect to `/login` when unauthenticated.
- [ ] **Logout Reliability**: Ensure `logout` mutation clears all session data and redirects to the home page immediately.

## 2. Missing Pages & Functional Gaps
- [ ] **My Contests Page**: Create a dedicated page to view all contests a user has joined, including their team performance and rank.
- [ ] **Match Listing Page**: Create a page to browse upcoming real-time matches (integrating with CricketData API).
- [ ] **Team Preview/Edit**: Add functionality to view and edit existing teams before a match starts.
- [ ] **Leaderboard Page**: A global leaderboard showing top performers (based on points, not prizes).
- [ ] **Profile Settings**: A page for users to update their name, phone, and view their registration details.

## 3. Core Feature Enhancements (Skill-Based & Free)
- [ ] **Advanced Team Creation**:
    - [ ] Implement role-based constraints (1-4 WK, 3-6 BAT, 1-4 AR, 3-6 BOWL).
    - [ ] Implement 100-credit budget constraint.
    - [ ] Add player selection UI with real-time stats and credits.
- [ ] **Real-time Scoring Engine**:
    - [ ] Implement a background job to fetch live match data.
    - [ ] Calculate points based on the "How to Play" scoring system.
    - [ ] Update user contest entries with real-time points and ranks.
- [ ] **Contest Management**:
    - [ ] Auto-generate contests for upcoming matches.
    - [ ] Implement "Filled Spots" logic to show contest availability.

## 4. UI/UX & Compliance Audit
- [ ] **Mobile Menu Fix**: Ensure all navigation links (Home, How to Play, About, Contact, FAQ, Dashboard, Contests) are present and working in the mobile dropdown.
- [ ] **Footer Audit**: Add "Home" link to Quick Links. Ensure all legal links are correct.
- [ ] **"Free-to-Play" Reinforcement**:
    - [ ] Audit all pages to ensure NO mention of "Wallet", "Withdraw", "Deposit", "Prize Money", or "Cash".
    - [ ] Add "100% Free - No Financial Risk" banners to Dashboard and Contest pages.
- [ ] **Loading & Error States**: Add skeletons for data-heavy pages and clear error messages for failed actions.

## 5. Technical Cleanup
- [ ] **API Integration**: Set up `cricketdata.org` API integration using provided credentials for authentic match data.
- [ ] **Database Optimization**: Ensure indexes are set for `userId`, `matchId`, and `contestId` for faster queries.
- [ ] **Environment Audit**: Move all hardcoded URLs and secrets to `.env` file.
- [ ] **Remove Unused Code**: Delete `ComponentShowcase.tsx` and any other boilerplate files.

## 6. Testing & Verification
- [ ] **End-to-End Audit**: Register -> Login -> Browse Match -> Create Team -> Join Contest -> View Live Score -> Logout.
- [ ] **State Restriction Test**: Verify registration is blocked for the 6 restricted states.
- [ ] **Age Verification Test**: Verify registration is blocked for users under 18.
