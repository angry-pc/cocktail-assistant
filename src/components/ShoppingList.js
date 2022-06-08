import { html, component } from "haunted";

function ShoppingList(element) {
  const { data } = element;

  const renderUniqueIngredients = () => {
    const ingredients = [];
    if (data.length > 0) {
      for (const dataKey in data) {
        const drinkData = data[dataKey];

        for (let i = 1; i <= 15; i++) {
          const key = `strIngredient${i}`;
          if (key in drinkData) {
            const val = drinkData[`strIngredient${i}`];
            val && ingredients.push(val);
          }
        }
      }

      const ingredientsWithoutDuplicates = [...new Set(ingredients)];

      if (ingredientsWithoutDuplicates.length > 0) {
        return ingredientsWithoutDuplicates.map(el => html`
          <li class="shopping-list__item">${el}</li>`)
      }
    } else {
      return html`<p>Search and add something.</p>`
    }
  }

  const renderPrintButton = () => {
    if (data.length > 0) {
      return html`<button type="button" @click=${() => window.print()} class="shopping-list__button">Print</button>`
    }
  }

  return html`
    <div class="shopping-list">
      <div class="shopping-list__inner" id="elementToPrint">
        <h2 class="shopping-list__heading">Shopping list</h2>
        <ul class="shopping-list__items">
          ${renderUniqueIngredients()}
        </ul>
      </div>
      ${renderPrintButton()}
    </div>

    <style>
      .shopping-list {
        border: solid 1px black;
        padding: 30px 20px;
        box-sizing: border-box;
        margin-left: 30px;
      }
      .shopping-list__items {
        padding: 0;
        margin: 0;
        list-style-position: inside;
      }
      .shopping-list__item {
        font-size: 14px;
        margin-bottom: 5px;
      }
      .shopping-list__heading {
        font-size: 18px;
        font-weight: 700;
        margin: 0 0 15px 0;
        border-bottom: solid 1px dimgray;
        padding-bottom: 8px;
      }
      .shopping-list__button {
        background: transparent;
        padding: 6px 30px;
        border: solid 1px black;
        font-size: 14px;
        cursor: pointer;
        margin-top: 30px;
      }
      
      @media print {
        .shopping-list {
          margin-left: 0;
        }
        .shopping-list__button {
          display: none;
        }
      }
    </style>
  `
}

customElements.define("shopping-list", component(ShoppingList));
