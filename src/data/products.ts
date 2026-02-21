export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  icon: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: "premium-course",
    name: "Premium Course",
    shortDescription: "Master full-stack development with 40+ hours of content.",
    fullDescription:
      "A comprehensive full-stack development course covering React, Node.js, databases, deployment, and security best practices. Includes 40+ hours of video, hands-on projects, and lifetime access.",
    price: 79.99,
    icon: "GraduationCap",
    features: [
      "40+ hours of video content",
      "12 hands-on projects",
      "Lifetime access",
      "Certificate of completion",
    ],
  },
  {
    id: "workshop-pass",
    name: "Workshop Pass",
    shortDescription: "Live interactive workshops with industry experts.",
    fullDescription:
      "Get access to monthly live workshops led by senior engineers. Topics range from system design and security to performance optimization. Includes Q&A sessions and workshop recordings.",
    price: 49.99,
    icon: "Users",
    features: [
      "Monthly live sessions",
      "Expert-led workshops",
      "Recording access",
      "Community Q&A",
    ],
  },
  {
    id: "toolkit-access",
    name: "Toolkit Access",
    shortDescription: "Professional developer toolkit with templates and utilities.",
    fullDescription:
      "A curated collection of production-ready templates, boilerplate code, CLI tools, and utility libraries. Regularly updated with new tools and maintained by the community.",
    price: 29.99,
    icon: "Wrench",
    features: [
      "50+ starter templates",
      "CLI utilities",
      "Regular updates",
      "Community support",
    ],
  },
  {
    id: "certification-package",
    name: "Certification Package",
    shortDescription: "Validate your skills with an industry-recognized certification.",
    fullDescription:
      "Prepare for and earn a recognized developer certification. Includes study guides, practice exams, a proctored final exam, and a verifiable digital badge upon passing.",
    price: 99.99,
    icon: "Award",
    features: [
      "Study guides & materials",
      "3 practice exams",
      "Proctored final exam",
      "Digital badge & certificate",
    ],
  },
];
