/* global self */
const CREATE = 'create'
const UPDATE = 'update'
const DESTROY = 'destroy'
const DESTROY_FAILED = 'destroy-failed'
const LIST = 'list'
const CLEAR = 'clear'
const TOGGLE = 'toggle'
const FLASH = 'flash'


self.onmessage = stateMachine

async function stateMachine ({ data }) {
  const { data: payload, type } = data
  switch (type) {
  case CREATE:
    try {
      const result = await (await fetch(
        `/todos`, {
          body: payload,
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })).json()

      self.postMessage({
        type: CREATE,
        result
      })
    }
    catch (err) {
      self.postMessage({
        type:FLASH,
        result:err
      })
    }
    break
  case UPDATE:
    try {
      const key = JSON.parse(payload).key
      const result = await (await fetch(
        `/todos/${key}`, {
          body: payload,
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      )).json()

      self.postMessage({
        type: UPDATE,
        result
      })
    }
    catch (err) {
      self.postMessage({
        type:FLASH,
        result:err
      })
    }
    break
  case DESTROY:
    let key
    try {
      key = JSON.parse(payload).key
      const result = await (await fetch(
        `/todos/${key}/delete`, {
          body: payload,
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })).json()
      if (result.problems){
        self.postMessage({
          type:FLASH,
          result:result.problems
        })
      }
    }
    catch (err) {
      self.postMessage({
        type: DESTROY_FAILED,
        result:{key}
      })
      self.postMessage({
        type:FLASH,
        result:err
      })
    }
    break
  case LIST:
    try {
      const result = await (await fetch(
        `/todos`, {
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'GET'
        }
      )).json()

      self.postMessage({
        type: LIST,
        result
      })
    } catch (err) {
      self.postMessage({
        type:FLASH,
        result:err
      })
    }
    break
  case CLEAR:
    try {
      await fetch(
        `/todos/completed/delete`, {
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      )

      self.postMessage({
        type: CLEAR
      })
    } catch (err) {
      self.postMessage({
        type:FLASH,
        result:err
      })
    }
    break
  case TOGGLE:
    try {
      const result = await (await fetch(
        `/todos/toggle`, {
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      )).json()

      self.postMessage({
        type: TOGGLE,
        result
      })
    } catch (err) {
      self.postMessage({
        type:FLASH,
        result:err
      })
    }
    break
  }
}
