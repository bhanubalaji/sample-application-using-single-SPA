import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

// Create routes based on the layout HTML
const routes = constructRoutes(microfrontendLayout);

// Define applications based on the routes and their names
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

// Create and configure the layout engine
const layoutEngine = constructLayoutEngine({ routes, applications });

// Register each application
applications.forEach(registerApplication);

// Activate the layout engine and start single-spa
layoutEngine.activate();
start();
