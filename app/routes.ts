import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("welcome/index.tsx"),
  route("about", "welcome/about.tsx"),
  route("contact", "welcome/contact.tsx"),
    route("portfolio", "welcome/portfolio.tsx"),
] satisfies RouteConfig;
