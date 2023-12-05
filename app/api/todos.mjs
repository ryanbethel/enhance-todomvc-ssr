// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { upsertTodo, validate } from '../models/todos.mjs'

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const session = req.session
  // Validate
  let { problems, todo } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, todo },
      json: { problems, todo },
      location: '/'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, todo: removed, ...newSession } = session
  try {
    const result = await upsertTodo(todo)
    return {
      session: newSession,
      json: { todo: result },
      location: '/'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/'
    }
  }
}
