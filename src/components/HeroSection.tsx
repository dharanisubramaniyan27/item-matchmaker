
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  return (
    <div className="relative overflow-hidden pt-28 pb-16 sm:pb-24 lg:pb-32">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full bg-primary/5"
        variants={circleVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute bottom-0 left-0 w-1/4 h-1/4 rounded-full bg-primary/10"
        variants={circleVariants}
        initial="hidden"
        animate="visible"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-8 inline-block"
            variants={itemVariants}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              ABC University Campus
            </span>
          </motion.div>
          
          <motion.h1
            className="text-4xl font-display font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
            variants={itemVariants}
          >
            Lost Something? <br className="hidden sm:inline" />
            <span className="text-primary">We'll Help You Find It</span>
          </motion.h1>
          
          <motion.p
            className="text-lg text-foreground/70 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            A simple, secure way to recover lost items on campus. Report what you've lost or found and connect with your community to get things back where they belong.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <Link to="/lost-items">
              <Button className="neo-button px-8 py-6 text-base">
                Browse Lost Items
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/found-items">
              <Button variant="outline" className="px-8 py-6 text-base">
                <Search className="mr-2 w-5 h-5" />
                Search Found Items
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="mt-16 relative max-w-4xl mx-auto"
          variants={itemVariants}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="glass-card overflow-hidden p-2 sm:p-4">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="University campus with students"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                <div className="p-4 sm:p-6 text-white">
                  <p className="text-sm sm:text-base font-medium mb-1">Easy to use system</p>
                  <h3 className="text-lg sm:text-xl font-bold">Report and recover items securely</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
