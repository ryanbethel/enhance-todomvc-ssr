// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getTodos } from '../models/todos.mjs'

/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  let todos = await getTodos()
  let active = todos.filter(todo => !todo.completed)
  let completed = todos.filter(todo => todo.completed)

  if (req.session.problems) {
    let { problems, todo, ...session } = req.session
    return {
      session,
      json: { problems, todos, todo }
    }
  }

  const filter = req.query.filter
  if (filter==='active') todos = active
  if (filter==='completed') todos = completed

  return {
    session: { test:"I'm new" },
    json: { todos, active, completed, filter }
  }
}

