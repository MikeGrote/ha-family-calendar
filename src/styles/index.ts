import { css } from 'lit';

import { calendarGridStyles } from './calendar';
import { dialogStyles } from './dialog';
import { headerStyles } from './header';
import { tokenStyles } from './tokens';

/** Alle Stile der Karte in Reihenfolge ihrer Spezifitaet. */
export const calendarStyles = css`
  ${tokenStyles}
  ${headerStyles}
  ${calendarGridStyles}
  ${dialogStyles}
`;
