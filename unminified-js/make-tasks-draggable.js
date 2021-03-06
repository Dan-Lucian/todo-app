import {
  doc,
  updateDoc,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

export function makeTasksDraggable() {
  const draggable = event.target.closest('.draggable');
  if (!draggable) return;

  //prevent mousedown selection behavior
  event.preventDefault();

  // prevent browser default image dragging
  document.ondragstart = function () {
    return false;
  };

  // create placeholder
  const placeholder = document.createElement('li');

  // set a pointermove event after 300ms
  const timerId = setTimeout(() => {
    // remove event that was looking for mouse leaving the container
    document.removeEventListener(
      'pointermove',
      setHandlerToCheckForMouseLeavingContainer
    );

    // create and replace with a placeholder
    placeholder.className = 'task-row task-placeholder';
    placeholder.style.height = height + 'px';
    draggable.replaceWith(placeholder);

    document.addEventListener('pointermove', onPointerMove);

    // append to body for coords to work correctly + absolute
    document.body.append(draggable);

    draggable.style.width = width + 'px';
    draggable.style.height = height + 'px';
    draggable.style.left = left;
    draggable.style.top = top;
    draggable.style.position = 'absolute';
  }, 300);

  const initialY = event.pageY;
  let lastTop;

  // get shift coords and dimensions
  const draggableRect = draggable.getBoundingClientRect();
  const shiftX = event.clientX - draggableRect.left;
  const shiftY = event.clientY - draggableRect.top;
  const width = draggableRect.width;
  const height = draggableRect.height;
  const left = event.pageX - shiftX + 'px';
  const top = event.pageY - shiftY + 'px';

  // measure once draggable and remember it's coords
  // then check for mouse leaving those boundaries
  let wasMeasured;
  let contLeft;
  let contRight;
  let contTop;
  let contBottom;
  document.addEventListener(
    'pointermove',
    setHandlerToCheckForMouseLeavingContainer
  );

  // disable all internal events on pointerup
  document.addEventListener('pointerup', onPointerUp);

  function onPointerMove() {
    let left = event.pageX - shiftX;
    let top = event.pageY - shiftY;

    // you already have height/width
    // refactor here
    const elemHeight = draggable.offsetHeight;
    const elemWidth = draggable.offsetWidth;
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
    if (left > htmlWidth - elemWidth) left = htmlWidth - elemWidth;
    if (top < scrollTop) top = scrollTop;
    if (top + elemHeight > htmlBottom) top = htmlBottom - elemHeight;

    // checking if the element is touching top/bottom window border
    // + if there is enough space for scrolling, 20 = pixel scroll
    if (top === scrollTop && scrollTop >= 20) {
      window.scrollBy(0, -20);
      top = top - 20;
    }

    if (
      top === htmlBottom - elemHeight &&
      document.documentElement.scrollHeight - htmlBottom >= 20
    ) {
      window.scrollBy(0, 20);
      top = top + 20;
    }

    draggable.style.top = top + 'px';
    draggable.style.left = left + 'px';
  }

  function setHandlerToCheckForMouseLeavingContainer() {
    if (!wasMeasured) {
      contLeft = draggableRect.left;
      contRight = draggableRect.right;
      contTop = draggableRect.top;
      contBottom = draggableRect.bottom;
      wasMeasured = true;
    }

    const pointerX = event.clientX;
    const pointerY = event.clientY;

    if (
      pointerX < contLeft ||
      pointerX > contRight ||
      pointerY < contTop ||
      pointerY > contBottom
    ) {
      //dipatch a pointerup which then will cancel the timout
      document.dispatchEvent(new Event('pointerup'));

      // remove event that was looking for mouse leaving the container
      document.removeEventListener(
        'pointermove',
        setHandlerToCheckForMouseLeavingContainer
      );
    }
  }

  // cancel timeout + remove events
  function onPointerUp() {
    clearTimeout(timerId);
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    document.removeEventListener(
      'pointermove',
      setHandlerToCheckForMouseLeavingContainer
    );

    // if placeholder exists means that an element was lifted
    if (placeholder.classList.contains('task-row')) {
      swapOrder(draggable, placeholder);

      placeholder.replaceWith(draggable);
      placeholder.remove();
      draggable.style.cssText = '';
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
