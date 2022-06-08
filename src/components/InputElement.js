import { html, component } from "haunted";

function InputElement({ type, name, value, onKeyUpHandler }) {

  return html`
    <div class="input-element">
      <input type=${type} name=${name} id=${name} value=${value} @keyup=${(event) => onKeyUpHandler(event.target.value)}>
    </div>
    
    <style>
      .input-element {
        height: 30px;
      }
      .input-element input {
        box-sizing: border-box;
        height: 100%;
        border: solid 1px black;
        padding: 0 10px;
      }
    </style>
  `
}

customElements.define("input-element", component(InputElement));
