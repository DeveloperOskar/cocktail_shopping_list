import {component, html} from 'haunted';
import './app-container';

function AppNavbar() {
  return html`
    <nav>
      <app-container>
        <span>Cocktail Shopping List</span>

        <a
          href="https://github.com/neovici/cocktail-shopping-list"
          target="_blank"
        >
          <img
            alt="link to github repo"
            src="https://static-00.iconduck.com/assets.00/github-icon-2048x1999-d37ckpm6.png"
          />
        </a>
      </app-container>
    </nav>

    <style>
      nav {
        background-color: var(--main-bg-color);
        padding-top: 16px;
        padding-bottom: 16px;
      }

      nav span {
        font-size: 26px;
        font-weight: bold;
      }

      app-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      img {
        height: 28px;
        width: 28px;
        object-fit: contain;
      }
    </style>
  `;
}

customElements.define('app-navbar', component(AppNavbar));
