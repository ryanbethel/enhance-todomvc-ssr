export default function TodoApp({ html }) {
  return html`
    <style>
section.todoapp {
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

input::placeholder {
	font-style: italic;
	font-weight: 400;
	color: rgba(0, 0, 0, 0.4);
}


    </style>
      <section class="todoapp">
        <slot name="header"></slot>
        <slot name="list"></slot>
        <slot name="footer"></slot>
      </section>
    `
}
