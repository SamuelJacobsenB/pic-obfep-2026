import { html } from "../../utils/html.js";

class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = html`
      <style>
        .header {
          z-index: 10;
          position: sticky;
          top: 0;

          display: flex;
          align-items: center;
          gap: 1.5rem;

          background: linear-gradient(
            to right,
            var(--primary-blue-light),
            var(--primary-blue)
          );

          height: 75px;

          padding: 0 2rem;
        }

        .header > img {
          width: 35px;
          height: 35px;
        }

        .header > h1 {
          font-size: 1.5rem;
          color: var(--text-light);
        }

        @media (max-width: 750px) {
          .header {
            height: 100px;
          }
        }
      </style>

      <header class="header">
        <img src="../../../assets/images/building.png" alt="Prédio" />
        <h1>Calculadora de Dilatação Térmica</h1>
      </header>
    `;
  }
}

customElements.define("app-header", Header);
