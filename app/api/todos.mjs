// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getTodos, upsertTodo, validate } from '../models/todos.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  let todos = await getTodos()


  if (req.session.problems) {
    let { problems, todo, ...session } = req.session
    return {
      session,
      json: { problems, todos, todo }
    }
  }

  const filter = req.query.filter
  if (filter==='active') todos = todos.filter(todo=>!todo.completed)
  if (filter==='completed') todos = todos.filter(todo=>todo.completed)

  console.log('todos endpoint', todos)
  return {
    json: { todos }
  }
}

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
      location: '/todos'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, todo: removed, ...newSession } = session
  try {
    const result = await upsertTodo(todo)
    return {
      session: newSession,
      json: { todo: result },
      location: '/todos'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/todos'
    }
  }
}
