import { NavItem } from "@/types/nav";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    twitter: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Text2Diagram: Create schematic architecture diagrams, UML, flowcharts, Gnatt charts and many more with natural language",
  description: "Enter your text in natural language or provide your code for seamless diagram creation",
  mainNav: [
    // {
    //   title: "Credentials",
    //   href: "/credentials",
    // },
  ],
  links: {
    twitter: "https://twitter.com/bt_veeru",
    github: "https://github.com/bhaskatripathi/Text2Diagram",
  },
};
