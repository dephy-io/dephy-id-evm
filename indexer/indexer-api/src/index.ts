import { Hono } from 'hono'
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

app.post('/graphql', async (c) => {
  const contentType = c.req.header('Content-Type')!
  let query
  if (contentType.search('json') >= 0) {
    const body = await c.req.json()
    query = body['query']
  } else if (contentType == 'application/graphql') {
    query = await c.req.text()
  }

  if (typeof query == 'string' && query.match(/^\s*(query\s*)?\{/)) {
    const resp = await fetch(graphqlEndpoint, {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await resp.json()

    return c.json(result)
  }

  return c.status(400)
})

console.log('indexer api running...')

export default app
