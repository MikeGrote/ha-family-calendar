import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import deLocale from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import { calendarStyles } from './styles';
import { CalendarConfig } from './types';

@customElement('family-calendar')
export class FamilyCalendar extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property() config!: CalendarConfig;

  @state() activeCalendars: string[] = [];
  @state() isCompact: boolean = false;
  private allFetchedEvents: any[] = [];

  @query('#calendar') calendarEl!: HTMLElement;
  
  calendar: Calendar | null = null;
  events: any[] = [];

  setConfig(config: CalendarConfig) {
    if (!config.entities) {
      throw new Error('Bitte Kalender-Entitäten angeben!');
    }
    this.config = config;
    // Standardmäßig alle aktiv
    this.activeCalendars = [...config.entities];
  }

  getCardSize() {
    return 10;
  }

  render() {
    return html`
      <ha-card>
        <div class="header">
          <div class="filters">
            ${this.config?.entities?.map((entityId: string) => {
              const color = this.config.colors?.[entityId] || '#0078d4';
              const isActive = this.activeCalendars.includes(entityId);
              const name = this.hass?.states[entityId]?.attributes?.friendly_name || entityId;
              
              return html`
                <button 
                  class="filter-chip ${isActive ? 'active' : ''}"
                  style="--chip-color: ${color}"
                  @click=${() => this.toggleCalendar(entityId)}
                >
                  <span class="dot"></span>
                  ${name}
                </button>
              `;
            })}
            
            <div style="flex: 1"></div>
            
            <button 
              class="filter-chip ${this.isCompact ? 'active' : ''}"
              style="--chip-color: #666"
              @click=${this.toggleCompact}
            >
              <span class="dot"></span>
              Kompakt
            </button>
          </div>
        </div>
        <div id="calendar"></div>
      </ha-card>
    `;
  }

  toggleCompact() {
    this.isCompact = !this.isCompact;
    // Wir wechseln zwischen Zeit-Raster (Stundenplan) und Block-Ansicht (Kompakt)
    const view = this.isCompact ? 'dayGridWeek' : 'timeGridWeek';
    this.calendar?.changeView(view);
  }

  toggleCalendar(entityId: string) {
    if (this.activeCalendars.includes(entityId)) {
      this.activeCalendars = this.activeCalendars.filter(id => id !== entityId);
    } else {
      this.activeCalendars = [...this.activeCalendars, entityId];
    }
    this.applyFilters();
  }

  applyFilters() {
    if (!this.calendar) return;
    
    const filtered = this.allFetchedEvents.filter(e => 
      this.activeCalendars.includes(e.extendedProps.entityId)
    );

    this.calendar.removeAllEvents();
    this.calendar.addEventSource(filtered);
    
    // Events für adjustTimeRange aktualisieren
    this.events = filtered;
    
    if (this.calendar.view) {
      this.adjustTimeRange(this.calendar.view.activeStart, this.calendar.view.activeEnd);
    }
  }

  firstUpdated() {
    if (this.calendarEl) {
      this.calendar = new Calendar(this.calendarEl, {
        plugins: [timeGridPlugin, dayGridPlugin],
        initialView: 'timeGridWeek',
        locale: deLocale,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth'
        },
        height: '85vh',
        allDaySlot: true,
        slotMinTime: '06:00:00',
        slotMaxTime: '22:00:00',
        
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        eventTimeFormat: {
           hour: '2-digit',
           minute: '2-digit',
           meridiem: false
        },
        // Callback wenn sich der sichtbare Zeitraum ändert (z.B. "Nächste Woche")
        datesSet: (arg) => {
          this.adjustTimeRange(arg.start, arg.end);
        },
        events: [] 
      });
      this.calendar.render();
      
      // Falls hass schon gesetzt wurde (z.B. durch Mock), lade Events
      if (this.hass && this.config) {
        this.fetchEvents();
      }
    }
  }

  updated(changedProps: PropertyValues) {
    if (changedProps.has('hass')) {
      this.fetchEvents();
    }
  }

  // Berechnet die sichtbaren Zeiten dynamisch
  adjustTimeRange(viewStart: Date, viewEnd: Date) {
    if (!this.calendar) return;
    
    // In der Block-Ansicht (dayGrid) gibt es keine Zeitleiste zum Anpassen
    if (this.calendar.view.type === 'dayGridWeek') return;

    if (this.events.length === 0) {
      this.calendar.setOption('slotMinTime', '06:00:00');
      this.calendar.setOption('slotMaxTime', '22:00:00');
      return;
    }

    let minTime = 24 * 60; // Start mit Max-Wert
    let maxTime = 0;       // Start mit Min-Wert
    let hasEvents = false;

    // Filtere Events im aktuellen View
    const visibleEvents = this.events.filter(e => {
      const eStart = new Date(e.start);
      const eEnd = new Date(e.end);
      return eEnd > viewStart && eStart < viewEnd;
    });

    if (visibleEvents.length === 0) {
      // Standardwerte wenn keine Termine
      this.calendar.setOption('slotMinTime', '06:00:00');
      this.calendar.setOption('slotMaxTime', '22:00:00');
      return;
    }

    visibleEvents.forEach(e => {
      const eStart = new Date(e.start);
      const eEnd = new Date(e.end);
      
      // Nur die Uhrzeit betrachten (in Minuten)
      const startMinutes = eStart.getHours() * 60 + eStart.getMinutes();
      const endMinutes = eEnd.getHours() * 60 + eEnd.getMinutes();

      // Sonderfall: Ganztägige Events ignorieren für die Zeit-Skalierung
      if (!e.allDay) {
        if (startMinutes < minTime) minTime = startMinutes;
        if (endMinutes > maxTime) maxTime = endMinutes;
        hasEvents = true;
      }
    });

    if (hasEvents) {
      // Puffer hinzufügen (z.B. 1 Stunde davor/danach)
      minTime = Math.max(0, minTime - 60);
      maxTime = Math.min(24 * 60, maxTime + 60);

      // In HH:MM:SS Format wandeln
      const formatTime = (minutes: number) => {
        const h = Math.floor(minutes / 60).toString().padStart(2, '0');
        const m = (minutes % 60).toString().padStart(2, '0');
        return `${h}:${m}:00`;
      };

      this.calendar.setOption('slotMinTime', formatTime(minTime));
      this.calendar.setOption('slotMaxTime', formatTime(maxTime));
    }
  }

  async fetchEvents() {
    if (!this.hass || !this.config || !this.calendar) return;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);

    const start = startDate.toISOString();
    const end = endDate.toISOString();

    const allEvents: any[] = [];

    for (const entity_id of this.config.entities) {
      try {
        const events = await this.hass.callWS<any[]>({
          type: 'calendar/event_list',
          entity_id: entity_id,
          start: start,
          end: end,
        });

        const color = this.config.colors?.[entity_id] || '#0078d4';

        const mappedEvents = events.map(e => ({
          title: e.summary,
          start: e.start.dateTime || e.start.date,
          end: e.end.dateTime || e.end.date,
          backgroundColor: color,
          borderColor: color,
          allDay: !e.start.dateTime,
          extendedProps: { entityId: entity_id }
        }));

        allEvents.push(...mappedEvents);
      } catch (err) {
        console.error("Fehler beim Laden von", entity_id, err);
      }
    }

    // Alle Events speichern (ungefiltert)
    this.allFetchedEvents = allEvents;
    
    // Filter anwenden (das aktualisiert auch den Kalender)
    this.applyFilters();
  }

  static styles = calendarStyles;
}
