import {component, html} from 'haunted';

function AppContainer() {
  return html`
    <slot></slot>

    <style>
      :host {
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding-left: 16px;
        padding-right: 16px;
      }

      @media (min-width: 900px) {
        :host {
          max-width: 900px;
          padding-left: 0px;
          padding-right: 0px;
        }
      }
    </style>
  `;
}

customElements.define('app-container', component(AppContainer));
