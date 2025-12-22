import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/images/logo.png" alt="AYACHI" className="h-12 w-auto" />
            <p className="text-sm text-muted-foreground">Fantasy Sport</p>
            <div className="flex space-x-4">
              <img src="/images/18plus.png" alt="18+" className="h-10 w-10" />
              <img src="/images/safe-secure.png" alt="Safe & Secure" className="h-10 w-10" />
              <img src="/images/educational.png" alt="Educational" className="h-10 w-10" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-to-play">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    How to Play
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms & Conditions
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/responsible-gaming">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Responsible Gaming
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Disclaimer
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </a>
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
