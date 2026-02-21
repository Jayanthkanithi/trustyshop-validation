import productCourseImg from "@/assets/product-course.jpg";
import productToolsImg from "@/assets/product-tools.jpg";
import productPremiumImg from "@/assets/product-premium.jpg";
import productCertificationImg from "@/assets/product-certification.jpg";
import productWorkshopImg from "@/assets/product-workshop.jpg";
import productApiImg from "@/assets/product-api.jpg";

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  categoryId: string;
  images: string[];
  stock: number;
  features: string[];
}

export const products: Product[] = [
  {
    id: "fullstack-masterclass",
    name: "Full-Stack Masterclass",
    shortDescription: "Master React, Node.js, and databases with 60+ hours of content.",
    fullDescription:
      "A comprehensive full-stack development course covering React, Node.js, PostgreSQL, authentication, deployment, and security best practices. Includes 60+ hours of HD video, 15 hands-on projects, downloadable resources, and lifetime access with free updates.",
    price: 89.99,
    categoryId: "courses",
    images: [productCourseImg, productWorkshopImg, productToolsImg],
    stock: 50,
    features: [
      "60+ hours of HD video content",
      "15 hands-on real-world projects",
      "Lifetime access with free updates",
      "Certificate of completion",
      "Private Discord community",
    ],
  },
  {
    id: "security-bootcamp",
    name: "Security Bootcamp",
    shortDescription: "Learn web security fundamentals and ethical hacking techniques.",
    fullDescription:
      "Deep dive into web application security — from OWASP Top 10 vulnerabilities to penetration testing. Learn how attackers exploit web apps and how to defend against them. Includes hands-on labs and a CTF challenge.",
    price: 69.99,
    categoryId: "courses",
    images: [productWorkshopImg, productCourseImg, productApiImg],
    stock: 35,
    features: [
      "40+ hours of security content",
      "OWASP Top 10 deep dives",
      "Hands-on penetration testing labs",
      "Capture-the-flag challenges",
      "Security audit checklist",
    ],
  },
  {
    id: "devtools-pro",
    name: "DevTools Pro Suite",
    shortDescription: "Professional developer toolkit with 80+ templates and utilities.",
    fullDescription:
      "A curated collection of production-ready templates, boilerplate code, CLI tools, VS Code extensions, and utility libraries. Includes React component library, API starter kits, and deployment scripts. Regularly updated.",
    price: 39.99,
    categoryId: "digital-tools",
    images: [productToolsImg, productApiImg, productPremiumImg],
    stock: 100,
    features: [
      "80+ starter templates",
      "CLI productivity tools",
      "VS Code extension pack",
      "API starter kits",
      "Monthly updates",
    ],
  },
  {
    id: "api-gateway-toolkit",
    name: "API Gateway Toolkit",
    shortDescription: "Build, test, and deploy APIs with enterprise-grade tools.",
    fullDescription:
      "Complete API development toolkit including a visual API builder, automated testing suite, mock server, documentation generator, and monitoring dashboard. Supports REST and GraphQL.",
    price: 59.99,
    categoryId: "digital-tools",
    images: [productApiImg, productToolsImg, productPremiumImg],
    stock: 75,
    features: [
      "Visual API builder",
      "Automated test suite",
      "Mock server included",
      "Auto-generated documentation",
      "Real-time monitoring",
    ],
  },
  {
    id: "cloud-platform-annual",
    name: "Cloud Platform — Annual",
    shortDescription: "Full access to our cloud development platform for one year.",
    fullDescription:
      "Get unlimited access to our cloud development environment with built-in CI/CD, staging environments, team collaboration tools, and 24/7 support. Includes 100GB storage and custom domain support.",
    price: 149.99,
    categoryId: "premium-access",
    images: [productPremiumImg, productApiImg, productToolsImg],
    stock: 200,
    features: [
      "Unlimited cloud environments",
      "Built-in CI/CD pipelines",
      "100GB cloud storage",
      "Custom domain support",
      "24/7 priority support",
    ],
  },
  {
    id: "community-pro",
    name: "Community Pro Membership",
    shortDescription: "Join an exclusive network of senior developers and mentors.",
    fullDescription:
      "Access our premium developer community with weekly AMAs from industry leaders, code review sessions, job board access, and private networking channels. Perfect for career growth.",
    price: 29.99,
    categoryId: "premium-access",
    images: [productWorkshopImg, productPremiumImg, productCourseImg],
    stock: 500,
    features: [
      "Weekly expert AMAs",
      "Code review sessions",
      "Exclusive job board",
      "Private networking channels",
      "Annual summit access",
    ],
  },
  {
    id: "frontend-certification",
    name: "Frontend Developer Cert",
    shortDescription: "Earn an industry-recognized frontend development certification.",
    fullDescription:
      "Prepare for and earn a recognized frontend developer certification. Includes comprehensive study guides, 5 practice exams, a proctored final examination, and a verifiable digital badge. Recognized by 500+ companies.",
    price: 99.99,
    categoryId: "certification",
    images: [productCertificationImg, productCourseImg, productWorkshopImg],
    stock: 40,
    features: [
      "Comprehensive study guides",
      "5 practice exams",
      "Proctored final examination",
      "Verifiable digital badge",
      "Recognized by 500+ companies",
    ],
  },
  {
    id: "cloud-architect-cert",
    name: "Cloud Architect Cert",
    shortDescription: "Validate your cloud architecture skills with a professional cert.",
    fullDescription:
      "The definitive cloud architecture certification covering AWS, Azure, and GCP. Includes study materials, hands-on labs, practice exams, and a proctored certification exam. Highly valued by enterprise employers.",
    price: 129.99,
    categoryId: "certification",
    images: [productCertificationImg, productPremiumImg, productApiImg],
    stock: 25,
    features: [
      "Multi-cloud coverage (AWS/Azure/GCP)",
      "Hands-on architecture labs",
      "3 full practice exams",
      "Proctored certification exam",
      "Enterprise-recognized credential",
    ],
  },
];
