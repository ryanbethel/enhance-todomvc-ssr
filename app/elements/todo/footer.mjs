export default function TodoFooter({ html, state }) {
  const { store } = state
  const { todos } = store
  const display = todos.length ? 'block' : 'none'

  return html`
<style>
.footer {
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	font-size: 15px;
	border-top: 1px solid #e6e6e6;
}

.footer:before {
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

.todo-count {
	float: left;
	text-align: left;
}

.todo-count strong {
	font-weight: 300;
}


</style>
  <footer class="footer" style="display: ${display};">
    <span class="todo-count"><strong>${todos.length}</strong> items left</span>
    <ul class="filters">
      <li><a href="#/all" class="selected">All</a></li>
      <li><a href="#/active" class="">Active</a></li>
      <li><a href="#/completed" class="">Completed</a></li></ul>
      <button class="clear-completed" style="display: none;">Clear completed</button>
  </footer>
    `
}
