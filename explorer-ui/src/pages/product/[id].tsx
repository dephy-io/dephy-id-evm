/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  // PaginationEllipsis,
  // PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

import { getProduct, getDevice } from "@/queries";
import { type Product, type Device } from "@/gql/graphql";
import { Product as ProductItem } from "@/components/product";
import { useClient } from "@/context/ClientProvider";

// interface DeviceResultProp {
//   id: string;
//   address: string;
//   owner: string;
//   tokenId: bigint;
//   name?: string;
//   image?: string;
// }

const limit = 50;

type DeviceType = Omit<Device, "product" | "createEvent"> & {
  name: string;
  image: string;
};

export default function Product() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { chain, gqlClient, getNFTNameAndSymbol, getMetadata } = useClient();

  const [page, setPage] = useState(Number(searchParams.get("page") ?? 0));
  const [product, setProduct] = useState<Product | null>(null);
  const [devices, setDevices] = useState<DeviceType[]>([]);

  const { data } = useQuery({
    queryKey: ["product", router?.query?.id, page],
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;

      if (typeof id === "string" && gqlClient) {
        return getProduct(gqlClient, chain.id, id, page * limit, limit);
      } else {
        console.error("Invalid id type. Expected string, got", typeof id);
      }
    },
    enabled: !!router?.query?.id,
  });

  const [pubkey, setPubkey] = useState("");
  const [device, setDevice] = useState<
    | {
        name: string | undefined;
        image: string | undefined;
        address: string;
        tokenId: bigint;
      }
    | null
    | undefined
  >(undefined);

  const { data: deviceData } = useQuery({
    queryKey: ["device", pubkey],
    queryFn: () => getDevice(gqlClient!, chain.id, pubkey),
    enabled: !!pubkey && !!gqlClient,
  });

  const getDeviceWithNameAndSymbol = useCallback(
    async ({
      address,
      tokenId,
      product,
    }: {
      address: string;
      tokenId: bigint;
      product: { address: `0x${string}` };
    }) => {
      const res = await getMetadata(
        product.address,
        BigInt(tokenId),
        // "0x4fEA711d4dBd69F8368Cce56f36b5601155C9EBF",
        // BigInt(4524),
      );

      setDevice({
        address,
        tokenId,
        name: res?.name,
        image: res?.image,
      });
    },
    [getMetadata],
  );

  useEffect(() => {
    if (deviceData?.Device) {
      const device = deviceData.Device[0];

      if (device) {
        const address = device.address;
        const tokenId = device.tokenId as bigint;
        const product = device.product as { address: `0x${string}` };

        getDeviceWithNameAndSymbol({
          address,
          tokenId,
          product,
        });
      }
    }
  }, [deviceData, getDeviceWithNameAndSymbol]);

  const getProductWithNameAndSymbol = useCallback(
    async (product: Product) => {
      if (product.name && product.symbol) {
        setProduct(product);
        return;
      }

      const res = await getNFTNameAndSymbol(
        // "0x4fEA711d4dBd69F8368Cce56f36b5601155C9EBF",
        product.address as `0x${string}`,
      );

      setProduct({ ...product, name: res?.name, symbol: res?.symbol });
    },
    [getNFTNameAndSymbol],
  );

  const getDevicesWithNameAndSymbol = useCallback(
    async (product: Product) => {
      const promises = product.devices?.map(async (device) => {
        const res = await getMetadata(
          product.address as `0x${string}`,
          BigInt(device.tokenId as bigint),
          // "0x4fEA711d4dBd69F8368Cce56f36b5601155C9EBF",
          // BigInt(4524),
        );

        return { ...device, name: res?.name ?? "", image: res?.image ?? "" };
      });

      const ps = await Promise.all(promises!);

      setDevices(ps);
    },
    [getMetadata],
  );

  useEffect(() => {
    if (data?.Product) {
      getProductWithNameAndSymbol(data.Product[0] as Product);
      getDevicesWithNameAndSymbol(data.Product[0] as Product);
    }
  }, [data, getProductWithNameAndSymbol, getDevicesWithNameAndSymbol]);

  const handleSwitchPage = (page: number) => {
    let _page = page;

    if (page < 0) {
      _page = 0;
    }

    if (page > product?.devices_count / limit) {
      _page = Math.floor(product?.devices_count / limit);
    }

    setPage(_page);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPubkey(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Dephy Explorer</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="px-4 py-16">
          {product ? (
            <ProductItem
              product={product}
              blockExplorerUrl={chain.blockExplorers?.default.url ?? ""}
            />
          ) : null}

          {product ? (
            <Card className="mt-10">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-amber-100">
                  Devices
                  <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="device address..."
                      className="w-[200px] rounded-lg bg-background pl-8"
                      value={pubkey}
                      onChange={handleSearch}
                    />
                  </div>
                </CardTitle>
                <CardDescription className="text-[#9DC8B9]">
                  {product?.devices_count} devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>TokenId</TableHead>
                      <TableHead>Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {device ? (
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>
                          <img className="w-10" src={device.image} alt="" />
                        </TableCell>
                        <TableCell>{device.name}</TableCell>
                        <TableCell>{device.tokenId}</TableCell>
                        <TableCell>{device.address}</TableCell>
                      </TableRow>
                    ) : null}
                    {!device &&
                      devices.map(({ address, tokenId, name, image }, i) => (
                        <TableRow key={i}>
                          <TableCell>{page * limit + i + 1}</TableCell>
                          <TableCell>
                            <img className="w-10" src={image} alt="" />
                          </TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell>{tokenId}</TableCell>
                          <TableCell>{address}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-between">
                {!device ? (
                  <>
                    <div className="flex items-center gap-1 text-xs text-[#9DC8B9]">
                      Showing
                      <strong>
                        {page * limit + 1}-{(page + 1) * limit}
                      </strong>
                      of <strong>{product.devices_count}</strong> devices
                    </div>
                    <Pagination className="mx-0 w-auto text-white">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handleSwitchPage(page - 1)}
                            href="#"
                          />
                        </PaginationItem>
                        {/* <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem> */}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handleSwitchPage(page + 1)}
                            href="#"
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </>
                ) : null}
              </CardFooter>
            </Card>
          ) : null}
        </div>
      </main>
    </>
  );
}
