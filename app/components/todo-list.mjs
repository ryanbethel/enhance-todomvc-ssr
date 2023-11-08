/* globals customElements */
import CustomElement from '@enhance/custom-element'
import API from '../browser/api.mjs'
const api = API()


export default class TodoList extends CustomElement  {
  constructor(){
    super()
    this.api = api
  }

  connectedCallback(){
    this.update = this.update.bind(this)
    this.toggle = this.toggle.bind(this)
    this.section = this.querySelector('section')
    this.list = this.querySelector('ul.todo-list')
    this.toggleBtn = this.querySelector('button.toggle-all')
    this.api.subscribe(this.update,['todos', 'filter'])
    this.toggleBtn.addEventListener('click', this.toggle)
  }

  disconnectedCallback(){
    this.toggleBtn.removeEventListener('click', this.toggle)
  }

  update(){
    let filter = this.api.store.filter
    this.section.style.display = this.api.store.todos.length > 0 ? 'block' : 'none'
    let items = filter === 'all' ? this.api.store.todos : this.api.store[filter]
    this.list.innerHTML = items.map(todo => `
      <li id="${todo.key}" >
        <todo-item  class="todo" key="${todo.key}" completed="${todo.completed}" task="${todo.task}"></todo-item>
      </li>
    `).join('')
  }

  toggle(event) {
    event.preventDefault()
    this.api.toggle()
  }

  render({html,state}){
    const { store ={}} = state
    const { todos =[]} = store

    const display = todos.length ? 'block' : 'none'

    const listItems = todos.map(todo => `
      <li id="${todo.key}" >
      <todo-item class="todo" key="${todo.key}" completed="${todo.completed}" task="${todo.task}"></todo-item>
      </li>
      `).join('')

    return html`
    <style>

    .todo-list li .toggle + button {
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
      background-repeat: no-repeat;
      background-position: center left;
    }
    .todo-list li .toggle:checked + button {
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
    }
    .todo-list li button {
      overflow-wrap: break-word;
      padding: 15px 15px 15px 60px;
      display: block;
      line-height: 1.2;
      transition: color 0.4s;
      font-weight: 400;
      color: #484848;
    }
    button.edit-task.edit-task {
      display: none;
    }




.main {
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
}

.toggle-all {
	width: 1px;
	height: 1px;
	border: none; /* Mobile Safari */
	opacity: 0;
	position: absolute;
	right: 100%;
	bottom: 100%;
}

.toggle-all + label {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 45px;
	height: 65px;
	font-size: 0;
	position: absolute;
	top: -65px;
	left: -0;
}

.toggle-all + label:before {
	content: '❯';
	display: inline-block;
	font-size: 22px;
	color: #949494;
	padding: 10px 27px 10px 27px;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.toggle-all:checked + label:before {
	color: #484848;
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.todo-list li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
	border-bottom: none;
}

.todo-list li.editing {
	border-bottom: none;
	padding: 0;
}

.todo-list li.editing .edit {
	display: block;
	width: calc(100% - 43px);
	padding: 12px 16px;
	margin: 0 0 0 43px;
}


.todo-list li .toggle {
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}

.todo-list li .toggle {
	opacity: 0;
}

.todo-list li .toggle + label {
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
	background-repeat: no-repeat;
	background-position: center left;
}

.todo-list li .toggle:checked + label {
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
}

.todo-list li label {
	overflow-wrap: break-word;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
	font-weight: 400;
	color: #484848;
}

.todo-list li.completed label {
	color: #949494;
	text-decoration: line-through;
}

.todo-list li .destroy {
	/* display: none; */
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #949494;
	transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover,
.todo-list li .destroy:focus {
	color: #C18585;
}

.todo-list li .destroy:after {
	content: '×';
	display: block;
	height: 100%;
	line-height: 1.1;
}

.todo-list li:hover .destroy {
	display: block;
}


.todo-list li.editing:last-child {
	margin-bottom: -1px;
}

    </style>
    <section class="main" style="display: ${display};">
      <form action="/todos/toggle" method="POST">
        <button id="toggle-all" type="submit" class="toggle-all"></button>
        <label for="toggle-all">Mark all as complete</label>
      </form>
      <ul class="todo-list">
        ${listItems}
      </ul>
    </section>
    `
  }
}

customElements.define('todo-list', TodoList)
