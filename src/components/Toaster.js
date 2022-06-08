import { html, component } from "haunted";

function Toaster({ toasters, closeToaster }) {
  const generateToaster = () => {
    if (toasters.length > 0) {
      return toasters.map(el => {
        setTimeout(() => {
          closeToaster(el.id)
        }, 2000);
        return html`<div class="toaster__single"><p>${el.value}</p></div>`
      });
    }
  };

  return html`
    <div class="toaster">
      ${generateToaster()}
    </div>

    <style>
      .toaster {
        position: fixed;
        bottom: 50px;
        right: 50px;
        z-index: 99;
      }
      .toaster__single {
        width: 200px;
        margin-top: 10px;
        box-sizing: border-box;
        padding: 10px;
        font-size: 12px;
        text-align: center;
        border: solid 1px dimgray;
        color: dimgray;
        box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
        background-color: white;
      }

      @media print {
        .toaster {
          display: none;
        }
      }
    </style>
  `
}

customElements.define("toaster-element", component(Toaster));
