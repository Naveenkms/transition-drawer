import {
  Home,
  Building2,
  BookText,
  LifeBuoy,
  Briefcase,
  Rocket,
} from "lucide-react";

import { Button } from "./ui/button";
import { NavItem, NestedDrawer } from "./ui/nested-drawer";

export function NestedDrawerDemo() {
  const data: NavItem[] = [
    {
      id: "home",
      title: "Home",
      description: "Welcome to our comprehensive platform",
      icon: <Home className="h-4 w-4" />,
      onSelect: () => console.log("[v0] Home selected"),
    },
    {
      id: "products",
      title: "Products & Services",
      description: "Explore our comprehensive offerings",
      icon: <Briefcase className="h-4 w-4" />,
      children: [
        {
          id: "1",
          title: "New Arrivals",
          description: "Latest releases and features",
          icon: <Rocket className="h-4 w-4" />,
          onSelect: () => console.log("[v0] New Arrivals"),
        },
        {
          id: "2",
          title: "Full Catalog",
          description: "All products by category",
          onSelect: () => console.log("[v0] Full Catalog"),
          children: [
            {
              id: "health",
              title: "Healthcare",
              description: "Clinics, hospitals, labs",
                    icon: <Briefcase className="h-4 w-4" />,

            },
          ],
        },
      ],
    },
    {
      id: "industry",
      title: "Industry Solutions",
      description: "Specialized solutions for different industries",
      icon: <Building2 className="h-4 w-4" />,
      children: [
        {
          id: "health",
          title: "Healthcare",
          description: "Clinics, hospitals, labs",
        },
        {
          id: "finance",
          title: "Financial Services",
          description: "Banks, fintech, insurance",
        },
        {
          id: "manufacturing",
          title: "Manufacturing",
          description: "Factory and logistics",
        },
      ],
    },
    {
      id: "company",
      title: "Company",
      description: "Learn about our organization and culture",
      icon: <Building2 className="h-4 w-4" />,
      children: [
        {
          id: "about",
          title: "About Us",
          description: "Mission, values, and team",
        },
        {
          id: "careers",
          title: "Careers",
          description: "Open roles and internships",
        },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      description: "Knowledge base, tools, and learning materials",
      icon: <BookText className="h-4 w-4" />,
      children: [
        {
          id: "docs",
          title: "Documentation",
          description: "APIs, guides, and SDKs",
        },
        { id: "blog", title: "Blog", description: "News and insights" },
      ],
    },
    {
      id: "support",
      title: "Support",
      description: "Get help and support when you need it",
      icon: <LifeBuoy className="h-4 w-4" />,
      onSelect: () => console.log("[v0] Support selected"),
    },
  ];

  return (
    <NestedDrawer
      items={data}
      title="Browse"
      description="Pick a section to explore"
      trigger={<Button>Open Menu</Button>}
    />
  );
}
