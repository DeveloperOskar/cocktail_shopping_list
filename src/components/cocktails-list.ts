import {Drink} from '../types/Drinks';
import {component, html} from 'haunted';
import './cocktail-card';

function CocktailList({drinks}: {drinks: Drink[]}) {
  return html`
    <ul>
      ${drinks.map(
        (drink) =>
          html`<li><cocktail-card .drink=${drink}></cocktail-card></li>`
      )}
    </ul>

    <style>
      ul {
        display: flex;
        flex-direction: column;
        gap: 8px;
        list-style: none;
        padding: 0px;
        margin: 0px;
      }
    </style>
  `;
}

customElements.define('cocktails-list', component(CocktailList));
