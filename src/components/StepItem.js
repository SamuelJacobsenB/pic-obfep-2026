import { html } from "../utils/html.js";

class StepItem extends HTMLElement {
  static get observedAttributes() {
    return ["href", "background-color", "color", "icon", "active", "disabled"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = html`
      <style>
        .step-item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          padding: 0.5rem;
          transition: background-color 0.3s ease;
          cursor: pointer;

          background-color: ${this.getAttribute("background-color") ||
          "transparent"};
        }

        .step-item a {
          display: block;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: var(--primary);
        }
      </style>

      <a class="step-item">
        <div href=${this.getAttribute("href")}></div>
      </a>
    `;
  }
}

customElements.define("app-step-item", StepItem);
