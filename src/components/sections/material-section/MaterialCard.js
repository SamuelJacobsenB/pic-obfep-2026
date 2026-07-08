import { materialStore, stepsStore } from "../../../store/index.js";
import { ITEM_INFO, MATERIALS } from "../../../utils/constants.js";
import { html } from "../../../utils/html.js";

class MaterialCard extends HTMLElement {
  index = 0;

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
    const { id, title, description, icon, color } = ITEM_INFO[this.index];

    this.shadowRoot.innerHTML = html`
      <style>
        .card-items {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 2rem;
          width: 100%;
        }
      </style>

      <app-card index="${this.index}">
        <section class="card-items">
          ${Object.values(MATERIALS)
            .map(
              (material) => html`
                <material-item-card
                  id="${material.id}"
                  selected="${materialStore.value?.id === material.id}"
                ></material-item-card>
              `,
            )
            .join("")}
        </section>
      </app-card>
    `;
  }
}

customElements.define("material-card", MaterialCard);
