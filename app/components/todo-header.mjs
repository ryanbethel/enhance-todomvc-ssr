/* globals customElements */
import CustomElement from '@enhance/custom-element'
import API from '../browser/api.mjs'
const api = API()


export default class TodoHeader extends CustomElement  {
  constructor(){
    super()
    this.api = api
  }

  connectedCallback(){
    this.form = this.querySelector('form')
    this.addNewTask = this.addNewTask.bind(this)
    this.form.addEventListener('submit', this.newTask)
  }

  addNewTask(event){
    event.preventDefault()
    this.api.create(this.form)
    this.form.reset()
  }

  render({html}){

    return html`
  <style>
  </style>
  <header class="header">
    <h1>todos</h1>
    <form action="/todos" method="POST">
      <input autofocus="autofocus" autocomplete="off" placeholder="What needs to be done?" name="task" class="new-todo">
    </form>
  </header>
    `
  }
}

customElements.define('todo-header', TodoHeader)
