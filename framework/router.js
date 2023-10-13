import {patch} from '../framework'

export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.defaultRoute = null;
    this.routeNotFound = null;

    this.appContainer = document.getElementById("app"); // HTML container where content will be rendered

    window.addEventListener("hashchange", this.route.bind(this));
  }

  addRoute(path, component) {
    this.routes[path] = component;
  }

  setDefaultRoute(path) {
    this.defaultRoute = path;
  }

  setNotFoundRoute(component) {
    this.routeNotFound = component;
  }

  route() {
    const path = window.location.pathname;
    if (this.routes[path]) {
      this.currentRoute = path;
      this.render(this.routes[path]);
    } else if (this.routeNotFound) {
      this.render(this.routeNotFound);
    } else if (this.defaultRoute) {
      this.navigateTo(this.defaultRoute);
    }
  }

  navigateTo(path) {
    window.location.hash = path;
  }

  render(component) {
    this.appContainer.innerHTML = '';
    if (component) {
      // Check if the component is a valid DOM node or can be converted to one
      if ((component instanceof Node) || (component instanceof HTMLElement) || (typeof component === 'function')) {
        patch(this.appContainer, component().template);
      } else if (typeof component === 'string') {
        // If it's a string, create a temporary element to append it
        const tempElement = document.createElement('div');
        tempElement.innerHTML = component;
        this.appContainer.appendChild(tempElement.firstElementChild);
      } else {
        console.error('Component is not a valid DOM node or cannot be converted.');
      }
    } else {
      console.error('Component is null or undefined.');
    }
  }

  start() {
    this.route();
  }

  currentRouteComponent() {
    return this.routes[this.currentRoute] || null;
  }

}
