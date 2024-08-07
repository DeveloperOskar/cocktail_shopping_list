import {html, component} from 'haunted';

function AppInput({
  type,
  placeholder,
}: {
  type: 'text' | 'search';
  placeholder: string;
}) {
  return html`
    <input
      @keyup=${(e: KeyboardEvent) => {
        this.dispatchEvent(
          new CustomEvent('input-changed', {
            detail: (e.target as HTMLInputElement).value,
            bubbles: true,
            composed: true,
          })
        );
      }}
      type=${type}
      placeholder=${placeholder}
    />

    <style>
      :host {
        width: fit-content;
      }

      input {
        width: 100%;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        border-radius: 4px;
        padding: 6px 12px;
        min-height: 36px;
        height: 36px;
        min-width: 36px;
        font-size: 16px;
        font-family: 'Open Sans', sans-serif;
        border: 1px solid #ccc;
        outline: none;
      }
      input:focus {
        outline: 1px solid #30a9ff;
      }
    </style>
  `;
}

customElements.define('app-input', component(AppInput));
