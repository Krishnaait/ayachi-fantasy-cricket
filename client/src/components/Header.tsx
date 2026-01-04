import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut } from "lucide-react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <img src="/ayachi_logo.svg" alt="AYACHI" className="h-14 w-auto group-hover:scale-110 transition-transform duration-300" />
          <span className="text-2xl font-black tracking-tighter gaming-gradient-text hidden sm:block">AYACHI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-black uppercase tracking-widest">
          <Link href="/" className="transition-all hover:text-primary hover:scale-110">
            Home
          </Link>
          <Link href="/matches" className="transition-all hover:text-primary hover:scale-110">
            Matches
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/dashboard" className="transition-all hover:text-primary hover:scale-110">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="transition-all hover:text-primary hover:scale-110">
                Leaderboard
              </Link>
            </>
          )}
          <Link href="/how-to-play" className="transition-all hover:text-primary hover:scale-110">
            How to Play
          </Link>
          <Link href="/faq" className="transition-all hover:text-primary hover:scale-110">
            FAQ
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hidden md:inline-flex font-black uppercase tracking-widest text-xs">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="hidden md:inline-flex gaming-button font-black uppercase tracking-widest text-xs bg-primary text-black">Register</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button className="hidden md:inline-flex gaming-button font-black uppercase tracking-widest text-xs bg-primary text-black">
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex border border-white/10 rounded-xl">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-white/10">
                  <DropdownMenuItem disabled className="font-black uppercase tracking-widest text-[10px] text-primary">
                    <User className="mr-2 h-4 w-4" />
                    {user?.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="font-black uppercase tracking-widest text-[10px] text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <Link href="/">
                <DropdownMenuItem>Home</DropdownMenuItem>
              </Link>
              <Link href="/how-to-play">
                <DropdownMenuItem>How to Play</DropdownMenuItem>
              </Link>
              <Link href="/about">
                <DropdownMenuItem>About Us</DropdownMenuItem>
              </Link>
              <Link href="/matches">
                <DropdownMenuItem>Matches</DropdownMenuItem>
              </Link>
              <Link href="/faq">
                <DropdownMenuItem>FAQ</DropdownMenuItem>
              </Link>
              {isAuthenticated && (
                <>
                  <Link href="/dashboard">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                  <Link href="/contests">
                    <DropdownMenuItem>Contests</DropdownMenuItem>
                  </Link>
                  <Link href="/leaderboard">
                    <DropdownMenuItem>Leaderboard</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Link href="/login">
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                  <Link href="/register">
                    <DropdownMenuItem>Register</DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
