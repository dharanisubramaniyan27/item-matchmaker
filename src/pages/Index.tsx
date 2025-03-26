
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { getLostItems, getFoundItems } from '@/utils/mockData';
import ItemCard from '@/components/ItemCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Upload, Bell, Shield } from 'lucide-react';

const Index: React.FC = () => {
  const recentLostItems = getLostItems().slice(0, 3);
  const recentFoundItems = getFoundItems().slice(0, 3);

  const features = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Easy Search",
      description: "Quickly find lost items with our powerful search and filter system."
    },
    {
      icon: <Upload className="h-10 w-10 text-primary" />,
      title: "Simple Submission",
      description: "Report lost or found items in seconds with our streamlined process."
    },
    {
      icon: <Bell className="h-10 w-10 text-primary" />,
      title: "Instant Notifications",
      description: "Get alerts when items matching your description are found."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure Communication",
      description: "Connect with other users without sharing personal contact details."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold">How It Works</h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
                Our platform makes it easy to recover lost items and return found items to their owners
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Recent Lost Items */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-display font-bold">Recently Lost Items</h2>
              <Link to="/lost-items">
                <Button variant="ghost" className="text-primary">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentLostItems.map((item, index) => (
                <ItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Recent Found Items */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-display font-bold">Recently Found Items</h2>
              <Link to="/found-items">
                <Button variant="ghost" className="text-primary">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentFoundItems.map((item, index) => (
                <ItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold mb-6">
                Lost Something on Campus?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Our community-driven platform helps you reunite with your belongings quickly and easily.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/submit-item">
                  <Button className="neo-button px-8 py-6 text-base w-full sm:w-auto">
                    Report an Item
                  </Button>
                </Link>
                <Link to="/lost-items">
                  <Button variant="outline" className="px-8 py-6 text-base w-full sm:w-auto">
                    Browse Lost Items
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-foreground text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-xl font-bold mb-4">
                  Found<span className="text-primary">It</span>
                </h3>
                <p className="text-white/70 mb-4">
                  A secure platform for ABC University students to recover lost items and return found items to their owners.
                </p>
                <p className="text-white/70">
                  © {new Date().getFullYear()} FoundIt. All rights reserved.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-white/70">
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/lost-items" className="hover:text-white transition-colors">Lost Items</Link></li>
                  <li><Link to="/found-items" className="hover:text-white transition-colors">Found Items</Link></li>
                  <li><Link to="/submit-item" className="hover:text-white transition-colors">Submit Item</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-white/70">
                  <li>ABC University</li>
                  <li>123 Campus Drive</li>
                  <li>College Town, ST 12345</li>
                  <li>support@abcuniversity.edu</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
