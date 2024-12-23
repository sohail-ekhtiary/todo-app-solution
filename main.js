// DOM Elements
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompleted = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// State
let todos = [];
let currentFilter = 'all';
const sunIcon = document.querySelector('.sun');
const moonIcon = document.querySelector('.moon');

const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark-theme');

    // Update icons
    moonIcon.classList.toggle('hidden', isDark);
    sunIcon.classList.toggle('hidden', !isDark);
};


// Event Listeners
themeToggle.addEventListener('click', toggleTheme);

todoInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && todoInput.value.trim()) {
        addTodo(todoInput.value.trim());
        todoInput.value = '';
    }
});

clearCompleted.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    updateUI();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        updateUI();
    });
});

// Todo Functions
function addTodo(text) {
    todos.unshift({
        id: Date.now(),
        text,
        completed: false
    });
    updateUI();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        updateUI();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    updateUI();
}

function getFilteredTodos() {
    return todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });
}

function updateUI() {
    const filteredTodos = getFilteredTodos();

    // Update todo list
    todoList.innerHTML = '';
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="checkbox ${todo.completed ? 'checked' : ''}" data-id="${todo.id}"></div>
            <span>${todo.text}</span>
            <button class="delete-btn">
                <img src="images/icon-cross.svg" alt="Delete">
            </button>
        `;

        // Add event listeners
        const checkbox = li.querySelector('.checkbox');
        checkbox.addEventListener('click', () => toggleTodo(todo.id));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        todoList.appendChild(li);
    });

    // Update items count
    const activeTodos = todos.filter(todo => !todo.completed);
    itemsLeft.textContent = `${activeTodos.length} items left`;
}

updateUI();