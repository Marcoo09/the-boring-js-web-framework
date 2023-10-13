import { h } from "snabbdom";

const initialState = {
  template: "",
  on: {}
};

const createReducer = args => (acc, currentString, index) => {
  const currentArg = args[index];

  if (currentArg && currentArg.type === "event") {
    return { ...acc, template: acc.template + currentString + (currentArg.template || "") };
  }

  if (currentArg instanceof Node) {
    return {
      ...acc,
      template: acc.template + currentString + currentArg.outerHTML
    };
  }

  // If it's a custom element, access its template property
  if (typeof currentArg === "object" && currentArg.template) {
    const currentSel = currentArg.template.sel
    const content = currentArg.template.text
    return {
      ...acc,
      template: acc.template + currentString + `<${currentSel}>${content}</${currentSel}>` 
    };
  }

  return {
    ...acc,
    template: acc.template + currentString + (currentArg || "")
  };
};

const createElement = tagName => (strings, ...args) => {
  const { template, on } = strings.reduce(createReducer(args), initialState);
  return {
    type: "element",
    template: h(tagName, { on }, template)
  };
};

const htmlElements = [
  "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo",
  "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup",
  "data", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed", "fieldset",
  "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header",
  "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main",
  "map", "mark", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output",
  "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section",
  "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody",
  "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul",
  "video", "wbr"
];

const elements = {};
for (const tagName of htmlElements) {
  elements[tagName] = createElement(tagName);
}

export const {
  a, abbr, address, area, article, aside, audio, b, base, bdi, bdo, blockquote, body, br, button, canvas, caption, cite, code, col, colgroup, data, datalist, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, head, header, hr, html, i, iframe, img, input, ins, kbd, label, legend, li, link, main, map, mark, meta, meter, nav, noscript, object, ol, optgroup, option, output, p, param, picture, pre, progress, q, rp, rt, ruby, s, samp, script, section, select, small, source, span, strong, style, sub, summary, sup, table, tbody, td, template, textarea, tfoot, th, thead, time, title, tr, track, u, ul, video, wbr
} = elements;