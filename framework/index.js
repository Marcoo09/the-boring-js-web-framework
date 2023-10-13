import {
    init as snabbdomInit,
    eventListenersModule,
    classModule,
    propsModule,
    styleModule
} from "snabbdom";

export const patch = snabbdomInit([
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule, // attaches event listeners
]);

export const init = (selector, component) => {
  const app = document.querySelector(selector);
  patch(app, component.template);
};

let state = {};

export const createComponent = ({
    template,
    methods = {},
    initialState = {}
  }) => {
    state = initialState;
    let previous;
    
    const mappedMethods = props =>
    Object.keys(methods).reduce(
      (acc, key) => ({
        ...acc,
        [key]: (...args) => {
          state = methods[key](state, ...args);
          const nextNode = template({
            ...props,
            ...state,
            methods: mappedMethods(props)
          });
          patch(previous.template, nextNode.template);
          previous = nextNode; 
          return state;
        }
      }),
      {}
      );
      
    return props => {
      previous = template({ ...props, ...state, methods: mappedMethods(props) });
      return previous;
    };
  };

