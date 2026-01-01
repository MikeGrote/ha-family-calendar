import { css } from 'lit';

export const calendarStyles = css`
  :host {
    /* Leichter bläulicher Verlauf für mehr Tiefe - Transparenter für Glass Effekt */
    --glass-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(235, 245, 255, 0.5));
    --glass-border: rgba(255, 255, 255, 0.4);
    /* Bläulicher Schatten für den "Floating"-Effekt */
    --glass-shadow: 0 10px 40px 0 rgba(31, 38, 135, 0.2);
    --text-primary: #1d1d1f;
    --text-secondary: #6e6e73;
    --grid-line: rgba(60, 60, 67, 0.08);
    --accent-color: #007aff;
  }

  ha-card {
    background: var(--glass-bg);
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    box-shadow: var(--glass-shadow);
    color: var(--text-primary);
    padding: 16px;
    overflow: hidden; /* Wichtig für abgerundete Ecken */
    display: flex;
    flex-direction: column;
  }

  .header {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--glass-border);
    margin-bottom: 12px;
  }

  .filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .filter-chip {
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
    outline: none;
  }

  .filter-chip:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  .filter-chip.active {
    background: white;
    color: var(--text-primary);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border-color: transparent;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--chip-color);
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  .filter-chip.active .dot {
    opacity: 1;
  }
  
  #calendar {
    --fc-border-color: var(--grid-line);
    --fc-page-bg-color: transparent;
    --fc-neutral-bg-color: transparent;
    --fc-today-bg-color: rgba(0, 122, 255, 0.08);
    --fc-now-indicator-color: #ff3b30;
    
    font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    height: 100%;
  }

  /* --- Header Styling (Apple Style) --- */
  .fc-theme-standard .fc-scrollgrid {
    border: none; /* Äußerer Rahmen weg */
  }

  .fc-col-header-cell {
    padding: 12px 0;
  }

  .fc-col-header-cell-cushion {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: capitalize;
    text-decoration: none !important;
  }

  /* Wochentag kleiner und grau (falls FC das trennt, sonst allgemein) */
  .fc-day-header {
    font-weight: 500;
  }

  /* --- Grid & Slots --- */
  .fc-timegrid-slot {
    height: 3.5em !important; /* Luftiger */
    border-bottom: 1px solid var(--grid-line);
  }
  
  .fc-timegrid-axis-cushion {
    color: var(--text-secondary);
    font-size: 0.8rem;
    font-weight: 500;
  }

  /* --- Events (Modern Cards) --- */
  .fc-event {
    border: none !important;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    padding: 2px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }

  .fc-event:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 5;
  }

  .fc-event-main {
    padding: 2px 4px;
    color: white; /* Text immer weiß für Kontrast */
  }

  .fc-v-event .fc-event-time {
    font-weight: 600;
    opacity: 0.9;
    margin-bottom: 1px;
    display: block;
  }

  /* --- Now Indicator (Roter Punkt + Linie) --- */
  .fc-timegrid-now-indicator-line {
    border-top-width: 2px;
    z-index: 4;
  }
  .fc-timegrid-now-indicator-arrow {
    border-color: #ff3b30;
    border-width: 6px;
    margin-top: -6px; /* Zentrieren */
    left: 0;
    z-index: 4;
  }

  /* --- Toolbar (Buttons) --- */
  .fc-header-toolbar {
    margin-bottom: 1.5em !important;
  }

  .fc-button {
    background-color: rgba(255,255,255,0.5) !important;
    border: 1px solid rgba(0,0,0,0.05) !important;
    color: var(--text-primary) !important;
    font-weight: 500 !important;
    border-radius: 8px !important;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
    text-transform: capitalize;
    padding: 6px 16px !important;
    transition: all 0.2s ease;
  }

  .fc-button:hover {
    background-color: rgba(255,255,255,0.8) !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
  }

  .fc-button-active {
    background-color: var(--accent-color) !important;
    color: white !important;
    box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3) !important;
  }

  .fc-toolbar-title {
    font-size: 1.5rem !important;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }

  /* --- Modern Scrollbar (Apple Style) --- */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  
  /* Firefox Scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
  }
`;
