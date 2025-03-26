
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SearchFilter from '@/components/SearchFilter';
import ItemCard from '@/components/ItemCard';
import { getLostItems, Item } from '@/utils/mockData';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Frown } from 'lucide-react';

const LostItems: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const lostItems = getLostItems();
      setItems(lostItems);
      setFilteredItems(lostItems);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (filters: { 
    searchTerm: string; 
    category: string; 
    location: string;
    status: string;
  }) => {
    const { searchTerm, category, location, status } = filters;
    
    const filtered = items.filter(item => {
      const matchesSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !category || item.category === category;
      const matchesLocation = !location || item.location === location;
      const matchesStatus = !status || item.status === status;

      return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
    });

    setFilteredItems(filtered);
  };

  return (
    <AnimatedTransition>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <motion.h1 
              className="text-3xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Lost Items
            </motion.h1>
            <motion.p 
              className="text-foreground/70 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Browse through items that students have reported as lost on campus. If you've found any of these items, you can contact the owner through our secure messaging system.
            </motion.p>
          </div>

          <SearchFilter onSearch={handleSearch} />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card h-80 animate-pulse">
                  <div className="h-48 bg-secondary/50 rounded-t-2xl"></div>
                  <div className="p-5">
                    <div className="h-4 bg-secondary/70 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-secondary/50 rounded w-full mb-2"></div>
                    <div className="h-3 bg-secondary/50 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <ItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Frown className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-foreground/60">
                No items match your search criteria. Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </AnimatedTransition>
  );
};

export default LostItems;
