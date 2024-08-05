/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Link2 } from "lucide-react";

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

import { getProducts } from "@/queries";
import { useClient } from "@/context/ClientProvider";
import { type Product as ProductType } from "@/gql/graphql";

const limit = 50;

export default function Products() {
  const { chain, gqlClient, getNFTNameAndSymbol } = useClient();

  const [products, setProducts] = useState<Omit<ProductType, "createEvent">[]>(
    [],
  );

  const page = 0;

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => getProducts(gqlClient!, chain.id),
    enabled: !!gqlClient,
  });

  const getProductsWithNameAndSymbol = useCallback(
    async (products: Omit<ProductType, "createEvent">[]) => {
      const promises = products.map(async (product) => {
        if (product.name && product.symbol) {
          return product;
        }

        const res = await getNFTNameAndSymbol(product.address as `0x${string}`);

        return { ...product, name: res?.name, symbol: res?.symbol };
      });

      const ps = await Promise.all(promises);

      setProducts(ps);
    },
    [getNFTNameAndSymbol],
  );

  useEffect(() => {
    if (data?.Product) {
      getProductsWithNameAndSymbol(data.Product);
    }
  }, [data, getProductsWithNameAndSymbol]);

  return (
    <>
      <Head>
        <title>Products - Dephy Explorer</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="py-16">
          <Card className="mt-10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-amber-100">
                Products
              </CardTitle>
              <CardDescription className="text-[#9DC8B9]">
                {products.length} products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    {/* <TableHead>Url</TableHead> */}
                    <TableHead>Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, i) => (
                    <TableRow key={i}>
                      <TableCell>{page * limit + i + 1}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${chain.blockExplorers?.default.url}/address/${product.address}`}
                          className="flex items-center gap-x-1 hover:opacity-60 active:opacity-70"
                        >
                          {product.address}
                          <Link2 className="h-4 w-4 text-amber-100" />
                        </a>
                      </TableCell>
                      {/* <TableCell>
                          {product.metadata?.uri ? (
                            <a
                              href={product.metadata?.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-x-1 hover:opacity-60 active:opacity-70"
                            >
                              {product.metadata?.uri}
                              <Link2 className="h-4 w-4 text-amber-100" />
                            </a>
                          ) : null}
                        </TableCell> */}
                      <TableCell align="right">
                        <Link href={`/product/${product.address}`}>
                          <Link2 className="h-4 w-4 text-amber-100" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            {/* <CardFooter className="justify-between">
                <div className="flex items-center gap-1 text-xs text-[#9DC8B9]">
                  Showing
                  <strong>
                    {page * limit + 1}-{(page + 1) * limit}
                  </strong>
                  of <strong>{data.Product?.length}</strong> devices
                </div>
              </CardFooter> */}
          </Card>
        </div>
      </main>
    </>
  );
}
