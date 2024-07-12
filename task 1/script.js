document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector('.todo-input');
  const addButton = document.querySelector('.add-button');
  const todosContainer = document.querySelector('.todos');
  const filters = document.querySelectorAll('.filter');
  const deleteAllButton = document.querySelector('.delete-all');

  // Add a new task
  addButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      todoInput.value = '';
    }
  });

  // Function to add a task
  function addTask(taskText) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
      <span class="task-text">${taskText}</span>
      <button class="complete-button"><i class="fa fa-check-circle"></i></button>
      <button class="delete-button"><i class="fa fa-trash"></i></button>
    `;

    todosContainer.appendChild(todoItem);

    // Mark task as complete
    todoItem.querySelector('.complete-button').addEventListener('click', () => {
      todoItem.classList.toggle('completed');
    });

    // Delete task
    todoItem.querySelector('.delete-button').addEventListener('click', () => {
      todoItem.remove();
    });
  }

  // Filter tasks
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const filterType = filter.getAttribute('data-filter');
      filterTasks(filterType);
    });
  });

  // Function to filter tasks
  function filterTasks(filterType) {
    const todos = todosContainer.querySelectorAll('.todo-item');
    todos.forEach(todo => {
      switch (filterType) {
        case 'completed':
          if (todo.classList.contains('completed')) {
            todo.style.display = 'block';
          } else {
            todo.style.display = 'none';
          }
          break;
        case 'pending':
          if (!todo.classList.contains('completed')) {
            todo.style.display = 'block';
          } else {
            todo.style.display = 'none';
          }
          break;
        default:
          todo.style.display = 'block';
          break;
      }
    });
  }

  // Delete all tasks
  deleteAllButton.addEventListener('click', () => {
    todosContainer.innerHTML = '';
  });
});
