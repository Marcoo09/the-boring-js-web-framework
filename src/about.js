import { createComponent } from "../framework";
import { div, p, h1, a } from "../framework/element";

const template = () =>
  div`
    ${h1`Header 1`}
    ${p`We are the About page.`}
    ${p`This is a nested paragraph.`}
    ${a`Click me`}
  `;

export const About = createComponent({ template });
