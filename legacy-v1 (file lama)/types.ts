export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  link: string;
  image: string;
}