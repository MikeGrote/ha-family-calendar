import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { Calendar, DatesSetArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
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
  
  // Modal State
  @state() showModal: boolean = false;
  @state() editMode: boolean = false;
  @state() currentEventId: string = '';
  @state() newEventTitle: string = '';
  @state() newEventCalendar: string = '';
  @state() newEventStart: string = '';
  @state() newEventEnd: string = '';
  @state() newEventRecurrence: string = '';

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
        ${this.renderModal()}
      </ha-card>
    `;
  }

  renderModal() {
    if (!this.showModal) return html``;

    return html`
      <div class="modal-overlay" @click=${this.closeModal}>
        <div class="modal-content" @click=${(e: Event) => e.stopPropagation()}>
          <h3>${this.editMode ? 'Termin bearbeiten' : 'Neuer Termin'}</h3>
          
          <div class="form-group">
            <label>Titel</label>
            <input 
              type="text" 
              .value=${this.newEventTitle} 
              @input=${(e: any) => this.newEventTitle = e.target.value}
              placeholder="Termin Titel"
              autofocus
            >
          </div>

          <div class="form-group">
            <label>Kalender</label>
            <select 
              .value=${this.newEventCalendar}
              @change=${(e: any) => this.newEventCalendar = e.target.value}
              ?disabled=${this.editMode}
            >
              ${this.config.entities.map(entityId => {
                const name = this.hass?.states[entityId]?.attributes?.friendly_name || entityId;
                return html`<option value="${entityId}">${name}</option>`;
              })}
            </select>
          </div>

          <div class="form-group">
            <label>Von</label>
            <input 
              type="datetime-local" 
              .value=${this.newEventStart}
              @input=${(e: any) => this.newEventStart = e.target.value}
            >
          </div>

          <div class="form-group">
            <label>Bis</label>
            <input 
              type="datetime-local" 
              .value=${this.newEventEnd}
              @input=${(e: any) => this.newEventEnd = e.target.value}
            >
          </div>

          <div class="form-group">
            <label>Wiederholung</label>
            <select 
              .value=${this.newEventRecurrence}
              @change=${(e: any) => this.newEventRecurrence = e.target.value}
              ?disabled=${this.editMode}
            >
              <option value="">Keine</option>
              <option value="DAILY">Täglich</option>
              <option value="WEEKLY">Wöchentlich</option>
              <option value="MONTHLY">Monatlich</option>
            </select>
          </div>

          <div class="modal-actions">
            ${this.editMode ? html`
              <button class="btn-delete" style="background-color: #d93025; color: white; margin-right: auto;" @click=${this.deleteEvent}>Löschen</button>
            ` : ''}
            <button class="btn-cancel" @click=${this.closeModal}>Abbrechen</button>
            <button class="btn-save" @click=${this.saveEvent}>${this.editMode ? 'Aktualisieren' : 'Speichern'}</button>
          </div>
        </div>
      </div>
    `;
  }

  closeModal() {
    this.showModal = false;
    this.editMode = false;
    this.currentEventId = '';
    this.newEventTitle = '';
    this.newEventCalendar = '';
    this.newEventStart = '';
    this.newEventEnd = '';
    this.newEventRecurrence = '';
  }

  async deleteEvent() {
    if (!confirm('Möchtest du diesen Termin wirklich löschen?')) return;

    try {
      await this.hass.callService('calendar', 'delete_event', {
        entity_id: this.newEventCalendar,
        uid: this.currentEventId
      });
      
      this.closeModal();
      setTimeout(() => this.fetchEvents(), 500);
    } catch (e) {
      console.error('Fehler beim Löschen:', e);
      alert('Fehler beim Löschen. Unterstützt dein Kalender das Löschen?');
    }
  }

  async saveEvent() {
    if (!this.newEventTitle) {
      alert('Bitte einen Titel eingeben');
      return;
    }

    if (!this.newEventCalendar) {
      alert('Bitte einen Kalender auswählen');
      return;
    }

    try {
      // Wenn wir bearbeiten, löschen wir zuerst den alten Termin
      if (this.editMode && this.currentEventId) {
        try {
          await this.hass.callService('calendar', 'delete_event', {
            entity_id: this.newEventCalendar,
            uid: this.currentEventId
          });
          // Kurze Pause um sicherzugehen
          await new Promise(r => setTimeout(r, 200));
        } catch (e) {
          console.warn('Konnte alten Termin nicht löschen (vielleicht nicht unterstützt?), erstelle trotzdem neuen.', e);
        }
      }

      const eventData: any = {
        entity_id: this.newEventCalendar,
        summary: this.newEventTitle,
        start_date_time: this.newEventStart,
        end_date_time: this.newEventEnd
      };

      if (this.newEventRecurrence && !this.editMode) {
        eventData.recurrence_rule = `FREQ=${this.newEventRecurrence}`;
      }

      await this.hass.callService('calendar', 'create_event', eventData);
      
      this.closeModal();
      
      // Kurze Wartezeit, damit HA die Datenbank aktualisieren kann, dann neu laden
      setTimeout(() => this.fetchEvents(), 500);
      
    } catch (e) {
      console.error('Fehler beim Speichern des Termins:', e);
      alert('Fehler beim Speichern des Termins. Siehe Konsole.');
    }
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
        plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        locale: deLocale,
        selectable: true,
        selectMirror: true,
        select: (info: any) => this.handleDateSelect(info),
        eventClick: (info: any) => this.handleEventClick(info),
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
        datesSet: (arg: DatesSetArg) => {
          this.adjustTimeRange(arg.start, arg.end);
          this.fetchEvents(); // Events für den neuen Zeitraum laden
        },
        events: [] 
      } as any);
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

    let startDate = new Date();
    let endDate = new Date();

    // Wenn der Kalender bereit ist, nehmen wir den sichtbaren Bereich + Puffer
    if (this.calendar && this.calendar.view) {
      startDate = new Date(this.calendar.view.activeStart);
      endDate = new Date(this.calendar.view.activeEnd);
      // Puffer von 1 Woche davor und danach
      startDate.setDate(startDate.getDate() - 7);
      endDate.setDate(endDate.getDate() + 7);
    } else {
      // Fallback
      startDate.setDate(startDate.getDate() - 7);
      endDate.setDate(endDate.getDate() + 14);
    }

    const start = startDate.toISOString();
    const end = endDate.toISOString();

    const allEvents: any[] = [];

    for (const entity_id of this.config.entities) {
      try {
        // Wir nutzen die REST API, da callWS('calendar/event_list') bei manchen Usern Probleme macht
        const startEnc = encodeURIComponent(start);
        const endEnc = encodeURIComponent(end);
        
        const events = await this.hass.callApi<any[]>(
          'GET', 
          `calendars/${entity_id}?start=${startEnc}&end=${endEnc}`
        );

        const color = this.config.colors?.[entity_id] || '#0078d4';

        const mappedEvents = events.map(e => ({
          id: e.uid || e.id, // Wichtig für Bearbeitung/Löschen
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

  async handleDateSelect(info: any) {
    // Nur in der Wochen/Tagesansicht erlauben, nicht in der Monatsansicht (optional)
    // if (info.view.type === 'dayGridMonth') return;

    const calendarApi = info.view.calendar;
    calendarApi.unselect(); // Auswahl aufheben

    // Formatieren für datetime-local input (YYYY-MM-DDTHH:mm)
    // FullCalendar liefert ISO Strings, wir müssen sie evtl. anpassen
    const formatForInput = (dateStr: string) => {
      const date = new Date(dateStr);
      // Lokale Zeit berücksichtigen (einfacher Hack für datetime-local)
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return date.toISOString().slice(0, 16);
    };

    this.newEventStart = formatForInput(info.startStr);
    this.newEventEnd = formatForInput(info.endStr);
    this.newEventTitle = '';
    this.newEventCalendar = this.config.entities[0] || '';
    this.newEventRecurrence = '';
    
    this.showModal = true;
  }

  handleEventClick(info: any) {
    const event = info.event;
    
    // Formatieren für datetime-local input
    const formatForInput = (date: Date) => {
      if (!date) return '';
      const d = new Date(date);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 16);
    };

    this.editMode = true;
    this.currentEventId = event.id;
    this.newEventTitle = event.title;
    this.newEventCalendar = event.extendedProps.entityId;
    this.newEventStart = formatForInput(event.start);
    this.newEventEnd = formatForInput(event.end || event.start); // End kann null sein bei Moment-Events
    this.newEventRecurrence = ''; // Wiederholungserkennung ist komplex, lassen wir erstmal leer

    this.showModal = true;
  }

  static styles = calendarStyles;
}
