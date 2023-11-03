import CustomElement from '@enhance-labs/custom-element'
import API from '../browser/api.mjs'
const api = API()


export default class TodoFooter extends CustomElement  {
  constructor(){
    super()
    this.api = api
    const params = new URLSearchParams(document.location.search)
    const initialFilter = params.get("filter") 
    this.api.store.initialize({filter:initialFilter || 'all'})

    this.handleIntercept = this.handleIntercept.bind(this)
    this.allAnchor = document.querySelector('a[href="/todos"]');
    this.completedAnchor = document.querySelector('a[href="/todos?filter=completed"]');
    this.activeAnchor = document.querySelector('a[href="/todos?filter=active"]');
    this.allAnchor.addEventListener('click', this.handleIntercept);
    this.allAnchor.addEventListener('keydown', this.handleIntercept);
    this.completedAnchor.addEventListener('keydown', this.handleIntercept);
    this.completedAnchor.addEventListener('click', this.handleIntercept);
    this.activeAnchor.addEventListener('click', this.handleIntercept);
    this.activeAnchor.addEventListener('keydown', this.handleIntercept);
  }

  handleIntercept(event) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
      event.preventDefault();
      const url = new URL(event.target.href);
      const filter = url.searchParams.get("filter") || 'all'
      this.api.store.filter = filter
      history.pushState({}, "", url);
    }
  }

  render({html,state}){
    const { store = {} } = state
    const { todos =[] } = store
    const display = todos.length ? 'block' : 'none'

    return html`
<style>

</style>
  <footer class="footer" style="display: ${display};">
    <span class="todo-count"><strong>${todos.length}</strong> items left</span>
    <ul class="filters">
      <li><a href="/todos" class="selected">All</a></li>
      <li><a href="/todos?filter=active" >Active</a></li>
      <li><a href="/todos?filter=completed" >Completed</a></li></ul>
      <form action="/todos/completed/delete" method="POST">
        <button class="clear-completed" >Clear completed</button>
      </form>
  </footer>
    `
  }
}

customElements.define('todo-footer',TodoFooter)
