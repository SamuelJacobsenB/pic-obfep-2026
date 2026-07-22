import { dilationTypeStore, stepsStore } from "../../../store/index.js";
import { html } from "../../../utils/html.js";

class DilatationItemCard extends HTMLElement {
  static get observedAttributes() {
    return ["type"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unsubscribers = [
      dilationTypeStore.subscribe(() => this.render()),
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
    const type = this.getAttribute("type");
    const selected = dilationTypeStore?.value == type;

    const names = {
      linear: "Linear",
      superficial: "Superficial",
      volumetric: "Volumétrica",
    };

    this.shadowRoot.innerHTML = html`
      <style>
        .item-card {
          position: relative;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2rem;

          width: clamp(100px, 20vw, 200px);
          height: clamp(160px, 20vw, 360px);

          padding: 1rem 1.5rem;

          background: white;
          color: black;

          border: 2px solid white;
          border-radius: 0.5rem;

          box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

          cursor: pointer;
          transition: all 0.2s ease;
        }

        .item-card:hover,
        .item-card.selected {
          box-shadow: 0 4px 8px rgb(0 0 0 / 20%);

          transform: translateY(-5px);
        }

        .item-card:hover {
          color: var(--accent-orange);

          border-color: var(--accent-orange);
        }

        .item-card.selected {
          color: var(--accent-orange);
          background: rgba(255, 153, 0, 0.1);

          border-color: var(--accent-orange);
        }

        .icon {
          width: clamp(80px, 10vw, 120px);
          height: clamp(80px, 10vw, 120px);

          background-color: currentColor;

          mask: url("./assets/icons/dilatation-types/${type}.svg") center /
            contain no-repeat;
          -webkit-mask: url("./assets/icons/dilatation-types/${type}.svg")
            center / contain no-repeat;

          transition: background-color 0.2s ease;
        }

        .type {
          color: inherit;

          font-size: clamp(1.2rem, 2vw, 1.6rem);
          letter-spacing: 1.2px;
          font-weight: bold;

          transition: color 0.2s ease;
        }

        .check {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;

          display: ${selected ? "flex" : "none"};
          justify-content: center;
          align-items: center;

          width: 24px;
          height: 24px;

          background: var(--accent-orange);
          color: white;

          border-radius: 50%;
          font-weight: bold;
        }
      </style>

      <div class="item-card ${selected ? "selected" : ""}">
        <span class="icon"></span>
        <span class="type">${names[type]}</span>
        <span class="check">✓</span>
      </div>
    `;

    this.shadowRoot
      .querySelector(".item-card")
      .addEventListener("click", () => {
        dilationTypeStore.value = type;

        if (stepsStore.value < 2) {
          stepsStore.value = 2;
        }
      });
  }
}

customElements.define("dilatation-item-card", DilatationItemCard);
