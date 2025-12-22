import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, Building2, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Us</h1>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Have questions? We're here to help!
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="What is your message about?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-lg mb-2">AYACHI HEALTHCARE PRIVATE LIMITED</p>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong>CIN:</strong> U24110UP2020PTC135826</p>
                      <p><strong>GST:</strong> 09AAUCA1674K1Z1</p>
                      <p><strong>PAN:</strong> AAUCA1674K</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Registered Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    H. NO. 1/104, NEW JIA MAU,<br />
                    NEAR PARAG ATM,<br />
                    LUCKNOW, Uttar Pradesh<br />
                    PIN: 226001<br />
                    India
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                    Saturday: 10:00 AM - 4:00 PM IST<br />
                    Sunday: Closed
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    We typically respond within 24-48 hours during business days.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                Before reaching out, you might find answers to common questions on our FAQ page:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Account & Registration</h4>
                  <p className="text-sm text-muted-foreground">Age requirements, state restrictions, account setup</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">How to Play</h4>
                  <p className="text-sm text-muted-foreground">Team creation, scoring system, contest rules</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Platform Policies</h4>
                  <p className="text-sm text-muted-foreground">Terms, privacy, responsible gaming guidelines</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
