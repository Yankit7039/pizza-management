"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pizza, Users, TrendingUp, Globe, Star, MapPin, Phone, Mail, Play, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const features = [
  {
    icon: Pizza,
    title: "Menu Management",
    description: "Easily manage your pizza menu, pricing, and ingredients with our intuitive interface.",
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Track customer orders, preferences, and build lasting relationships.",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reports",
    description: "Get detailed insights into your business performance with comprehensive analytics.",
  },
  {
    icon: Globe,
    title: "Multi-Location Support",
    description: "Manage multiple pizza outlets across different locations from one dashboard.",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    business: "Delhi Pizza Corner",
    location: "Connaught Place, Delhi",
    rating: 5,
    comment: "PizzaCraft has transformed how we manage our business. Orders are up 40% since we started using it!",
  },
  {
    name: "Priya Sharma",
    business: "Mumbai Pizza Express",
    location: "Bandra, Mumbai",
    rating: 5,
    comment: "The analytics feature helps us understand our customers better. Highly recommended!",
  },
  {
    name: "Amit Patel",
    business: "Bangalore Pizza Hub",
    location: "Koramangala, Bangalore",
    rating: 5,
    comment: "Customer management has never been easier. We can track everything in real-time.",
  },
];

const stats = [
  { number: "500+", label: "Pizza Outlets" },
  { number: "50,000+", label: "Daily Orders" },
  { number: "25+", label: "Cities Covered" },
  { number: "99.9%", label: "Uptime" },
];

export function HomePage() {
  const [activeTab, setActiveTab] = useState("features");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <Pizza className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                PizzaCraft
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400">
              🚀 Now serving 500+ pizza outlets across India
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Manage Your
              </span>
              <br />
              <span className="text-foreground">Pizza Business</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Like a Pro
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              From Delhi to Mumbai, Bangalore to Kolkata - PizzaCraft helps pizza businesses across India streamline
              operations, boost sales, and delight customers with our comprehensive management platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-6"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Run Your Pizza Business</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed specifically for Indian pizza businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Footprint */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted Across India</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From metro cities to tier-2 towns, pizza businesses trust PizzaCraft
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {[
              { city: "Delhi NCR", outlets: "120+" },
              { city: "Mumbai", outlets: "95+" },
              { city: "Bangalore", outlets: "80+" },
              { city: "Chennai", outlets: "65+" },
              { city: "Kolkata", outlets: "55+" },
              { city: "Pune", outlets: "45+" },
              { city: "Hyderabad", outlets: "40+" },
              { city: "Ahmedabad", outlets: "35+" },
              { city: "Jaipur", outlets: "25+" },
              { city: "Lucknow", outlets: "20+" },
            ].map((location, index) => (
              <div key={index} className="p-6 rounded-xl bg-card border">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="font-semibold text-lg">{location.outlets}</div>
                <div className="text-muted-foreground text-sm">{location.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from real pizza business owners across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">"{testimonial.comment}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                  <div className="text-sm text-muted-foreground flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {testimonial.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Pizza Business?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join 500+ pizza outlets across India. Start your free trial today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-6"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to revolutionize your pizza business? Contact us today for a personalized demo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent>
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground mb-4">Speak with our sales team</p>
                <p className="font-semibold">+91 80 4567 8900</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground mb-4">Send us a message</p>
                <p className="font-semibold">sales@pizzacraft.in</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Office</h3>
                <p className="text-muted-foreground mb-4">Visit our headquarters</p>
                <p className="font-semibold">Bangalore, Karnataka</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <Pizza className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                PizzaCraft
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Empowering pizza businesses across India with cutting-edge management solutions.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Support</Link>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                © 2024 PizzaCraft. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}