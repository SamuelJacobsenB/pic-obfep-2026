import { html } from "../../lib/html.js";

import styles from "./styles.css?inline";

class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectCallback() {
    this.innerHTML = html`
      <style>
        ${styles}
      </style>

      <header class="header">
        <h1>PIC OBFEP</h1>
      </header>
    `;
  }
}

customElements.define("app-header", Header);
