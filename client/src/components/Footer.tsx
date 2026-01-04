import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-black relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group">
              <img src="/ayachi_logo.png" alt="AYACHI" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-black tracking-tighter gaming-gradient-text">AYACHI</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">The Ultimate Fantasy Arena</p>
            <div className="flex space-x-4">
              <img src="/icon_18plus.png" alt="18+" className="h-12 w-12 object-contain grayscale hover:grayscale-0 transition-all" />
              <img src="/icon_safe_secure.png" alt="Safe & Secure" className="h-12 w-12 object-contain grayscale hover:grayscale-0 transition-all" />
              <img src="/icon_educational.png" alt="Educational" className="h-12 w-12 object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/matches" className="text-muted-foreground hover:text-primary transition-all">
                  Matches
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-muted-foreground hover:text-primary transition-all">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/how-to-play" className="text-muted-foreground hover:text-primary transition-all">
                  How to Play
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/responsible-gaming" className="text-muted-foreground hover:text-foreground transition-colors">
                  Responsible Gaming
                </Link>
              </li>
              <li>
                <Link href="/fair-play" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fair Play
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Details */}
          <div>
            <h3 className="font-semibold mb-4">Company Details</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">AYACHI HEALTHCARE PRIVATE LIMITED</p>
              <p>CIN: U24110UP2020PTC135826</p>
              <p>GST: 09AAUCA1674K1Z1</p>
              <p>PAN: AAUCA1674K</p>
              <p className="pt-2">
                H. NO. 1/104, NEW JIA MAU,<br />
                NEAR PARAG ATM, LUCKNOW,<br />
                Uttar Pradesh, 226001
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-center font-medium">
              <strong>IMPORTANT:</strong> This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. 
              Only users 18 years and older are permitted. This is a skill-based, free-to-play platform with no real money involved.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-muted-foreground">
            <p>© {currentYear} AYACHI HEALTHCARE PRIVATE LIMITED. All rights reserved.</p>
            <p>100% Free to Play • No Real Money • Educational Purpose</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
