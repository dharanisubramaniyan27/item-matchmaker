
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { getItemById, getRelatedItems, Item } from '@/utils/mockData';
import { 
  Calendar, 
  MapPin, 
  Tag, 
  MessageSquare, 
  Share2, 
  ArrowLeft,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ItemCard from '@/components/ItemCard';
import AnimatedTransition from '@/components/AnimatedTransition';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import NotFound from './NotFound';

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [relatedItems, setRelatedItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      if (id) {
        const foundItem = getItemById(id);
        if (foundItem) {
          setItem(foundItem);
          setRelatedItems(getRelatedItems(foundItem));
        }
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the message to the backend
    console.log('Contact form submitted:', contactFormData);
    
    // Show success toast
    toast.success('Message sent successfully!', {
      description: 'The item owner will contact you shortly.',
    });
    
    // Close modal and reset form
    setIsContactModalOpen(false);
    setContactFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card animate-pulse p-8">
              <div className="h-6 bg-secondary/70 rounded w-1/4 mb-8"></div>
              <div className="h-80 bg-secondary/50 rounded-2xl mb-8"></div>
              <div className="h-8 bg-secondary/70 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-secondary/50 rounded w-full mb-2"></div>
              <div className="h-4 bg-secondary/50 rounded w-full mb-2"></div>
              <div className="h-4 bg-secondary/50 rounded w-2/3 mb-8"></div>
              <div className="flex space-x-4">
                <div className="h-10 bg-secondary/70 rounded w-32"></div>
                <div className="h-10 bg-secondary/50 rounded w-32"></div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!item) {
    return <NotFound />;
  }

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
    <AnimatedTransition>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to={item.type === 'lost' ? '/lost-items' : '/found-items'} className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to {item.type === 'lost' ? 'Lost' : 'Found'} Items
            </Link>
          </div>

          <motion.div 
            className="glass-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[item.type]} uppercase`}>
                  {item.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status]} uppercase`}>
                  {item.status}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-display font-bold mb-4">{item.title}</h1>
              <p className="text-foreground/70 mb-8">{item.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <div className="text-sm text-foreground/60">Category</div>
                    <div className="font-medium">{item.category}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <div className="text-sm text-foreground/60">Location</div>
                    <div className="font-medium">{item.location}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <div className="text-sm text-foreground/60">Date</div>
                    <div className="font-medium">{new Date(item.date).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="neo-button"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact {item.type === 'lost' ? 'Owner' : 'Finder'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard!');
                  }}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>

              {item.status !== 'resolved' && (
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Important</h4>
                    <p className="text-sm text-yellow-700">
                      This item is {item.status === 'pending' ? 'still pending' : 'being claimed'}. When meeting to exchange items, please do so in a public place and verify the identity of the {item.type === 'lost' ? 'finder' : 'owner'}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {relatedItems.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-display font-bold mb-6">Similar Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedItems.map((relatedItem, index) => (
                  <ItemCard key={relatedItem.id} item={relatedItem} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact {item.type === 'lost' ? 'Owner' : 'Finder'}</DialogTitle>
            <DialogDescription>
              Send a message to the {item.type === 'lost' ? 'person who lost this item' : 'person who found this item'}. Your information will be kept private until you decide to share it.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={contactFormData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={contactFormData.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="message" className="text-right text-sm font-medium pt-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={contactFormData.message}
                  onChange={handleInputChange}
                  className="col-span-3"
                  rows={4}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsContactModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AnimatedTransition>
  );
};

export default ItemDetail;
