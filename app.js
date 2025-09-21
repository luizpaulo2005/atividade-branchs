'use strict';

// Estado básico; recursos avançados virão por branches de feature
const state = {
  tasks: []
};

function render(tasks = state.tasks) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  for (const t of tasks) {
    const li = document.createElement('li');
    li.className = 'todo' + (t.completed ? ' completed' : '');
    li.dataset.id = t.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!t.completed;
    checkbox.addEventListener('change', () => {
      const id = li.dataset.id;
      const idx = state.tasks.findIndex(x => x.id === id);
      if (idx >= 0) {
        state.tasks[idx].completed = checkbox.checked;
        li.classList.toggle('completed', checkbox.checked);
      }
    });

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = t.title;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'icon';
    editBtn.textContent = 'Editar';
    editBtn.disabled = true; // habilitado na feature correspondente

    const delBtn = document.createElement('button');
    delBtn.className = 'icon danger';
    delBtn.textContent = 'Excluir';
    delBtn.addEventListener('click', () => {
      const id = li.dataset.id;
      const idx = state.tasks.findIndex(x => x.id === id);
      if (idx >= 0) {
        state.tasks.splice(idx, 1);
        li.remove();
      }
    });

    actions.append(editBtn, delBtn);
    li.append(checkbox, title, actions);
    list.appendChild(li);
  }
}

function setup() {
  const form = document.getElementById('todo-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('new-task');
    const title = (input.value || '').trim();
    if (!title) {
      input.focus();
      return;
    }
    const task = { id: crypto.randomUUID(), title, completed: false };
    state.tasks.push(task);
    input.value = '';
    render();
    input.focus();
  });

  const filters = document.querySelector('.filters');
  filters.addEventListener('click', (e) => {
    if (e.target.matches('button[data-filter]')) {
      const filter = e.target.getAttribute('data-filter');
      // Implementação virá na branch feature/filter-tasks
    }
  });

  render();
}

document.addEventListener('DOMContentLoaded', setup);
