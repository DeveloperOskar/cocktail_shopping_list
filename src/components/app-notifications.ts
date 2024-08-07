import {component, html, useEffect, useState} from 'haunted';
import {SHOW_NOTIFICATION} from '../events/cocktails';

type Notification = {
  message: string;
  type: 'success' | 'default' | 'destructive';
};

export function _notify(
  message: string,
  type: 'success' | 'default' | 'destructive'
) {
  this.dispatchEvent(
    new CustomEvent(SHOW_NOTIFICATION, {
      detail: {
        message,
        type,
      },
      bubbles: true,
      composed: true,
    })
  );
}

function AppNotifications(element: HTMLElement) {
  const [notifications, setNotifications] = useState<
    {
      message: string;
      key: number;
      type: 'success' | 'default' | 'destructive';
    }[]
  >([]);

  useEffect(() => {
    element.addEventListener(SHOW_NOTIFICATION, (e) =>
      handleNotify(e as CustomEvent)
    );

    return () => {
      element.removeEventListener(SHOW_NOTIFICATION, (e) =>
        handleNotify(e as CustomEvent)
      );
    };
  }, []);

  const handleNotify = (e: CustomEvent<Notification>) => {
    const newNotification = {
      message: e.detail.message,
      key: new Date().getMilliseconds(),
      type: e.detail.type,
    };

    setNotifications((prev) => [...(prev ?? []), newNotification]);

    setTimeout(() => {
      let el = this.shadowRoot.getElementById(
        newNotification.key
      ) as HTMLElement | null;
      if (!el) return;

      el.remove();

      const els =
        this.shadowRoot.querySelectorAll('.notification') ??
        ([] as HTMLElement[]);

      if (els.length === 0) {
        setNotifications([]);
      }
    }, 3000);
  };

  return html`
    <div>
      ${notifications.map(
        (n) =>
          html`
            <aside id=${n.key} class=${'notification ' + n.type} role="alert">
              ${n.message}
            </aside>
          `
      )}
    </div>

    <style>
      div {
        padding-right: 16px;
        padding-top: 16px;
        width: 300px;
        height: 100%;
        right: 0px;
        top: 0px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        position: fixed;
      }

      div:empty {
        display: none;
      }

      .notification {
        padding: 16px;
        border-radius: 8px;
        font-weight: 600;
        animation: 1.5s fadeInUp;
      }

      .notification.default {
        background-color: black;
        color: white;
      }

      .notification.destructive {
        background-color: var(--destructive-color);
        color: white;
      }

      .notification.success {
        background-color: green;
        color: white;
      }

      @keyframes fadeInUp {
        0% {
          transform: translateY(100%);
          opacity: 0;
        }
        100% {
          transform: translateY(0%);
          opacity: 1;
        }
      }
    </style>

    <slot></slot>
  `;
}

customElements.define('app-notifications', component(AppNotifications));
