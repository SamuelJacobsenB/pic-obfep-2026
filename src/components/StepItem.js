import { currentStepStore, stepsStore } from "../store/index.js";
import { ITEM_INFO } from "../utils/constants.js";
import { html } from "../utils/html.js";

class StepItem extends HTMLElement {
  static get observedAttributes() {
    return ["index"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.unsubscribers = [];
  }

  connectedCallback() {
    this.render();

    this.unsubscribers.push(
      currentStepStore.subscribe(() => this.render()),
      stepsStore.subscribe(() => this.render()),
    );
  }

  attributeChangedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
  }

  render() {
    const index = Number(this.getAttribute("index"));
    const { href, icon, color } = ITEM_INFO[index];

    const active = currentStepStore.value === index;
    const disabled = index > stepsStore.value;

    if (disabled) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }

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

      <a href=${href} class="step-item ${active ? "active" : ""}">
        <span class="step-icon"></span>
      </a>
    `;

    const stepItem = this.shadowRoot.querySelector("a");
    stepItem.addEventListener("click", () => {
      currentStepStore.value = index;
    });
  }
}

customElements.define("app-step-item", StepItem);
