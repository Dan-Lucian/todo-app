'use strict';
import {
  doc,
  updateDoc,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

export function makeMobileDraggable() {
  const draggable = event.target.closest('.draggable');
  if (!draggable) return;

  // if there is a placeholder then other task is being dragged now
  if (draggable.parentElement.querySelector('.task-placeholder')) return;

  //prevent mousedown selection behavior
  event.preventDefault();

  // prevent browser default image dragging
  document.ondragstart = function () {
    return false;
  };

  const arrow = event.target;
  arrow.classList.add('rotate-180');

  // get shift coords and dimensions
  const draggableRect = draggable.getBoundingClientRect();
  const shiftX = event.clientX - draggableRect.left;
  const shiftY = event.clientY - draggableRect.top;
  const width = draggableRect.width;
  const height = draggableRect.height;

  // created here because other function use placeholder
  const placeholder = document.createElement('li');
  replaceWithPlaceholder();
  function replaceWithPlaceholder() {
    placeholder.className = 'task-row task-placeholder';
    placeholder.style.height = height + 'px';

    draggable.style.left = event.pageX - shiftX + 'px';
    draggable.style.top = event.pageY - shiftY + 'px';
    draggable.style.width = width + 'px';
    draggable.style.height = height + 'px';
    draggable.replaceWith(placeholder);

    // append to body for coords to work correctly + absolute
    document.body.append(draggable);
    draggable.style.position = 'absolute';
    draggable.classList.add('remove-touch-action');
  }

  const initialY = event.pageY;
  let lastTop;

  // pointerdown because elem taken outside of container handler
  draggable.addEventListener('pointerdown', onPointerDown);
  function onPointerDown(e) {
    if (e.target === e.currentTarget.querySelector('.lift-release-icon')) {
      swapOrder(draggable, placeholder);

      placeholder.replaceWith(draggable);
      placeholder.remove();
      draggable.style.cssText = '';
      draggable.classList.remove('remove-touch-action');
      arrow.classList.remove('rotate-180');

      document.removeEventListener('pointermove', onPointerMove);
      draggable.removeEventListener('pointerup', onPointerUp);
      draggable.removeEventListener('pointerdown', onPointerDown);

      return;
    }

    // new value for the new pointerdown event
    const draggableRect = draggable.getBoundingClientRect();
    const shiftX = event.clientX - draggableRect.left;
    const shiftY = event.clientY - draggableRect.top;

    // pointer move event
    document.addEventListener('pointermove', onPointerMove);
    function onPointerMove() {
      // left & top for every pointer move
      let left = event.pageX - shiftX;
      let top = event.pageY - shiftY;

      const scrollTop = document.documentElement.scrollTop;
      const htmlWidth = document.documentElement.clientWidth;
      const htmlBottom = document.documentElement.clientHeight + scrollTop;

      insertPlaceholder(placeholder, top, height);
      function insertPlaceholder(placeholder, nowTop, height) {
        if (!lastTop) {
          lastTop = initialY - shiftY;
        }

        const yDif = lastTop - nowTop;

        if (yDif > height / 2 && placeholder.previousElementSibling) {
          placeholder.previousElementSibling.before(placeholder);
          lastTop -= height;
        }

        if (
          yDif < -height / 2 &&
          placeholder.nextElementSibling &&
          !placeholder.nextElementSibling.classList.contains('tasks-status')
        ) {
          placeholder.nextElementSibling.after(placeholder);
          lastTop += height;
        }
      }

      //checking if the element crosses any window border
      // if it does then readjust it to match the maximum allowed
      if (left < 0) left = 0;
      if (left > htmlWidth - width) left = htmlWidth - width;
      if (top < scrollTop) top = scrollTop;
      if (top + height > htmlBottom) top = htmlBottom - height;

      // checking if the element is touching top/bottom window border
      // + if there is enough space for scrolling, 20 = pixel scroll
      if (top === scrollTop && scrollTop >= 20) {
        window.scrollBy(0, -20);
        top = top - 20;
      }

      if (
        top === htmlBottom - height &&
        document.documentElement.scrollHeight - htmlBottom >= 20
      ) {
        window.scrollBy(0, 20);
        top = top + 20;
      }

      draggable.style.top = top + 'px';
      draggable.style.left = left + 'px';
    }

    //pointer up event
    draggable.addEventListener('pointerup', onPointerUp);
    function onPointerUp(e) {
      document.removeEventListener('pointermove', onPointerMove);
    }
  }
}

function swapOrder(draggable, placeholder) {
  const previous = placeholder.previousElementSibling;
  const next = placeholder.nextElementSibling;

  if (!previous) {
    const order = +next.dataset.order / 2;

    draggable.dataset.order = order;
    updateDbOrder(order, draggable.dataset.id);
    return;
  }

  if (!next) {
    const order = +previous.dataset.order + 1;

    draggable.dataset.order = order;
    updateDbOrder(order, draggable.dataset.id);
    return;
  }

  const previousOrder = +previous.dataset.order;
  const nextOrder = +next.dataset.order;
  const order = (previousOrder + nextOrder) / 2;

  draggable.dataset.order = order;
  updateDbOrder(order, draggable.dataset.id);
}

async function updateDbOrder(ord, id) {
  const db = await getFirestore();
  const docRef = doc(db, 'todo-items', id);
  updateDoc(docRef, {
    order: ord,
  });
}
