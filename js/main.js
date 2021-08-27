'use strict';

// make filter buttons actually filter
import { setHandlersForFilterButtons } from './set-handlers-for-filter-buttons.js';
setHandlersForFilterButtons();

// make checkbox clickable
import { bigContainerPointerdown } from './tasks-container-pointerdown.js.js';
bigContainerPointerdown();

// move tasks-filter element at screen > 420px
import { setMediaQueries } from './set-media-queries.js';
setMediaQueries();

// set events for the form + task creation
import {setFormEvents} from './set-form-events.js';
setFormEvents()
