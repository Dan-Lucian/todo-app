'use strict';

// generate todo list
import { generateList } from './generate-list.js';
generateList();

// make filter buttons actually filter
import { setHandlersForFilterButtons } from './set-handlers-for-filter-buttons.js';
setHandlersForFilterButtons();

// make checkbox clickable
import { setBigContainerPointerdownEvents } from './set-big-container-pointerdown-events.js.js';
setBigContainerPointerdownEvents();

// move tasks-filter element at screen > 420px
import { setMediaQueries } from './set-media-queries.js';
setMediaQueries();

// set events for the form + create task from input
import { setFormEvents } from './set-form-events.js';
setFormEvents();

setTimeout(
  () => console.log(document.querySelector('.task-row').dataset['id']),
  1000
);
