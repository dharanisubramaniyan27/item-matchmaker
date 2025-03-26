
import { supabase } from "@/integrations/supabase/client";
import { Item } from "./mockData";

export interface SupabaseItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  image_url: string | null;
  status: 'pending' | 'claimed' | 'resolved';
  contact_email: string;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

// Convert Supabase item to our application Item format
export const mapSupabaseItemToItem = (item: SupabaseItem): Item => {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    description: item.description,
    category: item.category,
    location: item.location,
    date: item.date,
    image: item.image_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: item.status,
    contactEmail: item.contact_email,
    contactPhone: item.contact_phone || undefined
  };
};

export const getLostItemsFromSupabase = async (): Promise<Item[]> => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('type', 'lost')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching lost items:', error);
    return [];
  }

  return (data as SupabaseItem[]).map(mapSupabaseItemToItem);
};

export const getFoundItemsFromSupabase = async (): Promise<Item[]> => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('type', 'found')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching found items:', error);
    return [];
  }

  return (data as SupabaseItem[]).map(mapSupabaseItemToItem);
};

export const getItemByIdFromSupabase = async (id: string): Promise<Item | null> => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching item by ID:', error);
    return null;
  }

  return mapSupabaseItemToItem(data as SupabaseItem);
};

export const getRelatedItemsFromSupabase = async (item: Item, limit = 3): Promise<Item[]> => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('category', item.category)
    .neq('id', item.id)
    .limit(limit);

  if (error) {
    console.error('Error fetching related items:', error);
    return [];
  }

  return (data as SupabaseItem[]).map(mapSupabaseItemToItem);
};

export const submitItemToSupabase = async (
  formData: {
    type: 'lost' | 'found';
    title: string;
    description: string;
    category: string;
    location: string;
    date: Date;
    contactEmail: string;
    contactPhone?: string;
  },
  imageFile: File | null
): Promise<{ success: boolean; error?: string; item?: Item }> => {
  try {
    let imageUrl = null;

    // If an image was provided, upload it to storage
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${formData.type}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('item-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return { success: false, error: 'Failed to upload image.' };
      }

      // Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('item-images')
        .getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    // Insert the item into the database
    const { data, error } = await supabase
      .from('items')
      .insert([
        {
          type: formData.type,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          location: formData.location,
          date: formData.date.toISOString().split('T')[0],
          image_url: imageUrl,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone || null,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error submitting item:', error);
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      item: mapSupabaseItemToItem(data as SupabaseItem) 
    };
  } catch (err) {
    const error = err as Error;
    console.error('Error in submitItemToSupabase:', error);
    return { success: false, error: error.message };
  }
};
