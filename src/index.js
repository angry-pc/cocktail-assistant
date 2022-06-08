import { html, component } from "haunted";
import '@/styles/index.scss'
import '@/components/Layout.js'

function App() {

  return html`
    <layout-view></layout-view>
  `;
}

customElements.define("my-app", component(App));
