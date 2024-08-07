import {ADD_INGREDIENTS} from '../events/cocktails';
import {Drink, DrinkIngredient} from '../types/Drinks';
import {component, html, useEffect, useState} from 'haunted';
import './app-button';
import {_notify} from './app-notifications';

function CocktailCard({drink}: {drink: Drink}) {
  const [ingredients, setIngredients] = useState<DrinkIngredient[]>([]);

  useEffect(() => {
    let ingredients: DrinkIngredient[] = [];

    for (let i = 1; i <= Object.keys(drink).length; i++) {
      const ingredientKey = `strIngredient${i}` as keyof Drink;
      const measureKey = `strMeasure${i}` as keyof Drink;

      const ingredient = drink[ingredientKey];

      if (ingredient) {
        const measure = drink[measureKey];

        ingredients.push({
          name: ingredient,
          quantity: measure || null,
        });
      }
    }

    setIngredients(ingredients);
  }, [drink]);

  const addIngredients = (ingredients: DrinkIngredient[]) => {
    this.dispatchEvent(
      new CustomEvent(ADD_INGREDIENTS, {
        detail: ingredients,
        bubbles: true,
        composed: true,
      })
    );

    _notify.bind(this)('Ingredients added!', 'success');
  };

  return html`
    <article class="cocktail-card">
      <img
        src=${drink.strDrinkThumb ?? 'add-a-fallback-src-image'}
        alt=${drink.strDrink}
      />

      <div class="details">
        <p class="description">${drink.strCategory}</p>
        <p class="name">${drink.strDrink}</p>

        <p class="instructions">Instructions</p>
        <p class="instructions-text">${drink.strInstructions}</p>

        <p class="ingredients">Ingredients</p>

        <div class="ingredients-list-wrapper">
          <ul>
            ${ingredients.map(
              (ingredient) =>
                html`<li>${ingredient.quantity} ${ingredient.name}</li>`
            )}
          </ul>

          <app-button @clicked=${() => addIngredients(ingredients)}
            >+</app-button
          >
        </div>
      </div>
    </article>

    <style>
      .cocktail-card {
        background-color: var(--main-bg-color);
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #e4e4e7;
        display: flex;
        gap: 8px;
      }

      img {
        height: 70px;
        width: 70px;
        object-fit: contain;
        border-radius: 8px;
      }

      p {
        margin: 0px;
      }

      .details {
        width: 100%;
      }
      .description {
        color: #3d3d3d;
        font-size: 12px;
        font-weight: light;
      }

      .name {
        font-size: 16px;
      }

      .ingredients,
      .instructions {
        margin-top: 12px;
        font-size: 14px;
        font-weight: bold;
      }
      ul {
        list-style: none;
        margin: 0px;
        padding: 0px;
        flex: 1 0;
      }

      li,
      .instructions-text {
        font-size: 14px;
      }

      .ingredients-list-wrapper {
        display: flex;
        width: 100%;
        align-items: end;
      }
    </style>
  `;
}

customElements.define('cocktail-card', component(CocktailCard));
