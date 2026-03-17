export interface ContactSubmission {
  id: string | number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string | number;
  name: string;
  logo: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string | number;
  title: string;
  category: string;
  description?: string;
  image: string;
  bg_color: string;
  link?: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string | number;
  service_id: number;
  item_text: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string | number;
  title: string;
  description: string;
  items?: ServiceItem[];
  display_order: number;
  icon?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string | number;
  quote: string;
  author: string;
  title: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableAction {
  label: string;
  onClick: (id: string) => void;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}
