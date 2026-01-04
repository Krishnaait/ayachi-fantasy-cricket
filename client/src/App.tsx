import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CreateTeam from "./pages/CreateTeam";
import Contests from "./pages/Contests";
import LiveScore from "./pages/LiveScore";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import Matches from "./pages/Matches";
import HowToPlay from "./pages/HowToPlay";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import Disclaimer from "./pages/Disclaimer";
import FAQ from "./pages/FAQ";
import FairPlay from "./pages/FairPlay";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create-team/:id" component={CreateTeam} />
      <Route path="/contests" component={Contests} />
      <Route path="/live-score/:id" component={LiveScore} />
      <Route path="/results/:id" component={Results} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/matches" component={Matches} />
      <Route path="/how-to-play" component={HowToPlay} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/responsible-gaming" component={ResponsibleGaming} />
      <Route path="/fair-play" component={FairPlay} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/faq" component={FAQ} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
