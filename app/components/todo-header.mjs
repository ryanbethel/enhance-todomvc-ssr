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

  disconnectedCallback() {
    this.form.removeEventListener('submit', this.newTask)
  }

  addNewTask(event){
    event.preventDefault()
    this.api.create(this.form)
    this.form.reset()
  }

  render({html}){

    return html`
  <style>
.new-todo {
	position: relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
}

.new-todo {
	padding: 16px 16px 16px 60px;
	height: 65px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

h1 {
	position: absolute;
	top: -140px;
	width: 100%;
	font-size: 80px;
	font-weight: 200;
	text-align: center;
	color: #b83f45;
	text-rendering: optimizeLegibility;
}
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
