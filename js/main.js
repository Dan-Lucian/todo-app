'use strict';

// make filter buttons actually filter
import { setHandlersForFilterButtons } from './set-filter-events.js';
setHandlersForFilterButtons();

// set handlers for checkbox, cross icon, clear tasks
import { setBigContainerPointerdownEvents } from './set-pointerdown-events.js.js';
setBigContainerPointerdownEvents();

// set events for the form + create task from input
import { setFormEvents } from './set-form-events.js';
setFormEvents();

document.getElementById('button').onclick = function () {
  document.querySelector('.tasks-container').classList.toggle('grow');
};
