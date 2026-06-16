export interface Project {
  id: string;
  title: string;
  period: string;
  role: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyLogoUrl?: string; // or general initials
  period: string;
  location: string;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
}

export interface SocialLink {
  platform: 'GitHub' | 'LinkedIn' | 'X' | 'Instagram' | 'YouTube' | 'Threads' | 'Email';
  url: string;
}

export interface SectionVisibility {
  intro: boolean;
  projects: boolean;
  experience: boolean;
  education: boolean;
  certifications: boolean;
  testimonials: boolean;
  contact: boolean;
}

