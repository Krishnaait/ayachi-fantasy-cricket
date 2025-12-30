# AYACHI Fantasy Cricket Website - TODO List

## Core Functionality Fixes
- [ ] **Complete Contest Join Flow**: Ensure the `joinContest` mutation is correctly called and the state is updated in the UI.
- [ ] **Refresh Dashboard Data**: Automatically refresh contest entries and teams on the dashboard after a successful join or creation.
- [ ] **Player Selection Logic**: Improve the `CreateTeam` page to include player roles (WK, BAT, AR, BOWL) and credit constraints as per the "How to Play" guide.
- [ ] **Real-time Match Data**: Replace placeholder match IDs with a system to fetch or manage real upcoming matches.

## Navigation & UI/UX Improvements
- [ ] **Header Navigation**: Add missing links to the mobile menu and ensure all legal pages are easily accessible.
- [ ] **Footer Links**: Add "Home" link to the Quick Links section in the footer.
- [ ] **Animations**: Add subtle entry animations using Framer Motion to sections on the Homepage and Dashboard.
- [ ] **Loading States**: Implement better loading skeletons for the Dashboard and Contest listing pages.
- [ ] **Error Handling**: Add a global error boundary and toast notifications for all API failures.

## Content & Compliance
- [ ] **Homepage Hero**: Enhance the hero section with a more engaging design and better trust badges.
- [ ] **FAQ Expansion**: Add more detailed Q&A sections based on common user inquiries.
- [ ] **Contact Form Backend**: Implement a backend procedure to handle contact form submissions (e.g., saving to DB or sending email).
- [ ] **State Restriction Audit**: Ensure the restricted states list is consistent across the registration page and legal documents.

## Cleanup & Maintenance
- [x] **Remove Manus Elements**: Removed all Manus-related plugins, components, and references from the codebase.
- [ ] **Code Refactoring**: Clean up unused components like `ComponentShowcase.tsx` if not needed.
- [ ] **Environment Variables**: Ensure all sensitive information (DB URLs, API keys) is managed via `.env` files.

## Testing
- [ ] **End-to-End Testing**: Test the full user journey: Register -> Login -> Create Team -> Join Contest -> View Dashboard.
- [ ] **Mobile Responsiveness Audit**: Check all pages on various screen sizes and fix any layout breaks.
- [ ] **Performance Optimization**: Optimize image sizes and bundle size for faster loading.
