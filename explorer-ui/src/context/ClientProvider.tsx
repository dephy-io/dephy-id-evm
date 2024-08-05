import {
  useState,
  useEffect,
  createContext,
  useContext,
  type FC,
  type ReactNode,
} from "react";
import { createPublicClient, http, type PublicClient, erc721Abi } from "viem";
import { bscTestnet, type Chain } from "viem/chains";
import { GraphQLClient } from "graphql-request";

import { chainConfig } from "@/lib/config";

interface ClientContextProps {
  chain: Chain;
  viemClient: PublicClient | null;
  gqlClient: GraphQLClient | null;
  handleSwitchChain: (chain: Chain) => void;
  getMetadata: (
    address: `0x${string}`,
    tokenId: bigint,
  ) => Promise<NFTMetadata | undefined>;
  getNFTNameAndSymbol: (
    address: `0x${string}`,
  ) => Promise<Record<string, string> | null>;
}

// Define types for metadata
interface ERC721Metadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
}

interface OpenSeaMetadata {
  name: string;
  description: string;
  image: string;
  properties: Record<string, unknown>;
}

type NFTMetadata = ERC721Metadata | OpenSeaMetadata | Record<string, string>;

const ClientContext = createContext<ClientContextProps>({
  chain: bscTestnet,
  viemClient: null,
  gqlClient: null,
  handleSwitchChain: (chain: Chain) => console.log(chain),
  getMetadata: async (
    _address: `0x${string}`,
    _tokenId: bigint,
  ): Promise<NFTMetadata | undefined> => {
    return undefined;
  },
  getNFTNameAndSymbol: async (
    _address: `0x${string}`,
  ): Promise<Record<string, string> | null> => null,
});

export const useClient = () => useContext(ClientContext);

const ClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [chain, setChain] = useState<Chain>(bscTestnet);
  const [viemClient, setViemClient] = useState<PublicClient | null>(null);
  const [gqlClient, setGqlClient] = useState<GraphQLClient | null>(null);

  useEffect(() => {
    const client = createPublicClient({
      chain: bscTestnet,
      transport: http(),
    });

    setViemClient(client);
  }, [chain]);

  useEffect(() => {
    if (chainConfig[chain.id]) {
      const gqlClient = new GraphQLClient(chainConfig[chain.id]!);

      setGqlClient(gqlClient);
    }
  }, [chain]);

  const handleSwitchChain = (chain: Chain) => {
    setChain(chain);
  };

  const getNFTNameAndSymbol = async (address: `0x${string}`) => {
    try {
      const name = await viemClient?.readContract({
        address,
        abi: erc721Abi,
        functionName: "name",
      });

      const symbol = await viemClient?.readContract({
        address,
        abi: erc721Abi,
        functionName: "symbol",
      });

      return { name: name ?? "", symbol: symbol ?? "" };
    } catch (error) {
      console.error("Error fetching NFT name and symbol:", error);
      return null;
    }
  };

  const getMetadata = async (address: `0x${string}`, tokenId: bigint) => {
    const tokenURI = await viemClient?.readContract({
      address,
      abi: erc721Abi,
      functionName: "tokenURI",
      args: [tokenId],
    });

    let metadata;

    if (tokenURI) {
      try {
        const res = await fetch(tokenURI);
        metadata = (await res.json()) as NFTMetadata;
      } catch (e) {
        console.error(e);
      }
    }

    return metadata;
  };

  return (
    <ClientContext.Provider
      value={{
        chain,
        viemClient,
        gqlClient,
        handleSwitchChain,
        getMetadata,
        getNFTNameAndSymbol,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
