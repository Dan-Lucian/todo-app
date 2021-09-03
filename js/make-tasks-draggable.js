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

  // these styles won't affect the element if position absolute won't be set
  draggable.style.left = event.pageX - shiftX + 'px';
  draggable.style.top = event.pageY - shiftY + 'px';
  draggable.style.width = width + 'px';
  draggable.style.height = height + 'px';

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
    if (placeholder) {
      placeholder.replaceWith(draggable);
      placeholder.remove();
      draggable.style.cssText = '';

      swapOrderInDb(draggable);
    }
  }
}

function swapOrderInDb(draggable, placeholder) {
  // addition dataset-order for both sibling of placeholder and divide by 2
  // new value assign to draggabnle.dataset.order
}
