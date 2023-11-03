import CustomElement from '@enhance-labs/custom-element'
import API from '../browser/api.mjs'
const api = API()


export default class TodoList extends CustomElement  {
  constructor(){
    super()
    this.api = api
    this.update = this.update.bind(this)
    this.list = this.querySelector('ul.todo-list')
    this.api.subscribe(this.update,['todos','filter'])
  }

  update(values){
    let {todos, filter} = values
    if (!filter) filter = this.api.store.filter
    if (!todos) todos = this.api.store.todos

    const listItems = todos.filter(todo=>{
      if (filter==='active'){
        return !todo.completed
      } else if (filter==='completed'){
        return todo.completed
      } else {
        return true
      }
    }).map(todo => `
      <li id="${todo.key}" >
      <todo-item class="todo" key="${todo.key}" completed="${todo.completed}" task="${todo.task}"></todo-item>
      </li>
    `).join('')

    this.list.innerHTML = listItems
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

    </style>
    <section class="main" style="display: ${display};">
      <input id="toggle-all" type="checkbox" class="toggle-all">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        ${listItems}
      </ul>
    </section>
    `
  }
}
 
customElements.define('todo-list', TodoList)
