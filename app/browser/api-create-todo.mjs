/* global Worker */
import Store from '@enhance/store'
import convertToNestedObject from '@begin/validator/src/convert-to-nested-object.js'
import formEncodingToSchema from '@begin/validator/src/form-encoding-to-schema.js'
import {Todo} from '../models/schemas/todo.mjs'

const store = Store()

let worker
export default function API({action,object,schema}) {

  if (!worker?.[action]) {
    worker[action] =  new Worker('/_public/browser/smol-worker.mjs');
    worker[action].onmessage = afterAction
  }
  
  let api  = {
    store,
    subscribe: store.subscribe,
    unsubscribe: store.unsubscribe
  }

  api[action] = doAction
  return api
}

function afterAction({ problems={}, ...rest }) {
  const item = rest[object] || {}
  const copy = store?.[object]?.slice() || []
  copy.push(item)
  store[object] = copy
  store.problems = problems
}


function processForm(form) {
  return JSON.stringify(
    formEncodingToSchema( convertToNestedObject(new FormData(form)), Schema)
  )
}

function doAction(form) {
  const data = processForm(form)
  worker.postMessage({
    data
  })
}


async function workerFunction ({ payload, url, path, method='POST' }) {
  try {
    const result = await (await fetch(
      `${url}/${path}`, {
        body: payload,
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method
      })).json()

    self.postMessage({
      result
    })
  }
  catch (err) {
    // RESPOND WITH ERROR
    console.error(err)
  }
}
