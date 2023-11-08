/* globals Promise */
import { upsertTodo, getTodos } from '../../models/todos.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, ...newSession } = session
  let todos = await getTodos()
  let active = todos.filter(todo=>!todo.completed)
  let completed = todos.filter(todo=>todo.completed)

  try {
    if (active.length > 0) {
      await Promise.all(active.map(todo=>upsertTodo({...todo, completed: true})))
    } else {
      await Promise.all(completed.map(todo=>upsertTodo({...todo, completed: false})))
    }

    todos = await getTodos()
    active = todos.filter(todo => !todo.completed)
    completed = todos.filter(todo => todo.completed)

    return {
      session: newSession,
      json: { problems: {}, todos, active, completed },
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
