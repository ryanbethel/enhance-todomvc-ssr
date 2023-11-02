export default function TodoHeader({ html }) {
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

