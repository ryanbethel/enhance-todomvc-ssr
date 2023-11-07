import CustomElement from '@enhance-labs/custom-element'
import MorphdomMixin from '@enhance/morphdom-mixin'
import API from '../browser/api.mjs'
const api = API()


export default class TodoItem extends MorphdomMixin(CustomElement)  {
// export default class TodoItem extends CustomElement  {
  constructor(){
    super()
    this.api = api
  }

  connectedCallback(){
    this.updateForm = this.querySelector('form.update-todo')
    this.completed = this.querySelector('form.update-todo input[name=completed]')
    this.task = this.querySelector('form.update-todo input[name=task]')
    this.update = this.update.bind(this)
    this.setComplete = this.querySelector('button.set-complete')
    this.destroy = this.destroy.bind(this)
    this.deleteForm = this.querySelector('form.delete-todo')
    this.updateFormKeyInput = this.querySelector('form.update-todo input[name=key]')
    this.destroyFormKeyInput = this.querySelector('form.delete-todo input[name=key]')
    this.task.addEventListener('blur', this.update)
    this.deleteForm.addEventListener('submit', this.destroy)
    this.updateForm.addEventListener('submit', this.update)
  }

  destroy(event){
    event.preventDefault()
    this.api.destroy(this.deleteForm)
  }

  static get observedAttributes() {
    return ['key', 'completed', 'task' ]
  }

  // keyChanged(value){
  //   this.updateFormKeyInput.value = value
  //   this.destroyFormKeyInput.value = value
  //   this.setComplete.setAttribute('formaction', `/todos/${value}?toggle`)
  //   this.deleteForm.setAttribute('action', `/todos/${value}/delete`)
  //   this.updateForm.setAttribute('action', `/todos/${value}`)
  // }
  // completedChanged(value){
  //   this.completed.checked = value === 'true'
  //   if (value) this.completed.setAttribute('checked','')
  //   if (!value) this.completed.removeAttribute('checked')
  // }
  // taskChanged(value){
  //   this.task.value = value
  // }

  update(event){
    console.log('update', event)
    event.preventDefault()
    if (event.submitter === this.setComplete) {
      this.completed.checked = !this.completed?.checked
    } 
    this.api.update(this.updateForm)
  }
  
  render({html,state}){
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
  <form  action="/todos/${key}" class=" update-todo " method="POST" >
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
}

customElements.define('todo-item', TodoItem)
