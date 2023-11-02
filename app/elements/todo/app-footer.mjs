export default function TodoAppFooter({ html }) {
  return html`
<style>
  :host {
    display:none;
  }
</style>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>Written by the <a href="https://enhance.dev">Enhance Team</a></p>
            <p>Part of <a href="https://todomvc.com">TodoMVC</a></p>
        </footer>
    `
}
