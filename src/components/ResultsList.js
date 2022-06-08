import { html, component } from "haunted";
import {containsObject} from '@/utils/helpers';
import '@/components/ResultItem';

function ResultsList({ data, selectedDrinks }) {

  const renderResults = () => {
    if (data.length > 0) {
      return data.map(single => {
        const isInList = containsObject(single, selectedDrinks);
        return html`<result-item .data=${single} .isInList=${isInList}></result-item>`
      })
    }
  }

  return html`
    <div class="results-list">
      <ul class="results-list__items">
        ${renderResults()}
      </ul>
    </div>
    
    <style>
      ul {
        padding: 0;
        margin: 0;
      }
    </style>
  `
}

customElements.define("results-list", component(ResultsList));
