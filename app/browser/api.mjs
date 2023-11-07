/* global window, Worker */
import Store from '@enhance/store'
import convertToNestedObject from '@begin/validator/src/convert-to-nested-object.js'
import formEncodingToSchema from '@begin/validator/src/form-encoding-to-schema.js'

const notifyOnInitialize = false // false SSR because markup has initial data

// JSON Schema for DB/CRUD Object
const Schema = {
  id: 'todo',
  type: 'object',
  properties: {
    key: { 'type': 'string' },
    completed: { 'type': 'boolean' },
    task: { 'type': 'string' },
  }
}


// API actions
const  CREATE  = 'create'
const  UPDATE  = 'update'
const  DESTROY = 'destroy'
const  LIST    = 'list'

// DB/CRUD Object Type
const  ITEM = Schema.id
const  ITEMS = `${Schema.id}s`

const store = Store()

let worker
export default function API() {

  if (!worker) {
    worker =  new Worker('/_public/worker.mjs')
    worker.onmessage = mutate
  }

  initialize()

  return {
    create,
    update,
    destroy,
    list,
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
  }
}

function updateStore(todos) {
  console.log(
    'update store got called', todos
  )
  store.todos = todos
  store.active = todos.filter((todo) => !todo.completed)
  store.completed = todos.filter((todo) => todo.completed)
}

function createMutation({ problems={}, ...rest }) {
  const item = rest[ITEM] || {}
  const copy = store?.[ITEMS]?.slice() || []
  copy.push(item)
  updateStore(copy)
  store.problems = problems
}

function updateMutation({ problems={}, ...rest }) {
  const item = rest[ITEM] || {}
  const copy = store?.[ITEMS]?.slice() || []
  copy.splice(copy.findIndex(i => i.key === item.key), 1, item)
  updateStore(copy)
  store.problems = problems
}

function destroyMutation({ problems={}, ...rest }) {
  const item = rest[ITEM] || {}
  let copy = store?.[ITEMS]?.slice() || []
  copy.splice(copy.findIndex(i => i.key === item.key), 1)
  updateStore(copy)
  store.problems = problems
}

function listMutation({  problems={}, ...rest }) {
  console.log('list mutation called')
  const items = rest[ITEMS] || []
  if (notifyOnInitialize) {
    // For CSR we directly set the store so that callbacks are called
    // to rerender with data
    console.log('updating store')
    updateStore(items)
    store.problems = problems
  } else {
    // For SSR we use initialize to avoid calling subscribed callbacks
    // which would cause an unnecessary rerender
    // const init = {problems}
    // init[ITEMS] = items
    // store.initialize(init)
    console.log('initialize store')
    store.initialize({[ITEMS]:items, problems})
  }
}

function processForm(form) {
  return JSON.stringify(
    formEncodingToSchema( convertToNestedObject(new FormData(form)), Schema)
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

