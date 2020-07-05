// untuk menginisialisasi data todo nya
let todos = []

// untuk konfigurasi filter
const filters = {
  searchText: '',
  hideCompleted: false,
}

const todosJSON = localStorage.getItem('todos')

if (todosJSON !== null) {
  todos = JSON.parse(todosJSON)
}


// fungsi untuk render todo
const renderTodos = function (todos, filter) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.done

    return searchTextMatch && hideCompletedMatch
  })
  
  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.done
  })

  document.querySelector('#todos').innerHTML = ''
  document.querySelector('#summary-todo').innerHTML = ''

  const sisaTodo = document.createElement('h2')
  sisaTodo.textContent = `Sisa todo kamu ${incompleteTodos.length} lagi`
  document.querySelector('#summary-todo').appendChild(sisaTodo)

  // filteredTodos.forEach(todo => {
  //   const p = document.createElement('p')
  //   p.textContent = todo.text
  //   document.querySelector('#todos').appendChild(p)
  // });

  let html = ''
  filteredTodos.forEach(function (todo) {
    html += `
      <div class="todo-list">
        <div class="todo-text">${todo.text}</div>
        <div class="btn-group">
          ${!todo.done ? `<button onClick="handleDone(${todo.id})">Done</button>` : ``}
          <button onClick="handleDelete(${todo.id})">Delete</button>
        </div>
      </div>
    `
  })
  document.querySelector('#todos').innerHTML = html
}

renderTodos(todos)

// ini untuk fungsi add todo
document.querySelector('#new-todo').addEventListener('submit', function (event) {
  event.preventDefault()
  todos.push({
    id: todos.length + 1,
    text: event.target.elements.todo.value,
    done: false
  })
  console.log(todos)
  localStorage.setItem('todos', JSON.stringify(todos))

  renderTodos(todos, filters)

  event.target.elements.todo.value = ''
})

// ini fungsi untuk search Todo
document.querySelector('#search-text').addEventListener('input', function (event) {
  filters.searchText = event.target.value

  renderTodos(todos, filters)
})

// ini fungsi untuk hide todo
document.querySelector('#hide-completed').addEventListener('change', function (event) {
  filters.hideCompleted = event.target.checked

  renderTodos(todos, filters)
})

const handleDone = (id) => {
  const findTodo = todos.find((val) => val.id === id)
  findTodo.done = true
  localStorage.setItem('todos', JSON.stringify(todos))

  renderTodos(todos, filters)
}

const handleDelete = (id) => {
  const deletedTodo = todos.filter((val) => val.id !== id)
  todos = deletedTodo
  localStorage.setItem('todos', JSON.stringify(todos))

  renderTodos(todos, filters)
}