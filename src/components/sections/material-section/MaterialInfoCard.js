import { scientificNotation } from "../../../calculations/scientific-notation.js";
import { materialStore } from "../../../store/index.js";
import { html } from "../../../utils/html.js";

class MaterialInfoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    this.unsubscribe = materialStore.subscribe(() => this.render());
  }

  disconnectedCallback() {
    this.unsubscribe();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const material = materialStore.value;

    if (!material) return;

    this.shadowRoot.innerHTML = html`
      <style>
        .info-card {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;

          background-color: rgba(21, 101, 192, 0.1);

          padding: 1rem 1.5rem;
          margin-bottom: 1rem;

          border: 1px solid var(--primary-blue-light);
          border-radius: 0.5rem;
        }

        .info-card h2 {
          color: var(--text-primary);

          font-size: 1.2rem;

          margin: 0;
        }

        .material-properties {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          gap: 3rem;
        }

        .material-properties > span {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .material-properties span strong {
          color: var(--text-secondary);

          font-size: 1rem;
        }

        .material-properties span p {
          color: var(--text-primary);

          font-size: 1.2rem;

          margin: 0;
        }
      </style>

      <div class="info-card" id="material-info-card">
        <h2>Propriedades do material (${material.name})</h2>
        <div class="material-properties">
          <span>
            <strong>α (Coeficiente Linear)</strong>
            <p>${scientificNotation(material.linear_coefficient)} / ºC</p>
          </span>

          <span>
            <strong>Ponto de Fusão</strong>
            <p>${material.melting_point} ºC</p>
          </span>

          <span>
            <strong>Ponto de Ebulição</strong>
            <p>${material.boiling_point} ºC</p>
          </span>
        </div>
      </div>
    `;
  }
}

customElements.define("material-info-card", MaterialInfoCard);
