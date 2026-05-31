import { currentStepStore } from "../store/index.js";
import { html } from "../utils/html.js";

class StepItem extends HTMLElement {
  static get observedAttributes() {
    return ["id", "href", "color", "icon", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();

    this.unsubscribe = currentStepStore.subscribe(() => {
      this.render();
    });
  }

  disconnectedCallback() {
    this.unsubscribe();
  }

  render() {
    const href = this.getAttribute("href");
    const color = this.getAttribute("color");
    const icon = this.getAttribute("icon");

    const active = currentStepStore.value === Number(this.getAttribute("id"));
    const disabled = this.hasAttribute("disabled");

    this.shadowRoot.innerHTML = html`
      <style>
        :host {
          display: block;
        }

        :host([disabled]) {
          display: none;
        }

        .step-item {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 55px;
          height: 55px;

          border-radius: 50%;
          text-decoration: none;

          background-color: ${active
            ? color
            : "var(--background-card, #ffffff)"};

          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.1),
            0 4px 12px rgba(0, 0, 0, 0.06);

          transition:
            background-color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .step-item:hover {
          background-color: ${color};

          transform: translateY(-3px);

          box-shadow:
            0 6px 16px rgba(0, 0, 0, 0.12),
            0 10px 24px rgba(0, 0, 0, 0.08);
        }

        .step-item.active {
          background-color: ${color};
          outline: 2px solid ${color};
          outline-offset: 4px;
        }

        .step-icon {
          width: 22px;
          height: 22px;
          background-color: ${active ? "white" : color};

          transition:
            background-color 0.2s ease,
            transform 0.2s ease;

          mask: url("${icon}") center / contain no-repeat;
          -webkit-mask: url("${icon}") center / contain no-repeat;
        }

        .step-item:hover .step-icon,
        .step-item.active .step-icon {
          background-color: white;
        }

        @media (max-width: 750px) {
          .step-item {
            width: 45px;
            height: 45px;
          }
        }
      </style>

      <a
        href=${href}
        class="step-item ${active ? "active" : ""}"
        aria-disabled="${disabled}"
      >
        <span class="step-icon"></span>
      </a>
    `;

    const stepItem = this.shadowRoot.querySelector("a");
    stepItem.addEventListener("click", (e) => {
      e.preventDefault();
      currentStepStore.value = Number(this.getAttribute("id"));
    });
  }
}

customElements.define("app-step-item", StepItem);
