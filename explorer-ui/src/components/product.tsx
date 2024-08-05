/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Product as ProductType } from "@/gql/graphql";

export function Product({
  product,
  blockExplorerUrl,
}: {
  product: Omit<ProductType, "createEvent">;
  blockExplorerUrl: string;
}) {
  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-amber-100">
          {product.symbol}
        </CardTitle>
        {/* {product.metadata?.uri ? (
          <a
            href={product.metadata?.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 active:opacity-70"
          >
            <Link2 className="h-4 w-4 text-amber-100" />
          </a>
        ) : null} */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-orange-400">
          <Link
            className="flex items-center justify-between py-2 hover:opacity-60 active:opacity-70"
            href={`/product/${product.address}`}
          >
            {product.name}
            <ChevronsRight size={16} />
          </Link>
        </div>
        <p className="mt-2 text-xs text-[#9DC8B9]">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${blockExplorerUrl}/address/${product.address}`}
            className="hover:opacity-60 active:opacity-70"
          >
            {product.address}
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
