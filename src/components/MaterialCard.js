import { stepsStore } from "../store/index.js";
import { ITEM_INFO } from "../utils/constants.js";
import { html } from "../utils/html.js";

class MaterialCard extends HTMLElement {
  index = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    this.unsubscriber = stepsStore.subscribe(() => this.render());
  }

  disconnectedCallback() {
    this.unsubscriber();
  }

  render() {
    const { id, title, description, icon, color } = ITEM_INFO[this.index];

    this.shadowRoot.innerHTML = html`
      <style></style>

      <app-card index="${this.index}">
        <p>Hello, World!</p>
      </app-card>
    `;
  }
}

customElements.define("material-card", MaterialCard);
