
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Item } from '@/utils/mockData';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ItemCardProps {
  item: Item;
  index: number;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, index }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    claimed: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
  };

  const typeColors = {
    lost: 'bg-red-100 text-red-800',
    found: 'bg-green-100 text-green-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/item/${item.id}`} className="block h-full">
        <div className="glass-card h-full flex flex-col overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
              <Badge className={`${typeColors[item.type]} uppercase text-xs font-semibold`}>
                {item.type}
              </Badge>
              <Badge className={`${statusColors[item.status]} uppercase text-xs font-semibold`}>
                {item.status}
              </Badge>
            </div>
          </div>
          <div className="p-5 flex-grow flex flex-col">
            <h3 className="text-lg font-semibold mb-2 line-clamp-1">{item.title}</h3>
            <p className="text-foreground/60 text-sm mb-4 line-clamp-2">{item.description}</p>
            <div className="mt-auto space-y-2 text-sm text-foreground/70">
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-primary/70" />
                <span>{item.category}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary/70" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-primary/70" />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ItemCard;
