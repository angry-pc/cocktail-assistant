import { html, component } from "haunted";
import "@/components/Container.js";

function Layout() {
  return html`
    <section class="main-container">
      <container-wrapper></container-wrapper>
    </section>

    <style>
      .main-container {
        width: 100%;
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
      }
    </style>
  `;
}

customElements.define("layout-view", component(Layout));
