import { html, component, useState, useEffect, useCallback } from "haunted";
import { generateRandomID } from '@/utils/helpers';
import '@/components/SearchBar';
import '@/components/ResultsList';
import '@/components/ShoppingList';
import '@/components/Toaster';

function Container(element) {
  const [searchVal, setSearchVal] = useState('Margarita');
  const [toasters, setToasters] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  useEffect(() => {
    const onAddToListHandler = ({ detail: { data }}) => {
      setSelectedDrinks(previousState => [...previousState, data]);
      const toast = {
        id: generateRandomID(),
        value: 'Ingredients added to shopping list.'
      };
      setToasters(previousState => [...previousState, toast]);
    };
    element.addEventListener('add-to-list', onAddToListHandler);

    return () => element.removeEventListener('add-to-list', onAddToListHandler);
  }, []);

  useEffect(() => {
    const onRemoveToListHandler = ({ detail: { data }}) => {
      setSelectedDrinks(previousState => previousState.filter(i => i.idDrink !== data.idDrink));
      const toast = {
        id: generateRandomID(),
        value: 'Ingredients removed from shopping list.'
      };
      setToasters(previousState => [...previousState, toast]);
    };
    element.addEventListener('remove-from-list', onRemoveToListHandler);

    return () => element.removeEventListener('remove-from-list', onRemoveToListHandler);
  }, []);

  async function onClickSearch(event) {
    event.preventDefault();
    setFetchedData([]);
    const toast = {
      id: generateRandomID(),
      value: 'Searching...'
    };
    setToasters(previousState => [...previousState, toast]);

    const val = searchVal.toLowerCase();
    const fetched = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${val}`, {
      method: 'GET',
    }).then(res => res.json());

    if (fetched.drinks) {
      setFetchedData(fetched.drinks);
      const toast = {
        id: generateRandomID(),
        value: 'Here are the results.'
      };
      setToasters(previousState => [...previousState, toast]);
    } else {
      const toast = {
        id: generateRandomID(),
        value: 'No results found.'
      };
      setToasters(previousState => [...previousState, toast]);
    }
  }

  const closeToaster = useCallback((id) => {
    setToasters(previousState => previousState.filter(i => i.id !== id))
  }, [toasters]);

  return html`
    <div class="container">
      <div class="container__search">
        <search-bar .searchVal=${searchVal} .setSearchVal=${setSearchVal} .onButtonClick=${onClickSearch}></search-bar>
      </div>
      <div class="container__row">
        <div class="container__wide-col">
          <results-list .data=${fetchedData} .selectedDrinks=${selectedDrinks}></results-list>
        </div>
        <div class="container__short-col">
          <shopping-list .data=${selectedDrinks}></shopping-list>
        </div>
        <toaster-element .toasters=${toasters} .closeToaster=${closeToaster}></toaster-element>
      </div>
    </div>
    
    <style>
      .container {}
      .container__row {
        display: flex;
        width: 100%;
        box-sizing: border-box;
      }
      .container__wide-col {
        flex: 0 0 60%;
        box-sizing: border-box;
      }
      .container__short-col {
        flex: 0 0 40%;
        box-sizing: border-box;
      }
      
      @media print {
        .container__row {
          display: block;
        }
        .container__wide-col {
          display: none;
        }
        .container__search {
          display: none;
        }
      }
    </style>
  `
}

customElements.define("container-wrapper", component(Container));
