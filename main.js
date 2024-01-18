document.addEventListener('DOMContentLoaded', () => {
      const taskForm = document.getElementById('taskForm');
      const taskInput = document.getElementById('taskInput');
      const taskList = document.getElementById('taskList');
    
      // Cargar tareas almacenadas en localStorage al inicio
      loadTasks();
    
      // Agregar evento al formulario para agregar tareas
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
      });
    
      // Función para agregar una tarea
      function addTask(description) {
        const task = {
          id: new Date().getTime(),
          description,
          completed: false,
        };
    
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    
        // Guardar la tarea en localStorage
        saveTask(task);
    
        // Scroll automático hacia la nueva tarea
        taskElement.scrollIntoView({ behavior: 'smooth' });
      }
    
      // Función para crear el elemento HTML de una tarea
      function createTaskElement(task) {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${task.description}</span>
          <button onclick="completeTask(${task.id})">Completar</button>
          <button onclick="deleteTask(${task.id})">Eliminar</button>
        `;
        li.style.backgroundColor = task.completed ? '#bdc3c7' : '#ecf0f1';
        li.id = task.id; // Agregar ID para referencia fácil
        return li;
      }
    
      // Función para completar una tarea
      window.completeTask = function (taskId) {
        const taskElement = document.getElementById(taskId);
        const task = getTaskById(taskId);
    
        if (task) {
          task.completed = !task.completed;
          taskElement.style.backgroundColor = task.completed ? '#bdc3c7' : '#ecf0f1';
    
          // Actualizar la tarea en localStorage
          updateTask(task);
        }
      };
    
      // Función para eliminar una tarea
      window.deleteTask = function (taskId) {
        const taskElement = document.getElementById(taskId);
        taskElement.remove();
    
        // Eliminar la tarea de localStorage
        deleteTaskById(taskId);
      }
    
      // Función para cargar tareas almacenadas en localStorage
      function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
    
        if (storedTasks) {
          const tasks = JSON.parse(storedTasks);
          tasks.forEach((task) => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
          });
        }
      }
    
      // Función para guardar una tarea en localStorage
      function saveTask(task) {
        const storedTasks = localStorage.getItem('tasks');
        let tasks = [];
    
        if (storedTasks) {
          tasks = JSON.parse(storedTasks);
        }
    
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    
      // Función para actualizar una tarea en localStorage
      function updateTask(updatedTask) {
        const storedTasks = localStorage.getItem('tasks');
    
        if (storedTasks) {
          let tasks = JSON.parse(storedTasks);
          tasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          );
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      }
    
      // Función para obtener una tarea por su ID
      function getTaskById(taskId) {
        const storedTasks = localStorage.getItem('tasks');
    
        if (storedTasks) {
          const tasks = JSON.parse(storedTasks);
          return tasks.find((task) => task.id === taskId);
        }
    
        return null;
      }
    
      // Función para eliminar una tarea por su ID
      function deleteTaskById(taskId) {
        const storedTasks = localStorage.getItem('tasks');
    
        if (storedTasks) {
          let tasks = JSON.parse(storedTasks);
          tasks = tasks.filter((task) => task.id !== taskId);
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      }
    });