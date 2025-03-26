
export interface Item {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  image: string;
  status: 'pending' | 'claimed' | 'resolved';
  contactEmail?: string;
  contactPhone?: string;
}

export const categories = [
  'Electronics',
  'Clothing',
  'Accessories',
  'Books',
  'Keys',
  'ID Cards',
  'Wallets',
  'Bags',
  'Others'
];

export const locations = [
  'Main Building',
  'Library',
  'Student Center',
  'Cafeteria',
  'Gym',
  'Dormitory A',
  'Dormitory B',
  'Science Building',
  'Arts Building',
  'Parking Lot'
];

export const mockItems: Item[] = [
  {
    id: '1',
    type: 'lost',
    title: 'Black MacBook Pro 16"',
    description: 'Lost my MacBook Pro in the library. It has a sticker of a mountain on the back.',
    category: 'Electronics',
    location: 'Library',
    date: '2023-10-15',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: 'pending',
    contactEmail: 'student1@abc.edu'
  },
  {
    id: '2',
    type: 'found',
    title: 'Silver Apple AirPods Pro',
    description: 'Found AirPods Pro in a white case near the Main Building entrance.',
    category: 'Electronics',
    location: 'Main Building',
    date: '2023-10-17',
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: 'pending',
    contactEmail: 'student2@abc.edu'
  },
  {
    id: '3',
    type: 'lost',
    title: 'Blue North Face Backpack',
    description: 'Lost my blue North Face backpack with all my textbooks in the cafeteria.',
    category: 'Bags',
    location: 'Cafeteria',
    date: '2023-10-16',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: 'pending',
    contactEmail: 'student3@abc.edu'
  },
  {
    id: '4',
    type: 'found',
    title: 'Student ID Card',
    description: 'Found a student ID card for Sarah Johnson near the Science Building.',
    category: 'ID Cards',
    location: 'Science Building',
    date: '2023-10-18',
    image: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: 'pending',
    contactEmail: 'student4@abc.edu'
  },
  {
    id: '5',
    type: 'lost',
    title: 'Red Textbook - Introduction to Psychology',
    description: 'Lost my Psychology textbook somewhere in the library.',
    category: 'Books',
    location: 'Library',
    date: '2023-10-14',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: 'pending',
    contactEmail: 'student5@abc.edu'
  },
  {
    id: '6',
    type: 'found',
    title: 'Black Leather Wallet',
    description: 'Found a black leather wallet with some cash and cards near the gym entrance.',
    category: 'Wallets',
    location: 'Gym',
    date: '2023-10-19',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: 'pending',
    contactEmail: 'student6@abc.edu'
  },
  {
    id: '7',
    type: 'lost',
    title: 'Car Keys with Blue Keychain',
    description: 'Lost my car keys with a distinctive blue keychain in the parking lot.',
    category: 'Keys',
    location: 'Parking Lot',
    date: '2023-10-15',
    image: 'https://images.unsplash.com/photo-1514316703755-dca7d7d9d882?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: 'claimed',
    contactEmail: 'student7@abc.edu'
  },
  {
    id: '8',
    type: 'found',
    title: 'Prescription Glasses',
    description: 'Found prescription glasses with tortoise shell frames in the Arts Building.',
    category: 'Accessories',
    location: 'Arts Building',
    date: '2023-10-17',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: 'pending',
    contactEmail: 'student8@abc.edu'
  }
];

export const getLostItems = () => {
  return mockItems.filter(item => item.type === 'lost');
};

export const getFoundItems = () => {
  return mockItems.filter(item => item.type === 'found');
};

export const getItemById = (id: string) => {
  return mockItems.find(item => item.id === id);
};

export const getRelatedItems = (item: Item, limit = 3) => {
  return mockItems
    .filter(i => i.id !== item.id && i.category === item.category)
    .slice(0, limit);
};
