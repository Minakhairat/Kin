export type Language = 'ar' | 'en';

export type ServiceCategory = 'podcasts' | 'reels' | 'commercials';

export interface PricingPackage {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  period: string;
  unit: string;
  recommended?: boolean;
  highlight?: string;
  features: string[];
  deliverables: string;
  sessionTime?: string;
  revisions?: string;
  turnaround?: string;
  cameras?: string;
  sound?: string;
  clipsCount?: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'podcasts' | 'reels' | 'commercials';
  client: string;
  duration: string;
  aspectRatio: '16:9' | '9:16';
  coverImage: string;
  summary: string;
  specs: {
    cameras: string;
    sound: string;
    deliverables: string;
    colorGrade: string;
  };
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email?: string;
  service: string;
  packageId: string;
  preferredDate: string;
  addons: string[];
  notes?: string;
}
