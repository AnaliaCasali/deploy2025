import { Component , signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from '../event-calendar/event-utils';
import esLocale from '@fullcalendar/core/locales/es'

@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule],
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css'],
})
export class EventCalendarComponent {
   calendarVisible = signal(true);
   calendarOptions = signal<CalendarOptions>({

    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next',//, today
      center: 'title',
      right: 'dayGridMonth,listWeek' // '//,timeGridWeek,timeGridDay
    },
    initialView: 'dayGridMonth',
    locales: [esLocale], // Configura el idioma
    locale: 'es', // Establece el idioma por defecto
    editable: true,
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Título del Evento:');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Desea borrar el evento? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

}
