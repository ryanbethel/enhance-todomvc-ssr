/* global Worker */
import Store from '@enhance/store'
import convertToNestedObject from '@begin/validator/src/convert-to-nested-object.js'
import formEncodingToSchema from '@begin/validator/src/form-encoding-to-schema.js'
import {Todo} from '../models/schemas/todo.mjs'



// API actions
const  CREATE  = 'create'
const  UPDATE  = 'update'
const  DESTROY = 'destroy'
const  LIST    = 'list'
const  CLEAR   = 'clear'
const  TOGGLE  = 'toggle'

const store = Store()

let worker
export default function API() {

  if (!worker) {
    worker =  new Worker('/_public/browser/worker.mjs')
    worker.onmessage = mutate

    initialize()
  }

  return {
    create,
    update,
    destroy,
    list,
    clear,
    toggle,
    store,
    subscribe: store.subscribe,
    unsubscribe: store.unsubscribe
  }
}

function initialize() {
  list()
}

function mutate(e) {
  const { data } = e
  const { result, type } = data
  switch (type) {
  case CREATE:
    createMutation(result)
    break
  case UPDATE:
    updateMutation(result)
    break
  case DESTROY:
    destroyMutation(result)
    break
  case LIST:
    listMutation(result)
    break
  case CLEAR:
    updateStore(store.active)
    break
  case TOGGLE:
    listMutation(result)
    break
  }
}

function updateStore(todos) {
  store.todos = todos
  store.active = todos.filter((todo) => !todo.completed)
  store.completed = todos.filter((todo) => todo.completed)
}

function createMutation({ problems={}, todo = {} }) {
  const copy = store?.todos?.slice() || []
  copy.push(todo)
  updateStore(copy)
  store.problems = problems
}

function updateMutation({ problems={}, todo={} }) {
  const copy = store?.todos?.slice() || []
  copy.splice(copy.findIndex(i => i.key === todo.key), 1, todo)
  updateStore(copy)
  store.problems = problems
}

function destroyMutation({ problems={}, todo={} }) {
  let copy = store?.todos?.slice() || []
  copy.splice(copy.findIndex(i => i.key === todo.key), 1)
  updateStore(copy)
  store.problems = problems
}

function listMutation({ problems={}, todos =[] }) {
  if (store.todos) {
    updateStore(todos)
    store.problems = problems
  } else {
    let active = todos.filter((todo) => !todo.completed)
    let completed = todos.filter((todo) => todo.completed)
    store.initialize({todos, active, completed, problems})
  }
}

function processForm(form) {
  return JSON.stringify(
    formEncodingToSchema( convertToNestedObject(new FormData(form)), Todo)
  )
}

function create(form) {
  const item = processForm(form)
  worker.postMessage({
    type: CREATE,
    data: item
  })
}

function destroy (form) {
  const item = processForm(form)
  worker.postMessage({
    type: DESTROY,
    data: item
  })
}

function list () {
  worker.postMessage({
    type: LIST
  })
}

function update (form) {
  const item = processForm(form)
  worker.postMessage({
    type: UPDATE,
    data: item
  })
}

function clear () {
  worker.postMessage({
    type: CLEAR
  })
}

function toggle () {
  worker.postMessage({
    type: TOGGLE
  })
}
