export const webPortfolioStats = [
  { value: "120+", label: "Websites Delivered", icon: "Globe" },
  { value: "25+", label: "Industries Served", icon: "Building2" },
  { value: "60+", label: "Ecommerce Launches", icon: "ShoppingCart" },
  { value: "98%", label: "Client Satisfaction", icon: "Star" }
] as const;

export const webPortfolioContact = {
  email: "info@fustionventuresglobal.com",
  phone: "+971 54 276 3828",
  location: "UAE-Based Venture Group"
} as const;

export const webPortfolioCategories = [
  "All Projects",
  "Corporate",
  "Ecommerce",
  "Healthcare",
  "Education",
  "Fashion",
  "Hospitality",
  "Wellness",
  "Printing",
  "Lighting",
  "Clinic",
  "Event"
] as const;

export type WebPortfolioCategory = (typeof webPortfolioCategories)[number];

export const webPortfolioMobileOrder = [
  "Pet Basket Store",
  "Dearelle",
  "Miracle Designs Boutique",
  "Harven LLC",
  "Occazn",
  "Boat Seafood",
  "Dentiva",
  "Hydrelle Skincare",
  "Vlearns Educations",
  "BWMC",
  "Ecom Sigma",
  "Perfect Line",
  "Lumora",
  "Biznecto",
  "Desert GP",
  "Stepvision Hotel Supplies",
  "N Universal Yoga",
  "TAJ",
  "Aqsa Print",
  "Worn Soul"
] as const;

export type WebProject = {
  number: number;
  slug: string;
  title: string;
  url: string;
  category: Exclude<WebPortfolioCategory, "All Projects">;
  industry: string;
  description: string;
  image: string;
  fullImage: string;
  featured?: boolean;
  tags: string[];
  preview: {
    headline: string;
    kicker: string;
    cta: string;
    palette: string;
    accent: string;
    subject: "building" | "seafood" | "pet" | "beauty" | "education" | "medical" | "fashion" | "saas" | "truck" | "lighting" | "business" | "hotel" | "yoga" | "restaurant" | "print";
  };
};

type WebProjectSeed = Omit<WebProject, "number" | "slug" | "fullImage">;

const webProjectSeed: WebProjectSeed[] = [
  {
    title: "Harven LLC",
    url: "https://harvenllc.com",
    category: "Corporate",
    industry: "Construction & Development",
    description: "General contracting and construction management solutions.",
    image: "/images/web-portfolio/harven-llc.webp",
    featured: true,
    tags: ["Corporate", "Construction & Development"],
    preview: {
      headline: "Building Spaces. Elevating Lives.",
      kicker: "Built on trust. Focused on value.",
      cta: "View Case Study",
      palette: "from-[#07111d] via-[#10233a] to-[#070707]",
      accent: "#d6a84f",
      subject: "building"
    }
  },
  {
    title: "Boat Seafood",
    url: "https://boatseafood.com",
    category: "Ecommerce",
    industry: "Seafood & Ecommerce",
    description: "Premium seafood, sustainably sourced and delivered fresh.",
    image: "/images/web-portfolio/boat-seafood.webp",
    featured: true,
    tags: ["Ecommerce", "Seafood"],
    preview: {
      headline: "From Our Boat To Your Table",
      kicker: "Fresh seafood delivered to your doorstep.",
      cta: "View Case Study",
      palette: "from-[#071b2f] via-[#0c3453] to-[#082032]",
      accent: "#f0b35a",
      subject: "seafood"
    }
  },
  {
    title: "Pet Basket Store",
    url: "https://pet-basket-store.vercel.app/",
    category: "Ecommerce",
    industry: "Pet Store",
    description: "A cheerful ecommerce experience for pet essentials.",
    image: "/images/web-portfolio/pet-basket-store.webp",
    tags: ["Ecommerce", "Pet Store"],
    preview: {
      headline: "Everything for Happy Pets",
      kicker: "Shop toys, treats and care.",
      cta: "Shop Now",
      palette: "from-[#e7f8b8] via-[#b9df7b] to-[#f8ffe3]",
      accent: "#5e8f28",
      subject: "pet"
    }
  },
  {
    title: "Dearelle",
    url: "https://dearelle.in",
    category: "Ecommerce",
    industry: "Ecommerce",
    description: "A refined ecommerce experience for modern lifestyle products.",
    image: "/images/web-portfolio/dearelle.webp",
    tags: ["Ecommerce"],
    preview: {
      headline: "Everyday Luxury, Thoughtfully Curated.",
      kicker: "Modern lifestyle ecommerce.",
      cta: "Shop Now",
      palette: "from-[#f4eee8] via-[#d9c5b8] to-[#8b6556]",
      accent: "#d6a84f",
      subject: "beauty"
    }
  },
  {
    title: "Occazn",
    url: "https://occazn.com",
    category: "Event",
    industry: "Event",
    description: "An event platform designed for memorable occasions and easy discovery.",
    image: "/images/web-portfolio/occazn.webp",
    tags: ["Event"],
    preview: {
      headline: "Make Every Occasion Memorable.",
      kicker: "Events, experiences and celebrations.",
      cta: "Explore Events",
      palette: "from-[#150d24] via-[#542f73] to-[#d6a84f]",
      accent: "#d6a84f",
      subject: "business"
    }
  },
  {
    title: "Dentiva",
    url: "https://dentiva.ae",
    category: "Clinic",
    industry: "Clinic",
    description: "A polished dental clinic website focused on trust, care, and appointments.",
    image: "/images/web-portfolio/dentiva.webp",
    tags: ["Clinic", "Healthcare"],
    preview: {
      headline: "Confident Smiles Start Here.",
      kicker: "Modern dental care.",
      cta: "Book Appointment",
      palette: "from-[#edfaff] via-[#b7e9f2] to-[#2c8395]",
      accent: "#53a9b8",
      subject: "medical"
    }
  },
  {
    title: "Hydrelle Skincare",
    url: "https://www.hydrelleskincare.com/",
    category: "Wellness",
    industry: "Beauty",
    description: "A refined skincare storefront with a soft wellness feel.",
    image: "/images/web-portfolio/hydrelle-skincare.webp",
    tags: ["Beauty", "Wellness"],
    preview: {
      headline: "Skincare That Feels Like You",
      kicker: "Hydrating routines, clean glow.",
      cta: "Explore",
      palette: "from-[#fff0ed] via-[#eec6c1] to-[#f9f2ec]",
      accent: "#b66e65",
      subject: "beauty"
    }
  },
  {
    title: "Vlearns Educations",
    url: "https://www.vlearnseducations.com/",
    category: "Education",
    industry: "Education",
    description: "An education website for programs, support, and growth.",
    image: "/images/web-portfolio/vlearns-educations.webp",
    tags: ["Education"],
    preview: {
      headline: "Empowering Minds. Shaping Futures.",
      kicker: "Learning pathways made clear.",
      cta: "Learn More",
      palette: "from-[#e9f4ff] via-[#b7dcff] to-[#f8fbff]",
      accent: "#357cc2",
      subject: "education"
    }
  },
  {
    title: "BWMC",
    url: "https://bwmc.ae",
    category: "Healthcare",
    industry: "Healthcare / Corporate",
    description: "A healthcare presence designed around credibility and care.",
    image: "/images/web-portfolio/bwmc.webp",
    tags: ["Healthcare", "Corporate"],
    preview: {
      headline: "Compassionate Care. Advanced Medicine.",
      kicker: "Trusted medical services.",
      cta: "Learn More",
      palette: "from-[#e5fbff] via-[#58c0dc] to-[#0a6e91]",
      accent: "#1c9cbc",
      subject: "medical"
    }
  },
  {
    title: "Miracle Designs Boutique",
    url: "https://miracledesignsboutique.com/",
    category: "Fashion",
    industry: "Fashion",
    description: "A warm fashion ecommerce site for boutique collections.",
    image: "/images/web-portfolio/miracle-designs-boutique.webp",
    tags: ["Fashion", "Ecommerce"],
    preview: {
      headline: "Elegance That Defines You",
      kicker: "Boutique fashion collections.",
      cta: "Shop Collection",
      palette: "from-[#2c0709] via-[#7e2522] to-[#140406]",
      accent: "#d77b6a",
      subject: "fashion"
    }
  },
  {
    title: "Ecom Sigma",
    url: "https://ecom-pied-sigma.vercel.app/",
    category: "Ecommerce",
    industry: "Ecommerce",
    description: "A SaaS-style ecommerce platform presence with crisp product storytelling.",
    image: "/images/web-portfolio/ecom-sigma.webp",
    tags: ["Ecommerce"],
    preview: {
      headline: "Smarter Insights. Better Growth.",
      kicker: "Dashboards for modern commerce.",
      cta: "Get Started",
      palette: "from-[#082c88] via-[#185ee8] to-[#e8f1ff]",
      accent: "#7db2ff",
      subject: "saas"
    }
  },
  {
    title: "Perfect Line",
    url: "https://perfectline-web.vercel.app/",
    category: "Corporate",
    industry: "Corporate",
    description: "A performance-led corporate site with strong industrial visuals.",
    image: "/images/web-portfolio/perfect-line.webp",
    tags: ["Corporate"],
    preview: {
      headline: "Built for Performance. Driven by Quality.",
      kicker: "Reliable logistics and service.",
      cta: "Learn More",
      palette: "from-[#0a0a0a] via-[#434343] to-[#101010]",
      accent: "#d6a84f",
      subject: "truck"
    }
  },
  {
    title: "Lumora",
    url: "https://lumora-rho-jet.vercel.app/",
    category: "Lighting",
    industry: "Lighting",
    description: "A luxury lighting ecommerce preview with rich product mood.",
    image: "/images/web-portfolio/lumora.webp",
    tags: ["Lighting", "Ecommerce"],
    preview: {
      headline: "Luxury Refined. Light Perfected.",
      kicker: "Signature lighting pieces.",
      cta: "Explore Collection",
      palette: "from-[#180d05] via-[#6a3b13] to-[#070402]",
      accent: "#c8893c",
      subject: "lighting"
    }
  },
  {
    title: "Biznecto",
    url: "https://biznecto.com",
    category: "Corporate",
    industry: "Business",
    description: "A business website built around clarity, connection, and trust.",
    image: "/images/web-portfolio/biznecto.webp",
    tags: ["Corporate", "Business"],
    preview: {
      headline: "Connect Better. Grow Faster.",
      kicker: "Business networks with momentum.",
      cta: "Discover",
      palette: "from-[#061a26] via-[#177b8b] to-[#dff8ef]",
      accent: "#39c0aa",
      subject: "business"
    }
  },
  {
    title: "Desert GP",
    url: "https://desertgp.com",
    category: "Healthcare",
    industry: "Healthcare / Medical",
    description: "A medical site designed to communicate care and access.",
    image: "/images/web-portfolio/desert-gp.webp",
    tags: ["Healthcare", "Medical"],
    preview: {
      headline: "Care Built Around Your Day.",
      kicker: "Primary medical support.",
      cta: "Book Visit",
      palette: "from-[#f4efe4] via-[#d5b880] to-[#6d4f22]",
      accent: "#b8914b",
      subject: "medical"
    }
  },
  {
    title: "Stepvision Hotel Supplies",
    url: "https://stepvisionhotelsupplies.com",
    category: "Hospitality",
    industry: "Hospitality",
    description: "A hospitality supply site with product-forward presentation.",
    image: "/images/web-portfolio/stepvision-hotel-supplies.webp",
    tags: ["Hospitality"],
    preview: {
      headline: "Designed for Comfort. Made for Memories.",
      kicker: "Hospitality supplies that last.",
      cta: "Explore Products",
      palette: "from-[#15110d] via-[#514131] to-[#0a0908]",
      accent: "#b98b52",
      subject: "hotel"
    }
  },
  {
    title: "N Universal Yoga",
    url: "https://nuniversalyoga.ae",
    category: "Wellness",
    industry: "Wellness",
    description: "A calm wellness website for yoga programs and practice.",
    image: "/images/web-portfolio/n-universal-yoga.webp",
    tags: ["Wellness"],
    preview: {
      headline: "Balance Your Body. Elevate Your Mind.",
      kicker: "Yoga and wellness practice.",
      cta: "Join Now",
      palette: "from-[#ebe6d8] via-[#c6b99f] to-[#f8f4e8]",
      accent: "#837356",
      subject: "yoga"
    }
  },
  {
    title: "TAJ",
    url: "https://taj-xi.vercel.app/",
    category: "Hospitality",
    industry: "Restaurant",
    description: "A restaurant website with rich hospitality cues and menu-led navigation.",
    image: "/images/web-portfolio/taj.webp",
    tags: ["Hospitality", "Restaurant"],
    preview: {
      headline: "A Table Set for Celebration.",
      kicker: "Restaurant dining experience.",
      cta: "Reserve",
      palette: "from-[#210907] via-[#9a3d19] to-[#090303]",
      accent: "#e4a15b",
      subject: "restaurant"
    }
  },
  {
    title: "Aqsa Print",
    url: "https://aqsaprint.com",
    category: "Printing",
    industry: "Printing",
    description: "A bold print website focused on brand color and fast service discovery.",
    image: "/images/web-portfolio/aqsa-print.webp",
    tags: ["Printing"],
    preview: {
      headline: "Printing That Speaks Your Brand",
      kicker: "Creative print production.",
      cta: "Shop Now",
      palette: "from-[#ff6b00] via-[#ff9d00] to-[#ffdb3f]",
      accent: "#ffef78",
      subject: "print"
    }
  },
  {
    title: "Worn Soul",
    url: "https://worn-soul.vercel.app/",
    category: "Fashion",
    industry: "Fashion / Ecommerce",
    description: "A fashion ecommerce concept with editorial product energy.",
    image: "/images/web-portfolio/worn-soul.webp",
    tags: ["Fashion", "Ecommerce"],
    preview: {
      headline: "Streetwear With a Story.",
      kicker: "Curated drops and essentials.",
      cta: "Shop Drop",
      palette: "from-[#111111] via-[#b5a78a] to-[#f6efe1]",
      accent: "#cab27b",
      subject: "fashion"
    }
  }
];

const projectOrder = new Map<string, number>(
  webPortfolioMobileOrder.map((title, index) => [title, index])
);

export const webProjects: WebProject[] = webProjectSeed
  .map((project, index) => {
    const slug = project.image.split("/").pop()?.replace(/\.webp$/, "") ?? `project-${index + 1}`;
    const orderIndex = projectOrder.get(project.title) ?? index;

    return {
      ...project,
      number: orderIndex + 1,
      slug,
      image: `/images/web-portfolio/cards/${slug}.webp`,
      fullImage: `/images/web-portfolio/full/${slug}.webp`
    };
  })
  .sort((first, second) => first.number - second.number);
