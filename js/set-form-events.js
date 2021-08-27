export function setFormEvents() {
  const form = document.getElementById('form');
  form.onsubmit = formOnSubmit;

  function formOnSubmit(e) {
    e.preventDefault();
    console.log(e.timeStamp);

    const input = document.getElementById('input');

    const taskList = document.querySelector('.tasks-container ul');
    taskList.insertAdjacentHTML(
      'afterbegin',
      `<li class="opace">
        <div class="task-container">
          <div class="checkbox">
            <img src="img/icon-check.svg" alt="check icon" />
          </div>
          <div class="task">${input.value}</div>
        </div>
        <div class="cross-icon">
          <img src="img/icon-cross.svg" alt="cross icon" />
        </div>
      </li>`
    );

    // remove opace class for the fade in effect, not working w/out delay
    setTimeout(() => (document.querySelector('.opace').className = ''));

    // remove value from the input
    input.value = '';
  }
}
