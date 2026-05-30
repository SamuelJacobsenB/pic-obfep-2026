import { stepsStore } from "../store/index.js";
import { html } from "../utils/html.js";

class SideBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    this.unsubscribe = stepsStore.subscribe(() => {
      this.render();
    });
  }

  disconnectedCallback() {
    this.unsubscribe();
  }

  render() {
    this.shadowRoot.innerHTML = html`
      <style>
        .sidebar {
          position: sticky;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          background-color: var(--background-card);
          padding: 1rem 0.2rem;
          width: 150px;
          height: calc(100vh - 85px);
          box-shadow: 0 4px 4px var(--shadow-soft);
        }

        @media (max-width: 520px) {
          .sidebar {
            flex-direction: row;
            justify-content: center;
            padding: 0.5rem 2rem;
          }
        }
      </style>

      <nav class="sidebar">
        <app-step-item
          href="#material"
          active="true"
          disabled=${!stepsStore.material}
          background-color="var(--primary-blue-soft)"
          color="var(--primary-blue)"
          icon="../../assets/images/building.png"
        ></app-step-item>

        <app-step-item
          href="#dilation-type"
          active
          disabled=${!stepsStore.dilationType}
        ></app-step-item>

        <app-step-item
          href="#parameters"
          active
          disabled=${!stepsStore.parameters}
        ></app-step-item>

        <app-step-item
          href="#results"
          active
          disabled=${!stepsStore.results}
        ></app-step-item>
      </nav>
    `;
  }
}

customElements.define("app-sidebar", SideBar);
