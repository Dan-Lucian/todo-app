'use strict';

// generate todo list when page loads
// import { generateList } from './generate-list.js';
// generateList();

// make filter buttons actually filter
import { setHandlersForFilterButtons } from './set-filter-events.js';
setHandlersForFilterButtons();

// set handlers for checkbox, cross icon, clear tasks
import { setBigContainerPointerdownEvents } from './set-pointerdown-events.js.js';
setBigContainerPointerdownEvents();

// set events for the form + create task from input
import { setFormEvents } from './set-form-events.js';
setFormEvents();
