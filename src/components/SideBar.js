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
          top: 85px;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          background-color: var(--background-card);
          padding: 0 0.2rem;
          width: 100px;
          height: calc(100vh - 85px);
          box-shadow: 0 4px 4px var(--shadow-soft);
        }

        @media (max-width: 750px) {
          .sidebar {
            position: fixed;
            top: 100px;
            flex-direction: row;
            width: 100%;
            height: 80px;
          }
        }
      </style>

      <nav class="sidebar">
        <app-step-item
          id="1"
          href="#material"
          color="var(--primary-blue)"
          icon="./assets/icons/building.svg"
        ></app-step-item>

        <app-step-item
          id="2"
          href="#dilation-type"
          color="var(--primary-blue)"
          icon="./assets/icons/building.svg"
          disabled=${!stepsStore.value.dilationType}
        ></app-step-item>

        <app-step-item
          id="3"
          href="#parameters"
          color="var(--primary-blue)"
          icon="./assets/icons/building.svg"
          disabled=${!stepsStore.value.parameters}
        ></app-step-item>

        <app-step-item
          id="4"
          href="#results"
          color="var(--primary-blue)"
          icon="./assets/icons/building.svg"
          disabled=${!stepsStore.value.results}
        ></app-step-item>
      </nav>
    `;
  }
}

customElements.define("app-sidebar", SideBar);
