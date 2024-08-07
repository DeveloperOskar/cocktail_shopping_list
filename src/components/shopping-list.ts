import {component, html} from 'haunted';
import {DrinkIngredient} from '../types/Drinks';
import './app-button';
import {_notify} from './app-notifications';

function ShoppingList({ingredients}: {ingredients: DrinkIngredient[]}) {
  const handlePrint = () => {
    const w = window.open(`${window.location.origin}/print.html`, '_blank');
    (w as any).PrintIngredients = ingredients.map(
      (ingredient) => ingredient.name
    );
  };

  return html`
    <section>
      <h2>Shopping List</h2>

      ${ingredients.length > 0
        ? html`<ul id="ingredients-list">
            ${ingredients.map(
              (ingredient) => html`<li>
                ${ingredient.name}

                <app-button
                  .kind=${'ghost'}
                  @clicked=${() => {
                    this.dispatchEvent(
                      new CustomEvent('delete-ingredient', {
                        detail: ingredient.name,
                      })
                    );
                    _notify.bind(this)('Ingredient removed!', 'destructive');
                  }}
                  .kind=${'destructive'}
                >
                  <span style="color:red;">X</span></app-button
                >
              </li>`
            )}
          </ul>`
        : html`<p>Your shopping list is empty</p>`}

      <div class="buttons">
        <app-button
          .disabled=${ingredients.length === 0}
          @clicked=${() => {
            handlePrint();
          }}
          >Print</app-button
        >

        <app-button
          .disabled=${ingredients.length === 0}
          @clicked=${() => {
            this.dispatchEvent(new CustomEvent('clear-list'));
            _notify.bind(this)('List cleared!', 'destructive');
          }}
          .kind=${'destructive'}
          >Clear list</app-button
        >
      </div>
    </section>

    <style>
      section {
        display: block;
        position: sticky;
        top: 0px;
        border: 1px solid #e4e4e7;
        padding: 16px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      h2 {
        margin: 0px;
        min-width: 300px;
      }

      ul {
        list-style: none;
        margin: 0px;
        padding: 0px;
      }

      ul li {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .buttons {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    </style>
  `;
}

customElements.define('shopping-list', component(ShoppingList));
