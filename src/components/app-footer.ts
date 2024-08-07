import {component, html} from 'haunted';
import './app-container';

function AppFooter() {
  return html`
    <footer>
      <app-container>
        <p>Made by Oskar Eriksson</p>
      </app-container>
    </footer>

    <style>
      footer {
        border-top: 1px solid #e4e4e7;
        padding: 60px 24px;
      }
    </style>
  `;
}

customElements.define('app-footer', component(AppFooter));
