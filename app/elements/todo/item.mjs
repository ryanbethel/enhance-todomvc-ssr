
export default function TodoItem({ html, state }) {
  const { attrs = {} } = state
  const { completed = '', key = '', task = '' } = attrs
  const checked = completed === 'true' ? 'checked' : ''

  return html`
<style>
.view {
  display:grid;
  grid-direction:row;
  grid-template-columns: 1fr 50px;
}
form.update-todo {
  display:grid;
  grid-direction:row; 
  grid-template-columns: 50px 1fr;
}
input.edit[name=task] {
  border: none;
  box-shadow: none;
}
button.destroy{
  display: block;
}
form .destroy:after {
    position: absolute;
    transform: translate(-50%, -50%);
}
</style>
<div class="view">
  <form action="/todos/${key}" class=" update-todo " method="POST" >
    <button class="edit-task hidden" type=submit >update</button> 
    <input class="hidden toggle" name="completed" type="checkbox" ${checked} >
    <button class="set-complete" type=submit formaction="/todos/${key}?toggle" aria-label="toggle complete"></button> 
    <input type="text" name="task" value="${task}" class="edit" >
    <input type="hidden" name="key" value="${key}">
  </form>

  <form class="delete-todo" action="/todos/${key}/delete" method="POST" >
    <input type="hidden" name="key" value="${key}">
    <button class="destroy"></button>
  </form>
</div>
  `
}
