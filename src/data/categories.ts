export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: "courses",
    name: "Courses",
    description: "Comprehensive learning programs for developers",
    icon: "GraduationCap",
  },
  {
    id: "digital-tools",
    name: "Digital Tools",
    description: "Professional developer tools and utilities",
    icon: "Wrench",
  },
  {
    id: "premium-access",
    name: "Premium Access",
    description: "Exclusive platform and community access",
    icon: "Crown",
  },
  {
    id: "certification",
    name: "Certification",
    description: "Industry-recognized certifications",
    icon: "Award",
  },
];
