export default function TodoFooter({ html, state }) {
  const { store } = state
  const { todos } = store
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
