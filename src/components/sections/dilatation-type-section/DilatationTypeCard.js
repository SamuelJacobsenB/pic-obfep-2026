import { materialStore, stepsStore } from "../../../store/index.js";
import { DILATATION_TYPES } from "../../../utils/constants.js";
import { html } from "../../../utils/html.js";

class DilatationTypeCard extends HTMLElement {
  index = 1;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    this.unsubscribers = [
      stepsStore.subscribe(() => this.render()),
      materialStore.subscribe(() => this.render()),
    ];
  }

  disconnectedCallback() {
    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
  }

  render() {
    this.shadowRoot.innerHTML = html`
      <style>
        .card-items {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.2rem;

          width: 100%;
        }
      </style>

      <app-card index="${this.index}">
        <section class="card-items">
          ${DILATATION_TYPES.map(
            (dilatationType) => html`
              <dilatation-item-card
                type="${dilatationType}"
              ></dilatation-item-card>
            `,
          ).join("")}
        </section>
      </app-card>
    `;
  }
}

customElements.define("dilatation-type-card", DilatationTypeCard);
