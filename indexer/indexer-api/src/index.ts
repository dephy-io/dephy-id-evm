import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { parseArgs } from 'util'

const { values: options } = parseArgs({
  options: {
    graphql: {
      type: 'string',
      short: 'g',
    }
  }
})

if (!options.graphql) {
  throw `missing graphql endpoint '-g'`
}

const graphqlEndpoint = options.graphql!

const app = new Hono()

app.use('*', cors())

app.post('/graphql', async (c) => {
  const contentType = c.req.header('Content-Type')!
  let query
  let body
  if (contentType?.search('json') >= 0) {
    body = await c.req.json()
    query = body['query']
  }

  if (typeof query == 'string' && query.match(/^\s*query/)) {
    const resp = await fetch(graphqlEndpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': contentType
      }
    })

    const result = await resp.json()

    return c.json(result)
  }

  return c.status(400)
})

console.log('indexer api running...')

export default app
