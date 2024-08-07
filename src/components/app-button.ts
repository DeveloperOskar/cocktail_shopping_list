import {component, html} from 'haunted';

function AppButton({
  kind = 'primary',
  disabled = false,
}: {
  kind: 'primary' | 'destructive' | 'ghost';
  disabled?: boolean;
}) {
  return html`
    <button
      ?disabled=${disabled}
      class=${kind}
      @click=${() => {
        this.dispatchEvent(new CustomEvent('clicked'));
      }}
    >
      <slot></slot>
    </button>

    <style>
      :host {
        width: fit-content;
        height: inherit;
      }

      button:disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      button {
        height: 100%;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        outline: none;
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        height: 36px;
        min-width: 36px;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      }

      button.primary {
        background-color: black;
        border: 1px solid black;
        color: white;
      }

      button.primary:hover {
        opacity: 0.8;
      }

      button.destructive {
        border: 1px solid var(--destructive-color);
        background-color: var(--destructive-color);
        color: white;
      }

      button.destructive:hover {
        background-color: #b91c1c;
        border: 1px solid #b91c1c;
      }

      button.ghost {
        box-shadow: none;
        background-color: transparent;
        border: 1px solid transparent;
      }

      button.ghost:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      button:focus {
        outline: 2px solid #30a9ff;
      }
    </style>
  `;
}

customElements.define('app-button', component(AppButton));
