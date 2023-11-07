export default function TodoAppFooter({ html }) {
  return html`
<style>
.info {
	margin: 65px auto 0;
	color: #4d4d4d;
	font-size: 11px;
	text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
	text-align: center;
}

.info p {
	line-height: 1;
}

.info a {
	color: inherit;
	text-decoration: none;
	font-weight: 400;
}

.info a:hover {
	text-decoration: underline;
}
</style>
    <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Written by the <a href="https://enhance.dev">Enhance Team</a></p>
        <p>Part of <a href="https://todomvc.com">TodoMVC</a></p>
    </footer>
    `
}
