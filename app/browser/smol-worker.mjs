/* global self */

self.onmessage = stateMachine

async function stateMachine ({ payload, path, method }){
  try {
    const result = await (await fetch(
      path, 
      { body: payload,
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
