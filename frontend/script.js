const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
  const taskName = taskInput.value;
  if (taskName) {
    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: taskName }),
    })
    .then((response) => response.json())
    .then((task) => {
      taskInput.value = '';
      loadTasks();
    })
    .catch((error) => console.error('Error:', error));
  }
});

const modal = document.getElementById('modal');
const modalText = document.getElementById('modalText');
const closeModal = document.getElementById('closeModal');

const openModal = (text) => {
  modalText.textContent = text;
  modal.style.display = 'flex';
};

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

const loadTasks = () => {
  fetch('http://localhost:3000/api/tasks')
    .then((response) => response.json())
    .then((tasks) => {
      taskList.innerHTML = '';
      tasks.forEach((task) => {
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.disabled = task.completed;
        checkbox.addEventListener('change', () => {
          fetch(`http://localhost:3000/api/tasks/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ completed: checkbox.checked }),
            headers: { 'Content-Type': 'application/json' },
          })
          .then(() => loadTasks());
        });

        const taskText = document.createElement('span');
        taskText.textContent = task.name;
        taskText.title = task.name;
        if (task.completed) {
          taskText.classList.add('completed');
        }

        taskText.addEventListener('click', () => openModal(task.name));

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          fetch(`http://localhost:3000/api/tasks/${task.id}`, {
            method: 'DELETE',
          })
          .then(() => loadTasks());
        });

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    });
};

loadTasks();
