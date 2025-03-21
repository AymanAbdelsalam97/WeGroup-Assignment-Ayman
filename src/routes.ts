import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "App.tsx"),

  route("users/:id", "pages/UserDetailsPage.tsx"),

  route("*?", "catchall.tsx"),
] satisfies RouteConfig;
