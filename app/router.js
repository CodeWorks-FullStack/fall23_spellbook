import { AboutController } from "./controllers/AboutController.js";
import { DNDSpellsController } from "./controllers/DNDSpellsController.js";
import { HomeController } from "./controllers/HomeController.js";
import { SandboxSpellsController } from "./controllers/SandboxSpellsController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";

/**
 * Register your routes for the application here
 * @type {Route[]}
 */
export const router = [
  {
    path: '',
    controller: [DNDSpellsController, SandboxSpellsController],
    view: null
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  }
]






/**
 * Supporting types for the router
 * NOTE Controllers must be non instantiated 
 * @typedef {{[x:string]:any}} controller
 * @typedef {{path: string, controller?:controller |controller[], view?: string, target?: string}} Route
 */