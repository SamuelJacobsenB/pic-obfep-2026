import { currentStepStore, stepsStore } from "../store/index.js";
import { ITEM_INFO } from "../utils/constants.js";
import { html } from "../utils/html.js";

class Card extends HTMLElement {
  static get observedAttributes() {
    return ["index"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    this.unsubscribers = [
      currentStepStore.subscribe(() => this.render()),
      stepsStore.subscribe(() => this.render()),
    ];
  }

  disconnectedCallback() {
    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
  }

  render() {
    const index = Number(this.getAttribute("index"));
    const { id, title, description, icon, color } = ITEM_INFO[index];

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

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          min-height: calc(100vh - 75px);
          padding: 48px 24px;
          animation: fadeIn 0.25s ease;
        }

        .card-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          text-align: center;
          max-width: 700px;
        }

        .card-icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: ${color};
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.12),
            0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .card-icon {
          width: 42px;
          height: 42px;
          background-color: white;
          mask: url("${icon}") center / contain no-repeat;
          -webkit-mask: url("${icon}") center / contain no-repeat;
        }

        .card-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          color: var(--text-primary);
          margin: 0;
        }

        .card-description {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 600px;
          margin: 0;
        }

        .card-content {
          width: 100%;
          max-width: 1000px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 750px) {
          .card {
            min-height: calc(100vh - 180px);
            padding: 32px 16px;
            gap: 24px;
          }

          .card-icon-wrapper {
            width: 72px;
            height: 72px;
          }

          .card-icon {
            width: 34px;
            height: 34px;
          }

          .card-description {
            font-size: 0.95rem;
          }
        }
      </style>

      <article class="card" id="${id}">
        <header class="card-header">
          <div class="card-icon-wrapper">
            <span class="card-icon"></span>
          </div>

          <div>
            <h2 class="card-title">${title}</h2>
            <p class="card-description">${description}</p>
          </div>
        </header>

        <section class="card-content">
          <slot></slot>
        </section>
      </article>
    `;
  }
}

customElements.define("app-card", Card);
