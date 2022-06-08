import { html, component } from "haunted";

function ResultItem({ data, isInList }) {

  const addToList = () => {
    const event = new CustomEvent('add-to-list', {
      bubbles: true,
      composed: true,
      detail: { data }
    });
    this.dispatchEvent(event);
  }

  const removeFromList = () => {
    const event = new CustomEvent('remove-from-list', {
      bubbles: true,
      composed: true,
      detail: { data }
    });
    this.dispatchEvent(event);
  }

  const getCorrectButton = () => {
    if (isInList) {
      return html`<button type="button" class="result-item__button" @click=${removeFromList}>-</button>`;
    } else {
      return html`<button type="button" class="result-item__button" @click=${addToList}>+</button>`
    }
  }

  return html`
    <div class="result-item">
      <div class="result-item__wrap">
        <div class="result-item__image">
          <img src=${data.strDrinkThumb} alt=${data.strDrinkAlternate || data.strDrink}>
        </div>
        <div class="result-item__content">
          <h2 class="result-item__name">${data.strDrink}</h2>
          <p class="result-item__instructions">${data.strInstructions}</p>
          ${getCorrectButton()}
        </div>
      </div>
    </div>
    
    <style>
      .result-item {
        padding: 20px;
        border: solid 1px black;
        margin-bottom: 30px;
      }
      .result-item__wrap {
        display: flex;
        align-items: stretch;
      }
      .result-item__image {
        flex: 0 0 200px;
        padding-right: 50px;
      }
      .result-item__image img {
        width: 200px;
        height: 200px;
        object-fit: cover;
      }
      .result-item__content {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .result-item__name {
        margin: 0 0 30px 0;
        font-size: 20px;
        font-weight: 700;
      }
      .result-item__instructions {
        margin: 0 0 20px 0;
        font-size: 14px;
        font-weight: 400;
      }
      .result-item__button {
        background-color: lightgrey;
        box-shadow: none;
        border: solid 1px dimgray;
        color: dimgray;
        padding: 0;
        width: 36px;
        height: 36px;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        box-sizing: border-box;
        margin-top: auto;
        margin-left: auto;
        cursor: pointer;
      }
    </style>
  `
}

customElements.define("result-item", component(ResultItem));
