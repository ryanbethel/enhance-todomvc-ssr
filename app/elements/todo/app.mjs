export default function TodoApp({ html }) {
  return html`
    <style>

    </style>
      <section class="todoapp">
        <slot name="header"></slot>
        <slot name="list"></slot>
        <slot name="footer"></slot>
      </section>
    `
}
