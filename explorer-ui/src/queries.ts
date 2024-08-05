import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql'
import { gql, type GraphQLClient } from 'graphql-request'
import type {
  GetProductQuery,
  GetProductQueryVariables,
  GetProductsQuery,
  GetProductsQueryVariables,
  GetDeviceQuery,
  GetDeviceQueryVariables,
  GetChainsQuery,
  GetChainsQueryVariables,
  GetProductFactoryQuery,
  // GetVendorQuery,
  // GetVendorQueryVariables,
} from './gql/graphql'

// import { env } from '@/env';

// export const gqlClient = new GraphQLClient(env.NEXT_PUBLIC_GRAPHQL_URI)

export async function getChains(gqlClient: GraphQLClient, offset = 0, limit = 50) {
  const query: TypedDocumentNode<GetChainsQuery> = parse(gql`
    query getChains($limit: Int, $offset: String) {
      Chain(first: $limit, after: $offset) {
        chainId
        fullName
        name
      }
    }
  `)

  const variables: GetChainsQueryVariables = {
    offset: `${offset - 1}`,
    limit,
  }

  return await gqlClient.request(query, variables)
}

export async function getProducts(gqlClient: GraphQLClient, chainId = 97, offset = 0, limit = 50) {
  const query: TypedDocumentNode<GetProductsQuery> = parse(gql`
    query getProducts($chainId: Bigint, $limit: Int, $offset: String) {
      Product(filter: { factory: { chain: { chainId: { eq: $chainId } } } }, first: $limit, after: $offset) {
        factory {
          id
          chain {
            id
            name
            chainId
          }
          address
          uptoBlock
          owner
          active
          products_count
          vendors
          vendors_count
          devices_count
        }
        id
        address
        impl
        name
        symbol
        devices_count
        vendor
      }
    } 
  `)

  const variables: GetProductsQueryVariables = {
    chainId,
    offset: `${offset - 1}`,
    limit,
  }

  return await gqlClient.request(query, variables)
}

export async function getProduct(gqlClient: GraphQLClient, chainId = 97, address: string, offset: number, limit: number) {
  const query: TypedDocumentNode<GetProductQuery> = parse(gql`
    query getProduct($chainId: Bigint, $address: String, $limit: Int, $offset: String) {
      Product(filter: {address: {eq: $address}, factory: {chain: {chainId: {eq: $chainId}}}}, first: $limit, after: $offset) {
        factory {
          id
          chain {
            name
            chainId
          }
          address
          uptoBlock
          owner
          active
          products_count
          vendors
          vendors_count
          devices_count
        }
        id
        address
        impl
        name
        symbol
        devices {
          address
          owner
          tokenId
        }
        devices_count
        vendor
      }
    }
  `)

  const variables: GetProductQueryVariables = {
    chainId,
    address,
    offset: (offset - 1).toString(),
    limit,
  }

  return await gqlClient.request(query, variables)
}

// export async function getVendor(vendor_pubkey: string) {
//   const query: TypedDocumentNode<GetVendorQuery> = parse(gql`
//     query getVendor($vendor_pubkey: String) {
//       Vendor(filter: { pubkey: {eq: $vendor_pubkey} }) {
//         pubkey
//         products_count
//         devices_count
//         products {
//           mint_account
//           mint_authority
//           metadata {
//             name
//             symbol
//             uri
//             additional
//           }
//           devices_count
//           tx {
//             block_ts
//           }
//         }
//       }
//     }
//   `)

//   const variables: GetVendorQueryVariables = {
//     vendor_pubkey
//   }

//   return await gqlClient.request(query, variables)
// }

export async function getDevice(gqlClient: GraphQLClient, chainId = 97, address: string) {
  const query: TypedDocumentNode<GetDeviceQuery> = parse(gql`
    query getDevice($chainId: Bigint, $address: String) {
      Device(filter: {address: {eq: $address}, product: {factory: {chain: {chainId: {eq: $chainId}}}}}) {
        id
        address
        owner
        tokenId
        product {
          address
        }
      }
    }
  `)

  const variables: GetDeviceQueryVariables = {
    chainId,
    address
  }

  return await gqlClient.request(query, variables)
}

export async function getProductFactory(gqlClient: GraphQLClient) {
  const query: TypedDocumentNode<GetProductFactoryQuery> = parse(gql`
    query getProductFactory($chainId: Bigint, $limit: Int, $offset: String) {
      ProductFactory(filter: {chain: {chainId: {eq: $chainId}}}, first: $limit, after: $offset) {
        active
        address
        chain {
          chainId
          fullName
          id
          name
        }
        devices_count
        id
        owner
        products_count
        uptoBlock
        vendors
        vendors_count
      }
    }
  `)

  const variables = {}

  return await gqlClient.request(query, variables)
}
