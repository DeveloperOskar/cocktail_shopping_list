import {useState, html, component} from 'haunted';
import {SEARCH_COCKTAILS} from '../events/cocktails';
import './app-button';
import './app-input';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch() {
    this.dispatchEvent(
      new CustomEvent(SEARCH_COCKTAILS, {
        detail: {keyword: searchTerm},
        bubbles: true,
        composed: true,
      })
    );
  }

  return html`
    <div>
      <app-input
        .placeholder=${'Search for a cocktail...'}
        .type=${'search'}
        @input-changed=${(e: CustomEvent<string>) => {
          setSearchTerm(e.detail);
        }}
      ></app-input>

      <app-button @clicked=${handleSearch}>Search</app-button>
    </div>

    <style>
      :host {
        width: fit-content;
      }

      div {
        gap: 8px;
        display: flex;
        align-items: center;
      }
    </style>
  `;
};

customElements.define('search-bar', component(SearchBar));
