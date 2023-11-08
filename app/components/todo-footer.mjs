/* globals customElements, document */
import CustomElement from '@enhance/custom-element'
import API from '../browser/api.mjs'
const api = API()


export default class TodoFooter extends CustomElement  {
  constructor(){
    super()
    this.api = api
    const params = new URLSearchParams(document.location.search)
    const initialFilter = params.get("filter")
    this.api.store.initialize({filter:initialFilter || 'all'})
  }

  connectedCallback() {
    this.footer = this.querySelector('footer')
    this.counter = this.querySelector('strong')
    this.filters = this.querySelector('ul.filters')
    this.button = this.querySelector('button')
    this.clearCompleted = this.querySelector('button.clear-completed')

    this.handleIntercept = this.handleIntercept.bind(this)
    this.update = this.update.bind(this)
    this.clear = this.clear.bind(this)
    this.api.subscribe(this.update, [ 'active', 'completed', 'todos' ])

    this.filters.addEventListener('click', this.handleIntercept)
    this.filters.addEventListener('keydown', this.handleIntercept)
    this.clearCompleted.addEventListener('click', this.clear)
  }

  disconnectedCallback() {
    this.filters.removeEventListener('click', this.handleIntercept)
    this.filters.removeEventListener('keydown', this.handleIntercept)
    this.clearCompleted.removeEventListener('click', this.clear)
  }

  update(data) {
    let { active = [], completed = [], todos = [] } = data
    this.counter.innerText = active.length
    this.footer.style.display = todos.length > 0 ? 'block' : 'none'
    this.button.style.display = completed.length > 0 ? 'block' : 'none'
  }

  clear(event) {
    event.preventDefault()
    this.api.clear()
  }

  handleIntercept(event) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
      event.preventDefault()
      let list = Array.from(this.filters.querySelectorAll('a'))
      list.map(anchor => {
        anchor === event.target ? anchor.classList.add('selected') : anchor.classList.remove('selected')
      })
      const url = new URL(event.target.href);
      const filter = url.searchParams.get("filter") || 'all'
      this.api.store.filter = filter
    }
  }

  render({html,state}){
    const { store = {} } = state
    const { todos = [], active = [], completed = [], filter = 'all' } = store
    const display = (todos.length || active.length || completed.length) ? 'block' : 'none'

    return html`
<style>

footer.footer {
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	font-size: 15px;
	border-top: 1px solid #e6e6e6;
}

footer.footer:before {
	content: '';
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 50px;
	overflow: hidden;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
	            0 8px 0 -3px #f6f6f6,
	            0 9px 1px -3px rgba(0, 0, 0, 0.2),
	            0 16px 0 -6px #f6f6f6,
	            0 17px 2px -6px rgba(0, 0, 0, 0.2);
}


.todo-count {
	float: left;
	text-align: left;
}

.todo-count strong {
	font-weight: 300;
}

.filters {
	margin: 0;
	padding: 0;
	list-style: none;
	position: absolute;
	right: 0;
	left: 0;
}

.filters li {
	display: inline;
}

.filters li a {
	color: inherit;
	margin: 3px;
	padding: 3px 7px;
	text-decoration: none;
	border: 1px solid transparent;
	border-radius: 3px;
}

.filters li a:hover {
	border-color: #DB7676;
}

.filters li a.selected {
	border-color: #CE4646;
}

.clear-completed,
html .clear-completed:active {
	float: right;
	position: relative;
	line-height: 19px;
	text-decoration: none;
	cursor: pointer;
}

.clear-completed:hover {
	text-decoration: underline;
}

</style>
  <footer class="footer" style="display: ${display};">
    <span class="todo-count"><strong>${active.length}</strong> items left</span>
    <ul class="filters">
      <li><a href="/todos" class="${filter === 'all' ? 'selected' : ''}">All</a></li>
      <li><a href="/todos?filter=active" class="${filter === 'active' ? 'selected' : ''}">Active</a></li>
      <li><a href="/todos?filter=completed" class="${filter === 'completed' ? 'selected' : ''}">Completed</a></li>
    </ul>
    <form action="/todos/completed/delete" method="POST">
      <button class="clear-completed" style="display: ${completed.length ? 'block' : 'none'};">Clear completed</button>
    </form>
  </footer>
    `
  }
}

customElements.define('todo-footer',TodoFooter)
