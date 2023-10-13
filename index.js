import { init } from "./framework"; 
import { Router } from "./framework/router";

import { User } from "./src/user";
import { About } from "./src/about";
import { Contact } from "./src/contact";

const router = new Router();

router.addRoute("/", () => {
  return User({ firstName: "Thomas", lastName: "Burleson" }); // Pass parameters here
});

router.addRoute("/about", About);
router.addRoute("/contact", Contact);

router.setDefaultRoute("/");
router.setNotFoundRoute(() => {
  return document.createTextNode("Not Found");
});

router.start();

init("#app", router.currentRouteComponent());
