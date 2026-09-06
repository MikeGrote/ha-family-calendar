import type { HomeAssistant } from 'custom-card-helpers';

import { type AppSettings, DEFAULT_SETTINGS, subscribeSettings } from './settings-api';

/** Haelt eine Karte auf dem Stand des Einstellungsbereichs.
 *
 * Vier Karten brauchten dasselbe: abonnieren, den Stand merken, beim
 * Abbau wieder abmelden - und weiterlaufen, wenn die Integration nicht
 * antwortet, denn dann gilt eben der Eintrag im Dashboard.
 */
export class SettingsListener {
  settings: AppSettings = DEFAULT_SETTINGS;

  private unsubscribe?: () => void;

  constructor(
    /** Name der Karte, damit eine Warnung im Protokoll zuzuordnen ist. */
    private readonly karte: string,
    private readonly onChange: (settings: AppSettings) => void,
  ) {}

  async start(hass: HomeAssistant): Promise<void> {
    if (this.unsubscribe) return;
    try {
      this.unsubscribe = await subscribeSettings(hass, (settings) => {
        this.settings = settings;
        this.onChange(settings);
      });
    } catch (err) {
      console.warn(`${this.karte}: Einstellungen nicht erreichbar`, err);
    }
  }

  stop(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }
}
