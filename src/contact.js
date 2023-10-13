import { createComponent } from "../framework";
import { div } from "../framework/element";

const template = () =>
  div`
    <h1>Contact Us</h1>
    <p>We are the Contact page.</p>
  `;

export const Contact = createComponent({ template });
