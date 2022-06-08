import { html, component } from "haunted";
import '@/components/InputElement';

function SearchBar({ searchVal, setSearchVal, onButtonClick }) {
  return html`
    <form class="search-bar" @submit=${(event) => onButtonClick(event)}>
      <div class="search-bar__item">
        <input-element name="search" type="text" .value=${searchVal} .onKeyUpHandler=${setSearchVal}></input-element>
      </div>
      <button type="submit" class="search-bar__button">Search</button>
    </form>

    <style>
      .search-bar {
        padding: 50px 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .search-bar__button {
        background: transparent;
        padding: 6px 30px;
        border: solid 1px black;
        font-size: 14px;
        cursor: pointer;
      }
    </style>
  `
}

customElements.define("search-bar", component(SearchBar));
