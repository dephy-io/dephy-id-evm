import { type CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [{ 'https://indexer-bnb-testnet-api.dephy.id/graphql': { method: 'POST' } }],
  documents: ['src/queries.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typed-document-node',
      ]
    },
  },
}

export default config
