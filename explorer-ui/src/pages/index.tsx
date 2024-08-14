/* eslint-disable @typescript-eslint/no-floating-promises */
import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ChevronsRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getProducts, getProductFactory } from "@/queries";
import { Product } from "@/components/product";
import { useClient } from "@/context/ClientProvider";
import { type Product as ProductType } from "@/gql/graphql";

export default function Home() {
  const { chain, gqlClient, getNFTNameAndSymbol } = useClient();

  const [products, setProducts] = useState<Omit<ProductType, "createEvent">[]>(
    [],
  );

  const { data } = useQuery({
    queryKey: ["products", chain],
    queryFn: async () => getProducts(gqlClient!, chain.id),
    enabled: !!gqlClient,
  });
  const { data: programData } = useQuery({
    queryKey: ["prodoctFactory"],
    queryFn: async () => getProductFactory(gqlClient!, chain.id),
    enabled: !!gqlClient,
  });

  useEffect(() => {
    products.map((product, i) => {
      if (!product.name || !product.symbol) {
        getNFTNameAndSymbol(product?.address as `0x${string}`)
          .then((res) => {
            products[i] = { ...product, name: res?.name, symbol: res?.symbol };

            setProducts(products);
          })
          .catch((err) => console.log(err));
      }
    });
  }, [products, getNFTNameAndSymbol]);

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
        <title>Dephy Explorer</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container gap-12 px-4 py-16 md:min-w-[960px]">
          {programData?.ProductFactory?.length ? (
            <div className="mb-10 grid gap-4 md:grid-cols-3 md:gap-8">
              <Card className="border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-amber-100">
                    Vendors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">
                    {programData.ProductFactory[0]?.vendors_count}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-amber-100">
                    Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href="/products"
                    className="flex items-center justify-between text-2xl font-bold text-orange-400 hover:opacity-60 active:opacity-70"
                  >
                    {programData.ProductFactory[0]?.products_count}
                    <ChevronsRight size={16} />
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-amber-100">
                    Devices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">
                    {programData.ProductFactory[0]?.devices_count}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : null}
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 ">
            {products.map((product, i: number) => (
              <Product
                key={i}
                product={product}
                blockExplorerUrl={chain.blockExplorers?.default.url ?? ""}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
