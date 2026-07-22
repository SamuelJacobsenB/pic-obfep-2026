import { materialStore, stepsStore } from "../../../store/index.js";
import { MATERIALS } from "../../../utils/constants.js";
import { html } from "../../../utils/html.js";

const MATERIALS_BY_ID = Object.fromEntries(
  Object.values(MATERIALS).map((material) => [material.id, material]),
);

class MaterialItemCard extends HTMLElement {
  static observedAttributes = ["id"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get material() {
    return MATERIALS_BY_ID[this.getAttribute("id")];
  }

  get selected() {
    return materialStore.value?.id === this.material?.id;
  }

  connectedCallback() {
    this.unsubscribers = [
      materialStore.subscribe(() => this.render()),
      stepsStore.subscribe(() => this.render()),
    ];
    this.render();
  }

  disconnectedCallback() {
    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const material = this.material;

    if (!material) return;

    this.shadowRoot.innerHTML = html`
      <style>
        .item-card {
          position: relative;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1.2em;

          background-color: white;

          width: clamp(40px, 20vw, 80px);
          height: clamp(80px, 20vh, 140px);

          padding: 0.5rem 1rem;

          border: 1px solid white;
          border-radius: 0.5rem;

          box-shadow: 0 2px 4px rgb(0 0 0 / 10%);

          cursor: pointer;
          transition: all 0.2s ease;
        }

        .item-card:hover,
        .item-card.selected {
          background: rgb(21 101 192 / 10%);
          border-color: var(--primary-blue);

          box-shadow: 0 4px 8px rgb(0 0 0 / 20%);

          transform: translateY(-5px);
        }

        img {
          width: clamp(40px, 20vw, 60px);
          height: clamp(40px, 20vw, 60px);
        }

        .name {
          font-size: 1.2rem;
        }

        .check {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;

          display: ${this.selected ? "flex" : "none"};
          justify-content: center;
          align-items: center;

          width: 24px;
          height: 24px;

          background-color: var(--primary-blue);
          color: white;

          font-weight: bold;

          border-radius: 50%;
        }
      </style>

      <div class="item-card ${this.selected ? "selected" : ""}">
        <img src="${material.icon}" alt="${material.name}" />
        <span class="name">${material.name}</span>
        <span class="check">✓</span>
      </div>
    `;

    this.shadowRoot
      .querySelector(".item-card")
      .addEventListener("click", () => {
        materialStore.value = material;

        if (stepsStore.value < 1) {
          stepsStore.value = 1;
        }
      });
  }
}

customElements.define("material-item-card", MaterialItemCard);
