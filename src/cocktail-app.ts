import {useState, html, component, useEffect} from 'haunted';
import './components/search-bar';
import './components/cocktails-list';
import './components/app-navbar';
import './components/shopping-list';
import './components/app-container';
import './components/app-footer';
import {Drink, GetDrinksResponse} from './types/Drinks';
import {ADD_INGREDIENTS, SEARCH_COCKTAILS} from './events/cocktails';
import {DrinkIngredient} from './types/Drinks';
import {_notify} from './components/app-notifications';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

function CockTailApp(element: HTMLElement) {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<
    DrinkIngredient[]
  >([]);

  useEffect(() => {
    element.addEventListener(SEARCH_COCKTAILS, (e) =>
      handleSearchDrinks(e as CustomEvent)
    );

    element.addEventListener(ADD_INGREDIENTS, (e) =>
      handleAddIngredients(e as CustomEvent)
    );

    getInitialDrinks();

    return () => {
      element.removeEventListener(SEARCH_COCKTAILS, (e) =>
        handleSearchDrinks(e as CustomEvent)
      );

      element.removeEventListener(ADD_INGREDIENTS, (e) =>
        handleAddIngredients(e as CustomEvent)
      );
    };
  }, []);

  const handleAddIngredients = (e: CustomEvent) => {
    const newIngredients = e.detail as DrinkIngredient[];
    setSelectedIngredients((prev) => {
      const removedDuplicates = new Map<string, null>();

      prev?.forEach((ingredient) => {
        removedDuplicates.set(ingredient.name, null);
      });

      newIngredients.forEach((ingredient) => {
        removedDuplicates.set(ingredient.name, null);
      });

      return Array.from(removedDuplicates.keys()).map((name) => ({
        name,
        quantity: null,
      }));
    });
  };

  const handleSearchDrinks = async (e: CustomEvent) => {
    const {keyword} = e.detail;

    _notify.bind(this)('Searching...', 'default');

    try {
      // throw new Error('error getting drinks');

      const response = await fetch(`${BASE_URL}?s=${keyword}`);

      if (response.status !== 200) {
        throw new Error('error getting drinks');
      }

      const data = (await response.json()) as GetDrinksResponse;

      setDrinks(data.drinks ?? []);
    } catch (error) {
      _notify.bind(this)('error getting drinks', 'destructive');
    }
  };

  const getInitialDrinks = async () => {
    try {
      // throw new Error('error getting drinks');
      const response = await fetch(`${BASE_URL}?s=margarita`);

      if (response.status !== 200) {
        throw new Error('error getting drinks');
      }

      const data = (await response.json()) as GetDrinksResponse;

      setDrinks(data.drinks ?? []);
    } catch (error) {
      console.error(error);
      _notify.bind(this)('error getting drinks', 'destructive');
    }
  };

  return html`
    <app-navbar></app-navbar>

    <main>
      <search-bar></search-bar>

      <app-container>
        <div>
          <cocktails-list .drinks=${drinks}></cocktails-list>

          <shopping-list
            @delete-ingredient=${(e: CustomEvent<string>) => {
              const newIngredients = selectedIngredients.filter(
                (ingredient) => ingredient.name !== e.detail
              );

              setSelectedIngredients(newIngredients);
            }}
            @clear-list=${() => setSelectedIngredients([])}
            .ingredients=${selectedIngredients}
          ></shopping-list>
        </div>
      </app-container>
    </main>

    <app-footer></app-footer>

    <style>
      search-bar {
        margin-left: auto;
        margin-right: auto;
        display: block;
      }

      cocktails-list {
        flex: 1 0;
      }

      main {
        padding-top: 64px;
        padding-bottom: 64px;
      }

      main div {
        margin-top: 32px;
        display: flex;
        flex-direction: column-reverse;
        gap: 32px;
      }

      @media (min-width: 800px) {
        main div {
          flex-direction: row;
        }
      }
    </style>
  `;
}

customElements.define('cocktail-app', component(CockTailApp));
