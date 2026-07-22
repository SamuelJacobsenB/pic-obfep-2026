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
    this.unsubscribe?.();
  }

  render() {
    const material = materialStore.value;

    if (!material) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    this.shadowRoot.innerHTML = html`
      <style>
        .info-card {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;

          margin-top: 2rem;
          padding: 1.75rem;

          background: #fff;

          border: 1px solid #e7edf5;
          border-radius: 1rem;

          box-shadow: 0 6px 20px rgb(0 0 0 / 6%);

          animation: fade 0.5s ease;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 0.75rem;

          padding-bottom: 1rem;

          border-bottom: 1px solid #edf2f7;
        }

        .header-icon {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 52px;
          height: 52px;

          background: rgb(21 101 192 / 10%);
          border-radius: 50%;
        }

        .header-icon img {
          width: 28px;
          height: 28px;
        }

        .header-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .header-text h2 {
          margin: 0;

          color: var(--primary-blue);

          font-size: 1.25rem;
          font-weight: 700;
        }

        .header-text p {
          margin: 0;

          color: var(--text-secondary);

          font-size: 0.95rem;
        }

        .material-properties {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .property {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;

          background: #f8fafc;

          padding: 1rem;

          border: 1px solid #edf2f7;
          border-radius: 0.85rem;
        }

        .property-label {
          color: var(--text-secondary);

          font-size: 0.9rem;
          font-weight: 600;
        }

        .property-value {
          color: var(--text-primary);

          font-size: 1.25rem;
          font-weight: 700;
        }

        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .property {
            width: 100%;
          }
        }
      </style>

      <section class="info-card">
        <header class="header">
          <div class="header-icon">
            <img src="${material.icon}" alt="${material.name}" />
          </div>

          <div class="header-text">
            <h2>${material.name}</h2>
            <p>Propriedades térmicas do material</p>
          </div>
        </header>

        <div class="material-properties">
          <div class="property">
            <span class="property-label"> α (Coeficiente Linear) </span>

            <span class="property-value">
              ${scientificNotation(material.linear_coefficient)} / ºC
            </span>
          </div>

          <div class="property">
            <span class="property-label"> Ponto de Fusão </span>

            <span class="property-value"> ${material.melting_point} ºC </span>
          </div>

          <div class="property">
            <span class="property-label"> Ponto de Ebulição </span>

            <span class="property-value"> ${material.boiling_point} ºC </span>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("material-info-card", MaterialInfoCard);
